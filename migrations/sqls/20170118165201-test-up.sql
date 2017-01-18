DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `name` varchar(200) NOT NULL DEFAULT '', `department_id` int(11) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
LOCK TABLES `department` WRITE;
INSERT INTO `department` (`id`, `name`, `department_id`) VALUES (1, "Marketing", 1), (2, "Support", 2);
UNLOCK TABLES;