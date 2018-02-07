import { getByClass, storage } from "./domHelpers.js";

// save a reference to the nodes that need updating
const target_nodes = {
    ip: getByClass("infobox-content-ip")[0],
    ip_prev: getByClass("infobox-content-ip-prev")[0],
    ping: getByClass("infobox-content-ping")[0],
    location: getByClass("infobox-content-loc")[0],
    ua: getByClass("infobox-content-ua")[0]
}

// setters for each of the info boxes
export default {
    ip: (function() {
        var current_ip = null;
        var prev_ip = storage.get("infobox-prev-ip") || null;

        return (new_ip) => {
            // do nothing if the current and new IPs are the same
            // preserve the old prev_ip
            if (current_ip === new_ip)
                return;

            target_nodes.ip_prev.textContent = prev_ip = current_ip || prev_ip || "N/A";
            target_nodes.ip.textContent = ((current_ip = new_ip) !== null ? current_ip : "N/A");

            storage.set("infobox-prev-ip", current_ip);
        }
    })(),

    ping: ((tc) => {
        target_nodes.ping.textContent = tc ? tc + "ms" : "N/A";
    }),

    location: ((location) => {
        if (!location) {
            target_nodes.location.textContent = "N/A";
            return;
        }

        // Construct a string with the desired attributes, then join with a comma
        var location_string = "";
        var values = [];
        const desired_attributes = ["city", "region_name", "zip_code", "country_name"];

        for (var i = 0; i < desired_attributes.length; ++i) {
            if (location[desired_attributes[i]])
                values.push(location[desired_attributes[i]]);
        }

        location_string = values.join(", ");

        if (values.length <= 2) {
            location_string += ` (Lat: ${location["latitude"]}, Long: ${location["longitude"]})`;
        }

        target_nodes.location.textContent = location_string;
    }),

    ua: ((tc) => {
        var ua_node = target_nodes.ua;

        if (tc.length > 80) {
            ua_node.classList.add("infobox-content-small");
        } else {
            ua_node.classList.remove("infobox-content-small");
        }

        ua_node.textContent = tc;
    })
}