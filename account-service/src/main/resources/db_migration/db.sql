-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SMART_METER_ACCOUNT
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SMART_METER_ACCOUNT` ;

-- -----------------------------------------------------
-- Schema SMART_METER_ACCOUNT
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SMART_METER_ACCOUNT` DEFAULT CHARACTER SET utf8 ;
USE `SMART_METER_ACCOUNT` ;

-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`customer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `fname` VARCHAR(45) NULL DEFAULT NULL,
  `lname` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `contact_no` VARCHAR(20) NULL DEFAULT NULL,
  `address_line1` VARCHAR(45) NULL DEFAULT NULL,
  `address_line2` VARCHAR(45) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`account_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`account_type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(30) NULL DEFAULT NULL,
  `rate_type_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`enterprise_user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`enterprise_user_type` (
  `id` INT(11) NOT NULL,
  `type` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`province`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`province` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`district`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`district` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `province_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_district_province1_idx` (`province_id` ASC),
  CONSTRAINT `fk_district_province1`
  FOREIGN KEY (`province_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`province` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`city` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `zip_code` INT(11) NULL DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `district_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_city_district1_idx` (`district_id` ASC),
  CONSTRAINT `fk_city_district1`
  FOREIGN KEY (`district_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`district` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`branch` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(20) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `city_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_branch_city1_idx` (`city_id` ASC),
  CONSTRAINT `fk_branch_city1`
  FOREIGN KEY (`city_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`enterprise_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`enterprise_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `employeeNo` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `fname` VARCHAR(45) NULL DEFAULT NULL,
  `lname` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `enterprise_user_type_id` INT(11) NOT NULL,
  `branch_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_enterprise_user_enterprise_user_type1_idx` (`enterprise_user_type_id` ASC),
  INDEX `fk_enterprise_user_branch1_idx` (`branch_id` ASC),
  CONSTRAINT `fk_enterprise_user_enterprise_user_type1`
  FOREIGN KEY (`enterprise_user_type_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`enterprise_user_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_enterprise_user_branch1`
  FOREIGN KEY (`branch_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`branch` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`account` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `account_no` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `balance` DOUBLE NULL DEFAULT NULL,
  `created_date` DATE NOT NULL,
  `owner_id` INT(11) NOT NULL,
  `account_type_id` INT(11) NOT NULL,
  `created_enterprise_user_id` INT(11) NOT NULL,
  `branch_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_account_customer_idx` (`owner_id` ASC),
  INDEX `fk_account_account_type1_idx` (`account_type_id` ASC),
  INDEX `fk_account_enterprise_user1_idx` (`created_enterprise_user_id` ASC),
  INDEX `fk_account_branch1_idx` (`branch_id` ASC),
  CONSTRAINT `fk_account_customer`
  FOREIGN KEY (`owner_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_account_account_type1`
  FOREIGN KEY (`account_type_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`account_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_account_enterprise_user1`
  FOREIGN KEY (`created_enterprise_user_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`enterprise_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_account_branch1`
  FOREIGN KEY (`branch_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`branch` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`normal_consumption`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`normal_consumption` (
  `id` INT(11) NOT NULL,
  `day` INT(11) NULL DEFAULT NULL,
  `time` INT(11) NULL DEFAULT NULL COMMENT 'I',
  `value` DOUBLE NULL DEFAULT NULL,
  `account_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_normal_consumption_account1_idx` (`account_id` ASC),
  CONSTRAINT `fk_normal_consumption_account1`
  FOREIGN KEY (`account_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER_ACCOUNT`.`customer_has_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER_ACCOUNT`.`customer_has_account` (
  `customer_id` INT(11) NOT NULL,
  `account_id` INT(11) NOT NULL,
  PRIMARY KEY (`customer_id`, `account_id`),
  INDEX `fk_customer_has_account_account1_idx` (`account_id` ASC),
  INDEX `fk_customer_has_account_customer1_idx` (`customer_id` ASC),
  CONSTRAINT `fk_customer_has_account_customer1`
  FOREIGN KEY (`customer_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_has_account_account1`
  FOREIGN KEY (`account_id`)
  REFERENCES `SMART_METER_ACCOUNT`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `SMART_METER`.`province`
-- -----------------------------------------------------
START TRANSACTION;
USE SMART_METER_ACCOUNT;
INSERT INTO `province` (`id`, `name`) VALUES (1, 'Western');
INSERT INTO `province` (`id`, `name`) VALUES (2, 'Southern');
INSERT INTO `province` (`id`, `name`) VALUES (3, 'East');

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`district`
-- -----------------------------------------------------
START TRANSACTION;
USE SMART_METER_ACCOUNT;
INSERT INTO `district` (`id`, `name`, `province_id`) VALUES (1, 'Colombo', 1);
INSERT INTO `district` (`id`, `name`, `province_id`) VALUES (2, 'Kalutara', 1);
INSERT INTO `district` (`id`, `name`, `province_id`) VALUES (3, 'Gampaha', 1);
INSERT INTO `district` (`id`, `name`, `province_id`) VALUES (4, 'Galle', 2);
INSERT INTO `district` (`id`, `name`, `province_id`) VALUES (5, 'Matara', 2);
INSERT INTO `district` (`id`, `name`, `province_id`) VALUES (6, 'Trincomalee', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`city`
-- -----------------------------------------------------
START TRANSACTION;
USE SMART_METER_ACCOUNT;
INSERT INTO `city` (`id`, `zip_code`, `name`, `district_id`) VALUES (1, 12500, 'Panadura', 2);
INSERT INTO `city` (`id`, `zip_code`, `name`, `district_id`) VALUES (2, 15000, 'Bandaragama', 2);
INSERT INTO `city` (`id`, `zip_code`, `name`, `district_id`) VALUES (3, 11000, 'Moratuwa', 1);
INSERT INTO `city` (`id`, `zip_code`, `name`, `district_id`) VALUES (4, 15600, 'Kelaniya', 3);
INSERT INTO `city` (`id`, `zip_code`, `name`, `district_id`) VALUES (5, 22000, 'Kokgala', 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`branch`
-- -----------------------------------------------------
START TRANSACTION;
USE SMART_METER_ACCOUNT;
INSERT INTO `branch` (`id`, `code`, `name`, `city_id`) VALUES (1, '12560', 'A-4 Branch', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`account_type`
-- -----------------------------------------------------
START TRANSACTION;
USE SMART_METER_ACCOUNT;
INSERT INTO `account_type` (`id`, `type`, `rate_type_id`) VALUES (1, 'Domestic', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`enterprise_user_type`
-- -----------------------------------------------------
START TRANSACTION;
USE SMART_METER_ACCOUNT;
INSERT INTO `enterprise_user_type` (`id`, `type`) VALUES (1, 'Super');

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`enterprise_user`
-- -----------------------------------------------------
START TRANSACTION;
USE SMART_METER_ACCOUNT;
INSERT INTO `enterprise_user` (`id`, `employeeNo`, `password`, `fname`, `lname`, `enterprise_user_type_id`, `branch_id`) VALUES (1, 'A01', 'pw', 'Menuka', 'Fernando', 1, 1);

COMMIT;

