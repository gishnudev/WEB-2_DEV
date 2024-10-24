import express, { json } from 'express'; //import express library from library module,import{json} library
import { Route } from './routes/adminRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express(); //creates a object app and add a function express()
app.use(cors({
    origin:"http://127.0.0.1:5501",
    credentials:true
    // origin:'http://127.0.0.1:5000'
}));
app.use(json());//use json function
app.use (cookieParser())
app.use('/',Route);
const port = process.env.port; //creates anather object port=8000


app.listen(port, () => {
    console.log(`server listening to ${port} port`)
})