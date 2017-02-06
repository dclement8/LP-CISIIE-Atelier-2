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

$app->get('/',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('accueil');


$app->post('/points/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->ajouterPoint($req, $resp, $args);
	}
)->setName('ajouterPoint');

$app->get('/points/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('ajouterPointGET');


$app->post('/points/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->supprimerPoint($req, $resp, $args);
	}
)->setName('supprimerPoint');

$app->get('/points/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('supprimerPointGET');


$app->post('/destinations/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->ajouterDestination($req, $resp, $args);
	}
)->setName('ajouterDestinations');

$app->get('/destinations/ajouter',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('ajouterDestinationsGET');


$app->post('/destinations/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->supprimerDestination($req, $resp, $args);
	}
)->setName('supprimerDestinations');

$app->get('/destinations/supprimer',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
)->setName('supprimerDestinationsGET');


$app->run();