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
    // app.route('/api/recipes/get').get(recipesController.getById);

    // delete a recipe
    app.route('/api/recipes/delete').post(recipesController.delete);

    // Gets the count of recipes according to filters passed

    app.route('/api/v1/recipes').get(recipesController.list);
    app.route('/api/v1/recipes').post(recipesController.create);
    app.route('/api/v1/recipes').delete(recipesController.delete);
    app.route('/api/v1/recipes/find').get(recipesController.findByFilters);
    app.route('/api/v1/recipes/count').get(recipesController.countByFilters);



};