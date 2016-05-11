(function () {
    'use strict';

    angular
        .module('recipes')
        .directive('drvRecipeMultiFileUpload', drvRecipeMultiFileUpload);

    drvRecipeMultiFileUpload.$inject = [ '$parse' ];

    function drvRecipeMultiFileUpload($parse) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                // Drv recipe multi file upload directive logic
                // ...
                console.log('here');
                element.text('this is the drvRecipeMultiFileUpload directive');
                var model = $parse(attrs.drvRecipeMultiFileUpload);
                var isMultiple = attrs.multiple;
                var modelSetter = model.assign;
                element.bind('change', function () {
                    var values = [];
                    angular.forEach(element[0].files, function (item) {
                        var value = {
                           // File Name 
                            name: item.name,
                            //File Size 
                            size: item.size,
                            //File URL to view 
                            url: URL.createObjectURL(item),
                            // File Input Value 
                            _file: item
                        };
                        values.push(value);
                    });
                    scope.$apply(function () {
                        if (isMultiple) {
                            modelSetter(scope, values);
                        } else {
                            modelSetter(scope, values[0]);
                        }
                    });
                });
            }
        };
    }
})();