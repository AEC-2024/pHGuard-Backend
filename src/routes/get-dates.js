const express = require('express')
const router = express.Router()
const { getAllDates } = require('../services/dynamodb-service')

router.get('/', async (req, res) => {
  try {
    const items = await getAllDates()
    if (items.length === 0) {
      return res.status(404).send('No dates found.')
    }
    console.log(items)
    return res.status(200).json(items)
  } catch (err) {
    console.error('Error querying DynamoDB:', err)
    return res.status(500).send('Internal Server Error')
  }
})

module.exports = router
