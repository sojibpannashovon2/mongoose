import dotenv from 'dotenv'

import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  port: process.env.PORT,
  database_url: process.env.DB_DATABASE,
  bcrypt_salt: process.env.BCRYPT_SALT_ROUND,
}
