import { getByClass } from "./domHelpers.js";

// register each of the info boxes
export default {
    ip: ((tc) => { getByClass("infobox-content-ip")[0].textContent = tc }),
    ping: ((tc) => { getByClass("infobox-content-ping")[0].textContent = tc + "ms" }),

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

    ua: ((tc) => {
        var ua_node = getByClass("infobox-content-ua")[0];

        if (tc.length > 80) {
            ua_node.classList.add("infobox-content-small");
        } else {
            ua_node.classList.remove("infobox-content-small");
        }

        ua_node.textContent = tc;
    })
}