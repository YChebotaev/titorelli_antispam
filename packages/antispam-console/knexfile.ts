require('dotenv').config()

const config = {
  client: 'sqlite3',
  connection: {
    filename: process.env['DATABASE_URL'] ?? 'data/db.sqlite3'
  },
  useNullAsDefault: true
}

export default config
