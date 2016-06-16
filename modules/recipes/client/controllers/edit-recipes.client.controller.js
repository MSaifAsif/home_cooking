(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('EditRecipesController', EditRecipesController);

    EditRecipesController.$inject = ['$scope', 'RecipeSearchService', 'TagwordService', 'RecipeService'];

    function EditRecipesController($scope, RecipeSearchService, TagwordService, RecipeService) {
        var vm = this;
        $scope.data = {};
        $scope.data.editableRecipe = {};

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        function getTagwordsForQuery(tagwordsTextList) {
            // need to contruct a comma separated string
            var arr = [];
            if (tagwordsTextList === undefined) {
                return '';
            }
            for (var i = tagwordsTextList.length - 1; i >= 0; i--) {
                arr.push(tagwordsTextList[i].text);
            }
            return arr.join(',');
        }

        $scope.getEditRecipeModal = function(recipeId){
           RecipeService.get({
                recipeId: recipeId
            }).$promise.then(function(theRecipeToEdit){
                $scope.data.editableRecipe.id = theRecipeToEdit._id;
                $scope.data.editableRecipe.description = theRecipeToEdit.description;
                $scope.data.editableRecipe.isActive = theRecipeToEdit.isActive;
                $scope.data.editableRecipe.title = theRecipeToEdit.title;
                $scope.data.editableRecipe.procedure = theRecipeToEdit.procedure;
                $('#recipeEditModel').modal();
            });
        };

        $scope.deleteRecipe = function(recipeId){
            $scope.data.retrievedComments = [];
            var params = {
                recipeId: recipeId
            };
            RecipeService.delete(params, function(res){
                $scope.findRecipes();
            });
        };
        $scope.saveEditedRecipe = function(recipeId) {
            var params = {
                recipeId: recipeId,
                updatedFieldsJson: {
                    description: $scope.data.editableRecipe.description,
                    isActive: $scope.data.editableRecipe.isActive,
                    title: $scope.data.editableRecipe.title,
                    procedure: $scope.data.editableRecipe.procedure,
                    lastUpdated: new Date()
                }
            };
            RecipeService.patch(params, function(){
                $scope.findRecipes();
            });
        };

        $scope.loadTagwords = function(query) {
            return TagwordService.query().$promise;
        };

        $scope.findRecipes = function() {
            // empty the results before firing query
            var category;

            $scope.data.retrievedRecipes = [];
            var searchTags = getTagwordsForQuery($scope.data.tagwords);
            var recipeId = $scope.data.recipeId;

            // sanity check for missing category, although we may never have this
            // remove this TODO
            if ($scope.data.category) {
                category = $scope.data.category.categoryType || '';
            }
            var filtersData = {
                tagwords: searchTags,
                recipeId: recipeId,
                categoryType: category
            };

            // first get count of results
            var q = RecipeSearchService.countRecipesMatchingFilters.get(filtersData, function(count){
                $scope.data.retrievedRecipesCount = count.total_recipes;
            });

            // Now get the results
            RecipeSearchService.findRecipesMatchingFilters.query(filtersData, function(retrievedRecipes) {
                angular.forEach(retrievedRecipes, function(aRecipe) {
                    var innerObject = {};
                    innerObject.id = aRecipe._id;
                    innerObject.createdDate = parseDateToHumanReadable(aRecipe.createdDate);
                    innerObject.isActive = Boolean(aRecipe.isActive) === true ? 'Active' : 'Not active';
                    innerObject.description = aRecipe.description;
                    $scope.data.retrievedRecipes.push(innerObject);
                });
            });
        };
    }
})();