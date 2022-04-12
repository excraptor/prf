const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
        // a fenti paraméterek: string típusú érték, kötelező megadni, egyedinek kell lennie
    password: {type: Number, required: true},
    darab: {type: Number, required: true}
},{collection: 'aruk'})

module.exports = userSchema