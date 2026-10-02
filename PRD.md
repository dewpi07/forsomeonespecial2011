# PRD v2: "For You pi" — Website Personal Romantis (Bento Grid)

> **Untuk AI penerus: BACA FILE INI SAMPAI SELESAI, lalu baca `STATUS.md`, sebelum menyentuh kode.**
> Bagian 2 (keputusan & kondisi nyata) dan Bagian 13 (protokol serah-terima) paling penting.
> Bahasa komunikasi dengan pemilik project: **Bahasa Indonesia**. Pemilik adalah pemula, jelaskan dengan sederhana.

---

## 1. Ringkasan Produk

| | |
|---|---|
| **Nama** | For You pi |
| **Jenis** | Website tribute personal romantis satu halaman untuk pasangan |
| **Tujuan** | Kejutan digital yang terasa intim & hidup: galeri foto, cerita, linimasa kenangan, kata manis, surat rahasia, lagu, dan interaksi kecil yang menggemaskan |
| **Penerima** | Satu orang (pasangan pemilik). Akses utama **HP (mobile-first)**, sekunder desktop |
| **Hosting** | Vercel (gratis). Tanpa backend/database |

**Kompleksitas utama (brief pemilik):**
1. UI **sangat interaktif** dan **animation-heavy** agar terasa intim dan hidup.
2. **Bento grid** sebagai struktur utama: kenangan, galeri, timeline, pesan dalam komposisi modular yang estetik.
3. **Adaptive layout**: treatment mobile vs desktop **berbeda secara desain**, bukan sekadar mengecil.
4. Dibangun dengan **Tailwind CSS**.

---

## 2. Keputusan Arsitektur & Kondisi Nyata (per 2 Okt 2026)

### 2.1 Keputusan stack (BERUBAH dari PRD v1)
PRD v1 merencanakan HTML statis + Tailwind v3 CLI. **PRD v2 memutuskan:**

| Item | Keputusan | Alasan |
|---|---|---|
| Framework | **Next.js 16 (App Router) + React 19 + TypeScript** | Komponen modular (1 kartu = 1 file) jauh lebih mudah diteruskan antar AI; preview v0 & deploy Vercel langsung jalan tanpa konfigurasi build manual |
| Styling | **Tailwind CSS v4** (`@import 'tailwindcss'`, token via `@theme inline` di `app/globals.css`) | Sesuai brief (Tailwind); v4 tidak butuh `tailwind.config.js` |
| Animasi | **`motion`** (Framer Motion, `motion/react`) + CSS keyframes | Spring, gesture, `AnimatePresence`, `useReducedMotion` |
| Ikon | **lucide-react** | Konsisten, ringan; emoji hanya sebagai teks dekoratif kecil |
| Font | `next/font/google`: Plus Jakarta Sans (isi), DM Serif Display (judul), Caveat (tulisan tangan) | Self-host otomatis, tanpa FOUC |
| Data | **Satu file `lib/content.ts`** | Pemilik cukup edit 1 file untuk teks/foto/lagu |
| Analitik | **Dihapus** (`@vercel/analytics` di-uninstall) | Privasi, situs pribadi |
| Keamanan | Header di `next.config.mjs` (`headers()`) menggantikan `vercel.json` lama | Satu tempat konfigurasi |

> Output tetap "statis": halaman tidak butuh server data; semua interaksi di klien. Jangan menambah backend/database kecuali pemilik minta.

### 2.2 Aset yang tersedia
- `public/assets/foto/foto1.jpg`, `foto2.jpg`, `foto3.jpg` — **sudah di-crop** dari kolase 2x2 asli (diambil panel kiri-atas, 360x640, ±25 KB). Kolase asli berisi 4 salinan identik.
  - foto1: berhijab merah marun, malam hari, efek hati pink.
  - foto2: hijab krem/pink pucat, dagu bertumpu di tangan, latar hijau toska, efek hati.
  - foto3: hijab pink pucat, sweater mustard, gelang, malam hari (foto agak miring).
- `public/assets/musik/musik1.mp3`..`musik6.mp3` (±22 MB total). Pemetaan lagu ada di `lib/content.ts`.
- File lama (`index.html`, `style.css`, `script.js`, `vercel.json`, `README.md` versi lama) **tidak dipakai lagi**; fiturnya sudah dipetakan ke komponen (Bagian 6).

