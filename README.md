# ⚓ Portaverse LMS Enhancement 2025 (Next.js Prototype)

Prototipe interaktif resmi untuk **Enhancement Portaverse Learning Management System (LMS V2) Fase 3** milik PT Pelabuhan Indonesia (Persero), dibangun menggunakan **Next.js 14**, **React 18**, **Tailwind CSS**, dan **Lucide Icons**.

---

## 🌟 Fitur & Modul Enhancement (Berdasarkan Nodin & MoM FGD 2025)

1. **Dashboard & Executive Brief**
   - Ringkasan kebutuhan Nota Dinas No. `DL.01/2/6/1/PSBL/PGLS-25` dan kesepakatan MoM FGD Pelindo Tower 2025.
   - Metrik KPI utama (10.944 pekerja, 3 kanal database, clean dev trainer, 7 modul).

2. **Certificate Management (Database Sertifikat Terpusat)**
   - **Sisi User:** Portofolio "Sertifikat Saya" dengan pratinjau dokumen PDF resmi, unduhan, dan validasi QR Code.
   - **Sisi Admin:** Master database 3 kanal (SAP Organik, THANOS Alih Daya, ISMA Pelaut), template sertifikat dinamis bebas hardcode pejabat, rekap tahunan expired setiap Desember, dan sinkronisasi instan ke Talent Management System (TMS).

3. **Trainer Management (Clean Development Mode)**
   - Direktori internal SME Pelindo & instruktur lembaga eksternal.
   - Pelacakan jam mengajar (teaching hours) untuk pemerataan beban kerja.
   - Modal portofolio detail trainer & alur persetujuan (approval) penugasan.

4. **Survey & Assessment Engine (Card-per-Survey Model)**
   - Format Card-per-Survey internal mandiri tanpa dependensi link luar.
   - Grafik respons langsung di dalam masing-masing card survei (In-Card Analytics).
   - Modal kuesioner interaktif (rating bintang, pilihan ganda, esai) untuk simulasi pengisian oleh user.
   - Form builder mandiri.

5. **Calendar & Agenda Terpadu**
   - Menggabungkan pelatihan LMS (online & offline), agenda Community of Practice (CoP), dan deadline Evaluasi Level 3.
   - Ekspor berkas `.ics` dan sinkronisasi ke Microsoft Outlook & Google Calendar.

6. **Push Notification & Analytics**
   - Dashboard analitik open rate (%) dan rasio klik aksi (CTR) per kategori notifikasi.
   - Simulator tampilan Web In-App Push (Desktop) dan Mobile Push (iPhone Device Frame).
   - Form uji tembak notifikasi real-time.

7. **Blast Message Terarah**
   - Pengiriman pesan massal ter-segmentasi (entitas subholding, level jabatan, kanal).
   - Template pesan global siap pakai.
   - Riwayat kampanye dan analisis efektivitas keterbacaan.

8. **Role, Authority & Akun Management**
   - Standardisasi peran: Admin HO vs Admin Entitas.
   - **Proteksi Akun Vendor:** Validasi ketat bahwa akun vendor wajib Akun Instansi dan **DILARANG di-bind ke NIP Pegawai** (dengan simulator pemblokiran otomatis & audit trail log).
   - Otoritas khusus PT PMLI (Self-Publishing Rights).
   - Audit Trail Log aktivitas keamanan.

---

## 🚀 Cara Menjalankan Aplikasi

### Mode Pengembangan (Development):
```bash
cd /Users/muhammadindrapermana/Documents/src/ilcs/prototype/Enhancement-LMS-V2-Nextjs
npm run dev
```
Akses melalui browser di: **`http://localhost:3000`**

### Mode Produksi (Production Build):
```bash
cd /Users/muhammadindrapermana/Documents/src/ilcs/prototype/Enhancement-LMS-V2-Nextjs
npm run build
npm start
```
