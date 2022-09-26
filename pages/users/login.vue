<template>
      <v-container fluid :style="{'background-image':'url(https://www.justgeek.fr/wp-content/uploads/2021/06/windows-11-fond-ecran-wallpaper-3-scaled.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }">
        <v-layout column justify-center align-center fill-height>
        <v-flex xs25 sm10 md8>
         <v-container fluid class="text-xs-center">
             <h2>Connexion</h2>
            <v-form>
            <v-text-field name="Username" label="Username" v-model="username"></v-text-field>
            <v-text-field name="Password" label="Password" v-model="password" :type="'password'" @keyup.enter="alert = true; getLogin()"></v-text-field>
            <v-card-actions>
              <v-btn href="/users/register">Register</v-btn>
              <v-btn @click="goLogin()">Login</v-btn>
            </v-card-actions>
              <v-alert id="alert" :value="alert" ></v-alert>
            </v-form>
         </v-container>
        </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import {empty} from "../../.nuxt/utils";
const axios = require('axios');

export default {
  data() {
    return {
      username:"",
      password:"",
      alert: false,
      btn: true
      }
  },
  methods:{
    goLogin() {
        let alerts = document.getElementById("alert");
        if (empty(this.username) || empty(this.password)) {
            alerts.setAttribute("type", "error");
            alerts.classList.remove("success");
            alerts.classList.add("error");
            alerts.innerHTML = "Empty username or password";
            this.alert = true;
        }
        else {
            axios
                .post("/request/login", {
                    username: this.username,
                    password: this.password,
                })
                .then(response => {
                    this.alert = true;
                    if (response.data === true) {
                            alerts.classList.remove("error");
                            alerts.setAttribute("type", "success");
                            alerts.classList.add("success");
                            alerts.innerHTML = "Logging in";
                            setTimeout(() => {
                                window.location.replace("/dashboard")
                            }, 500)
                        }
                    else {
                        alerts.setAttribute("type", "error");
                        alerts.classList.remove("success");
                        alerts.classList.add("error");
                        alerts.innerHTML = "username or passwork incorect";
                    }
                });
        }
    },
  }
}
</script>

