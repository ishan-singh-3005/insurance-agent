const ORIGIN = '*'
const PORT = process.env.PORT || 8080

// For "MongoDB Atlas": edit MONGO_URI in -> .env file
// For "MongoDB Community Server": edit <DB_NAME> in -> MONGO_URI below
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.2uwgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const MONGO_OPTIONS = {}

const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'

export { ORIGIN, PORT, MONGO_URI, MONGO_OPTIONS, JWT_SECRET }