'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    multiparty = require('multiparty');


exports.singleFileUploadToLocalFS = function (request, response) {
    var fileUploadFormOptions = {
        uploadDir: '/tmp/upload_dir'
    };
    var fileUploadForm = new multiparty.Form(fileUploadFormOptions);
    fileUploadForm.parse(request, function(err, fields, files) {
        if (err) {
            return response.status(500).send({
                msg: err
            });
        }
        return response.json(files.fileObj);
    });
};
