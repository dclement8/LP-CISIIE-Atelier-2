# LP-CISIIE-Atelier-2

Lien vers le repository GitHub (pour le rendu sur Arche) : https://github.com/hitoshi54/LP-CISIIE-Atelier-2/

Lien vers le tableau de bord de suivi du projet (fichier Excel) : https://1drv.ms/x/s!AonSDypE5r-omLsHpdF3_UtqJQ8lUA

---------

## Quelques précisions sur la structure des fichiers :
*admin/* ==> Backend de gestion (pour vous authentifier sur le backend, le mot de passe est **174086** )

*api/* ==> API REST ; Vous trouverez la documentation de cette API générée par APIDoc dans le dossier api/doc

*index.html* ==> Jeu en JavaScript

*css/style.css* ==> CSS généré depuis le SASS de Materialize (http://materializecss.com/bin/materialize-src-v0.98.0.zip)

*css/main.css* ==> CSS personnalisé



## Création de la base et jeu d'essai :
modeleDonnees.jpg ==> Modèle Conceptuel de Données

*base.sql* ==> Création de la structure de la base

*jeuEssai.sql* ==> Jeu d'essai



## Configuration des accès à la base :
Créez un fichier *config.ini* dans le dossier *conf/* pour se connecter à la base de données (un modèle de fichier est même présent dans *conf/config.ini.modele* ).


==> Syntaxe du fichier :
`driver = mysql`

`host = localhost`

`username = votre_pseudo_mysql`

`password = votre_mot_de_passe_mysql`

`database = nom_de_votre_base`

`charset = utf8`

`collation = utf8_unicode_ci`



## Vagrant
Vous trouverez un VagrantFile dans le dossier *vagrant/* . La configuration d'apache2 et ses vhosts est situé dans le dossier *vagrant/conf-apache2* . Le répertoire *vagrant/www* sert pour synchroniser avec le dossier */var/www* de la machine virtuelle. Il faudra donc y déposer à l'intérieur dans ce répertoire vagrant/www tous les fichiers du repository Git.

**Vérifiez qu'apache2, php5 et MySQL Server sont installés et fonctionnels sur votre VM.**



Atelier 2 - LP CISIIE - Thibaut DALICHAMPT ; Charles PIGUET ; Hugo HAPPE ; Dylan CLEMENT