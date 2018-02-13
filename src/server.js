'use strict';
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
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(compression())
}

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

var ports = [];
switch (process.env.NODE_ENV) {
    case "production":
    case "staging":
        ports = [8000, 8001];
        break;
    default:
        ports = [8000];
}

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    require('greenlock-express').create({
        server: process.env.NODE_ENV === "production" ? 'https://acme-v01.api.letsencrypt.org/directory' : 'staging',
        email: 'webmaster@ismyinternetworking.com',
        agreeTos: true,
        approveDomains: ['ismyinternetworking.com'],
        app: app,
    }).listen(...ports);
} else {
    app.listen(...ports, () => console.log('IMIW3 Express app listening on port 8000!'));
}