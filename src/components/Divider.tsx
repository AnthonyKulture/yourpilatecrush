import React from 'react';

/**
 * Editorial Divider Component
 * Implements the line + rotating diamond separator from the design system.
 */
export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`editorial-divider ${className}`} aria-hidden="true">
      <div className="divider-diamond" />
    </div>
  );
}
