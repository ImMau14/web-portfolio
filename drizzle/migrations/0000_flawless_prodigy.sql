CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`link` text,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`github_url` text,
	`live_url` text,
	`technologies` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);