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
  id: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  }, 
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
        'directions': [String]
    }
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
  media: {
    type: Schema.Types.Mixed,
    default: {}
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
  }
});

mongoose.model('Recipes', RecipesSchema);
