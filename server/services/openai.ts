import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

interface ChatResponse {
  content: string;
  responseTime: number;
  wasDeflected: boolean;
  revenueAttributed?: number;
}

interface ToolCall {
  name: string;
  arguments: Record<string, any>;
}

class OpenAIService {
  async processMessage(message: string, storeId: string, sessionId: string): Promise<ChatResponse> {
    const startTime = Date.now();
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are Nudge, an AI e-commerce assistant developed by Quartermasters for online stores. Be helpful, friendly, and professional. Answer customer questions about products, orders, shipping, and policies. Keep responses concise and conversational.

Key Guidelines:
- Be personable and conversational, not robotic
- Ask clarifying questions when needed
- Provide specific, actionable help
- If you don't know something, be honest and offer to connect them with support
- Use emojis sparingly but appropriately to add warmth
- Keep responses under 100 words unless more detail is needed

For product questions: Help them find what they're looking for, ask about preferences, budget, or use case
For order questions: Ask for order number or email to help track shipments
For policy questions: Provide clear, helpful information about returns, shipping, warranties
For general questions: Be helpful and try to guide them to what they need

Always aim to be helpful and move the conversation toward a positive outcome.`
          },
          {
            role: "user", 
            content: message
          }
        ],
        max_tokens: 300
      });

      const content = response.choices[0].message.content || "I'm sorry, I couldn't process your request. Please try again.";
      const responseTime = Date.now() - startTime;

      return {
        content,
        responseTime,
        wasDeflected: true, // Assume most responses deflect from human support
        revenueAttributed: 0
      };

    } catch (error) {
      console.error("OpenAI processing error:", error);
      const responseTime = Date.now() - startTime;
      
      return {
        content: "I'm experiencing technical difficulties. Please contact our support team for immediate assistance.",
        responseTime,
        wasDeflected: false
      };
    }
  }

  private async executeTool(toolCall: ToolCall, storeId: string): Promise<any> {
    switch (toolCall.name) {
      case 'get_product':
        return this.getProduct(toolCall.arguments.sku_or_query, storeId);
      case 'get_order_status':
        return this.getOrderStatus(toolCall.arguments.email, toolCall.arguments.order_id, storeId);
      case 'get_policy':
        return this.getPolicy(toolCall.arguments.topic, storeId);
      case 'recommend_products':
        return this.recommendProducts(toolCall.arguments.product_id, toolCall.arguments.limit, storeId);
      default:
        return null;
    }
  }

  private async getProduct(query: string, storeId: string): Promise<any> {
    // Implementation would search products in database
    // For now, return placeholder structure
    return {
      id: "product_1",
      title: "Sample Product",
      variants: [],
      in_stock: true
    };
  }

  private async getOrderStatus(email: string, orderId: string, storeId: string): Promise<any> {
    // Implementation would query Shopify API for order status
    return {
      order_id: orderId,
      status: "shipped",
      tracking_number: "1Z999AA1234567890"
    };
  }

  private async getPolicy(topic: string, storeId: string): Promise<any> {
    // Implementation would query knowledge base for policies
    return {
      topic,
      content: "Policy information would be retrieved from knowledge base"
    };
  }

  private async recommendProducts(productId: string, limit: number, storeId: string): Promise<any> {
    // Implementation would generate product recommendations
    return {
      recommendations: []
    };
  }

  private calculateRevenueAttribution(result: any): number {
    // Logic to calculate revenue attribution based on conversation outcome
    return 0;
  }
}

export const openaiService = new OpenAIService();
