"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import Slide from "@/components/Slide"
import OpeningGate from "@/components/OpeningGate"
import CountdownTimer from "@/components/CountdownTimer"
import BottomNav from "@/components/BottomNav"
import LocationModal from "@/components/LocationModal"
import useMusic from "@/components/Music"
import useVoiceover from "@/components/Voiceover"

const durations = [10000, 17000, 16000, 8000, 14000, 14000]

/* ── Compact dividers ── */
function NavyDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "0.75rem 0" }}>
      <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, transparent, var(--navy-light), transparent)" }} />
      <div style={{ width: 6, height: 6, background: "var(--navy-light)", transform: "rotate(45deg)" }} />
      <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, transparent, var(--navy-light), transparent)" }} />
    </div>
  )
}

function GreenDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "0.75rem 0" }}>
      <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, transparent, var(--army-accent), transparent)" }} />
      <div style={{ width: 6, height: 6, background: "var(--army-accent)", transform: "rotate(45deg)" }} />
      <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, transparent, var(--army-accent), transparent)" }} />
    </div>
  )
}

function NavyLine() {
  return <div style={{ width: 160, height: 1, background: "linear-gradient(90deg, transparent, var(--navy-light), transparent)", margin: "0.75rem auto" }} />
}

function MixedLine() {
  return <div style={{ width: 140, height: 1, background: "linear-gradient(90deg, transparent, var(--navy-accent), var(--army-accent), var(--navy-accent), transparent)", margin: "0.75rem auto" }} />
}

