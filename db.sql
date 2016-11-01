CREATE TABLE `h5_static`.`<table_name>` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`params` varchar(200) NOT NULL,
	`dev` varchar(200) NOT NULL,
	`pre` varchar(200) NOT NULL,
	`prod` varchar(200) NOT NULL,
	`version` varchar(200) NOT NULL,
	`fallback` varchar(200) NOT NULL,
	`state` bit(1) NOT NULL COMMENT '0 禁用 1 启用',
	`app_id` varchar(10) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=3 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;