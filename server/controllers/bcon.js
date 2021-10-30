/*
Name: Peyman Moshfegh
ID: 301151808
Date: 10/29/2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Bcon Model
let Bcon = require('../models/bcon');

module.exports.displayBconList = (req, res, next) => {
    Bcon.find((err, bconList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(BconList);

            res.render('bcon/list', {
                title: 'Business Contacts', 
                BconList : bconList, 
                displayName: req.user ? req.user.displayName : ''});
        }
    });

};

module.exports.displayAddPage = (req, res, next) => {
    res.render('bcon/add', {title: 'Add Business Contact', 
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => {
    let newBcon = Bcon({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Bcon.create(newBcon, (err, Bcon) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the bcon list
            res.redirect('/bcon-list');
        }
    });
}

module.exports.displayEditPage =  (req, res, next) => {
    let id = req.params.id;

    Bcon.findById(id, (err, bconToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            //show the edit view
            res.render('bcon/edit', {title: 'Edit Business Contact', bcon: bconToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    })
}

module.exports.processEditPage =  (req, res, next) => {
    let id = req.params.id;

    let updatedBcon = Bcon({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Bcon.updateOne({_id: id}, updatedBcon, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            // refresh the bcon list
            res.redirect('/bcon-list');
        }
    });

}

module.exports.performDelete =  (req, res, next) => {
    let id = req.params.id;

    Bcon.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            // refresh the bcon list
            res.redirect('/bcon-list');
        }
    });
}