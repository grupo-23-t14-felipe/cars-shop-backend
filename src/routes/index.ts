import { Router } from 'express'
import {carsRouter} from './cars.routes'
import { usersRouter } from './users.routes'

const router = Router()

//router.use('/cars', carsRouter)
router.use('/users', usersRouter)

export default router