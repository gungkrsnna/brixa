# Bali Pro Dev — Company Profile Website

Website company profile untuk **Bali Pro Dev**, jasa pengembangan website & aplikasi. Dibangun dengan React + Vite, bergaya *elegant brutalism* (tipografi tegas, border tipis, animasi scroll berbasis fokus/blur), dan sudah mendukung multi-bahasa (Indonesia & Inggris).

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion** — animasi & efek scroll (fokus/blur, parallax, spring physics)
- **React Router** — routing per-bahasa (`/` untuk ID, `/en` untuk EN)
- **react-helmet-async** — manajemen meta tag (title, Open Graph, hreflang) per halaman

## Struktur Proyek

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, tombol WhatsApp mengambang
│   └── sections/      # Hero, Clients, Services, Portfolio, About, Contact
├── constants/          # Data kontak (email, WhatsApp) terpusat
├── i18n/                # Context bahasa + kamus konten (id.js, en.js)
└── App.jsx              # Routing & susunan halaman
```

## Menjalankan Proyek

```bash
npm install
npm run dev       # jalankan dev server
npm run build     # build untuk produksi
npm run preview   # preview hasil build
```

## Catatan

- Beberapa gambar di section **Portfolio** masih placeholder (wireframe mockup, bukan screenshot asli) — tandai jelas sebagai contoh kategori kerja, bukan proyek nyata, sampai ada studi kasus asli untuk menggantikannya.
- Logo klien di section **Client Logos** sudah menggunakan logo asli.
- Deploy sebagai SPA memerlukan konfigurasi *rewrite* di hosting (semua path diarahkan ke `index.html`) agar route `/en` tidak 404.
