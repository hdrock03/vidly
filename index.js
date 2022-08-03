const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres')

app.use(express.json()) // it returns the middleware function the job of this function is if there is json object in the body of the req object. it will parse the body of the req into json object. 

app.set('/api/genres' , genres)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})