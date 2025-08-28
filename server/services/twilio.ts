import twilio from 'twilio';

class TwilioService {
  private client: twilio.Twilio;
  private fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_SID || process.env.TWILIO_SID_ENV_VAR || "default_sid";
    const authToken = process.env.TWILIO_TOKEN || process.env.TWILIO_TOKEN_ENV_VAR || "default_token";
    this.fromNumber = process.env.TWILIO_FROM_NUMBER || "+1234567890";
    
    this.client = twilio(accountSid, authToken);
  }

  async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: to
      });
      return true;
    } catch (error) {
      console.error('Twilio SMS error:', error);
      return false;
    }
  }

  async sendCartRecoverySMS(to: string, items: any[], cartUrl: string): Promise<boolean> {
    const itemNames = items.map(item => item.title).join(', ');
    const message = `You left ${itemNames} in your cart. Complete your order: ${cartUrl}`;
    
    return this.sendSMS(to, message);
  }
}

export const twilioService = new TwilioService();
