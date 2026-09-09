import { Calculator } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-success" />
          <span className="text-white font-bold">Calculadoras Laborales Perú</span>
        </div>
        <p className="text-xs leading-relaxed mb-4">
          Herramienta gratuita para calcular sueldo neto, gratificaciones, CTS e IGV según la
          normativa laboral y tributaria peruana vigente. Los cálculos son estimaciones y pueden
          variar según tu convenio colectivo o reglamento interno.
        </p>
        <p className="text-xs">
          Los montos de UIT y RMV son referenciales. Consulta con tu contador para valores exactos.
        </p>
        <div className="border-t border-gray-700 mt-4 pt-4 text-xs text-center">
          © 2026 Calculadoras Laborales Perú. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
