<?php
namespace carteauxtresors\view;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class carteauxtresorsview
{
	protected $data = null ;
	protected $baseURL = null;

    public function __construct($data)
	{
        $this->data = $data;
    }

	private function getStatus() {
		if(array_key_exists('status', $this->data)) {
			if(is_numeric($this->data['status'])) {
				$status = $this->data['status'];
				unset($this->data['status']);
				return $status;
			}
		}
		return 400;
	}



	private function header($req, $resp, $args)
	{
		$html = "
			<!DOCTYPE html>
			<html lang='fr'>
				<head>
					<meta charset='UTF-8'>
					<meta name='viewport' content='width=device-width, initial-scale=1'>
					<title>Carte aux trésors</title>
					<script src='".$this->baseURL."/js/jquery.min.js'></script>
					<script src='".$this->baseURL."/js/script.js'></script>
					<script src='".$this->baseURL."/js/coche.js'></script>
					<link rel='stylesheet' type='text/css' href='".$this->baseURL."/css/style.css'/>
				</head>
				<body>
					<header>
						<h1>
							Carte aux trésors
						</h1>
					</header>
		";
		if(isset($_SESSION["message"]))
		{
			$html .= "<div id='message'>".filter_var($_SESSION["message"], FILTER_SANITIZE_FULL_SPECIAL_CHARS)."</div>";
			unset($_SESSION["message"]);
		}
		$html .= "

					<div id='content'>
		";

		return $html;
	}

	private function footer($req, $resp, $args)
	{
		$html = "
					</div>
					<footer>
						Carte aux trésors - 174 086
					</footer>
				</body>
			</html>
		";

		return $html;
	}


	// -----------


	/* private function exemple($req, $resp, $args)
	{
		$html = "";
		return $html;
    }*/

	private function recupPoints($req, $resp, $args)
	{
		$json = '{ "points" : '.$this->data.' }';
		$resp = $resp->withStatus(200)->withHeader('Content-Type', 'application/json');
		$resp->getBody()->write($json);
		return $resp;
	}

	// -----------

	public function render($selector, $req, $resp, $args)
	{
		$this->baseURL = $req->getUri()->getBasePath();
		
		$html = $this->header($req, $resp, $args);

		// Sélectionne automatiquement le sélecteur.
		$html .= $this->$selector($req, $resp, $args);

		$html .= $this->footer($req, $resp, $args);

		$resp->getBody()->write($html);
		return $resp;
	}
}
