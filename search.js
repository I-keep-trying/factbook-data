const fs = require('fs')
const allData = require('./data1.json')
const names = require('./countryNames.json')

const findCountries = () =>
  names.map((name) => {
    return allData.map((item) => {
        const findName = item.Government['Country name']["conventional short form"].text
     if (name === findName) {
        console.log('item.Government', findName)}
      return item
    
    })
  })

findCountries() 

// Algeria
// Angola
// Botswana