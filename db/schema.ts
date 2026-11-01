import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const enquiries = sqliteTable('enquiries', {
 id:text('id').primaryKey(), createdAt:integer('created_at').notNull(), email:text('email').notNull(),
 name:text('name').notNull(), payload:text('payload').notNull(), status:text('status').notNull().default('new'),
 notificationStatus:text('notification_status').notNull().default('pending')
}, table=>[index('enquiries_email_created').on(table.email,table.createdAt)]);
