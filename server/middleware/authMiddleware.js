const jwt = require('jsonwebtoken')
const User = require('../models/User')
const requireAuth = (req, res, next) =>{
     const token = req.cookies.jwt
     if(token){
        jwt.verify(token, 'mohamed mouhib naffeti secret', (err, decodedToken) =>{
            if(err){
                res.send('error obtainnig token')
            } else {
               
                next()
            }
        })
     }
}

//check current user
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, 'mohamed mouhib naffeti secret', async (err, decodedToken) =>{
            if(err){
                res.locals.user = null
                next()
            } else { 
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }