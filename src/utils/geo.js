const sm = require("string-similarity");
const moment = require("moment");

const getCoordinates = (d) => {
    try{
        if (!d) throw new Error("Please provide a district");
    let a = geoFind(d);
    if (a.length === 0) throw new Error("District not found");
    const province = a[0].target.split(" / ")[0];
    const district = a[0].target.split(" / ")[1];
    const data = require("../dataset/geo.json");
    if (district) {
        const provinceData = data.find(i => i.Province === province);
        const districtData = provinceData.Districts.find(i => i.District === district);
        return { location: province + " / " + districtData.District, lat: districtData.Coordinates.split(", ")[0], lon: districtData.Coordinates.split(", ")[1],status:200 };
    } else {
        const provinceData = data.find(i => i?.Province === province || i?.PlateNumber === province);
        return { location: provinceData?.Province, lat: provinceData?.Coordinates.split(", ")[0], lon: provinceData?.Coordinates.split(", ")[1],status:200 };
    }
    }catch(err){
        return {status:400,message:err.message}
    }
}

const geoFind = (...d) => {
    const input = d[0];
    const data = require("../dataset/geo.json");
    const dataSet = data.map(i => String(i.PlateNumber));
    data.map(i => dataSet.push(i.Province));
    const districts = [];
    data.forEach((d) => {
        d.Districts.map(i => districts.push(`${d.Province} / ${i.District}`))
    });
    districts.map(i => dataSet.push(i))
    const match = sm.findBestMatch(input, dataSet);
    const ratings = match.ratings.sort((a, b) => b.rating - a.rating);
    if(ratings[0].rating === 0){
        return [];
    };
    return ratings;
}


findByCoordinates = (lat, lon) => {
    const data = require("../dataset/geo.json");
    data.forEach((d, i) => {
        const dLat = Number(d.Coordinates.split(", ")[0]);
        const dLon = Number(d.Coordinates.split(", ")[1]);
        data[i].DLat = Math.abs(dLat - lat)
        data[i].DLon = Math.abs(dLon - lon);
    })
    data.sort((a, b) => Math.abs(a.DLat) + Math.abs(a.DLon) - Math.abs(b.DLat) - Math.abs(b.DLon))
    data[0].Districts.forEach((d,i) => {
        const dLat = Number(d.Coordinates.split(", ")[0]);
        const dLon = Number(d.Coordinates.split(", ")[1]);
        data[0].Districts[i].DLat = Math.abs(dLat - lat)
        data[0].Districts[i].DLon = Math.abs(dLon - lon);
    })
    data[0].Districts.sort((a, b) => Math.abs(a.DLat) + Math.abs(a.DLon) - Math.abs(b.DLat) - Math.abs(b.DLon))
    data[0].Districts[0].Province = data[0].Province;
    return data[0].Districts[0];
}




module.exports = { geoFind, getCoordinates, findByCoordinates };