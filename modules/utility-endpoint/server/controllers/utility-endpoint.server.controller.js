'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    multiparty = require('multiparty'),
    fs = require('fs');


exports.singleFileUploadToLocalFS = function (request, response) {
    var destinationLocation = '/tmp/upload_dir/' + request.query.recipeId;

    if (!fs.existsSync(destinationLocation)){
        console.debug('Creating destination', destinationLocation);
        fs.mkdirSync(destinationLocation);
    }
    var fileUploadFormOptions = {
        uploadDir: destinationLocation,
    };
    var fileUploadForm = new multiparty.Form(fileUploadFormOptions);
    console.log(request.query);
    fileUploadForm.parse(request, function(err, fields, files) {
        Object.keys(files).forEach(function(name) {
            console.debug('Saved file name ' + name);
        });
        if (err) {
            return response.status(500).send({
                msg: err
            });
        }
        return response.json(files.fileObj);
    });
};
