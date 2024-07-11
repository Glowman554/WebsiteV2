CREATE TABLE `downloads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`link` text NOT NULL,
	`creation_date` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
