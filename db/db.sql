START TRANSACTION;

CREATE DATABASE IF NOT EXISTS Pharmacie;
USE Pharmacie;




CREATE TABLE Pharmacien(

	Pharmacien_Id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	Pharmacien_Nom VARCHAR(40) NOT NULL,
	Pharmacien_Prenom VARCHAR(40) NOT NULL,
	Pharmacien_NomUtilisateur VARCHAR(40) NOT NULL,
	Pharmacien_MotDePasse VARCHAR(40) NOT NULL
);
CREATE TABLE Mutuelle(
    Mutuelle_Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Mutuelle_Nom VARCHAR(40) NOT NULL,
    Mutuelle_Taux FLOAT NOT NULL
);

CREATE TABLE Maladie(
    Maladie_Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Maladie_Nom VARCHAR(40) NOT NULL
);

CREATE TABLE Medicament(
    Medicament_Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Medicament_Nom VARCHAR(40) NOT NULL,
    Medicament_Stock INT UNSIGNED NOT NULL,
    Medicament_Prix FLOAT NOT NULL
);

CREATE TABLE Medecin(
    Medecin_Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Medecin_Nom VARCHAR(40) NOT NULL,
    Medecin_Prenom VARCHAR(40) NOT NULL,
    Medecin_NumeroTelephone VARCHAR(10) NOT NULL
);

CREATE TABLE Patient(
    Patient_Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Patient_Nom VARCHAR(40) NOT NULL,
    Patient_Prenom VARCHAR(40) NOT NULL,
    Patient_DateNaissance DATE NOT NULL,
    Patient_NumeroSecurite VARCHAR(15) NOT NULL,
    Patient_NumeroTelephone VARCHAR(10) NOT NULL,
    Patient_IdMutuelle BIGINT UNSIGNED NOT NULL, 
    FOREIGN KEY (Patient_IdMutuelle) REFERENCES Mutuelle (Mutuelle_Id)
);

CREATE TABLE Ordonnance(
    Ordonnance_Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Ordonnance_IdMedecin BIGINT UNSIGNED NOT NULL,
    Ordonnance_IdPatient BIGINT UNSIGNED NOT NULL,
    Ordonnance_IdMaladie BIGINT UNSIGNED NOT NULL,
    Ordonnance_Date DATE NOT NULL,
    FOREIGN KEY (Ordonnance_IdMedecin) REFERENCES Medecin (Medecin_Id),
    FOREIGN KEY (Ordonnance_IdPatient) REFERENCES Patient (Patient_Id),
    FOREIGN KEY (Ordonnance_IdMaladie) REFERENCES Maladie (Maladie_Id)
);

CREATE TABLE Posologie(
    Posologie_Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Posologie_IdOrdonnance BIGINT UNSIGNED NOT NULL,
    Posologie_IdMedicament BIGINT UNSIGNED NOT NULL,
    Posologie_Duree INT UNSIGNED NOT NULL,
    Posologie_QuantiteMedicament INT UNSIGNED NOT NULL,
    FOREIGN KEY (Posologie_IdOrdonnance) REFERENCES Ordonnance (Ordonnance_Id),
    FOREIGN KEY (Posologie_IdMedicament) REFERENCES Medicament (Medicament_Id)
);

INSERT INTO Mutuelle (Mutuelle_Nom, Mutuelle_Taux) VALUES
('Mutuelle Santé Plus', 0.1),
('AssurCare', 0.15),
('Harmony Assurance', 0.08);

INSERT INTO Maladie (Maladie_Nom) VALUES
('Rhume'),
('Grippe'),
('Allergie');

INSERT INTO Medicament (Medicament_Nom, Medicament_Stock, Medicament_Prix) VALUES
('Paracétamol', 50, 5.99),
('Amoxicilline', 100, 15.5),
('Loratadine', 30, 8.75);

INSERT INTO Medecin (Medecin_Nom, Medecin_Prenom, Medecin_NumeroTelephone) VALUES
('Dubois', 'Julie', '0601020304'),
('Leroy', 'Thomas', '0678901234');

INSERT INTO Patient (Patient_Nom, Patient_Prenom, Patient_DateNaissance, Patient_NumeroSecurite, Patient_NumeroTelephone, Patient_IdMutuelle) VALUES
('Moreau', 'Sophie', '1990-05-15', '12345678901234', '0654322209', 1),
('Petit', 'Antoine', '1995-06-21', '15243698951290','0675467801', 2);

INSERT INTO Ordonnance (Ordonnance_IdMedecin, Ordonnance_IdPatient, Ordonnance_IdMaladie, Ordonnance_Date) VALUES
(1, 1, 1, '2023-01-10'),
(2, 2, 3, '2023-02-05');

INSERT INTO Posologie (Posologie_IdOrdonnance, Posologie_IdMedicament, Posologie_Duree, Posologie_QuantiteMedicament) VALUES
(1, 1, 7, 2),
(2, 2, 10, 1);

COMMIT;
