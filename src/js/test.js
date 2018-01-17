var Promise = require("bluebird");
var xhr = require("xhr");
export default () => {
    return new Promise((resolve, reject) => {
        xhr.get("/whatsmyip", {
            timeout: 2000,
            responseType: "text"
        }, (error, response, body) => {
            if (!error && response.statusCode === 200)
                resolve(body);

            console.error("Looks like there was a problem.");
            if (error) console.error(error);
            if (response.statusCode !== 200) console.error(`HTTP Response Code: ${response.statusCode}`);
            reject();
        });
    });
}