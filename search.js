const fs = require('fs')
const allData = require('./data.json')
const names = require('./countryNames.json')

const files = require('./data')

const createNew = (name) => {
  try {
    if (fs.existsSync(`./data/${name}.json`)) {
      return
    } else {
      fs.writeFile(`./data/${name}.json`, '', (error, data) => {
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
// currently 19 with no data
const findCountries = () =>
  // map entire collection from ./data.json
  allData.map((item) => {
      if (item.Government['Country name'] !== undefined) {
        // there will always (probably) be one undefined from source data
        const findName =
          item.Government['Country name']['conventional short form'].text
        // map list of names from restcountries api
        const findName2 =
          item.Government['Country name']['conventional long form'].text
        return names.map((name) => {
          //    createNew(name)
          if (findName.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
            console.log('findName.includes(name)', name)
            fs.readFile(`./data/${name}.json`, (error, data) => {
              if (error) {
                console.log(error)
              }
              fs.writeFile(
                `./data/${name}.json`,
                JSON.stringify(item, null, 2),
                (err) => {
                  if (err) {
                    console.log('Failed to write data')
                  }
                  console.log('1: Updated data file successfully')
                }
              )
            })
          } else if (
            name.toLocaleLowerCase().includes(findName.toLocaleLowerCase())
          ) {
            console.log('name.includes(findName)', name)
            fs.readFile(`./data/${name}.json`, (error, data) => {
              if (error) {
                console.log(error)
              }
              fs.writeFile(
                `./data/${name}.json`,
                JSON.stringify(item, null, 2),
                (err) => {
                  if (err) {
                    console.log('Failed to write data')
                  }
                  console.log('2: Updated data file successfully')
                }
              )
            })
          } else if (
            findName2.toLocaleLowerCase().includes(name.toLocaleLowerCase())
          ) {
            console.log('findName2.includes(name)', name)
            fs.readFile(`./data/${name}.json`, (error, data) => {
              if (error) {
                console.log(error)
              }
              fs.writeFile(
                `./data/${name}.json`,
                JSON.stringify(item, null, 2),
                (err) => {
                  if (err) {
                    console.log('Failed to write data')
                  }
                  console.log('1: Updated data file successfully')
                }
              )
            })
          } else if (
            name.toLocaleLowerCase().includes(findName2.toLocaleLowerCase())
          ) {
            console.log('name.includes(findName2)', name)
            fs.readFile(`./data/${name}.json`, (error, data) => {
              if (error) {
                console.log(error)
              }
              fs.writeFile(
                `./data/${name}.json`,
                JSON.stringify(item, null, 2),
                (err) => {
                  if (err) {
                    console.log('Failed to write data')
                  }
                  console.log('2: Updated data file successfully')
                }
              )
            })
          }
        })
      }
    console.log('item undefined')
    return
  })

findCountries()
