const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--window-size=1440,800',
        ],
        defaultViewport: null
    })

    const page = await browser.newPage()
    // await page.setViewport({
    //     width: 1440,
    //     height: 800,
    //     deviceScaleFactor: 1
    // })
  
    await page.goto('https://google.com')
  


    //await page.click('#interactive-2col-qsp-m > a > span > span', { waitUntil: 'networkidle2' });
    await page.screenshot({
        path: './public/img/test.jpg',
        clip: {
            x: 0,
            y: 150,
            width:800,
            height:450
        }
    });
    


})()