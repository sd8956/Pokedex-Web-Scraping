const puppeteer = require('puppeteer');

const db = {
    pokemons: {},
    types: {}
}

const getDataFromPuppeteer = async (initialData) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pokemon.fandom.com/es/wiki/Lista_de_Pok%C3%A9mon_de_la_primera_generaci%C3%B3n', { waitUntil: 'load', timeout: 0 });

    const list = await page.evaluate(() => {
      const data = []  
      const table = document.getElementsByClassName('tabpokemon')[0].children[1];
        console.log(table)
      // eslint-disable-next-line no-restricted-syntax
      for (const children of table.children) {
        const type2 = children.children[4].children[0] ? true : false
        const pokemon = {
            name: children.children[2].innerText,
            type: children.children[3].children[0].title,
            type2: type2 ? children.children[4].children[0].title : ''
        }
        data.push(pokemon)
      };

      return data
    });

    db.pokemons = list
    console.table(db.pokemons)
    await browser.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  }
};

getDataFromPuppeteer()