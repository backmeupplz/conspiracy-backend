import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

export default cleanEnv(process.env, {
  MONGO: str(),
  PORT: num({ default: 1337 }),
  NEYNAR_API_KEY: str(),
})
