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
		return (new \carteauxtresors\view\carteauxtresorsview(null))->render('destinationFinale', $req, $resp, $args);
    }

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
    public function scorePartie(Request $req, Response $resp, $args) 
    {
        $obj = json_decode($req->getBody());
        if(isset($obj->score) || isset($obj->token)) {
            if(filter_var($obj->score, FILTER_SANITIZE_NUMBER_INT) != false) 
            {
                $score = filter_var($obj->score, FILTER_SANITIZE_NUMBER_INT);
                $token = filter_var($obj->token, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
                $nbparties = \carteauxtresors\model\partie::where("token", $token)->count();
                if($nbparties == 0)
                {
                    $arr = array('error' => 'Le token n existe pas : '.$req->getUri());

                    $resp = $resp->withStatus(404);

                    return (new \carteauxtresors\view\carteauxtresorsview($arr))->render('scorePartie', $req, $resp, $args );
                }
                else
                {
                    $parties = \carteauxtresors\model\partie::where("token", $token)->get();
                    foreach($parties as $partie) {
                            $partie->score = $score;
                            $partie->save();

                            $arr = array('error' => 'Ajout du score de la partie : '.$req->getUri());

                            $resp = $resp->withStatus(201);

                            return (new \carteauxtresors\view\carteauxtresorsview($arr))->render('scorePartie', $req, $resp, $args );
                    }
                }
            } else {
                $arr = array('error' => 'Le score est incorrect : '.$req->getUri());

                $resp = $resp->withStatus(400);

                return (new \carteauxtresors\view\carteauxtresorsview($arr))->render('scorePartie', $req, $resp, $args );
            }
        } else {
            $arr = array('error' => 'Une valeur est manquante (token ou score) : '.$req->getUri());

            $resp = $resp->withStatus(400);

            return (new \carteauxtresors\view\carteauxtresorsview($arr))->render('scorePartie', $req, $resp, $args );
        }
    }
}
