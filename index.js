const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.post('/api/genres', (req,res) => {
    const genre = {
        id: genres.length +1,
        name: req.body.name
    }

    genres.push(genre)
    res.send(genres)
})

app.get('/api/genres/:id', (req,res) => {
    const genreId = req.params.id;
    const genre = genres.find(g => g.id === parseInt(genreId))
    if(!genre) res.status(404).send('The course with given id is not available')
    res.send(genre)
})  

app.put('/api/genres/:id', (req,res) =>{
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

app.delete('/api/genres/:id', (req,res) => {
    const genreId = req.params.id;
    const genre = genres.find(g => g.id === parseInt(genreId))

    if(!genre) res.status(404).send('The course with given id is not available')

    const index = genres.indexOf(genre)
    genres.splice(index,1)

    res.send()
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})