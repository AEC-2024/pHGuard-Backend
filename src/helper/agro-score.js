const AS_TEMP = 22
const AS_PH = 6.5
const AS_HUM = 60
const AS_AQI = 1

const TEMP_THRESH = 0
const PH_LOW = 4
const PH_HIGH = 8
const HUM_THRESH = 10
const AQI_THRESH = 200



const getAgroScore = entry => {
    if (entry.temp > TEMP_THRESH && entry.hummidity > HUM_THRESH && entry.airquality < AQI_THRESH && entry.ph > PH_LOW && entry.ph < PH_HIGH) {
        temp = (Math.abs(entry.temp - AS_TEMP)/AS_TEMP)
        ph = (Math.abs(entry.ph - AS_PH)/AS_PH)
        hum = (Math.abs(entry.hummidity - AS_HUM)/AS_HUM)
        aqi = (Math.abs(entry.aqi - AS_AQI)/AS_AQI)
        AgroScore = (temp + ph + hum + aqi) / 4 * 10
    } else {
        AgroScore = 200
    }
} 
    
