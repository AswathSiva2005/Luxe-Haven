import process from 'node:process'

import { MongoClient } from 'mongodb'

const globalForMongo = globalThis

if (!globalForMongo.__luxeHavenMongo) {
  globalForMongo.__luxeHavenMongo = {
    client: null,
    clientPromise: null,
    indexesReady: false,
    defaultAdminSeeded: false,
  }
}

async function connectToMongo() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured.')
  }

  if (!globalForMongo.__luxeHavenMongo.clientPromise) {
    const client = new MongoClient(mongoUri)

    globalForMongo.__luxeHavenMongo.clientPromise = client
      .connect()
      .then((connectedClient) => {
        globalForMongo.__luxeHavenMongo.client = connectedClient
        return connectedClient
      })
      .catch(async (error) => {
        globalForMongo.__luxeHavenMongo.clientPromise = null
        globalForMongo.__luxeHavenMongo.client = null
        await client.close().catch(() => {})
        throw error
      })
  }

  const client = await globalForMongo.__luxeHavenMongo.clientPromise
  return client.db(getDatabaseName())
}

function getDatabaseName() {
  return process.env.MONGODB_DB_NAME || 'luxe haven'
}

async function ensureMongoIndexes(db) {
  if (globalForMongo.__luxeHavenMongo.indexesReady) {
    return
  }

  const admins = db.collection('admins')

  await Promise.all([
    admins.createIndex(
      { username: 1 },
      {
        unique: true,
        partialFilterExpression: { username: { $type: 'string' } },
      },
    ),
    admins.createIndex(
      { email: 1 },
      {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      },
    ),
  ])

  globalForMongo.__luxeHavenMongo.indexesReady = true
}

async function seedDefaultAdmin(db) {
  if (globalForMongo.__luxeHavenMongo.defaultAdminSeeded) {
    return
  }

  const admins = db.collection('admins')
  const existingCount = await admins.countDocuments()

  if (existingCount === 0) {
    await admins.insertOne({
      username: 'admin',
      email: 'admin@luxehaven.com',
      password: 'luxe123',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  globalForMongo.__luxeHavenMongo.defaultAdminSeeded = true
}

export async function getMongoDatabase() {
  const db = await connectToMongo()
  await ensureMongoIndexes(db)
  await seedDefaultAdmin(db)
  return db
}

export function isMongoConnectionError(error) {
  const message = error instanceof Error ? error.message : String(error || '')

  return [
    'querySrv',
    'ENOTFOUND',
    'ECONNREFUSED',
    'MongoServerSelectionError',
    'getaddrinfo',
    'timed out',
  ].some((needle) => message.includes(needle))
}
