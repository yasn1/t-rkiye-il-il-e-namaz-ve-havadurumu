const ad = require("./src/utils/adhan.js");
const moment = require("moment-timezone");
require("dotenv").config();
const weather = require("./src/utils/weather.js");
const {getCoordinates, geoFind, findByCoordinates} = require("./src/utils/geo.js");
const express = require("express");
const ratelimit = require("express-rate-limit");
const app = express();
const PORT = process.env.PORT || 8600;
const os = require('os');
const color = require("./src/utils/console.js");
require("ejs");

const limiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})
app.use(limiter)
app.set("view engine","ejs");
app.set("views","./client/views");
app.use(express.static("./client/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(require("./routers/client.js"));

app.listen(PORT,() => {
    os.networkInterfaces()["Wi-Fi 2"].filter(x => x.family === "IPv4").map(x => console.log(color("green",`Server Listening on: http://${x.address}:${PORT}`)));
})