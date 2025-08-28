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
            content: `You are Nudge, an AI e-commerce assistant. Be concise, helpful, and conversion-minded. Use only provided data. If unsure, escalate.
            
Available tools:
- get_product: Search for product information
- get_order_status: Look up order by email and order ID  
- get_policy: Get shipping, returns, or warranty policies
- recommend_products: Get product recommendations

Respond in JSON format with: { "content": "your response", "tool_calls": [{"name": "tool_name", "arguments": {...}}], "needs_escalation": boolean }`
          },
          {
            role: "user", 
            content: message
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 500
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      const responseTime = Date.now() - startTime;
      
      // Process any tool calls
      if (result.tool_calls?.length > 0) {
        for (const toolCall of result.tool_calls) {
          await this.executeTool(toolCall, storeId);
        }
      }

      return {
        content: result.content || "I'm sorry, I couldn't process your request. Please try again.",
        responseTime,
        wasDeflected: !result.needs_escalation,
        revenueAttributed: this.calculateRevenueAttribution(result)
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
