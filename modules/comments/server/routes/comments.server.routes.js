'use strict';

module.exports = function (app) {
    var commentsController = require('../controllers/comments.server.controller');
    app.route('/api/v1/comments').put(commentsController.create);
    app.route('/api/v1/comments').get(commentsController.getById);

};