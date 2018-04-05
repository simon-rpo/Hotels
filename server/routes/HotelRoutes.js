const express = require('express');
const hotelRouter = express.Router();
const hotelsData = require('../data/data.json');

hotelRouter.route('/api/hotel')
  .get((req, res) => {
    console.log(hotelsData);
    res.send(hotelsData);
  });

hotelRouter.route('/api/hotel/:id')
  .get((req, res) => {
    res.send(hotelsData);
  });

module.exports = hotelRouter;
