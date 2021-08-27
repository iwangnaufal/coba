require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('./models/index')
const express = require('express')
const app = express()
const cors = require('cors')
//const user = require('./models/user')
const port = process.env.PORT || 3000
const passport = require("./lib/passport")
//const restrict = require("./middlewares/restrict")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())

app.get('/', (req, res) => {
   res.send('OK')
})

app.post('/user/create', (req, res) => {
   const {name, email, password} = req.body
   if (!name || !email || !password) {
      res.send('Data tidak lengkap')
   } else {
      User.create({name, email, password})
      .then((data) => {
         res.send("CREATED! " + data)
      })
      .catch((err) => {
         res.send("error: " + err)
      })
   }
})


app.post('/user/login', (req, res) => {
   const {email, password} = req.body
   if (!email || !password) {
      res.send('Data tidak lengkap')
   } else {
      User.findOne({where :{
         email: email
      }})
      
      .then((data) =>{
         if (!data){
            res.status(404).json({message:"Email atau Password salah"})
         }else{
            bcrypt.compare(password, data.password, (err, result)=>{
               if(err) {
                  res.send(err)
               }else if (result){
                  jwt.sign({name: data.name, email: data.email}, process.env.SECRET_KEY, {expiresIn: '1h'}, (err,token)=>{
                     if (err){
                        res.send(err)
                     }else{
                        res.status(200).json({message:"Login Success", token})
                     }
                  })
               }else {
                  res.status(401).json({message: "Email atau password salah"})
               }
            })
         }
      })
      .catch((err) => {
         res.send("error: " + err)
      })
   }
})
// app.post('/login', (req,res)=>{
//    const format = (user) => {
//       const {id, email} = user;
//       return{
//          id,
//          email,
//          token: user.generateToken()
//       }
//    }

//    User.authenticate(req.body)
//    .then(user => {
//       res.json(format(user))
//    })
//    .catch(err =>{
//       res.json({
//          message: err
//       })
//    })
// })


// app.get('/whoami',restrict, (req, res)=>{
//    const currentUser = req.user
//    res.json(currentUser)
// })
app.listen(port, () => {
   console.log("App running on port ", port)
})