const fs = require('fs')

// clean up html tags, upper case, etc., from raw data
const cleanup = () => {
  const regHtml = /<\w+>/g
  const regHtml2 = /<\/?\w+>/g
  const regStyle = /<p\s\w+=\\".+>\s<\/p>/g
  const regUpper = /"text":\s"\w/g
  const regUpper2 = /"note":\s"\w/g
  const regExtraSemi = /;;/g
  const regNewLine = /;\s\w/g
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
     const testString4 = testString3.replace(regExtraSemi, '; ')
    const testString5 = testString4.replace(
      regNewLine,
      (str) => '; ' + str.charAt(2).toUpperCase()
    )

    fs.writeFile('./data2.json', testString5, (err) => {
      if (err) {
        console.log('Failed to write data: ', err)
      }
      console.log('Updated testStringOut.json file successfully')
    })
  })
}

cleanup()

// clean up image paths
const cleanup2 = () => {
  const newUrls = []
  const regUrls =
    /\/the-world-factbook\/static\/.{32}\/.{5}\/[A-Z]{2}_\d{3}_large.jpg/g

  fs.readFile('./images.json', (error, data) => {
    if (error) {
      console.log('fs.readFile error: ', error)
    }
    const dataString = data.toString()
    const newData = dataString.match(regUrls)
    console.log('newData', JSON.stringify(newData))
    newData.map((item) => {
      const newData2 = 'https://www.cia.gov' + item
      return newUrls.push(newData2)
    })
    console.log('newUrls', newUrls)

    fs.writeFile('./images2.json', JSON.stringify(newData2), (err) => {
      if (err) {
        console.log('Failed to write data: ', err)
      }
      console.log('Updated testString2.json file successfully')
    })
  })
}

//cleanup2()
//https://www.cia.gov/the-world-factbook/static/4cfd95ccfa87fe6f2497436a4eab0f50/3cbc4/AF_011_large.jpg
