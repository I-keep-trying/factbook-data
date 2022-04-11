const fs = require('fs')

const regHtml = /<\w+>/g
const regHtml2 = /<\/?\w+>/g
const regStyle = /<p\s\w+=\\".+>\s<\/p>/g
const regUpper = /"text":\s"\w/g
const regUpper2 = /"note":\s"\w/g
fs.readFile('./testString.json', (error, data) => {
  if (error) {
    console.log(error)
  }
  const dataString = data.toString()

  const testString2 = dataString.replace(
    regUpper,
    (str) => str.substring(0, 9) + str.charAt(9).toUpperCase()
  )
  console.log('testString2', testString2)

  const testString3 = testString2.replace(
    regUpper2,
    (str) => str.substring(0, 9) + str.charAt(9).toUpperCase()
  )
  console.log('testString3', testString3)
  /*   const newData = dataString.replace(
    regUpper,
    (txt) => txt.substring(0, 9) + txt.charAt(10).toUpperCase()
  ) */
  /*   const newData = dataString.replace(regStyle, '')
  const newData2 = newData.replace(regHtml, '')
  const newData3 = newData2.replace(regHtml2, '') */
  //  console.log('readFile data', newData3)
  /*  fs.writeFile('./testString2.json', newData, (err) => {
    if (err) {
      console.log('Failed to write data')
    }
    console.log('1: Updated data file successfully')
  }) */
})
