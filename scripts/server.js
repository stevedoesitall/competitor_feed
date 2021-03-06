//Create app using express.js
const port = process.env.PORT || 3000;
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dir = path.join(__dirname, "../");

app.use(express.static(dir));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.listen(port, () => console.log("Competitor feed app started on port " + port));

app.post("/server", function(req, res) {
    const url = "http://feed.sailthru.com/ws/feed?id=5b9807ef071eff297b6bb800";

    http.get(url, (cb) => {
    const { statusCode } = cb;
    const contentType = "application/json";

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // consume response data to free up memory
        cb.resume();
        return;
    }

    cb.setEncoding('utf8');
    let rawData = '';
    cb.on('data', (chunk) => { rawData += chunk; });
    cb.on('end', () => {
        try {
        const parsedData = JSON.parse(rawData);
        //Send response data to client
            res.send(parsedData);                            
        } catch (e) {
        console.error(e.message);
            }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
});