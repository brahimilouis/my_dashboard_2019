const ytSearch = require("yt-search")

function ytVideo(req, res) {
    if (
        !(req.session.logged && req.session.logged === true)
    ) {
        res.send("false")
    } else {
        console.log(req.body.video);
        ytSearch(req.body.video, function (err, r) {
            if (err)
            {
                console.log(err);
                res.send("false")
            }
            else {
                res.send({
                    titlevideo: r.videos[0].title,
                    publishedAt: r.videos[0].ago,
                    url: r.videos[0].url,
                    duration: r.videos[0].timestamp,
                    author: r.videos[0].author.userName,
                });

            }
        })
    }
}

module.exports = ytVideo
