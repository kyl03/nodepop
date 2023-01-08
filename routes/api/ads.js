
'use strict';

const express = require('express');
const createError = require('http-errors');
const Ad = require('../../models/Ad');

const router = express.Router();

// CRUD

// GET /apiv1/ads
// Returns list of ads
router.get('/', async (req, res, next) => {
  try {

    // filters
    const name = req.query.name;
    const price = req.query.price;
    const tag = req.query.tags;
    const forSale = req.query.forSale;
    // pagination /apiv1/ads?skip=1&limit=1
    const skip = req.query.skip;
    const limit = req.query.limit;
    // fields selection
    const fields = req.query.fields; // /apiv1/ads?fields=name -_id
    // sort
    const sort = req.query.sort; // /apiv1/ads?sort=price%20name

    const filtro = {};

    if (name) { // /apiv1/ads?name=Bi
      // search for a product that it starts with those letters
      filtro.name = new RegExp('^' + req.query.name, "i");;
    }

    if (price) {
      if (price.includes('-')) {
        if (price.charAt(0) === '-') {// /apiv1/ads?price=-50 Search for product less or equal than 50
          const maxPrice = price.slice(1);
          filtro.price = { '$lte': maxPrice };
          console.log(maxPrice);
        } else if (price.slice(-1) === '-') {  // /apiv1/ads?price=10- Search for product greater or equal than 10
          const minPrice = price.split('-');
          filtro.price = { '$gte': (minPrice[0]) };
        } else {
          // /apiv1/ads?price=0-50 Search for product between 0-50 price
          const minMaxArray = price.split('-');
          const min = minMaxArray[0];
          const max = minMaxArray[1];
          filtro.price = { '$gte': min, '$lte': max };
        }

      } else {// /apiv1/ads?price=32
        filtro.price = price;
      }
    }

    if (tag) {// /apiv1/ads?tags=lifestyle,work
      if (tag.includes(',')) {
        filtro.tags = { '$all': tag.split(',') }
      } else {// 1 tag query /apiv1/ads?tags=mobile
        filtro.tags = { '$in': tag };
      }

    }
    if (forSale) {// /apiv1/ads?forSale=false
      filtro.forSale = forSale.toLocaleLowerCase();
    }

    const ads = await Ad.lista(filtro, skip, limit, fields, sort);
    res.json({ results: ads });
  } catch (err) {
    next(err);
  }
});

// GET /apiv1/ads/tags
//Return list of tags
router.get('/tags', async (req, res, next) => {
  try {

    let existingTags = [];
    const ads = await Ad.lista();
    ads.forEach(element => {
      element.tags.forEach(tag => {
        if (!existingTags.includes(tag)) {
          existingTags.push(tag);
        }
      })
    });
    res.json({ results: existingTags });
  } catch (err) {
    next(err);
  }
});
// GET /apiv1/ads/(id)
// Returns an ad
router.get('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    // Search for an ad in database
    const ad = await Ad.findById(id);

    res.json({ result: ad });

  } catch (err) {
    next(err);
  }
});

// PUT /apiv1/ads/(id) (body=adData)
// Updates an ad
router.put('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    const adData = req.body;

    const updatedAd = await Ad.findOneAndUpdate({ _id: id }, adData, {
      new: true // it returns updated document
    });

    res.json({ result: updatedAd });

  } catch (err) {
    next(err);
  }
});

// POST /apiv1/ads (body=adData)
// Create an ad
router.post('/', async (req, res, next) => {
  try {

    const adData = req.body;

    // instanciate nw ad in the memory
    const ad = new Ad(adData);

    // save it in de database
    const savedAd = await ad.save();

    res.json({ result: savedAd });

  } catch (err) {
    next(err);
  }
});

// DELETE /apiv1/ads/:id
// Delete an ad
router.delete('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    const ad = await Ad.findById(id);

    if (!ad) {
      // const err = new Error('not found');
      // err.status = 404;
      return next(createError(404));
    }

    await Ad.deleteOne({ _id: id });

    res.json();

  } catch (err) {
    next(err);
  }
});

module.exports = router;