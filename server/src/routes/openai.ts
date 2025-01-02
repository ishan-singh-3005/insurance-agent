import express from 'express'
import checkBearerToken from '../middlewares/check-bearer-token'
import errorHandler from '../middlewares/error-handler'
import generateMessage from '../controllers/openai'

// initialize router
const router = express.Router()

router.post('/generate-message', generateMessage, errorHandler)

export default router
