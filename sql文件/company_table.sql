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

 Date: 01/11/2022 19:21:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for company_table
-- ----------------------------
DROP TABLE IF EXISTS `company_table`;
CREATE TABLE `company_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `roleId` int NOT NULL,
  `roleState` tinyint(1) NULL DEFAULT 1 COMMENT '有效状态',
  `companyName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `introduction` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '公司介绍',
  `position` json NULL,
  `avatar` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company_table
-- ----------------------------
INSERT INTO `company_table` VALUES (1, 'amazon', 'Qwer4321', 2, 1, '亚马逊', NULL, '[1, 2]', NULL);
INSERT INTO `company_table` VALUES (2, 'rakuten', 'Qwer4321', 2, 0, '乐天', NULL, '[3, 4]', NULL);
INSERT INTO `company_table` VALUES (3, 'google@google.com', 'Qwer4321', 2, 1, '谷歌', '\"\"', '\"\"', '\"\"');
INSERT INTO `company_table` VALUES (11, 'apple@apple.com', 'Qwer4321', 2, 1, '苹果', '\"\"', '\"\"', '\"\"');
INSERT INTO `company_table` VALUES (12, '12345@qq.com', 'Qwer4321', 2, 1, '123', '\"\"', '\"\"', '\"\"');

SET FOREIGN_KEY_CHECKS = 1;
