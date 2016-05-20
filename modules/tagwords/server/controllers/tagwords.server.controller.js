'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Tagwords = mongoose.model('Tagwords'),
    _ = require('lodash');

/**
 * Create a 
 */
exports.create = function (req, res) {

};

/**
 * Show the current 
 */
exports.read = function (req, res) {

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
    Tagwords.find().exec(function (err, tagwords) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(tagwords);
        }
    });

};