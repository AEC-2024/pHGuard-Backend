/* ./routes/upload.js */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerStorage = require('../helper/multer')
const processCsv = require('../helper/csv-reader')
const { putItem } = require('../services/dynamodb-service')

const upload = multer({ storage: multerStorage })

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  try {
    const filePath = req.file.path
    const data = await processCsv(filePath)
    await Promise.all(data.map(entry => putItem(entry)))
    fs.unlinkSync(filePath)
    return res.status(200).send('File processing accepted and in progress.')
  } catch (error) {
    console.error('Error during file processing:', error)
    return res.status(500).send('Internal Server Error')
  }
})

module.exports = router
