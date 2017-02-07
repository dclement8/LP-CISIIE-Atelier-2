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
			console.log(response.data);
			/*$scope.token = response.data.token;
			localStorage.setItem('carteToken', $scope.token);

			$scope.getPoints();
			$scope.getDestination();
			$scope.point = 1;*/
		},
		function(error) {
			console.log(error);
		});
	}

	$scope.supprimerPartie = function() {
		if(confirm("Voulez-vous vraiment supprimer cette partie ?")) {
			localStorage.removeItem("carteToken");
			// TODO delete in db
		}
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
}]);
