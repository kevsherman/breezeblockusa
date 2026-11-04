import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const enquiries = sqliteTable('enquiries', {
 id:text('id').primaryKey(), createdAt:integer('created_at').notNull(), email:text('email').notNull(),
 name:text('name').notNull(), payload:text('payload').notNull(), status:text('status').notNull().default('new'),
 notificationStatus:text('notification_status').notNull().default('pending'),
 notificationAttempts:integer('notification_attempts').notNull().default(0),
 notificationNextAttempt:integer('notification_next_attempt').notNull().default(0),
 notificationFirstAttempt:integer('notification_first_attempt'),
 notificationLease:text('notification_lease'),
 notificationRequest:text('notification_request'),
 notificationError:text('notification_error'),
 notificationEmailId:text('notification_email_id')
}, table=>[index('enquiries_email_created').on(table.email,table.createdAt),index('enquiries_notification_due').on(table.notificationStatus,table.notificationNextAttempt)]);
