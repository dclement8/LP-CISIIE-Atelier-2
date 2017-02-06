angular.module("carte")
	.controller("carteController", ["$scope", "$http",
	function($scope, $http)
	{
		$scope.points = [];
		$scope.destination;
		$scope.token = false;
		$scope.score;

		function storageAvailable(type) {
			try {
				var storage = window[type],
					x = '__storage_test__';
				storage.setItem(x, x);
				storage.removeItem(x);
				return true;
			}
			catch(e) {
				return false;
			}
		}

		if(!storageAvailable('localStorage')) {
			alert('localStorage indisponible sur votre navigateur !');
			return false;
		}

		if(!localStorage.getItem('carteToken')) {
			// Nouvelle partie
			console.log("créer nouvelle partie");
		}
		else {
			// Partie en cours ? on initialise token
			console.log("partie en cours");
			$scope.token = localStorage.getItem('carteToken');
		}

		$scope.creerPartie = function() {
			$http.post("api/newGame", '{"pseudo": "'+ $scope.pseudo +'"}').then(function(response) {
				$scope.token = response.data.token;
				localStorage.setItem('carteToken', $scope.token);
			},
			function(error) {
				console.log(error);
			});
		}
	}
]);
