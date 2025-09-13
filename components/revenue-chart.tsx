"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Booking } from "@/lib/types"

interface RevenueChartProps {
  bookings: Booking[]
}

export function RevenueChart({ bookings }: RevenueChartProps) {
  const chartData = useMemo(() => {
    // Group bookings by month and calculate revenue
    const monthlyRevenue = bookings
      .filter((booking) => booking.status === "completed")
      .reduce(
        (acc, booking) => {
          const month = new Date(booking.created_at).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
          acc[month] = (acc[month] || 0) + booking.total_amount
          return acc
        },
        {} as Record<string, number>,
      )

    // Convert to array format for chart
    return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    }))
  }, [bookings])

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No revenue data yet</p>
        </div>
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-[200px]">
      <LineChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`$${value}`, "Revenue"]} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ fill: "var(--color-revenue)" }}
        />
      </LineChart>
    </ChartContainer>
  )
}
