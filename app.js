const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });


const allowedOrigin = process.env.NODE_ENV === 'prod'
  ? ['https://www.arifurrahman.ca', 'https://admin.arifurrahman.ca']
  : ['http://localhost:3000', 'http://localhost:5173'];

const corsOptions ={
    origin:allowedOrigin, //allowing only this origin
    credentials:true,            
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
    
}
app.use(cors(corsOptions));
const errorMiddleware = require('./Middleware/Error')

const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser');
// const cloudinary=require('cloudinary')
// const fileUpload =require('express-fileupload')

app.use(express.json({
    limit: '50mb'
  }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))
app.use(cookieParser());


// app.use(fileUpload());





//importes all routes
const user=require('./Routes/user');
const blog=require('./Routes/blog.route');
const gallery=require('./Routes/gallery.route');
const campaign = require('./Routes/campaign.route');
const stat = require('./Routes/stat.route');



// app.use(express.static(path.join(__dirname,'../front-end',)))
// app.get('*',(req,res)=>{
// res.sendFile(path.resolve(__dirname, '../front-end/build/index.html'))

// })

app.get('/',(req,res)=>{
    res.send(
        `<h1>Server is Running</h1>`
    )
})
app.use('/api/v1/dashboard',stat);
app.use('/api/v1',user);
app.use('/api/v1/blog',blog);
app.use('/api/v1/gallery',gallery);
app.use('/api/v1/campaign',campaign);


//Middleware to handle erros
app.use(errorMiddleware)

module.exports = app;