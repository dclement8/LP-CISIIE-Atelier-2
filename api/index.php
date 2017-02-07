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

$app->get('/points',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\carteauxtresorscontrol($this))->recupPoints($req, $resp, $args);
	}
)->setName('recupPoints');


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
