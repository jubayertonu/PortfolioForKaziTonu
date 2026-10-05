import React from "react";
import { motion } from "motion/react";

interface TechSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const TechSection: React.FC<TechSectionProps> = ({ id, children, className = "" }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.section>
  );
};

interface TechHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const TechHeader: React.FC<TechHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <motion.div 
      className="text-center space-y-2 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-widest uppercase flex items-center justify-center gap-3 font-display">
        {icon && <span className="inline-block text-amber-400">{icon}</span>}
        {title}
      </h2>

      {subtitle && (
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-normal">
          {subtitle}
        </p>
      )}

      <div className="flex items-center justify-center pt-2">
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-[0_0_8px_#fbbf24]"
          initial={{ width: 0 }}
          whileInView={{ width: "112px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.25 }}
        />
      </div>
    </motion.div>
  );
};


