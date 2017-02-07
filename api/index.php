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

$app->post('/parties',
	function (Request $req, Response $resp, $args) 
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->newGame($req, $resp, $args);
	}
)->setName('newGame');

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

/**
 * @apiGroup Destination
 * @apiName destinationFinale
 * @apiVersion 0.1.0
 *
 * @api {get} /destination  accès à des ressources destination 
 *
 * @apiDescription Retourne un tableau contenant une représentation json d'une destination finale aléatoire.
 *
 * @apiSuccess (Succès : 200) {Number} id Identifiant de la destination
 * @apiSuccess (Succès : 200) {String} nom Nom de la destination 
 * @apiSuccess (Succès : 200) {Number} latitude Latitude de la destination
 * @apiSuccess (Succès : 200) {Number} longitude Longitude de la destination
 * @apiSuccess (Succès : 200) {String} indice1 Indice numéro un de la destination
 * @apiSuccess (Succès : 200) {String} indice2 Indice numéro deux de la destination
 * @apiSuccess (Succès : 200) {String} indice3 Indice numéro trois de la destination
 * @apiSuccess (Succès : 200) {String} indice4 Indice numéro quatre de la destination
 * @apiSuccess (Succès : 200) {String} indice5 Indice numéro cinq de la destination
 *
 * @apiSuccessExample {json} exemple de réponse en cas de succès
 *     HTTP/1.1 200 OK
 *	{
 *		"destination finale": {
 *			"id": 6,
 *			"nom": "Cherbourg",
 *			"latitude": 49.6337308,
 *			"longitude": -1.622137,
 *			"indice1": "Une des plus grosses bases de défense",
 *			"indice2": "Emmanuel Liais",
 *			"indice3": "La Montagne du Roule",
 *			"indice4": "Mes parapluies me sont célèbres",
 *			"indice5": "Cotentin"
 *		 }
 *  }
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

$app->get('/destination',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->destinationFinale($req, $resp, $args);
	}
)->setName('destinationFinale');

$app->run();
