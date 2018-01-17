const Promise = require("bluebird");
import getMyIp from "./js/getMyIp.js";
import ga from "./js/ga.js";

getMyIp().then((result) => {
    document.write(result);
}).catch((error) => {
    document.write(error);
});
