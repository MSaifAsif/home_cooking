'use strict';

module.exports = function (app) {
    var recipe = require('../controllers/recipe.server.controller');

    app.route('/recipes/all').get(recipe.list);
    app.route('/recipes/add').post(recipe.create);

    // filter queries
    app.route('/recipes/find_any').get(recipe.find_any);
    app.route('/recipes/find_only').get(recipe.find_only);

};