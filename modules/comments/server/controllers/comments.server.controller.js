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
exports.get = function (req, res) {
	Comments.findById(new ObjectId(req.query.recipeId.toString()), function (err, responseComments) {
        if (err) {
            res.send(err);
        } else {
            res.send(responseComments);
        }
    });
};

/**
 * Update a 
 */
exports.update = function (req, res) {

};

/**
 * Delete an 
 */
exports.delete = function (req, res) {

};

/**
 * List of 
 */
exports.list = function (req, res) {

};