### 2.3 Temuan audit lama & statusnya
| # | Temuan | Status di v2 |
|---|---|---|
| A1 | `style.css` lama tidak punya gaya untuk fitur buatan `script.js` | Selesai: ditulis ulang di Tailwind |
| A2 | Tidak memakai Tailwind | Selesai: Tailwind v4 |
| A3 | Palet tidak konsisten (pink vs ungu-emas) | Selesai: pink-lilac + aksen emas lembut |
| A4 | Label "Hitung mundur kenal" salah, isi tanggal mentah | Selesai: "Sudah kenal selama" + count-up |
| A6 | Foto berupa kolase | Selesai: di-crop 1 panel; `next/image` + alt |
| A7 | Audio berat, `preload="auto"` | Selesai: `preload="none"`; kompres mp3 masih TODO (Fase 4) |
| A8 | Daftar lagu ganda | Selesai: satu sumber `content.lagu` |
| A9 | MP3 berlisensi pihak lain | **Risiko terbuka**: sarankan link hanya dibagikan ke pasangan |

---

## 3. Goals, Non-goals, Persona

**Goals**
- G1 Terasa intim & hidup: tiap kartu punya micro-interaction halus yang bermakna.
- G2 Bento grid modular: menambah kartu = menambah 1 komponen + 1 baris di grid.
- G3 Mobile & desktop **berbeda secara desain** (Bagian 5).
- G4 Konten diedit dari SATU file (`lib/content.ts`).
- G5 Cepat di HP 4G (LCP < 2,5 s; aset berat dimuat malas).
- G6 Mudah diteruskan antar AI (PRD + STATUS + struktur jelas).

**Non-goals** (jangan dikerjakan kecuali diminta): backend/database/login, form kirim pesan, upload foto oleh pengunjung, analitik/pelacak.

**Persona:** (1) Pemilik: pemula, edit teks/foto sendiri, deploy ke Vercel. (2) Penerima: membuka dari HP, ingin terkejut & tersentuh, tidak teknis.

---

## 4. Design System

**Nuansa:** soft, feminin, hangat, sedikit mewah. Mode gelap tetap romantis (ungu tua, bukan hitam murni).

**Token warna** (didefinisikan di `app/globals.css` sebagai CSS variable, dipetakan ke Tailwind lewat `@theme inline`; pakai kelas `bg-pink`, `text-ink`, dst.)
```
Terang: bg #fff7f5 | ink #3b2a35 | muted #7a6570 | line #f0dfe0
        pink #ffd9e3 | peach #ffe3cf | mint #d6f2e4 | lilac #e5dcff | butter #fff1bd
        plum #3b2340 | plum-ink #fff0f5 | accent #d94f86 | gold #c9a96e
Gelap : bg #1d1420 | ink #fbeaf1 | muted #c3aab7 | line #3a2a40
        pink #4a2a3b | peach #4a3229 | mint #24403a | lilac #36305a | butter #4a4224
        plum #0f0a12 | accent #ff8db8 | gold #e0c48a
```
Catatan: nama token "dark" lama diganti **`plum`** agar tidak bentrok dengan varian `dark:` Tailwind.

**Tipografi:** `font-sans` Plus Jakarta Sans · `font-serif` DM Serif Display (judul/angka) · `font-hand` Caveat (caption/kutipan).
**Radius:** kartu `rounded-[28px]`, hero `rounded-[36px]`, pill `rounded-full`. **Gap grid:** 12px mobile, 16px desktop.
**Mode gelap:** kelas `.dark` di `<html>`, disimpan di `localStorage` key `fyp_theme`; skrip inline di `<head>` mencegah flash.
**Aturan konten:** semua teks UI Bahasa Indonesia, nada hangat, santai, tidak lebay. Apostrof di JSX di-escape.

---

## 5. Layout Adaptif (inti kompleksitas)

| | Mobile (< 640px) — "Story Experience" | Tablet (640–1023px) | Desktop (≥ 1024px) — "Bento Gallery" |
|---|---|---|---|
| Grid | 1–2 kolom kartu kecil berpasangan, `h2` jadi tinggi biasa | 2 kolom | 4 kolom, `grid-flow-dense`, `auto-rows-[minmax(160px,auto)]`, variasi `w2/h2` |
| Navigasi | **Bottom nav** (Home · Galeri · Cerita · Musik), safe-area | Header atas | Header sticky + nav teks + toggle tema |
| Galeri | **Carousel horizontal snap** (`snap-x snap-mandatory`) + indikator titik | Foto di grid | Foto besar di grid + hover zoom + **tilt 3D** |
| Interaksi | Tap-burst hati, swipe, haptic `navigator.vibrate(10)` | Gabungan | Hover spotlight (cahaya ikut kursor), jejak kilau kursor, tilt |
| Partikel | Maks 6 kelopak | 10 | Maks 12 kelopak + jejak kursor |
| Musik | Mini player di atas bottom nav | Kartu pemutar | Kartu pemutar + tombol piringan melayang |

