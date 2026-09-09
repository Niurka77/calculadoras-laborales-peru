import { useState, useMemo } from 'react';
import { Gift, Info, TrendingUp } from 'lucide-react';
import { calcularGratificacion, formatSoles, UIT } from '../calculations';
import ResultCard from './ResultCard';
import AdBanner from './AdBanner';
import CopyLinkButton from './CopyLinkButton';

export default function Gratificacion() {
  const [sueldo, setSueldo] = useState<number>(0);

  const resultado = useMemo(() => {
    if (sueldo <= 0) return null;
    return calcularGratificacion(sueldo);
  }, [sueldo]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">Calculadora de Gratificación</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Calcula tu gratificación de Fiestas Patrias (julio) y Navidad (diciembre).
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Sueldo Básico Mensual
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">S/</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={sueldo || ''}
                onChange={(e) => setSueldo(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-success focus:outline-none transition-colors bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      <AdBanner position="top" />

      {resultado && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">Gratificación a Recibir</span>
            </div>
            <div className="text-4xl font-black tracking-tight">
              {formatSoles(resultado.total)}
            </div>
            {resultado.aplicaTope && (
              <p className="text-sm opacity-80 mt-1">
                Tope aplicado: 6 UIT ({formatSoles(resultado.tope)})
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
            <DetailRow label="Sueldo Básico" value={formatSoles(sueldo)} />
            <DetailRow label="Gratificación (6 sueldos)" value={formatSoles(resultado.gratificacion)} />
            <DetailRow label="Bonificación (9%)" value={formatSoles(resultado.bonificacion)} />
            <div className="border-t pt-3">
              <DetailRow label="Total a Recibir" value={formatSoles(resultado.total)} bold highlight />
            </div>
            <div className="bg-blue-50 rounded-lg p-3 mt-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700">
                  Tu empleador paga adicionalmente{' '}
                  <strong>{formatSoles(resultado.essalud)}</strong> de EsSalud (9% sobre gratificación).
                  Esto no se descuenta de tu sueldo.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <CopyLinkButton />
          </div>

          <AdBanner position="bottom" />
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value, bold, highlight }: { label: string; value: string; bold?: boolean; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className={`text-sm ${bold ? 'font-bold' : 'text-gray-600'} ${highlight ? 'text-success font-bold' : ''}`}>
        {label}
      </span>
      <span className={`text-sm font-semibold ${highlight ? 'text-success text-lg' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
