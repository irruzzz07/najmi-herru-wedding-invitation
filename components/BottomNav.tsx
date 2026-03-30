"use client"

import { motion } from "framer-motion"
import { useState } from "react"

type Props = {
  onNavigate: (slideIndex: number) => void
  onLokasiClick?: () => void
}

export default function BottomNav({ onNavigate, onLokasiClick }: Props) {
  const [active, setActive] = useState<number | null>(null)

  const items = [
    { label: "Mempelai", slideIndex: 3 },
    { label: "Waktu", slideIndex: 4 },
    { label: "Lokasi", slideIndex: 4 },
  ]

  const handleNav = (item: typeof items[number], idx: number) => {
    setActive(idx)
    if (item.label === "Lokasi" && onLokasiClick) {
      onLokasiClick()
    } else {
      onNavigate(item.slideIndex)
    }
  }

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 102,
        display: "flex",
        justifyContent: "center",
        gap: "2.5rem",
        padding: "0.6rem 1rem 0.8rem",
        background: "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.97) 50%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {items.map((item, idx) => (
        <button
          key={item.label}
          onClick={() => handleNav(item, idx)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: active === idx ? "var(--navy-glow)" : "var(--navy-light)",
            padding: "0.4rem",
            transition: "color 0.3s, transform 0.3s, filter 0.3s",
            position: "relative",
            filter: active === idx ? "drop-shadow(0 0 6px rgba(127,179,222,0.4))" : "none",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
            {item.label === "Mempelai" && (
              <>
                <circle cx="8" cy="5" r="2.5" />
                <path d="M4 21v-4a4 4 0 0 1 4-4h0" />
                <circle cx="16" cy="5" r="2.5" />
                <path d="M20 21v-4a4 4 0 0 0-4-4h0" />
                <path d="M10 13.5h4" />
              </>
            )}
            {item.label === "Lokasi" && (
              <>
                <path d="M12 21c-4-4-8-7.5-8-11a8 8 0 1 1 16 0c0 3.5-4 7-8 11z" />
                <circle cx="12" cy="10" r="3" />
              </>
            )}
            {item.label === "Waktu" && (
              <>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </>
            )}
          </svg>
          <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {item.label}
          </span>
          {/* Active dot indicator */}
          {active === idx && <div className="nav-dot" />}
        </button>
      ))}
    </motion.nav>
  )
}
