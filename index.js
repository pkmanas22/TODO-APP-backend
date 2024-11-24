require('dotenv').config();

const express = require('express')
const { connectDB } = require('./config/connector')

const app = express()
const port = process.env.PORT || 8000

connectDB(process.env.MONGO_URL)
    .then(() => console.log("Connected to mongoDB successfully"))
    .catch((err) => console.error(err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/task', require('./routes/taskRoute'))

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center;">Welcome to TODO-APP</h1>')
})

app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "The requested resource was not found on this server.",
    });
});

app.use((err, req, res, next) => {
    console.error("Unhandled error :: ", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "An unexpected error occurred. Please try again later.",
        details: err.details || null,
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port + " :: http://localhost:" + port)
})