import express, { type Request, type Response, type Application } from 'express'

import 'dotenv/config'
const app: Application = express()
const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 4000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
