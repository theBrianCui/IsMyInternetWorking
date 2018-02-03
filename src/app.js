import "./hbs/index.hbs";
import "./css/style.scss";

//const Promise = require("bluebird");
import getMyInfo from "./js/getMyInfo.js";
import ga from "./js/ga.js";

function getByClass(selector) {
    return document.getElementsByClassName(selector);
}

var test_status_nodes = document.getElementsByClassName("js-test-status");
var test_subtitle_node = document.getElementsByClassName("js-test-subtitle")[0];

// register each of the info boxes
var infobox = {
    ip: ((tc) => { getByClass("infobox-content-ip")[0].textContent = tc }),

    location: ((location) => {
        var location_string = "";
        var values = [];
        const desired_attributes = ["city", "region_name", "zip_code", "country_name"];

        for (var i = 0; i < desired_attributes.length; ++i) {
            if (location[desired_attributes[i]])
                values.push(location[desired_attributes[i]]);
        }

        location_string = values.join(", ");

        if (values.length <= 2) {
            location_string += ` (${location["latitude"]}, ${location["longitude"]})`;
        }

        getByClass("infobox-content-loc")[0].textContent = location_string;
    }),

    ping: ((tc) => { getByClass("infobox-content-ping")[0].textContent = tc + "ms" }),
    ua: ((tc) => { getByClass("infobox-content-ua")[0].textContent = tc })
}

function runTest() {
    // set color and status
    for (var i = 0; i < test_status_nodes.length; ++i) {
        test_status_nodes[i].textContent = "MAYBE";
        test_status_nodes[i].classList.remove("red");
        test_status_nodes[i].classList.remove("green");
        test_status_nodes[i].classList.add("orange");
    }

    test_subtitle_node.textContent = "Hold on, I'm checking...";

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
        var test_color = test_success ? "green" : "red";

        for (var i = 0; i < test_status_nodes.length; ++i) {
            test_status_nodes[i].textContent = test_status;
            test_status_nodes[i].classList.remove("orange");
            test_status_nodes[i].classList.add(test_color);
        }

        test_subtitle_node.textContent = test_success ? "Your Internet is Working!" : "Something's Wrong!";
    });
}

function main() {
    // register each test status as clickable for testing
    for (var i = 0; i < test_status_nodes.length; ++i) {
        test_status_nodes[i].addEventListener("click", runTest);
    }

    runTest();
}

document.onreadystatechange = main;