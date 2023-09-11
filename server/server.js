const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const foodRoutes = require('./routes/foodRoutes')
const restaurantRoutes = require('./routes/restaurantRouter')
const app = express()
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const User = require('./models/User')
//middleware
app.use(express.json())
app.use(cookieParser())
//database connection
mongoose.connect('mongodb://127.0.0.1:27017/FastFood')
const db = mongoose.connection
db.on('error', (error)=>console.log(error))

db.once('open', ()=>app.listen(3000, ()=>{
    console.log("Connected to FastFood database\nServer Running")
}))

//routes
app.use('/auth',authRoutes)
app.use('/foods', foodRoutes)
app.use('/restaurants', restaurantRoutes)

app.get('/get-cookie', (req, res)=>{
    res.setHeader('Set-Cookie', 'newUser = true')
    res.send('Cookie recieved ')
})

app.get('/username', checkUser,requireAuth, (req, res) =>{
    res.send(res.locals.user.username)
    //console.log(res.locals)
})

app.get('/use-cookies', (req, res)=>{
    res.cookie('new User', 'mouhibnaffeti', {maxAge : 1000 * 10})
    res.send('cookie used successfully')
})
/*Auth Routes
    -> /signup : GET => signup page
    -> /login : GET  => Login page
    -> /signup :POST => create new user in db
    -> /login :POST => authenticate a current user
    -> /logout :GET => logout
*/