const path = require('path')

const config = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: path.join(__dirname, './migrations'),
  },
  seeds: {
    directory: path.join(__dirname, './seeds'),
  },
}

module.exports = config

if (process.env.NODE_ENV !== 'production') {
  config.connection = {
    host: config.connection.host || '127.0.0.1',
    user: config.connection.user || 'test',
    password: config.connection.password || 'test',
    database: config.connection.database || 'postgres',
  }
}
