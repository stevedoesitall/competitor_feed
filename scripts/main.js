import {cl, headers} from "https://rawgit.com/stevedoesitall/ditkojs/master/ditko.js";


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
                    cl(resp_data);
                }
            )
        }
    )
    .catch((err) => {
        cl(err);
    });
}

window.onload = get_intel();