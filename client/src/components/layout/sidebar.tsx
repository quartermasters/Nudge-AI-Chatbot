import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "fas fa-chart-line" },
    { name: "Chat Widget", href: "/chat-widget", icon: "fas fa-comments" },
    { name: "Cart Recovery", href: "/cart-recovery", icon: "fas fa-shopping-cart" },
    { name: "Knowledge Base", href: "/knowledge-base", icon: "fas fa-book" },
    { name: "Analytics", href: "/analytics", icon: "fas fa-chart-bar" },
    { name: "Settings", href: "/settings", icon: "fas fa-cog" },
  ];

  const integrations = [
    { name: "Shopify", status: "Connected", statusColor: "text-green-600", bgColor: "bg-green-100", dotColor: "bg-green-500" },
    { name: "Twilio", status: "Connected", statusColor: "text-green-600", bgColor: "bg-green-100", dotColor: "bg-green-500" },
    { name: "Klaviyo", status: "Setup Required", statusColor: "text-orange-600", bgColor: "bg-orange-100", dotColor: "bg-orange-500" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col" data-testid="sidebar">
      {/* Header */}
      <div className="p-6 border-b border-border" data-testid="sidebar-header">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" data-testid="logo">
            <i className="fas fa-robot text-primary-foreground text-sm"></i>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground" data-testid="app-name">Nudge</h1>
            <p className="text-xs text-muted-foreground" data-testid="app-description">AI E-commerce Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4" data-testid="sidebar-navigation">
        <div className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md font-medium transition-colors cursor-pointer",
                location === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              )} data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <i className={`${item.icon} w-4`}></i>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Integrations */}
        <div className="mt-8 pt-4 border-t border-border" data-testid="integrations-section">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3" data-testid="integrations-title">
            Integrations
          </h3>
          <div className="space-y-2">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center space-x-3 px-3 py-2" data-testid={`integration-${integration.name.toLowerCase()}`}>
                <div className={cn("w-4 h-4 rounded flex items-center justify-center", integration.bgColor)}>
                  <div className={cn("w-2 h-2 rounded-full", integration.dotColor)}></div>
                </div>
                <span className="text-sm text-foreground" data-testid={`integration-name-${integration.name.toLowerCase()}`}>
                  {integration.name}
                </span>
                <span className={cn("text-xs ml-auto", integration.statusColor)} data-testid={`integration-status-${integration.name.toLowerCase()}`}>
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border" data-testid="sidebar-footer">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center" data-testid="user-avatar">
            <i className="fas fa-user text-muted-foreground text-sm"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground" data-testid="user-name">Haroon Haider</p>
            <p className="text-xs text-muted-foreground" data-testid="user-role">Team Lead</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground" data-testid="user-menu">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </aside>
  );
}
