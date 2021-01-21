const { webscrape } = require('./utils/webscrape')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
require('./db/mongoose')
const Stock = require('./models/stock')

const app = express()
const port = 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {})
})

app.get('/stock', (req, res) => {
    fs.stat('./public/img/stockGraph.jpg', function(err, stat) {
        if(err == null) {
            fs.unlinkSync('./public/img/stockGraph.jpg')
        }
    })

    if(!req.query.symbol) {
        return res.send({
            error: 'You must provide a valid stock symbol'
        })
    }
    webscrape(req.query.symbol).then(( $ ) => {
        if($('#quote-header-info > div > div > div > h1').text() === '') {
            return res.send({
                error: 'Cannot find any data for stock symbol ' + req.query.symbol
            })
        }

        title = $('#quote-header-info > div > div > div > h1').text(),
        price = '$' + $('#quote-header-info > div > div > div > span[data-reactid=32]').text(),
        fluctuation = $('#quote-header-info > div > div > div > span[data-reactid=33]').text(),
        time = $('#quote-market-notice > span').text()

        const stock = new Stock({
            title,
            price,
            fluctuation,
            time
        })

        stock.save().then(() => {
            console.log(stock)
        }).catch(() => {
            console.log('Error! Cannot add stock data')
        })

        res.send({
            title,
            price,
            fluctuation,
            time
        })
    })
    
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

