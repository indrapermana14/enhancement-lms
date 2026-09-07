export interface Certificate {
  id: string;
  no_sertifikat: string;
  nama_pegawai: string;
  nip: string;
  unit_kerja: string;
  sumber_data: "SAP (Organik/PKWT)" | "THANOS / PDS (Alih Daya)" | "ISMA (ABK / Seafarer)" | "Input Eksternal";
  jenis_sertifikat: string;
  kategori: string;
  tanggal_terbit: string;
  tanggal_expired: string;
  status: "Aktif" | "Expiring Soon (H-50)" | "Expiring Soon (H-20)" | "Expired";
  lembaga_penerbit: string;
  score: string;
  tms_sync_status: "Synced" | "Pending Sync";
}

export interface Trainer {
  id: string;
  nama: string;
  tipe: "Internal Trainer (SME Pelindo)" | "External Trainer (Lembaga Mitra)";
  nip: string;
  unit: string;
  bidang_keahlian: string;
  total_jam_mengajar: number;
  jumlah_kelas: number;
  rating_peserta: number;
  sertifikasi_tot: string;
  status_penugasan: "Tersedia" | "Menunggu Approval" | "Sedang Menugaskan";
  avatar: string;
  bio: string;
  review_quote: string;
}

export interface Survey {
  id: string;
  judul: string;
  creator: string;
  entitas_target: string;
  total_responden_target: number;
  total_respon: number;
  status: "Sedang Berjalan" | "Selesai" | "Draft";
  tenggat_waktu: string;
  persentase: number;
  deskripsi: string;
  kategori: string[];
  votes: number[];
}

export interface CalendarEvent {
  id: string;
  tanggal: string;
  waktu: string;
  judul: string;
  kategori: "Pelatihan LMS (Offline)" | "Pelatihan LMS (Online)" | "Community of Practice (CoP)" | "Tenggat Evaluasi Level 3" | "Agenda Korporat SDM";
  lokasi: string;
  peserta: string;
  status: string;
}

export interface BlastItem {
  id: string;
  tanggal: string;
  judul: string;
  target: string;
  penerima: number;
  terkirim: number;
  dibuka: number;
  rasio_baca: string;
  status: "Selesai" | "Sedang Terkirim" | "Terjadwal";
}

