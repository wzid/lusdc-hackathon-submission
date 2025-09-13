import { relations } from "drizzle-orm/relations";
import { user, thingsToRentBooking, thingsToRentItem, thingsToRentItemType, thingsToRentReview } from "./schema";

export const thingsToRentBookingRelations = relations(thingsToRentBooking, ({one}) => ({
	user: one(user, {
		fields: [thingsToRentBooking.renterId],
		references: [user.id]
	}),
	thingsToRentItem: one(thingsToRentItem, {
		fields: [thingsToRentBooking.itemId],
		references: [thingsToRentItem.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	thingsToRentBookings: many(thingsToRentBooking),
	thingsToRentItems: many(thingsToRentItem),
	thingsToRentReviews: many(thingsToRentReview),
}));

export const thingsToRentItemRelations = relations(thingsToRentItem, ({one, many}) => ({
	thingsToRentBookings: many(thingsToRentBooking),
	thingsToRentItemType: one(thingsToRentItemType, {
		fields: [thingsToRentItem.typeId],
		references: [thingsToRentItemType.id]
	}),
	user: one(user, {
		fields: [thingsToRentItem.ownerId],
		references: [user.id]
	}),
	thingsToRentReviews: many(thingsToRentReview),
}));

export const thingsToRentItemTypeRelations = relations(thingsToRentItemType, ({many}) => ({
	thingsToRentItems: many(thingsToRentItem),
}));

export const thingsToRentReviewRelations = relations(thingsToRentReview, ({one}) => ({
	user: one(user, {
		fields: [thingsToRentReview.reviewerId],
		references: [user.id]
	}),
	thingsToRentItem: one(thingsToRentItem, {
		fields: [thingsToRentReview.itemId],
		references: [thingsToRentItem.id]
	}),
}));