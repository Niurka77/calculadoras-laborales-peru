import { useState } from 'react';
import { X, Copy, Check, MessageCircle } from 'lucide-react';

interface YapePlinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NUMEROS = {
  yape: '999 888 777',
  plin: '999 888 777',
};

export default function YapePlinModal({ isOpen, onClose }: YapePlinModalProps) {
  const [copied, setCopied] = useState(false);
  const [metodo, setMetodo] = useState<'yape' | 'plin'>('yape');

  if (!isOpen) return null;

  const numero = metodo === 'yape' ? NUMEROS.yape : NUMEROS.plin;
  const whatsappMsg = encodeURIComponent(
    `Hola,realice el pago de S/ 9.90 por la Plantilla Excel Profesional de Quinta Categoria y CTS 2026 via ${metodo.toUpperCase()} a ${numero}. Mi numero de celular es: [ESCRIBE TU NUMERO]. Adjunto captura del pago.`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(numero);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 text-white relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-bold">Plantilla Excel Pro - S/ 9.90</h3>
          <p className="text-sm opacity-90">Quinta Categoria y CTS 2026</p>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setMetodo('yape')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                metodo === 'yape'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Yape
            </button>
            <button
              onClick={() => setMetodo('plin')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                metodo === 'plin'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Plin
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-center border-2 border-dashed border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Monto a pagar</p>
            <p className="text-3xl font-black text-primary">S/ 9.90</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              Abre {metodo === 'yape' ? 'Yape' : 'Plin'} en tu celular y envia a este numero:
            </p>
            <p className="text-xl font-mono font-bold text-gray-800 tracking-wider">{numero}</p>
            <button
              onClick={handleCopy}
              className="mt-2 flex items-center gap-1 mx-auto text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar numero'}
            </button>
          </div>

          <a
            href={`https://wa.me/51999888777?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar captura por WhatsApp
          </a>

          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            Despues de confirmar el pago, te enviaremos la Plantilla Excel por WhatsApp en menos de 5 minutos.
          </p>
        </div>
      </div>
    </div>
  );
}
