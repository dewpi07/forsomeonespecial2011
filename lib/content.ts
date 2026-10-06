// ===================================================================
//  SEMUA ISI WEBSITE ADA DI SINI. Ganti teks di antara tanda kutip.
//  Foto: taruh di public/assets/foto/   Musik: public/assets/musik/
// ===================================================================

export type Track = { judul: string; artis: string; file: string }
export type Photo = { src: string; alt: string; caption: string }
export type Moment = { tanggal: string; judul: string; teks: string }

export const CONTENT = {
  meta: {
    title: 'For You pi',
    description:
      'Sebuah hadiah kecil: galeri, cerita, lagu, dan surat untuk seseorang yang spesial.',
  },

  nama: 'pi',

  // Tanggal mulai kenal (format TAHUN-BULAN-TANGGAL)
  start: '2026-09-21',

  // Tanggal lahir (format TAHUN-BULAN-TANGGAL) → dipakai hitung mundur ulang tahun
  lahir: '2011-10-07',
  ultah: {
    kicker: 'Menuju hari spesialmu',
    hariH: 'Happy birthday, yopi maharaja ❤️ Semogaaa dii umurrr kamuuu yanggg baruuu iniiiii, semuaaa hallll baikkk datangggg menghampiriii kamuuu. Semogaa kamuu selaluu sehatt, bahagiaa, dann semuaa impiann kamuuu satuuu perr satuu bisaa terwujuddd. Makasihh udahh hadirrr dii hidupp akuu dann selaluuu jadiii seseoranggg yanggg spesialll buatt akuuu. Akuu berharapp kitaa bisaa teruss barengg, melewatiii banyakk ceritaa dann hari-hari indahh bersamaa. I loveee youuu, always. 🥰🎂❤️',
  },

  hero: {
    judul: 'For You',
    sorot: 'pi',
    kalimat:
      'Cantik seperti seorang putri, lucu dengan caranya sendiri, dan punya aura seperti seorang ratu.',
  },

  kartu: {
    ratu: 'Auranya ratu, tawanya bikin hari candu.',
    spesial: 'Tulus, lucu tanpa berusaha, dan selalu bikin orang merasa diterima.',
    favorit: ['Masih Mencari Tahu', 'Lagu-lagu Hindia', 'Teh hijau?', 'Obrolan malam'],
    joke: {
      tanya: 'Katanya jodoh itu cerminan diri...',
      jawab: 'Pantes kamu agak aneh. Sama kayak aku.',
    },
    doa: 'Semoga semua hal baik selalu tahu jalan pulang ke kamu.',
    momen: 'Kayaknya waktu pipi bahas tentang racun pada malam itu deh.',
    cerita: {
      teks: 'Aku nggak butuh seseorang yang sempurna, aku cuma butuh kamu yang selalu ada.',
      dari: 'dari seorang teman',
    },
    penutup: {
      judul: 'Terima kasih sudah jadi kamu.',
      isi: 'Semoga harimu selalu semanis senyummu.',
    },
  },

  pesanKejutan: [
    'Kamu tuh bikin hari biasa jadi seru.',
    'Ketawamu itu obat paling ampuh.',
    'Terima kasih sudah jadi kamu.',
    'Semoga harimu semanis senyummu.',
    'Kamu lebih hebat dari yang kamu kira.',
  ],

  kataManis: [
    'Senyummu itu tempat favoritku buat pulang.',
    'Kamu bikin hal biasa jadi terasa spesial.',
    'Semoga hari ini baik sama kamu, seperti kamu baik ke orang lain.',
    'Kamu cantik, dan itu bukan cuma soal wajah.',
    'Terima kasih sudah ada.',
  ],

  gosok: { judul: 'Kamu itu istimewa.', isi: 'Jangan lupa tersenyum hari ini.' },

  surat: {
    judul: 'Untuk kamu,',
    isi: 'Aku nggak pandai merangkai kata, tapi aku ingin kamu tahu: kamu salah satu alasan hari-hariku terasa lebih ringan.\n\nTerima kasih sudah jadi kamu apa adanya. Semoga kamu selalu bahagia, ya.',
    ttd: 'dari seseorang yang diam-diam senang kenal kamu',
  },

  lagu: [
    { judul: 'Everything You Are', artis: 'Hindia', file: '/assets/musik/musik1.mp3' },
    { judul: 'Cincin', artis: 'Hindia', file: '/assets/musik/musik2.mp3' },
    { judul: 'Perfect', artis: 'Ed Sheeran', file: '/assets/musik/musik3.mp3' },
    { judul: 'Treat You Better', artis: 'Shawn Mendes', file: '/assets/musik/musik4.mp3' },
    { judul: 'Bergema Sampai Selamanya', artis: 'Nadhif Basalamah', file: '/assets/musik/musik5.mp3' },
    { judul: 'Ho Hey', artis: 'The Lumineers', file: '/assets/musik/musik6.mp3' },
  ] satisfies Track[],

  foto: [
    { src: '/assets/foto/foto1.jpg', alt: 'Pipi berhijab merah marun tersenyum di malam hari dengan efek hati merah muda', caption: 'for you' },
    { src: '/assets/foto/foto2.jpg', alt: 'Pipi berhijab krem bertopang dagu dengan latar hijau toska', caption: 'aura ratu' },
    { src: '/assets/foto/foto3.jpg', alt: 'Pipi berhijab merah muda pucat dan sweater mustard di malam hari', caption: 'tawa yang bikin cerah' },
  ] satisfies Photo[],

  // CONTOH: ganti dengan tanggal & cerita kalian yang sebenarnya
  timeline: [
    { tanggal: '21 Sep 2026', judul: 'Pertama kenal', teks: 'Hari biasa yang ternyata jadi awal sesuatu.' },
    { tanggal: '23 Sep 2026', judul: 'Obrolan tentang racun', teks: 'Malam itu kamu bahas racun, dan aku malah betah dengerin.' },
    { tanggal: '26 Sep 2026', judul: 'Lagu pertama', teks: 'Everything You Are mulai sering diputar.' },
    { tanggal: '29 Sep 2026', judul: 'Ketawa nggak berhenti', teks: 'Joke receh yang entah kenapa lucu banget.' },
    { tanggal: 'Hari ini', judul: 'Website kecil ini', teks: 'Dibuat pelan-pelan, khusus buat kamu.' },
  ] satisfies Moment[],

  sosmed: { instagram: 'yopiismhrja_', tiktok: 'iniiyopiii' },
}
