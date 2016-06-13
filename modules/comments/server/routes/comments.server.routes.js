'use strict';

module.exports = function (app) {
    var commentsController = require('../controllers/comments.server.controller');
    app.route('/api/v1/comments').get(commentsController.getByRecipe);
    app.route('/api/v1/comments').post(commentsController.create);
    app.route('/api/v1/comments').delete(commentsController.delete);
    app.route('/api/v1/comments').patch(commentsController.update);

    app.route('/api/v1/comments/find').get(commentsController.getAllCommentsForRecipe);
    app.route('/api/v1/comments/count').get(commentsController.getAllCommentsCountsForRecipe);
    app.route('/api/v1/comments/getComment').get(commentsController.getById);

};