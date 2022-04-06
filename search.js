const fs = require('fs')
const allData = require('./data.json')
const names = require('./countryNames.json')

const createNew = (name) => {
  try {
    if (fs.existsSync(`./data/${name}.json`)) {
      return
    } else {
      fs.writeFile(`./data/${name}.json`, '[]', (error, data) => {
        if (error) {
          console.log('createNew error: ', error)
          return
        }
      })
    }
  } catch (err) {
    console.log('fs.existsSync error: ', err)
  }
}

const findCountries = () =>
  allData.map((item) => {
    if (item.Government['Country name'] !== undefined) {
      const findName =
        item.Government['Country name']['conventional short form'].text
      names.map((name) => {
        createNew(name)
        if (findName === name) {
          console.log('found item', name)
          fs.readFile(`./data/${name}.json`, (error, data) => {
            if (error) {
              console.log(error)
              return
            }
            fs.writeFile(
                `./data/${name}.json`,
                JSON.stringify(item, null, 2),
                (err) => {
                  if (err) {
                    console.log('Failed to write data')
                    return
                  }
                  console.log('Updated data file successfully')
                }
              )
          })
          return item
        }
      })
      return
    }
    console.log('item undefined')
    return
  })

findCountries()

