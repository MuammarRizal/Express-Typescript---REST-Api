import web from './middleware/web'
const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 4000

web.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
