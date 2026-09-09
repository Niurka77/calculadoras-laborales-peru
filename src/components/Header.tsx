import { Calculator, Banknote, Landmark, Receipt } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'sueldo', label: 'Sueldo Neto', icon: Banknote },
  { id: 'gratificacion', label: 'Gratificación', icon: Calculator },
  { id: 'cts', label: 'CTS', icon: Landmark },
  { id: 'igv', label: 'Calculadora IGV', icon: Receipt },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-7 h-7 text-success" />
            <div>
              <h1 className="text-lg font-bold leading-tight">Calculadoras Laborales</h1>
              <p className="text-xs text-gray-400">Perú 2026</p>
            </div>
          </div>
        </div>

        <nav className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-1 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-success text-white shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
