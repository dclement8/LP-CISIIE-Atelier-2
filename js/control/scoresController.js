app.controller("scoresController", ["$scope", "$http", "$location",
function($scope, $http, $location) {
    var errorHandler = function(e) {
		console.log(e);
	}

            }
            else {
                console.log("Erreur : mauvais status http");
            }
            tab += "</table>";
            $scope.tabScores = tab;
        }
        else {
            console.log("Erreur : mauvais status http");
        }
    }, errorHandler);
}]);
