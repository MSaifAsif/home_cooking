'use strict';

module.exports = function (app) {
    // Routing logic   
    // ...

    var categoryController = require('../controllers/category.server.controller');
    app.route('/api/category/get').get(categoryController.list);
    app.route('/api/category/save').post(categoryController.save);

};