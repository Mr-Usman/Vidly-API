const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')

router.get('/', (req,res) => {
    const movies = await Movie.find().sort({ name: 1 });
    res.send(movies)
})

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId)
    
    let movie = new Movie({
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    })

    movie = await movie.save();
    res.send(movie)
})

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).send('Genre not found with this Id')

    let updatedMovie =  await Movie.findByIdAndUpdate(req.params.id, {
         title : req.body.title,
         genre : {
             _id : genre._id,
             name: genre.name
         },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    updatedMovie = updatedMovie.save();
    res.send(updatedMovie)
})

router.delete('/:id', async (req,res) => {
     const deletedMovie = await Movie.findOneAndDelete(req.params.id)
    if (!deletedMovie) return res.status(404).send('Movie not found with this Id')

    res.send(deletedMovie)
})

module.exports = router