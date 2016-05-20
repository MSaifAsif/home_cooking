'use strict';

module.exports = function (app) {
    // Routing logic   
    // ...
    var tagwordsController = require('../controllers/tagwords.server.controller');
    app.route('/api/v1/tagwords').get(tagwordsController.list);

};