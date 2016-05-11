'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Category Schema
 */
var CategorySchema = new Schema({
    // Category model fields   
    // ...
    categoryName: {
        type: String,
        required: true
    },
    categoryDescription: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        enum: [
            'default',
            'dessert',
            'breakfast',
            'lunch',
            'high-tea',
            'dinner',
            'snacks'
        ],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

mongoose.model('Category', CategorySchema);