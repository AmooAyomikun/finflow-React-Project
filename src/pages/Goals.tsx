import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const goals = [
  { name: "Emergency Fund", icon: "🛡️", target: 10000, saved: 6500, color: "#1565C0", deadline: "2026-12-31" },
  { name: "New Laptop", icon: "💻", target: 2000, saved: 1400, color: "#2E7D32", deadline: "2026-08-01" },
  { name: "Vacation to Japan", icon: "✈️", target: 5000, saved: 1200, color: "#E65100", deadline: "2027-03-01" },
  { name: "Car Down Payment", icon: "🚗", target: 8000, saved: 2000, color: "#7B1FA2", deadline: "2027-06-01" },
];

export default function Goals() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Savings Goals</h1>
          <p className="text-muted-foreground">Track your progress toward financial goals</p>
        </div>
        <Button className="finflow-gradient text-primary-foreground">
          <i className="fa-solid fa-plus h-4 w-4 mr-1" ></i> New Goal
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((g, i) => {
          const pct = Math.round((g.saved / g.target) * 100);
          const remaining = g.target - g.saved;
          const daysLeft = Math.max(0, Math.ceil((new Date(g.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

          return (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 border-border cursor-pointer overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: g.color }} />
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">{g.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{g.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <i className="fa-solid fa-calendar h-3 w-3" ></i>
                        <span>{daysLeft} days left</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: g.color }}>{pct}%</span>
                  </div>

                  <div className="h-3 rounded-full bg-muted overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: g.color }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">${g.saved.toLocaleString()}</span> saved
                    </span>
                    <span className="text-muted-foreground">${remaining.toLocaleString()} to go</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Add Contribution
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
