<?php
session_start();
// Autoloaders
require_once("../vendor/autoload.php");

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$configuration = [
	'settings' => [
		'displayErrorDetails' => true ]
];
$c = new\Slim\Container($configuration);
$app = new \Slim\App($c);

// -------------------

/*$app->get('/',
	function (Request $req, Response $resp, $args)
	{
		return (new quizzbox\control\quizzboxcontrol($this))->exemple($req, $resp, $args);
	}
)->setName('exemple');*/

/**
 * @apiGroup Points
 * @apiName recupPoints
 * @apiVersion 0.1.0
 *
 * @api {get} /points  accès à des ressources points
 *
 * @apiDescription Retourne un tableau contenant une représentation json de 5 points aléatoires.
 *
 * @apiSuccess (Succès : 200) {Number} id Identifiant du point
 * @apiSuccess (Succès : 200) {Number} latitude Latitude du point
 * @apiSuccess (Succès : 200) {Number} longitude Longitude du point
 * @apiSuccess (Succès : 200) {String} indication Indication du point
 *
 * @apiSuccessExample {json} exemple de réponse en cas de succès
 *     HTTP/1.1 200 OK
 *	{
 *	 	"points": {
 *			"id": 6,
 *			"latitude": 49.8944,
 *			"longitude": 2.30194,
 *			"indication": "La plus grande cathédrale de France"
 *		 }
 *	}
 *
 * @apiError (Erreur : 404) RessourceNotFound Commande inexistante
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "error" : "ressource not found : http://localhost/lbsprive/api/commandes/10"
 *     }
 *
*/

$app->get('/points',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->recupPoints($req, $resp, $args);
	}
)->setName('recupPoints');

$app->get('/destination',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->destinationFinale($req, $resp, $args);
	}
)->setName('destinationFinale');

$app->run();
