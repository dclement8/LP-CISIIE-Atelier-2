-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 08 Février 2017 à 08:59
-- Version du serveur :  5.7.11
-- Version de PHP :  7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `carte`
--

--
-- Contenu de la table `destination`
--

INSERT INTO `destination` (`id`, `nom`, `latitude`, `longitude`, `indice1`, `indice2`, `indice3`, `indice4`, `indice5`) VALUES
(1, 'Roubaix', 50.6927049, 3.177847, 'le &laquo; Manchester fran&ccedil;ais &raquo;', 'OVH', 'La Redoute', 'Pr&egrave;s des belges', 'M&eacute;tropole Lilloise'),
(2, 'Mont Saint-Michel', 48.636063, -1.511457, 'Sur une pi&egrave;ce de 20 francs', 'Situ&eacute; sur une grande plaine sablonneuse', 'Omelette', 'Prison', 'A mar&eacute;e basse ou mar&eacute;e haute'),
(3, 'Nantes', 47.218371, -1.553621, 'M&eacute;morial de l&#039;abolition de l&#039;esclavage d&rsquo;Europe', 'Dans le duch&eacute; de Bretagne', 'A &eacute;t&eacute; sign&eacute; l&agrave; bas en 1598', 'Atlantique', 'Loire'),
(4, 'Besan&ccedil;on', 47.237829, 6.024053899999999, 'Vesontio par Jules C&eacute;sar', '&laquo; Plaise &agrave; Dieu &raquo;', 'L&#039;horlogerie et le textile en sont mes coeurs de m&eacute;tier', 'Ma ville est fortifi&eacute;e par Vauban', 'Proche du Jura'),
(5, 'Troyes', 48.2973451, 4.0744009, 'Le textile est ma passion', 'Ma ville ancienne comporte des colombages', 'J&#039;aime les bulles', 'Val&eacute;e de la Seine', 'A pr&egrave;s de 70 km d&#039;Auxerre'),
(6, 'Cherbourg', 49.6337308, -1.622137, 'Une des plus grosses bases de d&eacute;fense', 'Emmanuel Liais', 'La Montagne du Roule', 'Mes parapluies me sont c&eacute;l&egrave;bres', 'Cotentin'),
(7, 'Agen', 44.203142, 0.616363, 'Un Inconnu y est n&eacute; l&agrave;-bas', 'Le Sud-Ouest', 'Occitanie', 'Le rugby fait partie de mes sports favoris', 'Mes pruneaux sont les plus connus');

--
-- Contenu de la table `point`
--

INSERT INTO `point` (`id`, `latitude`, `longitude`, `indication`) VALUES
(1, 48.8608, 2.33762, 'Da Vinci Code'),
(2, 49.4398, 1.09585, 'Jeanne au secours !'),
(3, 48.7638, 5.59235, 'Les madeleines en sont la sp&eacute;cialit&eacute; gastronomique de cette ville.'),
(4, 43.5528, 7.01737, 'Le festival du cin&eacute;ma s&#039;y d&eacute;roule chaque ann&eacute;e !'),
(5, 47.2214, 2.06979, 'Jacques Brel l&#039;a voulu voir...'),
(6, 49.8944, 2.30194, 'La plus grande cath&eacute;drale de France'),
(7, 44.1741, 5.27868, 'Le point le plus froid de France'),
(8, 46.1319, 3.42549, 'Pastilles, eaux thermales et r&eacute;gime'),
(9, 48.04, -4.7404, 'Au bout de la France au devant l&#039;Atlantique'),
(10, 43.7745, 7.49754, 'En pointe de la France proche du grand Prix de Monte-Carlo'),
(11, 48.8049, 2.12036, 'S&eacute;jour de Louis XIV'),
(12, 45.8336, 1.2611, 'Si vous cliquez sur ce point, vous ferez attention &agrave; la porcelaine.'),
(13, 48.6921, 6.18442, 'Capitale du duc Stanislas'),
(14, 45.6755, 6.39273, 'JO de 1992'),
(15, 41.9192, 8.73864, 'La premi&egrave;re ville de France lib&eacute;r&eacute;e &agrave; la seconde guerre mondiale'),
(16, 43.6047, 1.44421, 'Ville la plus chaude de France'),
(17, 45.5284, 2.81393, 'Point culminant du Massif-Central'),
(18, 47.3364, -3.18104, 'Lieu maritime chant&eacute; par Laurent Voulzy'),
(19, 49.7621, 4.7261, 'Les Carolomac&eacute;riens'),
(20, 47.322, 5.04148, 'Sa sp&eacute;cialit&eacute; est de Maille...'),
(21, 45.9995, -1.21392, 'Fort imp&eacute;rial aujourd&#039;hui occup&eacute; &agrave; la t&eacute;l&eacute;vision.'),
(22, 43.9493, 4.80553, 'Capitale des Papes'),
(23, 46.5681, 3.33442, 'La pompe aux grattons en est la sp&eacute;cialit&eacute;'),
(24, 45.4397, 4.38718, 'Allez les verts !'),
(25, 44.8058, -0.630386, 'Faisait la frappe des monnaies en France');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
