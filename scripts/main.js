import {cl, headers} from "https://rawgit.com/stevedoesitall/ditkojs/master/ditko.js";


function get_intel() {
    cl('hi')
    fetch("http://feed.sailthru.com/ws/feed?id=57291f1b1aa312342f8b456b", {
        method: "post",
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://learninglibrary.herokuapp.com"
        },
        mode: "no-cors"
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
        alert(err);
    });
}

window.onload = get_intel();