'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe');

/**
 * Globals
 */
var user, recipe;

/**
 * Unit tests
 */
describe('Recipe Model Unit Tests:', function () {
    beforeEach(function (done) {
        // create a record object before every test
        recipe = new Recipe({
            title: 'Sample title',
            steps: ['step1', 'step2'],
            media: {
                'main': '/path/to/main.jpg',
                'video': '/path/to/video'
            }
        });
        done();
    });

    describe('Method Save', function () {
        it('should be able to save without problems', function (done) {
            return recipe.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
    });

    describe('Title characters long', function () {
        it('Will not save length title', function (done) {
            recipe.title = 'A very long string title ........................';
            return recipe.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
    });

    afterEach(function (done) {
        // Empty the database
        Recipe.remove().exec();

        done();
    });
});