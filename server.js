const express = require('express');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

const hotelRouter = require('./server/routes/HotelRoutes');
app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:3000'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});
app.use('/', hotelRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));
