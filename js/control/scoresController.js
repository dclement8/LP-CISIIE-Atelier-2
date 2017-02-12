app.controller("scoresController", ["$scope", "$http", "$location",
function($scope, $http, $location) {

    var errorHandler = function(e) {
		console.log(e);
	}

    // Affichage des meilleurs scores
    var tab = '';
    $http.get("api/parties").then(function(response) {
        if(response.status == 200) {
            tab += "<h2>Tableau des meilleurs scores :</h2><table class='responsive-table'><tr><th>Position</th><th>Pseudo</th><th>Score</th></tr>";
            for(var i = 0; i < response.data.scores.length; i++) {
                tab += "<tr><td>" + (i + 1) + "</td><td>" + response.data.scores[i].pseudo + "</td><td>" + response.data.scores[i].score + "</td></tr>";
            }
            tab += "</table>";
            $scope.tabScores = tab;
        }
        else {
            console.log("Erreur : mauvais status http");
        }
    }, errorHandler);
}]);
