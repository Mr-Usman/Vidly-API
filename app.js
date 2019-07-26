const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genresRouter = require('./routes/genresRouter')
const customerRouter = require("./routes/customersRouter")
const movieRouter = require("./routes/movieRouter")
const rentalRouter = require("./routes/rentalRouter")

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected to mongodb ...'))
    .catch(err => console.error('could not connect to mongodb ' + err))

app.use(express.json());

app.use('/api/genres', genresRouter)
app.use('/api/customers', customerRouter)
app.use('/api/movies', movieRouter)
app.use('/api/rental', rentalRouter) 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));