export default function Home() {
  const params = useSearchParams()
  const guest = params.get("to")

  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [slideshowDone, setSlideshowDone] = useState(false)
  const [awakened, setAwakened] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showLocation, setShowLocation] = useState(false)

  const { play, duck, unduck } = useMusic()
  const { playForSlide, stopAll } = useVoiceover(
    {
      0: "/puisi1.mp3",
      1: "/puisi2.mp3",
      2: "/puisi3.mp3",
      3: "/puisi4.mp3",
      4: "/puisi5.mp3",
      5: "/puisi6.mp3",
    },
    { onStart: duck, onEnd: unduck }
  )

  /* ── Voiceover Control ── */
  useEffect(() => {
    if (!started) return
    // Slide 4 (index 3): delay puisi4.mp3 by 2 seconds
    if (index === 3) {
      const delay = setTimeout(() => playForSlide(index), 2000)
      return () => clearTimeout(delay)
    }
    playForSlide(index)
  }, [index, started, playForSlide])

  /* ── reff transition at 44s total ── */
  useEffect(() => {
    if (!started) return
    const reffTimer = setTimeout(() => {
      setAwakened(true)
      setShowFlash(true)
      setTimeout(() => setShowFlash(false), 2500)
    }, 44000)
    return () => clearTimeout(reffTimer)
  }, [started])

  useEffect(() => {
    if (!started) return
    if (index >= durations.length - 1) {
      setSlideshowDone(true)
      return
    }

    const timer = setTimeout(() => {
      const vh = document.documentElement.clientHeight || window.innerHeight
      window.scrollTo({
        top: vh * (index + 1),
        behavior: "smooth",
      })
      setIndex((prev) => prev + 1)
    }, durations[index])

    return () => clearTimeout(timer)
  }, [index, started])

  const navigateToSlide = useCallback((slideIndex: number) => {
    setShowLocation(false)
    const vh = document.documentElement.clientHeight || window.innerHeight
    window.scrollTo({
      top: vh * slideIndex,
      behavior: "smooth",
    })
  }, [])

  return (
    <main>
      {!started && (
        <OpeningGate
          name={guest || undefined}
          onOpen={() => {
            setStarted(true)
            setIndex(0)
            window.scrollTo({ top: 0 })
            play(true)
          }}
        />
      )}

      {started && (
        <>
          {/* ═══════ SLIDE 1 — Bismillah ═══════ */}
          <Slide slideNum={1} particleColor="navy" cornerColor="navy">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              transition={{ delay: 0.3, duration: 1.5 }}
              className="bismillah-text font-[family-name:var(--font-playfair)]"
            >
              Bismillahirrahmanirrahim
            </motion.p>

            <NavyDivider />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)", lineHeight: 1.9, fontStyle: "italic", color: "var(--text-primary)", marginTop: 16 }}
            >
              Di antara ribuan kemungkinan,<br />
              semesta mempertemukan dua jiwa…
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", lineHeight: 1.9, color: "var(--text-secondary)", opacity: 0.7, marginTop: 12 }}
            >
              bukan dalam terang,<br />
              melainkan dari lorong-lorong gelap<br />
              yang pernah dilalui.
            </motion.p>

            <NavyLine />
          </Slide>

          {/* ═══════ SLIDE 2 — Perjalanan ═══════ */}
          <Slide slideNum={2} particleColor="green" cornerColor="green">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)", lineHeight: 1.9, fontStyle: "italic", color: "var(--text-primary)" }}
            >
              Kami pernah berjalan sendiri,<br />
              menembus hari-hari yang terasa panjang…
            </motion.p>

            <GreenDivider />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", lineHeight: 1.9, color: "var(--text-secondary)", opacity: 0.8, marginTop: 8 }}
            >
              belajar bahwa jarak bukan sekadar ruang,<br />
              tapi ujian tentang siapa yang tetap tinggal<br />
              ketika segalanya terasa ingin pergi.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)", lineHeight: 1.9, fontStyle: "italic", color: "var(--army-light)", marginTop: 16 }}
            >
              Dan pada akhirnya…<br />
              perasaan menemukan jalannya pulang.
            </motion.p>
          </Slide>

          {/* ═══════ SLIDE 3 — Refleksi ═══════ */}
          <Slide slideNum={3} particleColor="navy" cornerColor="green">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)", color: "var(--text-primary)" }}
            >
              Kami bukan dua insan tanpa luka.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", lineHeight: 1.9, color: "var(--text-secondary)", opacity: 0.8, marginTop: 12 }}
            >
              Ada cerita yang pernah retak,<br />
              ada langkah yang pernah tersesat.<br />
              <em>Namun justru dari sana… kami belajar,</em>
            </motion.p>

            <MixedLine />

            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)", color: "var(--army-light)", marginTop: 8 }}
            >
              bahwa terang tidak datang tanpa gelap.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 1 }}
              className="mixed-text font-[family-name:var(--font-playfair)]"
              style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.4rem)", fontWeight: 600, marginTop: 12 }}
            >
              Dan cinta adalah cahaya itu.
            </motion.p>
          </Slide>

          {/* ═══════ SLIDE 4 — Nama Mempelai ═══════ */}
          <Slide slideNum={4} particleColor="navy" cornerColor="navy" bright={awakened} showFlash={showFlash}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              transition={{ delay: 0.2, duration: 1 }}
              style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--navy-light)", marginBottom: 8 }}
            >
              Pernikahan
            </motion.p>

            <NavyLine />

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-[family-name:var(--font-playfair)] navy-text"
              style={{ fontSize: "clamp(1.5rem, 6vw, 2.2rem)", fontWeight: 700, lineHeight: 1.3, marginTop: 8 }}
            >
              Najmi Safiira<br />Wardani
            </motion.h1>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="ring-icon"
              style={{ margin: "10px 0" }}
            >
              <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left ring */}
                <ellipse cx="18" cy="16" rx="12" ry="12" stroke="var(--navy-light)" strokeWidth="1.2" opacity="0.8" />
                <ellipse cx="18" cy="16" rx="12" ry="12" stroke="var(--navy-glow)" strokeWidth="0.5" opacity="0.4" />
                {/* Right ring */}
                <ellipse cx="30" cy="16" rx="12" ry="12" stroke="var(--army-light)" strokeWidth="1.2" opacity="0.8" />
                <ellipse cx="30" cy="16" rx="12" ry="12" stroke="var(--army-glow)" strokeWidth="0.5" opacity="0.4" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="font-[family-name:var(--font-playfair)] navy-text"
              style={{ fontSize: "clamp(1.5rem, 6vw, 2.2rem)", fontWeight: 700, lineHeight: 1.3 }}
            >
              Muhammad Herru<br />Ristian
            </motion.h1>

            <NavyLine />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", color: "var(--text-secondary)", marginTop: 8 }}
            >
              Dua nama, <em>satu tujuan…</em>
            </motion.p>
          </Slide>

          {/* ═══════ SLIDE 5 — Detail Acara ═══════ */}
          <Slide slideNum={5} particleColor="green" cornerColor="green" bright={awakened}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              transition={{ delay: 0.2, duration: 1 }}
              style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--army-light)", marginBottom: 8 }}
            >
              Akad Nikah & Resepsi
            </motion.p>

            <GreenDivider />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              style={{ fontSize: "clamp(0.8rem, 3vw, 0.95rem)", lineHeight: 1.8, color: "var(--text-secondary)", opacity: 0.8, marginBottom: 12 }}
            >
              Dengan memohon rahmat dan ridho Allah SWT,<br />
              kami bermaksud menyelenggarakan akad dan resepsi pernikahan:
            </motion.p>

            {/* date & venue card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="border-navy"
              style={{
                borderRadius: 12, padding: "1rem 1.25rem",
                background: "rgba(90,138,181,0.04)",
              }}
            >
              <h2
                className="font-[family-name:var(--font-playfair)] mixed-text"
                style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)", fontWeight: 700, marginBottom: 8 }}
              >
                Minggu, 26 April 2026
              </h2>
              <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, var(--navy-light), transparent)", margin: "6px auto" }} />
              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: 8, marginBottom: 6 }}>
                <p style={{ fontSize: "clamp(0.88rem, 3.2vw, 1.05rem)", color: "var(--navy-glow)", fontWeight: 600 }}>
                  Akad : 09.00
                </p>
                <p style={{ fontSize: "clamp(0.88rem, 3.2vw, 1.05rem)", color: "var(--army-light)", fontWeight: 600 }}>
                  Resepsi : 11.00 - 14.00
                </p>
              </div>
              <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, var(--navy-light), transparent)", margin: "6px auto" }} />
              <p style={{ fontSize: "clamp(0.75rem, 2.8vw, 0.9rem)", lineHeight: 1.7, color: "var(--text-secondary)", opacity: 0.8, marginTop: 6 }}>
                Kp. Cipeuyeum No. 192<br />
                RT 01 / RW 01<br />
                Kec. Haurwangi, Kab. Cianjur
              </p>
              <p style={{ fontSize: "clamp(0.7rem, 2.8vw, 0.85rem)", color: "var(--text-secondary)", fontStyle: "italic", marginTop: 4, opacity: 0.8 }}>
                (Sebrang kantor kecamatan Haurwangi)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ marginTop: 16 }}
            >
              <CountdownTimer />
            </motion.div>
          </Slide>

          {/* ═══════ SLIDE 6 — Penutup ═══════ */}
          <Slide slideNum={6} particleColor="green" cornerColor="navy" bright={awakened}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--navy-light)", marginBottom: 8 }}
            >
              Penutup
            </motion.p>

            <NavyLine />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ marginTop: 8 }}
            >
              <p style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)", lineHeight: 1.9, fontStyle: "italic", color: "var(--text-secondary)" }}>
                Pada akhirnya,<br />
                cinta bukan tentang menemukan yang sempurna…
              </p>
              <p style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", lineHeight: 1.9, color: "var(--text-secondary)", opacity: 0.8, marginTop: 8 }}>
                melainkan tentang menerima,<br />
                dan tetap memilih,<br />
                dalam segala keadaan.
              </p>
            </motion.div>

            <MixedLine />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", lineHeight: 1.9, color: "var(--army-light)", marginTop: 4 }}
            >
              Kehadiran dan doa restu Anda<br />
              adalah cahaya yang menyempurnakan hari kami.
            </motion.p>

            <NavyLine />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{ marginTop: 4 }}
            >
              <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--navy-light)", opacity: 0.85, marginBottom: 4 }}>
                Wassalamu&apos;alaikum Wr. Wb.
              </p>
              <p className="font-[family-name:var(--font-playfair)] mixed-text" style={{ fontSize: "clamp(1.3rem, 5vw, 1.8rem)", fontWeight: 700 }}>
                Najmi &amp; Herru
              </p>
            </motion.div>
          </Slide>

          {/* ═══════ Bottom Navigation ═══════ */}
          {slideshowDone && (
            <BottomNav onNavigate={navigateToSlide} onLokasiClick={() => setShowLocation(true)} />
          )}

          <LocationModal isOpen={showLocation} onClose={() => setShowLocation(false)} />
        </>
      )}
    </main>
  )
}
