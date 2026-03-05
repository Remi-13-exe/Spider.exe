-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 04 mars 2026 à 07:30
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `spiderexe`
--

-- --------------------------------------------------------

--
-- Structure de la table `appearances`
--

DROP TABLE IF EXISTS `appearances`;
CREATE TABLE IF NOT EXISTS `appearances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `character_id` int NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('comic','film','serie','jeu') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `character_id` (`character_id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `appearances`
--

INSERT INTO `appearances` (`id`, `character_id`, `title`, `type`, `year`, `description`) VALUES
(1, 1, 'The Amazing Fantasy #15', 'comic', 1962, 'Première apparition de Spider-Man'),
(2, 1, 'The Amazing Spider-Man #11', 'comic', 1964, NULL),
(3, 1, 'Spider-Verse', 'comic', 2014, NULL),
(4, 2, 'Ultimate Fallout #4', 'comic', 2011, 'Première apparition de Miles Morales'),
(5, 2, 'Ultimate Comics: Spider-Man', 'comic', 2011, 'Débuts officiels en tant que Spider-Man'),
(6, 2, 'Spider-Men', 'comic', 2012, 'Rencontre avec Peter Parker Earth-616'),
(7, 2, 'Spider-Verse', 'comic', 2014, 'Événement multivers majeur'),
(8, 2, 'Secret Wars', 'comic', 2015, 'Intégration dans l?univers Marvel principal'),
(9, 3, 'Web of Spider-Man #117', 'comic', 1994, 'Première apparition de Ben Reilly'),
(10, 3, 'The Clone Saga', 'comic', 1994, 'Saga majeure autour des clones de Spider-Man'),
(11, 3, 'The Sensational Spider-Man #0', 'comic', 1996, 'Ben Reilly devient Spider-Man'),
(12, 3, 'Amazing Spider-Man #418', 'comic', 1996, 'Mort de Ben Reilly'),
(13, 4, 'Amazing Spider-Man #365', 'comic', 1992, 'Première apparition de Spider-Man 2099'),
(14, 4, 'Spider-Man 2099 #1', 'comic', 1992, 'Origine de Miguel O?Hara'),
(15, 4, 'Spider-Verse', 'comic', 2014, 'Participation à l?événement Spider-Verse'),
(16, 5, 'Spider-Man', 'film', 2002, 'Premier film réalisé par Sam Raimi'),
(17, 5, 'Spider-Man 2', 'film', 2004, 'Affrontement contre le Docteur Octopus'),
(18, 5, 'Spider-Man 3', 'film', 2007, 'Arc Venom et Homme-Sable'),
(19, 5, 'Spider-Man: No Way Home', 'film', 2021, 'Retour dans le multivers'),
(20, 6, 'The Amazing Spider-Man', 'film', 2012, 'Origine de la version Andrew Garfield'),
(21, 6, 'The Amazing Spider-Man 2', 'film', 2014, 'Mort tragique de Gwen Stacy'),
(22, 6, 'Spider-Man: No Way Home', 'film', 2021, 'Retour dans le multivers'),
(23, 7, 'Captain America: Civil War', 'film', 2016, 'Premiere apparition de Spider-Man dans le MCU'),
(24, 7, 'Spider-Man: Homecoming', 'film', 2017, 'Affrontement contre le Vautour'),
(25, 7, 'Spider-Man: Far From Home', 'film', 2019, 'Affrontement contre Mysterio'),
(26, 7, 'Spider-Man: No Way Home', 'film', 2021, 'Evenement multivers et sacrifice final'),
(27, 8, 'The Spectacular Spider-Man', 'serie', 2008, 'Serie animee centree sur les debuts de Peter Parker au lycee'),
(28, 9, 'Spider-Man: The Animated Series', 'serie', 1994, 'Serie animee culte des annees 90 avec arcs narratifs longs et ton plus sombre'),
(29, 10, 'Spider-Man: Into the Spider-Verse', 'film', 2018, 'Premiere apparition de Miles Morales en film anime'),
(30, 10, 'Spider-Man: Across the Spider-Verse', 'film', 2023, 'Developpement du multivers et affirmation de son independance'),
(31, 11, 'Marvels Spider-Man', 'jeu', 2018, 'Premiere apparition dans lunivers Insomniac'),
(32, 11, 'Marvels Spider-Man Miles Morales', 'jeu', 2020, 'Mentorat de Miles Morales'),
(33, 11, 'Marvels Spider-Man 2', 'jeu', 2023, 'Arc du symbiote et pouvoir Anti-Venom'),
(34, 12, 'Marvels Spider-Man: Miles Morales', 'jeu', 2020, 'Premiere apparition de Miles Morales dans l?univers des jeux Insomniac, en tant que jeune Spider-Man'),
(35, 12, 'Marvels Spider-Man 2', 'jeu', 2023, 'Miles développe pleinement ses pouvoirs et combat de nouvelles menaces aux côtés de Peter Parker'),
(39, 13, 'The Amazing Spider-Man 2', 'jeu', 2014, 'Suite du jeu, Peter Parker continue de protéger New York contre de nouveaux ennemis et menaces.'),
(38, 13, 'The Amazing Spider-Man', 'jeu', 2012, 'Peter Parker combat de nouveaux ennemis inspirés du film The Amazing Spider-Man, en développant ses compétences de Spider-Man.');