export interface AuditLog {
  waktu: string;
  aktor: string;
  aksi: string;
  target: string;
  keterangan: string;
}

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "CERT-001",
    no_sertifikat: "CERT/PLND/2024/00812",
    nama_pegawai: "Muhammad Indra Permana",
    nip: "102881",
    unit_kerja: "ILCS - Digital Solution",
    sumber_data: "SAP (Organik/PKWT)",
    jenis_sertifikat: "Port Operations Excellence & Safety",
    kategori: "Keahlian Teknis Pelabuhan",
    tanggal_terbit: "2023-10-15",
    tanggal_expired: "2025-10-22",
    status: "Expiring Soon (H-50)",
    lembaga_penerbit: "PMLI / DNV GL",
    score: "96/100 (Distinction)",
    tms_sync_status: "Synced"
  },
  {
    id: "CERT-002",
    no_sertifikat: "CERT/PLND/2023/00194",
    nama_pegawai: "Budi Santoso",
    nip: "101420",
    unit_kerja: "SPTP - Terminal Nilam Surabaya",
    sumber_data: "THANOS / PDS (Alih Daya)",
    jenis_sertifikat: "Sertifikasi Operator Quay Container Crane (QCC)",
    kategori: "Lisensi K3 & Operasional",
    tanggal_terbit: "2023-08-20",
    tanggal_expired: "2025-08-20",
    status: "Expired",
    lembaga_penerbit: "Kemenaker RI & LSP Pelabuhan",
    score: "88/100 (Pass)",
    tms_sync_status: "Pending Sync"
  },
  {
    id: "CERT-003",
    no_sertifikat: "CERT/PLND/2024/01129",
    nama_pegawai: "Capt. Hendra Gunawan",
    nip: "103211",
    unit_kerja: "SPJM - Marine Services Makassar",
    sumber_data: "ISMA (ABK / Seafarer)",
    jenis_sertifikat: "Master Mariner / Ahli Nautika Tingkat II",
    kategori: "Keahlian Pelayaran",
    tanggal_terbit: "2024-05-10",
    tanggal_expired: "2027-05-10",
    status: "Aktif",
    lembaga_penerbit: "Ditjen Hubla Kemenhub",
    score: "92/100 (Distinction)",
    tms_sync_status: "Synced"
  },
  {
    id: "CERT-004",
    no_sertifikat: "CERT/PLND/2024/02315",
    nama_pegawai: "Meutya Dewi Aprillia",
    nip: "102540",
    unit_kerja: "Kantor Pusat - Group SDM",
    sumber_data: "SAP (Organik/PKWT)",
    jenis_sertifikat: "Certified Human Resource Professional (CHRP)",
    kategori: "Keahlian Manajerial",
    tanggal_terbit: "2024-05-05",
    tanggal_expired: "2026-05-05",
    status: "Aktif",
    lembaga_penerbit: "BNSP & Atma Jaya",
    score: "95/100 (Distinction)",
    tms_sync_status: "Synced"
  },
  {
    id: "CERT-005",
    no_sertifikat: "CERT/PLND/2023/00742",
    nama_pegawai: "Siti Nurhaliza",
    nip: "104192",
    unit_kerja: "SPMT - Belawan Port",
    sumber_data: "THANOS / PDS (Alih Daya)",
    jenis_sertifikat: "Operator Reach Stacker Level 1",
    kategori: "Lisensi K3 & Operasional",
    tanggal_terbit: "2023-09-12",
    tanggal_expired: "2025-09-22",
    status: "Expiring Soon (H-20)",
    lembaga_penerbit: "LSP Maritim Nusantara",
    score: "84/100 (Pass)",
    tms_sync_status: "Synced"
  },
  {
    id: "CERT-006",
    no_sertifikat: "CERT/PLND/2024/03099",
    nama_pegawai: "Rian Kusuma",
    nip: "103988",
    unit_kerja: "SPSL - Logistics Hub Priok",
    sumber_data: "SAP (Organik/PKWT)",
    jenis_sertifikat: "Supply Chain Management & Freight Forwarding",
    kategori: "Keahlian Logistik",
    tanggal_terbit: "2024-06-01",
    tanggal_expired: "2026-12-01",
    status: "Aktif",
    lembaga_penerbit: "FIATA & PMLI",
    score: "90/100 (Distinction)",
    tms_sync_status: "Synced"
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: "TRN-INT-001",
    nama: "Dr. Ir. Bambang Priyanto, M.M.",
    tipe: "Internal Trainer (SME Pelindo)",
    nip: "100412",
    unit: "Kantor Pusat - Operasi Pelabuhan",
    bidang_keahlian: "Port Master Planning & Quay Safety",
    total_jam_mengajar: 142.5,
    jumlah_kelas: 18,
    rating_peserta: 4.88,
    sertifikasi_tot: "BNSP Certified Master Trainer (Level 5)",
    status_penugasan: "Tersedia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Praktisi senior operasional terminal petikemas dengan 22 tahun pengalaman di Pelindo Tanjung Priok & Surabaya.",
    review_quote: "Penjelasan simulasi dwelling time dan pergerakan crane sangat aplikatif!"
  },
  {
    id: "TRN-INT-002",
    nama: "Capt. Rahmat Hidayat, M.Mar.",
    tipe: "Internal Trainer (SME Pelindo)",
    nip: "101290",
    unit: "SPJM - Pandu & Tunda Maritim",
    bidang_keahlian: "Vessel Traffic Service (VTS) & Marine Pilotage",
    total_jam_mengajar: 118.0,
    jumlah_kelas: 14,
    rating_peserta: 4.92,
    sertifikasi_tot: "IMO Model Course 6.09 (Training for Instructors)",
    status_penugasan: "Menunggu Approval",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Perwira Pandu Senior Kelas 1 Pelindo Selat Sunda & Selat Malaka, Instruktur Simulasi Bridge Simulator PMLI.",
    review_quote: "Sangat menguasai studi kasus real di alur pelayaran sempit dan cuaca ekstrem."
  },
  {
    id: "TRN-EKS-001",
    nama: "Prof. Dr. Ir. Suyono, Ph.D.",
    tipe: "External Trainer (Lembaga Mitra)",
    nip: "EXT-ITB-09",
    unit: "Institut Teknologi Bandung (Mitra PMLI)",
    bidang_keahlian: "Logistics Digital Twin & AI Optimization",
    total_jam_mengajar: 64.0,
    jumlah_kelas: 8,
    rating_peserta: 4.81,
    sertifikasi_tot: "Certified International Port Consultant",
    status_penugasan: "Tersedia",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    bio: "Pakar sistem logistik maritim dan optimasi kecerdasan buatan untuk rantai pasok pelabuhan modern.",
    review_quote: "Wawasan masa depan terminal otomatis dan integrasi TOS Nusantara sangat membuka wawasan."
  },
  {
    id: "TRN-INT-003",
    nama: "Sarah Widyastuti, S.Psi., M.M.",
    tipe: "Internal Trainer (SME Pelindo)",
    nip: "102431",
    unit: "Kantor Pusat - Group SDM",
    bidang_keahlian: "Leadership in Transition & AKHLAK Culture",
    total_jam_mengajar: 96.0,
    jumlah_kelas: 16,
    rating_peserta: 4.95,
    sertifikasi_tot: "BNSP Trainer & Certified Executive Coach",
    status_penugasan: "Tersedia",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Lead Culture Specialist Pelindo Group, fasilitator program akselerasi talenta muda Pelindo.",
    review_quote: "Sesi roleplay coaching dan komunikasi kepemimpinan sangat interaktif dan aplikatif."
  }
];

