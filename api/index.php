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

/**
* @apiGroup Parties
* @apiName newGame
* @apiVersion 0.1.0
* 
* @api {post} /parties Création de la partie
* @apiDescription Création de la partie (exemple de JSON-type à renvoyer : { "pseudo" : "Bob" })
*
* @apiParam {String} pseudo Pseudo entré par l'utilisateur
*
* @apiSuccess (Succès : 201) {json} info Creation de la partie
* @apiSuccess (Succès : 201) {json} token Token de la partie
*
* @apiSuccessExample {json} Exemple de réponse en cas de succès
*     HTTP/1.1 201 Created
*
*     {
*       "info" : "Creation de la partie : http://localhost/github/LP-CISIIE-Atelier-2/api/parties",
*		"token" : "eouglrziogoeujhreosjhojtr"
*     }
*
* @apiError (Erreur : 400) error Erreur de pseudo
*
* @apiErrorExample {json} Pseudo introuvable
*     HTTP/1.1 400 Bad Request
*
*     {
*       "error" : "Erreur de pseudo : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
*/

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
 * @api {get} /points  Accès à 5 ressources points
 *
 * @apiDescription Retourne un tableau contenant une représentation json de 5 points choisis aléatoirement.
 *
 * @apiSuccess (Succès : 200) {Number} id Identifiant du point
 * @apiSuccess (Succès : 200) {Number} latitude Latitude du point
 * @apiSuccess (Succès : 200) {Number} longitude Longitude du point
 * @apiSuccess (Succès : 200) {String} indication Indication du point
 *
 * @apiSuccessExample {json} Exemple de réponse en cas de succès
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
 *
*/
$app->get('/points',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->recupPoints($req, $resp, $args);
	}
)->setName('recupPoints');

/**
 * @apiGroup Destinations
 * @apiName destinationFinale
 * @apiVersion 0.1.0
 *
 * @api {get} /destinations  Accès à une ressource destination 
 *
 * @apiDescription Retourne un tableau contenant une représentation json d'une destination finale chosie aléatoirement.
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
 * @apiSuccessExample {json} Exemple de réponse en cas de succès
 *     HTTP/1.1 200 OK
 *	{
 *		"destination": {
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
 *
*/
$app->get('/destinations',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->destinationFinale($req, $resp, $args);
	}
)->setName('destinationFinale');

/**
* @apiGroup Parties
* @apiName scorePartie
* @apiVersion 0.1.0
* 
* @api {put} /parties/score Enregistrement du score
* @apiDescription Enregistrement du score d'un partie (exemple de JSON-type à renvoyer : { "score" : 10 , "token" : "iuegh96r5hg26reh52e6" })
*
* @apiParam {String} score Score obtenu par l'utilisateur
* @apiParam {String} token Token de la partie en cours
*
* @apiError (Erreur : 404) error Le token n'existe pas
*
* @apiErrorExample {json} Token non trouvé
*     HTTP/1.1 404 Not Found
*
*     {
*       "error" : "Le token n'existe pas : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
* @apiSuccess (Succès : 201) info Ajout du score de la partie
*
* @apiSuccessExample {json} Exemple de réponse en cas de succès
*     HTTP/1.1 201 Created
*
*     {
*       "info" : "Ajout du score de la partie : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
* @apiError (Erreur : 400) error Le score est incorrect
*
* @apiErrorExample {json} Erreur de score
*     HTTP/1.1 400 Bad Request
*
*     {
*       "error" : "Le score est incorrect : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
* @apiError (Erreur : 400) Error Une valeur est manquante (token ou score)
*
* @apiErrorExample {json} Valeur manquante
*     HTTP/1.1 400 Bad Request
*
*     {
*       "error" : "Une valeur est manquante (token ou score) : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
*/
$app->put('/parties/score',

function (Request $req, Response $resp, $args) 
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->scorePartie($req, $resp, $args);
	}
)->setName('scorePartie');


/**
 * @apiGroup Parties
 * @apiName meilleurScores
 * @apiVersion 0.1.0
 *
 * @api {get} /parties  Accès au tableau des 10 meilleurs scores
 *
 * @apiDescription Retourne un tableau contenant une représentation json des 10 meilleurs scores.
 *
 * @apiSuccess (Succès : 200) {Number} id Identifiant de la destination
 * @apiSuccess (Succès : 200) {String} pseudo Pseudo du joueur
 * @apiSuccess (Succès : 200) {Number} score Score obtenu
 *
 * @apiSuccessExample {json} Exemple de réponse en cas de succès
 *     HTTP/1.1 200 OK
 *	{
 *
 *		"scores": [
 *			{
 *				"id": 25,
 *				"pseudo": "david",
 *				"score": 10
 *			},
 *			{
 * 				"id": 29,
 *				"pseudo": "paul",
 *				"score": 10
 *			},
 *			{
 *				"id": 27,
 *				"pseudo": "Bob",
 *				"score": 10
 *			},
 *			{
 *				"id": 28,
 *				"pseudo": "rémi",
 *				"score": 10
 *			},
 *			{
 *				"id": 23,
 *				"pseudo": "hugues",
 *				"score": 8
 * 			},
 *			{
 *				"id": 22,
 *				"pseudo": "paul",
 *				"score": 6
 *			},
 *			{
 *				"id": 20,
 *				"pseudo": "françois",
 *				"score": 1
 *			},
 *			{
 *				"id": 30,
 *				"pseudo": "michel",
 *				"score": 1
 *			},
 *			{
 *				"id": 24,
 *				"pseudo": "maurice",
 *				"score": 1
 *			},
 *			{
 *				"id": 19,
 *				"pseudo": "bob",
 *				"score": 0
 *			}
 *		]
 *
 *	}
 *
 *
*/
$app->get('/parties',

function (Request $req, Response $resp, $args) 
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->meilleurScores($req, $resp, $args);
	}
)->setName('meilleurScores');


$app->run();
