import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Loader2 } from 'lucide-react';
import Connect from '@mono.co/connect.js';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const MonoConnectButton = ({ className = "" }: { className?: string }) => {
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const { syncMonoData } = useAppStore();
  const navigate = useNavigate();

  const handleMonoConnect = () => {
    setLoading(true);
    
    const monoInstance = new Connect({
      key: import.meta.env.VITE_MONO_PUBLIC_KEY,
      onSuccess: async ({ code }: { code: string }) => {
        console.log("Mono Success! Code:", code);
        setSyncStatus("Authenticating...");
        toast.info("Securely connecting to bank...");
        
        await new Promise(r => setTimeout(r, 1000));
        setSyncStatus("Fetching Accounts...");
        
        await new Promise(r => setTimeout(r, 1000));
        setSyncStatus("Syncing Transactions...");
        
        await syncMonoData(code);
        
        toast.success("Sync Complete! 30 days of history imported.");
        setLoading(false);
        setSyncStatus(null);
        
        // Auto-navigate to transactions to show the result
        navigate('/transactions');
      },
      onClose: () => {
        console.log("Widget closed");
        setLoading(false);
      },
      onLoad: () => {
        console.log("Widget loaded");
      }
    });

    monoInstance.setup();
    monoInstance.open();
  };

  return (
    <Button 
      onClick={handleMonoConnect}
      disabled={loading}
      className={`bg-[#1565C0] hover:bg-[#1976D2] text-white font-bold rounded-xl px-6 h-11 shadow-lg shadow-blue-500/20 gap-2 border-none transition-all active:scale-95 ${className}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Building2 className="h-4 w-4" />
      )}
      {loading ? (syncStatus || "Connecting...") : "Connect Bank (Mono)"}
    </Button>
  );
};
