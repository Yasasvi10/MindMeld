const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const requireAuth = async(req,res,next) => {
    
    const {authorization} = req.headers 

    if (!authorization) {
        res.status(401).json({error:'Authorization Token Required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token,process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        // console.log("hey",req.user)

        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not Authorised'})
    }

}

module.exports = requireAuth