const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const route = express.Router()
const Joi = require('joi')

route.post('/', async(req,res)=>{
    // console.log(req.body); 
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    console.log(user);
    if(!user) return res.status(400).send('Invalid email or password')

   const validPassword = bcrypt.compare(req.body.password, user.password)
   if(!validPassword) return res.status(400).send('Invalid email or password')
    
   const token = jwt.sign({_id : user._id}, config.get('jwtPrivateKey')) //1st argument is payload and 2nd argument is private key
    res.send(token)
})



// this function is used for validating a new user
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema)
}

module.exports = route