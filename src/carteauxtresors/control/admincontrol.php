<?php
namespace carteauxtresors\control;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \carteauxtresors\AppInit;

// Connexion à la BDD
$connexion = new AppInit();
$connexion->bootEloquent("../conf/config.ini");

class admincontrol
{
    protected $c=null;

    public function __construct($c)
	{
        $this->c = $c;
    }



	public function connexion(Request $req, Response $resp, $args)
	{
		if(isset($_SESSION["login"]))
		{
			return (new \carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
		}
		else
		{
			return (new \carteauxtresors\view\adminview(null))->render('connexion', $req, $resp, $args);
		}
	}
	
	public function traitementConnexion(Request $req, Response $resp, $args)
	{
		if(isset($_SESSION["login"]))
		{
			return (new \carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
		}
		else
		{
			if(filter_var($_POST["mdp"], FILTER_SANITIZE_FULL_SPECIAL_CHARS) == "174086")
			{
				$_SESSION["login"] = true;
				$_SESSION["message"] = "Bienvenue !";
				return (new \carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
			}
			else
			{
				$_SESSION["message"] = "Mot de passe incorrect !";
				return (new \carteauxtresors\view\adminview(null))->render('connexion', $req, $resp, $args);
			}
		}
	}
	
	public function accueil(Request $req, Response $resp, $args)
	{
		// Infos points
		$points = \carteauxtresors\model\point::orderBy('id')->get();
		
		// Infos destinations
		$destinations = \carteauxtresors\model\destination::orderBy('id')->get();
		
		$data = array($points, $destinations);
		
		return (new \carteauxtresors\view\adminview($data))->render('accueil', $req, $resp, $args);
    }
	
	public function ajouterPoint(Request $req, Response $resp, $args)
	{
		// Traitement Formulaire
		$_POST["addLatitudeP"] = filter_var($_POST["addLatitudeP"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		$_POST["addLongitudeP"] = filter_var($_POST["addLongitudeP"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		
		if(is_numeric(str_replace(",", ".", $_POST["addLatitudeP"])))
		{
			if(is_numeric(str_replace(",", ".", $_POST["addLongitudeP"])))
			{
				
				
				$point = new \carteauxtresors\model\point();

				$point->latitude = str_replace(",", ".", $_POST["addLatitudeP"]);
				$point->longitude = str_replace(",", ".", $_POST["addLongitudeP"]);
				$point->indication = filter_var($_POST["addIndication"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				
				$point->save();
				
				$_SESSION["message"] = "Point ajouté !";
			}
			else
			{
				$_SESSION["message"] = "Le format de la longitude est incorrect.";
			}
		}
		else
		{
			$_SESSION["message"] = "Le format de la latitude est incorrect.";
		}
		
		return (new \carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
	
	public function ajouterDestination(Request $req, Response $resp, $args)
	{
		// Traitement Formulaire
		$_POST["addLatitudeD"] = filter_var($_POST["addLatitudeD"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		$_POST["addLongitudeD"] = filter_var($_POST["addLongitudeD"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		
		
		if(is_numeric(str_replace(",", ".", $_POST["addLatitudeD"])))
		{
			if(is_numeric(str_replace(",", ".", $_POST["addLongitudeD"])))
			{
				$destination = new \carteauxtresors\model\destination();
				
				$destination->nom = filter_var($_POST["addNom"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				$destination->latitude = str_replace(",", ".", $_POST["addLatitudeD"]);
				$destination->longitude = str_replace(",", ".", $_POST["addLongitudeD"]);
				$destination->indice1 = filter_var($_POST["addIndice1"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				$destination->indice2 = filter_var($_POST["addIndice2"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				$destination->indice3 = filter_var($_POST["addIndice3"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				$destination->indice4 = filter_var($_POST["addIndice4"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				$destination->indice5 = filter_var($_POST["addIndice5"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				
				$destination->save();
				
				$_SESSION["message"] = "Destination ajoutée !";
			}
			else
			{
				$_SESSION["message"] = "Le format de la longitude est incorrect.";
			}
		}
		else
		{
			$_SESSION["message"] = "Le format de la latitude est incorrect.";
		}
		
		return (new \carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
	
	public function supprimerPoint(Request $req, Response $resp, $args)
	{
		if(isset($_POST["coche"]))
		{
			for($i = 0; $i < count($_POST["coche"]); $i++)
			{
				\carteauxtresors\model\point::destroy($_POST["coche"][$i]);
			}
			
			$_SESSION["message"] = "Les points sélectionnés ont été supprimés !";
		}
		else
		{
			$_SESSION["message"] = "Aucun élément sélectionné !";
		}
		return (new \carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
	
	public function supprimerDestination(Request $req, Response $resp, $args)
	{
		if(isset($_POST["coche"]))
		{
			for($i = 0; $i < count($_POST["coche2"]); $i++)
			{
				\carteauxtresors\model\destination::destroy($_POST["coche2"][$i]);
			}
			
			$_SESSION["message"] = "Les destinations sélectionnées ont été supprimées !";
		}
		else
		{
			$_SESSION["message"] = "Aucun élément sélectionné !";
		}
		return (new \carteauxtresors\control\admincontrol($this))->accueil($req, $resp, $args);
	}
}
