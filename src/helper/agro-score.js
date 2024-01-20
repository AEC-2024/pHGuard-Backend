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
  if (
    entry.temp > TEMP_THRESH &&
    entry.humidity > HUM_THRESH &&
    entry.aqi < AQI_THRESH &&
    entry.ph > PH_LOW &&
    entry.ph < PH_HIGH
  ) {
    const temp = Math.abs(entry.temp - AS_TEMP) / AS_TEMP
    const ph = Math.abs(entry.ph - AS_PH) / AS_PH
    const hum = Math.abs(entry.humidity - AS_HUM) / AS_HUM
    const aqi = Math.abs(entry.aqi - AS_AQI) / AS_AQI
    let score = ((temp + ph + hum + aqi) / 4) * 10
    return score > 150 ? 150 : score
  } else {
    return 150
  }
}

module.exports = getAgroScore
