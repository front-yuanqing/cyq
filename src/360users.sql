# Host: localhost  (Version: 5.5.53)
# Date: 2020-12-10 21:20:06
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "360users"
#

CREATE TABLE `360users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "360users"
#

INSERT INTO `360users` VALUES (1,'yuanqing','123456','上帝'),(2,'guoxiang','223322','翔哥'),(3,'zhenxiang','666666','王老板');
