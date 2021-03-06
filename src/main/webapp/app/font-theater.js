var app = angular.module('app', ['ngRoute', 'fontLibrary', 'colorSchemes']);

app.config(
    ['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/colors', {
            templateUrl: 'app/templates/colors.html'
        }).
        when('/headings', {
            templateUrl: 'app/templates/headings.html'
        }).
        when('/text-page-1', {
            templateUrl: 'app/templates/text-page-1.html'
        }).
        when('/aquitaine', {
            templateUrl: 'app/templates/aquitaine.html'
        }).
        when('/dummy', {
            templateUrl: 'app/templates/dummy.html'
        }).
        when('/br-forside', {
            templateUrl: 'app/templates/br-forside.html'
        }).
        when('/br-om-oss', {
            templateUrl: 'app/templates/br-om-oss.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]
);

app.directive('fontControlPanel', function() {
    return {
        templateUrl: 'app/templates/directives/font-control-panel-directive.html'
    };
});

app.controller('FontController', function ($scope, fontLibrary, colorSchemes) {
    $scope.fontCollections = fontLibrary.fontCollections;

    $scope.selectFontById = function(fontId) {
        var font = fontLibrary.fontsById[fontId];
        $scope.currentFont = font;
        $scope.currentFontId = font.id;
        $scope.currentFontStyle = fontStyle(font);
    };

    $scope.selectFontCollectionById = function(fontCollectionId) {
        var fontCollection = fontLibrary.fontCollectionsById[fontCollectionId];
        $scope.currentFontCollection = fontCollection.fonts;
        $scope.currentFontCollectionId = fontCollection.id;
        $scope.selectFontById($scope.currentFontCollection[0].id);
    };

    $scope.selectFontCollectionById($scope.fontCollections[0].id);

    $scope.selectPreviousFont = function() {
        var index = $scope.currentFontCollection.indexOf($scope.currentFont);
        if (index > 0) {
            $scope.selectFontById($scope.currentFontCollection[index - 1].id);
        }
    };

    $scope.selectNextFont = function() {
        var index = $scope.currentFontCollection.indexOf($scope.currentFont);
        if (index < ($scope.currentFontCollection.length - 1)) {
            $scope.selectFontById($scope.currentFontCollection[index + 1].id);
        }
    };

    $scope.keyPressed = function(event) {
        if (event.which == 37) {
            $scope.selectPreviousFont();
        } else if (event.which == 39) {
            $scope.selectNextFont();
        } else if (event.which == 80) {
            $scope.showFontControlPanel = !$scope.showFontControlPanel;
        }
    };

    $scope.colorSchemes = colorSchemes.list;

    $scope.selectColorScheme = function(id) {
        $scope.selectedColorScheme = colorSchemes.getById(id);
        $scope.primaryBackgroundStyle = backgroundStyle($scope.selectedColorScheme.primaryBackgroundColor);
        $scope.shadowBackgroundStyle = backgroundStyle($scope.selectedColorScheme.shadowBackgroundColor);
        $scope.primaryTextStyle = colorStyle($scope.selectedColorScheme.primaryTextColor);
        $scope.secondaryTextStyle = colorStyle($scope.selectedColorScheme.secondaryTextColor);
    };

    $scope.selectColorScheme(colorSchemes.get(0).id);

    $scope.showFontControlPanel = true;

    function fontStyle(font) {
        return {'font-family': font.name};
    }

    function backgroundStyle(color) {
        return {'background-color': color};
    }

    function colorStyle(color) {
        return {'color': color};
    }
});
