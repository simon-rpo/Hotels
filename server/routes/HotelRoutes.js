const express = require('express');
const hotelRouter = express.Router();
const hotelsData = require('../data/data.json');

hotelRouter.route('/api/hotels/GetAll')
  .get((req, res) => {
    res.send(hotelsData);
  });

hotelRouter.route('/api/hotels/:id')
  .get((req, res) => {
    res.send(hotelsData);
  });

module.exports = hotelRouter;
