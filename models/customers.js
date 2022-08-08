// is model me customer ka schema aur uska function h sirf

const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        isrequired: true,
        minlength: 5,
        maxlength: 20
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone: {
        type: String,
        isrequired: true,
        minlength: 5,
        maxlength: 20
    }
})

const Customer = new mongoose.model('Customer',customerSchema)

function validateCustomer(customer) {
    const schema = {
        name : Joi.string().min(5).max(50).isrequired(),
        phone: Joi.string().min(5).max(50).isrequired(),
        isGold: Joi.boolean()

    }

    return Joi.validate (customer, schema)
}

exports.Customer = Customer; // module.exports ko sirf exports bhi likh skte hai
exports.validate = validateCustomer;// validate ke jagah jo naam dena tha wo de skte the lkn yehi naam same dena h destructing ke ty customer.js page me