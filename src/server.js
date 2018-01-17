const path = require("path");
const express = require("express");
const app = express();
import test from "./js/test.js";
test();

const PUBLIC = path.resolve(__dirname, "public");
console.log(PUBLIC);

app.use('/static', express.static(path.join(PUBLIC, 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
