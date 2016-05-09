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
  var updatedFieldsJson = req.body.updates;
  console.log(updatedFieldsJson);
  Recipes.findByIdAndUpdate(req.body.recipe_id, updatedFieldsJson, function (err, updatedRecipe) {
    if (err) {
      res.send(err);
    } else {
      res.send(updatedRecipe);
    }
  });
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
  console.log('Fetching all recipes');
  Recipes.find().exec(function(err, recipes) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      res.json(recipes);
    }
  });
};


/**
 * AND filter query
 */
exports.find_only = function (req, res) {
  var query = {};
  query.$and = [];
  var filters = req.query;
  query.$and.push(filters);

  Recipes.find(query).exec(function(err, recipes) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      res.status(200).send({
        data: recipes
      }); 
    }
  });
};


/**
 * OR filter query
 */
exports.find_any = function (req, res) {
  var query = {};
  query.$or = [];
  var filters = req.query;
  query.$or.push(filters);

  // we may have multiple filters in our request
  // in that case build the query based 
  // on the filters
  Recipes.find(query).exec(function(err, recipes) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      res.status(200).send({
        data: recipes
      }); 
    }
  });
};