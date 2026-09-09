import { Share2, MessageCircle } from 'lucide-react';

const SITE_URL = 'https://calculadoras-laborales-peru.vercel.app';

export default function ShareButtons({ text }: { text: string }) {
  const message = `Hola, calcula tu sueldo neto y gratificación en soles aquí: ${SITE_URL}`;
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encoded}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + SITE_URL)}`;

  return (
    <div className="flex gap-2">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Twitter
      </a>
    </div>
  );
}
