'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Comments = mongoose.model('Comments'),
    _ = require('lodash'),
    ObjectId = require('mongoose').Types.ObjectId;

/**
 * Create a 
 */
exports.create = function (req, res) {
	console.log('creating a new comment');
    var formBody = req.body;
    var newComment = new Comments({
        recipeId: formBody.recipeId,
        text: formBody.text,
        author: formBody.author,
        isApproved: formBody.isApproved,
        stars: formBody.stars
    });

    newComment.save(function (err, newlyCreatedRecipeDoc) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.json(newlyCreatedRecipeDoc);
        }
    });
};

/**
 * Show the current 
 */
exports.getById = function (req, res) {
    Comments.findById(new ObjectId(req.query.commentId.toString()), function (err, resDoc) {
        if (err) {
            res.send(err);
        } else {
            res.send(resDoc);
        }
    });
};


/**
 * Show the comments by recipeId
 */
exports.getByRecipe = function (req, res) {
    var sortQuery = {'stars': -1}; // descending order of star rating
    var limitQuery = 5;  // maximum 5 results
    var recipeIdAndIsApprovedQuery = {'recipeId': new ObjectId(req.query.recipeId.toString()), 'isApproved': true};

    var r = Comments.find(recipeIdAndIsApprovedQuery).sort(sortQuery).limit(limitQuery);
    r.exec(function(err, resDoc){
        if (err) {
            res.send(err);
        } else {
            res.send(resDoc);
        }
    });
};


/**
 * Update a Comment by its ID
 */
exports.update = function (req, res) {
    Comments.findByIdAndUpdate(new ObjectId(req.query.commentId.toString()), req.body.updatedFieldsJson, {new: false}, function(err, updatedCmnt){
        if (err) {
            res.send(err);
        } else {
            res.send(updatedCmnt);
        }
    });
};

/**
 * Delete an 
 */
exports.delete = function (req, res) {
    var commentIdQuery = {'_id': req.query.commentId};
    Comments.remove(commentIdQuery, function(err, removedCount){
        if (err) {
            res.send(err);
        } else {
            res.send(removedCount);
        }
    });
};

/**
 * List of all comments for a recipe
 */
exports.getAllCommentsForRecipe = function (req, res) {
    var recipeIdQuery = {'recipeId': new ObjectId(req.query.recipeId.toString())};

    var r = Comments.find(recipeIdQuery);
    r.exec(function(err, resDoc){
        if (err) {
            res.send(err);
        } else {
            res.send(resDoc);
        }
    });
};

exports.getAllCommentsCountsForRecipe = function (req, res) {
    var recipeIdQuery = {'recipeId': new ObjectId(req.query.recipeId.toString())};

    Comments.count(recipeIdQuery).exec(function (err, result) {
        if (err) {
            return res.status(400).send({
                api_message: err
            });
        } else {
            res.status(200).send({
                total_comments: result
            });
        }
    });
};
