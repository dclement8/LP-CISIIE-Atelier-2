app.controller("carteController", ["$scope", "$http", "leafletMapEvents",
function($scope, $http, leafletMapEvents) {

	/* Variables */
	$scope.point = 0; // Nombre de points trouvés
	$scope.points = []; // Tableau contenant tous les points (indices)
	$scope.destination; // Données de la destination finale
	$scope.token = false; // Token de la partie en cours
	$scope.score = 0; // Score total
	$scope.fini = false; // Fin de recherche des indices
	$scope.finJeu = false; // Fin de jeu
	$scope.markers = new Array(); // Tableau des marqueurs
	$scope.paths = {
		points: {
			type: "polyline",
			color: 'green',
			weight: 2,
			latlngs: []
		}
	};
	
	$scope.D = 4; // Valeur de D en km (distance) pour le trouver la destination finale (par défaut : difficulté facile)
	$scope.distancePoints = 40; // Valeur distance maximale en km tolérable entre deux points (par défaut : difficulté facile)

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
        }
    });

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

	var errorHandler = function(e) {
		console.log(e);
	}

	var htmlEntities = function(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};

	// Evenement lors du clic sur la carte
	$scope.$on("leafletDirectiveMap.click", function(event, args) {
		var leafEvent = args.leafletEvent;

		if($scope.finJeu === false) {
			if($scope.fini === false) {
				$scope.verifierPoint(
					[leafEvent.latlng.lat, leafEvent.latlng.lng],
					[$scope.points[$scope.point].latitude, $scope.points[$scope.point].longitude]
				);
			}
			else {
				// Chasse à la destination finale
				$scope.verifierDestination(
					[leafEvent.latlng.lat, leafEvent.latlng.lng],
					[$scope.destination.latitude, $scope.destination.longitude]
				);
			}
		}
	});

	// Retourne la distance entre 2 points en Km
	var getDistance = function(p1, p2) {
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		}

		var R = 6371;
		var Phi1 = p1[0].toRad();
		var Phi2 = p2[0].toRad();
		var DeltaPhi = (p2[0] - p1[0]).toRad();
		var DeltaLambda = (p2[1] - p1[1]).toRad();

		var a = Math.sin(DeltaPhi / 2) * Math.sin(DeltaPhi / 2)
				+ Math.cos(Phi1) * Math.cos(Phi2) * Math.sin(DeltaLambda / 2)
				* Math.sin(DeltaLambda / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;

		return d;
	};

	// Affiche un message avec une couleur de fond et un temps pré-défini
	var showMsg = function(msg, bgcolor, time) {
		bgcolor = typeof bgcolor !== 'undefined' ? bgcolor : "rgba(0,128,0,0.9)";
		time = typeof time !== 'undefined' ? time : 5000;

		$("#message").html(msg);
		$("#message").css("background-color", bgcolor);
		$("#message").fadeIn();
		setTimeout(function(){ $("#message").fadeOut(); }, time);
	}

	$scope.creerPartie = function() {
		if($scope.pseudo == undefined) {
			$scope.pseudo = "Anonyme";
		}
		
		// Difficulté
		if(document.getElementById("difficulte").checked)
		{
			// Niveau difficile
			$scope.D = 2;
			$scope.distancePoints = 20;
		}
		else
		{
			// Niveau facile
			$scope.D = 4;
			$scope.distancePoints = 40;
		}

		$http.post("api/parties", '{"pseudo": "'+ htmlEntities($scope.pseudo) +'"}').then(function(response) {
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
		}, errorHandler);
	};

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
	};

	$scope.getPoints = function() {
		$http.get("api/points").then(function(response) {
			if(response.data.points !== undefined) {
				$scope.points = response.data.points;
				$("#indication").html("Trouvez le point sur la carte selon l'indice suivant : <i>" + $scope.points[0].indication + "</i>");
			}
			else {
				// Erreur
				alert('Impossible de récupérer les points !');
			}
		}, errorHandler);
	};

	$scope.getDestination = function() {
		$http.get("api/destinations").then(function(response) {
			if(response.data.destination !== undefined) {
				$scope.destination = response.data.destination;
			}
			else {
				// Erreur
				alert('Impossible de récupérer la destination !');
			}
		}, errorHandler);
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
		}, errorHandler);
	};

	$scope.verifierPoint = function(p1, p2) {
		// On vérifie p1 par rapport à p2
		var distance = getDistance(p1, p2);

		if(distance <= $scope.distancePoints)
		{
			// Créer marqueur au point trouvé
			$scope.ajouterMarker(p2[0], p2[1]);

			$scope.relierPoint($scope.markers[$scope.point]);

			// Afficher un indice pour la destination finale
			$scope.point++;
			$("#indices").append("<li>" + $scope.destination['indice' + $scope.point] + "</li>");
			showMsg("Bien !", "rgba(0,128,0,0.9)", 700);

			if($scope.point == 5) {
				$scope.fini = true;
				$("#indication").html("<b>Trouvez maintenant la rose des vents via les indices fournis... Vous n'avez droit qu'à une SEULE tentative !</b>");

				showMsg("Bravo vous avez trouvé les 5 indices pour trouver la rose des vents !<br/><br/>D'après vos indices collectés, où se trouve t-elle ?",
					"rgba(0,128,0,0.9)", 5000);
			}
			else {
				$("#indication").html("Trouvez le point sur la carte selon l'indice suivant : <i>" + $scope.points[$scope.point].indication + "</i>");
			}
		}
		else {
			// Erreur
			showMsg("Ce n'est pas par là !", "rgba(223,0,0,0.9)", 700);
		}
	};

	$scope.verifierDestination = function(p1, p2) {
		// On vérifie p1 par rapport à p2
		var distance = getDistance(p1, p2);

		// Créer marqueur au point trouvé
		$scope.ajouterMarker(p2[0], p2[1], true);

		$scope.relierPoint({lat: p2[0], lng: p2[1]});


		if(distance < $scope.D) {
			$scope.score = 10;
		}
		else if(distance < (2*$scope.D)) {
			$scope.score = 8;
		}
		else if(distance < (3*$scope.D)) {
			$scope.score = 6;
		}
		else if(distance < (5*$scope.D)) {
			$scope.score = 3;
		}
		else if(distance < (10*$scope.D)) {
			$scope.score = 1;
		}
		else {
			$scope.score = 0;
		}
		
		// Difficulté = difficile
		if(document.getElementById("difficulte").checked)
		{
			// Niveau difficile = bonus de points accordé si >= 6 pts
			if($scope.score == 10)
			{
				$scope.score = $scope.score + 5;
			}
			else
			{
				if($scope.score == 8)
				{
					$scope.score = $scope.score + 3;
				}
				else
				{
					if($scope.score == 6)
					{
						$scope.score = $scope.score + 1;
					}
				}
			}
		}

		$scope.finJeu = true;
		$("#indication").css('color', 'rgba(0,128,0,0.9)');
		$("#indication").html("<b>Partie terminée ! Destination finale : "+ $scope.destination.nom +"</b>");

		$scope.sendScore();
	};

	$scope.getBestScores = function() {
		// Affichage des meilleurs scores
		$http.get("api/parties").then(function(response) {
			if(response.status == 200)
			{
				var tab = "<h2>Tableau des meilleurs scores :</h2><table class='responsive-table'><tr><th>Position</th><th>Pseudo</th><th>Score</th></tr>";
				for(var i = 0; i < response.data.scores.length; i++) {
					tab += "<tr><td>" + (i + 1) + "</td><td>" + response.data.scores[i].pseudo + "</td><td>" + response.data.scores[i].score + "</td></tr>";
				}
				tab += "</table>";
				
				$("#tabscores").html(tab);
			}
			else
			{
				console.log("Erreur : mauvais status http");
			}
		}, errorHandler);
	};

	$scope.sendScore = function() {
		// Envoi du score
		$scope.score = typeof $scope.score !== 'undefined' ? $scope.score : 0;
		$http.put("api/parties/score", '{"score": ' + $scope.score + ', "token": "' + $scope.token + '"}').then(function(response) {
			if(response.status == 201) {
				showMsg("Score envoyé ! Vous remportez " + $scope.score + " points.", "rgba(0,0,128,0.9)", 5000);
				// On affiche les meilleurs scores
				$scope.getBestScores();
			}
			else {
				console.log("Erreur : mauvais status http");
			}
		},
		function(error) {
			console.log(error);
			showMsg("Impossible d'inscrire votre score ! Vous remportez " + $scope.score + " points.", "rgba(213,85,0,0.9)", 5000);
		});
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
		$scope.getPoints();
		$scope.getDestination();
	}
}]);
