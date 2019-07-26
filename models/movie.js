const mongoose = require('mongoose')
const Joi = require('joi');
const { genreSchema } = require('./genre')

const MovieSchema = new mongoose.Schema({
    title : { 
        type : String,
        required : true,
        trim : true,  
        minlength: 5,
        maxlength: 50
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min: 0,
        max: 255  
    },
    genre : {
        type : genreSchema,
        required : true
    }
})

const Movie = mongoose.model('Movie', MovieSchema)

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(), 
        name: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId : Joi.objectId().required()
    }
    return Joi.validate(movie, schema)
}

module.exports = {
    Movie,
    validate: validateMovie
}

