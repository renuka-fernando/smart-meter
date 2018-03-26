-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SMART_METER_USAGE
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS SMART_METER_USAGE ;

-- -----------------------------------------------------
-- Schema SMART_METER_USAGE
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS SMART_METER_USAGE DEFAULT CHARACTER SET utf8 ;
USE SMART_METER_USAGE ;

-- -----------------------------------------------------
-- Table `SMART_METER_USAGE`.`consumption`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS SMART_METER_USAGE.consumption (
  `id` INT(11) NOT NULL,
  `timestamp` DATETIME NULL DEFAULT NULL,
  `reading` DOUBLE NULL DEFAULT NULL,
  account_id INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

COMMIT;

