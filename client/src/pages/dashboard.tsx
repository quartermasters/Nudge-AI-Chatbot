import { useQuery } from "@tanstack/react-query";
import MetricsGrid from "@/components/dashboard/metrics-grid";
import ChartsSection from "@/components/dashboard/charts-section";
import RecentActivity from "@/components/dashboard/recent-activity";
import { Download, Plus } from "lucide-react";

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/dashboard/default-store'],
    enabled: true
  });

  if (isLoading) {
    return (
      <div className="p-6" data-testid="dashboard-loading">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-6">
                <div className="h-6 bg-muted rounded w-24 mb-2"></div>
                <div className="h-8 bg-muted rounded w-16 mb-1"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="dashboard">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4" data-testid="dashboard-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="dashboard-title">Dashboard</h2>
            <p className="text-muted-foreground" data-testid="dashboard-description">
              Overview of your AI assistant performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground bg-background hover:bg-accent" data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90" data-testid="button-new-campaign">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6" data-testid="dashboard-content">
        <MetricsGrid />
        <ChartsSection />
        <RecentActivity />
      </div>
    </div>
  );
}
