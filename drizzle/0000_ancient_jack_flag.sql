CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `things-to-rent_booking` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`itemId` integer NOT NULL,
	`renterId` text NOT NULL,
	`startDate` integer NOT NULL,
	`endDate` integer NOT NULL,
	`totalPrice` integer NOT NULL,
	`status` text(32) DEFAULT 'pending',
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `things-to-rent_item`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`renterId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `booking_item_idx` ON `things-to-rent_booking` (`itemId`);--> statement-breakpoint
CREATE INDEX `booking_renter_idx` ON `things-to-rent_booking` (`renterId`);--> statement-breakpoint
CREATE TABLE `things-to-rent_item_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(64) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `things-to-rent_item_type_name_unique` ON `things-to-rent_item_type` (`name`);--> statement-breakpoint
CREATE TABLE `things-to-rent_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ownerId` text NOT NULL,
	`typeId` integer NOT NULL,
	`name` text(256) NOT NULL,
	`description` text(1024),
	`pricePerHour` integer,
	`pricePerDay` integer,
	`pictureList` text(2048),
	`location` text(256),
	`available` integer DEFAULT 1,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`typeId`) REFERENCES `things-to-rent_item_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `item_owner_idx` ON `things-to-rent_item` (`ownerId`);--> statement-breakpoint
CREATE INDEX `item_type_idx` ON `things-to-rent_item` (`typeId`);--> statement-breakpoint
CREATE TABLE `things-to-rent_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `things-to-rent_post` (`name`);--> statement-breakpoint
CREATE TABLE `things-to-rent_review` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`itemId` integer NOT NULL,
	`reviewerId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text(1024),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `things-to-rent_item`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reviewerId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `review_item_idx` ON `things-to-rent_review` (`itemId`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`sessionToken` text NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_sessionToken_unique` ON `session` (`sessionToken`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`emailVerified` integer,
	`image` text,
	`contactInfo` text(512),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `user_email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verificationToken_token_unique` ON `verificationToken` (`token`);