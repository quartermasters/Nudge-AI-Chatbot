import { MailService } from '@sendgrid/mail';

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(
  apiKey: string,
  params: EmailParams
): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email send');
    return false;
  }
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

class SendGridService {
  private fromEmail = process.env.SENDGRID_FROM_EMAIL || "noreply@nudge.ai";

  async sendCartRecoveryEmail(to: string, items: any[], cartUrl: string, template: 'email_4h' | 'email_24h' = 'email_4h'): Promise<boolean> {
    const itemNames = items.map(item => item.title).join(', ');
    
    const templates = {
      email_4h: {
        subject: "Still thinking it over?",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your cart is waiting for you!</h2>
            <p>You left these items in your cart: <strong>${itemNames}</strong></p>
            <p>Complete your purchase before they're gone!</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${cartUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Complete Your Order
              </a>
            </div>
          </div>
        `
      },
      email_24h: {
        subject: "Last chance - 10% off your cart!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Don't miss out! 10% off your cart</h2>
            <p>Your cart with <strong>${itemNames}</strong> is still waiting.</p>
            <p>Use code <strong>SAVE10</strong> for 10% off - valid for 24 hours only!</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${cartUrl}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Claim Your Discount
              </a>
            </div>
          </div>
        `
      }
    };

    const selectedTemplate = templates[template];

    return this.sendEmail({
      to,
      from: this.fromEmail,
      subject: selectedTemplate.subject,
      html: selectedTemplate.html
    });
  }

  async sendEmail(params: Omit<EmailParams, 'from'> & { from?: string }): Promise<boolean> {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid not configured, skipping email send');
      return false;
    }
    try {
      await mailService.send({
        to: params.to,
        from: params.from || this.fromEmail,
        subject: params.subject,
        text: params.text,
        html: params.html,
      });
      return true;
    } catch (error) {
      console.error('SendGrid email error:', error);
      return false;
    }
  }

  async sendSystemAlert(to: string, title: string, message: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">${title}</h2>
        <p>${message}</p>
        <p style="color: #6b7280; font-size: 14px;">
          This is an automated message from your Nudge AI assistant.
        </p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: `Nudge Alert: ${title}`,
      html
    });
  }

  async sendPerformanceReport(to: string, reportData: any): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Daily Performance Report</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Metric</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Value</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Conversations</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${reportData.conversations || 0}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Deflection Rate</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${reportData.deflectionRate || '0%'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Cart Recovery</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${reportData.cartRecovery || '0%'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Revenue Impact</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">$${reportData.revenue || '0'}</td>
          </tr>
        </table>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: "Daily Performance Report - Nudge AI",
      html
    });
  }
}

export const sendgridService = new SendGridService();
