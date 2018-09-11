import {get_id, cl, headers} from "https://rawgit.com/stevedoesitall/ditkojs/master/ditko.js";


function get_intel() {
    fetch("/server", {
        method: "post",
        headers: headers,
    })
    .then(
        function(response) {
            if (response.status != 200) {
                cl("Error: " + response.status);
                throw new Error ("Something went wrong. Please try again later.");
            }

            response.json().then(
                function(resp_data) {
                    const clouds = resp_data.clouds;
                    const cloud_keys = Object.keys(clouds);

                    const competitors_one = resp_data.competitorsOne;
                    const competitors_two = resp_data.competitorsTwo;
                    const competitors = Object.assign(competitors_one, competitors_two);
                    const competitor_keys = Object.keys(competitors);

                    for (let x = 0; x < cloud_keys.length; x++) {
                        get_id("clouds").innerHTML += "<h3>" + cloud_keys[x] + "</h3>";
                        const intel = clouds[cloud_keys[x]];
                        cl(intel.content);
                        intel.content.forEach(content => {
                            get_id("clouds").innerHTML += "<p><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
                        });
                    }

                    for (let x = 0; x < competitor_keys.length; x++) {
                        get_id("competitors").innerHTML += "<h3>" + competitor_keys[x] + "</h3>";
                        const intel = competitors[competitor_keys[x]];
                        cl(intel.content);
                        intel.content.forEach(content => {
                            get_id("competitors").innerHTML += "<p><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
                        });
                    }
                }
            )
        }
    )
    .catch((err) => {
        cl(err);
    });
}

window.onload = get_intel();