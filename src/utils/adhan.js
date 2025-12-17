const adhan = require('adhan');
const moment = require("moment-timezone");
const lang = (code,g) => {
    const langs = {
        tr:{
            fajr:"Sabah",
            sunrise:"Gün Doğumu",
            dhuhr:"Öğle",
            asr:"İkindi",
            sunset:"Gün Batımı",
            maghrib:"Akşam",
            isha:"Yatsı"
        },
        en:{
            fajr:"Fajr",
            sunrise:"Sunrise",
            dhuhr:"Dhuhr",
            asr:"Asr",
            sunset:"Sunset",
            maghrib:"Maghrib",
            isha:"Isha"
        }
    }
    return langs[code][g];
}
const ad = (d) => {
    const {lat,lon} = d;
    const coordinates = { latitude: lat, longitude: lon };
    const params = adhan.CalculationMethod.Turkey();
    const date = moment().tz("Europe/Istanbul").toDate();
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    const lg = "tr"
    const pr = {
        [lang(lg,"fajr")]:moment(prayerTimes.fajr).tz('Europe/Istanbul').format('HH:mm'),
        [lang(lg,"sunrise")]:moment(prayerTimes.sunrise).tz('Europe/Istanbul').format('HH:mm'),
        [lang(lg,"dhuhr")]:moment(prayerTimes.dhuhr).tz('Europe/Istanbul').format('HH:mm'),
        [lang(lg,"asr")]:moment(prayerTimes.asr).tz('Europe/Istanbul').format('HH:mm'),
        [lang(lg,"sunset")]:moment(prayerTimes.sunset).tz('Europe/Istanbul').format('HH:mm'),
        [lang(lg,"maghrib")]:moment(prayerTimes.maghrib).tz('Europe/Istanbul').format('HH:mm'),
        [lang(lg,"isha")]:moment(prayerTimes.isha).tz('Europe/Istanbul').format('HH:mm')
    }
    return pr;
}
module.exports = ad;
