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
        validate: [validateTitle, 'Title should not exceed 15 characters'],
        required: true
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
    createdDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now(),
        required: true
    },
    tags: {
        type: [String],
        default: 'default'
    },
    monitor: {
        type: Schema.Types.Mixed,
        default: {
            'hearts': 0,
            'isFeatured': false,
            'isApproved': false,
            'author': 'default-user@homecooking.com',
            'views': 0
        },
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: true,
        default: {
            'description': {
                'short': 'this is a short description',
                'long': 'this is a long description'
            },
            'ingredients': {
                'ing': '1gm'
            },
            'directions': [
                'step1',
                'step2'
            ],
            'media': {
                'mainImage': '...',
                'mainClip': '...'
            },
            'nutrition_value': {
                'calories' : 0,
                'protein' : 0,
                'carbs' : 0,
                'fat' : 0,
                'saturates' : 0,
                'fibre' : 0,
                'sugar' : 0,
                'salt' : 0
            },
            'tips': [
                'tip1',
                'tip2'
            ],
            'stats': {
                'preparation_time': 0,
                'cooking_time': 0,
                'difficulty': 'easy',
                'serving_size': 0
            }
        }
    }
});

mongoose.model('Recipes', RecipesSchema);