import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";


export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </motion.div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile"><i className="fa-solid fa-user h-4 w-4 mr-1 hidden sm:inline" ></i> Profile</TabsTrigger>
          <TabsTrigger value="security"><i className="fa-solid fa-shield-halved h-4 w-4 mr-1 hidden sm:inline" ></i> Security</TabsTrigger>
          <TabsTrigger value="notifications"><i className="fa-solid fa-bell h-4 w-4 mr-1 hidden sm:inline" ></i> Alerts</TabsTrigger>
          <TabsTrigger value="billing"><i className="fa-solid fa-credit-card h-4 w-4 mr-1 hidden sm:inline" ></i> Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card className="shadow-card border-border">
            <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full finflow-gradient flex items-center justify-center text-primary-foreground text-xl font-bold">JD</div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="John Doe" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="john@example.com" type="email" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Base Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="ngn">NGN (₦)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                      <SelectItem value="wat">WAT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="finflow-gradient text-primary-foreground">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="shadow-card border-border">
            <CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" /></div>
              <Button className="finflow-gradient text-primary-foreground">Update Password</Button>
              <div className="border-t border-border pt-4 mt-6">
                <Button variant="outline" className="text-destructive border-destructive/30">Delete Account</Button>
                <p className="text-xs text-muted-foreground mt-2">This will permanently delete your account and all data.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="shadow-card border-border">
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Budget exceeded alerts", desc: "Get notified when a budget category is over limit" },
                { label: "Goal milestones", desc: "Celebrate when you hit savings milestones" },
                { label: "Weekly spending summary", desc: "Receive a weekly overview of your spending" },
                { label: "Monthly report", desc: "Auto-generated monthly financial report" },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4 space-y-4">
          <Card className="shadow-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-secondary text-secondary-foreground">Free Plan</Badge>
                <span className="text-sm text-muted-foreground">Current plan</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Accounts</p>
                  <p className="font-medium">2 / 3 used</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Transactions</p>
                  <p className="font-medium">67 / 100 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border border-primary/20 ring-1 ring-primary/10">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Upgrade to Pro</h3>
                  <p className="text-muted-foreground text-sm">$5/month — Everything unlimited</p>
                </div>
                <span className="text-3xl font-extrabold text-primary">$5<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
              </div>
              <ul className="space-y-2 mb-4">
                {["Unlimited accounts & transactions", "Unlimited budgets & goals", "Lifetime analytics history", "PDF & CSV exports", "Email alerts & priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><i className="fa-solid fa-check h-4 w-4 text-success" ></i> {f}</li>
                ))}
              </ul>
              <Button className="w-full finflow-gradient text-primary-foreground">Upgrade to Pro</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
