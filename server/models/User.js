const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'please enter a username'],
        unique : [true, 'username must be unique'],
        minlength : [6, 'username length must be more than 6 caracters']
    },
    email : {
        type : String,
        required : [true, 'please enter an email'],
        unique : [true, 'email must be unique'],
        validate : [isEmail, 'please enter a valid email']
    },
    password : {
        type : String,
        required : [true, 'please enter an password'],
        minlength : [6, 'password length must be more than 6 caracters']
    },
    location : {
        type : String,
        required : false
    }
})

//creating hashed password
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//login method
userSchema.statics.login = async function (email, password){
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect Email')
}

const User = mongoose.model('user', userSchema)
module.exports = User