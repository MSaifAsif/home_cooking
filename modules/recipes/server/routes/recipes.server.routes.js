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

    // generic search api
    app.route('/api/v1/recipes/search/find').get(recipesController.findByFilters);
    app.route('/api/v1/recipes/search/count').get(recipesController.countByFilters);

    // caetgorized search api
    app.route('/api/v1/recipes/search/find_from_ingredients').get(recipesController.findByIngredients);
    app.route('/api/v1/recipes/search/find_from_category').get(recipesController.findByCategory);
    app.route('/api/v1/recipes/search/find_top_featured').get(recipesController.getTopFeaturedRecipes);

    // generic filter queries
    app.route('/api/v1/recipes/search/find_any').get(recipesController.find_any);
    app.route('/api/v1/recipes/search/find_only').get(recipesController.find_only);

};