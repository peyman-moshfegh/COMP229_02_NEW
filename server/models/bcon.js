/*
Name: Peyman Moshfegh
ID: 301151808
Date: 10/29/2021
*/

let mongoose = require('mongoose');

// create a model class
let bconModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "bcons"
});

module.exports = mongoose.model('Bcon', bconModel);