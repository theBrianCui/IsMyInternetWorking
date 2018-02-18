// Performs a GET request to /whatsmyinfo with a timeout of 2000 ms.
// Returns a Promise with reply. Errors or non-200 status codes reject.
//const Promise = require("bluebird");
const xhr = require("xhr");

export default () => {
    return new Promise((resolve, reject) => {
        var url = `/whatsmyinfo?n=${Date.now()}`;

        // if compiled inline, offer a full path URL for usage offline
        // fall back to the old school method of pinging
        if (process.env.NODE_INLINE === "true") {
            url = "https://ismyinternetworking.com" + url;
        }

        xhr.post(url, {
            timeout: 2000,
            responseType: "json"

        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
                return;
            }

            console.error("Looks like there was a problem.");
            if (error) console.error(error);
            if (response.statusCode !== 200) console.error(`HTTP Response Code: ${response.statusCode}`);
            reject();
            return;
        });
    });
}