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
* @apiGroup parties
* @apiName
* @apiVersion 0.1.0
* 
* @api {post} /parties création de la partie
* @apiDescription Création de la partie
*
* @apiParam {String} pseudo Pseudo entré par l'utilisateur
* @apiParam {String} token Token générer pour la partie
*
*
* @apiSuccess (Succès : 200) {json} réponse.
*
* @apiSuccessExample {json} exemple de réponse en cas de succès
*     HTTP/1.1 201 Created
*
*     {
*       "error" : "Creation de la partie : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
* @apiError (Erreur : 400) error Le token n\'existe pas : 
*
* @apiErrorExample {json} Token non trouvé
*     HTTP/1.1 404 Not Found
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
 * @api {get} /points  accès à 5 ressources points
 *
 * @apiDescription Retourne un tableau contenant une représentation json de 5 points choisis aléatoirement.
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
 * @api {get} /destinations  accès à une ressources destination 
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
 *
*/
$app->get('/destinations',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->destinationFinale($req, $resp, $args);
	}
)->setName('destinationFinale');
/**
* @apiGroup parties
* @apiName
* @apiVersion 0.1.0
* 
* @api {post} /parties/score enregistrement du score* @apiDescription Création de la partie
*
* @apiParam {String} score Score obtenu par l'utilisateur
* @apiParam {String} token Token de la partie en cours
*
* @apiError (Erreur : 404) error Le token n\'existe pas : 
*
* @apiErrorExample {json} Token non trouvé
*     HTTP/1.1 404 Not Found
*
*     {
*       "error" : "Le token n\'existe pas : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
* @apiSuccess (Succès : 201) {json} réponse.
*
* @apiSuccessExample {json} exemple de réponse en cas de succès
*     HTTP/1.1 201 Created
*
*     {
*       "error" : "Ajout du score de la partie : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
* @apiError (Erreur : 400) error Le token n'existe pas : 
*
* @apiErrorExample {json} erreur de score
*     HTTP/1.1 404 Bad Request
*
*     {
*       "error" : "Le score est incorrect : http://localhost/github/LP-CISIIE-Atelier-2/api/parties"
*     }
*
* @apiError (Erreur : 400) error Le token n'existe pas : 
*
* @apiErrorExample {json} erreur de score
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


$app->run();
