-- MariaDB dump 10.19-11.2.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: Pharmacie
-- ------------------------------------------------------
-- Server version	11.2.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Maladie`
--

DROP TABLE IF EXISTS `Maladie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Maladie` (
  `Maladie_Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Maladie_Nom` varchar(40) NOT NULL,
  PRIMARY KEY (`Maladie_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Maladie`
--

LOCK TABLES `Maladie` WRITE;
/*!40000 ALTER TABLE `Maladie` DISABLE KEYS */;
INSERT INTO `Maladie` VALUES
(1,'Rhume'),
(2,'Grippe'),
(3,'Allergie');
/*!40000 ALTER TABLE `Maladie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medecin`
--

DROP TABLE IF EXISTS `Medecin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Medecin` (
  `Medecin_Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Medecin_Nom` varchar(40) NOT NULL,
  `Medecin_Prenom` varchar(40) NOT NULL,
  `Medecin_NumeroTelephone` varchar(10) NOT NULL,
  PRIMARY KEY (`Medecin_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medecin`
--

LOCK TABLES `Medecin` WRITE;
/*!40000 ALTER TABLE `Medecin` DISABLE KEYS */;
INSERT INTO `Medecin` VALUES
(1,'Dubois','Julie','0601020304'),
(2,'Leroy','Thomassilolo','0678901234');
/*!40000 ALTER TABLE `Medecin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medicament`
--

DROP TABLE IF EXISTS `Medicament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Medicament` (
  `Medicament_Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Medicament_Nom` varchar(40) NOT NULL,
  `Medicament_Stock` int(10) unsigned NOT NULL,
  `Medicament_Prix` float NOT NULL,
  PRIMARY KEY (`Medicament_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medicament`
--

LOCK TABLES `Medicament` WRITE;
/*!40000 ALTER TABLE `Medicament` DISABLE KEYS */;
INSERT INTO `Medicament` VALUES
(1,'Paracétamol',50,7),
(2,'Amoxicilline',100,15.5),
(3,'Loratadine',30,8.75);
/*!40000 ALTER TABLE `Medicament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mutuelle`
--

DROP TABLE IF EXISTS `Mutuelle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mutuelle` (
  `Mutuelle_Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Mutuelle_Nom` varchar(40) NOT NULL,
  `Mutuelle_Taux` float NOT NULL,
  PRIMARY KEY (`Mutuelle_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mutuelle`
--

LOCK TABLES `Mutuelle` WRITE;
/*!40000 ALTER TABLE `Mutuelle` DISABLE KEYS */;
INSERT INTO `Mutuelle` VALUES
(1,'Mutuelle Santé Plus',0.1),
(2,'AssurCare',0.15),
(3,'Harmony Assurance',0.08);
/*!40000 ALTER TABLE `Mutuelle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ordonnance`
--

DROP TABLE IF EXISTS `Ordonnance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ordonnance` (
  `Ordonnance_Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Ordonnance_IdMedecin` bigint(20) unsigned NOT NULL,
  `Ordonnance_IdPatient` bigint(20) unsigned NOT NULL,
  `Ordonnance_IdMaladie` bigint(20) unsigned NOT NULL,
  `Ordonnance_Date` date NOT NULL,
  PRIMARY KEY (`Ordonnance_Id`),
  KEY `Ordonnance_IdMedecin` (`Ordonnance_IdMedecin`),
  KEY `Ordonnance_IdPatient` (`Ordonnance_IdPatient`),
  KEY `Ordonnance_IdMaladie` (`Ordonnance_IdMaladie`),
  CONSTRAINT `Ordonnance_ibfk_1` FOREIGN KEY (`Ordonnance_IdMedecin`) REFERENCES `Medecin` (`Medecin_Id`),
  CONSTRAINT `Ordonnance_ibfk_2` FOREIGN KEY (`Ordonnance_IdPatient`) REFERENCES `Patient` (`Patient_Id`),
  CONSTRAINT `Ordonnance_ibfk_3` FOREIGN KEY (`Ordonnance_IdMaladie`) REFERENCES `Maladie` (`Maladie_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ordonnance`
--

LOCK TABLES `Ordonnance` WRITE;
/*!40000 ALTER TABLE `Ordonnance` DISABLE KEYS */;
INSERT INTO `Ordonnance` VALUES
(1,1,1,1,'2023-01-10'),
(2,2,2,3,'2023-02-05');
/*!40000 ALTER TABLE `Ordonnance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patient`
--

DROP TABLE IF EXISTS `Patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Patient` (
  `Patient_Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Patient_Nom` varchar(40) NOT NULL,
  `Patient_Prenom` varchar(40) NOT NULL,
  `Patient_DateNaissance` date NOT NULL,
  `Patient_NumeroSecurite` varchar(15) NOT NULL,
  `Patient_NumeroTelephone` varchar(10) NOT NULL,
  `Patient_IdMutuelle` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`Patient_Id`),
  KEY `Patient_IdMutuelle` (`Patient_IdMutuelle`),
  CONSTRAINT `Patient_ibfk_1` FOREIGN KEY (`Patient_IdMutuelle`) REFERENCES `Mutuelle` (`Mutuelle_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `Patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
INSERT INTO `Patient` VALUES
(1,'Moreau','Sophie','1990-05-15','12345678901234','0654322209',1),
(2,'Petit','Antoine','1995-06-21','15243698951290','0675467801',2);
/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pharmacien`
--

DROP TABLE IF EXISTS `Pharmacien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pharmacien` (
  `Pharmacien_Id` int(11) NOT NULL AUTO_INCREMENT,
  `Pharmacien_Nom` varchar(40) NOT NULL,
  `Pharmacien_Prenom` varchar(40) NOT NULL,
  `Pharmacien_NomUtilisateur` varchar(40) NOT NULL,
  `Pharmacien_MotDePasse` varchar(40) NOT NULL,
  PRIMARY KEY (`Pharmacien_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pharmacien`
--

LOCK TABLES `Pharmacien` WRITE;
/*!40000 ALTER TABLE `Pharmacien` DISABLE KEYS */;
INSERT INTO `Pharmacien` VALUES
(1,'Dawson','John','john_doe','motdepasse1'),
(2,'Smith','Alice','alice_smith','motdepasse2'),
(3,'Johnson','Emma','emma_johnson','motdepasse3');
/*!40000 ALTER TABLE `Pharmacien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posologie`
--

DROP TABLE IF EXISTS `Posologie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Posologie` (
  `Posologie_Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Posologie_IdOrdonnance` bigint(20) unsigned NOT NULL,
  `Posologie_IdMedicament` bigint(20) unsigned NOT NULL,
  `Posologie_Duree` int(10) unsigned NOT NULL,
  `Posologie_QuantiteMedicament` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Posologie_Id`),
  KEY `Posologie_IdOrdonnance` (`Posologie_IdOrdonnance`),
  KEY `Posologie_IdMedicament` (`Posologie_IdMedicament`),
  CONSTRAINT `Posologie_ibfk_1` FOREIGN KEY (`Posologie_IdOrdonnance`) REFERENCES `Ordonnance` (`Ordonnance_Id`),
  CONSTRAINT `Posologie_ibfk_2` FOREIGN KEY (`Posologie_IdMedicament`) REFERENCES `Medicament` (`Medicament_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posologie`
--

LOCK TABLES `Posologie` WRITE;
/*!40000 ALTER TABLE `Posologie` DISABLE KEYS */;
INSERT INTO `Posologie` VALUES
(1,1,1,7,2),
(2,2,2,10,1);
/*!40000 ALTER TABLE `Posologie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-11 20:41:58
