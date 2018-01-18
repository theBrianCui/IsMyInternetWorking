import "./hbs/index.hbs";
import "./css/style.scss";

const Promise = require("bluebird");
import getMyIp from "./js/getMyIp.js";
import ga from "./js/ga.js";

getMyIp().then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
});
