import ChatWidget from "@/components/chat/chat-widget";

export default function ChatWidgetPage() {
  return (
    <div className="min-h-screen" data-testid="chat-widget-page">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4" data-testid="chat-widget-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="page-title">Chat Widget</h2>
            <p className="text-muted-foreground" data-testid="page-description">
              Configure and test your customer chat widget
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6" data-testid="chat-widget-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="bg-card rounded-lg border border-border p-6" data-testid="widget-config">
            <h3 className="text-lg font-semibold text-foreground mb-4">Widget Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Welcome Message</label>
                <textarea 
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm bg-background"
                  rows={3}
                  defaultValue="Hi! I'm your AI shopping assistant. How can I help you today?"
                  data-testid="input-welcome-message"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Theme Color</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input type="color" defaultValue="#3b82f6" className="w-8 h-8 border border-border rounded" data-testid="input-theme-color" />
                  <span className="text-sm text-muted-foreground">Primary color for the chat widget</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="show-avatar" defaultChecked className="rounded" data-testid="checkbox-show-avatar" />
                <label htmlFor="show-avatar" className="text-sm text-foreground">Show AI avatar</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="collect-email" defaultChecked className="rounded" data-testid="checkbox-collect-email" />
                <label htmlFor="collect-email" className="text-sm text-foreground">Collect visitor email</label>
              </div>
            </div>
          </div>

          {/* Widget Preview */}
          <div className="bg-card rounded-lg border border-border p-6" data-testid="widget-preview">
            <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
            <div className="bg-muted rounded-lg p-4 h-80 relative">
              <p className="text-sm text-muted-foreground text-center mt-32">
                Widget preview appears here
              </p>
              <div className="text-center mt-4">
                <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <i className="fas fa-comments"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mt-6 bg-card rounded-lg border border-border p-6" data-testid="installation-instructions">
          <h3 className="text-lg font-semibold text-foreground mb-4">Installation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add the following script to your website before the closing &lt;/body&gt; tag:
          </p>
          <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto" data-testid="installation-code">
            <code>{`<script src="https://cdn.nudge.ai/widget.js" data-store="your-store-id"></script>`}</code>
          </div>
        </div>
      </div>

      {/* Chat Widget Demo */}
      <ChatWidget />
    </div>
  );
}
