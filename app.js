require('dotenv').config()
// require('express-async-errors')

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');


const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoute')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/account', authRouter)
app.use('/api/v1/auth', authRouter)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        )
    } catch (error) {
        console.log(error)
    }
}

start()
