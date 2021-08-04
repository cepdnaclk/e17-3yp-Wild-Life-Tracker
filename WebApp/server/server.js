const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const connectDB = require('./config/db')            //get DB
const auth = require('./routes/auth.routes')        //get routes

dotenv.config({path: './config/config.env'})        //get the configured env vars

connectDB();        //to connect the DB

const app = express();

app.use(express.json());        //expect json
app.use(cors())                 //TODO
app.use('/api/auth',auth)       //get auth route

app.get('/',(req,res)=>{
    res.send("Hello World")
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`)
})

