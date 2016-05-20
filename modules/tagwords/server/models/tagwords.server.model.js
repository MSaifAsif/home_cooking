'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Tagwords Schema
 */
var TagwordsSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // weight will define what percentage of recipes belong to this tag key
    weight: {
        type: Number,
        default: 0.0
    }
});

mongoose.model('Tagwords', TagwordsSchema);