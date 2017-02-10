app.controller("scoresController", ["$scope", "$http", "$location",
function($scope, $http, $location) {
    console.log('bob');
    var errorHandler = function(e) {
		console.log(e);
	}

    $scope.getBestScores = function() {
        // Affichage des meilleurs scores
        $http.get("api/parties").then(function(response) {
            if(response.status == 200) {
                $("#tabscores").append("<h2>Tableau des meilleurs scores :</h2><table class='responsive-table'><tr><th>Position</th><th>Pseudo</th><th>Score</th></tr>");
                for(var i = 0; i < response.data.scores.length; i++) {
                    $("#tabscores").append("<tr><td>" + (i + 1) + "</td><td>" + response.data.scores[i].pseudo + "</td><td>" + response.data.scores[i].score + "</td></tr>");
                }
                $("#tabscores").append("</table>");
            }
            else {
                console.log("Erreur : mauvais status http");
            }
        }, errorHandler);
    };

    $scope.getBestScores();
}]);
