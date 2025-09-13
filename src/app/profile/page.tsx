"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUser, mockProfiles, type Profile } from "@/lib/mock-data"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Settings, Shield, CreditCard, LogOut } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    bio: "",
  })

  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const userProfile = mockProfiles.find((p) => p.id === mockUser.id)

    if (userProfile) {
      setProfile(userProfile)
      setFormData({
        first_name: userProfile.first_name || "",
        last_name: userProfile.last_name || "",
        phone: userProfile.phone || "",
        bio: userProfile.bio || "",
      })
    }
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setSaving(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setProfile({ ...profile, ...formData })

    setSaving(false)
  }

  const handleSignOut = async () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              AdventureRent
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/search">Browse Rentals</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={profile?.email || ""} disabled className="bg-muted" />
                      <p className="text-sm text-muted-foreground">
                        Email cannot be changed. Contact support if you need to update your email.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell other users about yourself..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Password</div>
                        <div className="text-sm text-muted-foreground">Last updated 30 days ago</div>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Login Sessions</div>
                        <div className="text-sm text-muted-foreground">Manage your active sessions</div>
                      </div>
                      <Button variant="outline">View Sessions</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive booking updates and messages</div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">Get text alerts for urgent updates</div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Privacy Settings</div>
                        <div className="text-sm text-muted-foreground">Control who can see your profile</div>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Account Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Payment Methods</div>
                        <div className="text-sm text-muted-foreground">Manage your saved payment methods</div>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Payout Settings</div>
                        <div className="text-sm text-muted-foreground">Configure how you receive payments</div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Download Data</div>
                        <div className="text-sm text-muted-foreground">Export your account data</div>
                      </div>
                      <Button variant="outline">Download</Button>
                    </div>

                    <div className="border-t pt-6">
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          onClick={handleSignOut}
                          className="w-full justify-center bg-transparent"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>

                        <div className="text-center">
                          <Button variant="destructive" className="text-sm">
                            Delete Account
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">This action cannot be undone</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
