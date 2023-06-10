import { Router } from 'express'
import {carsRouter} from './cars.routes'
import { usersRouter } from './users.routes'
import { sessionRouter } from './session.routes'

const router = Router()

router.use('/login', sessionRouter)
//router.use('/cars', carsRouter)
router.use('/users', usersRouter)

export default router