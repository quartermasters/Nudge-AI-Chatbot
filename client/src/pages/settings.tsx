import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    shopify: "",
    twilio: "",
    sendgrid: "",
  });

  const [chatSettings, setChatSettings] = useState({
    welcomeMessage: "Hi! I'm your AI shopping assistant. How can I help you today?",
    maxResponseTime: 2000,
    enableHumanHandoff: true,
    confidenceThreshold: 0.7,
  });

  const [recoverySettings, setRecoverySettings] = useState({
    enableSMS: true,
    enableEmail: true,
    smsDelay15m: true,
    emailDelay4h: true,
    followUpDelay24h: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    performanceReports: true,
    weeklyDigest: true,
    errorNotifications: true,
  });

  return (
    <div className="min-h-screen" data-testid="settings-page">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4" data-testid="settings-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="page-title">Settings</h2>
            <p className="text-muted-foreground" data-testid="page-description">
              Configure your AI assistant and integrations
            </p>
          </div>
          <Button data-testid="button-save-settings">
            <i className="fas fa-save mr-2"></i>
            Save Changes
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6" data-testid="settings-content">
        <Tabs defaultValue="general" className="space-y-6" data-testid="settings-tabs">
          <TabsList className="grid w-full grid-cols-5" data-testid="settings-tabs-list">
            <TabsTrigger value="general" data-testid="tab-general">General</TabsTrigger>
            <TabsTrigger value="integrations" data-testid="tab-integrations">Integrations</TabsTrigger>
            <TabsTrigger value="chat" data-testid="tab-chat">Chat Widget</TabsTrigger>
            <TabsTrigger value="recovery" data-testid="tab-recovery">Cart Recovery</TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" data-testid="tab-content-general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-store-info">Store Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-store-name">Store Name</label>
                    <Input defaultValue="Acme Store" data-testid="input-store-name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-store-domain">Shopify Domain</label>
                    <Input defaultValue="acme-store.myshopify.com" disabled data-testid="input-store-domain" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-store-email">Contact Email</label>
                    <Input defaultValue="support@acmestore.com" data-testid="input-store-email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-timezone">Timezone</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background" data-testid="select-timezone">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-6 (Central Time)</option>
                      <option>UTC-7 (Mountain Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-ai-settings">AI Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-ai-model">AI Model</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background" data-testid="select-ai-model">
                      <option>GPT-5 (Recommended)</option>
                      <option>GPT-4</option>
                      <option>GPT-3.5 Turbo</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-response-style">Response Style</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background" data-testid="select-response-style">
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Casual</option>
                      <option>Concise</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-max-tokens">Max Response Length</label>
                    <Input type="number" defaultValue="150" data-testid="input-max-tokens" />
                    <p className="text-xs text-muted-foreground mt-1">Maximum words in AI responses</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-enable-learning">Enable Learning</label>
                      <p className="text-xs text-muted-foreground">Allow AI to learn from conversations</p>
                    </div>
                    <Switch defaultChecked data-testid="switch-enable-learning" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" data-testid="tab-content-integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-api-keys">API Keys</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Secure credentials for external service integrations
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-openai-key">OpenAI API Key</label>
                    <Input 
                      type="password" 
                      placeholder="sk-..." 
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys({...apiKeys, openai: e.target.value})}
                      data-testid="input-openai-key"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-shopify-key">Shopify API Key</label>
                    <Input 
                      type="password" 
                      placeholder="Connected via OAuth"
                      disabled
                      data-testid="input-shopify-key"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-twilio-key">Twilio Auth Token</label>
                    <Input 
                      type="password" 
                      placeholder="Enter auth token"
                      value={apiKeys.twilio}
                      onChange={(e) => setApiKeys({...apiKeys, twilio: e.target.value})}
                      data-testid="input-twilio-key"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-sendgrid-key">SendGrid API Key</label>
                    <Input 
                      type="password" 
                      placeholder="SG...."
                      value={apiKeys.sendgrid}
                      onChange={(e) => setApiKeys({...apiKeys, sendgrid: e.target.value})}
                      data-testid="input-sendgrid-key"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-connection-status">Connection Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between" data-testid="status-shopify">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Shopify</span>
                      </div>
                      <span className="text-xs text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between" data-testid="status-openai">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">OpenAI</span>
                      </div>
                      <span className="text-xs text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between" data-testid="status-twilio">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Twilio</span>
                      </div>
                      <span className="text-xs text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between" data-testid="status-sendgrid">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">SendGrid</span>
                      </div>
                      <span className="text-xs text-orange-600">Setup Required</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat Widget Settings */}
          <TabsContent value="chat" data-testid="tab-content-chat">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-widget-behavior">Widget Behavior</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-welcome-message">Welcome Message</label>
                    <Textarea 
                      value={chatSettings.welcomeMessage}
                      onChange={(e) => setChatSettings({...chatSettings, welcomeMessage: e.target.value})}
                      rows={3}
                      data-testid="textarea-welcome-message"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-max-response-time">Max Response Time (ms)</label>
                    <Input 
                      type="number" 
                      value={chatSettings.maxResponseTime}
                      onChange={(e) => setChatSettings({...chatSettings, maxResponseTime: parseInt(e.target.value)})}
                      data-testid="input-max-response-time"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-confidence-threshold">Confidence Threshold</label>
                    <Input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      max="1"
                      value={chatSettings.confidenceThreshold}
                      onChange={(e) => setChatSettings({...chatSettings, confidenceThreshold: parseFloat(e.target.value)})}
                      data-testid="input-confidence-threshold"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Minimum confidence to avoid human handoff (0-1)</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-human-handoff">Enable Human Handoff</label>
                      <p className="text-xs text-muted-foreground">Escalate complex queries to human agents</p>
                    </div>
                    <Switch 
                      checked={chatSettings.enableHumanHandoff}
                      onCheckedChange={(checked) => setChatSettings({...chatSettings, enableHumanHandoff: checked})}
                      data-testid="switch-human-handoff"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-widget-appearance">Widget Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-widget-position">Widget Position</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background" data-testid="select-widget-position">
                      <option>Bottom Right</option>
                      <option>Bottom Left</option>
                      <option>Top Right</option>
                      <option>Top Left</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-primary-color">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <input type="color" defaultValue="#3b82f6" className="w-8 h-8 border border-border rounded" data-testid="input-primary-color" />
                      <Input defaultValue="#3b82f6" data-testid="input-primary-color-hex" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-widget-size">Widget Size</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background" data-testid="select-widget-size">
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-show-avatar">Show AI Avatar</label>
                      <p className="text-xs text-muted-foreground">Display robot icon in chat</p>
                    </div>
                    <Switch defaultChecked data-testid="switch-show-avatar" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cart Recovery Settings */}
          <TabsContent value="recovery" data-testid="tab-content-recovery">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-recovery-channels">Recovery Channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-enable-sms">SMS Recovery</label>
                      <p className="text-xs text-muted-foreground">Send SMS reminders for abandoned carts</p>
                    </div>
                    <Switch 
                      checked={recoverySettings.enableSMS}
                      onCheckedChange={(checked) => setRecoverySettings({...recoverySettings, enableSMS: checked})}
                      data-testid="switch-enable-sms"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-enable-email">Email Recovery</label>
                      <p className="text-xs text-muted-foreground">Send email reminders for abandoned carts</p>
                    </div>
                    <Switch 
                      checked={recoverySettings.enableEmail}
                      onCheckedChange={(checked) => setRecoverySettings({...recoverySettings, enableEmail: checked})}
                      data-testid="switch-enable-email"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-recovery-timing">Recovery Timing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-sms-15m">15 Minute SMS</label>
                      <p className="text-xs text-muted-foreground">Quick SMS reminder after cart abandonment</p>
                    </div>
                    <Switch 
                      checked={recoverySettings.smsDelay15m}
                      onCheckedChange={(checked) => setRecoverySettings({...recoverySettings, smsDelay15m: checked})}
                      data-testid="switch-sms-15m"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-email-4h">4 Hour Email</label>
                      <p className="text-xs text-muted-foreground">Follow-up email with discount offer</p>
                    </div>
                    <Switch 
                      checked={recoverySettings.emailDelay4h}
                      onCheckedChange={(checked) => setRecoverySettings({...recoverySettings, emailDelay4h: checked})}
                      data-testid="switch-email-4h"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-followup-24h">24 Hour Follow-up</label>
                      <p className="text-xs text-muted-foreground">Final reminder with special offer</p>
                    </div>
                    <Switch 
                      checked={recoverySettings.followUpDelay24h}
                      onCheckedChange={(checked) => setRecoverySettings({...recoverySettings, followUpDelay24h: checked})}
                      data-testid="switch-followup-24h"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-recovery-templates">Message Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-sms-template">SMS Template (15min)</label>
                    <Textarea 
                      defaultValue="You left {{items}} in your cart. Complete your order: {{link}}"
                      rows={2}
                      data-testid="textarea-sms-template"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-email-subject">Email Subject (4h)</label>
                    <Input defaultValue="Still thinking it over?" data-testid="input-email-subject" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-email-template">Email Template (4h)</label>
                    <Textarea 
                      defaultValue="Your cart is waiting. Here's a {{discount}} valid for 24h: {{code}}."
                      rows={3}
                      data-testid="textarea-email-template"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" data-testid="tab-content-notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-email-notifications">Email Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-email-alerts">System Alerts</label>
                      <p className="text-xs text-muted-foreground">Critical system notifications</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailAlerts: checked})}
                      data-testid="switch-email-alerts"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-performance-reports">Performance Reports</label>
                      <p className="text-xs text-muted-foreground">Daily performance summaries</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.performanceReports}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, performanceReports: checked})}
                      data-testid="switch-performance-reports"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-weekly-digest">Weekly Digest</label>
                      <p className="text-xs text-muted-foreground">Weekly analytics summary</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyDigest: checked})}
                      data-testid="switch-weekly-digest"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground" data-testid="label-error-notifications">Error Notifications</label>
                      <p className="text-xs text-muted-foreground">API errors and failures</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.errorNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, errorNotifications: checked})}
                      data-testid="switch-error-notifications"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle data-testid="card-title-alert-preferences">Alert Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-alert-email">Alert Email Address</label>
                    <Input defaultValue="admin@acmestore.com" data-testid="input-alert-email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-alert-threshold">Response Time Alert (ms)</label>
                    <Input type="number" defaultValue="2000" data-testid="input-alert-threshold" />
                    <p className="text-xs text-muted-foreground mt-1">Alert when response time exceeds this value</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground" data-testid="label-error-threshold">Error Rate Alert (%)</label>
                    <Input type="number" defaultValue="5" data-testid="input-error-threshold" />
                    <p className="text-xs text-muted-foreground mt-1">Alert when error rate exceeds this percentage</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
