const weatherjs = require('weather-js');

function weather(req, res) {
    var temp = '';
    if (req.body.temp === "Celsius")
        temp = 'C';
    else
        temp = 'F';

    if (!(req.session.logged && req.session.logged === true)) {
        res.send("false")
    }
    else {
        weatherjs.find({search: req.body.city, degreeType: temp}, function (err, result) {
            if (err) {
                res.send("false");
            }
            let location = req.body.city;
            if (result[0].current.observationpoint)
                location = result[0].current.observationpoint
            res.send(
                {
                    location: location,
                    temp: result[0].current.temperature + "°" + temp,
                    humidity: result[0].current.humidity,
                    windspeed: result[0].current.winddisplay,
                    desc: result[0].current.skytext,
                    img: result[0].current.imageUrl,
                    meteoloading: false
                }
            );
        });
    }
}

module.exports = weather
