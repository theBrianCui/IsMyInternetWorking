import "./hbs/index.hbs";
import "./css/style.scss";

//const Promise = require("bluebird");
import getMyInfo from "./js/getMyInfo.js";
import ga from "./js/ga.js";
import { getByClass, storage } from "./js/domHelpers.js";
import infobox from "./js/infobox.js";

var test_status_nodes = getByClass("js-test-status");
var test_link_nodes = getByClass("js-test-link");
var test_subtitle_node = getByClass("js-test-subtitle")[0];

var auto_test = {
    node: getByClass("js-reload-rate")[0],
    rate: ([0, 2, 5, 15, 30].indexOf(parseInt(storage.get("auto-test"))) > -1
        ? parseInt(storage.get("auto-test")) : 15),
    timeout: 0
};

var test_in_progress = false;
function runTest() {
    if (test_in_progress) return;
    test_in_progress = true;

    // set color and status
    for (var i = 0; i < test_status_nodes.length; ++i) {
        test_status_nodes[i].textContent = "MAYBE";
        test_status_nodes[i].classList.remove("red", "green");
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
        infobox.ip(result.ip);
        infobox.ping(Date.now() - test_time);
        infobox.location(result.loc);

    }).catch((e) => {
        // test failed
        test_success = false;
        infobox.ip(null);
        infobox.ping(null);
        infobox.location(null);

    }).then(() => {
        var test_status = test_success ? "YES!" : "NO!";
        var test_color = test_success ? "green" : "red";

        for (var i = 0; i < test_status_nodes.length; ++i) {
            test_status_nodes[i].textContent = test_status;
            test_status_nodes[i].classList.remove("red", "orange");
            test_status_nodes[i].classList.add(test_color);
        }

        test_subtitle_node.textContent = test_success ? "Your Internet is Working!" : "Something's Wrong!";
        test_in_progress = false;

        clearTimeout(auto_test.timeout);
        if (auto_test.rate > 0) auto_test.timeout = setTimeout(runTest, auto_test.rate * 1000);
    });
}

function main() {
    // register each test status as clickable for testing
    for (var i = 0; i < test_status_nodes.length; ++i) {
        test_status_nodes[i].addEventListener("click", runTest);
    }

    // and the links too
    for (var i = 0; i < test_link_nodes.length; ++i) {
        test_link_nodes[i].addEventListener("click", runTest);
    }

    // set up the auto test select box
    auto_test.node.value = auto_test.rate;
    auto_test.node.addEventListener("change", function(e) {
        auto_test.rate = auto_test.node.value;
        clearTimeout(auto_test.timeout);
        if (auto_test.rate > 0) auto_test.timeout = setTimeout(runTest, auto_test.rate * 1000);
        storage.set("auto-test", auto_test.rate);
    });

    runTest();
    console.log(`Your Console Works! Build Type: ${process.env.NODE_ENV} : ${WEBPACK_BUILD_DATE}`);
    console.log(`For contributions, please submit pull requests and animated gifs to ${WEBPACK_GIT_REPO} . Thank you!`);
    if (process.env.NODE_ENV === 'production') {
        ga();
    }
}

(function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
})(main);