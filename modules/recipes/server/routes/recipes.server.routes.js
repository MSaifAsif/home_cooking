'use strict';

module.exports = function (app) {
    // Routing logic   
    // ...
    var recipesController = require('../controllers/recipes.server.controller');
    app.route('/api/recipes/all').get(recipesController.list);

    // filter queries
    app.route('/api/recipes/find_any').get(recipesController.find_any);
    app.route('/api/recipes/find_only').get(recipesController.find_only);

    // update an existing recipe
    app.route('/api/recipes/update').put(recipesController.update);

    // create a new recipe
    app.route('/api/recipes/add').post(recipesController.create);

    // Get by ID
    app.route('/api/recipes/get').get(recipesController.getById);

    // delete a recipe
    app.route('/api/recipes/delete').post(recipesController.getById);

    // Gets the count of recipes according to filters passed
    app.route('/api/recipes/count').get(recipesController.getCount);

};