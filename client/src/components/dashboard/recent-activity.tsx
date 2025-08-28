export default function RecentActivity() {
  const conversations = [
    {
      initials: "JD",
      email: "john.doe@email.com",
      message: "Asked about size guide for Nike Air Max",
      status: "Resolved",
      statusColor: "bg-green-100 text-green-800",
      responseTime: "0.6s",
      timeAgo: "2 min ago",
      avatarBg: "bg-primary",
      avatarText: "text-primary-foreground",
    },
    {
      initials: "SA",
      email: "sarah.adams@email.com",
      message: "Order status inquiry #ORD-2024-001",
      status: "Automated",
      statusColor: "bg-blue-100 text-blue-800",
      responseTime: "0.4s",
      timeAgo: "5 min ago",
      avatarBg: "bg-secondary",
      avatarText: "text-secondary-foreground",
    },
    {
      initials: "MJ",
      email: "mike.johnson@email.com",
      message: "Return policy question - escalated to human",
      status: "Escalated",
      statusColor: "bg-orange-100 text-orange-800",
      responseTime: "1.2s",
      timeAgo: "8 min ago",
      avatarBg: "bg-accent",
      avatarText: "text-accent-foreground",
    },
  ];

  const systemStatus = [
    { name: "AI Service", status: "Operational", color: "text-green-600", dotColor: "bg-green-500" },
    { name: "Shopify API", status: "Connected", color: "text-green-600", dotColor: "bg-green-500" },
    { name: "SMS Gateway", status: "Active", color: "text-green-600", dotColor: "bg-green-500" },
    { name: "Database", status: "High Load", color: "text-yellow-600", dotColor: "bg-yellow-500" },
  ];

  const alerts = [
    { message: "High response time detected", time: "2 min ago", type: "warning" },
    { message: "Catalog sync completed", time: "15 min ago", type: "success" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="recent-activity">
      {/* Recent Conversations */}
      <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6" data-testid="recent-conversations">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground" data-testid="conversations-title">Recent Conversations</h3>
          <button className="text-sm text-primary hover:text-primary/80" data-testid="button-view-all-conversations">View All</button>
        </div>
        <div className="space-y-4">
          {conversations.map((conversation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent" data-testid={`conversation-${index}`}>
              <div className={`w-8 h-8 ${conversation.avatarBg} rounded-full flex items-center justify-center ${conversation.avatarText} text-sm font-medium`} data-testid={`conversation-avatar-${index}`}>
                {conversation.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground" data-testid={`conversation-email-${index}`}>{conversation.email}</p>
                  <span className="text-xs text-muted-foreground" data-testid={`conversation-time-${index}`}>{conversation.timeAgo}</span>
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`conversation-message-${index}`}>{conversation.message}</p>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${conversation.statusColor}`} data-testid={`conversation-status-${index}`}>
                    {conversation.status}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2" data-testid={`conversation-response-time-${index}`}>Response: {conversation.responseTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card rounded-lg border border-border p-6" data-testid="system-status">
        <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="system-status-title">System Status</h3>
        <div className="space-y-4">
          {systemStatus.map((system, index) => (
            <div key={index} className="flex items-center justify-between" data-testid={`system-${index}`}>
              <span className="text-sm text-foreground" data-testid={`system-name-${index}`}>{system.name}</span>
              <div className="flex items-center">
                <div className={`w-2 h-2 ${system.dotColor} rounded-full mr-2`} data-testid={`system-dot-${index}`}></div>
                <span className={`text-xs ${system.color}`} data-testid={`system-status-${index}`}>{system.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border" data-testid="alerts-section">
          <h4 className="text-sm font-medium text-foreground mb-3" data-testid="alerts-title">Recent Alerts</h4>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-2 border rounded-md ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
              }`} data-testid={`alert-${index}`}>
                <p className={`text-xs ${alert.type === 'warning' ? 'text-yellow-800' : 'text-green-800'}`} data-testid={`alert-message-${index}`}>
                  {alert.message}
                </p>
                <p className={`text-xs ${alert.type === 'warning' ? 'text-yellow-600' : 'text-green-600'}`} data-testid={`alert-time-${index}`}>
                  {alert.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
