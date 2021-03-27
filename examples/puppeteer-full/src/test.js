const puppeteer = require("puppeteer");
const fs = require("fs");

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        "userDataDir": "logs/chrome",
        // "defaultViewport": {
        //     "isLandscape": false,
        //     "height": 800,
        //     "width": 1200
        // }
    });


    try {
        const page = await browser.newPage();
        page.setViewport({ width: 1200, height: 800 });

        console.log("ready open page");
        await page.goto("https://blog.alanwei.com/");
        console.log("wait 5s");
        await page.waitForTimeout(5 * 1000);
        console.log("ready screen shot");
        await page.screenshot({
            path: "logs/home.png",
            type: "png",
            fullPage: true,
            encoding: "binary"
        });

        console.log("ready open page");
        await page.goto("https://blog.alanwei.com/docs/reading/mastering-spring-5");
        console.log("wait 5s");
        await page.waitForTimeout(5 * 1000);
        await page.pdf({
            path: "logs/blog.pdf",
            displayHeaderFooter: false,
            format: "a4",
            "landscape": false,
        });
    } catch (err) {
        console.error(err);
    }
    await browser.close();
})();