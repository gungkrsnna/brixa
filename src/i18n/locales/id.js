export default {
  meta: {
    title: 'Brixa — Jasa Pembuatan Website & Aplikasi',
    description:
      'Brixa — studio pengembangan website & aplikasi: company profile, toko online, sistem web, hingga aplikasi mobile. Custom, cepat, sesuai kebutuhan bisnis Anda.',
  },

  nav: {
    home: 'Beranda',
    services: 'Layanan',
    portfolio: 'Portofolio',
    about: 'Tentang',
    contact: 'Kontak',
  },

  whatsappFloating: {
    label: 'Chat WhatsApp',
  },

  hero: {
    headlinePrefix: 'Website & aplikasi, dirancang dengan ',
    headlineHighlight: 'presisi.',
    paragraph:
      'Brixa merancang dan membangun produk digital dengan pendekatan yang cermat — setiap detail dipertimbangkan, setiap baris kode punya tujuan. Tanpa template, tanpa jalan pintas.',
    ctaPrimary: 'Mulai Proyek',
    ctaSecondary: 'Lihat Portofolio',
    marquee: [
      'Website Development',
      'Aplikasi Mobile',
      'UI/UX Design',
      'Sistem & Dashboard',
      'E-Commerce',
    ],
  },

  clients: {
    label: 'Dipercaya oleh beberapa klien yang pernah kami kerjakan',
  },

  services: {
    headingPrefix: 'Layanan yang ',
    headingHighlight: 'kami kerjakan.',
    description:
      'Empat area utama tempat Brixa paling sering membantu klien — dari halaman company profile sederhana sampai sistem custom yang kompleks.',
    items: [
      {
        slug: 'company-profile',
        title: 'Company Profile Website',
        description:
          'Website perusahaan atau personal untuk membangun kredibilitas dan branding di ranah digital.',
        accent: 'bg-primary-600',
        detail: {
          intro:
            'Website perusahaan yang dirancang untuk membangun kepercayaan sejak detik pertama dikunjungi — profil bisnis, layanan, dan portofolio tersaji rapi dalam satu tempat.',
          features: [
            'Desain custom sesuai identitas brand, bukan template',
            'Responsif penuh di desktop, tablet, dan mobile',
            'Optimasi kecepatan & SEO dasar agar mudah ditemukan',
            'Form kontak & integrasi WhatsApp untuk leads masuk langsung',
          ],
        },
      },
      {
        slug: 'ecommerce',
        title: 'Toko Online / E-Commerce',
        description:
          'Platform jualan lengkap dengan katalog produk, keranjang, dan sistem pembayaran terintegrasi.',
        accent: 'bg-ink-900',
        detail: {
          intro:
            'Platform jualan online lengkap — dari katalog produk sampai proses checkout — dibangun agar pelanggan mudah belanja dan Anda mudah kelola stok maupun pesanan.',
          features: [
            'Katalog produk dengan kategori, varian, dan pencarian',
            'Keranjang belanja dan proses checkout yang ringkas',
            'Integrasi pembayaran (transfer, e-wallet, atau payment gateway)',
            'Dashboard admin untuk kelola produk, stok, dan pesanan',
          ],
        },
      },
      {
        slug: 'web-app',
        title: 'Web Application / Sistem',
        description:
          'Dashboard, sistem manajemen, atau tools internal yang dibangun custom sesuai alur kerja bisnis Anda.',
        accent: 'bg-primary-800',
        detail: {
          intro:
            'Dashboard atau sistem internal yang dibangun custom mengikuti alur kerja bisnis Anda — bukan software generik yang dipaksakan cocok.',
          features: [
            'Analisis alur kerja untuk merancang fitur yang tepat guna',
            'Manajemen data, pengguna, dan hak akses sesuai kebutuhan',
            'Laporan & visualisasi data untuk pengambilan keputusan',
            'Arsitektur yang siap dikembangkan lebih lanjut',
          ],
        },
      },
      {
        slug: 'mobile-app',
        title: 'Aplikasi Mobile',
        description:
          'Aplikasi Android & iOS — native atau cross-platform, dari konsep hingga rilis ke store.',
        accent: 'bg-primary-500',
        detail: {
          intro:
            'Aplikasi Android & iOS yang dibangun dari konsep sampai rilis ke store, dengan pengalaman pengguna yang mulus di kedua platform.',
          features: [
            'Cross-platform (Android & iOS) atau native sesuai kebutuhan',
            'UI/UX yang dirancang khusus untuk alur pengguna aplikasi Anda',
            'Integrasi API, notifikasi, dan fitur backend pendukung',
            'Pendampingan proses rilis ke Google Play & App Store',
          ],
        },
      },
    ],
  },

  serviceDetail: {
    eyebrow: 'Layanan',
    backLabel: 'Kembali ke beranda',
    featuresLabel: 'Yang Anda dapatkan',
    otherServicesLabel: 'Layanan lainnya',
    ctaTitle: 'Tertarik dengan layanan ini?',
    ctaDescription: 'Ceritakan kebutuhan proyek Anda, kami bantu wujudkan.',
    ctaButton: 'Diskusikan Proyek',
    notFoundTitle: 'Layanan tidak ditemukan',
    notFoundDescription: 'Halaman yang Anda cari mungkin sudah dipindahkan.',
    notFoundCta: 'Kembali ke beranda',
  },

  portfolio: {
    headingPrefix: 'Jenis proyek yang ',
    headingHighlight: 'biasa kami kerjakan.',
    description:
      'Contoh di bawah menggambarkan kategori pekerjaan kami — akan diperbarui dengan studi kasus dan tautan proyek nyata seiring berjalannya waktu.',
    items: [
      {
        slug: 'company-profile-website',
        title: 'Company Profile Website',
        category: 'Website',
        description: 'Landing page company profile dengan desain modern dan performa cepat.',
        cover: 'profile',
        detail: {
          intro:
            'Contoh studi kasus: landing page company profile dengan navigasi jelas, hero yang mengomunikasikan value proposition dalam hitungan detik, dan performa loading yang cepat di semua perangkat.',
          highlights: [
            'Desain hero dengan CTA ganda (utama & sekunder) untuk konversi maksimal',
            'Strip logo klien untuk membangun kepercayaan sejak awal',
            'Bagian fitur/layanan yang ringkas dan mudah dipindai',
            'Skor performa tinggi berkat aset yang dioptimasi',
          ],
        },
      },
      {
        slug: 'ecommerce-platform',
        title: 'Platform E-Commerce',
        category: 'Toko Online',
        description: 'Sistem jualan online lengkap: katalog produk, keranjang, dan pembayaran.',
        cover: 'commerce',
        detail: {
          intro:
            'Contoh studi kasus: sistem jualan online dengan katalog produk yang mudah dijelajahi, proses checkout singkat, dan tampilan yang konsisten di desktop maupun mobile.',
          highlights: [
            'Grid produk dengan indikator promo/diskon yang menonjol',
            'Pencarian & filter kategori untuk navigasi katalog besar',
            'Alur checkout ringkas untuk mengurangi keranjang ditinggalkan',
            'Siap diintegrasikan dengan berbagai metode pembayaran',
          ],
        },
      },
      {
        slug: 'internal-dashboard',
        title: 'Dashboard & Sistem Internal',
        category: 'Web Application',
        description: 'Tools manajemen data custom untuk kebutuhan operasional bisnis.',
        cover: 'system',
        detail: {
          intro:
            'Contoh studi kasus: dashboard internal untuk memantau data operasional secara real-time, lengkap dengan visualisasi yang memudahkan pengambilan keputusan.',
          highlights: [
            'Kartu ringkasan (stat cards) untuk metrik penting di satu pandangan',
            'Visualisasi grafik untuk memantau tren dari waktu ke waktu',
            'Navigasi sidebar yang rapi untuk banyak modul/menu',
            'Struktur data yang siap dikembangkan untuk kebutuhan baru',
          ],
        },
      },
      {
        slug: 'mobile-booking-app',
        title: 'Aplikasi Mobile Booking',
        category: 'Aplikasi Mobile',
        description: 'Aplikasi pemesanan lintas platform untuk Android & iOS.',
        cover: 'mobile',
        detail: {
          intro:
            'Contoh studi kasus: aplikasi pemesanan lintas platform dengan alur booking yang sederhana, dari memilih jadwal sampai konfirmasi.',
          highlights: [
            'Kalender/jadwal visual untuk memilih tanggal dengan cepat',
            'Daftar pesanan yang jelas menunjukkan status tiap booking',
            'Navigasi bawah (bottom nav) untuk akses fitur utama satu jentik',
            'Dirancang cross-platform untuk Android & iOS',
          ],
        },
      },
    ],
  },

  portfolioDetail: {
    eyebrow: 'Portofolio',
    exampleNotice: 'Studi kasus contoh — akan diperbarui dengan proyek nyata seiring berjalannya waktu.',
    backLabel: 'Kembali ke beranda',
    highlightsLabel: 'Yang dikerjakan',
    otherProjectsLabel: 'Proyek lainnya',
    ctaTitle: 'Ingin proyek serupa?',
    ctaDescription: 'Ceritakan kebutuhan Anda, kami bantu wujudkan dari nol.',
    ctaButton: 'Diskusikan Proyek',
    notFoundTitle: 'Proyek tidak ditemukan',
    notFoundDescription: 'Halaman yang Anda cari mungkin sudah dipindahkan.',
    notFoundCta: 'Kembali ke beranda',
  },

  about: {
    headingPrefix: 'Kami percaya detail kecil ',
    headingHighlight: 'membuat perbedaan besar.',
    paragraph:
      'Brixa adalah studio pengembangan digital yang fokus pada kualitas, bukan kuantitas. Setiap proyek yang masuk kami kerjakan dengan pendekatan yang sama: dengarkan kebutuhan Anda, rancang solusi yang tepat, lalu bangun dengan kode yang bersih dan siap dikembangkan lebih jauh.',
    principles: [
      {
        title: 'Custom, bukan template',
        description:
          'Setiap baris kode ditulis untuk kebutuhan spesifik Anda — bukan hasil modifikasi template yang sudah dipakai ratusan orang lain.',
      },
      {
        title: 'Komunikasi yang transparan',
        description:
          'Anda selalu tahu progres proyek dari awal sampai selesai. Tidak ada fase "menghilang" di tengah pengerjaan.',
      },
      {
        title: 'Fleksibel untuk kebutuhan apa pun',
        description:
          'Dari company profile sederhana sampai sistem kompleks — kami menyesuaikan pendekatan dengan kebutuhan bisnis Anda, bukan sebaliknya.',
      },
    ],
  },

  contact: {
    headingPrefix: 'Mari mulai ',
    headingHighlight: 'proyek Anda.',
    paragraph:
      'Ceritakan kebutuhan Anda lewat form, atau hubungi kami langsung lewat email maupun WhatsApp.',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    form: {
      nameLabel: 'Nama',
      namePlaceholder: 'Nama Anda',
      emailLabel: 'Email',
      emailPlaceholder: 'nama@email.com',
      messageLabel: 'Ceritakan proyek Anda',
      messagePlaceholder: 'Website seperti apa yang Anda butuhkan?',
      submit: 'Kirim Pesan',
    },
    mailSubjectPrefix: 'Proyek baru dari',
    mailFallbackName: 'website Brixa',
    mailBodyName: 'Nama',
    mailBodyEmail: 'Email',
    mailBodyMessage: 'Pesan',
  },

  footer: {
    tagline: 'Studio pengembangan website & aplikasi — dirancang dengan presisi, dibangun tanpa template.',
    navLabel: 'Navigasi',
    contactLabel: 'Kontak',
    backToTop: 'Kembali ke atas',
    copyright: 'All rights reserved.',
  },
}
