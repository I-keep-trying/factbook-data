const fs = require('fs')
const allData = require('./data2.json')
const names = require('./countryNames.json')

// clean up html tags etc., from raw data
const cleanup = () => {
  const regHtml = /<\w+>/g
  const regHtml2 = /<\/?\w+>/g
  const regStyle = /<p\s\w+=\\".+>\s<\/p>/g
  const regUpper = /"text":\s"\w/g
  const regUpper2 = /"note":\s"\w/g
  fs.readFile('./data.json', (error, data) => {
    if (error) {
      console.log('fs.readFile error: ', error)
    }
    const dataString = data.toString()
    const newData = dataString.replace(regStyle, '')
    const newData2 = newData.replace(regHtml, '')
    const newData3 = newData2.replace(regHtml2, '')
    const testString2 = newData3.replace(
      regUpper,
      (str) => str.substring(0, 9) + str.charAt(9).toUpperCase()
    )
    const testString3 = testString2.replace(
      regUpper2,
      (str) => str.substring(0, 9) + str.charAt(9).toUpperCase()
    )
    fs.writeFile('./data2.json', testString3, (err) => {
      if (err) {
        console.log('Failed to write data: ',err)
      }
      console.log('Updated allData file successfully')
    })
  })
}

//cleanup()

// create directories for each country if necessary
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

// search through allData and populate each country file with data for that country
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
