const mongoose = require('mongoose')
const express = require('express')
const Joi = require('joi')
const {genreSchema} = require('./genres') // genreSchema ko import kiye h qki niche genre use krna

const Movie = new mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 100
    },
    genre:{
        type: genreSchema, // yaha use kiye h genreSchema taki jb yaha id dale genre ka to usse related sara kch aa jaye
        required:true
    },
    numberInStock: {
        type:Number,
        required: true,
        min:0,
        max:255
    },
    dailyRentalRate: {
        type:Number,
        required: true,
        min:0,
        max:255
    }
}))

function validateMovie(movie){
    const schema = { // yeh schema joi ke liye banaye hai to yaha jo dalenge wo client ko dikhega 
        title: Joi.string().min(5).max(100).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()

    }
    return Joi.validate(movie, schema)
}

exports.Movie = Movie;
exports.validate = validateMovie