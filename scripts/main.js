import {get_id, cl, headers} from "https://rawgit.com/stevedoesitall/ditkojs/master/ditko.js";

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

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

            const ignore_array = ["weei.radio.com", "hypepotamus.com", "/job/", ".job", ".jobs", "/jobs/", ".jobs", "jobs."];
            const regex = /[^\x00-\x7F]+/g;

            response.json().then(
                function(resp_data) {
                    get_id("wait_msg").classList.add("hide");
                    get_id("intel_block").classList.remove("hide");
                    const clouds = resp_data.clouds;
                    const cloud_keys = Object.keys(clouds);

                    const competitors_one = resp_data.competitorsOne;
                    const competitors_two = resp_data.competitorsTwo;
                    const competitors = Object.assign(competitors_one, competitors_two);
                    const competitor_keys = Object.keys(competitors);

                    for (let x = 0; x < cloud_keys.length; x++) {
                        get_id("clouds").innerHTML += "<h3>" + cap(cloud_keys[x]) + "</h3>";
                        const intel = clouds[cloud_keys[x]];
                        cl(intel.content);
                        intel.content.forEach(content => {
                            for (let x = 0; x < ignore_array.length; x++) {
                                if (content.url.includes(ignore_array[x])) {
                                    cl(content.url);
                                    delete content.url;
                                    break;
                                }
                            }
                            if (content.url && (content.url.indexOf(".com/") != -1 || content.url.indexOf(".co.uk/") != -1 || content.url.indexOf(".net/") != -1 || content.url.indexOf(".org/") != -1) && !content.title.match(regex)) {
                                get_id("clouds").innerHTML += "<p class='section'><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
                            }
                        });
                    }

                    for (let x = 0; x < competitor_keys.length; x++) {
                        get_id("competitors").innerHTML += "<h3>" + cap(competitor_keys[x]) + "</h3>";
                        const intel = competitors[competitor_keys[x]];
                        cl(intel.content);
                        intel.content.forEach(content => {
                            for (let x = 0; x < ignore_array.length; x++) {
                                if (content.url.includes(ignore_array[x])) {
                                    cl(content.url);
                                    delete content.url;
                                    break;
                                }
                            }
                            if (content.url && (content.url.indexOf(".com/") != -1 || content.url.indexOf(".co.uk/") != -1 || content.url.indexOf(".net/") != -1 || content.url.indexOf(".org/") != -1) && !content.title.match(regex)) {
                                get_id("competitors").innerHTML += "<p class='section'><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
                            }
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