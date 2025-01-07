const express = require('express');
const cors = require('cors');
const app = express();


const allowedOrigin=[
    'https://www.arifurrahman.ca',
    'https://admin.arifurrahman.ca',
    'http://localhost:3000',
    'http://localhost:5173',
]
const corsOptions ={
    origin:allowedOrigin, //allowing only this origin
    credentials:true,            
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
    
}
app.use(cors(corsOptions));
const errorMiddleware = require('./Middleware/Error')

const bodyParser = require('body-parser')
const dotenv = require('dotenv');
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


dotenv.config({ path: 'F:\\dreammate\\backend\\config\\config.env' });


//importes all routes
const user=require('./Routes/user');
const blog=require('./Routes/blog.route');
const gallery=require('./Routes/gallery.route');



// app.use(express.static(path.join(__dirname,'../front-end',)))
// app.get('*',(req,res)=>{
// res.sendFile(path.resolve(__dirname, '../front-end/build/index.html'))

// })

app.use('/api/v1',user);
app.use('/api/v1/blog',blog);
app.use('/api/v1/gallery',gallery);

//Middleware to handle erros
app.use(errorMiddleware)

module.exports = app;