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
        console.log('Creating destination', destinationLocation);
        fs.mkdirSync(destinationLocation);
    }
    var fileUploadFormOptions = {
        uploadDir: destinationLocation,
    };
    var fileUploadForm = new multiparty.Form(fileUploadFormOptions);
    console.log(request.query);
    fileUploadForm.parse(request, function(err, fields, files) {
        Object.keys(files).forEach(function(name) {
            console.log('got file named ' + name);
            // console.log(name.originalFilename);
            // console.log(files.name.originalFilename);
        });
        if (err) {
            return response.status(500).send({
                msg: err
            });
        }
        // console.log(files.originalFilename);
        // fs.rename(destinationLocation+'/'+files.originalFilename);
        return response.json(files.fileObj);
    });
};
