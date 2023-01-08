'use strict';

const mongoose = require('mongoose');

// define ads schema
const adsSchema = mongoose.Schema({
  name:{type: String, index: true, required: true} ,
  forSale:{type: Boolean, index: true, required: true},
  price: {type: Number, index: true,required: true},
  pict: {type: String, index: true,required: true},
  tags: {type: [String], index: true,enum: {
    values: ['lifestyle', 'mobile', 'motor', 'work'],
    message: '{VALUE} is not supported'},required:true} // limiting possible tags with enum https://mongoosejs.com/docs/validation.html
});

adsSchema.statics.lista = function (filtro, skip, limit, campos, sort) {
  const query = Ads.find(filtro); // this does only return the query not executed
  query.skip(skip);
  query.limit(limit);
  query.select(campos);
  query.sort(sort);
  return query.exec() // here the query is executed and a promise is returned
}

// Create the model
const Ads = mongoose.model('Ads', adsSchema);

// Export the model
module.exports = Ads;