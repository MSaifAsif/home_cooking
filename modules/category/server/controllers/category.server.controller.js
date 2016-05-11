'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    _ = require('lodash');

/**
 * Show the current 
 */
exports.read = function (req, res) {

};

exports.save = function (req, res) {
    var formBody = req.body;
    var newCat = new Category({
        categoryName: formBody.catName, 
        categoryDescription: formBody.desc, 
        categoryType: formBody.type, 
        isActive: true
    });
    newCat.save(function(err){
        if (err) {
            console.error('Error occured while saving new Category');
            return res.status(400).send({
                message: err
            });
        } else {
            console.log('New category saved succesfully');
            res.status(200).send({
                message: err
            });
        }
    });
};

/**
 * List of 
 */
exports.list = function (req, res) {
    Category.find().exec(function (err, categories) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(categories);
        }
    });
};