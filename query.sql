CREATE DATABASE IF NOT EXISTS Ecologistics;
USE Ecologistics;

CREATE TABLE IF NOT EXISTS Transporter (
    TransporterID VARCHAR(255) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    SECURITY_KEY VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TransporterUserData (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    TransporterId VARCHAR(255) NOT NULL,
    Phonenumber VARCHAR(255) NOT NULL,
    AdharCard VARCHAR(255) NOT NULL,
    PanCard VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    FOREIGN KEY (TransporterId) REFERENCES Transporter(TransporterID)
);
CREATE TABLE IF NOT EXISTS Trader (
    TraderID VARCHAR(255) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    SECURITY_KEY VARCHAR(255) NOT NULL
);
