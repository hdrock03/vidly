const mongoose = require('mongoose')
const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres')

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected to mongodb'))
    .catch(() => console.log('cannot connect to mongodb'))

app.use(express.json()) 
app.set('/api/genres' , genres)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})