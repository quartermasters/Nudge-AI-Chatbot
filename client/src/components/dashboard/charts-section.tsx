export default function ChartsSection() {
  const recoveryData = [
    { label: "Abandoned Carts", value: 1247, percentage: 100, color: "bg-chart-1" },
    { label: "SMS Sent (15m)", value: 891, percentage: 71, color: "bg-chart-2" },
    { label: "Email Sent (4h)", value: 623, percentage: 50, color: "bg-chart-3" },
    { label: "Recovered Orders", value: 231, percentage: 18.5, color: "bg-green-500" },
  ];

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
        <div className="h-64 flex items-center justify-center bg-muted rounded-lg" data-testid="chart-placeholder">
          <div className="text-center">
            <i className="fas fa-chart-line text-4xl text-muted-foreground mb-2"></i>
            <p className="text-muted-foreground" data-testid="chart-placeholder-text">Chart visualization would be rendered here</p>
          </div>
        </div>
      </div>

      {/* Cart Recovery Funnel */}
      <div className="bg-card rounded-lg border border-border p-6" data-testid="cart-recovery-chart">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground" data-testid="chart-title-recovery">Cart Recovery Funnel</h3>
          <button className="text-sm text-primary hover:text-primary/80" data-testid="button-view-details">View Details</button>
        </div>
        <div className="space-y-4">
          {recoveryData.map((item, index) => (
            <div key={index} data-testid={`recovery-item-${index}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground" data-testid={`recovery-label-${index}`}>{item.label}</span>
                <span className="text-sm font-medium" data-testid={`recovery-value-${index}`}>{item.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-1">
                <div 
                  className={`${item.color} h-2 rounded-full`} 
                  style={{ width: `${item.percentage}%` }}
                  data-testid={`recovery-bar-${index}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
