const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const hotelRouter = require('./server/routes/HotelRoutes');
app.use('/', hotelRouter);

// bookRouter.route('/api/hotels')
//   .get((req, res) => {
//     res.send('Hello Hotels');
//   });


// app.get('/', (req, res) => {
//   res.send({ express: 'Hello Hotels' });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
