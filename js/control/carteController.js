angular.module("carte")
	.controller("carteController", ["$scope", "$http",
	function($scope, $http)
	{
		$scope.point = 1;
		$scope.points = [];
		$scope.destination;
		$scope.token = false;
		$scope.score = 0;

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

				$scope.getPoints();
				$scope.getDestination();
				$scope.point = 1;
			},
			function(error) {
				console.log(error);
			});
		}

		$scope.getPoints = function() {
			$http.get("api/points", '{"token": "'+ $scope.token +'"}').then(function(response) {
				$scope.points = response.data.points;
			},
			function(error) {
				console.log(error);
			});
		}

		$scope.getDestination = function() {
			$http.get("api/destination", '{"token": "'+ $scope.token +'"}').then(function(response) {
				$scope.destination = response.data.destination;
			},
			function(error) {
				console.log(error);
			});
		}

		$scope.sendScore = function() {
			$http.post("api/score", '{"token": "'+ $scope.token +'", "score": "'+ $scope.score +'"}').then(function(response) {
				//
			},
			function(error) {
				console.log(error);
			});
		}

		$scope.verifierPoint = function(coords) {
			console.log(coords);
		}
	}
]);
