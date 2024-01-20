/* services/dynamodb_service.js */
const {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ScanCommand
} = require('@aws-sdk/client-dynamodb')

const dynamodbClient = new DynamoDBClient({ region: process.env.AWS_REGION })
const tableName = process.env.DYNAMO_TABLE_NAME

async function putItem(params) {
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
  } catch (err) {
    console.log(`[DynamoDB Error]: ${err}`)
    return null
  }
}

async function queryByDay(day) {
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
    return data.Items.map(item => unpack(item))
  } catch (err) {
    console.log(`[DynamoDB Error]: ${err}`)
    return null
  }
}

async function getAllDates() {
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
