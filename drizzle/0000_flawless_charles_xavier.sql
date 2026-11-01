CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`notification_status` text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enquiries_email_created` ON `enquiries` (`email`,`created_at`);