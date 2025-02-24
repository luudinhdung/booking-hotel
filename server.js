require('dotenv').config();
const app = require('./src/app')

const {PORT} = process.env;

app.post('/places',async (req,res)=>{
    const {title,address,addedPhotos,desc,checkIn,checkOut,maxGuests,price}= req.body
    const {token} = req.cookies
    if(token){
      jwt.verify(token,jwtSecret,async (err,userData)=>{
        if(err)throw err
        const placeDoc = await PlaceModel.create({
          title,address,addedPhotos,desc,checkIn,checkOut,maxGuests,price
         })
         return res.json(placeDoc)
      })
    }
  
  })
  
  app.get('/place',async (req,res)=>{
     const data = await PlaceModel.find({})
     res.json(data)
  })
  app.get('/places/:id',async (req,res)=>{
    const {id}= req.params
    const data = await PlaceModel.findById(id)
    res.json(data)
  })
const server = app.listen( PORT, () => {
    console.log(`WSV start with port ${PORT}`);
})

process.on('SIGINT', () => {
    server.close( () => console.log(`exits server express`))
})
