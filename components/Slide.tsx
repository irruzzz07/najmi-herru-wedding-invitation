"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

function seeded(i: number, offset = 0) {
  const x = Math.sin(i * 9301 + offset * 49297 + 49297) * 49297
  return x - Math.floor(x)
}

type ParticleColor = "navy" | "green"

function Particles({ count = 12, color = "navy" }: { count?: number; color?: ParticleColor }) {
  return (
    <div className="particles-container">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.round((2 + seeded(i, 13) * 4) * 10) / 10
        return (
          <div
            key={i}
            className={`particle-${color}`}
            style={{
              left: `${Math.round(seeded(i, 10) * 10000) / 100}%`,
              animationDuration: `${Math.round((8 + seeded(i, 11) * 12) * 10) / 10}s, ${Math.round((1.5 + seeded(i, 14) * 2) * 10) / 10}s`,
              animationDelay: `${Math.round(seeded(i, 12) * 100) / 10}s, 0s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        )
      })}
    </div>
  )
}

/* Elegant SVG corner flourishes */
function CornerSVG({ color, position }: { color: "navy" | "green"; position: "tl" | "tr" | "bl" | "br" }) {
  const strokeColor = color === "navy" ? "rgba(90, 138, 181, 0.4)" : "rgba(107, 139, 71, 0.4)"

  const transforms: Record<string, string> = {
    tl: "",
    tr: "scale(-1, 1)",
    bl: "scale(1, -1)",
    br: "scale(-1, -1)",
  }

  const positions: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  }

  return (
    <div
      className="corner-ornament"
      style={{ ...positions[position] }}
    >
      <svg viewBox="0 0 70 70" fill="none" style={{ transform: transforms[position] }}>
        {/* Curved flourish line */}
        <path
          d="M2 68 C2 36 8 18 18 10 C28 2 42 2 68 2"
          stroke={strokeColor}
          strokeWidth="0.8"
          fill="none"
        />
        {/* Inner accent curve */}
        <path
          d="M2 50 C6 30 14 18 28 12 C36 8 46 6 58 2"
          stroke={strokeColor}
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
        {/* Tiny diamond at corner tip */}
        <rect
          x="0" y="66" width="4" height="4"
          fill={strokeColor}
          transform="rotate(45, 2, 68)"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}

type SlideNum = 1 | 2 | 3 | 4 | 5 | 6

type Props = {
  children: ReactNode
  slideNum?: SlideNum
  particles?: boolean
  particleColor?: ParticleColor
  cornerColor?: "navy" | "green"
  bright?: boolean
  showFlash?: boolean
}

const slideBg: Record<SlideNum, string> = {
  1: "bg-slide-1",
  2: "bg-slide-2",
  3: "bg-slide-3",
  4: "bg-slide-4",
  5: "bg-slide-5",
  6: "bg-slide-6",
}

const slideBgBright: Record<SlideNum, string> = {
  1: "bg-slide-1",
  2: "bg-slide-2",
  3: "bg-slide-3",
  4: "bg-slide-4-bright",
  5: "bg-slide-5-bright",
  6: "bg-slide-6-bright",
}

export default function Slide({
  children,
  slideNum = 1,
  particles = true,
  particleColor = "navy",
  cornerColor = "navy",
  bright = false,
  showFlash = false,
}: Props) {
  const bgClass = bright ? slideBgBright[slideNum] : slideBg[slideNum]

  return (
    <section
      className={bgClass}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        textAlign: "center",
        overflow: "hidden",
        color: "var(--text-primary)",
        boxSizing: "border-box",
        transition: "background 2s ease-in-out",
      }}
    >
      {/* awakening overlays */}
      {bright && <div className="awaken-screen" />}
      {showFlash && (
        <>
          <div className="awaken-flash" />
          <div className="awaken-rays" />
        </>
      )}

      {/* vignette */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {particles && <Particles color={particleColor} count={14} />}

      {/* elegant corner flourishes */}
      <div style={{ position: "absolute", inset: "1.5rem", pointerEvents: "none" }}>
        <CornerSVG color={cornerColor} position="tl" />
        <CornerSVG color={cornerColor} position="tr" />
        <CornerSVG color={cornerColor} position="bl" />
        <CornerSVG color={cornerColor} position="br" />
      </div>

      {/* content in glass card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass-card"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "28rem",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}
