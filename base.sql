#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: partie
#------------------------------------------------------------

CREATE TABLE partie(
        id     int (11) Auto_increment  NOT NULL ,
        pseudo Varchar (255) ,
        token  Varchar (500) ,
        score  Int ,
        PRIMARY KEY (id )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: point
#------------------------------------------------------------

CREATE TABLE point(
        id         int (11) Auto_increment  NOT NULL ,
        latitude   Double ,
        longitude  Double ,
        indication Varchar (500) ,
        PRIMARY KEY (id )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: destination
#------------------------------------------------------------

CREATE TABLE destination(
        id        int (11) Auto_increment  NOT NULL ,
        nom       Varchar (500) ,
        latitude  Double ,
        longitude Double ,
        indice1   Varchar (500) ,
        indice2   Varchar (500) ,
        indice3   Varchar (500) ,
        indice4   Varchar (500) ,
        indice5   Varchar (500) ,
        PRIMARY KEY (id )
)ENGINE=InnoDB;

