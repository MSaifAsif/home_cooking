'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


function validateTitle(argument) {
    return true;
}


/**
 * Recipes Schema
 */
var RecipesSchema = new Schema({
    // Recipes model fields
    title: {
        type: String,
        validate: [validateTitle, 'Title should not exceed 15 characters']
    },
    description: {
        type: String,
        default: null
    },
    procedure: {
        type: Schema.Types.Mixed,
        default: {
            'ingredients': [String],
            'directions': [{
                'index': 0,
                'step': '',
                'img': ''
            }]
        }
    },
    mainImage: {
        type: String,
        default: null
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    likes: {
        type: Number,
        default: 0
    },
    category: {
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
    details: {
        type: Schema.Types.Mixed,
        default: {
            total_calories: 0,
            serving_size: 0,
            cooking_time: 0,
            nutrient_value: {
                'fats': 0,
                'carbs': 0,
                'protein': 0,
                'cholestrol': 0,
                'sodium': 0
            }
        }
    },
    tags: {
        type: [String]
    }
});

mongoose.model('Recipes', RecipesSchema);