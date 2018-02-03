// Performs a GET request to /whatsmyip with a timeout of 2000 ms.
// Returns a Promise with reply. Errors or non-200 status codes reject.
const rp = require("request-promise-native");

export default (ip) => {
    const options = {
        uri: `http://127.0.0.1:8080/json/${ip}`,
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options);
}
