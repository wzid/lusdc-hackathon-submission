import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, Calendar, Star } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalRevenue: number
    activeListings: number
    totalBookings: number
    averageRating: number
  }
  loading: boolean
}

export function DashboardStats({ stats, loading }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Revenue",
      value: loading ? "..." : `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "All-time earnings",
    },
    {
      title: "Active Listings",
      value: loading ? "..." : stats.activeListings.toString(),
      icon: Package,
      description: "Currently available",
    },
    {
      title: "Total Bookings",
      value: loading ? "..." : stats.totalBookings.toString(),
      icon: Calendar,
      description: "All-time bookings",
    },
    {
      title: "Average Rating",
      value: loading ? "..." : stats.averageRating.toString(),
      icon: Star,
      description: "Customer satisfaction",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
