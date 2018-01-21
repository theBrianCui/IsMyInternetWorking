const path = require("path");
const express = require("express");
const app = express();

const PUBLIC = path.resolve(__dirname, "public");

app.use('/static', express.static(path.join(PUBLIC, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.post('/whatsmyip', (req, res) => {
    res.send(req.ip);
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
