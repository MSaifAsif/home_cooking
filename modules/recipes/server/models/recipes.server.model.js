'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Recipes Schema
 */
var RecipesSchema = new Schema({
  // Recipes model fields   
  // ...
});

mongoose.model('Recipes', RecipesSchema);
