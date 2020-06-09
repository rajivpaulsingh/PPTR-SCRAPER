/**
 * Web scraper for books
 */

 const puppeteer = require('puppeteer');
 const random_useragent = require('random-useragent');
 const { url } = require('./config');

 ;(async () => {
    //Open browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    //Setup browser
    await page.setDefaultTimeout(10000);
    await page.setViewport({ width: 1200, height: 800 });
    await page.setUserAgent(random_useragent.getRandom());

    //Get data from bookstore
    const name_selector = ".product_main > h1";
    const price_selector = ".price_color";
    await page.goto(url);
    await page.waitForSelector(name_selector);
    await page.waitForSelector(price_selector);

    const name = await page.$eval(name_selector, element => element.innerHTML)
    const price = await page.$eval(price_selector, element => element.innerHTML)
    const nameTrim = name.trim();
    const priceTrim = price.trim();

    console.log("Name: " + nameTrim);
    console.log("Price: " + priceTrim);

    //Close browser
    await browser.close();

 })().catch(error => {
     console.log(error);
     process.exit(1);
 })