import { useState, useMemo, useRef } from 'react';
import { Calculator, ChevronDown, ChevronUp, Wallet, TrendingDown, TrendingUp, Download } from 'lucide-react';
import { calcularSueldoNeto, formatSoles, type SistemaPension } from '../calculations';
import ResultCard from './ResultCard';
import AdBanner from './AdBanner';
import ShareButtons from './ShareButtons';
import jsPDF from 'jspdf';

function generarPDF(r: ReturnType<typeof calcularSueldoNeto>) {
  if (!r) return;
  const doc = new jsPDF();
  const w = doc.internal.pageSize.getWidth();

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, w, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Boleta de Pago Simulada', w / 2, 18, { align: 'center' });
  doc.setFontSize(10);
  doc.text('Calculadoras Laborales Peru 2026', w / 2, 28, { align: 'center' });
  doc.text(new Date().toLocaleDateString('es-PE'), w / 2, 35, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  let y = 55;

  const drawRow = (label: string, value: string, bold = false, color: [number, number, number] = [0, 0, 0]) => {
    doc.setFontSize(11);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(label, 20, y);
    doc.setTextColor(...color);
    doc.text(value, w - 20, y, { align: 'right' });
    doc.setTextColor(0, 0, 0);
    y += 8;
  };

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Ingresos', 20, y);
  y += 10;

  drawRow('Sueldo Bruto', formatSoles(r.sueldoBruto));
  if (r.asignacion > 0) drawRow('Asignacion Familiar', formatSoles(r.asignacion));
  if (r.horasExtras > 0) drawRow('Horas Extras', formatSoles(r.horasExtras));
  drawRow('Total Ingresos', formatSoles(r.totalIngresos), true);
  y += 5;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Descuentos', 20, y);
  y += 10;

  drawRow(`Pension (${r.sistema})`, `-${formatSoles(r.descuentoPension)}`);
  drawRow('Impuesto Renta 5ta Cat.', `-${formatSoles(r.descuentoIR)}`);
  doc.setDrawColor(200);
  doc.line(20, y, w - 20, y);
  y += 8;
  drawRow('Total Descuentos', `-${formatSoles(r.descuentoPension + r.descuentoIR)}`, true, [220, 38, 38]);
  y += 5;

  doc.setFillColor(5, 150, 105);
  doc.roundedRect(15, y - 4, w - 30, 16, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Sueldo Neto', 20, y + 6);
  doc.text(formatSoles(r.sueldoNeto), w - 20, y + 6, { align: 'right' });

  doc.setTextColor(128);
  doc.setFontSize(8);
  doc.text('Documento generado por Calculadoras Laborales Peru. No tiene validez legal.', w / 2, 280, { align: 'center' });

  doc.save('boleta-sueldo-simulada.pdf');
}

export default function SueldoNeto() {
  const [sueldo, setSueldo] = useState<number>(0);
  const [sistema, setSistema] = useState<SistemaPension>('AFP Integra');
  const [asignacionFamiliar, setAsignacionFamiliar] = useState(false);
  const [horasExtras, setHorasExtras] = useState(0);
  const [tipoComision, setTipoComision] = useState<'flujo' | 'mixta'>('flujo');
  const [showDetail, setShowDetail] = useState(false);

  const resultado = useMemo(() => {
    if (sueldo <= 0) return null;
    return calcularSueldoNeto(sueldo, sistema, asignacionFamiliar, horasExtras, tipoComision);
  }, [sueldo, sistema, asignacionFamiliar, horasExtras, tipoComision]);

  const shareText = resultado
    ? `Mi sueldo neto estimado es ${formatSoles(resultado.sueldoNeto)}. ¡Calcula el tuyo en Calculadoras Laborales Perú!`
    : '';

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">Calculadora de Sueldo Neto</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Ingresa tu sueldo y descubre exactamente cuánto recibirás en tu cuenta.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Sistema de Pensiones
              </label>
              <select
                value={sistema}
                onChange={(e) => setSistema(e.target.value as SistemaPension)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-success focus:outline-none bg-gray-50"
              >
                <option value="ONP">ONP (13%)</option>
                <option value="AFP Integra">AFP Integra</option>
                <option value="AFP Prima">AFP Prima</option>
                <option value="AFP Profuturo">AFP Profuturo</option>
                <option value="AFP Habitat">AFP Habitat</option>
              </select>
            </div>

            {sistema !== 'ONP' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tipo de Comisión
                </label>
                <select
                  value={tipoComision}
                  onChange={(e) => setTipoComision(e.target.value as 'flujo' | 'mixta')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-success focus:outline-none bg-gray-50"
                >
                  <option value="flujo">Comisión por Flujo</option>
                  <option value="mixta">Comisión Mixta</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Horas Extras (opcional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">S/</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={horasExtras || ''}
                onChange={(e) => setHorasExtras(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-success focus:outline-none bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <button
              onClick={() => setAsignacionFamiliar(!asignacionFamiliar)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                asignacionFamiliar ? 'bg-success' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  asignacionFamiliar ? 'translate-x-6' : ''
                }`}
              />
            </button>
            <div>
              <span className="text-sm font-semibold text-gray-700">¿Recibes Asignación Familiar?</span>
              <p className="text-xs text-gray-500">+10% del RMV (S/ 102.50)</p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner position="top" />

      {resultado && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-success to-emerald-700 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">Sueldo Neto a Recibir</span>
            </div>
            <div className="text-4xl font-black tracking-tight">
              {formatSoles(resultado.sueldoNeto)}
            </div>
            <p className="text-sm opacity-80 mt-1">Depósito en tu cuenta bancaria</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              title="Sueldo Bruto"
              value={formatSoles(resultado.totalIngresos)}
              icon={<TrendingUp className="w-4 h-4 text-success" />}
            />
            <ResultCard
              title="Total Descuentos"
              value={formatSoles(resultado.descuentoPension + resultado.descuentoIR)}
              icon={<TrendingDown className="w-4 h-4 text-red-500" />}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-700">Ver Desglose Completo</span>
              {showDetail ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {showDetail && (
              <div className="px-4 pb-4 space-y-3 border-t">
                <DetailRow label="Sueldo Básico" value={formatSoles(sueldo)} />
                {resultado.asignacion > 0 && (
                  <DetailRow label="Asignación Familiar" value={formatSoles(resultado.asignacion)} />
                )}
                {resultado.horasExtras > 0 && (
                  <DetailRow label="Horas Extras" value={formatSoles(resultado.horasExtras)} />
                )}
                <div className="border-t pt-3">
                  <DetailRow label="Total Ingresos Brutos" value={formatSoles(resultado.totalIngresos)} bold />
                </div>
                <DetailRow
                  label={`Descuento ${resultado.sistema}`}
                  value={`-${formatSoles(resultado.descuentoPension)}`}
                  negative
                />
                <DetailRow
                  label="Impuesto Renta 5ta Categoría"
                  value={`-${formatSoles(resultado.descuentoIR)}`}
                  negative
                />
                <div className="border-t pt-3">
                  <DetailRow label="Sueldo Neto" value={formatSoles(resultado.sueldoNeto)} bold highlight />
                </div>
              </div>
            )}
          </div>

          <AdBanner position="middle" />

          <div className="bg-white rounded-2xl shadow-md p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Compartir resultado</p>
            <ShareButtons text={shareText} />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-success/20">
            <p className="text-sm font-semibold text-gray-700 mb-1">Descargar Boleta de Pago Simulada</p>
            <p className="text-xs text-gray-500 mb-3">PDF profesional con tu desglose completo</p>
            <button
              onClick={() => generarPDF(resultado)}
              className="w-full bg-success hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar PDF Gratis
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Plantilla Excel Profesional</p>
            <p className="text-xs text-gray-500 mb-3">
              ¿Eres contador o administras un negocio? Descarga la Plantilla con todas las fórmulas de Quinta Categoría y CTS 2026 actualizadas.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                Yapear S/ 9.90
              </button>
              <button className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                Plin S/ 9.90
              </button>
            </div>
          </div>
        </div>
      )}

      <AdBanner position="bottom" />
    </div>
  );
}

function DetailRow({
  label,
  value,
  bold,
  highlight,
  negative,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className={`text-sm ${bold ? 'font-bold' : 'text-gray-600'} ${highlight ? 'text-success font-bold' : ''}`}>
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${
          highlight ? 'text-success text-lg' : negative ? 'text-red-500' : 'text-gray-800'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
