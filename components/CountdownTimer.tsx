"use client"

import { useState, useEffect } from "react"

const WEDDING_DATE = new Date("2026-04-26T08:00:00+07:00").getTime()

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

export default function CountdownTimer() {
  const [diff, setDiff] = useState(WEDDING_DATE - Date.now())

  useEffect(() => {
    const id = setInterval(() => setDiff(WEDDING_DATE - Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (diff <= 0) return null

  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  const units = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ]

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
      {units.map((u) => (
        <div key={u.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="countdown-box">
            <span
              className="navy-text font-[family-name:var(--font-playfair)]"
              style={{ fontSize: "1.6rem", fontWeight: 700, position: "relative", zIndex: 1 }}
            >
              {pad(u.value)}
            </span>
          </div>
          <span style={{
            fontSize: 10,
            marginTop: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--army-light)",
            textShadow: "0 0 12px rgba(143, 179, 104, 0.2)",
          }}>
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
