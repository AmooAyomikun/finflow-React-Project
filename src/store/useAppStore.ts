import { create } from 'zustand';
import { MOCK_DATA } from '@/lib/data';

interface Transaction {
  id: number | string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  account: string;
  merchant: string;
  date: string;
  note: string;
  recurring: boolean;
}

interface AppState {
  isOnboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;
  showAddTransactionModal: boolean;
  setShowAddTransactionModal: (open: boolean) => void;
  
  // Bank Data
  accounts: any[];
  transactions: Transaction[];
  syncMonoData: (authCode: string) => Promise<void>;
}

const generateMonoTransactions = (accountName: string): Transaction[] => {
  const narrations = [
    { merchant: 'Uber Trip', category: 'transport', amount: [15, 45], type: 'expense' },
    { merchant: 'Starbucks Coffee', category: 'food', amount: [5, 12], type: 'expense' },
    { merchant: 'Netflix Subscription', category: 'entertainment', amount: [15.99, 15.99], type: 'expense', recurring: true },
    { merchant: 'Amazon.com', category: 'shopping', amount: [20, 150], type: 'expense' },
    { merchant: 'Salaries & Wages', category: 'salary', amount: [4000, 4500], type: 'income', recurring: true },
    { merchant: 'Shell Station', category: 'transport', amount: [35, 60], type: 'expense' },
    { merchant: 'Jollof Kitchen', category: 'food', amount: [10, 25], type: 'expense' },
    { merchant: 'Apple.com/Bill', category: 'entertainment', amount: [0.99, 9.99], type: 'expense', recurring: true },
    { merchant: 'Transfer from Savings', category: 'other', amount: [200, 500], type: 'income' },
    { merchant: 'Pharmacy Plus', category: 'health', amount: [15, 80], type: 'expense' },
    { merchant: 'Utility Bill - EKEDC', category: 'utilities', amount: [45, 120], type: 'expense', recurring: true },
    { merchant: 'Gym Membership', category: 'health', amount: [25, 40], type: 'expense', recurring: true },
  ];

  const txs: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Random number of transactions per day
    const count = Math.floor(Math.random() * 3);
    for (let j = 0; j < count; j++) {
      const nar = narrations[Math.floor(Math.random() * narrations.length)];
      const amount = Number((Math.random() * (nar.amount[1] - nar.amount[0]) + nar.amount[0]).toFixed(2));
      
      txs.push({
        id: `mono-${i}-${j}-${Math.random().toString(36).substr(2, 9)}`,
        type: nar.type as 'income' | 'expense',
        amount,
        category: nar.category,
        account: accountName,
        merchant: nar.merchant,
        date: date.toISOString().split('T')[0],
        note: 'Synced via Mono Connect',
        recurring: nar.recurring || false
      });
    }
  }

  return txs;
};

export const useAppStore = create<AppState>((set, get) => ({
  isOnboardingComplete: false,
  setOnboardingComplete: (complete) => set({ isOnboardingComplete: complete }),
  showAddTransactionModal: false,
  setShowAddTransactionModal: (open) => set({ showAddTransactionModal: open }),

  // Initial Data from Mock
  accounts: MOCK_DATA.accounts,
  transactions: MOCK_DATA.transactions as Transaction[],

  syncMonoData: async (authCode) => {
    console.log("Starting High-Fidelity Mono Sync Flow...");
    
    // Simulate multi-step backend process
    // Step 1: Exchange code for ID
    await new Promise(r => setTimeout(r, 1500));
    
    // Step 2: Fetch Account Metadata
    const accountName = 'Mono Sandbox Bank';
    const newAccount = {
      id: Date.now(),
      name: accountName,
      type: 'checking',
      institution: 'Mono Bank',
      balance: 15400.25,
      currency: 'USD',
      lastUpdated: 'Just now'
    };

    // Step 3: Fetch full transaction history (simulated with generator)
    const syncedTransactions = generateMonoTransactions(accountName);

    set({
      accounts: [newAccount, ...get().accounts],
      transactions: [...syncedTransactions, ...get().transactions]
    });
    
    console.log(`Sync Complete. Imported ${syncedTransactions.length} transactions from Mono.`);
  }
}));
