'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    multiparty = require('multiparty'),
    util = require('util');


exports.singleFileUploadToLocalFS = function (request, response) {
    console.log('I am here');
    // console.log(response.body);
    var form = new multiparty.Form();
    form.parse(request, function(err, fields, files) {
      // response.writeHead(200, {'content-type': 'text/plain'});
      // response.write('received upload:\n\n');
      // response.end(util.inspect({fields: fields, file: file}));
      console.log(err);
      console.log(fields);
      console.log(files);
      // file will be uploaded to /tmp by default
    });
    response.json('Done');
};
