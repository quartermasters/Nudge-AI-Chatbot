export default function ChartsSection() {
  const recoveryData = [
    { label: "Abandoned Carts", value: 1247, percentage: 100, color: "bg-chart-1" },
    { label: "SMS Sent (15m)", value: 891, percentage: 71, color: "bg-chart-2" },
    { label: "Email Sent (4h)", value: 623, percentage: 50, color: "bg-chart-3" },
    { label: "Recovered Orders", value: 231, percentage: 18.5, color: "bg-green-500" },
  ];

  // Mock data for chat performance over the last 7 days
  const chatPerformanceData = [
    { day: "Mon", conversations: 180, deflected: 156, escalated: 24 },
    { day: "Tue", conversations: 220, deflected: 189, escalated: 31 },
    { day: "Wed", conversations: 195, deflected: 171, escalated: 24 },
    { day: "Thu", conversations: 240, deflected: 198, escalated: 42 },
    { day: "Fri", conversations: 285, deflected: 239, escalated: 46 },
    { day: "Sat", conversations: 165, deflected: 142, escalated: 23 },
    { day: "Sun", conversations: 145, deflected: 125, escalated: 20 },
  ];

  const maxConversations = Math.max(...chatPerformanceData.map(d => d.conversations));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" data-testid="charts-section">
      {/* Chat Performance Chart */}
      <div className="bg-card rounded-lg border border-border p-6" data-testid="chat-performance-chart">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground" data-testid="chart-title-performance">Chat Performance</h3>
          <select className="text-sm border border-border rounded-md px-3 py-1 bg-background" data-testid="select-time-range">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="h-64 relative" data-testid="chat-performance-data">
          {/* Chart Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-2">
            <span>{maxConversations}</span>
            <span>{Math.round(maxConversations * 0.75)}</span>
            <span>{Math.round(maxConversations * 0.5)}</span>
            <span>{Math.round(maxConversations * 0.25)}</span>
            <span>0</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-8 h-full flex items-end justify-between gap-1 border-l border-b border-border pl-4 pb-4">
            {chatPerformanceData.map((item, index) => {
              const conversationHeight = (item.conversations / maxConversations) * 100;
              const deflectedHeight = (item.deflected / maxConversations) * 100;
              const escalatedHeight = (item.escalated / maxConversations) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full max-w-12 mb-2" style={{ height: '200px' }}>
                    {/* Total conversations bar */}
                    <div 
                      className="absolute bottom-0 w-full bg-chart-1 rounded-t opacity-30"
                      style={{ height: `${conversationHeight}%` }}
                      title={`Total: ${item.conversations}`}
                    ></div>
                    {/* Deflected conversations bar */}
                    <div 
                      className="absolute bottom-0 w-full bg-green-500 rounded-t"
                      style={{ height: `${deflectedHeight}%` }}
                      title={`Deflected: ${item.deflected}`}
                    ></div>
                    {/* Escalated conversations bar */}
                    <div 
                      className="absolute bottom-0 w-full bg-red-500"
                      style={{ height: `${escalatedHeight}%` }}
                      title={`Escalated: ${item.escalated}`}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="absolute top-0 right-0 flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-chart-1 opacity-30 rounded"></div>
              <span>Total</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Deflected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Escalated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Recovery Funnel */}
      <div className="bg-card rounded-lg border border-border p-6" data-testid="cart-recovery-chart">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground" data-testid="chart-title-recovery">Cart Recovery Funnel</h3>
          <button className="text-sm text-primary hover:text-primary/80" data-testid="button-view-details">View Details</button>
        </div>
        <div className="space-y-6">
          {recoveryData.map((item, index) => (
            <div key={index} data-testid={`recovery-item-${index}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground font-medium" data-testid={`recovery-label-${index}`}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" data-testid={`recovery-value-${index}`}>{item.value.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`${item.color} h-3 rounded-full transition-all duration-500 ease-in-out relative overflow-hidden`} 
                    style={{ width: `${item.percentage}%` }}
                    data-testid={`recovery-bar-${index}`}
                  >
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-transparent opacity-20 animate-pulse"></div>
                  </div>
                </div>
                {/* Conversion rate indicator */}
                {index === recoveryData.length - 1 && (
                  <div className="mt-2 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      <i className="fas fa-arrow-up mr-1"></i>
                      18.5% Recovery Rate
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Summary metrics */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-foreground">$42,750</div>
                <div className="text-xs text-muted-foreground">Revenue Recovered</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">$185</div>
                <div className="text-xs text-muted-foreground">Avg Order Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
