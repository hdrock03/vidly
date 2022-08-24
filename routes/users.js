const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User, validate} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const route = express.Router()

route.get('/me', auth, async (req, res) => {
  const user =  await User.findById(req.user._id).select('-password')
})
route.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //here we are finding user by property thats y we use findOne
    // yaha check kr rhe h ki user ka email phle se available h ki nh
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('user already registered') // agr user phle se registered h to yeh execute hga

    // agr user registered nh h to user object me save kr denge
    // user = new User({ // instead of writing req.body so many times use lodash here
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    user = new User(_.pick(req.body , ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();
    // res.send({ // this is done because response in sending password which is not required and so istead of user we are sending name and email
    //     name: user.name,
    //     email: user.email
    // })

   
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email'])) // we are using pick method 1 argument is which object we need to operate and then 2nd which property we need to take
    res.send(user)
})

module.exports = route