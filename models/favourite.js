const mongoose = require('mongoose');
const favoriteSchama = mongoose.Schema({
   houseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Home',
    required: true,
    unique: true,
   }
})

module.exports= mongoose.model('Favorite', favoriteSchama)
