'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Comments Schema
 */
var CommentsSchema = new Schema({
  // Comments model fields
  // ...
});

mongoose.model('Comments', CommentsSchema);
