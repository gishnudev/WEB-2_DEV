import express, { json } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { adminRoute } from './Router/admin_router.js';

dotenv.config()

const app = express()

app.use(json())
app.use(cors({
    origin:"http://127.0.0.1:5501",
    credentials:true
}))
app.use('/',adminRoute)
const port = process.env.port

app.listen(port,()=>{
    console.log(`server listening to ${port} port`)
})