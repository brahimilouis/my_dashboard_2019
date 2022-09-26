const users = require('../models/userModel.js');

function resetUserSettings(req, res) {
    if (!(req.session.username && req.session.logged)) {
        res.send("false")
    } else {
        users.find({ username: req.session.username }, (err, user) => {
            if (err) throw err;
            if (user && user.length === 1) {
                users.findById(user[0]._id, (err, user) => {
                    if (err) throw err;
                    user.settings = [];
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

module.exports = resetUserSettings;
