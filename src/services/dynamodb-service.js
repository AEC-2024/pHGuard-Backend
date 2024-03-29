/* services/dynamodb_service.js */
const {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ScanCommand
} = require('@aws-sdk/client-dynamodb')
const getAgroScore = require('../helper/agro-score')

const dynamodbClient = new DynamoDBClient({ region: process.env.AWS_REGION })
const tableName = process.env.DYNAMO_TABLE_NAME

async function putItem(params) {
  const startTime = performance.now()
  const payload = {
    TableName: tableName,
    Item: {
      PK: { S: `DAY#${params.day}` },
      SK: { S: `LOCATION#${params.location}` },
      aqi: { S: params.airquality },
      humidity: { S: params.humidity },
      ph: { S: params.ph },
      temp: { S: params.temp }
    }
  }

  try {
    const command = new PutItemCommand(payload)
    await dynamodbClient.send(command)
    const endTime = performance.now()
    console.log(`Query putItem: ${endTime - startTime} milliseconds`)
  } catch (err) {
    console.log(`[DynamoDB Error]: ${err}`)
    return null
  }
}

async function queryByDay(day) {
  const startTime = performance.now()
  const payload = {
    TableName: tableName,
    KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': { S: `DAY#${day}` },
      ':sk': { S: 'LOCATION#' }
    }
  }

  try {
    const command = new QueryCommand(payload)
    const data = await dynamodbClient.send(command)
    return data.Items.map(item => {
      const unpackedItem = unpack(item)
      unpackedItem.agroScore = getAgroScore(unpackedItem)
      const endTime = performance.now()
      console.log(`Query queryByDay: ${endTime - startTime} milliseconds`)
      return unpackedItem
    })
    
  } catch (err) {
    console.log(`[DynamoDB Error]: ${err}`)
    return null
  }
}

async function getAllDates() {
  const startTime = performance.now()
  const scanParams = {
    TableName: tableName,
    ProjectionExpression: 'PK'
  }

  try {
    const command = new ScanCommand(scanParams)
    const data = await dynamodbClient.send(command)

    const dates = new Set()
    data.Items.forEach(item => {
      const pkValue = item.PK.S
      if (pkValue.startsWith('DAY#')) {
        dates.add(pkValue.split('#')[1])
      }
    })
    const endTime = performance.now()
    console.log(`Query getAllDates: ${endTime - startTime} milliseconds`)
    return Array.from(dates)
  } catch (err) {
    console.error(`[DynamoDB Error]: ${err}`)
    return null
  }
}

function unpack(item) {
  const unpackedItem = {}
  for (const [key, valueObj] of Object.entries(item)) {
    unpackedItem[key] = Object.values(valueObj)[0]
  }
  return unpackedItem
}

module.exports = {
  putItem,
  queryByDay,
  getAllDates
}
