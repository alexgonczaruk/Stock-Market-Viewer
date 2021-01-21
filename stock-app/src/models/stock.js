const mongoose = require('mongoose')

const Stock = mongoose.model('Stock', {
    title: { type: String },
    price: { type: String },
    fluctuation: { type: String },
    time: { type: String }
})

module.exports = Stock