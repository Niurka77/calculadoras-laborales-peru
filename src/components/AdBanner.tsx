export default function AdBanner({ position }: { position: 'top' | 'middle' | 'bottom' }) {
  const labels: Record<string, string> = {
    top: 'Publicidad - Banner Superior (728x90)',
    middle: 'Publicidad - Banner In-Feed (320x100)',
    bottom: 'Publicidad - Banner Inferior (320x250)',
  };

  const heights: Record<string, string> = {
    top: 'h-[90px]',
    middle: 'h-[100px]',
    bottom: 'h-[250px]',
  };

  return (
    <div className="my-4">
      <div
        className={`bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm ${heights[position]}`}
      >
        {labels[position]}
      </div>
      <p className="text-[10px] text-gray-400 text-center mt-1">
        Aquí se colocará tu anuncio de Google AdSense
      </p>
    </div>
  );
}
