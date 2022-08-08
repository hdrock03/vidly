const {genre, validate} = require('../models/genres')
const mongoose = require('mongoose')
const express = require('express')
const { string } = require('joi')
const route = express.Router()

route.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name') // Yha Genre me condition lagaye aur yeh promise return krta hai to await lagye aur (req,res se phle async)
    res.send(genres)
})

route.post('/', async (req,res) => {
    // let use kr rhe hai qki genre ko niche frse use krna h
    let genre = new Genre ({ // yaha khd se name daal rhe h mtlv new object create kr rhe h to Genre ko use krenge
        name: req.body.name // yaha se id hata diye qki mongodb khd se id provide krta hai
    })

    // genres.push(genre)
    genre =  await genre.save() // instead of pushing it we need to save it to db
    res.send(genre)
})

route.get('/:id',async (req,res) => {
    const genre = await Genre.findById(req.params.id)
    
    if(!genre) res.status(404).send('The course with given id is not available')
    res.send(genre)
})  



route.put('/:id', async (req,res) =>{
    const {error}= validateGenre(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }

   const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new:true} )// yaha apn id khoj ke update kr rhe hai phle
    // 1st argument jo id likhenge wo 2nd name jo dalna hai 3rd 
    

    if(!genre) res.status(404).send('The course with given id is not available')

    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // })
    // // console.log(schema);
   
    
    res.send(genre)

    
})

route.delete('/:id', async (req,res) => {
   const genre = await Genre.findByIdAndRemove(req.params.id)
    const genreId = req.params.id;
    

    if(!genre) res.status(404).send('The course with given id is not available')
    
    res.send()
})



module.exports = route