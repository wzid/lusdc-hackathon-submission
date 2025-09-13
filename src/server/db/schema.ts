// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, sqliteTableCreator, sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `things-to-rent_${name}`,
);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);



// Users: account info - Updated to work with NextAuth (text IDs)
export const users = sqliteTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: integer("emailVerified", { mode: "timestamp" }),
    image: text("image"),
    contactInfo: text("contactInfo", { length: 512 }),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  },
  (t) => [index("user_email_idx").on(t.email)]
);

// NextAuth required tables - using standard names without prefix
export const accounts = sqliteTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({
    columns: [account.provider, account.providerAccountId],
  }),
}));

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

export const verificationTokens = sqliteTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").unique().notNull(),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
}, (vt) => ({
  compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
}));



// Item types: bike, moped, kayak, etc
export const itemTypes = createTable(
  "item_type",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 64 }).notNull().unique(),
  })
);

// Items for rent
export const items = createTable(
  "item",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    ownerId: d.text().references(() => users.id, { onDelete: "cascade" }).notNull(),
    typeId: d.integer({ mode: "number" }).references(() => itemTypes.id).notNull(),
    name: d.text({ length: 256 }).notNull(),
    description: d.text({ length: 1024 }),
    pricePerHour: d.integer({ mode: "number" }),
    pricePerDay: d.integer({ mode: "number" }),
    pictureList: d.text({ length: 2048 }), // Store JSON.stringify([...])
    location: d.text({ length: 256 }),
    available: d.integer({ mode: "number" }).default(1), // 1 = available, 0 = not
    createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("item_owner_idx").on(t.ownerId), index("item_type_idx").on(t.typeId)]
);

// Bookings
export const bookings = createTable(
  "booking",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    itemId: d.integer({ mode: "number" }).references(() => items.id, { onDelete: "cascade" }).notNull(),
    renterId: d.text().references(() => users.id, { onDelete: "cascade" }).notNull(),
    startDate: d.integer({ mode: "timestamp" }).notNull(),
    endDate: d.integer({ mode: "timestamp" }).notNull(),
    totalPrice: d.integer({ mode: "number" }).notNull(),
    status: d.text({ length: 32 }).default("pending"), // pending, confirmed, cancelled
    createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  }),
  (t) => [index("booking_item_idx").on(t.itemId), index("booking_renter_idx").on(t.renterId)]
);

// Reviews
export const reviews = createTable(
  "review",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    itemId: d.integer({ mode: "number" }).references(() => items.id, { onDelete: "cascade" }).notNull(),
    reviewerId: d.text().references(() => users.id, { onDelete: "cascade" }).notNull(),
    rating: d.integer({ mode: "number" }).notNull(), // 1-5
    comment: d.text({ length: 1024 }),
    createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  }),
  (t) => [index("review_item_idx").on(t.itemId)]
);
