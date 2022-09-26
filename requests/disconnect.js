function disconnect(req, res) {
    req.session.logged = false
    res.send("true")
}

module.exports = disconnect
