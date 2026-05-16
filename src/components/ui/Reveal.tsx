'use client';

import React from 'react';
import { useInView } from '@/lib/useInView';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  className?: string;
  threshold?: number;
}

const axis = (d: Direction, n: number) => {
  switch (d) {
    case 'up': return `translate3d(0, ${n}px, 0)`;
    case 'down': return `translate3d(0, -${n}px, 0)`;
    case 'left': return `translate3d(${n}px, 0, 0)`;
    case 'right': return `translate3d(-${n}px, 0, 0)`;
    case 'none': return 'translate3d(0, 0, 0)';
  }
};

export default function Reveal({
  children,
  delay = 0,
  duration = 900,
  distance = 32,
  direction = 'up',
  className,
  threshold = 0.15,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);

  return (
    <div
      ref={ref}
      className={`${inView ? 'in-view' : ''}${className ? ` ${className}` : ''}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0,0,0)' : axis(direction, distance),
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: inView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
