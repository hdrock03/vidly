const express = require('express')
const { Movie, validate} = require('../models/movies')
const route = express.Router()
const {Genre} = require('../models/genres') // Genre use krna tha to import kiye usko model wala genre se

route.get('/', async(req, res) => {
    console.log('hi');
    const movies = await Movie.find().sort('name')
    res.send(movies)
})

route.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId) // yaha check kr rhe h ki jb client genreId dalega to wo sahi genre hai ki nh aur agr sahi h to genre me object save kr dega
    // console.log(genre);
    if(!genre) return res.status(400).send('genre id is not available')

    let movie = new Movie ({
        title: req.body.title,
        genre: { // yaha genre= genre nh likhe qki hmko genre ka sara property nh chahiye tha id name chahiye to wo kr diye
            _id: genre._id,
        },
        // genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    movie = await movie.save();

    console.log(movie, "mvv");
    res.send(movie)
})

route.get('/:id', async(req,res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send('the movie with given Id is not available')

    res.send(movie)
})

route.put('/:id',async(req, res) =>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send('error.details[0].message')

    const genre = await Genre.findById(req.params.genreId) 
    console.log(genre);
    if(!genre) return res.status(400).send('genre id is not available')

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre:{
            _id : genre._id,
            name : genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    },{new:true})

    if(!movie) return res.status(404).send('the movie with given Id is not available')

    res.send(movie)

})

route.delete('/:id', async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if(!movie) return res.status(404).send('the movie with given Id is not available')

    res.send(movie)


})

module.exports = route;