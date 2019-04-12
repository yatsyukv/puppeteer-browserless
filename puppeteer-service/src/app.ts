import express from 'express';
import {Request, Response} from 'express';
import compression from 'compression';  // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import dotenv from 'dotenv';
import fs from 'fs';
import puppeteer from 'puppeteer';

// Load environment variables from .env file, where API keys and passwords are configured
if (fs.existsSync('.env')) {
    console.log('Using .env file to supply config environment variables');
    dotenv.config({path: '.env'});
}

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 7200);

// @ts-ignore:
app.use(compression());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * API routes.
 */
app.get('/test', async (req: Request, res: Response) => {
    const browser = await puppeteer.connect({
        browserWSEndpoint: process.env.BROWSERLESS_ENDPOINT || 'ws://localhost:7101',
    });
    const page = await browser.newPage();
    await page.goto('https://github.com');
    await page.screenshot({path: '/tmp/screenshot.png'});
    await page.close();
    browser.disconnect();
    res.json('I did it! Tnx!');
});

export default app;
