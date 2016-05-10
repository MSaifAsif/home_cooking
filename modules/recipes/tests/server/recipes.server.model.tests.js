'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Recipes = mongoose.model('Recipes');

/**
 * Globals
 */
var user, recipes;

/**
 * Unit tests
 */
describe('Recipes Model Unit Tests:', function () {
    beforeEach(function (done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password'
        });

        user.save(function () {
            recipes = new Recipes({
                // Add model fields
                // ...
            });

            done();
        });
    });

    describe('Method Save', function () {
        it('should be able to save without problems', function (done) {
            return recipes.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
    });

    afterEach(function (done) {
        Recipes.remove().exec();
        User.remove().exec();

        done();
    });
});