const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function webscrape(stock) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--window-size=1440,800',
            ],
            defaultViewport: null
        })
        const page = await browser.newPage()
        await page.goto("https://ca.finance.yahoo.com/quote/" + stock)


        const content = await page.content()
        const $ = await cheerio.load(content)

        await page.click('#interactive-2col-qsp-m > a > span > span', { waitUntil: 'networkidle2' })
        await page.waitForTimeout(1000)
        await page.click('#chart-toolbar > div:nth-child(1) > div > ul > li:nth-child(2) > button > span > span', {waitUntil: 'networkidel2'})

        page.waitForTimeout(2000).then(() => page.screenshot({
            path: './public/img/stockGraph.jpg',
            clip: {
                x: 18,
                y: 150,
                width: 1215,
                height: 490
            }
        }));

        return $

    } catch(error) {
        console.log('ERROR: ' + error)
    }
}

// webscrape('TSLA').then(( { title, price, fluctuation } ) => console.log(title, price, fluctuation))

module.exports = { webscrape }