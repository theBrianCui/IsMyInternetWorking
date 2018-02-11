const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
import getLocation from "./js/getLocation.js";

const PUBLIC = path.resolve(__dirname, "public");

app.use('/static', express.static(path.join(PUBLIC, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.post('/whatsmyinfo', (req, res) => {
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
