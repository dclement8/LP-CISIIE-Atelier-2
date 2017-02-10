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

    var htmlEntities = function(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};

    var errorHandler = function(e) {
		console.log(e);
	}

    $scope.creerPartie = function() {
		if($scope.pseudo == undefined) {
			$scope.pseudo = "Anonyme";
		}

		$http.post("api/parties", '{"pseudo": "'+ htmlEntities($scope.pseudo) +'"}').then(function(response) {
			if(response.data.token !== undefined) {
				$scope.token = response.data.token;
				localStorage.setItem('carteToken', $scope.token);

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
    if(localStorage.getItem('carteToken')) {
        // Partie en cours ? redirection
        $location.path('/jeu');
    }
}]);
