'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Recipes = mongoose.model('Recipes'),
  _ = require('lodash');

/**
 * Create a 
 */
exports.create = function (req, res) {
  
  var formBody = req.body;
  console.log(formBody.title);
  var newRecipe = new Recipes({
    title: formBody.title,
    description: formBody.description,
    procedure: formBody.procedure,
    media: formBody.media
  });

  newRecipe.save(function (err){
    if (err) {
      console.error('Error occured while saving new recipe');
      return res.status(400).send({
        message: err
      });
    } else {
      console.log('New recipe saved succesfully');
      res.status(200).send({
        message:err
      });
    }
  });
};

/**
 * Show the current 
 */
exports.read = function (req, res) {

};

/**
 * Update a 
 */
exports.update = function (req, res) {

};

/**
 * Delete an 
 */
exports.delete = function (req, res) {

};

/**
 * List of 
 */
exports.list = function (req, res) {

};
