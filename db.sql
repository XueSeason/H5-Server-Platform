CREATE TABLE `h5_static`.`pack` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`app_id` varchar(10) NOT NULL,
	`version` varchar(10) NOT NULL,
	`name` varchar(50) NOT NULL,
	`params` varchar(200) NOT NULL,
	`dev` varchar(200) NOT NULL,
	`pre` varchar(200) NOT NULL,
	`prod` varchar(200) NOT NULL,
	`state` int(1) NOT NULL DEFAULT 1 COMMENT '0 禁用 1 启用',
	PRIMARY KEY (`id`),
	INDEX `pack_index` USING BTREE (`app_id`, `version`) comment ''
) ENGINE=`InnoDB` AUTO_INCREMENT=11 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

CREATE TABLE `h5_static`.`resource` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`app_id` varchar(10) NOT NULL,
	`version` varchar(10) NOT NULL,
	`branch` varchar(10) NOT NULL DEFAULT '' COMMENT 'dev 开发环境 pre 预发布环境 prod 生产环境',
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=10 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

CREATE TABLE `h5_static`.`account` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(10) NOT NULL,
	`password` varchar(50) NOT NULL,
	`role` int(2) NOT NULL DEFAULT 0,
	`mail` varchar(50) NOT NULL,
	PRIMARY KEY (`id`),
	INDEX `accountIndex` USING BTREE (`username`) comment '',
	INDEX `mailIndex` USING BTREE (`mail`) comment ''
) ENGINE=`InnoDB` AUTO_INCREMENT=4 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;