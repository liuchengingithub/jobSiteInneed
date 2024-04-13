/*
 Navicat MySQL Data Transfer

 Source Server         : demo
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : inneed

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 01/11/2022 19:20:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application_table
-- ----------------------------
DROP TABLE IF EXISTS `application_table`;
CREATE TABLE `application_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `positionId` int NOT NULL,
  `positionName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `companyId` int NOT NULL,
  `companyName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `userId` int NOT NULL,
  `userName` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `resumeId` int NOT NULL,
  `applyState` int NOT NULL COMMENT '0:\'收到简历\', 1:\'已邀请面试\', 2:\'简历已拒绝\', 3:\'面试中\', 4:\'求职者拒绝面试邀请\', 5:\'面试已通过\', 6:\'面试未通过\', 7:\'所应聘职位已下线\'',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of application_table
-- ----------------------------
INSERT INTO `application_table` VALUES (1, 1, '中级前端工程师', 1, '亚马逊', 1, '佐藤', 1, 1);
INSERT INTO `application_table` VALUES (2, 2, '高级前端工程师', 2, '乐天', 1, '佐藤', 1, 2);
INSERT INTO `application_table` VALUES (3, 2, 'Java开发工程师', 1, '亚马逊', 2, '小野', 2, 3);
INSERT INTO `application_table` VALUES (4, 4, 'C++开发工程师', 2, '乐天', 2, '小野', 2, 3);
INSERT INTO `application_table` VALUES (5, 4, 'C++开发工程师', 2, '乐天', 1, '佐藤', 1, 0);
INSERT INTO `application_table` VALUES (26, 3, 'Java开发工程师', 1, '亚马逊', 2, '小野', 2, 1);

SET FOREIGN_KEY_CHECKS = 1;
