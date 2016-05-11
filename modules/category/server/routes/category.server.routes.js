'use strict';

module.exports = function (app) {
    // Routing logic   
    // ...

    var categoryController = require('../controllers/category.server.controller');
    app.route('/api/category/').get(categoryController.list);
    app.route('/api/category/').post(categoryController.save);

};