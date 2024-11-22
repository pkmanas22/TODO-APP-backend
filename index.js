require('dotenv').config();

const express = require('express')
const { connectDB } = require('./config/connector')

const app = express()
const port = process.env.PORT || 8000

connectDB(process.env.MONGO_URL)
    .then(() => console.log("Connected to mongoDB successfully"))
    .catch((err) => console.log("Error while connecting to mongoDB: ", err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/task', require('./routes/taskRoute'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('*', (req, res) => {
    res
        .status(404)
        .json({
            message: "Invalid endpoint / route"
        })
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})