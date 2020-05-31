const puppeteer = require('puppeteer');

const db = []

const getDataFromPuppeteer = async (initialData) => {
  try {
    const info = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pokemon.fandom.com/es/wiki/Lista_de_Pok%C3%A9mon_de_la_primera_generaci%C3%B3n', { waitUntil: 'load', timeout: 0 });

    await page.evaluate(() => {
      const table = document.getElementsByClassName('tabpokemon')[0].children[1];

      // eslint-disable-next-line no-restricted-syntax
      for (const children of table.children) {
        
      };

      return data;
    });

    console.log(list)
    await browser.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  }
};

getDataFromPuppeteer()
console.table(db)
