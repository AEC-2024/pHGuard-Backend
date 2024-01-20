const fs = require('fs')
const csv = require('csv-parser')

const processCsv = async filePath => {
  let data = []

  try {
    const fileStream = fs.createReadStream(filePath)
    const csvStream = fileStream.pipe(csv())
    for await (const row of csvStream) {
      data.push(formatRow(row))
    }
    return data
  } catch (error) {
    throw error
  }
}

const formatRow = data => {
  let newRow = {}
  Object.entries(data).forEach(([key, val]) => {
    const newKey = key.replace(/[^\w\s]/gi, '').replace(/\s+/g, '').toLowerCase()
    newRow[newKey] = val
  })
  return newRow
}

module.exports = processCsv
