<template>
    <v-app fluid :style="{ backgroundImage: 'url(https://archzine.fr/wp-content/uploads/2021/02/image-coel-et-nuages-vue-d-enhaut-fond-d-e%CC%81cran-rose-pastel-de-reve.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }">
        <v-toolbar app>
            <v-toolbar-title>Louis's Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="cyan" @click="newWidget = true">
                <v-icon medium>add</v-icon>
            </v-btn>
            <v-btn color="cyan" @click="reset()">
                <v-icon medium>clear</v-icon>
            </v-btn>
            <v-btn color="cyan" @click="save()">
                <v-icon>save</v-icon>
            </v-btn>
            <v-btn color="cyan" @click="disconnect()">
                <v-icon>logout</v-icon>
            </v-btn>
            <v-alert id="alert" :value="alert" ></v-alert>

            <v-dialog v-model="newWidget" max-width="600px">
                <v-stepper v-model="stepper">
                    <v-stepper-step :complete="stepper>1" step="1">Service</v-stepper-step>
                    <v-stepper-content step="1">
                        <v-select
                                v-model="step1"
                                :items="['Meteo', 'Finance', 'Youtube', 'Cinema']"
                                label="Services..."
                                solo
                        ></v-select>
                        <v-btn v-if="step1 != ''" color="cyan" @click="stepper=2">Next</v-btn>
                        <v-btn @click="newWidget=false">Back</v-btn>
                    </v-stepper-content>
                    <v-stepper-step :complete="stepper>2" step="2">Widget</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-select v-model="step2" :items="getWidget()" solo></v-select>
                        <v-btn v-if="step2 != ''" color="cyan" @click="stepper=3">Next</v-btn>
                        <v-btn @click="stepper=1">Back</v-btn>
                        <v-btn @click="newWidget=false">Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-step :complete="stepper > 3" step="3">Configuration</v-stepper-step>
                    <v-stepper-content step="3">
                        <v-container v-if="step2 === 'City temperature'">
                            <v-text-field
                                    v-model="city"
                                    label="Solo"
                                    placeholder="City"
                                    solo
                            ></v-text-field>
                            <v-select
                                    v-model="temp"
                                    :items="['Celsius', 'Fahrenheit']"
                                    label="Temperature in ..."
                                    solo
                            ></v-select>
                        </v-container>
                        <v-container v-if="step2 === 'Company share'">
                            <v-text-field
                                    v-model="company"
                                    label="Solo"
                                    placeholder="Company's name"
                                    solo
                            ></v-text-field>
                        </v-container>
                        <v-container v-if="step2 === 'Exchange rate'">
                            <v-text-field
                                    v-model="money1"
                                    label="Solo"
                                    placeholder="1st currency"
                                    solo
                            ></v-text-field>
                            <v-text-field
                                    v-model="money2"
                                    label="Solo"
                                    placeholder="2nd currency"
                                    solo
                            ></v-text-field>
                        </v-container>
                        <v-container v-if="step2 === 'Youtube video'">
                            <v-text-field
                                    v-model="video"
                                    label="Solo"
                                    placeholder="Video's name"
                                    solo
                            ></v-text-field>
                        </v-container>
                        <v-container v-if="step2 === 'Movies'">
                            <v-text-field
                                    v-model="movies"
                                    label="Solo"
                                    placeholder="Movies's name"
                                    solo
                            ></v-text-field>
                        </v-container>
                        <v-container v-if="step2 === 'Series'">
                            <v-text-field
                                    v-model="series"
                                    label="Solo"
                                    placeholder="Series's name"
                                    solo
                            ></v-text-field>
                        </v-container>
                        <v-container>
                            <v-layout row>
                                <v-text-field
                                        v-model="name"
                                        label="Solo"
                                        placeholder="Custom name"
                                        solo
                                ></v-text-field>
                                <v-text-field
                                        v-model="timer"
                                        label="Solo"
                                        placeholder="Timer"
                                        solo
                                        suffix="refresh time in s"
                                ></v-text-field>
                            </v-layout>
                        </v-container>
                        <v-btn
                                v-if="addVerif()"
                                color="cyan"
                                @click="newWidget=false;stepper=1;initCallApi();"
                        >Add</v-btn>
                        <v-btn flat @click="stepper=2">Prev</v-btn>
                        <v-btn flat @click="newWidget=false;">Cancel</v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-dialog>
        </v-toolbar>
        <v-content>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap="" justify-space>
                    <v-flex v-for="i in services" :key="`${i.name}`" v-if="i.active" xs4>
                        <v-toolbar color="cyan">
                            <v-toolbar-title>{{ i.name }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                    fab
                                    small
                                    color="cyan"
                                    @click="i.active = false"
                            >
                                <v-icon medium>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <div v-if="i.load">
                            <v-card v-if="i.widget === 'Youtube video'">
                                <h1>{{i.data.titlevideo}}<br></h1>
                                <a v-bind:href=i.data.url target="_blank"> <span>OPEN VIDEO</span></a>
                                <p>
                                    <span>Publised : {{i.data.publishedAt}}</span><br>
                                    <span>Author name: {{i.data.author}}</span><br>
                                    <span>Duration: {{i.data.duration}}</span>
                                </p>
                            </v-card>
                            <v-card v-if="i.widget === 'Movies'">
                                <h1>{{i.data.name}}<br></h1>
                                <p>
                                    <span>Publised At: {{i.data.premiered}}</span><br>
                                    <span>Run Time: {{i.data.runTime}}</span><br>
                                    <span>Type: {{i.data.type}}</span><br>
                                    <span>Writer name: {{i.data.writer}}</span><br>
                                    <span>Actors: {{i.data.actors}}</span><br>
                                    <span>Language: {{i.data.language}}</span><br>
                                </p>
                            </v-card>
                            <v-card v-if="i.widget === 'City temperature'">
                                    <h1>{{i.data.location}}</h1>
                                    <p>
                                        <span class="temp">{{i.data.temp}}</span><br>
                                        <span>Humidity: {{i.data.humidity}}%</span><br>
                                        <span>Windspeed: {{i.data.windspeed}}</span><br>
                                        <span>{{i.data.desc}}</span>
                                    </p>
                        </v-card>
                        <v-card v-if="i.widget === 'Company share'">
                            <h1>Date: {{i.data.date}}</h1>
                            <p>
                                <span>Open: {{i.data.open}}$</span><br>
                                <span>High: {{i.data.high}}$</span><br>
                                <span>Low: {{i.data.low}}$</span><br>
                                <span>Close: {{i.data.close}}$</span><br>
                                <span>Volume: {{i.data.volume}}</span><br>
                            </p>
                        </v-card>
                        <v-card v-if="i.widget === 'Exchange rate'">
                            <h1>Exchange Rate</h1>
                            <p>
                                <span>From : {{i.data.from}}</span> <br>
                                <span>To : {{i.data.to}}</span> <br>
                                <span>Rate : {{i.data.rate}}</span> <br>
                                <span>Bid Price : {{i.data.bidPrice}}</span> <br>
                                <span>Ask Price : {{i.data.askPrice}}</span> <br>
                                <span>Last refreshed from API: {{i.data.lastRefreshed}}</span>
                            </p>
                        </v-card>
                        <v-card v-if="i.widget === 'Series'">
                            <h1>{{i.data.name}}<br></h1>
                            <a v-bind:href=i.data.url target="_blank"> <img :src="i.data.img" alt="texte" /></a>
                            <p>
                                <span>Publised At: {{i.data.premiered}}</span><br>
                                <span>Type: {{i.data.type}}</span><br>
                                <span>Language: {{i.data.language}}</span><br>
                            </p>
                        </v-card>
                        </div>
                        <div v-else>
                            <h1>Waiting for a API response...</h1>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {empty} from "../.nuxt/utils";

    const { TaskTimer } = require('tasktimer');
    const axios = require('axios');
    export default {
        mounted() {
            axios
                .post("/request/connected", {
                    username: this.username,
                    password: this.password,
                })
                .then(response => {
                    if (response.data === false) {
                        window.location.replace('/users/login')
                    }
                });
            this.getSettings();

        },
        data() {
            return {
                alert: false,
                newWidget: false,
                stepper: 1,
                step1: '',
                step2: '',
                radios: "Degree",
                movies: '',
                series: '',
                widgets: [
                    'City temperature',
                    'Company share',
                    'Exchange rate',
                    'Youtube video',
                    'Movies',
                    'Series',
                ],
                city: '',
                temp: '',
                money1: '',
                money2: '',
                channel: '',
                video: '',
                name: '',
                timer: '30',
                company: '',
                services: [],

                reset() {
                    this.services = [];
                    this.resetSetting();
                },

                getWidget() {
                    if (this.step1 === 'Meteo')
                        return [`${this.widgets[0]}`];
                    if (this.step1 === 'Finance')
                        return [`${this.widgets[1]}`, `${this.widgets[2]}`];
                    if (this.step1 === 'Youtube')
                        return [`${this.widgets[3]}`];

                    if (this.step1 === 'Cinema')
                        return [
                            `${this.widgets[4]}`,
                            `${this.widgets[5]}`
                        ]
                },

                addToService(param) {
                    if (param !== false) {
                        this.services.push({
                            widget: this.step2,
                            name: this.name,
                            timer: parseInt(this.timer),
                            data: false,
                            parametres: param,
                            pos: this.services.length,
                            active: true,
                            load: false
                        });
                        return this.services.length - 1
                    }
                    return -1
                },

                updateWidget(data, nb) {
                    if (data !== false) {
                        this.services[nb].data = data;
                        this.services[nb].load = true;
                    } else
                        this.services[nb].active = false;
                },

                addVerif() {
                    var i = 0;
                    while (i < this.services.length) {
                        if (this.name === this.services[i].name && this.services[i].active === true) {
                            return false
                        }
                        i += 1;
                    }
                    if (this.name === '' || this.timer === '') {
                        return false
                    }
                    else {
                        return true
                    }
                },

                resetSetting()
                {
                    axios
                        .post("/request/resetSettings", {
                        })
                        .then(response => {
                            console.log("restertte")
                            console.log(response.data)
                        });
                },

                setSetting() {
                    let alerts = document.getElementById("alert");
                    let i = 0;
                    while (i < this.services.length) {
                        if (this.services[i].active === true) {
                        axios
                            .post("/request/setSettings", {
                                setting: this.services[i]
                            })
                            .then(response => {
                                if (response.data === false) {
                                    alerts.setAttribute("type", "error");
                                    alerts.classList.remove("success");
                                    alerts.classList.add("error");
                                    alerts.innerHTML = "Error to save widget";
                                }
                            });
                        }
                        i += 1;
                    }
                    alerts.setAttribute("type", "success");
                    alerts.classList.remove("error");
                    alerts.classList.add("success");
                    alerts.innerHTML = "Your widgets are saved !";
                    this.alert = true

                },

                getSettings() {
                    axios
                        .post("/request/getSettings", {
                        })
                        .then(response => {
                            if (response.data !== false && !empty(response.data)) {
                               this.services = response.data;
                                let i = 0;
                                while (i < this.services.length) {
                                    this.callApi(i);
                                    i += 1
                                }
                            }
                        });
                },

                save() {
                    this.resetSetting();
                    this.setSetting();
                    setTimeout(() => {
                        this.alert = false;
                    }, 1500)
                },

                disconnect() {
                    setTimeout(() => {
                        this.resetSetting();
                        this.setSetting();
                        axios
                            .post("/request/disconnect", {
                            })
                            .then(response => {
                                if (response.data === true) {
                                    setTimeout(() => {
                                        window.location.replace('/users/login')
                                    }, 500)
                                }
                            });
                    }, 1000)
                },

                callApiWidget(pos)
                {
                    axios
                        .post(this.services[pos].parametres.url, this.services[pos].parametres)
                        .then(response => {
                            this.updateWidget(response.data, pos);
                        });
                },

                getParams(name)
                {
                    let params = {
                        url : "/"
                    };

                    switch (name) {
                        case 'City temperature':
                            params = {
                                url: "api/weather",
                                temp: this.temp,
                                city: this.city
                            };
                            break;
                        case 'Exchange rate':
                            params =  {
                                url: "/api/exchangeRate",
                                money1: this.money1,
                                money2: this.money2
                            };
                            break;
                        case 'Youtube video':
                            params = {
                                url: "/api/youtubeVideo",
                                video: this.video
                            };
                            break;
                        case 'Company share':
                            params = {
                                url: "/api/companyShare",
                                company: this.company,
                            };
                            break;
                        case 'Movies':
                            params = {
                                url: "/api/cinemaMovies",
                                movies: this.movies,
                            };
                            break;
                        case 'Series':
                            params =  {
                                url: "/api/seriesShows",
                                series: this.series,
                            };
                            break;
                        default:
                            break;
                    }
                    return(params)
                },

                initCallApi()
                {
                    let params = this.getParams(this.step2);
                    let pos = this.addToService(params);
                    if (pos === -1)
                        return;
                    this.callApi(pos)
                },

                callApi(pos) {
                    this.callApiWidget(pos);
                    let timers = new TaskTimer(1000);
                    let saveThis = this;
                    timers.add([
                        {
                            id: 'task-' + pos,
                            tickInterval: this.services[pos].timer,
                            totalRuns: 0,
                            callback(task) {
                                if (saveThis.services[pos].active === true) {
                                    saveThis.callApiWidget(pos);
                                }
                                else {
                                    timers.stop()
                                }
                            }
                        }
                    ]);
                    timers.start();
                 },
            }

        },
    }
</script>