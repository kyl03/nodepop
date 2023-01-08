'use strict';

const mongoose = require('mongoose');

// define ads schema
const adsSchema = mongoose.Schema({
  name: String,
  forSale: Boolean,
  price: Number,
  pict: String,
  tags: [String]
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