Breakpoint Tailwind default: `sm=640`, `lg=1024`. Perilaku pointer dipisah dengan `matchMedia('(hover:hover) and (pointer:fine)')` (hook `useIsDesktopPointer`). Target sentuh ≥ 44px.

---

## 6. Katalog Kartu Bento (urutan tampil)

Setiap kartu memakai pembungkus `components/bento/bento-card.tsx` (props: `tone`, `className` ukuran, `index` untuk delay reveal, `spotlight`).

| ID | Komponen | Ukuran desktop | Interaksi |
|---|---|---|---|
| hero | `hero.tsx` | penuh | efek ketik, debu emas, kelopak, tombol sosmed, CTA "Mulai" |
| foto1 | `cards/photo-card.tsx` | w2 h2 | tilt 3D, zoom, klik = lightbox |
| ratu | `cards/text-cards.tsx` (QueenCard) | 1x1 | ikon mahkota bergoyang |
| spesial | text-cards (SpecialCard) | 1x1 | – |
| days | `cards/days-card.tsx` | 1x1 | count-up + detik berjalan |
| favorit | text-cards (FavoritesCard) | w2 | chip muncul berurutan |
| foto2 | photo-card | w2 h2 | sama dengan foto1 |
| joke | text-cards (JokeCard) | 1x1 | klik = balik kartu (flip) |
| pesan | `cards/surprise-card.tsx` | 1x1 | klik = pesan berganti + burst |
| player | `cards/player-card.tsx` | w2 | play/pause/next/prev, progress bisa di-seek, equalizer, daftar lagu |
| timeline | `cards/timeline-card.tsx` | w2 h2 | reveal berurutan, garis tumbuh |
| momen | text-cards (MomentCard) | w2 | – |
| foto3 | photo-card | w2 h2 | sama |
| cerita | text-cards (StoryCard) | w2 | kutipan tulisan tangan |
| surat | `cards/letter-card.tsx` + `letter-dialog.tsx` | w2 | amplop terbuka, surat naik, efek ketik |
| gosok | `cards/scratch-card.tsx` | w2 | canvas scratch, terbuka ≥ 55% |
| cinta | `cards/love-card.tsx` | 1x1 | tap = hati terbang, counter `fyp_love` |
| katamanis | `cards/sweet-words-card.tsx` | 1x1 | berganti 4,5 dtk, pause saat tab tersembunyi |
| sosmed | `cards/social-cards.tsx` | w2 (2 kartu) | link keluar `rel="noopener"` |
| penutup | text-cards (ClosingCard) | w4 | – |

Global: `loader.tsx` (splash berpersen), `scroll-progress.tsx`, `falling-petals.tsx`, `tap-burst.tsx` (burst + cursor trail), `music-fab.tsx`, `mobile-player-bar.tsx`, `bottom-nav.tsx`, `site-header.tsx`, `lightbox.tsx`, `mobile-gallery.tsx`.

---

## 7. Requirement Fungsional

Legenda: ✅ selesai · ⚠️ perlu perbaikan · 🆕 belum ada. **Status aktual dicatat di `STATUS.md`.**

| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-01 | Splash/loading berpersen, hilang ≤ 6 dtk, bisa dilewati (klik) | Tidak pernah macet; reduced-motion ≤ 300 ms |
| FR-02 | Hero efek ketik; teks lengkap tersedia untuk screen reader | Tidak ada layout shift |
| FR-03 | Dark/light mode tersimpan, tanpa flash | – |
| FR-04 | Hitung hari sejak `content.start` (YYYY-MM-DD, zona lokal) | Tidak negatif; count-up 1,2 dtk |
| FR-05 | Galeri `next/image` + alt + lightbox (swipe mobile, ←/→ desktop, Esc) | Fokus kembali ke pemicu |
| FR-06 | Pemutar musik: play/pause/next/prev, seek, daftar lagu, lanjut otomatis | Tidak auto-play sebelum interaksi; pesan error ramah |
| FR-07 | Surat rahasia (dialog, Esc/klik luar menutup) | `role="dialog"`, `aria-modal` |
| FR-08 | Kartu gosok (mouse + sentuh) | Resize tidak merusak |
| FR-09 | Kirim cinta (counter `localStorage`) | Aman bila storage diblok |
| FR-10 | Kata manis berganti, pause saat tab tersembunyi | Tidak bocor timer |
| FR-11 | Linimasa kenangan dari `content.timeline` | ≥ 5 item, reveal berurutan |
| FR-12 | Sosmed IG/TikTok (kartu + tombol hero) | `rel="noopener noreferrer"` |
| FR-13 | Nav atas (desktop) / bottom nav (mobile), tandai bagian aktif | Smooth scroll hormati reduced-motion |
| FR-14 | Partikel (kelopak, debu, burst, kursor) | Dibatasi jumlah; nonaktif saat reduced-motion |
| FR-15 | Semua konten dari `lib/content.ts` | Pemilik tidak perlu menyentuh komponen |
| FR-16 | Meta SEO + Open Graph + favicon | Preview WhatsApp tampil judul + gambar |

---

## 8. Spesifikasi Animasi

Prinsip: **halus, bertujuan, hemat.** Animasikan hanya `transform` & `opacity`.

| Animasi | Durasi / easing |
|---|---|
| Reveal kartu (whileInView, sekali) | 600 ms, `[0.2,0.8,0.2,1]`, delay `(index % 4) * 80ms`, dari `y:24, scale:.96` |
| Hover kartu (desktop) | spring, scale 1.02 + bayangan |
| Spotlight kursor | radial-gradient mengikuti `--mx/--my` |
| Tilt foto (desktop) | ±8°, spring |
| Loader | min 1,8 s + tunggu `load`, maks 6 s; cincin SVG `pathLength` |
| Efek ketik hero | 28 ms/huruf |
| Burst hati (tap) | 0,9–1,5 s, maks 6/ketuk, dihapus otomatis |
| Kelopak jatuh | 14–26 s loop |
| Equalizer / piringan | CSS keyframes saat musik berputar |
| Surat dibuka | tutup amplop berputar (rotateX) 500 ms, surat naik |
| Count-up hari | 1,2 s ease-out |

**Wajib:** `prefers-reduced-motion` mematikan animasi non-esensial (`useReducedMotion` + blok CSS). Hentikan interval saat `document.hidden`.
**Anggaran performa mobile:** maks ±30 elemen beranimasi bersamaan.

---

## 9. Struktur Folder

```
/
├─ PRD.md                    ← file ini
├─ STATUS.md                 ← log progres & "Langkah berikutnya" (WAJIB diperbarui)
├─ README.md                 ← panduan pemilik (cara edit & deploy)
├─ lib/content.ts            ← SATU sumber teks, tanggal, lagu, foto, timeline, sosmed, surat
├─ lib/utils.ts              ← cn()
├─ hooks/                    ← use-media.ts, use-reduced.ts, use-local-storage.ts
├─ app/layout.tsx            ← font, metadata, skrip tema anti-flash
├─ app/page.tsx              ← menyusun semua section
├─ app/globals.css           ← token warna, @theme, keyframes
├─ components/
│  ├─ providers/audio-provider.tsx, fx-provider.tsx
│  ├─ bento/bento-card.tsx, bento-grid.tsx
│  ├─ cards/*.tsx            ← satu kartu = satu file
│  └─ (global) loader, hero, site-header, bottom-nav, theme-toggle, scroll-progress,
│     falling-petals, tap-burst, music-fab, mobile-player-bar, lightbox, mobile-gallery, site-footer
├─ public/assets/foto/*.jpg, public/assets/musik/*.mp3
└─ next.config.mjs           ← security headers
```
**Aturan kode:** Bahasa Indonesia untuk teks UI; komponen kecil; tanpa `innerHTML`; client component hanya bila perlu interaksi; tidak menambah library tanpa alasan.

