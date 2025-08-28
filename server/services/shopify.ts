class ShopifyService {
  private clientId = process.env.SHOPIFY_CLIENT_ID || process.env.SHOPIFY_CLIENT_ID_ENV_VAR || "default_id";
  private clientSecret = process.env.SHOPIFY_CLIENT_SECRET || process.env.SHOPIFY_CLIENT_SECRET_ENV_VAR || "default_secret";
  private scopes = process.env.SHOPIFY_SCOPES || "read_products,read_orders,read_customers,write_checkouts";

  getAuthUrl(shop: string): string {
    const redirectUri = `${process.env.REPLIT_DOMAINS?.split(',')[0] || 'http://localhost:5000'}/api/shopify/callback`;
    
    return `https://${shop}.myshopify.com/admin/oauth/authorize?` +
      `client_id=${this.clientId}&` +
      `scope=${this.scopes}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `state=nonce`;
  }

  async exchangeCodeForToken(code: string, shop: string): Promise<string> {
    const response = await fetch(`https://${shop}.myshopify.com/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for access token');
    }

    const data = await response.json();
    return data.access_token;
  }

  async getProducts(shop: string, accessToken: string): Promise<any[]> {
    const response = await fetch(`https://${shop}.myshopify.com/admin/api/2023-10/products.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products;
  }

  async getOrder(shop: string, accessToken: string, orderId: string): Promise<any> {
    const response = await fetch(`https://${shop}.myshopify.com/admin/api/2023-10/orders/${orderId}.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    const data = await response.json();
    return data.order;
  }

  async processCartUpdate(cartData: any): Promise<void> {
    // Process cart update webhook
    console.log('Processing cart update:', cartData);
    // Implementation would track cart changes for recovery
  }

  async scheduleCartRecovery(checkoutData: any): Promise<void> {
    // Schedule cart recovery campaigns
    console.log('Scheduling cart recovery for checkout:', checkoutData);
    // Implementation would create recovery events with different timing
  }

  async createWebhook(shop: string, accessToken: string, topic: string, address: string): Promise<any> {
    const response = await fetch(`https://${shop}.myshopify.com/admin/api/2023-10/webhooks.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webhook: {
          topic,
          address,
          format: 'json'
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create webhook');
    }

    return response.json();
  }
}

export const shopifyService = new ShopifyService();
