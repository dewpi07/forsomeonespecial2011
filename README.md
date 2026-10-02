# For You pi 💌

Website kecil romantis untuk seseorang yang spesial. Dibuat dengan Next.js + Tailwind v4.

## Cara mengubah isi (cukup 1 file!)
Buka **`lib/content.ts`**, lalu ganti teks di antara tanda kutip:
- `nama`, `start` (tanggal kenal, format `TAHUN-BULAN-TANGGAL`)
- `hero`, `kartu`, `kataManis`, `pesanKejutan`, `gosok`, `surat`
- `timeline` → **isi sekarang masih contoh, ganti dengan tanggal & cerita kalian**
- `sosmed` → username Instagram & TikTok

**Foto:** taruh di `public/assets/foto/`, lalu daftarkan di `foto` pada `content.ts` (isi `alt` = deskripsi singkat foto).
**Lagu:** taruh mp3 di `public/assets/musik/`, lalu daftarkan di `lagu`.

## Menjalankan di komputer
```
pnpm install
pnpm dev      # buka http://localhost:3000
pnpm build    # cek versi produksi
```

## Deploy ke Vercel (gratis)
1. Upload project ke GitHub, lalu "Import" di vercel.com — atau klik **Publish** di v0.
2. Tidak perlu environment variable.
3. Setelah live, kirim link ke WhatsApp untuk tes tampilan preview (gambar `public/og.jpg`).
   Kalau preview lama masih muncul, tambahkan `?v=2` di ujung link.

## Catatan penting
- Pastikan penerima setuju fotonya dipakai.
- Lagu-lagu punya pihak lain (hak cipta). Sebaiknya link hanya dibagikan ke pasangan, jangan dipublikasikan luas.
- Situs sudah diset `noindex` (tidak muncul di Google).

Detail teknis & keputusan desain: lihat `PRD.md`. Progres pekerjaan: `STATUS.md`.