-- --------------------------------------------------------

--
-- Structure de la table `characters`
--

DROP TABLE IF EXISTS `characters`;
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biography` text COLLATE utf8mb4_unicode_ci,
  `universe` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_year` int DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'comics',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `characters`
--

INSERT INTO `characters` (`id`, `name`, `alias`, `biography`, `universe`, `creation_year`, `image_url`, `type`) VALUES
(1, 'Peter Parker', 'Spider-Man', 'Peter Parker est un jeune étudiant surdoué vivant à New York, élevé par sa tante May et son oncle Ben après la mort de ses parents. Passionné de sciences, il se distingue par une intelligence exceptionnelle mais aussi par une grande timidité et un sentiment d\'isolement. Sa vie bascule lorsqu\'il est mordu par une araignée radioactive lors d\'une démonstration scientifique, lui conférant des capacités surhumaines. Doté d\'une force proportionnelle à celle d\'une araignée, d\'une agilité extrême et d\'un sens d\'araignée lui permettant d\'anticiper les dangers, Peter choisit d\'abord d\'utiliser ses pouvoirs à des fins personnelles. Cependant, la mort tragique de son oncle Ben, causée indirectement par son inaction, marque profondément sa conscience. Cet événement fondateur l\'amène à adopter la célèbre devise : « Un grand pouvoir implique de grandes responsabilités ». Dès lors, Peter Parker endosse l\'identité de Spider-Man et consacre sa vie à protéger les habitants de New York, tout en tentant de concilier son rôle de super-héros avec ses études, sa vie professionnelle et ses relations personnelles. Son parcours est jalonné de sacrifices, de dilemmes moraux et de combats contre des ennemis emblématiques, faisant de Spider-Man l\'un des héros les plus humains et les plus populaires de l\'univers Marvel. Spider-Man Earth-616 représente la version originale et principale du personnage dans les comics Marvel, servant de référence à de nombreuses adaptations cinématographiques, télévisées et vidéoludiques.', 'Earth-616', 1962, 'assets/images/peter_parker.jpg', 'comics'),
(2, 'Miles Morales', 'Spider-Man', 'Miles Gonzalo Morales est un adolescent afro-américain et portoricain originaire de Brooklyn, vivant dans l’univers alternatif Earth‑1610, connu sous le nom d’Ultimate Universe. Élève intelligent mais discret, Miles est élevé par ses parents, Jefferson Davis et Rio Morales, dans un environnement où il peine parfois à trouver sa place. Sa vie bascule lorsqu’il est mordu par une araignée génétiquement modifiée créée par Oscorp, issue des expériences ayant déjà donné naissance aux pouvoirs de Peter Parker dans cet univers. Cette morsure lui confère des capacités extraordinaires, similaires mais aussi uniques par rapport à celles du Spider-Man original.\n\nAprès la mort tragique de Peter Parker (Earth‑1610), Miles est profondément marqué par le sentiment de culpabilité de ne pas avoir agi plus tôt. Inspiré par l’héritage de Peter et encouragé par certains alliés, il décide finalement d’endosser le costume de Spider-Man afin de protéger New York. Contrairement à Peter, Miles développe une approche plus instinctive et émotionnelle du rôle de héros. Il doit apprendre à maîtriser ses pouvoirs, à gérer la peur, le doute et la pression d’être à la hauteur du symbole Spider-Man, tout en poursuivant une vie d’adolescent ordinaire.\n\nMiles Morales incarne une nouvelle génération de super-héros, représentant la diversité, l’héritage et l’évolution du mythe de Spider-Man. Son parcours l’amènera à jouer un rôle central dans des événements majeurs du multivers Marvel, notamment Spider-Verse, faisant de lui l’un des Spider-Men les plus emblématiques de l’époque moderne.', 'Earth-1610', 2011, 'assets/images/miles_morales.jpg', 'comics'),
(3, 'Ben Reilly', 'Scarlet Spider', 'Ben Reilly est un clone de Peter Parker, créé lors des expériences du Chacal (Miles Warren), un ancien professeur obsédé par Gwen Stacy. Généré à partir de l’ADN de Peter Parker, Ben possède exactement les mêmes capacités physiques et intellectuelles que l’original. Pendant des années, Ben mène une vie errante, convaincu d’être une simple copie sans légitimité. Il adopte finalement l’identité de Scarlet Spider, utilisant un costume distinctif et cherchant à construire sa propre existence loin de l’ombre de Peter.\n\nLors de la célèbre Clone Saga, Ben Reilly revient à New York et se retrouve impliqué dans une série d’événements complexes qui remettent en question l’identité même de Spider-Man. À un moment clé, Ben croit être le véritable Peter Parker, tandis que ce dernier pense être le clone. Assumant pleinement le rôle de Spider-Man, Ben endosse temporairement le costume classique modifié (avec le symbole araignée argenté) et protège New York avec sérieux et détermination.\n\nContrairement à Peter, Ben se montre souvent plus direct, plus pragmatique et moins tourmenté émotionnellement. Son destin tragique, marqué par le sacrifice et la manipulation, fait de Ben Reilly l’un des personnages les plus dramatiques et emblématiques de l’univers Spider-Man, incarnant la question centrale de la saga : qu’est‑ce qui définit réellement une personne ?', 'Earth-616', 1975, 'assets/images/ben_reilly.jpg', 'comics'),
(4, 'Miguel O Hara', 'Spider-Man 2099', 'Miguel O’Hara est un scientifique généticien brillant vivant dans le futur dystopique de l’année 2099, où les grandes corporations dominent la société. Employé par Alchemax, Miguel tente de recréer les pouvoirs du légendaire Spider-Man du passé. À la suite d’un sabotage et d’une tentative de manipulation génétique forcée, Miguel altère son propre ADN avec celui d’une araignée modifiée. Contrairement à Peter Parker, Miguel n’obtient pas ses pouvoirs par une morsure radioactive, mais par une transformation génétique irréversible. Il développe alors des capacités uniques qui le distinguent radicalement des Spider-Men classiques.\n\nHéros malgré lui, Miguel endosse l’identité de Spider-Man 2099, combattant les abus des mégacorporations, la corruption et les dérives scientifiques de son époque. Plus sombre, plus brutal et plus pragmatique que ses prédécesseurs, Miguel incarne un Spider-Man adapté à un futur violent et instable.', 'Earth-928', 1992, 'assets/images/miguel_ohara.jpg', 'comics'),
(5, 'Tobey Maguire', 'Spider-Man', 'Dans cette version cinematographique realisee par Sam Raimi, Peter Parker est un lyceen timide et brillant qui acquiert ses pouvoirs apres avoir ete mordu par une araignee genetiquement modifiee.\n\nApres la mort tragique de son oncle Ben, consequence indirecte de son irresponsabilite, Peter adopte la devise : Un grand pouvoir implique de grandes responsabilites.\n\nIl devient Spider-Man et protege New York contre des menaces majeures comme le Bouffon Vert, le Docteur Octopus et l Homme-Sable.\n\nCette version est plus emotionnelle, romantique et dramatique que les versions modernes.', 'MCU/Sam Raimi', 2002, 'assets/images/tobey_maguire.jpg', 'film'),
(6, 'Andrew Garfield', 'Spider-Man', 'Dans cette version, Peter Parker est un jeune homme brillant mais introverti, profondément marqué par la disparition mystérieuse de ses parents durant son enfance. Élevé par son oncle Ben et sa tante May, il développe une passion pour la science et cherche à comprendre le passé de sa famille.\n\nEn enquêtant sur les recherches de son père liées à Oscorp, il est mordu par une araignée génétiquement modifiée. Il développe alors une force surhumaine, une agilité exceptionnelle et des réflexes amplifiés.\n\nContrairement aux autres adaptations, il met en avant son intelligence scientifique en concevant lui-même ses lanceurs de toiles mécaniques. Cette version de Spider-Man est plus impulsive, plus sarcastique et plus moderne dans son approche du héroïsme.\n\nMarqué par la mort de son oncle Ben et par la tragédie liée à Gwen Stacy, il incarne un héros tiraillé entre culpabilité, amour et responsabilité.', 'Amazing Spider-Man', 2012, 'assets/images/andrew_garfield.jpg', 'film'),
(7, 'Tom Holland', 'Spider-Man', 'Dans cette version, Peter Parker est un adolescent brillant recruté très tôt par Tony Stark après les événements de Civil War. Encore lycéen, il tente d’équilibrer sa vie scolaire à Queens avec ses responsabilités de super-héros. Contrairement aux versions précédentes, il commence son parcours sous la supervision d’Iron Man, bénéficiant d’une technologie avancée : combinaison améliorée, intelligence artificielle intégrée et équipements high‑tech.\n\nMalgré cet encadrement, Peter doit apprendre à devenir un héros par lui‑même. La mort de Tony Stark représente un tournant majeur dans son évolution, le poussant à assumer pleinement l’héritage laissé derrière lui. Après les événements du multivers, il choisit le sacrifice ultime : effacer son identité de la mémoire du monde pour protéger ceux qu’il aime. Cette décision marque sa transition vers une version plus indépendante et plus mature de Spider‑Man.', 'MCU', 2016, 'assets/images/tom_holland.jpg', 'film'),
(8, 'Peter Parker', 'Spectacular Spider-Man', 'Peter Parker est un lycéen intelligent mais socialement maladroit qui tente d’équilibrer sa vie scolaire, son travail au Daily Bugle et ses responsabilités de super‑héros. Cette adaptation met fortement l’accent sur le développement des personnages et les relations complexes entre Peter, Gwen Stacy, Mary Jane Watson et Harry Osborn. Plus stratégique et analytique que certaines autres versions, ce Spider‑Man utilise son intelligence pour anticiper ses adversaires comme le Bouffon Vert, le Docteur Octopus ou Venom.\n\nLa série propose une vision moderne et dynamique du mythe, avec un ton plus mature malgré son format animé. Le personnage évolue progressivement, apprenant à assumer pleinement les conséquences de ses choix tout en restant fidèle à l’esprit classique de Spider‑Man.', 'Earth-616', 2008, 'assets/images/peter_parker_spectacular.jpg', 'serie'),
(9, 'Peter Parker', 'Spider-Man: The Animated Series', 'Cette adaptation des années 90 présente un Peter Parker plus mature, déjà étudiant à l’université et travaillant comme photographe pour le Daily Bugle. Diffusée entre 1994 et 1998, la série est aujourd’hui considérée comme l’une des versions les plus emblématiques et nostalgiques du personnage. Le ton est plus dramatique que dans de nombreuses séries animées modernes. Les intrigues s’étendent sur plusieurs épisodes avec de véritables arcs narratifs, notamment autour de Venom, du Bouffon Vert et du multivers.\n\nLa série adapte de nombreuses histoires majeures des comics, dont le Clone Saga et le Spider‑Verse avant l’heure. Malgré les limitations techniques de l’époque, elle a marqué toute une génération par son générique culte, son style sombre et son respect du matériau original. Ce Spider‑Man incarne une version classique et sérieuse du héros, ancrée dans l’esthétique et la narration des années 90.', 'Earth-616', 1994, 'assets/images/peter_parker_animated.jpg', 'serie'),
(10, 'Miles Morales', 'Spider-Man', 'Miles Morales est un adolescent de Brooklyn, élève dans une école prestigieuse, qui lutte pour trouver sa place entre les attentes de ses parents et son identité personnelle. Après avoir été mordu par une araignée radioactive venue d’un autre univers, il développe des capacités similaires à celles de Spider-Man. Contrairement à Peter Parker, Miles doit apprendre à devenir un héros dans un contexte de multivers. Guidé par différentes versions de Spider-Man, il découvre que chacun porte son propre poids et ses propres responsabilités.\n\nIl développe des pouvoirs uniques comme l’invisibilité temporaire et le Venom Blast, une décharge bio‑électrique puissante. Son parcours est centré sur l’acceptation de soi, la transmission et la légitimité : il ne cherche pas à devenir le prochain Spider-Man, mais à devenir son Spider-Man. Dans Across the Spider-Verse, son rôle prend une dimension plus dramatique lorsqu’il remet en question les règles imposées par les autres Spider-People et affirme son indépendance.', 'Earth-1610', 2018, 'assets/images/miles_morales_spiderverse.jpg', 'film'),
(11, 'Peter Parker', 'Spider-Man', 'Ce Peter Parker est un Spider-Man expérimenté, actif depuis plusieurs années au début du premier jeu. Contrairement aux versions lycée, il est ici un adulte, déjà diplômé, travaillant comme chercheur scientifique tout en protégeant New York. Cette version insiste fortement sur son équilibre difficile entre vie personnelle, responsabilités professionnelles et rôle de héros. Il agit comme mentor pour Miles Morales, transmettant son expérience et sa philosophie.\n\nDans Marvel’s Spider-Man 2, Peter entre en contact avec le symbiote, ce qui amplifie considérablement ses capacités mais altère aussi son comportement. Après s’en être libéré, il développe des pouvoirs liés à l’Anti‑Venom, obtenant des capacités uniques d’énergie symbiotique purifiée. Cette version est plus stratégique, plus rapide et dispose d’un arsenal technologique avancé concu par lui‑même.', 'Earth-1048', 2018, 'assets/images/peter_parker_ps.jpg', 'jeu'),
(12, 'Miles Morales', 'Spider-Man', 'Miles Morales est un adolescent de Brooklyn choisi pour devenir le nouveau Spider-Man après Peter Parker. Dans cette version des jeux vidéo, il apprend à maîtriser ses pouvoirs uniques tout en étant guidé et mentoré par Peter Parker, qui l’aide à comprendre les responsabilités liées à son rôle de héros. Miles se distingue par ses capacités exceptionnelles : force et agilité surhumaines, camouflage biologique pour se rendre invisible, et le Venom Blast, une décharge bio‑électrique paralysante. Ces pouvoirs lui permettent de protéger New York contre des menaces que même Peter ne pourrait affronter seul.\n\nSa relation avec Peter Parker est centrale : il combine les enseignements de son mentor avec son propre style de combat acrobatique et moderne, incarnant une nouvelle génération de Spider-Man tout en respectant l’héritage du héros original.', 'Earth-1048', 2020, 'assets/images/miles_morales_ps.jpg', 'jeu'),
(13, 'Peter Parker', 'Spider-Man', 'Dans ce jeu vidéo inspiré du film The Amazing Spider-Man, Peter Parker est un jeune étudiant et scientifique talentueux, qui doit concilier sa vie civile avec son rôle de Spider-Man. Alors qu’il explore New York, il affronte de nouveaux ennemis et découvre des complots menaçant la ville. Peter utilise ses pouvoirs classiques — force et agilité surhumaines, sens d’araignée et toile organique — pour protéger les habitants et stopper les plans dangereux des criminels.\n\nLe jeu met l’accent sur ses capacités de combat, son agilité dans l’environnement urbain et sa capacité à résoudre des énigmes grâce à son intelligence. Cette version du personnage capture le côté stratégique et aventureux de Spider-Man, tout en conservant l’esprit héroïque et responsable de Peter Parker. Les joueurs expérimentent à la fois ses combats dynamiques et ses moments de réflexion, rendant le personnage à la fois humain et inspirant.', 'Univers Alternatif', 2012, 'assets/images/amazing_spiderman_game.jpg', 'jeu');

