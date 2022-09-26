const alpha = require('alphavantage')({ key: 'Z8HMA7EPO1RPXCYS' });

function bourseCompany(req, res) {
    if (
        !(req.session.logged && req.session.logged === true)
    ) {
        res.send("false")
    } else {
        console.log("BODY");
        console.log(req.body.company);
        alpha.data
            .intraday(req.body.company)
            .then((data) => {
                console.log("DATA");
                console.log(data);
                let stock = (data['Time Series (1min)'][data['Meta Data']['3. Last Refreshed']]);
                res.send({
                    date: data['Meta Data']['3. Last Refreshed'],
                    open: stock["1. open"],
                    high: stock["2. high"],
                    low: stock["3. low"],
                    close: stock["4. close"],
                    volume: stock["5. volume"]
                })
            })
            .catch((err) => {
                res.send("false")
            })
    }
}

module.exports = bourseCompany
