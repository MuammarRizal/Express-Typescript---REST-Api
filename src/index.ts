import express, { type Application } from 'express'
import 'dotenv/config'
import appMiddleware from './middleware'
const app: Application = express()
const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 4000

app.use(appMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
