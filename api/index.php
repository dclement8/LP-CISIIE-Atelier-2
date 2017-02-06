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

$app->get('/points',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresor\control\carteauxtresorscontrol($this))->recupPoints($req, $resp, $args);
	}
)->setName('recupPoints');

$app->get('/destination',
	function (Request $req, Response $resp, $args)
	{
		return (new carteauxtresor\control\carteauxtresorscontrol($this))->destinationFinale($req, $resp, $args);
	}
)->setName('destinationFinale');

$app->run();
