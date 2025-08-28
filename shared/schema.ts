import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stores = pgTable("stores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shopifyDomain: text("shopify_domain").notNull().unique(),
  accessToken: text("access_token").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storeId: varchar("store_id").notNull().references(() => stores.id),
  shopifyProductId: text("shopify_product_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  variants: jsonb("variants").$type<Array<{
    id: string;
    sku: string;
    price: number;
    inventory: number;
    attributes: Record<string, any>;
  }>>(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const knowledgeBaseItems = pgTable("knowledge_base_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storeId: varchar("store_id").notNull().references(() => stores.id),
  type: text("type").notNull(), // 'faq', 'policy', 'size_guide'
  title: text("title").notNull(),
  content: text("content").notNull(),
  tags: text("tags").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storeId: varchar("store_id").notNull().references(() => stores.id),
  sessionId: text("session_id").notNull(),
  customerEmail: text("customer_email"),
  messages: jsonb("messages").$type<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>(),
  status: text("status").default('active'), // 'active', 'resolved', 'escalated'
  responseTime: integer("response_time_ms"),
  wasDeflected: boolean("was_deflected").default(false),
  revenueAttributed: decimal("revenue_attributed", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartRecoveryEvents = pgTable("cart_recovery_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storeId: varchar("store_id").notNull().references(() => stores.id),
  checkoutId: text("checkout_id").notNull(),
  customerEmail: text("customer_email").notNull(),
  cartItems: jsonb("cart_items").$type<Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
  }>>(),
  totalValue: decimal("total_value", { precision: 10, scale: 2 }),
  channel: text("channel").notNull(), // 'sms', 'email'
  trigger: text("trigger").notNull(), // '15m', '4h', '24h'
  delivered: boolean("delivered").default(false),
  clicked: boolean("clicked").default(false),
  converted: boolean("converted").default(false),
  orderId: text("order_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storeId: varchar("store_id").notNull().references(() => stores.id),
  date: timestamp("date").notNull(),
  deflectionRate: decimal("deflection_rate", { precision: 5, scale: 4 }),
  cartRecoveryRate: decimal("cart_recovery_rate", { precision: 5, scale: 4 }),
  avgResponseTime: integer("avg_response_time_ms"),
  revenueImpact: decimal("revenue_impact", { precision: 10, scale: 2 }),
  conversationsCount: integer("conversations_count").default(0),
  escalationsCount: integer("escalations_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  knowledgeBaseItems: many(knowledgeBaseItems),
  conversations: many(conversations),
  cartRecoveryEvents: many(cartRecoveryEvents),
  analytics: many(analytics),
}));

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
}));

export const knowledgeBaseItemsRelations = relations(knowledgeBaseItems, ({ one }) => ({
  store: one(stores, {
    fields: [knowledgeBaseItems.storeId],
    references: [stores.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one }) => ({
  store: one(stores, {
    fields: [conversations.storeId],
    references: [stores.id],
  }),
}));

export const cartRecoveryEventsRelations = relations(cartRecoveryEvents, ({ one }) => ({
  store: one(stores, {
    fields: [cartRecoveryEvents.storeId],
    references: [stores.id],
  }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  store: one(stores, {
    fields: [analytics.storeId],
    references: [stores.id],
  }),
}));

// Insert schemas
export const insertStoreSchema = createInsertSchema(stores).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertKnowledgeBaseItemSchema = createInsertSchema(knowledgeBaseItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCartRecoveryEventSchema = createInsertSchema(cartRecoveryEvents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  createdAt: true,
});

// Types
export type Store = typeof stores.$inferSelect;
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type KnowledgeBaseItem = typeof knowledgeBaseItems.$inferSelect;
export type InsertKnowledgeBaseItem = z.infer<typeof insertKnowledgeBaseItemSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type CartRecoveryEvent = typeof cartRecoveryEvents.$inferSelect;
export type InsertCartRecoveryEvent = z.infer<typeof insertCartRecoveryEventSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;

// Keep legacy user schema for compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
