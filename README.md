# LP-CISIIE-Atelier-2

Lien vers le repository GitHub (pour le rendu sur Arche) : https://github.com/hitoshi54/LP-CISIIE-Atelier-2/

Lien vers le tableau de bord de suivi du projet (fichier Excel) : https://1drv.ms/x/s!AonSDypE5r-omLsHpdF3_UtqJQ8lUA

---------

## Quelques précisions sur la structure des fichiers :
*admin/* ==> Backend de gestion (pour vous authentifier sur le backend, le mot de passe est **174086** )

*api/* ==> API REST ; Vous trouverez la documentation de cette API générée par APIDoc dans le dossier *api/doc*

*index.html* ==> Jeu en JavaScript/AngularJS

*css/style.css* ==> Feuille de style CSS générée depuis le SASS de Materialize (http://materializecss.com/bin/materialize-src-v0.98.0.zip)

*css/main.css* ==> Feuille de style CSS personnalisé



## Création de la base et jeu d'essai :
*modeleDonnees.jpg* ==> Modèle Conceptuel de Données

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
Vous trouverez un VagrantFile dans le dossier *vagrant/* . La configuration d'apache2 et ses vhosts est situé dans le dossier *vagrant/apache2* . Le répertoire *vagrant/www* sert pour synchroniser avec le dossier */var/www* de la machine virtuelle. Il faudra donc y déposer à l'intérieur dans ce répertoire *vagrant/www* tous les fichiers du repository Git.

*init_apache.sh* est un script qui s'assure de configurer les principaux services au démarrage et configure les vhosts.

**Vhosts :**

  * *findyourway.local* ==> Accès au site (répertoire */var/www/* )
  * *play.findyourway.local* ==> Jouer au jeu (répertoire */var/www/* )
  * *backend.findyourway.local* ==> Accès au backend (répertoire */var/www/admin* )
  * *api.findyourway.local* ==> Accès à l'api (répertoire */var/www/api* )

**Vérifiez qu'apache2, php5 et MySQL Server sont installés et fonctionnels sur votre VM.**

**MySQL n'est pas installé par défaut, il faudra donc l'installer :** *apt-get install mysql-server-5.5*

**N'oubliez pas d'ajouter findyourway.local dans votre fichier Host !**

**Il faudra aussi installer la base de données MySQL et ne pas oublier de configurer les accès à la base en modifiant le fichier** *conf/config.ini*



Atelier 2 - LP CISIIE - Thibaut DALICHAMPT ; Charles PIGUET ; Hugo HAPPE ; Dylan CLEMENT