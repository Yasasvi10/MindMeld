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
    },
     // Track performance in each category
  categoryPerformance: {
    Memory: {
      averageScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 }
    },
    Attention: {
      averageScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 }
    },
    'Reaction time': {
      averageScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 }
    },
    'Problem Solving': {
      averageScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 }
    }
  },
  recentScores: [{
    category: String,
    score: Number,
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
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

userSchema.methods.updateCategoryPerformance = async function(category, score) {
    const categoryStats = this.categoryPerformance[category];
    const totalScore = categoryStats.averageScore * categoryStats.gamesPlayed + score;
    categoryStats.gamesPlayed += 1;
    categoryStats.averageScore = totalScore / categoryStats.gamesPlayed;
    
    // Add to recent scores
    this.recentScores.push({
      category,
      score,
      date: new Date()
    });
  
    // Keep only last 10 scores per category
    const recentScoreLimit = 10;
    if (this.recentScores.length > recentScoreLimit) {
      this.recentScores = this.recentScores.slice(-recentScoreLimit);
    }
  
    await this.save();
    return this.categoryPerformance;
  };

module.exports = mongoose.model('User',userSchema)