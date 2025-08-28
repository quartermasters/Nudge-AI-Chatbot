import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertConversationSchema, insertCartRecoveryEventSchema, insertKnowledgeBaseItemSchema } from "@shared/schema";
import { openaiService } from "./services/openai";
// import { shopifyService } from "./services/shopify";
// import { twilioService } from "./services/twilio";
// import { sendgridService } from "./services/sendgrid";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId, storeId, email } = req.body;
      
      if (!message || !sessionId || !storeId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Get store info or create demo store
      let store = await storage.getStore(storeId);
      if (!store && storeId === 'demo-store') {
        // Create demo store for widget testing
        store = await storage.createStore({
          shopifyDomain: 'demo.myshopify.com',
          accessToken: 'demo-token',
          name: 'Demo Store',
          email: 'demo@example.com'
        });
      }
      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }

      // Process message with OpenAI
      const response = await openaiService.processMessage(message, storeId, sessionId);
      
      // Save conversation
      await storage.createConversation({
        storeId,
        sessionId,
        customerEmail: email,
        messages: [
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: response.content, timestamp: new Date().toISOString() }
        ],
        responseTime: response.responseTime,
        wasDeflected: response.wasDeflected,
        revenueAttributed: response.revenueAttributed?.toString()
      });

      res.json({ 
        message: response.content, 
        responseTime: response.responseTime,
        wasDeflected: response.wasDeflected
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Chat Widget API - simplified endpoint for chat widget
  app.post("/api/chat/message", async (req, res) => {
    try {
      const { message, conversationId } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Use default store for widget demo
      const storeId = "demo-store";
      const sessionId = conversationId || "widget-session";

      // Process message with OpenAI
      const response = await openaiService.processMessage(message, storeId, sessionId);

      res.json({ 
        message: response.content, 
        responseTime: response.responseTime
      });
    } catch (error) {
      console.error("Chat widget error:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Get conversation history
  app.get("/api/conversations/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const conversation = await storage.getConversationBySession(sessionId);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      res.json(conversation);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  // Shopify OAuth - commented out for now
  /*
  app.get("/api/shopify/auth", (req, res) => {
    const { shop } = req.query;
    if (!shop) {
      return res.status(400).json({ error: "Shop parameter required" });
    }
    const authUrl = shopifyService.getAuthUrl(shop as string);
    res.redirect(authUrl);
  });

  app.get("/api/shopify/callback", async (req, res) => {
    try {
      const { code, shop } = req.query;
      if (!code || !shop) {
        return res.status(400).json({ error: "Missing authorization code or shop" });
      }

      const accessToken = await shopifyService.exchangeCodeForToken(code as string, shop as string);
      
      // Save store
      await storage.createStore({
        shopifyDomain: shop as string,
        accessToken,
        name: shop as string,
        email: '', // Will be updated from Shopify API
        isActive: true
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Shopify callback error:", error);
      res.status(500).json({ error: "Failed to complete authentication" });
    }
  });
  */

  // Webhooks - commented out for now
  /*
  app.post("/api/webhooks/shopify/carts/update", async (req, res) => {
    try {
      const cartData = req.body;
      // Process cart update for recovery
      await shopifyService.processCartUpdate(cartData);
      res.status(200).send('OK');
    } catch (error) {
      console.error("Cart update webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });

  app.post("/api/webhooks/shopify/checkouts/create", async (req, res) => {
    try {
      const checkoutData = req.body;
      // Schedule cart recovery
      await shopifyService.scheduleCartRecovery(checkoutData);
      res.status(200).send('OK');
    } catch (error) {
      console.error("Checkout create webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });
  */

  // Analytics
  app.get("/api/analytics/:storeId", async (req, res) => {
    try {
      const { storeId } = req.params;
      const { from, to } = req.query;
      
      const analytics = await storage.getAnalytics(storeId, from as string, to as string);
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Dashboard data
  app.get("/api/dashboard/:storeId", async (req, res) => {
    try {
      const { storeId } = req.params;
      
      const [conversations, analytics, recentActivity] = await Promise.all([
        storage.getRecentConversations(storeId, 10),
        storage.getLatestAnalytics(storeId),
        storage.getRecentActivity(storeId)
      ]);

      res.json({
        conversations,
        analytics,
        recentActivity
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  // Knowledge Base management
  app.get("/api/knowledge-base/:storeId", async (req, res) => {
    try {
      const { storeId } = req.params;
      const items = await storage.getKnowledgeBaseItems(storeId);
      res.json(items);
    } catch (error) {
      console.error("Knowledge base fetch error:", error);
      res.status(500).json({ error: "Failed to fetch knowledge base" });
    }
  });

  app.post("/api/knowledge-base", async (req, res) => {
    try {
      const validatedData = insertKnowledgeBaseItemSchema.parse(req.body);
      const item = await storage.createKnowledgeBaseItem(validatedData);
      res.json(item);
    } catch (error) {
      console.error("Knowledge base create error:", error);
      res.status(500).json({ error: "Failed to create knowledge base item" });
    }
  });

  app.put("/api/knowledge-base/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const item = await storage.updateKnowledgeBaseItem(id, updates);
      res.json(item);
    } catch (error) {
      console.error("Knowledge base update error:", error);
      res.status(500).json({ error: "Failed to update knowledge base item" });
    }
  });

  app.delete("/api/knowledge-base/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteKnowledgeBaseItem(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Knowledge base delete error:", error);
      res.status(500).json({ error: "Failed to delete knowledge base item" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
