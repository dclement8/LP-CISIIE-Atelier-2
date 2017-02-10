var app = angular.module("carte", ["ngRoute", "ui-leaflet"]);

/* Routeur */
app.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
        when('/', {
            templateUrl: 'pages/creerCompte.html',
            controller: "creerController"
        }).
        when('/creerCompte', {
            templateUrl: "pages/creerCompte.html",
            controller: "creerController"
        }).
        when('/jeu', {
            templateUrl: "pages/jeu.html",
            controller: "carteController"
        }).
        when('/scores', {
            templateUrl: "pages/scores.html",
            controller: "scoresController"
        }).
        otherwise({redirectTo: '/'});
    }
]);

/* Filtre pour afficher du HTML */
app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
