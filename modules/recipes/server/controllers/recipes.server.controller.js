'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Recipes = mongoose.model('Recipes'),
    _ = require('lodash'),
    ObjectId = require('mongoose').Types.ObjectId;

/**
 * Create a 
 */
exports.create = function (req, res) {

    var formBody = req.body;
    var newRecipe = new Recipes({
        title: formBody.title,
        description: formBody.description,
        procedure: formBody.procedure,
        media: formBody.media,
        category: formBody.category,
        tags: formBody.tags,
        details: formBody.details
    });

    newRecipe.save(function (err, newlyCreatedRecipeDoc) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            // res.status(200).send({
            //     api_message: 'New recipe saved succesfully',
            //     data: newlyCreatedRecipeDoc
            // });
            res.json(newlyCreatedRecipeDoc);
        }
    });
};

/**
 * Show the current count 
 */
exports.getCount = function (req, res) {
    var filters = {};
    var filtersAdded = 0;
    var queryParams = req.query;
    if (queryParams.recipe_id) {
        filters._id = new ObjectId(queryParams.recipe_id.toString());
        filtersAdded++;
    }
    if (queryParams.title) {
        filters.title = queryParams.title;
        filtersAdded++;
    }
    if (queryParams.is_active) {
        filters.isActive = Boolean(queryParams.is_active);
        filtersAdded++;
    }
    if (queryParams.category) {
        filters.category = queryParams.category;
        filtersAdded++;
    }

    Recipes.count(filters).exec(function (err, recipesCount) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.status(200).send({
                total_recipes: recipesCount
            });
        }
    });
};

/**
 * Update a recipe, this replaces the entire 
 * recipe document with the new name
 */
exports.replace = function (req, res) {
    Recipes.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, updatedRecipe) {
        if (err) {
            res.send(err);
        } else {
            res.send(updatedRecipe);
        }
    });
};


/**
 * Update a Recipe by its ID
 */
exports.update = function (req, res) {
    Recipes.findOne({ _id: new ObjectId(req.query.recipeId.toString())}, function (err, recipeToUpdate){
        // first get the recipe
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            // now update the keys individually
            var updatedFieldsJson = req.body.updatedFieldsJson;
            for(var key in updatedFieldsJson){
                recipeToUpdate[key] = updatedFieldsJson[key];
            }
            // now save the document
            recipeToUpdate.save(function (err, updatedRecipe) {
                if (err) {
                    return res.status(400).send({
                        api_message: err
                    });
                } else {
                    // return the updated recipe document
                    res.json(updatedRecipe);
                }
            });
        }
    });

};


/**
 * Soft deletes a recipe
 */
exports.delete = function (req, res) {
    var markDeleted = {
        isActive: false
    };
    Recipes.findByIdAndUpdate(new ObjectId(req.query.recipeId.toString()), markDeleted, function (err, updatedRecipe) {
        if (err) {
            res.send(err);
        } else {
            res.send(updatedRecipe);
        }
    });
};

/**
 * List of 
 */
exports.list = function (req, res) {
    Recipes.find().exec(function (err, recipes) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.json(recipes);
        }
    });
};


exports.findByFilters = function (req, res) {
    var queryFilters = {};
    var reqQuery = req.query;
    if (reqQuery.recipeId) {
        queryFilters._id = new ObjectId(req.query.recipeId.toString());
    }
    if (reqQuery.tagwords) {
        var tagwordsList = reqQuery.tagwords.split(/,/);
        queryFilters.$or = [];

        tagwordsList.forEach(function(tag){
            queryFilters.$or.push({tags: tag});
        });
    }
    if (reqQuery.categoryType) {
        queryFilters.category = reqQuery.categoryType;
    }

    Recipes.find(queryFilters, function (err, result) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.json(result);
        }
    });
};


exports.countByFilters = function (req, res) {
    var queryFilters = {};
    var reqQuery = req.query;
    if (reqQuery.recipeId) {
        queryFilters._id = new ObjectId(req.query.recipeId.toString());
    }
    if (reqQuery.tagwords) {
        var tagwordsList = reqQuery.tagwords.split(/,/);
        queryFilters.$or = [];

        tagwordsList.forEach(function(tag){
            queryFilters.$or.push({tags: tag});
        });
    }
    if (reqQuery.categoryType) {
        queryFilters.category = reqQuery.categoryType;
    }

    Recipes.count(queryFilters).exec(function (err, result) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.status(200).send({
                total_recipes: result
            });
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

    Recipes.find(query).exec(function (err, recipes) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.status(200).send({
                data: recipes
            });
        }
    });
};

exports.get = function (req, res) {
    var recipeId = new ObjectId(req.query.recipeId.toString());
    Recipes.findOne({ _id: recipeId}, function (err, recipeDocument){
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.json(recipeDocument);
        }
    });
};

/**
 * Find recipes matching a list of ingredients
 */
exports.findByIngredients = function (req, res) {
    var ingredientsList = req.query.ingredients.toString().split(',');
    Recipes.find({ 'procedure.ingredients': { '$in' : ingredientsList} }, function (err, matchingRecipes) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            var resultArray = [];
            // need to decide percentage wise
            matchingRecipes.forEach(function(aRecipe) {
                var innerRecipeObject = {};
                var recipesIngredients = aRecipe.procedure.ingredients;

                // filter the list to get matching ingredients only
                ingredientsList.filter(function(anIng) {
                    return recipesIngredients.indexOf(anIng) !== -1;
                });
                innerRecipeObject.matchingIngredients = ingredientsList;
                // calculate percentage of match
                innerRecipeObject.matchPercentage = (ingredientsList.length / recipesIngredients.length * 100);
                innerRecipeObject.recipe = aRecipe;
                resultArray.push(innerRecipeObject);
            });

            // now sort in order of match percentage
            resultArray.sort(function(recipeA, recipeB) {
                return parseFloat(recipeA.matchPercentage) - parseFloat(recipeB.matchPercentage);
            });
            res.json(resultArray);
        }
    });
};

exports.getTopFeaturedRecipes = function (req, res) {
    Recipes.find({ 'tags': 'featured'}, function(err, featuredRecipes){
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.json(featuredRecipes);
        }
    });
};

exports.findByCategory = function (req, res) {
    Recipes.find({ 'category': req.query.category}, function(err, featuredRecipes){
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.json(featuredRecipes);
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

    // we may have multiple filters in our request
    // in that case build the query based 
    // on the filters
    Object.keys(filters).forEach(function(fltr, i) {
        var innerObj = {};
        innerObj[fltr] = filters[fltr];
        query.$or.push(innerObj);
    });

    Recipes.find(query).exec(function (err, recipes) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.json(recipes);
        }
    });
};