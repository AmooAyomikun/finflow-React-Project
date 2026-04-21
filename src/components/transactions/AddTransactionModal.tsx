import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  "Food & Dining", "Transportation", "Shopping", "Entertainment",
  "Bills & Utilities", "Health", "Education", "Travel", "Salary", "Freelance", "Other",
];

const transactionSchema = z.object({
  type: z.enum(["income", "expense", "transfer"]),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Please select a category"),
  account: z.string().min(1, "Please select an account"),
  merchant: z.string().min(1, "Description is required"),
  note: z.string().optional(),
  isRecurring: z.boolean().default(false),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

export function AddTransactionModal({ open, onOpenChange }: AddTransactionModalProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: undefined,
      date: new Date().toISOString().split('T')[0],
      category: "",
      account: "",
      merchant: "",
      note: "",
      isRecurring: false,
    },
  });

  const onSubmit = (data: TransactionFormValues) => {
    toast.success("Transaction added successfully!", {
      description: `Recorded ${data.type} of $${data.amount} from ${data.account}`,
    });
    form.reset();
    onOpenChange(false);
  };

  const currentType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[700px] p-0 border-none shadow-premium-lg bg-card/95 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 sm:p-10 pb-0 shrink-0">
          <DialogTitle className="text-2xl sm:text-3xl font-black tracking-tighter">Add Transaction</DialogTitle>
          <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Record your financial activity</p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 custom-scrollbar">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
              <Tabs 
                value={currentType} 
                onValueChange={(val) => {
                  form.setValue("type", val as any);
                  form.clearErrors("type");
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 h-12 sm:h-14 p-1.5 bg-secondary/30 rounded-2xl">
                  <TabsTrigger value="income" className="rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-widest data-[state=active]:bg-success data-[state=active]:text-success-foreground transition-all">Inflow</TabsTrigger>
                  <TabsTrigger value="expense" className="rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-widest data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground transition-all">Outflow</TabsTrigger>
                  <TabsTrigger value="transfer" className="rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-widest data-[state=active]:bg-foreground data-[state=active]:text-background transition-all">Refill</TabsTrigger>
                </TabsList>
              </Tabs>

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Amount</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl font-black text-muted-foreground/30 group-focus-within:text-primary/50 transition-colors">$</span>
                        <Input type="number" step="0.01" placeholder="0.00" className="text-3xl sm:text-5xl lg:text-6xl font-black h-16 sm:h-24 pl-12 sm:pl-16 text-right rounded-2xl sm:rounded-3xl bg-secondary/20 border-none focus-visible:ring-4 focus-visible:ring-primary/10 transition-all" {...field} value={field.value || ""} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold text-destructive px-1" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary/20 border-none font-bold px-4 focus-visible:ring-2 focus-visible:ring-primary/10" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary/20 border-none font-bold px-4 focus-visible:ring-2 focus-visible:ring-primary/10"><SelectValue placeholder="Select" /></SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-2xl border-border/50 shadow-premium-lg bg-card/95 backdrop-blur-xl">
                          {categories.map((c) => (
                            <SelectItem key={c} value={c.toLowerCase()} className="rounded-xl font-bold">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem className="space-y-2 sm:col-span-2">
                      <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Account / Vault</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary/20 border-none font-bold px-4 focus-visible:ring-2 focus-visible:ring-primary/10"><SelectValue placeholder="Select Account" /></SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-2xl border-border/50 shadow-premium-lg bg-card/95 backdrop-blur-xl">
                          <SelectItem value="chase" className="rounded-xl font-bold">Chase Checking</SelectItem>
                          <SelectItem value="savings" className="rounded-xl font-bold">Savings Account</SelectItem>
                          <SelectItem value="credit" className="rounded-xl font-bold">MasterCard Credit</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="merchant"
                  render={({ field }) => (
                    <FormItem className="space-y-2 sm:col-span-2">
                      <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Merchant / Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Starbucks, Netflix..." className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary/20 border-none font-bold px-4 focus-visible:ring-2 focus-visible:ring-primary/10" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-secondary/10 border border-white/5">
                <div className="space-y-0.5">
                  <Label htmlFor="recurring" className="text-xs sm:text-sm font-black uppercase tracking-tight">Recurring</Label>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Record this monthly</p>
                </div>
                <Switch 
                  id="recurring" 
                  checked={form.watch("isRecurring")} 
                  onCheckedChange={(val) => form.setValue("isRecurring", val)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <Button type="submit" className="w-full h-14 sm:h-18 md:h-20 text-lg sm:text-xl font-black finflow-gradient text-primary-foreground rounded-2xl sm:rounded-[32px] shadow-xl hover:shadow-2xl transition-all active:scale-95 group mb-4">
                Save Transaction
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
