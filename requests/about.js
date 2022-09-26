function about(req, res) {
    let about = {
        client: {
            host: req.connection.remoteAddress,
        },
        server: {
            current_time: new Date().getTime(),
            services: [
                {
                    name: 'Meteo',
                    widgets: [
                        {
                            name: 'City temperature',
                            description: 'City temperature en C ou F',
                            params: [
                                {
                                    name: 'city',
                                    type: 'string',
                                },
                                {
                                    name: 'temp',
                                    type: 'string',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Finance',
                    widgets: [
                        {
                            name: 'Company share',
                            description: 'display the company\'s stock value',
                            params: [
                                {
                                    name: 'company',
                                    type: 'string',
                                },
                            ],
                        },
                        {
                            name: 'Exchange rate',
                            description:
                                'Get the exchange rate between two money',
                            params: [
                                {
                                    name: 'money1',
                                    type: 'string',
                                },
                                {
                                    name: 'money2',
                                    type: 'string',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Youtube',
                    widgets: [
                        {
                            name: 'Youtube video',
                            description: "Display information about a video",
                            params: [
                                {
                                    name: 'video',
                                    type: 'string',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Cinema',
                    widgets: [
                        {
                            name: 'Series',
                            description: "Display information about a series",
                            params: [
                                {
                                    name: 'series',
                                    type: 'string',
                                },
                            ],
                        },
                        {
                            name: 'Movies',
                            description: "Display information about a movies",
                            params: [
                                {
                                    name: 'movies',
                                    type: 'string',
                                },
                            ],
                        },
                    ],

                },
            ],
        },
    };
    res.json(about)
}

module.exports = about;
