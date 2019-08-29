import flows from 'e2e/flows';
import helpers from 'e2e/helpers';
import puppeteer from 'puppeteer';
import expect from 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';

setDefaultOptions({ timeout: 20000 });

const chromeArgs = [
  '--no-sandbox', '--disable-setuid-sandbox', '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding',
];

let browser;
let page;
let signedUp = false;
const timeout = 15000;

const guiMode = {
  args: chromeArgs,
  headless: false,
  devtools: false,
};
const noGui = {
  args: chromeArgs,
  headless: true,
};

/**
 * @returns {Object} - puppeteer browser options
 * @param {boolean} arg - true to use gui, false for headless mode
 */
const useGui = (arg) => {
  return arg === true ? guiMode : noGui;
};

/**
 * @param {string} testSubject - descriptor for test
 * @param {function} testToRun - test function
 * @param {number} delay - delay before running test in ms
 */
const puppetHandle = (async (testSubject, testToRun, delay = 1000) => {
  it(testSubject, async () => {
    if (delay > 0) {
      await page.waitFor(delay);
    };
    return testToRun(page, expect);
  }, (timeout + delay));
});

/**
 * Instantiates the browser and page classes
 */
beforeAll(async () => {
  browser = await puppeteer.launch(useGui(!process.env.NODE_E2E_NO_GUI));
  page = await browser.newPage();
  page.emulate({
    viewport: {
      width:  1100,
      height: 800,
    },
    userAgent: '',
  });
});

/**
 * Closes browser after every test has passed
 */
afterAll(async () => {
  await browser.close();
});

/**
 * Authenticates user before each test
 */
beforeEach(async () => {
  if (!signedUp) {
    signedUp = true;
    await helpers.signup(page);
  } else {
    await page.waitFor(500);
    await helpers.login(page);
  }
});

/**
 * Signs out the user after each test
 */
afterEach(async () => {
  await page.waitFor(500);
  await helpers.logout(page);
});

describe('Web E2E -- Authentication', () => {
  puppetHandle('Signup Test', flows.signupTest);
  puppetHandle('Login Test', flows.loginTest);
});