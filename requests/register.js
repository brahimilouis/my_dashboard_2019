const users = require('../models/userModel.js')

function register(req, res) {
    if (!(req.body.username && req.body.password)) {
        res.send("false")
    } else {
        users.find({ username: req.body.username }, (err, user) => {
            if (err) throw err;
            if (user && user.length >= 1) {
                res.send("false")
            } else {
                let newUser = new users({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    settings: [],
                });
                newUser.save();
                res.send("true")
            }
        })
    }
}

module.exports = register
