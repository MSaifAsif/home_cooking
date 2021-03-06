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
    recipeId: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String,
        default: ''
    },
    author: {
        type: Schema.Types.Mixed,
        default: {
            'name': 'no-name',
            'email': 'no-name@anonymouse.com'
        }
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    stars: {
        type: Number,
        default: 3
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Comments', CommentsSchema);