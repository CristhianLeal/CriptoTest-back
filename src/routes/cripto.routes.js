import { Router } from 'express'
import { getCripto, getInfoCripto } from '../controllers/cripto.controllers.js'

const router = Router()

router.post('/', getCripto)
router.get('/:cripto/:quoteCurrency', getInfoCripto)

export default router
