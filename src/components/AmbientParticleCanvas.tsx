import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const PARTICLE_COLORS = [
  '#F59E0B', // Warm gold
  '#FFFFFF', // Crisp white
  '#38BDF8', // Soft cyan
  '#10B981'  // Emerald green
];

export const AmbientParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pointer = { x: width * 0.5, y: height * 0.35, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const particleCount = Math.min(72, Math.max(36, Math.floor(width / 22)));
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.1 + 0.7,
      speedY: -(Math.random() * 0.38 + 0.12),
      speedX: (Math.random() - 0.5) * 0.18,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      alpha: Math.random() * 0.45 + 0.12,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2
    }));

    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Ambient shader-style radial spotlight following cursor gently
      const gradX = pointer.active ? pointer.x : width * 0.5 + Math.sin(tick * 0.006) * 180;
      const gradY = pointer.active ? pointer.y : height * 0.28 + Math.cos(tick * 0.005) * 90;

      const ambientGlow = ctx.createRadialGradient(gradX, gradY, 10, gradX, gradY, 460);
      ambientGlow.addColorStop(0, 'rgba(16, 185, 129, 0.065)');
      ambientGlow.addColorStop(0.45, 'rgba(56, 189, 248, 0.03)');
      ambientGlow.addColorStop(0.8, 'rgba(245, 158, 11, 0.015)');
      ambientGlow.addColorStop(1, 'rgba(8, 9, 10, 0)');

      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * 0.008 + p.pulseOffset) * 0.08;

        // Gentle cursor interaction
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 19000 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (138 - dist) / 138;
            p.x += (dx / dist) * force * 0.55;
            p.y += (dy / dist) * force * 0.55;
          }
        }

        // Wrap around screen edges
        if (p.y < -12) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        const currentAlpha =
          p.alpha * (0.72 + 0.28 * Math.sin(tick * p.pulseSpeed + p.pulseOffset));

        ctx.save();
        ctx.globalAlpha = Math.max(0.06, Math.min(0.75, currentAlpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.radius > 1.8 ? 10 : 4;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full no-print"
    />
  );
};
