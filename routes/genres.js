const express = require('express')
const route = express.Router()


const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

route.get('/', (req, res) => {
    res.send(genres)
})

route.post('/', (req,res) => {
    const genre = {
        id: genres.length +1,
        name: req.body.name
    }

    genres.push(genre)
    res.send(genres)
})

route.get('/:id', (req,res) => {
    const genreId = req.params.id;
    const genre = genres.find(g => g.id === parseInt(genreId))
    if(!genre) res.status(404).send('The course with given id is not available')
    res.send(genre)
})  

module.exports = route

route.put('/:id', (req,res) =>{
    const genreId = req.params.id;
    const genre = genres.find(g => g.id === parseInt(genreId))

    if(!genre) res.status(404).send('The course with given id is not available')

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    // console.log(schema);
    const validation= schema.validate(req.body);
    
    if(validation.error){
        res.status(400).send(validation.error.details[0].message)
        return
    }
    genre.name = req.body.name;
    res.send(genre)

    
})

route.delete('/:id', (req,res) => {
    const genreId = req.params.id;
    const genre = genres.find(g => g.id === parseInt(genreId))

    if(!genre) res.status(404).send('The course with given id is not available')

    const index = genres.indexOf(genre)
    genres.splice(index,1)

    res.send()
})