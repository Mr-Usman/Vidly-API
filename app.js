const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genresRouter = require('./routes/genresRouter')

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected to mongodb ...'))
    .catch(err => console.error('could not connect to mongodb ' + err))

app.use(express.json());

app.use('/api/genres', genresRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));