'use strict';

module.exports = function(app) {
  // Routing logic   
  // ...
  var recipesController = require('../controllers/recipes.server.controller');
  app.route('/recipes/all').get(recipesController.list);
  app.route('/recipes/add').post(recipesController.create);

  // filter queries
  app.route('/recipes/find_any').get(recipesController.find_any);
  app.route('/recipes/find_only').get(recipesController.find_only);

  // update an existing recipe
  app.route('/recipes/update').put(recipesController.update);

};
