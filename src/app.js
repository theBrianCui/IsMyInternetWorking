import "./hbs/index.hbs";
import "./css/style.scss";

//const Promise = require("bluebird");
import getMyInfo from "./js/getMyInfo.js";
import ga from "./js/ga.js";

function getByClass(selector) {
    return document.getElementsByClassName(selector);
}

// register each of the info boxes
var infobox = {
    ip: ((tc) => { getByClass("infobox-content-ip")[0].textContent = tc }),
    location: ((tc) => { getByClass("infobox-content-loc")[0].textContent = tc }),
    ping: ((tc) => { getByClass("infobox-content-ping")[0].textContent = tc + "ms" }),
    ua: ((tc) => { getByClass("infobox-content-ua")[0].textContent = tc })
}

// register each test status as clickable for testing
var test_status_nodes = document.getElementsByClassName("js-test-status");

function runTest() {
    // set color and status
    for (var i = 0; i < test_status_nodes.length; ++i) {
        test_status_nodes[i].textContent = "MAYBE";
        test_status_nodes[i].classList.remove("red");
        test_status_nodes[i].classList.remove("green");
        test_status_nodes[i].classList.add("orange");
    }

    // update the user agent immediately
    infobox.ua(navigator.userAgent);

    // query the server
    var test_time = Date.now();
    var test_success = false;
    var ip_address = null;

    var ipAddr = getMyInfo().then((result) => {
        // test successful
        test_success = true;
        infobox.ping(Date.now() - test_time);
        infobox.ip(result.ip);
        infobox.location(result.loc);

    }).catch((e) => {
        // test failed
        test_success = false;
        infobox.ping("N/A");
        infobox.ip("N/A");
        infobox.location("N/A");

    }).then(() => {
        var test_status = test_success ? "YES!" : "NO!";
        var test_subtitle = test_success ? "Your Internet is Working!" : "Something's Wrong!";
        var test_color = test_success ? "green" : "red";

        for (var i = 0; i < test_status_nodes.length; ++i) {
            test_status_nodes[i].textContent = test_status;
            test_status_nodes[i].classList.remove("orange");
            test_status_nodes[i].classList.add(test_color);
        }
    });
}

function main() {
    for (var i = 0; i < test_status_nodes.length; ++i) {
        test_status_nodes[i].addEventListener("click", runTest);
    }

    runTest();
}

document.onreadystatechange = main;