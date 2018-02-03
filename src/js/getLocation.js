// Performs a GET request to /whatsmyip with a timeout of 2000 ms.
// Returns a Promise with reply. Errors or non-200 status codes reject.
//const Promise = require("bluebird");
const xhr = require("xhr");

export default (ip) => {
    return new Promise((resolve, reject) => {
        xhr.get(`http://127.0.0.1:8080/json/${ip}`, {
            timeout: 10000,

        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
                return;
            }

            console.error("Looks like there was a problem with getting location.");
            if (error) console.error(error.toString());
            if (response.statusCode !== 200) console.error(`HTTP Response Code: ${response.statusCode}`);
            reject();
            return;
        });
    });
}
