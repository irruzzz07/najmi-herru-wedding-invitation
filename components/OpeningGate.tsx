"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

function seeded(i: number, offset = 0) {
  const x = Math.sin(i * 9301 + offset * 49297 + 49297) * 49297
  return x - Math.floor(x)
}

function Particles({ count = 30 }: { count?: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.round((2 + seeded(i, 3) * 4) * 10) / 10
        return (
          <div
            key={i}
            className="particle-navy"
            style={{
              left: `${Math.round(seeded(i, 0) * 10000) / 100}%`,
              animationDuration: `${Math.round((6 + seeded(i, 1) * 10) * 10) / 10}s, ${Math.round((1.5 + seeded(i, 4) * 2) * 10) / 10}s`,
              animationDelay: `${Math.round(seeded(i, 2) * 80) / 10}s, 0s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        )
      })}
    </div>
  )
}

/* Floating light orbs for atmosphere */
function LightOrbs() {
  const orbs = [
    { size: 80, x: "15%", y: "20%", color: "rgba(90,138,181,0.12)", duration: 12 },
    { size: 120, x: "75%", y: "60%", color: "rgba(107,139,71,0.08)", duration: 16 },
    { size: 60, x: "60%", y: "15%", color: "rgba(127,179,222,0.1)", duration: 10 },
    { size: 90, x: "25%", y: "75%", color: "rgba(143,179,104,0.07)", duration: 14 },
  ]

  return (
    <>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="light-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </>
  )
}

export default function OpeningGate({
  name,
  onOpen,
}: {
  name?: string
  onOpen: () => void
}) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    setOpening(true)
    setTimeout(onOpen, 1200)
  }

  return (
    <AnimatePresence>
      {!opening ? (
        <motion.div
          key="gate"
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            width: "100vw", height: "100vh",
            zIndex: 50,
            display: "grid",
            placeItems: "center",
            background: "var(--black)",
            overflow: "hidden",
          }}
        >
          <Particles count={35} />
          <LightOrbs />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem" }}
          >
            <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--navy-light)", textShadow: "0 0 16px rgba(90,138,181,0.3)", marginBottom: "2rem" }}>
              Undangan Pernikahan
            </p>

            <div className="divider-navy" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="decorative-frame"
            >
              <h1
                className="font-[family-name:var(--font-playfair)] mixed-text"
                style={{ fontSize: "clamp(3rem, 10vw, 5rem)", fontWeight: 700 }}
              >
                N <span style={{ fontSize: "0.6em" }}>&amp;</span> H
              </h1>
            </motion.div>

            <div className="divider-green" />

            {name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{ marginTop: "2rem" }}
              >
                <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
                  Kepada Yth.
                </p>
                <p
                  className="font-[family-name:var(--font-playfair)]"
                  style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)", color: "var(--text-primary)" }}
                >
                  {decodeURIComponent(name)}
                </p>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              onClick={handleOpen}
              className="shimmer-btn"
              style={{
                marginTop: "2rem",
                padding: "0.75rem 2.5rem",
                borderRadius: "9999px",
                border: "1px solid var(--navy-accent)",
                background: "rgba(15, 27, 45, 0.5)",
                color: "var(--navy-light)",
                cursor: "pointer",
                fontSize: "0.875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                fontFamily: "var(--font-playfair)",
                backdropFilter: "blur(8px)",
              }}
            >
              Buka Undangan
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <motion.div
            key="gate-left"
            initial={{ x: 0 }} animate={{ x: "-100%" }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            style={{ position: "fixed", top: 0, left: 0, width: "50%", height: "100%", zIndex: 50, background: "var(--black)" }}
          />
          <motion.div
            key="gate-right"
            initial={{ x: 0 }} animate={{ x: "100%" }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            style={{ position: "fixed", top: 0, right: 0, width: "50%", height: "100%", zIndex: 50, background: "var(--black)" }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
