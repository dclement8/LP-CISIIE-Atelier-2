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

    public function newGame(Request $req, Response $resp, $args) 
    {

        if(isset($_POST["pseudo"])) {

            $pseudo = $_POST["pseudo"];

            $factory = new \RandomLib\Factory;

            $generator = $factory->getGenerator(new \SecurityLib\Strength(\SecurityLib\Strength::MEDIUM));

            $token = $generator->generateString(32, 'abcdefghijklmnopqrstuvwxyz0123456789');


            $partie = new \carteauxtresors\model\partie();

            $partie->pseudo = $pseudo;

            $partie->token = $token;

            $partie->save();

            $arr = array('error' => 'Creation de la partie : '.$req->getUri());

            $resp = $resp->withStatus(200);

            return (new \carteauxtresors\view\carteauxtresorsview($arr))->render('newGame', $req, $resp, $args );

        } else {

            $arr = array('error' => 'Erreur de pseudo : '.$req->getUri());

            $resp = $resp->withStatus(400);

            return (new \carteauxtresors\view\carteauxtresorsview($arr))->render('newGame', $req, $resp, $args );
        }
    }
}
