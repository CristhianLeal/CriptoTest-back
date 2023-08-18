import axios from 'axios'
import WeatherData from '../model/Weather.js'

export const getWeather = async (req, res) => {
  try {
    const { city, date } = req.body
    const apiKey = process.env.WEATHER_API_KEY
    const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`
    const response = await axios.get(apiUrl)
    const weatherData = response.data

    const {
      forecast: { forecastday }
    } = weatherData

    const newWeatherData = new WeatherData({
      city,
      date: new Date(date),
      forecast: forecastday.map((daily) => ({
        maxtemp_c: daily.day.maxtemp_c,
        mintemp_c: daily.day.mintemp_c,
        avgtemp_c: daily.day.avgtemp_c,
        avghumidity: daily.day.avghumidity,
        condition: daily.day.condition,
        hourly: daily.hour.map((hour) => ({
          time: new Date(hour.time),
          temp_c: hour.temp_c,
          condition: hour.condition,
          precip_mm: hour.precip_mm,
          humidity: hour.humidity,
          feelslike_c: hour.feelslike_c
        }))
      }))
    })

    await newWeatherData.save()
    res.json({ message: 'Datos climáticos guardados exitosamente' })
  } catch (error) {
    console.error('Error al guardar datos climáticos:', error)
    res.status(500).json({ message: 'Error al guardar datos climáticos' })
  }
}
