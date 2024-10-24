import express, { json } from 'express';
import { Route } from './router/adm.js';
import dotenv from 'dotenv'

dotenv .config()

const app = express()

app.use(json())

app.use('/',Route)
const port = process.env.port

app.listen(port,()=>{
    console.log(`server listening to ${port} port`)
})