export const INITIAL_SURVEYS: Survey[] = [
  {
    id: "SRV-2025-01",
    judul: "Survey Evaluasi Kebutuhan Pelatihan (TNA) 2026",
    creator: "Group SDM - HO",
    entitas_target: "Seluruh Entitas Pelindo Group",
    total_responden_target: 10944,
    total_respon: 6840,
    status: "Sedang Berjalan",
    tenggat_waktu: "2025-10-31",
    persentase: 62.5,
    deskripsi: "Pemetaan kebutuhan sertifikasi dan peningkatan kompetensi digital pelabuhan tahun depan.",
    kategori: ["Digital Port", "HSSE Safety", "Supply Chain", "AKHLAK Culture"],
    votes: [2450, 1820, 1200, 780]
  },
  {
    id: "SRV-2025-02",
    judul: "Evaluasi Kepuasan Penyelenggaraan Pelatihan PMLI Q2",
    creator: "Divisi Learning PMLI",
    entitas_target: "Peserta Pelatihan Q2 2025",
    total_responden_target: 1850,
    total_respon: 1720,
    status: "Sedang Berjalan",
    tenggat_waktu: "2025-09-15",
    persentase: 93.0,
    deskripsi: "Mengukur kualitas materi, sarana virtual lab, dan performa instruktur pengampu.",
    kategori: ["Kualitas Materi", "Instruktur", "Fasilitas Lab", "Jadwal"],
    votes: [4.85, 4.92, 4.70, 4.78]
  },
  {
    id: "SRV-2025-03",
    judul: "Assessment Kesiapan Implementasi Green Port 2025",
    creator: "Departemen HSSE & Operasi",
    entitas_target: "Regional 1 - 4 & Subholding",
    total_responden_target: 850,
    total_respon: 810,
    status: "Selesai",
    tenggat_waktu: "2025-07-30",
    persentase: 95.3,
    deskripsi: "Penilaian kepatuhan terhadap standarisasi efisiensi energi dan pelabuhan ramah lingkungan.",
    kategori: ["Sangat Siap", "Siap Sebagian", "Perlu Pendampingan", "Belum Siap"],
    votes: [520, 210, 60, 20]
  }
];

