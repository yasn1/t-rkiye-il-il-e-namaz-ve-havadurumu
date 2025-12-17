const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={key}"
const key = process.env.OPENWEATHER;
const fs = require("fs");
const toC = k => Number((k - 273.15).toFixed(2));
const toF = k => Number((k * 9/5 - 459.67).toFixed(2));
const lang = (code,g) => {
  const langs = {
    tr:{
      "clear sky":"Açık Gökyüzü",
      "few clouds":"Az Bulutlu",
      "scattered clouds":"Dağılmış Bulutlu",
      "broken clouds":"Parçalı Bulutlu",
      "shower rain":"Bulutlu yağmur",
      "rain":"Yağmur",
      "thunderstorm":"Güçlü yağmur",
      "snow":"Kar",
      "mist":"Bulutlu",
      "thunderstorm with light rain":"Hafif yağmurlu gök gürültülü fırtına",
      "thunderstorm with rain":"Yağmurlu Fırtına",
      "thunderstorm with heavy rain":"Şiddetli yağmurlu gök gürültülü fırtına",
      "light thunderstorm":"Hafif fırtına",
      "thunderstorm":"Fırtına",
      "heavy thunderstorm":"Güçlü fırtına",
      "ragged thunderstorm":"Parçalı fırtına",
      "thunderstorm with light drizzle":"Hafif yağmurlu gök gürültülü fırtına",
      "thunderstorm with drizzle":"Çiselemeli gök gürültülü fırtına",
      "thunderstorm with heavy drizzle":"Şiddetli çiselemeli gök gürültülü fırtına",
      "light intensity drizzle":"Hafif çiseleme",
      "drizzle":"Çiseleyen yağmur",
      "heavy intensity drizzle":"Şiddetli Çiseleme",
      "shower rain and drizzle":"Sağanak yağmur ve çiseleme",
      "heavy intensity shower rain and drizzle":"Şiddetli sağanak yağmur ve çiseleme",
      "ragged shower rain and drizzle":"Parçalı sağanak yağmur ve çiseleme",
      "shower rain":"Bulutlu yağmur",
      "heavy intensity shower rain":"Şiddetli bulutlu yağmur",
      "ragged shower rain":"Parçalı bulutlu yağmur",
      "light rain":"Hafif yağmur",
      "moderate rain":"Orta şiddetli yağmur",
      "heavy intensity rain":"Şiddetli yağmur",
      "very heavy rain":"Çok şiddetli yağmur",
      "extreme rain":"Aşırı yağmurlu",
      "thunderstorm with rain":"Güçlü yağmur",
      "heavy rain and snow":"Şiddetli yağmur ve kar",
      "ragged rain and snow":"Parçalı yağmur ve kar",
      "shower snow":"Bulutlu kar",
      "heavy shower snow":"Şiddetli bulutlu kar",
      "mist":"Sisli",
      "fog":"Sisli",
      "few clouds: 11-25% ":"Az bulutlu: %11-25",
      "scattered clouds: 25-50%":"Dağılmış bulutlu: %25-50",
      "broken clouds: 51-84%":"Parçalı bulutlu: %51-84",
      "overcast clouds: 85-100%":"Parçalı bulutlu: %85-100",
      "squalls":"Fırtına",
      "sleet":"Sulu kar",
      "light shower sleet":"Hafif sağanak kar",
      "shower sleet":"Sağanak kar",
      "light rain and snow":"Hafif yağmur ve kar",
      "rain and snow":"Yağmur ve kar",
      "light snow":"Hafif kar",
      "snow":"Kar",
      "heavy snow":"Şiddetli kar",
    }
  }
  return langs[code][g] || g;
}
const weather = async (a) => {
  try{
    const {lat,lon,si="Cel"} = a;
    if(!lat || !lon) throw new Error("weather coordinat is invalid");
    const res = await fetch(`${BASE_URL.replace("{lat}",lat).replace("{lon}",lon).replace("{key}",key)}`);
    let d = await res.json();
    let data = d;
    const icon = data.weather[0].icon;
    data.weather[0].icon = `https://openweathermap.org/img/wn/${icon}@2x.png`
    if(si === "Cel"){
      data.main.temp = toC(d.main.temp);
      data.main.feels_like = toC(d.main.feels_like);
      data.main.temp_min = toC(d.main.temp_min);
      data.main.temp_max = toC(d.main.temp_max);
    }else if(si === "Far"){
      data.main.temp = toF(d.main.temp);
      data.main.feels_like = toF(d.main.feels_like);
      data.main.temp_min = toF(d.main.temp_min);
      data.main.temp_max = toF(d.main.temp_max);
    }
    data.weather[0].description = lang("tr",data.weather[0].description);
    return {status:200,data:data};
  }catch(err){
    return {status:400,message:err.message}
  }
}
module.exports = weather;