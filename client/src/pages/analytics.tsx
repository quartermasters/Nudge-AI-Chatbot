import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Calendar, Download } from 'lucide-react';

// Mock data for conversation trends
const conversationTrendsData = [
  { date: 'Jan 1', conversations: 120, deflected: 48 },
  { date: 'Jan 2', conversations: 135, deflected: 54 },
  { date: 'Jan 3', conversations: 89, deflected: 38 },
  { date: 'Jan 4', conversations: 156, deflected: 67 },
  { date: 'Jan 5', conversations: 203, deflected: 89 },
  { date: 'Jan 6', conversations: 178, deflected: 76 },
  { date: 'Jan 7', conversations: 195, deflected: 83 },
  { date: 'Jan 8', conversations: 167, deflected: 71 },
  { date: 'Jan 9', conversations: 189, deflected: 81 },
  { date: 'Jan 10', conversations: 212, deflected: 91 },
  { date: 'Jan 11', conversations: 234, deflected: 102 },
  { date: 'Jan 12', conversations: 198, deflected: 84 },
  { date: 'Jan 13', conversations: 176, deflected: 75 },
  { date: 'Jan 14', conversations: 223, deflected: 96 }
];

// Mock data for intent distribution
const intentDistributionData = [
  { name: 'Product Q&A', value: 35, count: 4523, color: '#8884d8' },
  { name: 'Order Status', value: 25, count: 3201, color: '#82ca9d' },
  { name: 'Returns/Refunds', value: 16, count: 2103, color: '#ffc658' },
  { name: 'Size Guide', value: 14, count: 1820, color: '#ff7300' },
  { name: 'General Inquiry', value: 10, count: 1200, color: '#00ff88' }
];

// Colors for pie chart
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88'];

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
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 flex items-center space-x-2" data-testid="button-export-analytics">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground" data-testid="chart-conversation-trends">Conversation Trends</h3>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>Last 14 days</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversationTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    name="Total Conversations"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="deflected" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Deflected"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Intent Distribution */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="chart-intent-distribution">Intent Distribution</h3>
            <div className="h-80 flex">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={intentDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {intentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any, name: any, props: any) => [
                        `${value}% (${props.payload.count} conversations)`,
                        props.payload.name
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-40 flex flex-col justify-center space-y-2">
                {intentDistributionData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.value}% ({entry.count})</p>
                    </div>
                  </div>
                ))}
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
