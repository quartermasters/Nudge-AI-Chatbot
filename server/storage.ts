import { 
  stores, products, knowledgeBaseItems, conversations, cartRecoveryEvents, analytics,
  users, type User, type InsertUser, type Store, type InsertStore, 
  type Product, type InsertProduct, type KnowledgeBaseItem, type InsertKnowledgeBaseItem,
  type Conversation, type InsertConversation, type CartRecoveryEvent, type InsertCartRecoveryEvent,
  type Analytics, type InsertAnalytics
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Legacy user methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Store methods
  getStore(id: string): Promise<Store | undefined>;
  getStoreByDomain(domain: string): Promise<Store | undefined>;
  createStore(store: InsertStore): Promise<Store>;
  updateStore(id: string, updates: Partial<Store>): Promise<Store>;
  
  // Product methods
  getProducts(storeId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product>;
  
  // Knowledge base methods
  getKnowledgeBaseItems(storeId: string): Promise<KnowledgeBaseItem[]>;
  createKnowledgeBaseItem(item: InsertKnowledgeBaseItem): Promise<KnowledgeBaseItem>;
  updateKnowledgeBaseItem(id: string, updates: Partial<KnowledgeBaseItem>): Promise<KnowledgeBaseItem>;
  deleteKnowledgeBaseItem(id: string): Promise<void>;
  
  // Conversation methods
  getConversations(storeId: string, limit?: number): Promise<Conversation[]>;
  getRecentConversations(storeId: string, limit: number): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: string, updates: Partial<Conversation>): Promise<Conversation>;
  
  // Cart recovery methods
  getCartRecoveryEvents(storeId: string): Promise<CartRecoveryEvent[]>;
  createCartRecoveryEvent(event: InsertCartRecoveryEvent): Promise<CartRecoveryEvent>;
  updateCartRecoveryEvent(id: string, updates: Partial<CartRecoveryEvent>): Promise<CartRecoveryEvent>;
  
  // Analytics methods
  getAnalytics(storeId: string, fromDate?: string, toDate?: string): Promise<Analytics[]>;
  getLatestAnalytics(storeId: string): Promise<Analytics | undefined>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getRecentActivity(storeId: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // Legacy user methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Store methods
  async getStore(id: string): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.id, id));
    return store || undefined;
  }

  async getStoreByDomain(domain: string): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.shopifyDomain, domain));
    return store || undefined;
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const [store] = await db.insert(stores).values(insertStore).returning();
    return store;
  }

  async updateStore(id: string, updates: Partial<Store>): Promise<Store> {
    const [store] = await db.update(stores)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(stores.id, id))
      .returning();
    return store;
  }

  // Product methods
  async getProducts(storeId: string): Promise<Product[]> {
    return await db.select().from(products)
      .where(eq(products.storeId, storeId))
      .orderBy(desc(products.createdAt));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values([insertProduct]).returning();
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const [product] = await db.update(products)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  // Knowledge base methods
  async getKnowledgeBaseItems(storeId: string): Promise<KnowledgeBaseItem[]> {
    return await db.select().from(knowledgeBaseItems)
      .where(and(eq(knowledgeBaseItems.storeId, storeId), eq(knowledgeBaseItems.isActive, true)))
      .orderBy(desc(knowledgeBaseItems.createdAt));
  }

  async createKnowledgeBaseItem(insertItem: InsertKnowledgeBaseItem): Promise<KnowledgeBaseItem> {
    const [item] = await db.insert(knowledgeBaseItems).values(insertItem).returning();
    return item;
  }

  async updateKnowledgeBaseItem(id: string, updates: Partial<KnowledgeBaseItem>): Promise<KnowledgeBaseItem> {
    const [item] = await db.update(knowledgeBaseItems)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(knowledgeBaseItems.id, id))
      .returning();
    return item;
  }

  async deleteKnowledgeBaseItem(id: string): Promise<void> {
    await db.update(knowledgeBaseItems)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(knowledgeBaseItems.id, id));
  }

  // Conversation methods
  async getConversations(storeId: string, limit = 50): Promise<Conversation[]> {
    return await db.select().from(conversations)
      .where(eq(conversations.storeId, storeId))
      .orderBy(desc(conversations.createdAt))
      .limit(limit);
  }

  async getRecentConversations(storeId: string, limit: number): Promise<Conversation[]> {
    return await db.select().from(conversations)
      .where(eq(conversations.storeId, storeId))
      .orderBy(desc(conversations.createdAt))
      .limit(limit);
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const [conversation] = await db.insert(conversations).values([insertConversation]).returning();
    return conversation;
  }

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<Conversation> {
    const [conversation] = await db.update(conversations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(conversations.id, id))
      .returning();
    return conversation;
  }

  // Cart recovery methods
  async getCartRecoveryEvents(storeId: string): Promise<CartRecoveryEvent[]> {
    return await db.select().from(cartRecoveryEvents)
      .where(eq(cartRecoveryEvents.storeId, storeId))
      .orderBy(desc(cartRecoveryEvents.createdAt));
  }

  async createCartRecoveryEvent(insertEvent: InsertCartRecoveryEvent): Promise<CartRecoveryEvent> {
    const [event] = await db.insert(cartRecoveryEvents).values([insertEvent]).returning();
    return event;
  }

  async updateCartRecoveryEvent(id: string, updates: Partial<CartRecoveryEvent>): Promise<CartRecoveryEvent> {
    const [event] = await db.update(cartRecoveryEvents)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(cartRecoveryEvents.id, id))
      .returning();
    return event;
  }

  // Analytics methods
  async getAnalytics(storeId: string, fromDate?: string, toDate?: string): Promise<Analytics[]> {
    if (fromDate && toDate) {
      return await db.select().from(analytics)
        .where(and(
          eq(analytics.storeId, storeId),
          gte(analytics.date, new Date(fromDate)),
          lte(analytics.date, new Date(toDate))
        ))
        .orderBy(desc(analytics.date));
    }
    
    return await db.select().from(analytics)
      .where(eq(analytics.storeId, storeId))
      .orderBy(desc(analytics.date));
  }

  async getLatestAnalytics(storeId: string): Promise<Analytics | undefined> {
    const [latest] = await db.select().from(analytics)
      .where(eq(analytics.storeId, storeId))
      .orderBy(desc(analytics.date))
      .limit(1);
    return latest || undefined;
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const [analyticsRecord] = await db.insert(analytics).values(insertAnalytics).returning();
    return analyticsRecord;
  }

  async getRecentActivity(storeId: string): Promise<any> {
    const recentConversations = await this.getRecentConversations(storeId, 5);
    const recentRecoveryEvents = await db.select().from(cartRecoveryEvents)
      .where(eq(cartRecoveryEvents.storeId, storeId))
      .orderBy(desc(cartRecoveryEvents.createdAt))
      .limit(5);

    return {
      conversations: recentConversations,
      recoveryEvents: recentRecoveryEvents
    };
  }
}

export const storage = new DatabaseStorage();
