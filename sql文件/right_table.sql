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

 Date: 01/11/2022 19:23:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for right_table
-- ----------------------------
DROP TABLE IF EXISTS `right_table`;
CREATE TABLE `right_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pagepermission` tinyint(1) NULL DEFAULT 1,
  `grade` int NOT NULL DEFAULT 1,
  `father_right_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of right_table
-- ----------------------------
INSERT INTO `right_table` VALUES (1, '求职首页', '/home', 1, 1, NULL);
INSERT INTO `right_table` VALUES (2, '个人简历', '/profile', 1, 1, NULL);
INSERT INTO `right_table` VALUES (3, '简历编辑', '/profile/edit', 1, 2, 2);
INSERT INTO `right_table` VALUES (4, '我的投递', '/applylist', 1, 1, NULL);
INSERT INTO `right_table` VALUES (5, '职位管理', '/position_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (6, '新建职位', '/position_manage/add', 1, 2, 5);
INSERT INTO `right_table` VALUES (7, '职位列表', '/position_manage/list', 1, 2, 5);
INSERT INTO `right_table` VALUES (8, '公司信息', '/company_info', 1, 1, NULL);
INSERT INTO `right_table` VALUES (9, '求职者管理', '/user_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (10, 'hr管理', '/hr_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (11, 'hr审核', '/hr_manage/audit', 1, 2, 10);
INSERT INTO `right_table` VALUES (12, 'hr列表', '/hr_manage/list', 1, 2, 10);
INSERT INTO `right_table` VALUES (13, '全站职位管理', '/admin_position_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (14, '职位审核', '/admin_position_manage/audit', 1, 2, 13);
INSERT INTO `right_table` VALUES (15, '职位列表', '/admin_position_manage/list', 1, 2, 13);
INSERT INTO `right_table` VALUES (16, '职位分类', '/position_category', 1, 2, 13);

SET FOREIGN_KEY_CHECKS = 1;
