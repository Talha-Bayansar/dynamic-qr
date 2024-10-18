import {
  pgTable,
  point,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique().notNull(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripeProductId: text("stripe_product_id"),
  planName: varchar("plan_name", { length: 50 }),
  subscriptionStatus: varchar("subscription_status", { length: 20 }),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const emailVerificationCodeTable = pgTable("email_verification_code", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const qrCodeTable = pgTable("qr_code", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: serial("code").notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  value: text("value").notNull(),
  type: text("type", {
    enum: ["url", "text", "vcard", "message", "email"],
  }).notNull(),
});

export const analyticsTable = pgTable("analytics", {
  id: serial("id").primaryKey(),
  qrCodeId: serial("qr_code_id")
    .notNull()
    .references(() => qrCodeTable.id, { onDelete: "cascade" }),
  ip: text("ip"),
  timestamp: timestamp("timestamp").defaultNow(),
  city: text("city"),
  country: text("country"),
  region: text("region"),
  coordinates: point("coordinates"),
});

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;
export type Session = typeof sessionTable.$inferSelect;
export type NewSession = typeof sessionTable.$inferInsert;
export type EmailVerificationCode =
  typeof emailVerificationCodeTable.$inferSelect;
export type NewEmailVerificationCode =
  typeof emailVerificationCodeTable.$inferInsert;
export type QRCode = typeof qrCodeTable.$inferSelect;
export type NewQRCode = typeof qrCodeTable.$inferInsert;
export type Analytics = typeof analyticsTable.$inferSelect;
export type NewAnalytics = typeof analyticsTable.$inferInsert;
