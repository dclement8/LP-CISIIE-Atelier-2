app.controller("carteController", ["$scope", "$http", "leafletMapEvents",
function($scope, $http, leafletMapEvents) {

	$scope.point = 1;
	$scope.points = [];
	$scope.destination;
	$scope.token = false;
	$scope.score = 0;
	$scope.fini = false;
	$scope.finJeu = false;

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
		
		if($scope.finJeu == false)
		{
			if($scope.fini == false)
			{
				$scope.verifierPoint(
					[leafEvent.latlng.lat, leafEvent.latlng.lng],
					[$scope.points[$scope.point-1].latitude, $scope.points[$scope.point-1].longitude]
				);
			}
			else
			{
				// Chasse à la destination finale
				$scope.verifierDestination(
					[leafEvent.latlng.lat, leafEvent.latlng.lng],
					[$scope.points[$scope.point-1].latitude, $scope.points[$scope.point-1].longitude]
				);
			}
		}
	});

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
				document.getElementById("indication").innerHTML = $scope.points[0].indication;
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

	$scope.verifierPoint = function(p1, p2) {
		// On vérifie p1 par rapport à p2
		var diagonale = Math.sqrt(Math.pow(Math.abs(p2[0]-p1[0]),2)+Math.pow(Math.abs(p2[1]-p1[1]),2));
		console.log(diagonale);
		
		// 0.565 = valeur maximale tolérable entre deux points .
		
		if(diagonale <= 0.565)
		{
			// Créer marqueur au point trouvé
			
			// Si nbPoints >= 2 : tracer le chemin entre le point n-1 et le point n
			
			function afficherBien()
			{
				$("#message").html("Bien !");
				document.getElementById("message").style.backgroundColor = "rgba(0,128,0,0.9)";
				$("#message").fadeIn();
				setTimeout(function(){ $("#message").fadeOut(); }, 700);
			}
			
			// Afficher un indice pour la destination finale
			switch($scope.point)
			{
				case 1:
					$("#indices").append("<li>" + $scope.destination.indice1 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = $scope.points[$scope.point - 1].indication;
					afficherBien();
					break;
					
				case 2:
					$("#indices").append("<li>" + $scope.destination.indice2 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = $scope.points[$scope.point - 1].indication;
					afficherBien();
					break;
					
				case 3:
					$("#indices").append("<li>" + $scope.destination.indice3 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = $scope.points[$scope.point - 1].indication;
					afficherBien();
					break;
					
				case 4:
					$("#indices").append("<li>" + $scope.destination.indice4 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = $scope.points[$scope.point - 1].indication;
					afficherBien();
					break;
					
				case 5:
					$("#indices").append("<li>" + $scope.destination.indice5 + "</li>");
					$scope.fini = true; // On termine la chasse aux indices, trouver destination finale.
					
					document.getElementById("indication").innerHTML = "<b>Trouvez maintenant la rose des vents via les indices fournis... Vous n'avez droit qu'à une SEULE tentative !</b>";
					
					$("#message").html("Bravo vous avez trouvé les 5 indices pour trouver la rose des vents !<br/><br/>D'après vos indices collectés, où se trouve t-elle ?");
					document.getElementById("message").style.backgroundColor = "rgba(0,128,0,0.9)";
					$("#message").fadeIn();
					setTimeout(function(){ $("#message").fadeOut(); }, 5000);
					
					break;
			}
		}
		else
		{
			// Erreur
			$("#message").html("Ce n'est pas par là !");
			document.getElementById("message").style.backgroundColor = "rgba(223,0,0,0.9)";
			$("#message").fadeIn();
			setTimeout(function(){ $("#message").fadeOut(); }, 700);
		}
	}
	
	$scope.verifierDestination = function(p1, p2) {
		// On vérifie p1 par rapport à p2
		var diagonale = Math.sqrt(Math.pow(Math.abs(p2[0]-p1[0]),2)+Math.pow(Math.abs(p2[1]-p1[1]),2));
		console.log(diagonale);
		
		// D = 0.565 : valeur score max .
		var D = 0.565;
		if(diagonale < D)
		{
			$scope.score = 10;
		}
		else
		{
			if(diagonale < (2*D))
			{
				$scope.score = 8;
			}
			else
			{
				if(diagonale < (3*D))
				{
					$scope.score = 6;
				}
				else
				{
					if(diagonale < (5*D))
					{
						$scope.score = 3;
					}
					else
					{
						if(diagonale < (10*D))
						{
							$scope.score = 1;
						}
						else
						{
							$scope.score = 0;
						}
					}
				}
			}
		}
		
		$scope.finJeu = true;
		document.getElementById("indication").innerHTML = "<b>Partie terminée !</b>";
		
		// Envoi du score
		$http.put("api/parties/score", '{"score" : ' + $scope.score + ' , "token" : ' + $scope.token + ' }').then(function(response) {
			if(response.status == 201)
			{
				$("#message").html("Score envoyé ! Vous remportez " + $scope.score + " points.");
				document.getElementById("message").style.backgroundColor = "rgba(0,0,128,0.9)";
				$("#message").fadeIn();
				setTimeout(function(){ $("#message").fadeOut(); }, 5000);
			}
			else {
				// Erreur
				$("#message").html("Impossible d'inscrire votre score ! Vous remportez " + $scope.score + " points.");
				document.getElementById("message").style.backgroundColor = "rgba(213,85,0,0.9)";
				$("#message").fadeIn();
				setTimeout(function(){ $("#message").fadeOut(); }, 5000);
			}
		},
		function(error) {
			console.log(error);
		});
	}

	if(!localStorage.getItem('carteToken')) {
		// Nouvelle partie
		console.log("créer nouvelle partie");
	}
	else {
		// Partie en cours ? on initialise token
		console.log("partie en cours");
		$scope.token = localStorage.getItem('carteToken');
		$scope.getPoints();
		$scope.getDestination();
	}
}]);
