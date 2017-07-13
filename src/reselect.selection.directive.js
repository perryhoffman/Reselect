Reselect.directive('reselectSelection', ['$templateCache', function($templateCache){
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: $templateCache.get('templates/reselect.selection.tpl.html'),
        scope: {},
        require: ['^reselect'],
        link: function($scope, $element, $attrs, ctrls, transclude){
            console.log('ctrls ', ctrls)
            $scope.$Reselect = ctrls[0]
            transclude($scope, function(clone){
                $element.append(clone);
            });
        },
        controller: ['$scope', function($scope){
            console.log('args ', $scope)
            $scope.$selection = null;
            $scope.$choice = null;

            $scope.$search = function (search_val) {
                console.log('getting called ', search_val)
                $scope.$Reselect.search_term = search_val
                $scope.$emit('reselect.search', search_val)
                if (!$scope.$Reselect.opened) {
                    $scope.$Reselect.showDropdown(true)
                }
            }

            $scope.$on('reselect.renderselection', function(event, selection){
                // console.log('selection ', selection)
                let selection_copy = angular.copy(selection)
                angular.extend($scope, selection_copy);
            });
        }]
    };
}]);
