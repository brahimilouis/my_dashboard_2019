const users = require('../models/userModel.js')

function setUserSettings(req, res) {
    if (!(req.session.username && req.session.logged && req.body.setting)) {

        res.send("false")
    } else {
        users.find({ username: req.session.username }, (err, user) => {
            if (err) throw err;
            if (user && user.length === 1) {
                users.findById(user[0]._id, (err, user) => {
                    if (err) throw err;
                    req.body.setting.load = false;
                    req.body.setting.data = false;
                    user.settings.push(req.body.setting);
                    user.markModified('settings');
                    user.save();
                    res.send("true")
                })
            } else {
                res.send("false")
            }
        })
    }
}

module.exports = setUserSettings
