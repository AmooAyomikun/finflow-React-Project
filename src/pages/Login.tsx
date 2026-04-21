import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, 
      "Password must contain uppercase, lowercase, number, and special character"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Welcome back! Logged in as ${data.email}`);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center bg-background px-4 md:px-6 py-10 sm:py-0 relative overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-success/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-8 sm:mb-12 group cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl finflow-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-arrow-trend-up text-lg sm:text-xl text-primary-foreground"></i>
          </div>
          <span className="text-2xl sm:text-3xl font-black tracking-tight">FinFlow</span>
        </div>

        <Card className="rounded-[24px] sm:rounded-[40px] shadow-premium border-none p-1 sm:p-4 overflow-hidden bg-card/80 backdrop-blur-xl border border-white/20">
          <CardHeader className="text-center pt-8 px-6 pb-2">
            <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-sm sm:text-base font-medium text-muted-foreground/60">Log in to manage your financial empire</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@domain.com" className="h-12 rounded-2xl bg-secondary/30 border-none px-4 font-bold focus-visible:ring-2 focus-visible:ring-primary/20" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs font-semibold text-destructive/90" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <div className="flex items-center justify-between ml-1">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</FormLabel>
                        <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" className="h-12 rounded-2xl bg-secondary/30 border-none px-4 font-bold focus-visible:ring-2 focus-visible:ring-primary/20" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold text-destructive" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-14 text-lg font-black finflow-gradient text-primary-foreground rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 translate-y-2" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging in...
                    </div>
                  ) : "Log in"}
                </Button>
              </form>
            </Form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
              <div className="relative flex justify-center"><span className="bg-card px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border border-border/50">or join with</span></div>
            </div>

            <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-all" type="button">
              <i className="fa-brands fa-google h-4 w-4 mr-2" ></i> Google Account
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-8 font-medium">
              New here?{" "}
              <Link to="/signup" className="text-primary font-black hover:underline">Create an account</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
