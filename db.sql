CREATE TABLE `h5_static`.`pack` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`params` varchar(200) NOT NULL,
	`dev` varchar(200) NOT NULL,
	`pre` varchar(200) NOT NULL,
	`prod` varchar(200) NOT NULL,
	`version` varchar(10) NOT NULL,
	`state` int(1) NOT NULL DEFAULT 0 COMMENT '0 禁用 1 启用',
	`app_id` varchar(10) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=7 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

CREATE TABLE `h5_static`.`resource` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`app_id` varchar(10) NOT NULL,
	`version` varchar(10) NOT NULL,
	`branch` varchar(10) NOT NULL DEFAULT '' COMMENT 'dev 开发环境 pre 预发布环境 prod 生产环境',
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=2 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;