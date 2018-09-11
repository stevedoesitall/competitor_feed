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
                const competitors = Object.keys(resp_data);
                const length = competitors.length;
                cl(competitors);
                    for (let x = 0; x < competitors.length; x++) {
                        get_id("intel_block").innerHTML += "<h3>" + competitors[x] + "</h3>";
                        const intel = resp_data[competitors[x]];
                        cl(intel.content);
                        intel.content.forEach(content => {
                            get_id("intel_block").innerHTML += "<p><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
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