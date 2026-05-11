# RS Scheduler — Sistem Penjadwalan Rumah Sakit

Sistem penjadwalan rumah sakit yang dirancang untuk menangani booking pasien, jadwal dokter, jadwal poli, ruang tindakan, dan antrian secara terpadu.

## 🚀 Fitur Utama

- **Booking Online Pasien**: Pilih poli, dokter, dan slot waktu langsung dari web interface.
- **Reschedule & Pembatalan**: Ubah jadwal secara mandiri tanpa telepon.
- **Notifikasi Otomatis**: Reminder H-1 via WhatsApp atau email.
- **Manajemen Shift Dokter/Perawat**: Atur jam praktik rutin dan jadwal operasi.
- **Dashboard Harian Medis**: Tampilkan pasien hari ini berdasarkan urutan waktu.
- **Status Ketersediaan Dokter**: On-Call / Emergency toggle cepat.
- **Master Data Admin**: Kelola data poli, dokter, fasilitas, dan kuota sesi.
- **Pengaturan Ruang & Alat**: Hindari bentrok jadwal ruang operasi, MRI, atau ambulans.
- **Kalender Jadwal**: Lihat slot tersedia, cuti dokter, dan status real-time.

## 🗄️ Struktur Database (Logika Relasi)

Tabel minimal:

- `patients`
  - `id`, `nama`, `no_rm`, `no_hp`, `alamat`
- `doctors`
  - `id`, `nama`, `spesialisasi`, `jam_praktik`, `status`
- `clinics`
  - `id`, `nama_poli`, `kuota`, `ruang`, `fasilitas`
- `appointments`
  - `id`, `patient_id`, `doctor_id`, `clinic_id`, `tanggal`, `jam`, `keluhan`, `status`
- `rooms`
  - `id`, `nama_ruang`, `tipe`, `kapasitas`, `status`
- `operations`
  - `id`, `doctor_id`, `room_id`, `tanggal`, `jam_mulai`, `jam_selesai`, `status`

## 🧭 Alur Kerja Sistem

1. Front office login
2. Input pasien baru atau pilih pasien existing
3. Pilih poli dan dokter
4. Pilih tanggal & jam dari slot yang tersedia
5. Simpan booking dan masukkan ke kalender
6. Dokter/perawat login untuk melihat antrean
7. Dokter update status: Menunggu, Dipanggil, Pemeriksaan, Selesai

## 🩺 Menu Website

- Dashboard
- Jadwal Pasien
- Booking Jadwal
- Data Dokter
- Data Poli
- Kalender Jadwal
- Riwayat Pemeriksaan

## 📌 Status Jadwal

- Menunggu
- Dipanggil
- Pemeriksaan
- Selesai
- Ditunda

## 🔧 Teknologi yang Disarankan

- Frontend: **React.js** atau **Vue.js**
- Backend: **Node.js** atau **Laravel**
- Real-time: **WebSockets**
- Kalender: **FullCalendar.io**

## 📋 Field Penting

- Nama pasien
- Nomor rekam medis
- Keluhan
- Poli tujuan
- Dokter
- Tanggal
- Jam
- Prioritas
- Status

## 🏥 Contoh Data

- Pasien: Ahmad
- Poli: Umum
- Dokter: dr. Sinta
- Tanggal: 20 Juni
- Jam: 09:00
- Status: Menunggu

## 🗂️ Flow Rumah Sakit

- Front office login
- Input pasien / pilih pasien
- Pilih poli
- Pilih dokter
- Pilih tanggal & jam
- Simpan booking
- Masuk kalender
- Dokter login
- Dokter lihat antrean
- Update status pemeriksaan

## 📄 Setup & Deploy

Jika Anda ingin menjalankan proyek ini sebagai HTML/CSS/JS statis:

1. Buka `index.html` di browser
2. Ubah `script.js` dan `styles.css` sesuai kebutuhan
3. Deploy ke GitHub Pages atau server static

## 🔐 Demo Akun

| Role | ID | Password |
|------|----|----------|
| Admin | `admin` | `admin` |
| Dokter | `DR001` | `dr123` |
| Perawat | `NR001` | `nr123` |

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS dengan variabel
- **Fonts**: Google Fonts (Syne, DM Sans)
- **Deployment**: GitHub Pages / static hosting

## 📁 Struktur File

```
├── index.html          # Halaman utama sistem penjadwalan rumah sakit
├── script.js           # Logika aplikasi dan navigasi
├── styles.css          # Styling UI
├── manifest.json       # Progressive Web App manifest
├── sw.js               # Service worker (offline caching)
├── deploy.bat          # Deploy helper
└── README.md           # Dokumentasi
```

## 🎯 Konsep Baru

Aplikasi sekarang fokus pada penjadwalan rumah sakit dengan:
- Booking pasien online
- Reschedule / pembatalan mandiri
- Notifikasi H-1
- Manajemen dokter, perawat, dan ruang tindakan
- Kalender jadwal medis
- Riwayat pemeriksaan dan antrian pasien

---

**Dibuat untuk**: Sistem Penjadwalan Rumah Sakit
**Teknologi**: Web Programming
**Tahun**: 2026