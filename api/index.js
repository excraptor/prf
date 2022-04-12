const express = require('express')
const mongoose = require('mongoose')
const app = express()

// const dbUrl = 'mongodb://localhost:27017'
// mongoose.connect(dbUrl)

// mongoose.connection.on('connected', () => {console.log('db connected')})
// mongoose.connection.on('error', (err) => {console.log('db error',err)})

// mongoose.model('aru', require('./models/arukereso.schema'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', require('./routes'))

app.use('/subrouter-pelda', require('./routes'))

app.use('/pelda', (req, res) => {
    console.log(req.body)
    console.log(req.body.gyakorlat + ' , ' + req.body['gyakvez'])
    return res.status(200).send('OK')
})

app.listen(3000, () => {
    console.log('A szerver elindult')
})