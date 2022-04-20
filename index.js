const fs = require('fs')
const fetch = require('node-fetch')
const fbCountryCodes = require('./fbCountryCodes')
const countryDirList = require('./countryDirList')
const countryNames = require('./countryNames')

const urls = []

// create file for data dump

const createNew = () => {
  try {
    if (fs.existsSync('./data.json')) {
      console.log('file ./data.json exists')
      return
    } else {
      fs.writeFile('./data.json', '[]', (error, data) => {
        if (error) {
          console.log(error)
          return
        }
      })
    }
  } catch (err) {
    console.log('fs.existsSync error: ', err)
  }
}

createNew()

// urls to access data from factbook repo

const makeUrls = (countriesArr, codesArr) =>
  countriesArr.map((country) => {
    return codesArr.filter((f) => {
      if (country === f.region) {
        return f.codes.map((code) => {
          return urls.push(
            `https://raw.githubusercontent.com/factbook/factbook.json/master/${country}/${code}.json`
          )
        })
      }
    })
  })

makeUrls(countryDirList, fbCountryCodes) 

// fetch data from all factbook files and save as one file

fs.readFile('./data.json', (error, data) => {
  if (error) {
    console.log('fs.readFile failed', error)
    return
  }

  async function fetchAll() {
    const results = await Promise.all(
      urls.map((url) => fetch(url).then((r) => r.json()))
    )
    fs.writeFile(
      './data.json',
      JSON.stringify(results, null, 2),
      (err) => {
        if (err) {
          console.log('Failed to write data')
          return
        }
        console.log('Updated data file successfully')
      }
    )
  }

  fetchAll()
})

/* const urls2 = [
  'https://raw.githubusercontent.com/I-keep-trying/factbook-data/master/data/Albania.json',
  'https://raw.githubusercontent.com/I-keep-trying/factbook-data/master/data/Algeria.json',
]
const findEmpty = (countriesArr) =>
  countriesArr.map((country) => {
    return urls2.push(
      `https://raw.githubusercontent.com/I-keep-trying/factbook-data/master/data/${country}.json`
    )
  })

findEmpty(countryNames)

async function fetchAll() {
  const results = await Promise.all(
    urls2.map((url) => fetch(url).then((r) => r.json()))
  )
  fs.writeFile(
    './data.json',
    JSON.stringify(results, null, 2),
    (err) => {
      if (err) {
        console.log('Failed to write data')
        return
      }
      console.log('Updated data file successfully')
    }
  ) 
} */

// fetchAll()
