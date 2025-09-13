import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Booking } from "@/lib/types"
import { DollarSign, Calendar, CreditCard, AlertCircle } from "lucide-react"

interface PayoutInfoProps {
  bookings: Booking[]
}

export function PayoutInfo({ bookings }: PayoutInfoProps) {
  const completedBookings = bookings.filter((b) => b.status === "completed")
  const pendingRevenue = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, booking) => sum + booking.total_amount, 0)

  const availableForPayout = completedBookings.reduce((sum, booking) => sum + booking.total_amount, 0) * 0.85 // 15% platform fee

  const nextPayoutDate = new Date()
  nextPayoutDate.setDate(nextPayoutDate.getDate() + 7)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payouts</h2>
        <p className="text-muted-foreground">Track your earnings and payout schedule</p>
      </div>

      {/* Payout Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${availableForPayout.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">After 15% platform fee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From confirmed bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextPayoutDate.toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">Weekly automatic payouts</p>
          </CardContent>
        </Card>
      </div>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="font-medium">Bank Account</div>
              <div className="text-sm text-muted-foreground">**** **** **** 1234</div>
            </div>
            <Button variant="outline">Update</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="font-medium">Payout Schedule</div>
              <div className="text-sm text-muted-foreground">Weekly on Fridays</div>
            </div>
            <Button variant="outline">Change</Button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="space-y-1">
              <div className="font-medium text-blue-900 dark:text-blue-100">Payout Information</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Payouts are processed weekly on Fridays. Funds typically arrive in your account within 1-2 business
                days. A 15% platform fee is deducted from each completed booking.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Payouts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "2024-01-12", amount: 245.5, status: "completed" },
              { date: "2024-01-05", amount: 180.25, status: "completed" },
              { date: "2023-12-29", amount: 320.75, status: "completed" },
            ].map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">Weekly Payout</div>
                  <div className="text-sm text-muted-foreground">{new Date(payout.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium">${payout.amount}</div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
            ))}

            {completedBookings.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No payouts yet</h3>
                <p>Complete your first booking to receive your first payout.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
