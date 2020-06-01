const puppeteer = require('puppeteer');

const db = {
    pokemons: {},
    types: []
}

async function getDataFromPuppeteer () {
  try {
    console.log('puppeteer starts')
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
    console.log('puppeteer ends')
    compareTypes()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  }
};

async function compareTypes() {
    const types = new Map()
    
    db.pokemons.forEach(item => {
        if(types.get(item.type)){
            const it = types.get(item.type)
            it.type1 += 1 
            types.set(item.type, it)
        } else {
            const d = { 
                type1: 1, 
                type2: 0
            }
            types.set(item.type, d)
        }
    })

    db.pokemons.forEach(item => {
        if(item.type2 !== ''){
            if(types.get(item.type2)){
                const it = types.get(item.type2)
                it.type2 += 1 
                types.set(item.type2, it)
            } else {
                const d = { 
                    type1: 0, 
                    type2: 1
                }
                types.set(item.type2, d)
            }
        }
    })

    types.forEach((val, key, map) => {
        const data = {
            type: key,
            type1: val.type1,
            type2: val.type2
        }

        db.types.push(data)
    })

    console.table(db.types)
}

getDataFromPuppeteer()
