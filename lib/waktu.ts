// Salam sesuai jam & hitung mundur ulang tahun. Semua memakai waktu lokal perangkat pembuka.

export function getGreeting(nama: string, now: Date = new Date()) {
  const h = now.getHours()
  if (h >= 4 && h < 11) return `Selamat pagi, ${nama}`
  if (h >= 11 && h < 15) return `Selamat siang, ${nama}`
  if (h >= 15 && h < 18) return `Selamat sore, ${nama}`
  return `Selamat malam, ${nama}`
}

// lahir: 'TAHUN-BULAN-TANGGAL'
export function birthdayInfo(lahir: string, now: Date = new Date()) {
  const [by, bm, bd] = lahir.split('-').map(Number)
  const y = now.getFullYear()
  const dayStart = new Date(y, bm - 1, bd)
  const dayEnd = new Date(y, bm - 1, bd + 1)
  const isToday = now >= dayStart && now < dayEnd
  const passed = now >= dayEnd
  const target = passed ? new Date(y + 1, bm - 1, bd) : dayStart
  const age = (passed ? y + 1 : y) - by // usia yang akan / sedang dirayakan
  const ms = isToday ? 0 : Math.max(0, target.getTime() - now.getTime())
  return {
    isToday,
    age,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  }
}
