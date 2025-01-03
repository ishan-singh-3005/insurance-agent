import dotenv from 'dotenv'
dotenv.config()

const ORIGIN = '*'
const PORT = process.env.PORT || 8080

// For "MongoDB Atlas": edit MONGO_URI in -> .env file
// For "MongoDB Community Server": edit <DB_NAME> in -> MONGO_URI below
const MONGO_URI = process.env.MONGO_URI
const MONGO_OPTIONS = {}

const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export { ORIGIN, PORT, MONGO_URI, MONGO_OPTIONS, JWT_SECRET, OPENAI_API_KEY }
