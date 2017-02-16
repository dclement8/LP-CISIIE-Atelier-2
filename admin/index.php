<?php
session_start();
// Autoloaders
require_once("../vendor/autoload.php");

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$configuration = [
	'settings' => [
		'displayErrorDetails' => true ] ,
	'notFoundHandler' => function($c) {
		return (function($req, $resp) {
			$args = null;
			$resp = $resp->withStatus(404);
			
			$_SESSION["message"] = "Erreur 404 : la page que vous avez demandé est introuvable !";
			
			return (new carteauxtresors\control\admincontrol(null))->accueil($req, $resp, $args);
		});
	}
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

$app->get('/',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('accueil')->add(new carteauxtresors\utils\authentification());


$app->post('/points/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->ajouterPoint($req, $resp, $args);
	}
)->setName('ajouterPoint')->add(new carteauxtresors\utils\authentification());

$app->get('/points/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('ajouterPointGET')->add(new carteauxtresors\utils\authentification());


$app->post('/points/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->supprimerPoint($req, $resp, $args);
	}
)->setName('supprimerPoint')->add(new carteauxtresors\utils\authentification());

$app->get('/points/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('supprimerPointGET')->add(new carteauxtresors\utils\authentification());


$app->post('/destinations/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->ajouterDestination($req, $resp, $args);
	}
)->setName('ajouterDestinations')->add(new carteauxtresors\utils\authentification());

$app->get('/destinations/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('ajouterDestinationsGET')->add(new carteauxtresors\utils\authentification());


$app->post('/destinations/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->supprimerDestination($req, $resp, $args);
	}
)->setName('supprimerDestinations')->add(new carteauxtresors\utils\authentification());

$app->get('/destinations/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('supprimerDestinationsGET')->add(new carteauxtresors\utils\authentification());


$app->post('/connexion',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->traitementConnexion($req, $resp, $args);
	}
)->setName('connexion');

$app->get('/connexion',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->connexion($req, $resp, $args);
	}
)->setName('connexionGET');


$app->run();