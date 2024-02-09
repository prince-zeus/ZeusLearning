-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema WalkInPortal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema WalkInPortal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `WalkInPortal` DEFAULT CHARACTER SET utf8 ;
USE `WalkInPortal` ;

-- -----------------------------------------------------
-- Table `WalkInPortal`.`job_card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`job_card` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `dateandtime` VARCHAR(45) NOT NULL,
  `location` VARCHAR(20) NOT NULL,
  `general_instructions` TEXT NULL,
  `instructions_for_exam` TEXT NULL,
  `min_system_requirements` TEXT NULL,
  `process` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `job_card_id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`job_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`job_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `icon` VARCHAR(45) NOT NULL,
  `gross_compensastion_package` DOUBLE NULL,
  `role_description` VARCHAR(100) NULL,
  `requirements` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  `profile_image` VARCHAR(45) NULL,
  `resume` VARCHAR(45) NULL,
  `portfolio_url` VARCHAR(45) NULL,
  `reffered_name` VARCHAR(45) NULL,
  `is_email_notification` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`qualifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`qualifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`streams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`streams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`colleges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`colleges` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`educational_qualifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`educational_qualifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aggreagate_percentage` INT NOT NULL,
  `year_of_passing` INT NOT NULL,
  `college_location` VARCHAR(45) NOT NULL,
  `users_id` INT NOT NULL,
  `qualifications_id` INT NOT NULL,
  `streams_id` INT NOT NULL,
  `colleges_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_educational_qualifications_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_educational_qualifications_qualifications1_idx` (`qualifications_id` ASC) VISIBLE,
  INDEX `fk_educational_qualifications_streams1_idx` (`streams_id` ASC) VISIBLE,
  INDEX `fk_educational_qualifications_colleges1_idx` (`colleges_id` ASC) VISIBLE,
  CONSTRAINT `fk_educational_qualifications_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_educational_qualifications_qualifications1`
    FOREIGN KEY (`qualifications_id`)
    REFERENCES `WalkInPortal`.`qualifications` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_educational_qualifications_streams1`
    FOREIGN KEY (`streams_id`)
    REFERENCES `WalkInPortal`.`streams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_educational_qualifications_colleges1`
    FOREIGN KEY (`colleges_id`)
    REFERENCES `WalkInPortal`.`colleges` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`experienced_professional_qualifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`experienced_professional_qualifications` (
  `applicant_type` VARCHAR(45) NOT NULL,
  `year_of_experience` INT NOT NULL,
  `current_ctc` INT NOT NULL,
  `expected_ctc` INT NOT NULL,
  `experience_technologies` VARCHAR(45) NOT NULL,
  `familiar_technologies` VARCHAR(45) NOT NULL,
  `on_notice_period` TINYINT NOT NULL,
  `notice_period_end_date` DATETIME NULL,
  `notice_period_duration` VARCHAR(45) NULL,
  `test_appearence` TINYINT NOT NULL,
  `test_appearence_role` VARCHAR(45) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`users_id`),
  INDEX `fk_experienced_professional_qualifications_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_experienced_professional_qualifications_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`fresher_professional_qualifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`fresher_professional_qualifications` (
  `familiar_technologies` VARCHAR(45) NOT NULL,
  `test_appearence` TINYINT NOT NULL,
  `test_appearence_role` VARCHAR(45) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`users_id`),
  INDEX `fk_fresher_professional_qualifications_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_fresher_professional_qualifications_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`technology`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`technology` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`experience_technologies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`experience_technologies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `technology_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_experience_technologies_technology1_idx` (`technology_id` ASC) VISIBLE,
  INDEX `fk_experience_technologies_experienced_professional_qualifi_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_experience_technologies_technology1`
    FOREIGN KEY (`technology_id`)
    REFERENCES `WalkInPortal`.`technology` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experience_technologies_experienced_professional_qualifica1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`experienced_professional_qualifications` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`familiar_technologies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`familiar_technologies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `technology_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_familiar_technologies_technology1_idx` (`technology_id` ASC) VISIBLE,
  INDEX `fk_familiar_technologies_fresher_professional_qualification_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_familiar_technologies_technology1`
    FOREIGN KEY (`technology_id`)
    REFERENCES `WalkInPortal`.`technology` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_familiar_technologies_fresher_professional_qualifications1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`fresher_professional_qualifications` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_familiar_technologies_experienced_professional_qualificati1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`experienced_professional_qualifications` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`job_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`job_tags` (
  `job_card_id` INT NOT NULL,
  `tag` VARCHAR(45) NOT NULL,
  INDEX `fk_job_tags_job_card1_idx` (`job_card_id` ASC) VISIBLE,
  CONSTRAINT `fk_job_tags_job_card1`
    FOREIGN KEY (`job_card_id`)
    REFERENCES `WalkInPortal`.`job_card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`user_job_roles_preference`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`user_job_roles_preference` (
  `users_id` INT NOT NULL,
  `job_roles_id` INT NOT NULL,
  INDEX `fk_user_job_roles_preference_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_user_job_roles_preference_job_roles1_idx` (`job_roles_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_job_roles_preference_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_job_roles_preference_job_roles1`
    FOREIGN KEY (`job_roles_id`)
    REFERENCES `WalkInPortal`.`job_roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`time_slots`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`time_slots` (
  `id` INT NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  `job_card_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_time_slots_job_card1_idx` (`job_card_id` ASC) VISIBLE,
  CONSTRAINT `fk_time_slots_job_card1`
    FOREIGN KEY (`job_card_id`)
    REFERENCES `WalkInPortal`.`job_card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`user_applied_job_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`user_applied_job_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `resume_link` VARCHAR(45) NOT NULL,
  `time_slots_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_user_applied_job_details_time_slots1_idx` (`time_slots_id` ASC) VISIBLE,
  INDEX `fk_user_applied_job_details_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_applied_job_details_time_slots1`
    FOREIGN KEY (`time_slots_id`)
    REFERENCES `WalkInPortal`.`time_slots` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_applied_job_details_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `WalkInPortal`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WalkInPortal`.`user_applied_job_roles_preference`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WalkInPortal`.`user_applied_job_roles_preference` (
  `job_roles_id` INT NOT NULL,
  `user_applied_job_details_id` INT NOT NULL,
  INDEX `fk_user_applied_job_roles_preference_job_roles1_idx` (`job_roles_id` ASC) VISIBLE,
  INDEX `fk_user_applied_job_roles_preference_user_applied_job_detai_idx` (`user_applied_job_details_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_applied_job_roles_preference_job_roles1`
    FOREIGN KEY (`job_roles_id`)
    REFERENCES `WalkInPortal`.`job_roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_applied_job_roles_preference_user_applied_job_details1`
    FOREIGN KEY (`user_applied_job_details_id`)
    REFERENCES `WalkInPortal`.`user_applied_job_details` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Added Tables
INSERT INTO walkinportal.users (first_name, last_name, email, phone_number, profile_image, resume, portfolio_url, reffered_name, is_email_notification) VALUES
("Prince", "Dhameliya", "prince@gmail.com", 9876543210, "www.profile.com", "fksjfk", "fdfdfd", "shubham", 0);


INSERT INTO walkinportal.colleges (name) VALUES
('Indian Institute of Technology (IIT), Bombay'),
('Delhi University, Delhi'),
('All India Institute of Medical Sciences (AIIMS), New Delhi'),
('Jawaharlal Nehru University (JNU), Delhi'),
('St. Stephen\'s College, Delhi'),
('Xavier\'s College, Mumbai'),
('National Institute of Fashion Technology (NIFT), Delhi'),
('Indian Statistical Institute (ISI), Kolkata'),
('Lady Shri Ram College for Women (LSR), Delhi'),
('Christ University, Bangalore');

INSERT INTO walkinportal.qualifications(name) VALUES
('Bachelor of Science (B.Sc.) in Computer Science'),
('Master of Business Administration (MBA) in Finance'),
('Doctor of Medicine (MD) in Internal Medicine'),
('Bachelor of Arts (B.A.) in English Literature'),
('Certified Public Accountant (CPA)');

INSERT INTO walkinportal.streams(name) VALUES
('Institute of Technology'),
('Institute of Business Administration'),
('Institute of Medicine'),
('Institute of Arts and Sciences'),
('Institute of Education and Psychology');

INSERT INTO walkinportal.technology(name) VALUES
('Javascript'),
('Angular JS'),
('React'),
('Node JS');

INSERT INTO walkinportal.educational_qualifications(users_id, aggreagate_percentage, year_of_passing, qualifications_id, streams_id, colleges_id, college_location) VALUES 
(3, 85.5, 2022, 1, 1, 1, 'pune'),
(4, 85.5, 2022, 2, 2, 2, 'pune'),
(5, 85.5, 2022, 3, 3, 8, 'pune'),
(6, 85.5, 2022, 4, 4, 9, 'pune'),
(7, 85.5, 2022, 5, 1, 10, 'pune');

INSERT INTO walkinportal.experienced_professional_qualifications(users_id, year_of_experience , current_ctc , expected_ctc , on_notice_period , notice_period_end_date , notice_period_duration , test_appearence , test_appearence_role) VALUES 
(4, 1 , 500000 , 1000000 , 1 , '2024-01-02', '2 months',0,''),
(4, 2 , 500000 , 2100000 , 0 ,  '2024-01-02', '2 months',0,''),
(4, 3 , 500000 , 3100000 , 0 ,  '2024-01-02', '2 months',1,'software developer'),
(4, 4 , 500000 , 4100000 , 1 , '2024-01-02', '2 months',0,''),
(4, 5 , 500000 , 5100000 , 0 ,  '2024-01-02', '2 months',1,'software developer');

INSERT INTO walkinportal.fresher_professional_qualifications(users_id , test_appearence , test_appearence_role) VALUES 
(3, 0, ''),
(4, 1, 'Software Engineer'),
(5, 0, ''),
(6, 0, '');

INSERT INTO walkinportal.job_roles( title , icon , gross_compensastion_package , role_description , requirements) VALUES
('Instructional Designer','image/1.png',500000,'Generate highly interactive and innovative instructional strategies for e-learning solutions',' Experience in creating instructional plans and course maps.'),
('Software Engineer','image/2.png',600000,'Generate highly interactive and innovative instructional strategies for e-learning solutions',' Experience in creating instructional plans and course maps.'),
('Software Quality Engineer','image/3.png',700000,'Generate highly interactive and innovative instructional strategies for e-learning solutions',' Experience in creating instructional plans and course maps.');


INSERT INTO walkinportal.job_card(title , dateandtime , location , general_instructions , instructions_for_exam , min_system_requirements , process) VALUES
('Walk In for Designer Job Role',
'10-Jul-2021 to 11-Jul-2021',
'Mumbai',
'- We have a two-year indemnity for permanent candidates. We will provide training to the selected candidates. - Candidates who have appeared for any test held by Zeus Learning in the past 12 months will not be allowed to appear for this recruitment test.',
'- Candidates are requested to log in half an hour prior to the exam start time as they would need to capture their image using a web camera. By taking this test, you are permitting the examination system to capture your video for invigilation purposes. - Candidates would not be able to appear for the exam if the web camera attached to their system is not functional.
 - The web camera of your system must be enabled and must remain switched on throughout the examination. In the event of non-receipt of a webcam, your examination will be considered null and void. - Candidate’s audio and video will be recorded during the examination and will also be monitored by a live proctor. The proctor may terminate your exam in case he/she observes any malpractice during the exam. - Candidates are advised to use their own Laptop/PC with a stable internet connection (min 1 Mbps) during the exam.
 - Candidates cannot use an iOS system/device for this exam.',
 '- Personal Laptop or Desktop computer in working condition with good quality camera (you can use Windows 7 and above). - The latest version of Google Chrome Browser only. - Please note that Internet speed should be minimum 1 Mbps. - Do not use a MacBook or iPad for the proctored exam.',
 '- Every round is an elimination round. Candidates need to clear all rounds to get selected. Round I : 4th August, 2018 Aptitude Test : 25 Questions Round II (Interview) : 4th August, 2018.'),
('Walk In for Multiple Job Roles',
'03-Jul-2021 to 04-Jul-2021',
'Mumbai',
'- We have a two-year indemnity for permanent candidates. We will provide training to the selected candidates. - Candidates who have appeared for any test held by Zeus Learning in the past 12 months will not be allowed to appear for this recruitment test.',
'- Candidates are requested to log in half an hour prior to the exam start time as they would need to capture their image using a web camera. By taking this test, you are permitting the examination system to capture your video for invigilation purposes. - Candidates would not be able to appear for the exam if the web camera attached to their system is not functional.
 - The web camera of your system must be enabled and must remain switched on throughout the examination. In the event of non-receipt of a webcam, your examination will be considered null and void. - Candidate’s audio and video will be recorded during the examination and will also be monitored by a live proctor. The proctor may terminate your exam in case he/she observes any malpractice during the exam. - Candidates are advised to use their own Laptop/PC with a stable internet connection (min 1 Mbps) during the exam.
 - Candidates cannot use an iOS system/device for this exam.',
 '- Personal Laptop or Desktop computer in working condition with good quality camera (you can use Windows 7 and above). - The latest version of Google Chrome Browser only. - Please note that Internet speed should be minimum 1 Mbps. - Do not use a MacBook or iPad for the proctored exam.
 ',
 '- Every round is an elimination round. Candidates need to clear all rounds to get selected. Round I : 4th August, 2018 Aptitude Test : 25 Questions Round II (Interview) : 4th August, 2018.'),

('Walk In for Multiple Job Roles',
'03-Jul-2021 to 04-Jul-2021',
'Mumbai',
'- We have a two-year indemnity for permanent candidates. We will provide training to the selected candidates. - Candidates who have appeared for any test held by Zeus Learning in the past 12 months will not be allowed to appear for this recruitment test.',
'- Candidates are requested to log in half an hour prior to the exam start time as they would need to capture their image using a web camera. By taking this test, you are permitting the examination system to capture your video for invigilation purposes. - Candidates would not be able to appear for the exam if the web camera attached to their system is not functional.
 - The web camera of your system must be enabled and must remain switched on throughout the examination. In the event of non-receipt of a webcam, your examination will be considered null and void. - Candidate’s audio and video will be recorded during the examination and will also be monitored by a live proctor. The proctor may terminate your exam in case he/she observes any malpractice during the exam. - Candidates are advised to use their own Laptop/PC with a stable internet connection (min 1 Mbps) during the exam.
 - Candidates cannot use an iOS system/device for this exam.',
 '- Personal Laptop or Desktop computer in working condition with good quality camera (you can use Windows 7 and above). - The latest version of Google Chrome Browser only. - Please note that Internet speed should be minimum 1 Mbps. - Do not use a MacBook or iPad for the proctored exam.',
 '- Every round is an elimination round. Candidates need to clear all rounds to get selected. Round I : 4th August, 2018 Aptitude Test : 25 Questions Round II (Interview) : 4th August, 2018.');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
