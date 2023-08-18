import { Router } from 'express'
import { getWeather } from '.././controllers/weather.controllers.js'

const router = Router()

router.get('/', getWeather)

export default router
