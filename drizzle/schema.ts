import { pgSchema, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const blogsSchema = pgSchema('blogstest');

export const blogs = blogsSchema.table('blogs', {
    id: serial('id').primaryKey().default(sql`nextval('blogstest.blogs_id_seq')`),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    content: text('content').notNull(),
    featuredImage: text('featured_image'),
    author: varchar('author', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
});
