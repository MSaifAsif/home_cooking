'use strict';

module.exports = function (app) {
    var utilityEndpointsController = require('../controllers/utility-endpoint.server.controller');

    // file-io operation
    app.route('/api/v1/utility_endpoint/file/upload').post(utilityEndpointsController.singleFileUploadToLocalFS);	
};
