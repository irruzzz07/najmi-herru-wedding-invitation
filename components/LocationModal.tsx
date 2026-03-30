"use client"

import { motion, AnimatePresence } from "framer-motion"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const LAT = -6.81958
const LNG = 107.30114
const ZOOM = 18

// Google Maps embed URL with satellite view
const EMBED_URL = `https://maps.google.com/maps?q=${LAT},${LNG}&ll=${LAT},${LNG}&t=k&z=${ZOOM}&output=embed`

// Deep link that opens Google Maps app on mobile or new tab on desktop
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`

function seeded(i: number, offset = 0) {
  const x = Math.sin(i * 9301 + offset * 49297 + 49297) * 49297
  return x - Math.floor(x)
}

function Fireflies({ count = 14 }: { count?: number }) {
  return (
    <div className="particles-container">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.round((2 + seeded(i, 13) * 4) * 10) / 10
        return (
          <div
            key={i}
            className="particle-green"
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

export default function LocationModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "radial-gradient(ellipse at center, rgba(34, 74, 66, 0.85) 0%, rgba(26, 58, 53, 0.9) 50%, rgba(18, 46, 40, 0.95) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              overflow: "hidden",
            }}
          >
            <Fireflies count={16} />
            {/* Vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
              }}
            />
          </motion.div>

          {/* Modal centering wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              width: "min(92vw, 420px)",
              maxHeight: "85dvh",
              borderRadius: 16,
              overflow: "hidden",
              background: "linear-gradient(145deg, rgba(18, 22, 28, 0.97), rgba(12, 16, 22, 0.98))",
              border: "1px solid rgba(90, 138, 181, 0.2)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(90,138,181,0.08)",
              pointerEvents: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.1rem",
                borderBottom: "1px solid rgba(90, 138, 181, 0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--navy-light)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 18, height: 18 }}
                >
                  <path d="M12 21c-4-4-8-7.5-8-11a8 8 0 1 1 16 0c0 3.5-4 7-8 11z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--navy-light)",
                    fontWeight: 500,
                  }}
                >
                  Lokasi Acara
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                }}
                aria-label="Tutup"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Map embed */}
            <div
              style={{
                width: "100%",
                height: "min(55vw, 260px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <iframe
                src={EMBED_URL}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  display: "block",
                  filter: "contrast(1.05) brightness(0.95)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Acara - Google Maps"
              />

              {/* Subtle overlay gradient at bottom of map */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 30,
                  background: "linear-gradient(transparent, rgba(12, 16, 22, 0.6))",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Address info */}
            <div style={{ padding: "1rem 1.2rem 0.6rem" }}>
              <p
                style={{
                  fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  opacity: 0.85,
                  textAlign: "center",
                }}
              >
                Kp. Cipeuyeum No. 192<br />
                RT 01 / RW 01<br />
                Kec. Haurwangi, Kab. Cianjur
              </p>
              <p
                style={{
                  fontSize: "clamp(0.7rem, 2.8vw, 0.85rem)",
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                  marginTop: 4,
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                (Sebrang kantor kecamatan Haurwangi)
              </p>
            </div>

            {/* CTA Button */}
            <div style={{ padding: "0.6rem 1.2rem 1.2rem" }}>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: 10,
                  border: "none",
                  background: "linear-gradient(135deg, rgba(90,138,181,0.2), rgba(107,139,71,0.2))",
                  color: "var(--navy-glow)",
                  fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 20px rgba(90,138,181,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(90,138,181,0.35), rgba(107,139,71,0.35))"
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(90,138,181,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(90,138,181,0.2), rgba(107,139,71,0.2))"
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(90,138,181,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                }}
              >
                {/* Google Maps icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c-4-4-8-7.5-8-11a8 8 0 1 1 16 0c0 3.5-4 7-8 11z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Buka dari Google Map
                {/* External link icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
