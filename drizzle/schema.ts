import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, index, foreignKey, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const thingsToRentItemType = sqliteTable("things-to-rent_item_type", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text({ length: 64 }).notNull(),
},
(table) => [
	uniqueIndex("things-to-rent_item_type_name_unique").on(table.name),
]);

export const thingsToRentPost = sqliteTable("things-to-rent_post", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text({ length: 256 }),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer(),
},
(table) => [
	index("name_idx").on(table.name),
]);

export const thingsToRentBooking = sqliteTable("things-to-rent_booking", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	itemId: integer().notNull().references(() => thingsToRentItem.id, { onDelete: "cascade" } ),
	renterId: text().notNull().references(() => user.id, { onDelete: "cascade" } ),
	startDate: integer().notNull(),
	endDate: integer().notNull(),
	totalPrice: integer().notNull(),
	status: text({ length: 32 }).default("pending"),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
},
(table) => [
	index("booking_renter_idx").on(table.renterId),
	index("booking_item_idx").on(table.itemId),
]);

export const thingsToRentItem = sqliteTable("things-to-rent_item", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	ownerId: text().notNull().references(() => user.id, { onDelete: "cascade" } ),
	typeId: integer().notNull().references(() => thingsToRentItemType.id),
	name: text({ length: 256 }).notNull(),
	description: text({ length: 1024 }),
	pricePerHour: integer(),
	pricePerDay: integer(),
	pictureList: text({ length: 2048 }),
	location: text({ length: 256 }),
	available: integer().default(1),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer(),
},
(table) => [
	index("item_type_idx").on(table.typeId),
	index("item_owner_idx").on(table.ownerId),
]);

export const thingsToRentReview = sqliteTable("things-to-rent_review", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	itemId: integer().notNull().references(() => thingsToRentItem.id, { onDelete: "cascade" } ),
	reviewerId: text().notNull().references(() => user.id, { onDelete: "cascade" } ),
	rating: integer().notNull(),
	comment: text({ length: 1024 }),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
},
(table) => [
	index("review_item_idx").on(table.itemId),
]);

