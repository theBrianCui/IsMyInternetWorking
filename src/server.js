const path = require("path");
const express = require("express");
const app = express();
const compression = require("compression");
require('dotenv').config();
import getLocation from "./js/getLocation.js";

const PUBLIC = path.resolve(__dirname, "public");

/*
we can exclude a route from compression using the filter attribute
this only saves about 20 bytes, so probably not worth it
{
    // exclude the /whatsmyinfo route from compression
    filter: (req, res) => {
        return req.path !== "/whatsmyinfo";
    }
}
*/
if (process.env.NODE_ENV === "production") {
    app.use(compression());
    app.set('trust proxy', true);
    // support static retrieval on well-known endpoint for tls
    app.use('/.well-known', express.static('/home/public/.well-known'))
}

app.use('/static', express.static(path.join(PUBLIC, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.get('/blank.gif', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'static/img/blank.gif'));
});

app.post('/whatsmyinfo', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let payload = {
        ip: req.ip,
        loc: null
    };

    getLocation(req.ip).then((location) => {
        payload.loc = location;
    }).catch(() => {
        payload.loc = null;
    }).then(() => {
        res.send(JSON.stringify(payload));
    });
});

app.listen(8000, () => console.log('IMIW3 Express app listening on port 8000!'));
