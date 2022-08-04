const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const { readdirSync } = require('fs')
const connectDatabase = require('./config/MongoDatabase')


// COnfig
app.use(express.json())
app.use(cors())
dotenv.config()
connectDatabase()



// Route configuration
readdirSync('./routes').map(x => app.use('/', require("./routes/" + x)));



// Listen on host
app.listen(process.env.PORT, function () {
    console.log("Started server on port==> " + process.env.PORT)
})