**Kontrak data `lib/content.ts`:**
```ts
CONTENT = {
  meta:{ title, description },
  nama, start:'YYYY-MM-DD',
  hero:{ judul, sorot, kalimat },
  kartu:{ ratu, spesial, favorit:string[], joke:{tanya,jawab}, momen, cerita:{teks,dari}, penutup:{judul,isi} },
  pesanKejutan:string[], kataManis:string[], gosok:{judul,isi}, surat:{judul,isi,ttd},
  lagu:{judul,artis,file}[], foto:{src,alt,caption}[],
  timeline:{tanggal,judul,teks}[], sosmed:{instagram,tiktok}
}
```

---

## 10. Persyaratan Non-Fungsional
- **Performa:** LCP < 2,5 s di 4G; foto ≤ 150 KB; musik `preload="none"`; mp3 dikompres ke 128 kbps (TODO).
- **Aksesibilitas:** kontras AA, `focus-visible`, tombol berlabel, dialog ber-`role`, `lang="id"`, gambar ber-`alt`.
- **Browser:** Chrome Android, Safari iOS 15+, desktop modern. Safari: audio butuh gestur.
- **Privasi:** tanpa analitik. Pastikan penerima setuju fotonya dipublikasikan.
- **Keamanan:** header `nosniff`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`, HSTS.
- **Hak cipta:** lihat A9.

---

## 11. Roadmap & Checklist (centang di `STATUS.md`)

**Fase 0 — Audit & keputusan** — selesai.
**Fase 1 — Fondasi:** token & tema, font, layout, metadata, header keamanan, `content.ts`.
**Fase 2 — Kartu bento & fitur lama:** semua kartu di Bagian 6 + loader, partikel, burst.
**Fase 3 — Adaptif & fitur baru:** bottom nav, carousel galeri mobile, mini player mobile, lightbox, timeline, count-up, amplop.
**Fase 4 — Kualitas & rilis:** kompres mp3, OG image, uji a11y & reduced-motion, uji perangkat nyata, deploy Vercel, uji link di WhatsApp, README final.

**Definition of Done:** semua FR ✅, tanpa error console, Lighthouse mobile Performance ≥ 80 & Accessibility ≥ 90, pemilik bisa mengubah teks/foto/lagu hanya lewat `lib/content.ts` + `public/assets/`.

---

## 12. Cara Menjalankan
```
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # cek produksi
```
Deploy: hubungkan repo ke Vercel atau klik **Publish** di v0. Tidak perlu environment variable.

---

## 13. Protokol Serah-Terima Antar AI (WAJIB)

**Saat MULAI sesi:**
1. Baca `PRD.md` lalu `STATUS.md`.
2. Konfirmasi singkat ke pemilik: fase berjalan & langkah berikutnya.
3. Jangan ubah keputusan Bagian 2.1 & 9 tanpa alasan + persetujuan pemilik; catat di `STATUS.md`.

**Selama bekerja:** perubahan kecil & teruji; jangan tulis ulang file yang sudah jalan; setiap item selesai → perbarui `STATUS.md`.

**Saat token hampir habis (± 10–15% tersisa):**
1. Hentikan pekerjaan baru; pastikan project **tidak rusak** (build/preview jalan).
2. Perbarui `STATUS.md` → "Titik berhenti" & "Langkah berikutnya" (konkret).
3. Kemas seluruh project (tanpa `node_modules` & `.next`) jadi `for-you-pi.zip` di root (`zip -r for-you-pi.zip . -x "node_modules/*" ".next/*" "*.zip"`), lalu beri tahu pemilik. Pemilik juga bisa unduh via menu ⋯ → **Download ZIP** di v0.
4. Beri pemilik kalimat untuk ditempel ke AI berikutnya:
   *"Baca PRD.md lalu STATUS.md di zip ini, lalu lanjutkan dari 'Langkah berikutnya'. Balas dalam Bahasa Indonesia."*

**Template catatan `STATUS.md`:**
```
## [tanggal] — [nama AI]
- Dikerjakan: …
- File diubah: …
- Keputusan baru: …
- Masalah terbuka: …
- Langkah berikutnya: …
```

---

## 14. Pertanyaan Terbuka untuk Pemilik
1. Konfirmasi tanggal kenal `2026-09-21` dan tanggal-tanggal untuk linimasa (isi sekarang masih contoh).
2. Ada foto asli (bukan kolase) dengan resolusi lebih tinggi?
3. Situs dibagikan privat (hanya ke pasangan) atau publik? (hak cipta musik, A9)
4. Isi "Hal-hal favoritmu" (sekarang: "Masih Mencari Tahu").
