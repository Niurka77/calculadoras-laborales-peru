import { useState } from 'react';
import { Link, Check } from 'lucide-react';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const message = 'Calcula tu sueldo neto gratis en soles: https://calculadoras-laborales-peru.vercel.app';
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-sm text-primary-light hover:text-primary font-medium transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-success" /> : <Link className="w-4 h-4" />}
      {copied ? 'Enlace copiado' : 'Copiar Enlace'}
    </button>
  );
}
