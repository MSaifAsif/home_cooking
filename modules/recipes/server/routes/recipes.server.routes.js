'use strict';

module.exports = function (app) {
    // Routing logic   
    // ...
    var recipesController = require('../controllers/recipes.server.controller');
    app.route('/api/recipes/all').get(recipesController.list);

    // new api, to work with true rest URLs structure
    app.route('/api/v1/recipes').get(recipesController.get);  // get by ID
    app.route('/api/v1/recipes').post(recipesController.create);
    app.route('/api/v1/recipes').delete(recipesController.delete);
    app.route('/api/v1/recipes').put(recipesController.replace);
    app.route('/api/v1/recipes').patch(recipesController.update);

    app.route('/api/v1/recipes/find').get(recipesController.findByFilters);
    app.route('/api/v1/recipes/count').get(recipesController.countByFilters);
    app.route('/api/v1/recipes/findFromIngredients').get(recipesController.findByIngredients);

    // filter queries
    app.route('/api/v1/recipes/find_any').get(recipesController.find_any);
    app.route('/api/v1/recipes/find_only').get(recipesController.find_only);

};