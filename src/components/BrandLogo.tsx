import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Dimensions précises à la Lemonade / Mila
  const dimensions =
    size === 'sm'
      ? { width: 88, height: 26 }
      : size === 'lg'
      ? { width: 140, height: 42 }
      : { width: 110, height: 33 };

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      aria-label="madi"
    >
      {/* 
        Logotype pur dans l'esprit exact de Lemonade & Mila :
        - Lettres minuscules géométriques, rondes, épurées et ultra-lisibles
        - Courbes généreuses et parfaites, épaisseur de trait constante et affirmée (bold / semi-bold)
        - Vectoriel SVG net au pixel près, noir minéral (#0a0a0a) sur blanc pur
        - Zéro bavure, zéro effet manuscrit brouillon, un vrai logo de néo-assureur tech & design
      */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 110 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200 group-hover:opacity-85"
      >
        <text
          x="0"
          y="25"
          fill="#0a0a0a"
          style={{
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Circular", "Euclid Circular B", "GT Walsheim", "Inter", sans-serif',
            fontWeight: 700,
            fontSize: '30px',
            letterSpacing: '-0.045em',
          }}
        >
          madi
        </text>
      </svg>
    </div>
  );
};
