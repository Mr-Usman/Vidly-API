const express = require('express');
const router = express.Router();
const { Movie } = require('../models/movie')
const { Customer} = require('../models/customer')
const { Rental, validate } = require('../models/rental')

router.get('/', (req,res) => {
  const rental =  Rental.find().sort({ dateOut : -1})
  res.send(rental)
})

router.get('/:id', (req,res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    res.send(rental); 
})

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send(`Customer with this id ${req.body.customerId} not found!`)

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send(`Movie with this id ${req.body.movieId} not found!`)

    if(movie.numberInStock === 0) return res.status(400).send('movie is not in stock')

    let rental = new Rental({
      customer : {
          _id : customer._id,
          name : customer.name,
          phone : customer.phone
      },
      movie : {
          _id : movie._id,
          title : movie.title,
          dailyRentalRate : movie.dailyRentalRate
      }
    })
    rental = await rental.save()

    movie.numberInStock--;
    movie.save();

    res.send(rental)
})

module.exports = router