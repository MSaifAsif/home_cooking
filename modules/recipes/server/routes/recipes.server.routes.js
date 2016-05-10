'use strict';

module.exports = function (app) {
    // Routing logic   
    // ...
    var recipesController = require('../controllers/recipes.server.controller');
    app.route('/recipes/all').get(recipesController.list);

    // filter queries
    app.route('/recipes/find_any').get(recipesController.find_any);
    app.route('/recipes/find_only').get(recipesController.find_only);

    // update an existing recipe
    app.route('/recipes/update').put(recipesController.update);

    // create a new recipe
    app.route('/recipes/add').post(recipesController.create);

    // Get by ID
    app.route('/recipes/get').get(recipesController.getById);

    // delete a recipe
    app.route('/recipes/delete').post(recipesController.getById);

    // Gets the count of recipes according to filters passed
    app.route('/recipes/count').get(recipesController.getCount);

};