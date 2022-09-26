function connected(req, res) {
    if (req.session.logged)
        res.send("true");
    else
        res.send("false")
}

module.exports = connected;
