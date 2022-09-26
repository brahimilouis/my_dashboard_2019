const { Router } = require('express'),
    mongoose = require('mongoose'),
    dbName = `mongodb://${process.env.DB_HOST || '127.0.0.1'}:27017/dashboard`

const login = require('../requests/login'),
    register = require('../requests/register'),
    disconnect = require('../requests/disconnect'),
    getSettings = require('../requests/getUserSettings'),
    setSettings = require('../requests/setUserSettings'),
    resetSettings = require('../requests/resetUserSettings'),
    connected = require('../requests/connected'),
    about = require('../requests/about.js')

const weather = require('../api/widgets/weather'),
    bourseCompany = require('../api/widgets/companyShare'),
    forexRate = require('../api/widgets/exchangeRate'),
    ytVideo = require('../api/widgets/youtubeVideo'),
    cinemaMovie = require('../api/widgets/cinemaMovie'),
    tvShows = require('../api/widgets/tvShows'),

router = Router();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(
    dbName,
    { useNewUrlParser: true },
    (err) => {
        if (err)
            console.log(`db error ${err.message}`);
        console.log('Connected to MongoDB')
    },
)

router
    .post('/request/register', (req, res) => {
        register(req, res)
    })
    .post('/request/login', (req, res) => {
        login(req, res)
    })
    .post('/request/disconnect', (req, res) => {
        disconnect(req, res)
    })
    .post('/request/connected', (req, res) => {
        connected(req, res)
    })
    .post('/request/getSettings', (req, res) => {
        getSettings(req, res)
    })
    .post('/request/setSettings', (req, res) => {
        setSettings(req, res)
    })
    .post('/request/resetSettings', (req, res) => {
        resetSettings(req, res)
    })
    .post('/api/weather', (req, res) => {
        weather(req, res)
    })
    .post('/api/companyShare', (req, res) => {
        bourseCompany(req, res)
    })
    .post('/api/exchangeRate', (req, res) => {
        forexRate(req, res)
    })
    .post('/api/youtubeVideo', (req, res) => {
        ytVideo(req, res)
    })
    .post('/api/cinemaMovies', (req, res) => {
        cinemaMovie(req, res)
    })
    .post('/api/seriesShows', (req, res) => {
        tvShows(req, res)
    })
    .get('/about.json', (req, res) => {
        about(req, res)
    })

module.exports = router
