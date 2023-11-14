CREATE TABLE `userimage` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) NOT NULL,
  `imageContent` varchar(255) NOT NULL,
  `imageFileName` varchar(255) DEFAULT NULL,
  `imageOriginalName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`seq`)
)