'use strict';

module.exports = function (app) {
    var commentsController = require('../controllers/comments.server.controller');
    app.route('/api/v1/comments').get(commentsController.getByRecipe);
    app.route('/api/v1/comments').post(commentsController.create);

};