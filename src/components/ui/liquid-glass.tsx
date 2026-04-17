"use client";

import React from "react";

// Types
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  onClick?: () => void;
}

/**
 * GlassEffect Wrapper Component
 * Premium Liquid Glass — clean, overflow-clipped glassmorphism.
 * Uses backdrop-blur + layered gradients without SVG filter bleed.
 */
export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
  onClick,
}) => {
  const content = (
    <div
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-700 ${className}`}
      style={{
        // Core glassmorphism
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        // Layered glass background
        background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
        // Premium border glow
        border: "1px solid rgba(255,255,255,0.28)",
        // Depth shadow
        boxShadow: "0 8px 32px rgba(74, 22, 19, 0.12), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.08)",
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        ...style,
      }}
    >
      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block outline-none">
      {content}
    </a>
  ) : (
    content
  );
};

/**
 * GlassFilter SVG — kept for optional use in non-clipped contexts.
 * Not used in the header to avoid border bleed.
 */
export const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }} aria-hidden="true">
    <filter
      id="glass-distortion"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.01 0.005"
        numOctaves="2"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="12"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);
