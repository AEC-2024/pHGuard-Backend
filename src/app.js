/* app.js */
require('dotenv').config()

/* imports */
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid')
const cookieParser = require('cookie-parser')

/* config */
const port = process.env.PORT || 3000

/* app */
const app = express()

/* middlewares */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false
  })
)

const upload = require('./routes/upload')
app.use('/upload', upload)

const getByDate = require('./routes/get-by-date')
app.use('/get-by-date', getByDate)

const getAllDates = require('./routes/get-dates')
app.use('/get-dates', getAllDates)

const getHistory = require('./routes/get-history')
app.use('/get-history', getHistory)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
