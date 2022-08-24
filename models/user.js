const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const express = require('express');
const Joi = require('joi')

const userSchema = new mongoose.Schema({ 
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

})

// adding a method in schema
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, config.get('jwtPrivateKey')) // instead of user we are using this becoz generateAuthToken is referring to user
    return token;
}


const User = new mongoose.model('User', userSchema) 

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
