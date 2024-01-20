const express = require('express')
const router = express.Router()
const { queryByDay } = require('../services/dynamodb-service')

router.get('/', async (req, res) => {
  const day = req.query.day
  if (!day) {
    return res.status(400).send('Day parameter is required.')
  }
  try {
    const items = await queryByDay(day)
    if (items.length === 0) {
      return res.status(404).send('No items found for the specified day.')
    }
    const count = items.filter(item => item.agroScore > 120).length
    return res.status(200).json(count)
  } catch (err) {
    console.error('Error querying DynamoDB:', err)
    return res.status(500).send('Internal Server Error')
  }
})

module.exports = router
