const users = require('../models/userModel.js')

function getUserSettings(req, res) {
    if (!(req.session.username && req.session.logged)) {
        res.send("false")
    } else {
        users.find({ username: req.session.username }, (err, user) => {
            if (err) throw err;
            if (user && user.length === 1 && user[0].settings.length > 0)
                res.send(user[0].settings)
            else res.send("false")
        })
    }
}

module.exports = getUserSettings
