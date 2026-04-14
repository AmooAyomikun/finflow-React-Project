import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

const features = [
  { icon: "fas fa-chart-bar", title: "Spending Analytics", desc: "Rich charts and reports to understand where your money goes" },
  { icon: "fas fa-piggy-bank", title: "Smart Budgets", desc: "Set category budgets with real-time progress tracking" },
  { icon: "fas fa-bullseye", title: "Savings Goals", desc: "Track progress toward your financial goals with deadlines" },
  { icon: "fas fa-shield-halved", title: "Secure & Private", desc: "Bank-grade security with row-level data isolation" },
  { icon: "fas fa-bolt", title: "Lightning Fast", desc: "Optimistic updates and real-time dashboard refresh" },
  { icon: "fas fa-arrow-trend-up", title: "Net Worth Tracking", desc: "See your complete financial picture across all accounts" },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 accounts", "100 transactions/mo", "5 budget categories", "2 savings goals", "3 months history"],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$5",
    period: "/month",
    features: ["Unlimited accounts", "Unlimited transactions", "Unlimited budgets", "Unlimited goals", "Lifetime history", "PDF & CSV exports", "Email alerts"],
    cta: "Start Pro Trial",
    highlighted: true,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg finflow-gradient flex items-center justify-center">
              <i className="fas fa-arrow-trend-up text-primary-foreground"></i>
            </div>
            <span className="text-xl font-bold tracking-tight">FinFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="finflow-gradient text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative pt-20 pb-24 overflow-hidden"
        style={{
          backgroundImage: "url('/finance_hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div initial="hidden" animate="visible" className="lg:w-1/2 text-left">
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Your money,<br />{" "}
                <span className="finflow-gradient-text">crystal clear</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground/90 max-w-lg mb-8">
                Track income, expenses, and budgets in one beautiful dashboard.
                Set goals, analyze spending, and take control of your financial future.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3">
                <Link to="/signup">
                  <Button size="lg" className="finflow-gradient text-primary-foreground px-8 shadow-fab hover:opacity-90 transition-opacity w-full sm:w-auto">
                    Start Free <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto bg-background/50 backdrop-blur-sm border-white/20">
                  See Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Dashboard preview mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 w-full mt-10 lg:mt-0 relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[24px] blur opacity-30 animate-pulse pointer-events-none" />
              <div className="rounded-[20px] border border-white/20 bg-background/60 backdrop-blur-2xl shadow-2xl overflow-hidden p-6 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
                    <p className="text-3xl font-bold tracking-tight text-foreground">$124,580.00</p>
                  </div>
                  <div className="h-10 px-3 bg-success/10 rounded-full flex items-center text-success text-sm font-semibold">
                    <i className="fa-solid fa-arrow-trend-up mr-2"></i> +12%
                  </div>
                </div>

                <div className="h-40 w-full relative z-10 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { name: "Mon", value: 3000 },
                      { name: "Tue", value: 4500 },
                      { name: "Wed", value: 3800 },
                      { name: "Thu", value: 6500 },
                      { name: "Fri", value: 5400 },
                      { name: "Sat", value: 8000 },
                      { name: "Sun", value: 124580 },
                    ]}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-card/50 backdrop-blur-md border border-white/10 rounded-xl p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <i className="fa-solid fa-bolt text-xs"></i>
                      </div>
                      <span className="text-sm font-medium">Income</span>
                    </div>
                    <p className="text-xl font-bold">$12,400</p>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-md border border-white/10 rounded-xl p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive">
                        <i className="fa-solid fa-arrow-trend-down text-xs"></i>
                      </div>
                      <span className="text-sm font-medium">Expenses</span>
                    </div>
                    <p className="text-xl font-bold">$4,860</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 relative z-10 w-full overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold">Recent Transactions</h4>
                    <span className="text-xs text-primary cursor-pointer hover:underline">View All</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: "fa-solid fa-apple", color: "bg-foreground text-background", title: "Apple Store", amount: "-$999.00", time: "Today" },
                      { icon: "fa-solid fa-mug-hot", color: "bg-amber-500/20 text-amber-500", title: "Starbucks", amount: "-$5.40", time: "Yesterday" }
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-full flex items-center justify-center ${tx.color} transition-transform group-hover:scale-110`}>
                            <i className={tx.icon}></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-none mb-1">{tx.title}</p>
                            <p className="text-[10px] text-muted-foreground leading-none">{tx.time}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold">{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage your money</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Powerful features wrapped in a clean, intuitive interface</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
            >
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <i className={`${f.icon} text-lg`}></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg">Start free, upgrade when you need more</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-xl border ${plan.highlighted ? "border-primary bg-card shadow-card-hover ring-1 ring-primary/20" : "border-border bg-card shadow-card"}`}
            >
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <i className="fas fa-check text-success flex-shrink-0 text-sm"></i> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button
                  className={`w-full ${plan.highlighted ? "finflow-gradient text-primary-foreground" : ""}`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded finflow-gradient flex items-center justify-center">
              <i className="fas fa-arrow-trend-up text-primary-foreground text-[0.75rem]"></i>
            </div>
            <span className="font-medium">FinFlow</span>
          </div>
          <p>© 2026 FinFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
