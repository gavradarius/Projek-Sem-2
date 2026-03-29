# LogiCorp - Sistem Manajemen Karyawan

Sistem HR Management untuk perusahaan logistik dengan fitur lengkap manajemen karyawan, absensi, penggajian, dan pelaporan.

## 🚀 Fitur Utama

- **Login Multi-Role**: Admin, HRD, dan Karyawan
- **Dashboard Real-time**: Statistik karyawan dan aktivitas
- **Manajemen Karyawan**: Data lengkap karyawan
- **Absensi Otomatis**: Upload data absensi dengan pelanggaran & SP
- **Penggajian**: Slip gaji dan kalkulasi otomatis
- **Jadwal Shift**: Jadwal mingguan + custom kapan saja
- **Surat Pelanggaran**: Sistem SP-I, SP-II, SP-III
- **Chat HRD**: Komunikasi internal
- **Laporan & Analitik**: Dashboard performa perusahaan- **📱 Responsive Design**: Bisa dibuka di semua device
- **⚡ PWA Ready**: Bisa diinstall sebagai app mobile

## 📱 Responsive & PWA

### Responsive Design
Website ini fully responsive dan bisa dibuka di:
- **📱 Mobile Phone** (320px - 767px)
- **📟 Tablet** (768px - 1023px)
- **💻 Desktop** (1024px+)
- **🖥️ Large Desktop** (1440px+)

### PWA Features
- **Install sebagai App**: Bisa diinstall di home screen mobile
- **Offline Support**: Bisa dibuka tanpa internet (cache)
- **Native App Feel**: Full screen, no browser UI
- **Fast Loading**: Optimized untuk mobile

### Cara Install PWA
1. Buka website di browser mobile (Chrome/Safari)
2. Tap menu **"Add to Home Screen"**
3. Ikon akan muncul di home screen seperti app native
## 📦 Setup & Deploy

### 1. Upload ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

### 2. Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Pergi ke **Settings** → **Pages**
3. Pada **Source**, pilih **GitHub Actions**
4. Workflow akan otomatis berjalan setiap push ke branch `main`

### 3. Deploy Mudah (Windows)
Untuk memudahkan deploy, gunakan script `deploy.bat`:

```bash
# Klik 2x file deploy.bat atau jalankan di command prompt:
deploy.bat
```

Script akan:
- ✅ Auto `git add .`
- ✅ Auto `git commit` (dengan pesan yang Anda masukkan)
- ✅ Auto `git push` ke GitHub
- ✅ Trigger GitHub Actions untuk deploy

### 4. Manual Deploy (Command Line)
```bash
# Inisialisasi git (pertama kali)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main

# Setiap update selanjutnya
git add .
git commit -m "Update fitur absensi"
git push origin main
```

## 🔐 Demo Akun

| Role | ID | Password |
|------|----|----------|
| Admin | `admin` | `admin` |
| Karyawan | `EMP001` | `emp123` |
| HRD | `HRD001` | `hrd123` |

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS dengan CSS Variables
- **Icons**: Emoji + Custom SVG
- **Fonts**: Google Fonts (Syne, DM Sans)
- **Deploy**: GitHub Pages + GitHub Actions

## 📁 Struktur File

```
├── index.html          # Halaman utama
├── script.js           # Logika JavaScript
├── styles.css          # Styling CSS
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
└── README.md           # Dokumentasi
```

## 🎯 Cara Penggunaan

1. **Login** dengan akun demo
2. **Dashboard** untuk overview perusahaan
3. **Data Karyawan** untuk manajemen karyawan
4. **Absensi** untuk upload data dan lihat pelanggaran
5. **Penggajian** untuk proses gaji
6. **Jadwal Shift** untuk atur jadwal kerja
7. **SP** untuk surat pelanggaran
8. **Chat HRD** untuk komunikasi
9. **Laporan** untuk analitik performa

## 📊 Fitur Absensi

- Upload data absensi via CSV/Excel
- Deteksi pelanggaran otomatis
- Sistem SP berjenjang (I-II-III)
- Potongan gaji otomatis
- Kalender absensi interaktif

## 🔄 Update Otomatis

Website akan otomatis update setiap kali Anda push perubahan ke GitHub. Tidak perlu manual deploy lagi!

---

**Dibuat untuk**: Mata Kuliah Semester 2
**Teknologi**: Web Programming
**Tahun**: 2026