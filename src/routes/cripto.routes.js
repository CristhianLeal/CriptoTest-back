import { Router } from 'express'
import { getCripto } from '../controllers/cripto.controllers.js'

const router = Router()

router.get('/', getCripto)

export default router
