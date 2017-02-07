app.controller("carteController", ["$scope", "$http", "leafletMapEvents", function($scope, $http, leafletMapEvents) {

	/* Génération de la carte */

	// Limites de la map
	$scope.regions = {
		france: {
            northEast: {
                lat: 51.27,
                lng: 9.88
            },
            southWest: {
                lat: 41,
                lng: -5.22
            }
        }
	};

	angular.extend($scope, {
        france: {
            lat: 46.32,
            lng: 2.25,
            zoom: 6
        },
		maxbounds: $scope.regions.france,
        events: {},
		tiles: {
            name: 'Mapbox',
            url: 'https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            options: {
                apikey: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw',
                mapid: 'mapbox.streets'
            }
        },
        defaults: {
            scrollWheelZoom: true,
			minZoom: 6,
			maxZoom: 10
        },
		geojson: {}
    });

	// Evenement lors du clic sur la carte
	$scope.$on("leafletDirectiveMap.click", function(event, args) {
		var leafEvent = args.leafletEvent;
		console.log(leafEvent.latlng);
	});

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
		$http.post("api/parties", '{"pseudo": "'+ $scope.pseudo +'"}').then(function(response) {
			console.log(response.data.token);
			if(response.data.token !== undefined) {
				$scope.token = response.data.token;
				localStorage.setItem('carteToken', $scope.token);

				$scope.getPoints();
				$scope.getDestination();
				$scope.point = 1;
			}
			else {
				// Erreur
				alert('Impossible de créer un compte !');
			}
		},
		function(error) {
			console.log(error);
		});
	}

	$scope.supprimerPartie = function() {
		if(confirm("Voulez-vous vraiment commencer une nouvelle partie ?")) {
			localStorage.removeItem("carteToken");
			$scope.token = false;
		}
	}

	$scope.getPoints = function() {
		$http.get("api/points").then(function(response) {
			if(response.data.points !== undefined) {
				$scope.points = response.data.points;
			}
			else {
				// Erreur
				alert('Impossible de récupérer les points !');
			}
		},
		function(error) {
			console.log(error);
		});
	}

	$scope.getDestination = function() {
		$http.get("api/destinations").then(function(response) {
			if(response.data.destination !== undefined) {
				$scope.destination = response.data.destination;
			}
			else {
				// Erreur
				alert('Impossible de récupérer la destination !');
			}
		},
		function(error) {
			console.log(error);
		});
	}

	$scope.sendScore = function() {
		$http.put("api/parties/score", '{"token": "'+ $scope.token +'", "score": "'+ $scope.score +'"}').then(function(response) {
			console.log(response.data);
		},
		function(error) {
			console.log(error);
		});
	}

	$scope.verifierPoint = function(coords) {
		console.log(coords);
	}
}]);
