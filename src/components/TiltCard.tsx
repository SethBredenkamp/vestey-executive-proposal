import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTiltDeg = 4.5
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glareStyle, setGlareStyle] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const rotateY = (relX - 0.5) * maxTiltDeg * 2;
    const rotateX = (0.5 - relY) * maxTiltDeg * 2;

    setTransformStyle(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.006, 1.006, 1.006)`
    );
    setGlareStyle({
      x: Math.round(relX * 100),
      y: Math.round(relY * 100),
      opacity: 0.14
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(420px circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(52, 211, 153, ${glareStyle.opacity}), rgba(56, 189, 248, ${
            glareStyle.opacity * 0.5
          }), transparent 70%)`,
          transition: 'opacity 250ms ease'
        }}
        className="pointer-events-none absolute inset-0 z-0 no-print"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
