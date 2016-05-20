'use strict';

module.exports = function (app) {
    // Routing logic   
    // ...

    var categoryController = require('../controllers/category.server.controller');
    app.route('/api/v1/category/').get(categoryController.list);
    app.route('/api/v1/category/').post(categoryController.save);

};