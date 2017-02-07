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

$app->run();
