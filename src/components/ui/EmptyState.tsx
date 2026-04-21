import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, description, icon, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border rounded-[32px] bg-secondary/10"
    >
      <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-4xl mb-6 shadow-sm">
        <i className={icon}></i>
      </div>
      <h3 className="text-2xl font-black mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-8 font-medium">
        {description}
      </p>
      {actionLabel && (
        <Button 
          onClick={onAction}
          className="finflow-gradient text-primary-foreground font-bold rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
