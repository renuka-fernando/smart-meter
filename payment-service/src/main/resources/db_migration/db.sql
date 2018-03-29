-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SMART_METER_PAYMENT
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SMART_METER_PAYMENT` ;

-- -----------------------------------------------------
-- Schema SMART_METER_PAYMENT
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SMART_METER_PAYMENT` DEFAULT CHARACTER SET utf8 ;
USE `SMART_METER_PAYMENT` ;

-- -----------------------------------------------------
-- Table `SMART_METER_PAYMENT`.`bill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_PAYMENT`.`bill` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  `account_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_PAYMENT`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_PAYMENT`.`payment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  `bill_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `bill_id`),
  INDEX `fk_payment_bill_idx` (`bill_id` ASC),
  CONSTRAINT `fk_payment_bill`
  FOREIGN KEY (`bill_id`)
  REFERENCES `SMART_METER_PAYMENT`.`bill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_PAYMENT`.`rate_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_PAYMENT`.`rate_type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_PAYMENT`.`rate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_PAYMENT`.`rate` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `lower` DOUBLE NULL DEFAULT NULL,
  `upper` DOUBLE NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  `validSince` DATETIME NULL DEFAULT NULL,
  `rate_type_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `rate_type_id`),
  INDEX `fk_rate_rate_type1_idx` (`rate_type_id` ASC),
  CONSTRAINT `fk_rate_rate_type1`
  FOREIGN KEY (`rate_type_id`)
  REFERENCES `SMART_METER_PAYMENT`.`rate_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
