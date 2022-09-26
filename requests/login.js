const users = require('../models/userModel.js'),
    bcrypt = require('bcrypt')

function login(req, res) {
    if (!(req.body.username && req.body.password)) {
        res.send("false")
    } else {
        users.find({ username: req.body.username }, (err, user) => {
            if (err) throw err
            if (user && user.length === 1) {
                bcrypt.compare(
                    req.body.password,
                    user[0]['password'],
                    (err, result) => {
                        if (err) throw err
                        if (result) {
                            req.session.logged = true
                            req.session.username = req.body.username
                            res.send("true")

                        } else
                            res.send("false")
                    }
                )
            } else {
                res.send("false")
            }
        })
    }
}

module.exports = login
