<?php
namespace carteauxtresors\control;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \carteauxtresors\AppInit;

// Connexion à la BDD
$connexion = new AppInit();
$connexion->bootEloquent("../conf/config.ini");

class carteauxtresorscontrol
{
    protected $c=null;

    public function __construct($c)
	{
        $this->c = $c;
    }


    /*public function exemple(Request $req, Response $resp, $args)
	{
		return (new \quizzbox\view\quizzboxview(null))->render('exemple', $req, $resp, $args);
    }*/

    public function recupPoints(Request $req, Response $resp, $args)
	{
        $json = \carteauxtresors\model\point::orderByRaw('RAND()')->take(5)->get()->toJson();
		return (new \carteauxtresors\view\carteauxtresorsview($json))->render('recupPoints', $req, $resp, $args);
    }

    public function destinationFinale(Request $req, Response $resp, $args)
	{
        $json = \carteauxtresors\model\destination::orderByRaw('RAND()')->take(1)->get()->toJson();
		return (new \carteauxtresors\view\carteauxtresorsview($json))->render('destinationFinale', $req, $resp, $args);
    }

	
}
