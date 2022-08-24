
const mongoose = require('mongoose')
const express = require('express');
const Joi = require('joi')


const genreSchema = new mongoose.Schema({ // genre jo khud se likh rhe the usko hatake ya schema bna rhe hai
    name: {
        type: String,
        isrequired: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = new mongoose.model('Genre', genreSchema) // model banaye uske baad

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;