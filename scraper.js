/**
 * Web scraper for books
 */

 const puppeteer = require('puppeteer');
 const random_useragent = require('random-useragent');
 const fs = require('fs'); //file system
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

    // console.log("Name: " + nameTrim);
    // console.log("Price: " + priceTrim);

    //Get current date and time
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; //add 1 to ensure the month does not starts from 0
    const year = date.getFullYear();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const fullDate = `${month}/${day}/${year}`;

    console.log(fullDate + " " + time + " " + nameTrim + " " + priceTrim);

    //Save data to the text file
    const logger = fs.createWriteStream('log.txt', { flags: 'a' });
    logger.write(`${fullDate} - ${time} - ${nameTrim} - ${priceTrim}\n`);
    logger.close()

    //Close browser
    await browser.close();

 })().catch(error => {
     console.log(error);
     process.exit(1);
 })