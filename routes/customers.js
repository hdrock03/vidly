const {Customer, validate} = require('../models/customers')// yaha ek sath dono exports ko le liye h destructuring ke through means .Customer or .validate
const mongoose = require('mongoose');
const express = require('express');
const { func } = require('joi');
const route = express.Router();


route.get('/',async (req, res) => {
 const customer =  await Customer.find().sort('name');
 res.send(customer)
})

route.post('/',async (req, res) => {
    const {error} = validate(req.body) // validateCustomer ko validate kr diye qki model wale me export tym me iska naam validate kr diye

    if(error) return res.status(404).send(error.details[0].message)

    let customer = new Customer({
        name:req.body.name,
        isGold: req.body.Boolean,
        phone: req.body.phone
    })
    customer = await customer.save()
    console.log(customer);
})

route.get('/:id', async (req, res) => {
    const customer = await Customer.find(req.params.id)

    if(!customer) return res.status(404).send('The Customer with following id is not available')

    res.send(customer)

})

route.put('/:id', async (req, res) => {
    const {error} = validate(req.body) // validateCustomer ko validate kr diye qki model wale me export tym me iska naam validate kr diye

    if(error) return res.status(404).send(error.details[0].message)

    const customer =  await Customer.findByIdAndUpdate(req.params.id, {
        name:req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })

    customer = await customer.save()
    
    res.send(customer)
})

route.delete('/:id', async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if(!customer) return res.status(404).send('The Customer with following id is not available')

    res.send(customer)


})

module.exports = route
