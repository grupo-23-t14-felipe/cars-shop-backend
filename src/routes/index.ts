import { Router } from 'express'
import {carsRouter} from './cars.routes'

const router = Router()

router.use('/cars', carsRouter)

export default router