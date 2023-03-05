///// batas 
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv').config();
const methodOverride = require('method-override') // untuk menghandle put
const connectDB = require('./config/db');

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const PORT = process.env.PORT;

const app = express();
//router admin
var apiRouter = require('./routes/api')

app.use(bodyParser.json()) // type json yang nantinya akan diterima

// untuk handle siapa sja yang dapat mengakses API kita
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*') // Origin = url yang ingin di berikan akses API 
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS') // method = method dalam penggunaan API 
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization') // Content-Type = contohnya json, (xml, html?) dll. // Authorization = berguna ketika proses pengiriman token kedalam API
    next(); // agar requestnya tidak berhenti sampai disitu
})

// mongoose.connect('mongodb://localhost:27017/db-onlineattendance')
// mongoose.connect(DB_URI)
connectDB();


app.get("/", (req, res) => res.send("Welcome to the API!"));

//api
// app.use('/api/v1/member', apiRouter)
app.use('/user/api/v1', apiRouter); 

app.use((error, req, res, next)=>{
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
})

app.listen(PORT, ()=>console.log(`Conection Success from PORT ${PORT}`));





