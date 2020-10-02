DROP DATABASE IF EXISTS `sql_hive`;
CREATE DATABASE `sql_hive`; 
USE `sql_hive`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `pic_location` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hive`(
	`name` varchar(50) NOT NULL,
    `address` varchar(10) NOT NULL,
    `user_id` int(11) NOT NULL,
    `hive_id` int(11) NOT NULL,
    PRIMARY KEY (`hive_id`),
    KEY `FK_user_id` (`user_id`),
	CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `inspection`(
	`date` DATE NOT NULL,
	`hive_id` int(11) NOT NULL,
    `ins_id` int(11) NOT NULL,
    `health` char(1) NOT NULL,
    `honey_stores` int(3) NOT NULL,
    `queen_production` int(3) NOT NULL,
    `equipment_on_the_hive` varchar(255) NOT NULL,
    `eqiupment_in_inventory` varchar(255) NOT NULL,
	`losses` int(3) NOT NULL,
    `gains` int(3) NOT NULL,
    PRIMARY KEY (`ins_id`),
    KEY `FK_hive_id` (`hive_id`),
    CONSTRAINT `hive_id` FOREIGN KEY (`hive_id`) REFERENCES `hives` (`hive_id`) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;