-- --------------------------------------------------------

--
-- Structure de la table `character_creators`
--

DROP TABLE IF EXISTS `character_creators`;
CREATE TABLE IF NOT EXISTS `character_creators` (
  `character_id` int NOT NULL,
  `creator_id` int NOT NULL,
  PRIMARY KEY (`character_id`,`creator_id`),
  KEY `creator_id` (`creator_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `character_creators`
--

INSERT INTO `character_creators` (`character_id`, `creator_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(4, 5),
(4, 6),
(5, 1),
(5, 2),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(8, 1),
(8, 2),
(9, 1),
(9, 2),
(10, 3),
(10, 4),
(11, 1),
(11, 2),
(11, 11),
(11, 12),
(11, 13),
(12, 3),
(12, 4),
(12, 11),
(12, 12),
(13, 5),
(13, 6),
(13, 13),
(13, 14);

-- --------------------------------------------------------

--
-- Structure de la table `character_powers`
--

DROP TABLE IF EXISTS `character_powers`;
CREATE TABLE IF NOT EXISTS `character_powers` (
  `character_id` int NOT NULL,
  `power_id` int NOT NULL,
  PRIMARY KEY (`character_id`,`power_id`),
  KEY `power_id` (`power_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `character_powers`
--

INSERT INTO `character_powers` (`character_id`, `power_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 1),
(2, 2),
(2, 3),
(2, 7),
(2, 8),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 6),
(4, 2),
(4, 3),
(4, 6),
(4, 9),
(4, 10),
(4, 11),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 6),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 6),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(8, 6),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 6),
(10, 1),
(10, 2),
(10, 3),
(10, 7),
(10, 8),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 6),
(11, 12),
(11, 13),
(12, 1),
(12, 2),
(12, 3),
(12, 6),
(12, 7),
(12, 8),
(13, 1),
(13, 2),
(13, 3),
(13, 4),
(13, 6);

