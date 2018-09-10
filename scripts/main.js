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
                    const email_content = resp_data.email.content;
                    const mobile_content = resp_data.mobile.content;
                    const onsite_content = resp_data.onsite.content;

                    email_content.forEach(content => {
                        get_id("email").innerHTML += "<p><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
                    });

                    mobile_content.forEach(content => {
                        get_id("mobile").innerHTML += "<p><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
                    });

                    onsite_content.forEach(content => {
                        get_id("onsite").innerHTML += "<p><a href='" + content.url + "' target='_blank'>" + content.title + "</a></p>"
                    });
                }
            )
        }
    )
    .catch((err) => {
        cl(err);
    });
}

window.onload = get_intel();