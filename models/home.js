
const mongoose = require('mongoose');

const homeSchama = mongoose.Schema({
  home:{
    type: String,
    require: true
  },
    price:{
    type: Number,
    require: true
  },
    location:{
    type: String,
    require: true
  },
    rating:{
    type: Number,
    require: true
  },
    photoUrl: String,
    description: String,
})

module.exports= mongoose.model('Home', homeSchama)