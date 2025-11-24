import React from 'react';

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  bgClass?: string;
  delay?: string;
}

export default function FeatureCard({ title, desc, icon, bgClass = "bg-blue-50", delay = "0s" }: FeatureCardProps) {
  return (
    <div 
      className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center ${bgClass} rounded-full shadow-sm`}>
        {icon}
      </div>

      <div>
        <h3 className="text-base font-bold text-gray-900 font-serif mb-1">{title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}