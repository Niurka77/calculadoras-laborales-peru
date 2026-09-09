import { useState } from 'react';
import Header from './components/Header';
import SueldoNeto from './components/SueldoNeto';
import Gratificacion from './components/Gratificacion';
import CTS from './components/CTS';
import CalculadoraIGV from './components/CalculadoraIGV';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('sueldo');

  const renderCalculator = () => {
    switch (activeTab) {
      case 'sueldo':
        return <SueldoNeto />;
      case 'gratificacion':
        return <Gratificacion />;
      case 'cts':
        return <CTS />;
      case 'igv':
        return <CalculadoraIGV />;
      default:
        return <SueldoNeto />;
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {renderCalculator()}
      </main>

      <Footer />
    </div>
  );
}
