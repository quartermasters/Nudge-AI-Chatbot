export default function Analytics() {
  return (
    <div className="min-h-screen" data-testid="analytics-page">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4" data-testid="analytics-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="page-title">Analytics</h2>
            <p className="text-muted-foreground" data-testid="page-description">
              Deep dive into your AI assistant performance and ROI
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-border rounded-md text-sm bg-background" data-testid="select-date-range">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90" data-testid="button-export-analytics">
              Export Report
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6" data-testid="analytics-content">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-testid="key-metrics">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="metric-conversations">Total Conversations</h3>
            <p className="text-3xl font-bold text-foreground mt-1" data-testid="metric-conversations-value">12,847</p>
            <p className="text-xs text-green-600 mt-1">+23% from previous period</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="metric-deflection">Deflection Rate</h3>
            <p className="text-3xl font-bold text-foreground mt-1" data-testid="metric-deflection-value">42.3%</p>
            <p className="text-xs text-green-600 mt-1">Above 35% target</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="metric-satisfaction">Customer Satisfaction</h3>
            <p className="text-3xl font-bold text-foreground mt-1" data-testid="metric-satisfaction-value">4.7/5</p>
            <p className="text-xs text-green-600 mt-1">89% positive feedback</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="metric-revenue">Revenue Impact</h3>
            <p className="text-3xl font-bold text-foreground mt-1" data-testid="metric-revenue-value">$47,320</p>
            <p className="text-xs text-green-600 mt-1">12.8% uplift this period</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" data-testid="analytics-charts">
          {/* Conversation Trends */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="chart-conversation-trends">Conversation Trends</h3>
            <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <i className="fas fa-chart-line text-4xl text-muted-foreground mb-2"></i>
                <p className="text-muted-foreground">Line chart showing daily conversation volume</p>
              </div>
            </div>
          </div>

          {/* Intent Distribution */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="chart-intent-distribution">Intent Distribution</h3>
            <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <i className="fas fa-chart-pie text-4xl text-muted-foreground mb-2"></i>
                <p className="text-muted-foreground">Pie chart showing conversation intents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-card rounded-lg border border-border" data-testid="performance-table">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground" data-testid="performance-title">Performance by Intent</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Intent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Conversations</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Deflection Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg Response Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">CSAT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Revenue Impact</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                <tr data-testid="intent-product-qa">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">Product Q&A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">4,523</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">78%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">0.7s</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">4.8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">$18,420</td>
                </tr>
                <tr data-testid="intent-order-status">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">Order Status</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">3,201</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">92%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">0.4s</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">4.9</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">$0</td>
                </tr>
                <tr data-testid="intent-returns">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">Returns/Refunds</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">2,103</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">45%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">1.2s</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">4.3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">-$2,100</td>
                </tr>
                <tr data-testid="intent-size-guide">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">Size Guide</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">1,820</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">84%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">0.9s</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">4.7</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">$12,300</td>
                </tr>
                <tr data-testid="intent-general">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">General Inquiry</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">1,200</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">23%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">1.5s</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">4.5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">$8,700</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
