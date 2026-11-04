ALTER TABLE `enquiries` ADD `notification_attempts` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `notification_next_attempt` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `notification_first_attempt` integer;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `notification_lease` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `notification_request` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `notification_error` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `notification_email_id` text;--> statement-breakpoint
CREATE INDEX `enquiries_notification_due` ON `enquiries` (`notification_status`,`notification_next_attempt`);