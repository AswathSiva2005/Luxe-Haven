import { getMongoDatabase } from './_lib/mongodb.js'

export default async function handler(request, response) {
  try {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' })
      return
    }

    const { identifier, password } = request.body ?? {}

    if (typeof identifier !== 'string' || !identifier.trim()) {
      response.status(400).json({ error: 'Username or email is required.' })
      return
    }

    if (typeof password !== 'string' || !password.trim()) {
      response.status(400).json({ error: 'Password is required.' })
      return
    }

    const db = await getMongoDatabase()
    const admins = db.collection('admins')
    const admin = await admins.findOne({
      $or: [{ username: identifier.trim() }, { email: identifier.trim() }],
    })

    if (!admin || admin.password !== password) {
      response.status(401).json({ error: 'Invalid admin credentials.' })
      return
    }

    response.status(200).json({
      admin: {
        id: String(admin._id),
        username: admin.username,
        email: admin.email,
      },
    })
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected admin login failure.',
    })
  }
}
