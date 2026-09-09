import { useState, useMemo } from 'react';
import { Receipt, ArrowRight } from 'lucide-react';
import { calcularIGV, formatSoles } from '../calculations';
import AdBanner from './AdBanner';

export default function CalculadoraIGV() {
  const [monto, setMonto] = useState<number>(0);
  const [esConIGV, setEsConIGV] = useState(false);

  const resultado = useMemo(() => {
    if (monto <= 0) return null;
    return calcularIGV(monto, esConIGV);
  }, [monto, esConIGV]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">Calculadora de IGV</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Calcula el IGV (18%) de forma rápida y precisa.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <button
              onClick={() => setEsConIGV(!esConIGV)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                esConIGV ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  esConIGV ? 'translate-x-6' : ''
                }`}
              />
            </button>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                {esConIGV ? 'Monto INCLUYE IGV' : 'Monto SIN IGV'}
              </span>
              <p className="text-xs text-gray-500">
                {esConIGV ? 'Desglosa el IGV del monto total' : 'Agrega el 18% de IGV'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {esConIGV ? 'Monto Total (con IGV)' : 'Monto Base (sin IGV)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">S/</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={monto || ''}
                onChange={(e) => setMonto(Math.max(0, parseFloat(e.target.value) || 0))}
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
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl shadow-md p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Base</p>
              <p className="text-lg font-bold text-primary">{formatSoles(resultado.base)}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">IGV (18%)</p>
              <p className="text-lg font-bold text-amber-600">{formatSoles(resultado.igv)}</p>
            </div>
            <div className="bg-success/10 rounded-2xl shadow-md p-4 text-center border border-success/30">
              <p className="text-xs text-gray-500 mb-1">Total</p>
              <p className="text-lg font-bold text-success">{formatSoles(resultado.total)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Fórmula</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <span className="font-mono">{esConIGV ? `${formatSoles(monto)} / 1.18` : `${formatSoles(monto)} × 1.18`}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="font-mono font-bold text-success">{formatSoles(resultado.total)}</span>
            </div>
          </div>

          <AdBanner position="bottom" />
        </div>
      )}
    </div>
  );
}
