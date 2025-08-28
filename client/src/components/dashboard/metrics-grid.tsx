import { Shield, ShoppingCart, Clock, DollarSign, TrendingUp } from "lucide-react";

export default function MetricsGrid() {
  const metrics = [
    {
      title: "Deflection Rate",
      value: "42.3%",
      change: "+7.3% from last week",
      changeType: "positive",
      icon: Shield,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Cart Recovery",
      value: "18.5%",
      change: "+2.1% from last week",
      changeType: "positive",
      icon: ShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Response Time",
      value: "0.8s",
      change: "-0.1s from last week",
      changeType: "positive",
      icon: Clock,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Revenue Impact",
      value: "$12.4K",
      change: "+12.3% from last week",
      changeType: "positive",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="metrics-grid">
      {metrics.map((metric) => (
        <div key={metric.title} className="bg-card rounded-lg border border-border p-6" data-testid={`metric-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground" data-testid={`metric-title-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {metric.title}
              </p>
              <p className="text-2xl font-bold text-foreground" data-testid={`metric-value-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {metric.value}
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center" data-testid={`metric-change-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {metric.change}
              </p>
            </div>
            <div className={`w-10 h-10 ${metric.iconBg} rounded-lg flex items-center justify-center`} data-testid={`metric-icon-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
