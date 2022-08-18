const mongoose = require('mongoose')
const express = require('express');
const Joi = require('joi')
 

const User = new mongoose.model('User', new mongoose.Schema({ 
    name: {
        type: String,
        isrequired: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        isrequired: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        isrequired: true,
        minlength: 5,
        maxlength: 1024
    }

})) 

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()

    }
    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validateUser;
