app.controller("carteController", ["$scope", "$http", "leafletMapEvents",
function($scope, $http, leafletMapEvents) {

	$scope.point = 0;
	$scope.points = [];
	$scope.destination;
	$scope.token = false;
	$scope.score = 0;
	$scope.fini = false;
	$scope.finJeu = false;
	$scope.markers = new Array();
	$scope.paths = {
		points: {
			type: "polyline",
			color: 'green',
			weight: 2,
			latlngs: []
		}
	};

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
            zoom: 5
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
			minZoom: 5,
			maxZoom: 10
        },
		geojson: {}
    });

	function htmlEntities(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	// Evenement lors du clic sur la carte
	$scope.$on("leafletDirectiveMap.click", function(event, args) {
		var leafEvent = args.leafletEvent;

		if($scope.finJeu == false)
		{
			if($scope.fini == false)
			{
				$scope.verifierPoint(
					[leafEvent.latlng.lat, leafEvent.latlng.lng],
					[$scope.points[$scope.point].latitude, $scope.points[$scope.point].longitude]
				);
			}
			else
			{
				// Chasse à la destination finale
				$scope.verifierDestination(
					[leafEvent.latlng.lat, leafEvent.latlng.lng],
					[$scope.destination.latitude, $scope.destination.longitude]
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
		$http.post("api/parties", '{"pseudo": "'+ htmlEntities($scope.pseudo) +'"}').then(function(response) {
			console.log(response.data.token);
			if(response.data.token !== undefined) {
				$scope.token = response.data.token;
				localStorage.setItem('carteToken', $scope.token);

				$scope.getPoints();
				$scope.getDestination();
				$scope.point = 0;

				$("#indication").css('color', 'black');
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
			$("#indices").html("");
			$scope.fini = false;
			$scope.finJeu = false;
			$scope.markers = new Array();
			$scope.paths = {
				points: {
					type: "polyline",
					color: 'green',
					weight: 2,
					latlngs: []
				}
			};
			$("#tabscores").html("");
		}
	}

	$scope.getPoints = function() {
		$http.get("api/points").then(function(response) {
			if(response.data.points !== undefined) {
				$scope.points = response.data.points;
				document.getElementById("indication").innerHTML = "Trouvez le point sur la carte selon l'indice suivant : <i>" + $scope.points[0].indication + "</i>";
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

	$scope.ajouterMarker = function(latitude, longitude, isFinal) {
		$scope.markers.push({
			lat: latitude,
			lng: longitude
		});

		if(isFinal === true) {
			// On change l'icône si c'est la destination
			$scope.markers[$scope.markers.length-1].icon = {
                type: 'awesomeMarker',
                markerColor: 'red'
            };
		}
    };

	$scope.relierPoint = function(point) {
		$scope.paths.points.latlngs.push({lat: point.lat, lng: point.lng});
    };

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
			$scope.ajouterMarker(p2[0], p2[1]);

			$scope.relierPoint($scope.markers[$scope.point]);

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
				case 0:
					$("#indices").append("<li>" + $scope.destination.indice1 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = "Trouvez le point sur la carte selon l'indice suivant : <i>" + $scope.points[$scope.point].indication + "</i>";
					afficherBien();
					break;
				case 1:
					$("#indices").append("<li>" + $scope.destination.indice2 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = "Trouvez le point sur la carte selon l'indice suivant : <i>" + $scope.points[$scope.point].indication + "</i>";
					afficherBien();
					break;
				case 2:
					$("#indices").append("<li>" + $scope.destination.indice3 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = "Trouvez le point sur la carte selon l'indice suivant : <i>" + $scope.points[$scope.point].indication + "</i>";
					afficherBien();
					break;
				case 3:
					$("#indices").append("<li>" + $scope.destination.indice4 + "</li>");
					$scope.point++;
					document.getElementById("indication").innerHTML = "Trouvez le point sur la carte selon l'indice suivant : <i>" + $scope.points[$scope.point].indication + "</i>";
					afficherBien();
					break;
				case 4:
					$("#indices").append("<li>" + $scope.destination.indice5 + "</li>");
					$scope.point++;
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

		// Créer marqueur au point trouvé
		$scope.ajouterMarker(p2[0], p2[1], true);
		console.log(p2);
		console.log($scope.markers);

		console.log($scope.destination);
		$scope.relierPoint({lat: p2[0], lng: p2[1]});
    
		// D = 0.33 : valeur score max .
		var D = 0.33;
    
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

		console.log($scope.score);
		console.log($scope.token);

		$scope.finJeu = true;
		$("#indication").css('color', 'rgba(0,128,0,0.9)');
		$("#indication").html("<b>Partie terminée ! Destination finale : "+ $scope.destination.nom +"</b>");

		// Envoi du score
		$http.put("api/parties/score", '{ "score" : ' + $scope.score + ' , "token" : "' + $scope.token + '" }').then(function(response) {
			if(response.status == 201)
			{
				$("#message").html("Score envoyé ! Vous remportez " + $scope.score + " points.");
				document.getElementById("message").style.backgroundColor = "rgba(0,0,128,0.9)";
				$("#message").fadeIn();
				setTimeout(function(){ $("#message").fadeOut(); }, 5000);
			}
			else {
				// Erreur

			}
		},
		function(error) {
			console.log(error);

			$("#message").html("Impossible d'inscrire votre score ! Vous remportez " + $scope.score + " points.");
			document.getElementById("message").style.backgroundColor = "rgba(213,85,0,0.9)";
			$("#message").fadeIn();
			setTimeout(function(){ $("#message").fadeOut(); }, 5000);
		});
		
		// Affichage des meilleurs scores
		$http.get("api/parties").then(function(response) {
			if(response.status == 200)
			{
				$("#tabscores").append("<h2>Tableau des meilleurs scores :</h2><table class='responsive-table'><tr><th>Position</th><th>Pseudo</th><th>Score</th></tr>");
				for(var i = 0; i < response.data.scores.length; i++)
				{
					$("#tabscores").append("<tr><td>" + (i + 1) + "</td><td>" + response.data.scores[i].pseudo + "</td><td>" + response.data.scores[i].score + "</td></tr>");
				}
				$("#tabscores").append("</table>");
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
