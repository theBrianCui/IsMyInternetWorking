const path = require("path");
const express = require("express");
const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, './index.html'));
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
