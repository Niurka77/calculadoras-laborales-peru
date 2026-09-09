import type { ReactNode } from 'react';

interface ResultCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  highlight?: boolean;
}

export default function ResultCard({ title, value, subtitle, icon, highlight }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl p-4 shadow-md border ${
        highlight
          ? 'bg-success/10 border-success/30'
          : 'bg-white border-gray-100'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm text-gray-500 font-medium">{title}</span>
      </div>
      <div className={`text-2xl font-bold ${highlight ? 'text-success' : 'text-primary'}`}>
        {value}
      </div>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
