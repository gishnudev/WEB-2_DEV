import express from 'express'
import { route } from './routes/route.js'

const app = express()
const port = 8000

app.use('/',route)

app.listen(port,()=>{
    console.log(`server listening to port ${port}`)
})