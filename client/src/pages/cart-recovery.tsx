export default function CartRecovery() {
  const campaigns = [
    { name: "15 Minute SMS", trigger: "15 minutes", channel: "SMS", status: "Active", sent: 1247, recovered: 89 },
    { name: "4 Hour Email", trigger: "4 hours", channel: "Email", status: "Active", sent: 623, recovered: 67 },
    { name: "24 Hour Follow-up", trigger: "24 hours", channel: "Email", status: "Active", sent: 231, recovered: 23 },
  ];

  return (
    <div className="min-h-screen" data-testid="cart-recovery-page">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4" data-testid="cart-recovery-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="page-title">Cart Recovery</h2>
            <p className="text-muted-foreground" data-testid="page-description">
              Automated campaigns to recover abandoned carts
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90" data-testid="button-new-campaign">
            <i className="fas fa-plus mr-2"></i>
            New Campaign
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6" data-testid="cart-recovery-content">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-testid="recovery-stats">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="stat-abandoned-carts">Abandoned Carts</h3>
            <p className="text-2xl font-bold text-foreground mt-1" data-testid="stat-abandoned-value">2,101</p>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="stat-messages-sent">Messages Sent</h3>
            <p className="text-2xl font-bold text-foreground mt-1" data-testid="stat-messages-value">1,891</p>
            <p className="text-xs text-green-600 mt-1">90% delivery rate</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="stat-recovered-orders">Recovered Orders</h3>
            <p className="text-2xl font-bold text-foreground mt-1" data-testid="stat-recovered-value">179</p>
            <p className="text-xs text-green-600 mt-1">9.5% recovery rate</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground" data-testid="stat-revenue-recovered">Revenue Recovered</h3>
            <p className="text-2xl font-bold text-foreground mt-1" data-testid="stat-revenue-value">$18,420</p>
            <p className="text-xs text-green-600 mt-1">Average $103 per order</p>
          </div>
        </div>

        {/* Campaigns */}
        <div className="bg-card rounded-lg border border-border" data-testid="campaigns-table">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground" data-testid="campaigns-title">Recovery Campaigns</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Trigger</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Channel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Sent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Recovered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {campaigns.map((campaign, index) => (
                  <tr key={index} data-testid={`campaign-row-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground" data-testid={`campaign-name-${index}`}>
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground" data-testid={`campaign-trigger-${index}`}>
                      {campaign.trigger}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground" data-testid={`campaign-channel-${index}`}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        campaign.channel === 'SMS' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {campaign.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground" data-testid={`campaign-status-${index}`}>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground" data-testid={`campaign-sent-${index}`}>
                      {campaign.sent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground" data-testid={`campaign-recovered-${index}`}>
                      {campaign.recovered}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary hover:text-primary/80" data-testid={`button-edit-${index}`}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-muted-foreground hover:text-foreground" data-testid={`button-pause-${index}`}>
                          <i className="fas fa-pause"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
