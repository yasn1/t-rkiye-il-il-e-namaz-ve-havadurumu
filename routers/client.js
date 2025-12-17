const {Router} = require("express");
const app = Router();
const getWeather = require("../src/utils/weather.js");
const {getCoordinates, geoFind, findByCoordinates} = require("../src/utils/geo.js");
const getAdhan = require("../src/utils/adhan.js");

app.get("/", (req,res) => {
    res.render("index")
})

app.post("/weather", async (req,res) => {
    const {district} = req.body;
    if(!district){
        return res.status(400).json({message:"Lütfen geçerli bir il veya ilçe yazın.",status:400})
    }
    let data = {weather:{}};
    const province = geoFind(district)[0]?.target;
    if(!province){
        return res.status(400).json({message:"Lütfen geçerli bir il veya ilçe yazın.",status:400})
    }
    const weather = await getWeather(getCoordinates(district));
    const adhan = await getAdhan(getCoordinates(district));
    const coordinates = getCoordinates(province);
    data.weather.icon = weather.data.weather[0].icon;
    data.weather.description = weather.data.weather[0].description;
    data.weather.temperature = weather.data.main.temp.toFixed(0);
    data.weather.humidity = weather.data.main.humidity;
    data.weather.pressure = weather.data.main.pressure;
    data.weather.windSpeed = weather.data.wind.speed;
    data.weather.windDirection = weather.data.wind.deg;
    data.adhan = adhan;
    data.province = {province:province.split(" / ")[0],district:province.split(" / ")[1],lat:coordinates.lat,lon:coordinates.lon};
    return res.status(200).json({data,status:200})
})
app.post("/current", async (req,res) => {
    const {lat,lon} = req.body;
    if(!lat || !lon){
        return res.status(400).json({message:"Lütfen geçerli bir il veya ilçe yazın."})
    }
    let data = {weather:{}};
    const weather = await getWeather({lat,lon});
    const adhan = await getAdhan({lat,lon});
    const province = findByCoordinates(lat,lon);
    data.weather.icon = weather.data.weather[0].icon;
    data.weather.description = weather.data.weather[0].description;
    data.weather.temperature = weather.data.main.temp.toFixed(0);
    data.weather.humidity = weather.data.main.humidity;
    data.weather.pressure = weather.data.main.pressure;
    data.weather.windSpeed = weather.data.wind.speed;
    data.weather.windDirection = weather.data.wind.deg;
    data.adhan = adhan;
    data.province = {province:province.Province,district:province.District,lat,lon};
    return res.status(200).json({data})
})

module.exports = app
