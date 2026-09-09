import { useState, useMemo } from 'react';
import { Landmark, Info } from 'lucide-react';
import { calcularCTS, formatSoles } from '../calculations';
import ResultCard from './ResultCard';
import AdBanner from './AdBanner';
import YapePlinModal from './YapePlinModal';

export default function CTS() {
  const [sueldo, setSueldo] = useState<number>(0);
  const [gratificaciones, setGratificaciones] = useState<number>(0);
  const [showYapePlin, setShowYapePlin] = useState(false);

  const resultado = useMemo(() => {
    if (sueldo <= 0) return null;
    return calcularCTS(sueldo, gratificaciones);
  }, [sueldo, gratificaciones]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">Calculadora de CTS</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Compensación por Tiempo de Servicios. Se deposita en mayo y noviembre.
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gratificaciones Anuales (opcional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">S/</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={gratificaciones || ''}
                onChange={(e) => setGratificaciones(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-success focus:outline-none bg-gray-50"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Incluye ambas gratificaciones del año</p>
          </div>
        </div>
      </div>

      <AdBanner position="top" />

      {resultado && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">CTS Total a Depositar</span>
            </div>
            <div className="text-4xl font-black tracking-tight">
              {formatSoles(resultado.cts)}
            </div>
            <p className="text-sm opacity-80 mt-1">Por período de 6 meses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
            <DetailRow label="Sueldo Básico" value={formatSoles(sueldo)} />
            <DetailRow label="Gratificaciones Anuales" value={formatSoles(gratificaciones)} />
            <DetailRow label="Remuneración Mensual" value={formatSoles(resultado.remuneracionMensual)} />
            <DetailRow label="Remuneración Anual" value={formatSoles(resultado.remuneracionAnual)} />
            <div className="border-t pt-3">
              <DetailRow label="CTS (1/12 de la anual)" value={formatSoles(resultado.cts)} bold highlight />
            </div>
            <DetailRow label="CTS Mensual Estimado" value={formatSoles(resultado.ctsMensual)} subtitle />
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">
                  ¿Sabías que puedes ganar más con tu CTS?
                </p>
                <p className="text-xs text-amber-700">
                  Si transfiere tu CTS a un banco que paga mayor interés, puedes ganar hasta
                  S/ {((resultado.cts * 0.075) / 2).toFixed(2)} en 6 meses con un 7.5% de tasa
                  promedio. ¡No dejes tu CTS dormida en una cuenta que no genera rendimientos!
                </p>
              </div>
            </div>
          </div>

          <AdBanner position="middle" />

          <div className="bg-white rounded-2xl shadow-md p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">¿Necesitas la Plantilla Excel?</p>
            <p className="text-xs text-gray-500 mb-3">
              Descarga la Plantilla con todas las fórmulas de Quinta Categoría y CTS 2026 actualizadas por S/ 9.90.
            </p>
            <button
              onClick={() => setShowYapePlin(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Obtener Plantilla Excel Pro - S/ 9.90
            </button>
          </div>

          <AdBanner position="bottom" />
        </div>
      )}

      <YapePlinModal isOpen={showYapePlin} onClose={() => setShowYapePlin(false)} />
    </div>
  );
}

function DetailRow({ label, value, bold, highlight, subtitle }: { label: string; value: string; bold?: boolean; highlight?: boolean; subtitle?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className={`text-sm ${bold ? 'font-bold' : subtitle ? 'text-xs text-gray-400' : 'text-gray-600'} ${highlight ? 'text-success font-bold' : ''}`}>
        {label}
      </span>
      <span className={`text-sm font-semibold ${highlight ? 'text-success text-lg' : subtitle ? 'text-xs text-gray-400' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
