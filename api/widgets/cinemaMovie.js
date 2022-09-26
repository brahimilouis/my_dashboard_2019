const movie = require("node-movie");


function cinemaMovie(req, res)
{
    if (
        !(req.session.logged && req.session.logged === true)
    ) {
        res.send("false")
    } else {
        movie(req.body.movies, data => {
            if (data.Response === "false")
                res.send("false");
            else {
                res.send({
                    name: data["Title"],
                    type: data["Genre"],
                    actors: data["Actors"],
                    writer: data["Writer"],
                    language: data["Language"],
                    premiered: data["Released"],
                    runTime: data["Runtime"]
                })
            }
        });

    }
}

module.exports = cinemaMovie
