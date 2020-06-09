/**
 * Web scraper for books
 */

 const puppeteer = require('puppeteer');
 const { url } = require('./config');

 ;(async () => {
    //Open browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    //Setup browser
    await page.setDefaultTimeout(10000);
    await page.setViewport({ width: 1200, height: 800 });

    //Close browser
    await browser.close();

 })().catch(error => {
     console.log(error);
     process.exit(1);
 })