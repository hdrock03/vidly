const joi = require('joi')
const mongoose = require('mongoose')
const {Rental, validate} = require('../models/rentals')
const {Movie} = require('../models/movies')
const {Customer} = require('../models/customers')
const express = require('express')
const route = express.Router();
const Fawn = require('fawn')
Fawn.init('mongodb://localhost/vidly')

route.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
  });
  
  route.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');
  
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
  
    let rental = new Rental({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
    // rental = await rental.save(); // yaha rental bhi save ho rha h aur niche movie bhi dono agr sahi time me save nh hua to numberinstock ka number sahi pata nh chelga
    //                             // isiliye apn transaction use krte h
    // movie.numberInStock-- ; // yaha decrement kr rhe h
    // movie.save();

    try{
        console.log('hi');
    new Fawn.Task()
        .save('rentals', rental) // yaha direct collection pe kaam kr rhe h isilye rentals likhe h
        .update('movies', {_id: movies._id}, { // here we r updating movies collection
            $inc: {numberInStock: -1}
        })
        .run();

    res.send(rental);
    }
    catch(ex){
        res.status(500).send('something failed')    
    }
    
  });
  
  route.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });
  
  module.exports = route; 