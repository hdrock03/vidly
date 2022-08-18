const {User, validate} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const route = express.Router()

route.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //here we are finding user by property thats y we use findOne
    // yaha check kr rhe h ki user ka email phle se available h ki nh
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('user already registered') // agr user phle se registered h to yeh execute hga

    // agr user registered nh h to user object me save kr denge
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    await user.save();
    res.send(user)
})

module.exports = route