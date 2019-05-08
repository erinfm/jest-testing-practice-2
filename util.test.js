const puppeteer = require('puppeteer')
const { generateText, checkAndGenerate } = require('./util')

test('should output name and age', () => {
  const text = generateText('Max', 29)
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('Anna', 24)
  expect(text2).toBe('Anna (24 years old)');

})

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 29)
  expect(text).toBe('Max (29 years old)');
})

test('should click around', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    // arg: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html')
  await page.click('input#name')
  await page.type('input#name', 'Anna')
  await page.click('input#age')
  await page.type('input#age', '28')
  await page.click('#btnAddUser')
  const finalText = await page.$eval('.user-item', el => el.textContent)
  expect(finalText).toBe('Anna (28 years old)')
}, 20000)