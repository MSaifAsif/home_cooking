'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    multiparty = require('multiparty'),
    util = require('util');


exports.singleFileUploadToLocalFS = function (request, response) {
    var uploadedFile;
    var form = new multiparty.Form();
    form.parse(request, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        Object.keys(files).forEach(function(name) {
            console.log('Uploaded file', name);
            // set uploadedFile to the contents of the dictionary
        });
    });
    return response.status(200).send({
        data: uploadedFile
    });
};
