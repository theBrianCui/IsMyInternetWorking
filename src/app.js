import "./hbs/index.hbs";
import "./css/style.scss";

const Promise = require("bluebird");
import getMyIp from "./js/getMyIp.js";
import ga from "./js/ga.js";

function getByClass(selector) {
    return document.getElementsByClassName(selector);
}

// register each of the info boxes
var infobox = {
    ip: getByClass("infobox-content-ip")[0],
    location: getByClass("infobox-content-loc")[0],
    ping: getByClass("infobox-content-ping")[0],
    ua: getByClass("infobox-content-ua")[0]
};

function runTest(e) {
    // update the user agent immediately
    infobox.ua = navigator.userAgent;

    // query the server real fast
    var test_time = Date.now();
    getMyIp().then((result) => {
        infobox.ping.textContent = `${Date.now() - test_time} ms`;
        infobox.ip.textContent = result;
    }).catch((e) => {
    });
}

// register each test status as clickable for testing
var test_status_nodes = document.getElementsByClassName("js-test-status");
for (var i = 0; i < test_status_nodes.length; ++i) {
    test_status_nodes[i].addEventListener("click", runTest);
}
