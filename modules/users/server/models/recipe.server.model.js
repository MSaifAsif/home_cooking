'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * An initial level validation check
 * on title to be of 15 chars only
 */
function validateTitle(title) {
    return title.length <= 150;
}

function validateSteps(stepsArray) {
    for (var i = stepsArray.length - 1; i >= 0; i--) {
        if (typeof (stepsArray[i]) === 'string' || stepsArray[i] instanceof String) {
            // do nothing
        } else {
            return false;
        }
    }
}

/**
 * Recipe Schema
 */
var RecipeSchema = new Schema({
    // Recipe model fields   
    // ...
    id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    title: {
        type: String,
        validate: [validateTitle, 'Title should not exceed 15 characters']
    },
    steps: {
        type: [String]
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    media: {
        type: Schema.Types.Mixed,
        default: {}
    }
});

mongoose.model('Recipe', RecipeSchema);