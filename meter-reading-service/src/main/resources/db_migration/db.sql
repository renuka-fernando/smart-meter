-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SMART_METER
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SMART_METER` ;

-- -----------------------------------------------------
-- Schema SMART_METER
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SMART_METER` DEFAULT CHARACTER SET utf8 ;
USE `SMART_METER` ;

-- -----------------------------------------------------
-- Table `SMART_METER`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`payment` (
  `id` INT NOT NULL,
  `date` DATE NULL,
  `amount` DOUBLE NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SMART_METER`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`rate_type` (
  `id` INT(11) NOT NULL,
  `type` VARCHAR(30) NULL DEFAULT NULL,
  `RateTypecol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`account_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`account_type` (
  `id` INT(11) NOT NULL,
  `type` VARCHAR(30) NULL DEFAULT NULL,
  `RateType_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_AccountType_RateType1_idx` (`RateType_id` ASC),
  CONSTRAINT `fk_AccountType_RateType1`
    FOREIGN KEY (`RateType_id`)
    REFERENCES `SMART_METER`.`rate_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`customer` (
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
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`enterprise_user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`enterprise_user_type` (
  `id` INT(11) NOT NULL,
  `type` VARCHAR(30) NULL DEFAULT NULL,
  `EnterpriseUserTypecol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`province`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`province` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`district`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`district` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `province_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_district_province1_idx` (`province_id` ASC),
  CONSTRAINT `fk_district_province1`
    FOREIGN KEY (`province_id`)
    REFERENCES `SMART_METER`.`province` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`city` (
  `id` INT(11) NOT NULL,
  `zip_code` INT(11) NULL DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `dist_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_city_district1_idx` (`dist_id` ASC),
  CONSTRAINT `fk_city_district1`
    FOREIGN KEY (`dist_id`)
    REFERENCES `SMART_METER`.`district` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`branch` (
  `id` INT(11) NOT NULL,
  `code` VARCHAR(20) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `city_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_branch_city1_idx` (`city_id` ASC),
  CONSTRAINT `fk_branch_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `SMART_METER`.`city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`normal_consumption`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`normal_consumption` (
  `id` INT(11) NOT NULL,
  `day` INT(11) NULL DEFAULT NULL,
  `time` INT(11) NULL DEFAULT NULL COMMENT 'I',
  `value` DOUBLE NULL DEFAULT NULL,
  `account_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_normal_consumption_account1_idx` (`account_id` ASC),
  CONSTRAINT `fk_normal_consumption_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `SMART_METER`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`enterprie_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`enterprie_user` (
  `id` INT(11) NOT NULL,
  `employeeNo` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `fname` VARCHAR(45) NULL DEFAULT NULL,
  `lname` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `EnterpriseUserType_id` INT(11) NOT NULL,
  `normal_consumption_id` INT(11) NOT NULL,
  `branch_b_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_EnterprieUser_EnterpriseUserType1_idx` (`EnterpriseUserType_id` ASC),
  INDEX `fk_enterprie_user_normal_consumption1_idx` (`normal_consumption_id` ASC),
  INDEX `fk_enterprie_user_branch1_idx` (`branch_b_id` ASC),
  CONSTRAINT `fk_EnterprieUser_EnterpriseUserType1`
    FOREIGN KEY (`EnterpriseUserType_id`)
    REFERENCES `SMART_METER`.`enterprise_user_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_enterprie_user_branch1`
    FOREIGN KEY (`branch_b_id`)
    REFERENCES `SMART_METER`.`branch` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_enterprie_user_normal_consumption1`
    FOREIGN KEY (`normal_consumption_id`)
    REFERENCES `SMART_METER`.`normal_consumption` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`account` (
  `id` INT(11) NOT NULL,
  `accountNo` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `balance` DOUBLE NULL DEFAULT NULL,
  `line1` VARCHAR(45) NULL DEFAULT NULL,
  `line2` VARCHAR(45) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `customer_id` INT(11) NOT NULL,
  `AccountType_id` INT(11) NOT NULL,
  `createdDate` DATE NOT NULL,
  `EnterprieUser_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Account_Client1_idx` (`customer_id` ASC),
  INDEX `fk_Account_AccountType1_idx` (`AccountType_id` ASC),
  INDEX `fk_Account_EnterprieUser1_idx` (`EnterprieUser_id` ASC),
  CONSTRAINT `fk_Account_AccountType1`
    FOREIGN KEY (`AccountType_id`)
    REFERENCES `SMART_METER`.`account_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Account_Client1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `SMART_METER`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Account_EnterprieUser1`
    FOREIGN KEY (`EnterprieUser_id`)
    REFERENCES `SMART_METER`.`enterprie_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '			';


-- -----------------------------------------------------
-- Table `SMART_METER`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`payment` (
  `id` INT(11) NOT NULL,
  `date` DATE NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`bill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`bill` (
  `id` INT(11) NOT NULL,
  `date` DATE NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  `Payment_id` INT(11) NOT NULL,
  `Account_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Bill_Payment_idx` (`Payment_id` ASC),
  INDEX `fk_Bill_Account1_idx` (`Account_id` ASC),
  CONSTRAINT `fk_Bill_Account1`
    FOREIGN KEY (`Account_id`)
    REFERENCES `SMART_METER`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bill_Payment`
    FOREIGN KEY (`Payment_id`)
    REFERENCES `SMART_METER`.`payment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`rate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`rate` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `lower` DOUBLE NULL DEFAULT NULL,
  `upper` DOUBLE NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  `validSince` DATETIME NULL DEFAULT NULL,
  `RateType_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Rate_RateType1_idx` (`RateType_id` ASC),
  CONSTRAINT `fk_Rate_RateType1`
    FOREIGN KEY (`RateType_id`)
    REFERENCES `SMART_METER`.`rate_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `SMART_METER`.`usage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMART_METER`.`usage` (
  `id` INT(11) NOT NULL,
  `date` DATE NULL DEFAULT NULL,
  `time` TIME NULL DEFAULT NULL,
  `usage` DOUBLE NULL DEFAULT NULL,
  `Account_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Usage_Account1_idx` (`Account_id` ASC),
  CONSTRAINT `fk_Usage_Account1`
    FOREIGN KEY (`Account_id`)
    REFERENCES `SMART_METER`.`account` (`id`)
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
USE `SMART_METER`;
INSERT INTO `province` (`id`, `name`) VALUES (1, 'Western');
INSERT INTO `province` (`id`, `name`) VALUES (2, 'Southern');
INSERT INTO `province` (`id`, `name`) VALUES (3, 'East');

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`district`
-- -----------------------------------------------------
START TRANSACTION;
USE `SMART_METER`;
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
USE `SMART_METER`;
INSERT INTO `city` (`id`, `zip_code`, `name`, `dist_id`) VALUES (1, 12500, 'Panadura', 2);
INSERT INTO `city` (`id`, `zip_code`, `name`, `dist_id`) VALUES (2, 15000, 'Bandaragama', 2);
INSERT INTO `city` (`id`, `zip_code`, `name`, `dist_id`) VALUES (3, 11000, 'Moratuwa', 1);
INSERT INTO `city` (`id`, `zip_code`, `name`, `dist_id`) VALUES (4, 15600, 'Kelaniya', 3);
INSERT INTO `city` (`id`, `zip_code`, `name`, `dist_id`) VALUES (5, 22000, 'Kokgala', 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `SMART_METER`.`customer`
-- -----------------------------------------------------
START TRANSACTION;
USE `SMART_METER`;
INSERT INTO `customer` (`id`, `password`, `lname`, `fname`, `email`, `contact_no`, `address_line1`, `address_line2`, `city`) VALUES (1, '123', 'Fernando', 'Renuka', 'renuka@gmail.com', '076', '132', 'Ramukka', 'Banda');

COMMIT;

