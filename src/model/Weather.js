import { model, Schema } from 'mongoose'

const HourlyWeatherSchema = new Schema({
  time: {
    type: Date,
    required: true
  },
  temp_c: Number,
  condition: {
    text: String,
    icon: String
  },
  precip_mm: Number,
  humidity: Number,
  feelslike_c: Number
}, { _id: false })

const DailyWeatherSchema = new Schema({
  maxtemp_c: Number,
  mintemp_c: Number,
  avgtemp_c: Number,
  avghumidity: Number,
  condition: {
    text: String,
    icon: String
  },
  hourly: [HourlyWeatherSchema]
}, { _id: false })

const WeatherDataSchema = new Schema(
  {
    city: {
      type: String,
      required: [true, 'La ciudad es requerida']
    },
    date: {
      type: Date,
      required: [true, 'La fecha es requerida']
    },
    forecast: [DailyWeatherSchema]
  },
  {
    timestamps: true
  }
)

export default model('WeatherData', WeatherDataSchema)
