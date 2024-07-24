const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id : _id},process.env.SECRET,{expiresIn : '3d'})
}

//login user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        const usrname = user.username
        res.status(200).json({usrname,email,token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req,res) => {
    const {username,email,password,confirmPassword} = req.body
    
    try{
        const user = await User.signup(username,email,password,confirmPassword)
        const token = createToken(user._id)
        const usrname = user.username
        res.status(200).json({usrname,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser,signupUser}