export const INITIAL_CALENDAR: CalendarEvent[] = [
  {
    id: "EVT-01",
    tanggal: "2025-09-15",
    waktu: "08:30 - 16:30 WIB",
    judul: "Pelatihan Mandatori: Port Safety & ISPS Code Batch 4",
    kategori: "Pelatihan LMS (Offline)",
    lokasi: "Auditorium Gedung PMLI Ciawi, Bogor",
    peserta: "45 Peserta (SPTP & SPMT)",
    status: "Reminder H-2 Terkirim"
  },
  {
    id: "EVT-02",
    tanggal: "2025-09-18",
    waktu: "13:30 - 15:30 WIB",
    judul: "Community of Practice (CoP): Best Practice TOS Nusantara",
    kategori: "Community of Practice (CoP)",
    lokasi: "Virtual Zoom & Portaverse Live",
    peserta: "Terbuka untuk Semua Pegawai",
    status: "Jadwal Terkonfirmasi"
  },
  {
    id: "EVT-03",
    tanggal: "2025-09-20",
    waktu: "23:59 WIB",
    judul: "Batas Akhir Pengisian Evaluasi Level 3 (Behavior Impact) Batch 2",
    kategori: "Tenggat Evaluasi Level 3",
    lokasi: "Portaverse LMS Dashboard",
    peserta: "128 Peserta & Atasan Langsung",
    status: "Reminder H-7 Terjadwal"
  },
  {
    id: "EVT-04",
    tanggal: "2025-09-25",
    waktu: "09:00 - 12:00 WIB",
    judul: "Workshop: Penyelarasan Kurikulum Internal Trainer BNSP",
    kategori: "Agenda Korporat SDM",
    lokasi: "Ruang Rapat Utama Pelindo Tower Lt. 18",
    peserta: "30 Internal Master Trainer",
    status: "Persiapan Materi"
  }
];

export const INITIAL_BLAST: BlastItem[] = [
  {
    id: "BLST-081",
    tanggal: "2025-08-25 09:00",
    judul: "Pemberitahuan Audit Sertifikasi K3 Semester II",
    target: "Seluruh Regional 1 - 4",
    penerima: 6240,
    terkirim: 6240,
    dibuka: 5490,
    rasio_baca: "88.0%",
    status: "Selesai"
  },
  {
    id: "BLST-080",
    tanggal: "2025-08-18 14:00",
    judul: "Undangan CoP: Strategi Transformasi Digital Pelabuhan",
    target: "Seluruh Pegawai Group",
    penerima: 10944,
    terkirim: 10900,
    dibuka: 7820,
    rasio_baca: "71.7%",
    status: "Selesai"
  },
  {
    id: "BLST-079",
    tanggal: "2025-08-10 10:30",
    judul: "Batas Akhir Pengisian Evaluasi Level 3 Batch 1",
    target: "Peserta Kelas Q1 & Atasan",
    penerima: 320,
    terkirim: 320,
    dibuka: 308,
    rasio_baca: "96.2%",
    status: "Selesai"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    waktu: "2025-09-02 09:15",
    aktor: "Admin HO (Reini Delfianti)",
    aksi: "Persetujuan Role Admin Entitas",
    target: "Ahmad Fauzi (NIP: 103412 - SPMT)",
    keterangan: "Akses disetujui untuk pengelolaan pelatihan regional Belawan"
  },
  {
    waktu: "2025-09-02 08:30",
    aktor: "Sistem Validasi (Automated)",
    aksi: "Penolakan Akun Vendor",
    target: "Vendor_Training_A",
    keterangan: "Percobaan binding ke NIP pegawai 101992 diblokir otomatis oleh sistem"
  },
  {
    waktu: "2025-09-01 16:40",
    aktor: "Super Admin (ILCS)",
    aksi: "Aktivasi Otoritas Khusus PMLI",
    target: "Admin PMLI Learning",
    keterangan: "Pemberian hak publikasi kursus mandiri sesuai mandat FGD 2025"
  }
];
