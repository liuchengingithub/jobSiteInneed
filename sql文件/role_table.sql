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

 Date: 01/11/2022 19:23:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for role_table
-- ----------------------------
DROP TABLE IF EXISTS `role_table`;
CREATE TABLE `role_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `roleType` int NOT NULL,
  `rights` json NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_table
-- ----------------------------
INSERT INTO `role_table` VALUES (1, '求职者', 1, '[\"/profile\", \"/profile/edit\", \"/applylist\"]');
INSERT INTO `role_table` VALUES (2, 'hr', 2, '[\"/position_manage\", \"/position_add\", \"/position_edit\", \"/company_info\"]');
INSERT INTO `role_table` VALUES (3, 'admin', 3, '[\"/hr_manage\", \"/hr_manage/audit\", \"/hr_manage/list\", \"/user_manage\", \"/admin_position_manage\", \"/admin_position_manage/audit\", \"/admin_position_manage/list\", \"/position_category\"]');

SET FOREIGN_KEY_CHECKS = 1;
