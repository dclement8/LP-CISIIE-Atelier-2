app.controller("creerController", ["$scope", "$http", "$location",
function($scope, $http, $location) {
    var storageAvailable = function(type) {
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
	};

	if(!storageAvailable('localStorage')) {
		alert('localStorage indisponible sur votre navigateur !');
		return false;
	}

    $scope.creerPartie = function() {
		if($scope.pseudo == undefined) {
			$scope.pseudo = "Anonyme";
		}

		$http.post("api/parties", '{"pseudo": "'+ htmlEntities($scope.pseudo) +'"}').then(function(response) {
			if(response.data.token !== undefined) {
				$scope.token = response.data.token;
				localStorage.setItem('carteToken', $scope.token);

				$scope.point = 0;

				$("#indication").css('color', 'black');
                $location.path('/jeu');
			}
			else {
				// Erreur
				alert('Impossible de créer un compte !');
			}
		}, errorHandler);
	};

    /* Initialisation */
    if(!localStorage.getItem('carteToken')) {
        // Nouvelle partie
        console.log("Nouvelle partie");
    }
    else {
        // Partie en cours ? on initialise token
        console.log("Partie en cours");
        $scope.token = localStorage.getItem('carteToken');
        $location.path('/jeu');
    }
}]);
