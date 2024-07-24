const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type : String,
        required: true,
        unique: true
    },
    email:{
        type : String,
        required: true,
        unique: true
    },
    password:{
        type : String,
        required: true,
    }
})


userSchema.statics.signup = async function (username,email,password,confirmPassword) {

    //validation
    //console.log(username,email,password,confirmPassword)
    if(!username || !email || !password || !confirmPassword){
        throw Error('All fields are mandatory')
    }
    if (password != confirmPassword) {
        throw Error('Passwords do not match')
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter a Valid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please give a Strong Password.The Password must contain Atleast One capital letter,Atleast one special character, Atleast one number')
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }
    const nameexists = await this.findOne({username})
    if(nameexists){
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({username, email, password:hash })

    console.log(user)
    return user
}

//static method for login logic
userSchema.statics.login = async function (email,password) {
    if(!email || !password){
        throw Error('All fileds are mandatory')
    }

    const user = await this.findOne({email})
    if(!user){
       throw Error('No user with the given Email Id') 
    }

    const match = await bcrypt.compareSync(password,user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}


module.exports = mongoose.model('User',userSchema)