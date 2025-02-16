const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 6060
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const jwtSecret = 'aunasdfsdffsdjlksfdjl'
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const db= require('./config/index')
const multer=require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const fs = require('fs')
const UserModel = require('./models/User')
const PlaceModel = require('./models/Places')
const BookingModel = require('./models/Booking')
const CommentModel = require('./models/Comment')
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
db.connect()
app.use(cors({
  credentials: true,
  origin: true 
 }));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
extended:true
}))
//xQYLaGDmO7JLesCq
app.post('/register',async (req,res)=>{
    const {name,email,password,role,avatar} = req.body
    try {
       const checkEmail = await UserModel.findOne({
         email:email
       })
       if(checkEmail){
         return res.json({
           mess:'tai khoan da ton tai'
         })
       }else if(!checkEmail){
          await UserModel.create({
            name,
             email,
             password:bcrypt.hashSync(password,salt),
             role,
             avatar
         })
         return res.json({
           mess:'dang ki thanh cong'
         })
       }
    } catch (error) {
        res.status(422).json(error)
    }
   })
