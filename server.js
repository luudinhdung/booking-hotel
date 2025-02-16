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
app.get('/profile', (req,res)=>{
    const {token} = req.cookies
    if(token){
      jwt.verify(token,jwtSecret,async (err,userData)=>{
        if(err) throw err
        const {name,email,_id,role,avatar}= await UserModel.findById(userData.id);
        res.json({name,email,_id,role,avatar});
      })
    }
    
  })