-- --------------------------------------------------------

--
-- Structure de la table `creators`
--

DROP TABLE IF EXISTS `creators`;
CREATE TABLE IF NOT EXISTS `creators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `creators`
--

INSERT INTO `creators` (`id`, `name`, `role`) VALUES
(1, 'Stan Lee', 'Scénariste'),
(2, 'Steve Ditko', 'Dessinateur'),
(3, 'Brian Michael Bendis', 'Scénariste'),
(4, 'Sara Pichelli', 'Dessinatrice'),
(11, 'Insomniac Games', 'Developpeur'),
(5, 'Peter David', 'Scénariste'),
(6, 'Rick Leonardi', 'Dessinateur'),
(12, 'Marvel Games', 'Editeur'),
(13, 'Beenox', 'Développeur'),
(14, 'Activision', 'Éditeur');

-- --------------------------------------------------------

--
-- Structure de la table `powers`
--

DROP TABLE IF EXISTS `powers`;
CREATE TABLE IF NOT EXISTS `powers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `type` enum('power','skill') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `powers`
--

INSERT INTO `powers` (`id`, `name`, `description`, `type`) VALUES
(1, 'Sens d araignee', 'Detection du danger imminent', 'power'),
(2, 'Agilite surhumaine', 'Mouvements extremes', 'power'),
(3, 'Force surhumaine', 'Force physique largement superieure a un humain normal', 'power'),
(4, 'Agilite extreme', 'Capacite a effectuer des mouvements acrobatiques avances', 'power'),
(5, 'Toile organique', 'Production naturelle de toile par les poignets', 'power'),
(6, 'Intelligence superieure', 'QI eleve, expert en sciences et technologie', 'power'),
(7, 'Camouflage biologique', 'Capacite a devenir invisible', 'power'),
(8, 'Venom Blast', 'Decharge bio-electrique paralysante', 'power'),
(9, 'Griffes', 'Griffes retractiles et acerees aux mains', 'power'),
(10, 'Crocs paralysants', 'Crocs pouvant injecter une toxine paralysante', 'power'),
(11, 'Vision amelioree', 'Capacite a voir dans l obscurite et zoom optique', 'power'),
(12, 'Pouvoirs du symbiote', 'Capacites accrues grace au symbiote alien', 'power'),
(13, 'Anti-Venom', 'Energie symbiotique purifiee offrant attaques blanches et soins', 'power');

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `txt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`txt`) VALUES
(''),
('éèàùôç');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
