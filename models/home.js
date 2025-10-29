
const mongoose = require('mongoose');
const favourite = require('./favourite')

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

homeSchama.pre('findOneAndDelete', async function(next) {
  const homeId = this.getQuery()['_id'];
  await favourite.deleteMany({homeId:homeId});
  next();
});


module.exports= mongoose.model('Home', homeSchama)