CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`creation_date` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
