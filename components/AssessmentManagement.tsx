"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  Calendar,
  ChevronDown,
  X,
  Upload,
  ArrowLeft,
  Trash2,
  Copy,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Eraser,
  Check,
  AlertCircle,
  Eye,
  Download,
  Send,
  Users,
  GripVertical,
  ExternalLink,
  Edit3,
  Share2,
  HelpCircle,
  Sparkles,
  Layers,
  FileText,
  AlignLeft,
  CheckSquare,
  CircleDot,
  Star,
  ChevronRight,
  ChevronUp,
  Archive,
  ArchiveRestore,
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  Award,
  FileSpreadsheet,
  MapPin,
  Table
} from "lucide-react";

export interface SurveyAnalyticsData {
  averageRating: number;
  ratingLabel: string;
  npsScore: number;
  completionAvgMinutes: string;
  averageScorePoints: number;
  maxScorePoints: number;
  scoreGrade: string;
  satisfactionData: { label: string; count: number; pct: number; color: string; point?: number }[];
  aspectData: { label: string; scorePct: number; countText: string; color: string; pointWeight?: number }[];
  demographicsData: { entity: string; count: number; pct: number; color: string }[];
  keyInsight: string;
  topSuggestions: { user: string; role: string; text: string }[];
}

export const getSurveyAnalytics = (survey: SurveyItem): SurveyAnalyticsData => {
  const sid = survey.id;
  if (sid === "SRV-01" || survey.title.toLowerCase().includes("kpi")) {
    return {
      averageRating: 4.6,
      ratingLabel: "Sangat Baik",
      npsScore: 58,
      completionAvgMinutes: "06:24",
      averageScorePoints: 88.5,
      maxScorePoints: 100,
      scoreGrade: "Sangat Baik (A)",
      satisfactionData: [
        { label: "Sangat Baik", count: 25, pct: 26, color: "#059669", point: 25 },
        { label: "Baik", count: 48, pct: 48, color: "#10B981", point: 20 },
        { label: "Cukup", count: 17, pct: 18, color: "#016DB2", point: 15 },
        { label: "Kurang Baik", count: 6, pct: 6, color: "#F59E0B", point: 10 },
        { label: "Tidak Baik", count: 2, pct: 2, color: "#EF4444", point: 5 }
      ],
      aspectData: [
        { label: "Memahami Indikator KPI", scorePct: 42, countText: "42% (70 Orang)", color: "#016DB2", pointWeight: 25 },
        { label: "Input Data / Angka Target", scorePct: 28, countText: "28% (43 Orang)", color: "#0284C7", pointWeight: 25 },
        { label: "Sistem & Kecepatan Portal", scorePct: 18, countText: "18% (30 Orang)", color: "#38BDF8", pointWeight: 25 },
        { label: "Alur Validasi & Approval", scorePct: 12, countText: "12% (19 Orang)", color: "#93C5FD", pointWeight: 25 }
      ],
      demographicsData: [
        { entity: "Subholding SPTP (Terminal)", count: 36, pct: 38, color: "#016DB2" },
        { entity: "Subholding SPJM (Jasa Maritim)", count: 23, pct: 24, color: "#0284C7" },
        { entity: "Subholding SPSL (Logistik)", count: 19, pct: 20, color: "#10B981" },
        { entity: "PT PMLI (Corpu)", count: 18, pct: 18, color: "#F59E0B" }
      ],
      keyInsight: "74% responden memberikan respon positif dengan rata-rata total skor 88.5/100 Poin. 42% menyarankan penyediaan video tutorial pengisian indikator KPI.",
      topSuggestions: [
        { user: "Hendra Indra F.", role: "Senior Assistant Officer", text: "Akan lebih baik jika tersedia buku panduan atau video tutorial langkah-langkah pengisian KPI sebelum mulai pengisian." },
        { user: "Yogi M. Irshad", role: "VP Operasi SPTP", text: "Tambahkan fitur autosave agar data tidak hilang saat koneksi jaringan terputus tiba-tiba." }
      ]
    };
  } else if (sid === "SRV-02" || survey.title.toLowerCase().includes("onboarding")) {
    return {
      averageRating: 4.8,
      ratingLabel: "Sangat Memuaskan",
      npsScore: 74,
      completionAvgMinutes: "05:12",
      averageScorePoints: 94.0,
      maxScorePoints: 100,
      scoreGrade: "Sangat Memuaskan (A+)",
      satisfactionData: [
        { label: "Sangat Memuaskan", count: 84, pct: 55, color: "#059669", point: 25 },
        { label: "Memuaskan", count: 58, pct: 38, color: "#10B981", point: 20 },
        { label: "Cukup", count: 8, pct: 5, color: "#016DB2", point: 15 },
        { label: "Kurang Memuaskan", count: 2, pct: 2, color: "#F59E0B", point: 10 }
      ],
      aspectData: [
        { label: "Materi Pengenalan Core AKHLAK", scorePct: 94, countText: "94% (143 Responden)", color: "#059669", pointWeight: 25 },
        { label: "Kualitas Pendampingan Mentor", scorePct: 91, countText: "91% (138 Responden)", color: "#10B981", pointWeight: 25 },
        { label: "Pengenalan Budaya Kerja Lapangan", scorePct: 88, countText: "88% (134 Responden)", color: "#016DB2", pointWeight: 25 },
        { label: "Kemudahan Akses Modul LMS", scorePct: 85, countText: "85% (129 Responden)", color: "#0284C7", pointWeight: 25 }
      ],
      demographicsData: [
        { entity: "Regional 2 (Tanjung Priok)", count: 61, pct: 40, color: "#016DB2" },
        { entity: "Regional 1 (Belawan)", count: 38, pct: 25, color: "#0284C7" },
        { entity: "Regional 3 (Tanjung Perak)", count: 30, pct: 20, color: "#10B981" },
        { entity: "Regional 4 (Makassar)", count: 23, pct: 15, color: "#F59E0B" }
      ],
      keyInsight: "93% pegawai baru memperoleh nilai asesmen prima (rata-rata 94.0 Poin); disarankan menambah sesi networking langsung dengan jajaran General Manager.",
      topSuggestions: [
        { user: "Raditya Satyatama", role: "General Manager SPJM", text: "Program mentoring berjalan sangat efektif, disarankan ada checklist orientasi 90 hari pertama." }
      ]
    };
  } else if (sid === "SRV-03" || survey.title.toLowerCase().includes("akhlak")) {
    return {
      averageRating: 4.7,
      ratingLabel: "Sangat Tinggi",
      npsScore: 68,
      completionAvgMinutes: "07:45",
      averageScorePoints: 91.2,
      maxScorePoints: 100,
      scoreGrade: "Sangat Tinggi (A)",
      satisfactionData: [
        { label: "Sangat Tinggi", count: 42, pct: 52, color: "#059669", point: 25 },
        { label: "Tinggi", count: 28, pct: 35, color: "#10B981", point: 20 },
        { label: "Sedang", count: 8, pct: 10, color: "#016DB2", point: 15 },
        { label: "Rendah", count: 2, pct: 3, color: "#EF4444", point: 10 }
      ],
      aspectData: [
        { label: "Amanah (Integritas & Tanggung Jawab)", scorePct: 92, countText: "92% Indeks", color: "#059669", pointWeight: 20 },
        { label: "Kolaboratif (Kerjasama Lintas Unit)", scorePct: 91, countText: "91% Indeks", color: "#10B981", pointWeight: 20 },
        { label: "Harmonis (Saling Peduli & Menghargai)", scorePct: 90, countText: "90% Indeks", color: "#016DB2", pointWeight: 15 },
        { label: "Kompeten (Belajar & Kembangkan Diri)", scorePct: 89, countText: "89% Indeks", color: "#0284C7", pointWeight: 15 },
        { label: "Loyal (Komitmen Berdedikasi)", scorePct: 87, countText: "87% Indeks", color: "#38BDF8", pointWeight: 15 },
        { label: "Adaptif (Inovasi & Antusias Perubahan)", scorePct: 85, countText: "85% Indeks", color: "#F59E0B", pointWeight: 15 }
      ],
      demographicsData: [
        { entity: "Kantor Pusat Pelindo HO", count: 28, pct: 35, color: "#016DB2" },
        { entity: "Subholding SPTP", count: 24, pct: 30, color: "#0284C7" },
        { entity: "Subholding SPJM", count: 16, pct: 20, color: "#10B981" },
        { entity: "Subholding SPSL", count: 12, pct: 15, color: "#F59E0B" }
      ],
      keyInsight: "Nilai Amanah dan Kolaboratif menjadi peraih poin tertinggi (92 poin); implementasi nilai Adaptif dapat ditingkatkan melalui lokakarya digitalisasi.",
      topSuggestions: [
        { user: "Amanda Sujiwo", role: "Direktur Logistik SPSL", text: "Perbanyak sesi role play dan studi kasus nyata penegakan nilai AKHLAK di operasional lapangan." }
      ]
    };
  } else if (sid === "SRV-05" || survey.title.toLowerCase().includes("safety") || survey.title.toLowerCase().includes("k3")) {
    return {
      averageRating: 4.9,
      ratingLabel: "Sangat Patuh",
      npsScore: 82,
      completionAvgMinutes: "04:30",
      averageScorePoints: 96.5,
      maxScorePoints: 100,
      scoreGrade: "Sangat Patuh (A+)",
      satisfactionData: [
        { label: "Kepatuhan Sangat Tinggi", count: 95, pct: 68, color: "#059669", point: 25 },
        { label: "Kepatuhan Tinggi", count: 35, pct: 25, color: "#10B981", point: 20 },
        { label: "Kepatuhan Cukup", count: 10, pct: 7, color: "#016DB2", point: 15 }
      ],
      aspectData: [
        { label: "Kepatuhan Pemakaian APD Lengkap", scorePct: 98, countText: "98% (137 Pekerja)", color: "#059669", pointWeight: 25 },
        { label: "Toolbox Meeting K3 Harian", scorePct: 95, countText: "95% (133 Pekerja)", color: "#10B981", pointWeight: 25 },
        { label: "Pelaporan Insiden & Near-Miss", scorePct: 92, countText: "92% (129 Pekerja)", color: "#016DB2", pointWeight: 25 },
        { label: "Kesiapsiagaan Tanggap Darurat", scorePct: 90, countText: "90% (126 Pekerja)", color: "#0284C7", pointWeight: 25 }
      ],
      demographicsData: [
        { entity: "Terminal Petikemas SPTP", count: 70, pct: 50, color: "#016DB2" },
        { entity: "Terminal Curah & Multipurpose", count: 35, pct: 25, color: "#0284C7" },
        { entity: "Pelayanan Kapal SPJM", count: 35, pct: 25, color: "#10B981" }
      ],
      keyInsight: "Tingkat pemahaman K3 mencapai skor 96.5 Poin; seluruh terminal mencatat kepatuhan pemakaian APD di atas 98%.",
      topSuggestions: [
        { user: "Aan Sukwinandi", role: "Officer I Fasilitas", text: "Aplikasi pelaporan near-miss via mobile perlu dipermudah dengan fitur upload foto cepat." }
      ]
    };
  } else if (sid === "SRV-06" || survey.title.toLowerCase().includes("pmli") || survey.title.toLowerCase().includes("pelatihan")) {
    return {
      averageRating: 4.5,
      ratingLabel: "Sangat Baik",
      npsScore: 54,
      completionAvgMinutes: "05:50",
      averageScorePoints: 87.8,
      maxScorePoints: 100,
      scoreGrade: "Sangat Baik (A)",
      satisfactionData: [
        { label: "Sangat Baik", count: 65, pct: 50, color: "#059669", point: 25 },
        { label: "Baik", count: 45, pct: 35, color: "#10B981", point: 20 },
        { label: "Cukup", count: 15, pct: 11, color: "#016DB2", point: 15 },
        { label: "Kurang", count: 5, pct: 4, color: "#F59E0B", point: 10 }
      ],
      aspectData: [
        { label: "Kompetensi Instruktur Pelindo", scorePct: 92, countText: "92% Indeks", color: "#059669", pointWeight: 25 },
        { label: "Relevansi Silabus & Modul", scorePct: 88, countText: "88% Indeks", color: "#10B981", pointWeight: 25 },
        { label: "Fasilitas Lab Simulasi & Kelas", scorePct: 86, countText: "86% Indeks", color: "#016DB2", pointWeight: 25 },
        { label: "Kenyamanan Fasilitas & Konsumsi", scorePct: 84, countText: "84% Indeks", color: "#0284C7", pointWeight: 25 }
      ],
      demographicsData: [
        { entity: "Divisi SDM Subholding", count: 58, pct: 45, color: "#016DB2" },
        { entity: "Corporate University PMLI", count: 45, pct: 35, color: "#0284C7" },
        { entity: "Regional Port Units", count: 27, pct: 20, color: "#10B981" }
      ],
      keyInsight: "Instruktur dan materi kelas mendapatkan akumulasi 87.8 poin; disarankan peningkatan bandwidth Wi-Fi di laboratorium simulasi PMLI.",
      topSuggestions: [
        { user: "Kahfiarsyad Julyan", role: "Training Specialist", text: "Penyediaan rekaman sesi dan modul digital interaktif sangat membantu pasca pelatihan." }
      ]
    };
  } else {
    const rate = survey.respondRate || 50;
    const count = survey.respondCount || 0;
    const avgScore = +(75 + (rate * 0.2)).toFixed(1);
    return {
      averageRating: +(4.0 + (rate / 100)).toFixed(1),
      ratingLabel: rate > 75 ? "Sangat Baik" : rate > 40 ? "Baik" : "Cukup",
      npsScore: rate,
      completionAvgMinutes: "05:00",
      averageScorePoints: avgScore,
      maxScorePoints: 100,
      scoreGrade: avgScore >= 85 ? "Sangat Baik (A)" : avgScore >= 70 ? "Baik (B)" : "Cukup (C)",
      satisfactionData: [
        { label: "Sangat Baik", count: Math.max(1, Math.round(count * 0.4)), pct: 40, color: "#059669", point: 25 },
        { label: "Baik", count: Math.max(1, Math.round(count * 0.45)), pct: 45, color: "#10B981", point: 20 },
        { label: "Cukup", count: Math.max(0, Math.round(count * 0.15)), pct: 15, color: "#016DB2", point: 15 }
      ],
      aspectData: [
        { label: "Kesesuaian Materi & Instrumen", scorePct: 88, countText: "88% Respon Positif", color: "#059669", pointWeight: 35 },
        { label: "Kejelasan Instruksi Pengisian", scorePct: 85, countText: "85% Respon Positif", color: "#10B981", pointWeight: 35 },
        { label: "Aksesibilitas Sistem Portal", scorePct: 82, countText: "82% Respon Positif", color: "#016DB2", pointWeight: 30 }
      ],
      demographicsData: [
        { entity: "PT Pelabuhan Indonesia (HO)", count: Math.max(1, Math.round(count * 0.5)), pct: 50, color: "#016DB2" },
        { entity: "Subholding SPTP & SPJM", count: Math.max(1, Math.round(count * 0.3)), pct: 30, color: "#0284C7" },
        { entity: "Entitas Lainnya", count: Math.max(0, Math.round(count * 0.2)), pct: 20, color: "#10B981" }
      ],
      keyInsight: `Respon terkumpul ${survey.respondCount} dari target ${survey.targetCount}. Rata-rata skor asesmen terhitung ${avgScore}/100 Poin.`,
      topSuggestions: [
        { user: "Peserta Terdaftar", role: "Pegawai Pelindo", text: "Proses pengisian berjalan lancar dan poin indikator terakumulasi secara akurat." }
      ]
    };
  }
};

export interface SurveyItem {
  id: string;
  title: string;
  description: string;
  periodText: string;
  status: "Aktif" | "Selesai" | "Draft" | "Diarsipkan";
  respondCount: number;
  targetCount: number;
  respondRate: number;
  creatorName: string;
  creatorAvatar: string;
  createdAt: string;
  category?: string;
  questions?: QuestionItem[];
}

export interface QuestionItem {
  id: string;
  number: number;
  questionText: string;
  type: "Pilihan Tunggal" | "Pilihan Ganda" | "Isian Panjang" | "Isian Pendek" | "Skala Rating";
  required: boolean;
  options: string[];
  optionPoints?: number[];
  chartType?: "Pie Chart" | "Bar Chart" | "Map Chart" | "Table";
}

export interface RespondentRow {
  id: string;
  name: string;
  nipp: string;
  role: string;
  email: string;
  entity: string;
  submittedAt: string;
  duration: string;
  status: "Selesai" | "Belum Mengisi";
  avatar: string;
  totalScore?: number;
  maxScore?: number;
  scoreGrade?: string;
  answers: {
    q1: string;
    q1Point?: number;
    q2: string[];
    q2Point?: number;
    q3: string;
    q4: string;
  };
}

const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: "q1",
    number: 1,
    questionText: "Bagaimana pengalaman Anda secara keseluruhan dalam pengisian KPI?",
    type: "Pilihan Tunggal",
    required: true,
    options: ["Sangat Baik", "Baik", "Cukup", "Kurang Baik", "Tidak Baik"],
    optionPoints: [25, 20, 15, 10, 5],
    chartType: "Pie Chart"
  },
  {
    id: "q2",
    number: 2,
    questionText: "Apa yang menurut Anda paling sulit dalam proses pengisian KPI?",
    type: "Pilihan Ganda",
    required: true,
    options: ["Memahami Indikator KPI", "Input data / angka", "Sistem / Teknologi yang digunakan", "Alur pengisian yang panjang", "Lainnya"],
    optionPoints: [20, 20, 20, 20, 20],
    chartType: "Bar Chart"
  },
  {
    id: "q3",
    number: 3,
    questionText: "Apa Saran Anda untuk meningkatkan proses pengisian KPI?",
    type: "Isian Panjang",
    required: true,
    options: [],
    chartType: "Table"
  },
  {
    id: "q4",
    number: 4,
    questionText: "Apa kendala utama yang anda alami saat mengisi KPI?",
    type: "Isian Pendek",
    required: true,
    options: [],
    chartType: "Table"
  }
];

const INITIAL_SURVEYS: SurveyItem[] = [
  {
    id: "SRV-01",
    title: "Survey New KPI Experience",
    description: "Mengukur tingkat keterlibatan dan evaluasi karyawan baru selama proses onboarding",
    periodText: "20 Juli 2026 – 30 Juli 2026",
    status: "Aktif",
    respondCount: 96,
    targetCount: 200,
    respondRate: 65,
    creatorName: "HENDRA INDRA FIRMAWAN",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: "Dibuat 20 Juli 2026",
    category: "Penilaian KPI & Kinerja",
    questions: INITIAL_QUESTIONS
  },
  {
    id: "SRV-02",
    title: "Survey Employee Onboarding Experience",
    description: "Mengukur tingkat keterlibatan dan evaluasi karyawan baru selama proses onboarding",
    periodText: "20 Juli 2026 – 30 Juli 2026",
    status: "Selesai",
    respondCount: 152,
    targetCount: 152,
    respondRate: 100,
    creatorName: "HENDRA INDRA FIRMAWAN",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: "Dibuat 20 Juli 2026",
    category: "Onboarding & Pembelajaran",
    questions: INITIAL_QUESTIONS
  },
  {
    id: "SRV-03",
    title: "Survey Budaya Kerja & Implementasi AKHLAK 2026",
    description: "Evaluasi penerapan nilai-nilai AKHLAK di operasional lapangan dan kantor regional Pelindo",
    periodText: "20 Juli 2026 – 30 Juli 2026",
    status: "Aktif",
    respondCount: 80,
    targetCount: 152,
    respondRate: 65,
    creatorName: "HENDRA INDRA FIRMAWAN",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: "Dibuat 20 Juli 2026",
    category: "Budaya Kerja & AKHLAK",
    questions: INITIAL_QUESTIONS
  },
  {
    id: "SRV-04",
    title: "Survey Kesiapan Digital & Aplikasi Portaverse Mobile",
    description: "Mengukur efektivitas dan kemudahan penggunaan modul digitalisasi bagi insan Pelindo",
    periodText: "20 Juli 2026 – 30 Juli 2026",
    status: "Draft",
    respondCount: 0,
    targetCount: 152,
    respondRate: 0,
    creatorName: "HENDRA INDRA FIRMAWAN",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: "Dibuat 20 Juli 2026",
    category: "Digitalisasi & IT",
    questions: INITIAL_QUESTIONS
  },
  {
    id: "SRV-05",
    title: "Survey Port Safety & Health Culture Review Q2",
    description: "Pemeriksaan kesadaran kepatuhan K3 dan pencegahan insiden fatal di terminal pelabuhan",
    periodText: "20 Juli 2026 – 30 Juli 2026",
    status: "Selesai",
    respondCount: 140,
    targetCount: 152,
    respondRate: 92,
    creatorName: "HENDRA INDRA FIRMAWAN",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: "Dibuat 20 Juli 2026",
    category: "K3 & Operasional",
    questions: INITIAL_QUESTIONS
  },
  {
    id: "SRV-06",
    title: "Survey Kepuasan Fasilitas Pelatihan PMLI & Workshop",
    description: "Tanggapan peserta pelatihan terhadap instruktur, modul bahan ajar, dan fasilitas kelas",
    periodText: "20 Juli 2026 – 30 Juli 2026",
    status: "Diarsipkan",
    respondCount: 130,
    targetCount: 152,
    respondRate: 85,
    creatorName: "HENDRA INDRA FIRMAWAN",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: "Dibuat 20 Juli 2026",
    category: "Pelatihan & Fasilitas",
    questions: INITIAL_QUESTIONS
  }
];

const MOCK_RESPONDENTS: RespondentRow[] = [
  {
    id: "r1",
    name: "HENDRA INDRA FIRMAWAN",
    nipp: "105320",
    role: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    submittedAt: "Selasa, 18 Agustus 2026 10:25",
    duration: "00:12:48",
    status: "Selesai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    totalScore: 95,
    maxScore: 100,
    scoreGrade: "Sangat Baik (A)",
    answers: {
      q1: "Sangat Baik",
      q1Point: 25,
      q2: ["Memahami Indikator KPI", "Input data / angka"],
      q2Point: 40,
      q3: "Akan lebih baik jika tersedia buku panduan atau video tutorial yang menjelaskan langkah-langkah pengisian KPI secara lengkap dan mudah dipahami sebelum pengguna mulai melakukan pengisian. Panduan tersebut dapat membantu pengguna memahami setiap tahapan, indikator, serta informasi yang perlu diisi dengan benar.",
      q4: "Sulit memahami indikator KPI yang digunakan"
    }
  },
  {
    id: "r2",
    name: "AAN SUKWINANDI",
    nipp: "102800",
    role: "Officer I Fasilitas Terminal",
    email: "anandi@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    submittedAt: "-",
    duration: "-",
    status: "Belum Mengisi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    totalScore: 0,
    maxScore: 100,
    scoreGrade: "-",
    answers: {
      q1: "Baik",
      q1Point: 20,
      q2: ["Memahami Indikator KPI"],
      q2Point: 20,
      q3: "Sistem sering terlambat ketika banyak diinput, Mohon dapat diperbaiki agar proses pengisian lebih nyaman tidak memakan waktu yang lama",
      q4: "Input data cukup membingungkan"
    }
  },
  {
    id: "r3",
    name: "YOGI MUHAMMAD IRSHAD",
    nipp: "11002753",
    role: "VP Operasi Petikemas SPTP",
    email: "yogi.irshad@sptp.co.id",
    entity: "PT Pelabuhan Indonesia",
    submittedAt: "Selasa, 18 Agustus 2026 10:25",
    duration: "00:08:15",
    status: "Selesai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    totalScore: 75,
    maxScore: 100,
    scoreGrade: "Baik (B)",
    answers: {
      q1: "Cukup",
      q1Point: 15,
      q2: ["Memahami Indikator KPI", "Input data / angka", "Sistem / Teknologi yang digunakan"],
      q2Point: 60,
      q3: "Tambahkan fitur autosave agar data tidak hilang saat koneksi terputus atau halaman tertutup tidak sengaja.",
      q4: "Sistem Terkadang lambat saat menyimpan data"
    }
  },
  {
    id: "r4",
    name: "RADITYA SATYATAMA",
    nipp: "11002911",
    role: "General Manager Pelayanan Kapal SPJM",
    email: "raditya.s@spjm.co.id",
    entity: "PT Pelabuhan Indonesia",
    submittedAt: "Selasa, 18 Agustus 2026 10:25",
    duration: "00:15:30",
    status: "Selesai",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    totalScore: 60,
    maxScore: 100,
    scoreGrade: "Cukup (C)",
    answers: {
      q1: "Kurang Baik",
      q1Point: 10,
      q2: ["Memahami Indikator KPI", "Input data / angka"],
      q2Point: 40,
      q3: "Sebaiknya ada contoh pengisian pada setiap indikator KPI, sehingga lebih mudah dipahami oleh semua karyawan",
      q4: "Beberapa Indikator belum Terlalu jelas"
    }
  },
  {
    id: "r5",
    name: "AMANDA SUJIWO",
    nipp: "11003420",
    role: "Direktur Logistik SPSL",
    email: "amanda.sujiwo@spsl.co.id",
    entity: "PT Pelabuhan Indonesia",
    submittedAt: "Selasa, 18 Agustus 2026 10:25",
    duration: "00:10:02",
    status: "Selesai",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    totalScore: 85,
    maxScore: 100,
    scoreGrade: "Sangat Baik (A)",
    answers: {
      q1: "Sangat Baik",
      q1Point: 25,
      q2: ["Memahami Indikator KPI", "Input data / angka"],
      q2Point: 40,
      q3: "Alur pengisian sudah cukup baik, tetapi navigasinya masih bisa dibuat lebih sederhana",
      q4: "Tidak Memiliki Kendala"
    }
  }
];

export default function AssessmentManagement() {
  // Navigation Views: "list" | "form" | "result" | "respondent_detail"
  const [currentView, setCurrentView] = useState<"list" | "form" | "result" | "respondent_detail">("list");
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingSurveyId, setEditingSurveyId] = useState<string | null>(null);
  const [editingSurveyStatus, setEditingSurveyStatus] = useState<string>("Draft");

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyItem>(INITIAL_SURVEYS[0]);
  const [selectedRespondent, setSelectedRespondent] = useState<RespondentRow>(MOCK_RESPONDENTS[0]);

  // Main List State
  const [surveys, setSurveys] = useState<SurveyItem[]>(INITIAL_SURVEYS);
  const [activeTab, setActiveTab] = useState<"Semua" | "Aktif" | "Selesai" | "Draft" | "Diarsipkan">("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [cardAnalyticsSurvey, setCardAnalyticsSurvey] = useState<SurveyItem | null>(null);

  // Result View Sub-Tabs: "analisis" | "hasil_responden"
  const [resultTab, setResultTab] = useState<"analisis" | "hasil_responden">("analisis");
  const [respondentSearch, setRespondentSearch] = useState("");
  const [respondentStatusFilter, setRespondentStatusFilter] = useState("Semua");

  // Question Modal Popup (Breakdown per Respondent)
  const [modalQuestion, setModalQuestion] = useState<{ number: number; title: string; type: string } | null>(null);

  // Stepper Form States
  const [judulSurvey, setJudulSurvey] = useState("Survey Pengalaman Pengisian KPI Terbaru");
  const [deskripsiSurvey, setDeskripsiSurvey] = useState("Bagikan pengalaman dan tanggapan Anda mengenai proses pengisian KPI terbaru untuk membantu kami meningkatkan kemudahan dan efektivitas penggunaannya.");
  const [kategoriSurvey, setKategoriSurvey] = useState("Penilaian KPI & Kinerja");
  const [gambarContentName, setGambarContentName] = useState("Banner_Survey_2026.png");
  const [filePendukungName, setFilePendukungName] = useState("");

  // Step 2: Dynamic Question Builder State
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>("q1");

  // Step 3: Target Responden State
  const [roles, setRoles] = useState<string[]>(["HO_SuperAdmin", "Admin_KMS", "Admin_LMS", "Admin_TMS"]);
  const [entities, setEntities] = useState<string[]>(["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "+30 More"]);
  const [organizations, setOrganizations] = useState<string[]>(["Group SDM & Budaya Korporat", "Divisi IT & Digitalisasi", "+12 More"]);
  const [users, setUsers] = useState<string[]>(["Hendra Indra Firmawan", "Yogi Muhammad Irshad", "Aan Sukwinandi", "Amanda Sujiwo", "+100 More"]);

  // Step 4: Settings State
  const [tglMulai, setTglMulai] = useState("2026-08-20");
  const [tglSelesai, setTglSelesai] = useState("2026-09-05");
  const [reminderActive, setReminderActive] = useState(true);
  const [reminderFreq, setReminderFreq] = useState("Setiap 3 hari sekali");
  const [reminderStartDate, setReminderStartDate] = useState("2026-08-24");
  const [singleResponseOnly, setSingleResponseOnly] = useState(true);
  const [anonymousResponse, setAnonymousResponse] = useState(false);

  // Safe Toast Notification (replaces window.alert for sandboxed iframes / v0)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Confirmation & Success Modals
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);
  const [showSuccessPublish, setShowSuccessPublish] = useState(false);
  const [showConfirmDraft, setShowConfirmDraft] = useState(false);
  const [showSuccessDraft, setShowSuccessDraft] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState<SurveyItem | null>(null);
  const [surveyToArchive, setSurveyToArchive] = useState<SurveyItem | null>(null);

  // Handlers for Archive and Delete
  const handleArchiveSurvey = (surveyId: string) => {
    setSurveys(prev => prev.map(s => s.id === surveyId ? { ...s, status: "Diarsipkan" } : s));
    setOpenMenuId(null);
    setSurveyToArchive(null);
    showToast("Status assessment berhasil diubah menjadi 'Diarsipkan'.");
  };

  const handleRestoreSurvey = (surveyId: string) => {
    setSurveys(prev => prev.map(s => s.id === surveyId ? { ...s, status: "Selesai" } : s));
    setOpenMenuId(null);
    showToast("Assessment berhasil dikembalikan dari arsip ke status 'Selesai'.");
  };

  const handleDeleteSurvey = (surveyId: string, currentStatus?: string) => {
    const target = surveys.find(s => s.id === surveyId);
    const status = currentStatus || target?.status;

    if (status === "Diarsipkan") {
      // Jika status Diarsipkan, menghapus data arsip mengembalikan statusnya ke "Selesai"
      setSurveys(prev => prev.map(s => s.id === surveyId ? { ...s, status: "Selesai" } : s));
      setSurveyToDelete(null);
      setOpenMenuId(null);
      showToast("Data arsip dihapus. Status assessment kembali menjadi 'Selesai'.");
    } else {
      // Jika Draft atau lainnya, hapus dari list
      setSurveys(prev => prev.filter(s => s.id !== surveyId));
      setSurveyToDelete(null);
      setOpenMenuId(null);
      showToast("Data draft assessment berhasil dihapus.");
    }
  };

  // Filtered Surveys
  const filteredSurveys = surveys.filter(s => {
    const matchTab = activeTab === "Semua" || s.status === activeTab;
    const matchSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  // Filtered Respondents
  const filteredRespondents = MOCK_RESPONDENTS.filter(r => {
    const matchStatus = respondentStatusFilter === "Semua" || r.status === respondentStatusFilter;
    const matchSearch = !respondentSearch ||
      r.name.toLowerCase().includes(respondentSearch.toLowerCase()) ||
      r.nipp.includes(respondentSearch);
    return matchStatus && matchSearch;
  });

  // ==========================================
  // HANDLERS: CREATE vs EDIT MODE INITIALIZATION
  // ==========================================
  const handleOpenCreateSurvey = () => {
    setFormMode("create");
    setEditingSurveyId(null);
    setEditingSurveyStatus("Draft");
    setJudulSurvey("");
    setDeskripsiSurvey("");
    setKategoriSurvey("Penilaian KPI & Kinerja");
    setQuestions([
      {
        id: `q-${Date.now()}-1`,
        number: 1,
        questionText: "Bagaimana tingkat kepuasan Anda terhadap program pelatihan ini?",
        type: "Pilihan Tunggal",
        required: true,
        options: ["Sangat Puas", "Puas", "Cukup", "Kurang Puas", "Tidak Puas"],
        chartType: "Pie Chart"
      },
      {
        id: `q-${Date.now()}-2`,
        number: 2,
        questionText: "Fasilitas apa saja yang menurut Anda perlu ditingkatkan?",
        type: "Pilihan Ganda",
        required: true,
        options: ["Materi Modul Pembelajaran", "Kecepatan Akses Portal LMS", "Kualitas Audio & Video", "Kesesuaian Jadwal", "Lainnya"],
        chartType: "Bar Chart"
      },
      {
        id: `q-${Date.now()}-3`,
        number: 3,
        questionText: "Tuliskan saran perbaikan untuk penyelenggaraan sesi berikutnya:",
        type: "Isian Panjang",
        required: false,
        options: [],
        chartType: "Table"
      }
    ]);
    setEditingQuestionId(`q-${Date.now()}-1`);
    setCurrentStep(1);
    setCurrentView("form");
  };

  const handleOpenEditSurvey = (item: SurveyItem) => {
    setOpenMenuId(null);
    setFormMode("edit");
    setEditingSurveyId(item.id);
    setEditingSurveyStatus(item.status);
    setSelectedSurvey(item);
    setJudulSurvey(item.title);
    setDeskripsiSurvey(item.description);
    setKategoriSurvey(item.category || "Penilaian KPI & Kinerja");
    if (item.questions && item.questions.length > 0) {
      setQuestions(item.questions);
      setEditingQuestionId(item.questions[0].id);
    } else {
      setQuestions(INITIAL_QUESTIONS);
      setEditingQuestionId(INITIAL_QUESTIONS[0].id);
    }
    setCurrentStep(1);
    setCurrentView("form");
  };

  const handleViewResult = (s: SurveyItem) => {
    setSelectedSurvey(s);
    setOpenMenuId(null);
    setResultTab("analisis");
    setCurrentView("result");
  };

  const handleOpenRespondentDetail = (r: RespondentRow) => {
    setSelectedRespondent(r);
    setCurrentView("respondent_detail");
  };

  // ==========================================
  // HANDLERS: STEP 2 QUESTION & ANSWER BUILDER
  // ==========================================
  const handleAddNewQuestion = () => {
    const newId = `q-${Date.now()}`;
    const newQ: QuestionItem = {
      id: newId,
      number: questions.length + 1,
      questionText: "",
      type: "Pilihan Tunggal",
      required: true,
      options: ["Pilihan 1", "Pilihan 2", "Pilihan 3"],
      chartType: "Pie Chart"
    };
    setQuestions([...questions, newQ]);
    setEditingQuestionId(newId);
  };

  const handleUpdateQuestion = (id: string, updates: Partial<QuestionItem>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      showToast("Survey minimal harus memiliki 1 butir pertanyaan.");
      return;
    }
    const filtered = questions.filter(q => q.id !== id).map((q, idx) => ({ ...q, number: idx + 1 }));
    setQuestions(filtered);
    if (editingQuestionId === id) {
      setEditingQuestionId(filtered[0]?.id || null);
    }
  };

  const handleDuplicateQuestion = (id: string) => {
    const target = questions.find(q => q.id === id);
    if (!target) return;
    const newId = `q-${Date.now()}`;
    const duplicated: QuestionItem = {
      ...target,
      id: newId,
      number: questions.length + 1,
      questionText: `${target.questionText} (Salinan)`
    };
    setQuestions([...questions, duplicated]);
    setEditingQuestionId(newId);
  };

  const handleAddOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const nextPoints = q.optionPoints ? [...q.optionPoints, 10] : [...q.options.map(() => 10), 10];
        return {
          ...q,
          options: [...q.options, `Pilihan ${q.options.length + 1}`],
          optionPoints: nextPoints
        };
      }
      return q;
    }));
  };

  const handleUpdateOption = (questionId: string, optIndex: number, val: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const nextOpts = [...q.options];
        nextOpts[optIndex] = val;
        return { ...q, options: nextOpts };
      }
      return q;
    }));
  };

  const handleUpdateOptionPoint = (questionId: string, optIndex: number, pointVal: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const nextPoints = q.optionPoints ? [...q.optionPoints] : q.options.map((_, i) => (i === 0 ? 25 : i === 1 ? 20 : i === 2 ? 15 : i === 3 ? 10 : 5));
        nextPoints[optIndex] = pointVal;
        return { ...q, optionPoints: nextPoints };
      }
      return q;
    }));
  };

  const handleDeleteOption = (questionId: string, optIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        if (q.options.length <= 2) {
          showToast("Pilihan ganda / tunggal minimal memiliki 2 pilihan jawaban.");
          return q;
        }
        return {
          ...q,
          options: q.options.filter((_, i) => i !== optIndex),
          optionPoints: q.optionPoints ? q.optionPoints.filter((_, i) => i !== optIndex) : undefined
        };
      }
      return q;
    }));
  };

  // ==========================================
  // HANDLERS: SAVE / PUBLISH EXECUTION
  // ==========================================
  const handleExecutePublish = () => {
    setShowConfirmPublish(false);
    setShowSuccessPublish(true);

    if (formMode === "create") {
      const newSurveyItem: SurveyItem = {
        id: `SRV-${String(surveys.length + 1).padStart(2, '0')}`,
        title: judulSurvey || "Survey Evaluasi & Feedback Insan Pelindo",
        description: deskripsiSurvey || "Kuesioner evaluasi program dan peningkatan kepuasan kerja insan Pelindo.",
        periodText: `${tglMulai} – ${tglSelesai}`,
        status: "Aktif",
        respondCount: 0,
        targetCount: 200,
        respondRate: 0,
        creatorName: "HENDRA INDRA FIRMAWAN",
        creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        createdAt: "Dibuat Baru",
        category: kategoriSurvey,
        questions: questions
      };
      setSurveys([newSurveyItem, ...surveys]);
    } else {
      // Update existing
      setSurveys(surveys.map(s => s.id === editingSurveyId ? {
        ...s,
        title: judulSurvey,
        description: deskripsiSurvey,
        category: kategoriSurvey,
        questions: questions
      } : s));
    }

    setTimeout(() => {
      setShowSuccessPublish(false);
      setCurrentView("list");
    }, 1500);
  };

  const handleExecuteDraft = () => {
    setShowConfirmDraft(false);
    setShowSuccessDraft(true);

    if (formMode === "create") {
      const newDraftItem: SurveyItem = {
        id: `SRV-${String(surveys.length + 1).padStart(2, '0')}`,
        title: judulSurvey || "Draft Survey Baru",
        description: deskripsiSurvey || "Draf kuesioner sedang dalam penyusunan pertanyaan.",
        periodText: `${tglMulai} – ${tglSelesai}`,
        status: "Draft",
        respondCount: 0,
        targetCount: 150,
        respondRate: 0,
        creatorName: "HENDRA INDRA FIRMAWAN",
        creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        createdAt: "Draft",
        category: kategoriSurvey,
        questions: questions
      };
      setSurveys([newDraftItem, ...surveys]);
    } else {
      setSurveys(surveys.map(s => s.id === editingSurveyId ? {
        ...s,
        title: judulSurvey,
        description: deskripsiSurvey,
        category: kategoriSurvey,
        questions: questions
      } : s));
    }

    setTimeout(() => {
      setShowSuccessDraft(false);
      setCurrentView("list");
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans">

      {/* =========================================================================
          VIEW 1: SURVEY MANAGEMENT MAIN LIST
         ========================================================================= */}
      {currentView === "list" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Survey Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Buat, kelola, dan analisis survey untuk mendapatkan insight dari pengguna
              </p>
            </div>

            <button
              onClick={handleOpenCreateSurvey}
              className="px-5 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20 transition self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Survey</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Total Survey</div>
              <div className="text-3xl font-black text-[#016DB2]">{surveys.length}</div>
              <div className="text-[11px] text-slate-400">Formulir Survey Aktif &amp; Arsip</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Survey Aktif</div>
              <div className="text-3xl font-black text-emerald-600">
                {surveys.filter(s => s.status === "Aktif").length}
              </div>
              <div className="text-[11px] text-slate-400">Sedang berjalan menerima respon</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Total Respon Masuk</div>
              <div className="text-3xl font-black text-purple-600">
                {surveys.reduce((acc, s) => acc + s.respondCount, 0)}
              </div>
              <div className="text-[11px] text-slate-400">Dari seluruh entitas Pelindo</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Rata-Rata Respon</div>
              <div className="text-3xl font-black text-amber-600">68.4%</div>
              <div className="text-[11px] text-slate-400">Tingkat responsivitas target</div>
            </div>
          </div>

          {/* Tabs Filter */}
          <div className="flex border-b border-slate-200 gap-6 text-xs font-bold text-slate-500">
            {(["Semua", "Aktif", "Selesai", "Draft", "Diarsipkan"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 border-b-2 transition capitalize ${activeTab === tab ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama survey, deskripsi, atau inisiator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2] shadow-xs"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <b className="text-slate-800">{filteredSurveys.length}</b> survey dari <b>{surveys.length}</b> total Survey.
          </div>

          {/* Survey Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSurveys.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition p-5 flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-0.5 rounded-md text-[11px] font-bold border ${item.status === "Aktif"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : item.status === "Selesai"
                          ? "bg-slate-100 text-slate-700 border-slate-200"
                          : item.status === "Draft"
                            ? "bg-amber-50 text-amber-700 border border-amber-300"
                            : "bg-purple-50 text-purple-700 border-purple-200"
                      }`}>
                      {item.status}
                    </span>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === item.id && (
                        <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-30 text-xs font-semibold animate-in fade-in">
                          {/* Lihat Hasil (for all except Draft) */}
                          {item.status !== "Draft" && (
                            <button
                              type="button"
                              onClick={() => handleViewResult(item)}
                              className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 transition flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              <span>Lihat Hasil</span>
                            </button>
                          )}

                          {/* Edit Survey (for non-archived surveys) */}
                          {item.status !== "Diarsipkan" && (
                            <button
                              type="button"
                              onClick={() => handleOpenEditSurvey(item)}
                              className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-[#016DB2] transition flex items-center gap-2"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Survey</span>
                            </button>
                          )}

                          {/* Jika status Selesai -> Munculkan action "Diarsipkan" */}
                          {item.status === "Selesai" && (
                            <button
                              type="button"
                              onClick={() => handleArchiveSurvey(item.id)}
                              className="w-full text-left px-3.5 py-2 hover:bg-purple-50 text-purple-700 transition flex items-center gap-2 border-t border-slate-100"
                            >
                              <Archive className="w-3.5 h-3.5 text-purple-600" />
                              <span>Diarsipkan</span>
                            </button>
                          )}

                          {/* Jika status Diarsipkan -> Munculkan action "Pulihkan" & "Hapus" */}
                          {item.status === "Diarsipkan" && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleRestoreSurvey(item.id)}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 transition flex items-center gap-2"
                              >
                                <ArchiveRestore className="w-3.5 h-3.5 text-slate-500" />
                                <span>Pulihkan Survey</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  setSurveyToDelete(item);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 transition flex items-center gap-2 border-t border-slate-100"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                <span>Hapus</span>
                              </button>
                            </>
                          )}

                          {/* Jika status Draft -> Munculkan action "Hapus Draft" */}
                          {item.status === "Draft" && (
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setSurveyToDelete(item);
                              }}
                              className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 transition flex items-center gap-2 border-t border-slate-100"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              <span>Hapus Draft</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {item.category && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-[#016DB2] border border-sky-100">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Periode: {item.periodText}</span>
                    </div>
                  </div>

                  {/* Quick Card-Level Analytics Summary */}
                  {item.status !== "Draft" && (() => {
                    const cardAna = getSurveyAnalytics(item);
                    return (
                      <div className="bg-gradient-to-r from-sky-50/70 to-blue-50/50 p-2.5 rounded-xl border border-sky-100 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                          <span>{cardAna.averageRating} / 5.0</span>
                          <span className="text-[10px] font-medium text-slate-500">({cardAna.ratingLabel})</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-semibold">
                          <span className="bg-white px-2 py-0.5 rounded-md border border-sky-200 text-[#016DB2] shadow-2xs">
                            NPS +{cardAna.npsScore}
                          </span>
                          <span className="text-slate-500 font-medium">~{cardAna.completionAvgMinutes} mnt</span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 3 Metric Pills */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#016DB2] flex items-center justify-center">
                        <Send className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{item.respondCount}</div>
                        <div className="text-[10px] text-slate-400">Respond</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#016DB2] flex items-center justify-center">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{item.targetCount}</div>
                        <div className="text-[10px] text-slate-400">Target</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <svg className="w-8 h-8 transform -rotate-90">
                          <circle cx="16" cy="16" r="13" stroke="#E2E8F0" strokeWidth="3" fill="none" />
                          <circle
                            cx="16" cy="16" r="13"
                            stroke="#016DB2"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="81.68"
                            strokeDashoffset={81.68 - (81.68 * item.respondRate) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{item.respondRate}%</div>
                        <div className="text-[10px] text-slate-400">Respond Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Per-Card Dedicated Action Row: Analitik & Grafik + Data Responden */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCardAnalyticsSurvey(item);
                      }}
                      className="flex-1 py-2 px-3 bg-sky-50 hover:bg-[#016DB2] text-[#016DB2] hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-sky-200 hover:border-[#016DB2] shadow-2xs group"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-[#016DB2] group-hover:text-white transition" />
                      <span>Analitik &amp; Grafik</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewResult(item);
                      }}
                      className="py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
                    >
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Responden</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                  <img
                    src={item.creatorAvatar}
                    alt={item.creatorName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 uppercase">{item.creatorName}</div>
                    <div className="text-[10px] text-slate-400">{item.createdAt}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: HASIL ANALISIS SURVEY
         ========================================================================= */}
      {currentView === "result" && (
        <div className="space-y-6">

          {/* Breadcrumb & Back Button */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <button onClick={() => setCurrentView("list")} className="hover:text-[#016DB2]">Survey Management</button>
                <span>&gt;</span>
                <span className="text-slate-700 font-semibold">Hasil Analisis</span>
              </div>

              <button
                type="button"
                onClick={() => setCurrentView("list")}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#016DB2] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          </div>

          {/* Survey Header & Top Right Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  {selectedSurvey.title}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${selectedSurvey.status === "Aktif"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : selectedSurvey.status === "Selesai"
                      ? "bg-slate-100 text-slate-700 border border-slate-200"
                      : selectedSurvey.status === "Diarsipkan"
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "bg-amber-50 text-amber-700 border border-amber-300"
                  }`}>
                  {selectedSurvey.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Diperbarui 18 Agustus 2026 &bull; Dibuat oleh {selectedSurvey.creatorName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  try {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  } catch (e) {
                    // ignore clipboard error in sandboxed iframe
                  }
                  showToast("Link survey berhasil disalin!");
                }}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Link Survey</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Mengunduh laporan survey format Excel & PDF...")}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Report</span>
              </button>

              {/* Action Diarsipkan jika status Selesai */}
              {selectedSurvey.status === "Selesai" && (
                <button
                  type="button"
                  onClick={() => {
                    handleArchiveSurvey(selectedSurvey.id);
                    setSelectedSurvey(prev => ({ ...prev, status: "Diarsipkan" }));
                  }}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
                >
                  <Archive className="w-3.5 h-3.5 text-purple-600" />
                  <span>Diarsipkan</span>
                </button>
              )}

              {/* Action Hapus jika status Diarsipkan */}
              {selectedSurvey.status === "Diarsipkan" && (
                <button
                  type="button"
                  onClick={() => setSurveyToDelete(selectedSurvey)}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  <span>Hapus Arsip</span>
                </button>
              )}

              {selectedSurvey.status !== "Diarsipkan" && (
                <button
                  type="button"
                  onClick={() => handleOpenEditSurvey(selectedSurvey)}
                  className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Survey</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Total Respond</div>
              <div className="text-3xl font-black text-slate-900">{selectedSurvey.respondCount} <span className="text-xs font-normal text-slate-400">dari {selectedSurvey.targetCount} Target</span></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Total Belum Respon</div>
              <div className="text-3xl font-black text-slate-900">{selectedSurvey.targetCount - selectedSurvey.respondCount} <span className="text-xs font-normal text-slate-400">dari {selectedSurvey.targetCount} Target</span></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Persentase Responden</div>
              <div className="text-3xl font-black text-slate-900">{selectedSurvey.respondRate}% <span className="text-xs font-normal text-slate-400">Tercapai</span></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Rata-Rata Waktu Penyelesaian</div>
              <div className="text-3xl font-black text-slate-900">{getSurveyAnalytics(selectedSurvey).completionAvgMinutes} <span className="text-xs font-normal text-slate-400">Menit per Responden</span></div>
            </div>
          </div>

          {/* Tab Switcher: Analisis vs Hasil Responden */}
          <div className="flex border-b border-slate-200 gap-6 text-xs font-bold text-slate-500">
            <button
              onClick={() => setResultTab("analisis")}
              className={`pb-3 border-b-2 transition ${resultTab === "analisis" ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
            >
              Analisis
            </button>
            <button
              onClick={() => setResultTab("hasil_responden")}
              className={`pb-3 border-b-2 transition ${resultTab === "hasil_responden" ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
            >
              Hasil Responden
            </button>
          </div>

          {/* Sub-Tab 1: Analisis */}
          {resultTab === "analisis" && (() => {
            const activeAna = getSurveyAnalytics(selectedSurvey);
            return (
              <div className="space-y-6">

                {/* Banner Rata-Rata Skor Akumulasi Survei */}
                <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#016DB2] text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 font-semibold">Rata-Rata Skor Poin Asesmen</div>
                      <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <span>{activeAna.averageScorePoints}</span>
                        <span className="text-xs font-normal text-slate-400">/ {activeAna.maxScorePoints} Poin</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <span className="px-3.5 py-1.5 bg-white border border-sky-200 text-[#016DB2] font-black text-xs rounded-xl shadow-2xs">
                      Predikat Rata-Rata: {activeAna.scoreGrade}
                    </span>
                  </div>
                </div>

                {/* Question 1: Donut Chart */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                        Q1
                      </span>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">
                          {selectedSurvey.questions && selectedSurvey.questions[0] 
                            ? selectedSurvey.questions[0].questionText 
                            : `Bagaimana pengalaman Anda secara keseluruhan dalam ${selectedSurvey.title}?`}
                        </h3>
                        <div className="text-[11px] text-slate-400 mt-0.5">Pilihan Tunggal &bull; Indeks: {activeAna.averageRating}/5.0 ({activeAna.ratingLabel})</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalQuestion({
                        number: 1,
                        title: selectedSurvey.questions?.[0]?.questionText || selectedSurvey.title,
                        type: "Pilihan Tunggal"
                      })}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shadow-2xs shrink-0"
                    >
                      Lihat Detail
                    </button>
                  </div>

                  <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-center gap-10">
                    <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                      <svg className="w-44 h-44 transform -rotate-90">
                        <circle cx="88" cy="88" r="64" stroke="#E2E8F0" strokeWidth="18" fill="none" />
                        {(() => {
                          let cumulative = 0;
                          const circumference = 402;
                          return activeAna.satisfactionData.map((item, idx) => {
                            const offset = circumference - (circumference * (cumulative + item.pct)) / 100;
                            cumulative += item.pct;
                            return (
                              <circle
                                key={idx}
                                cx="88"
                                cy="88"
                                r="64"
                                stroke={item.color}
                                strokeWidth="18"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                              />
                            );
                          });
                        })()}
                      </svg>

                      <div className="absolute text-center">
                        <div className="text-2xl font-black text-slate-900">{selectedSurvey.respondCount}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">Responden</div>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs font-semibold text-slate-700 min-w-64">
                      {activeAna.satisfactionData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span>{item.label}</span>
                            {item.point !== undefined && (
                              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100 shrink-0">
                                +{item.point} Poin
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-slate-900">{item.count} <span className="text-slate-400 font-normal">({item.pct}%)</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Question 2: Bar Chart */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                        Q2
                      </span>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">
                          {selectedSurvey.questions && selectedSurvey.questions[1] 
                            ? selectedSurvey.questions[1].questionText 
                            : "Aspek & Parameter Evaluasi Utama"}
                        </h3>
                        <div className="text-[11px] text-slate-400 mt-0.5">Analisis Distribusi Indikator</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalQuestion({
                        number: 2,
                        title: selectedSurvey.questions?.[1]?.questionText || "Parameter Evaluasi",
                        type: "Pilihan Ganda"
                      })}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shadow-2xs shrink-0"
                    >
                      Lihat Detail
                    </button>
                  </div>

                  <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-4">
                    {activeAna.aspectData.map((asp, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4">
                        <div className="w-64 flex items-center gap-2">
                          <span className="font-semibold text-slate-700 truncate">{asp.label}</span>
                          {asp.pointWeight !== undefined && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                              Bobot: {asp.pointWeight} pt
                            </span>
                          )}
                        </div>
                        <div className="flex-1 h-3.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${asp.scorePct}%`, backgroundColor: asp.color }}></div>
                        </div>
                        <span className="w-36 text-right font-bold text-slate-800">{asp.countText}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Sub-Tab 2: Hasil Responden */}
          {resultTab === "hasil_responden" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 text-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari Nama, NIPP"
                    value={respondentSearch}
                    onChange={(e) => setRespondentSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2]"
                  />
                </div>

                <div className="relative w-full sm:w-44">
                  <select
                    value={respondentStatusFilter}
                    onChange={(e) => setRespondentStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 appearance-none pr-8"
                  >
                    <option value="Semua">Status: Semua</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Belum Mengisi">Belum Mengisi</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[11px] text-slate-400 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="pb-3 pl-2">USER</th>
                      <th className="pb-3">ENTITAS</th>
                      <th className="pb-3">TANGGAL PENGISIAN</th>
                      <th className="pb-3 text-center">SKOR (POIN)</th>
                      <th className="pb-3">STATUS</th>
                      <th className="pb-3 pr-2 text-right">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredRespondents.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 pl-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={res.avatar}
                              alt={res.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <div className="font-bold text-slate-900">{res.name} &bull; <span className="font-mono text-slate-500 font-normal">{res.nipp}</span></div>
                              <div className="text-[10px] text-slate-400">{res.role}</div>
                              <div className="text-[10px] text-slate-400">{res.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 text-slate-700">
                          {res.entity}
                        </td>

                        <td className="py-3.5 text-slate-500 text-[11px]">
                          {res.submittedAt}
                        </td>

                        {/* Kolom Skor Poin */}
                        <td className="py-3.5 text-center">
                          {res.status === "Selesai" ? (
                            <div className="inline-flex flex-col items-center">
                              <span className="font-black text-xs text-[#016DB2]">
                                {res.totalScore ?? 95} <span className="text-[10px] text-slate-400 font-normal">/ {res.maxScore ?? 100}</span>
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-[#016DB2] border border-sky-200 mt-0.5">
                                {res.scoreGrade ?? "Grade A"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-300 text-xs font-mono">-</span>
                          )}
                        </td>

                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${res.status === "Selesai" ? "bg-emerald-50 text-emerald-700 border border-emerald-300" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                            {res.status}
                          </span>
                        </td>

                        <td className="py-3.5 pr-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenRespondentDetail(res)}
                            className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition shadow-2xs"
                          >
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          VIEW 3: DETAIL RESPONDEN
         ========================================================================= */}
      {currentView === "respondent_detail" && (
        <div className="space-y-6">

          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <button onClick={() => setCurrentView("list")} className="hover:text-[#016DB2]">Survey Management</button>
              <span>&gt;</span>
              <button onClick={() => setCurrentView("result")} className="hover:text-[#016DB2]">Hasil Analisis</button>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">Detail Responden</span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView("result")}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#016DB2] transition pt-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Detail Responden</h1>
            <p className="text-xs text-slate-500 mt-0.5">Melihat detail jawaban responden dibawah ini</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="md:col-span-1 flex items-center gap-3">
              <img
                src={selectedRespondent.avatar}
                alt={selectedRespondent.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="font-bold text-slate-900">{selectedRespondent.name} &bull; <span className="font-mono text-slate-500 font-normal">{selectedRespondent.nipp}</span></div>
                <div className="text-[11px] text-slate-400">{selectedRespondent.role}</div>
                <div className="text-[11px] text-slate-400">{selectedRespondent.email}</div>
              </div>
            </div>

            <div>
              <div className="text-slate-400 text-[11px]">Entitas</div>
              <div className="font-bold text-slate-800 mt-1">{selectedRespondent.entity}</div>
            </div>

            <div>
              <div className="text-slate-400 text-[11px]">Tanggal Mengisi</div>
              <div className="font-bold text-slate-800 mt-1">{selectedRespondent.submittedAt} WIB</div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6">
              <div>
                <div className="text-slate-400 text-[11px]">Durasi Pengisian</div>
                <div className="font-bold text-slate-800 mt-1">{selectedRespondent.duration}</div>
              </div>

              <div>
                <div className="text-slate-400 text-[11px] mb-1">Status</div>
                <span className="px-3 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                  {selectedRespondent.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#016DB2] text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-semibold">Total Akumulasi Skor Asesmen Responden</div>
                <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <span>{selectedRespondent.totalScore ?? 95}</span>
                  <span className="text-xs font-normal text-slate-400">/ {selectedRespondent.maxScore ?? 100} Poin</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="px-3.5 py-1.5 bg-white border border-sky-200 text-[#016DB2] font-black text-xs rounded-xl shadow-2xs">
                Predikat: {selectedRespondent.scoreGrade ?? "Sangat Baik (A)"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Jawaban Responden &amp; Perolehan Poin</span>
              <span className="text-[11px] font-normal text-slate-400">Kalkulasi Otomatis dari Opsi Pilihan</span>
            </h3>

            <div className="space-y-4">
              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                    Q1
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Seberapa mudah proses pengisian KPI bagi Anda?</h4>
                    <div className="text-[10px] text-slate-400">Pilihan Tunggal &bull; Berbobot Poin</div>
                  </div>
                </div>

                <div className="pt-2 pl-8 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold mb-0.5">Jawaban Terpilih</div>
                    <div className="font-bold text-xs text-slate-800">{selectedRespondent.answers.q1}</div>
                  </div>
                  {selectedRespondent.answers.q1Point !== undefined && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-black text-[11px] border border-emerald-200">
                      +{selectedRespondent.answers.q1Point} Poin
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                    Q2
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Apa yang menurut Anda paling sulit dalam proses pengisian KPI?</h4>
                    <div className="text-[10px] text-slate-400">Pilihan Ganda &bull; Berbobot Poin</div>
                  </div>
                </div>

                <div className="pt-2 pl-8 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-[11px] text-slate-400 font-semibold mb-1">Jawaban Terpilih</div>
                    <ul className="space-y-1">
                      {selectedRespondent.answers.q2.map((item, i) => (
                        <li key={i} className="font-bold text-xs text-slate-800 flex items-center gap-2">
                          <span>&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selectedRespondent.answers.q2Point !== undefined && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-black text-[11px] border border-emerald-200 shrink-0">
                      +{selectedRespondent.answers.q2Point} Poin
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                    Q3
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Apa Saran Anda untuk meningkatkan proses pengisian KPI?</h4>
                    <div className="text-[10px] text-slate-400">Isian Panjang (Non-Scoring / Kualitatif)</div>
                  </div>
                </div>

                <div className="pt-2 pl-8">
                  <div className="text-[11px] text-slate-400 font-semibold mb-0.5">Uraian Jawaban</div>
                  <div className="font-medium text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                    &ldquo;{selectedRespondent.answers.q3}&rdquo;
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                    Q4
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Apa kendala utama yang anda alami saat mengisi KPI?</h4>
                    <div className="text-[10px] text-slate-400">Isian Pendek (Non-Scoring / Kualitatif)</div>
                  </div>
                </div>

                <div className="pt-2 pl-8">
                  <div className="text-[11px] text-slate-400 font-semibold mb-0.5">Jawaban Ringkas</div>
                  <div className="font-semibold text-xs text-slate-800 bg-white px-3 py-2 rounded-xl border border-slate-200">
                    {selectedRespondent.answers.q4}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW 4: STEPPER WIZARD (BUAT SURVEY BARU vs EDIT SURVEY)
         ========================================================================= */}
      {currentView === "form" && (
        <div className="space-y-6">

          {/* Header with Dynamic Labels & Status per Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <button onClick={() => setCurrentView("list")} className="hover:text-[#016DB2]">Survey Management</button>
                <span>&gt;</span>
                <span className="text-slate-700 font-semibold">
                  {formMode === "create" ? "Buat Survey" : "Edit Survey"}
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {formMode === "create" ? "Buat Survey" : "Edit Survey"}
              </h1>
              <p className="text-xs text-slate-500">
                {formMode === "create"
                  ? "Buat formulir survey baru untuk mengumpulkan feedback dan evaluasi dari insan Pelindo."
                  : `Memperbarui data dan daftar pertanyaan untuk formulir ${selectedSurvey?.id || ""}.`}
              </p>
            </div>

            {/* Dynamic Status Badge */}
            <div>
              <span className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border shadow-xs ${formMode === "create"
                  ? "border-amber-300 text-amber-700 bg-amber-50"
                  : editingSurveyStatus === "Aktif"
                    ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                    : editingSurveyStatus === "Draft"
                      ? "border-amber-300 text-amber-700 bg-amber-50"
                      : "border-slate-300 text-slate-700 bg-slate-50"
                }`}>
                Status: {formMode === "create" ? "Draft" : editingSurveyStatus}
              </span>
            </div>
          </div>

          {/* Stepper Steps Navigation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between max-w-3xl mx-auto text-xs">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${currentStep === 1 ? "bg-[#016DB2] text-white shadow-xs" : currentStep > 1 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                  {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
                </div>
                <span className={`font-bold transition ${currentStep === 1 ? "text-[#016DB2]" : "text-slate-600 group-hover:text-slate-900"}`}>
                  Informasi Survey
                </span>
              </button>

              <div className="w-12 h-0.5 bg-slate-200 hidden sm:block"></div>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${currentStep === 2 ? "bg-[#016DB2] text-white shadow-xs" : currentStep > 2 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                  {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
                </div>
                <span className={`font-bold transition ${currentStep === 2 ? "text-[#016DB2]" : "text-slate-600 group-hover:text-slate-900"}`}>
                  Daftar Pertanyaan
                </span>
              </button>

              <div className="w-12 h-0.5 bg-slate-200 hidden sm:block"></div>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${currentStep === 3 ? "bg-[#016DB2] text-white shadow-xs" : currentStep > 3 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                  {currentStep > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : "3"}
                </div>
                <span className={`font-bold transition ${currentStep === 3 ? "text-[#016DB2]" : "text-slate-600 group-hover:text-slate-900"}`}>
                  Target Responden
                </span>
              </button>

              <div className="w-12 h-0.5 bg-slate-200 hidden sm:block"></div>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${currentStep === 4 ? "bg-[#016DB2] text-white shadow-xs" : "bg-slate-100 text-slate-400"
                  }`}>
                  4
                </div>
                <span className={`font-bold transition ${currentStep === 4 ? "text-[#016DB2]" : "text-slate-600 group-hover:text-slate-900"}`}>
                  Pengaturan
                </span>
              </button>
            </div>
          </div>

          {/* ===================================================================
              STEP 1: INFORMASI SURVEY
             =================================================================== */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">1. Informasi Standar Survey</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Isi judul, deskripsi, dan kategori topik survey Anda.</p>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">Langkah 1 dari 4</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Judul Survey / Blast Message<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Survey Evaluasi Kepuasan Pelayanan IT & Fasilitas Kerja 2026"
                    value={judulSurvey}
                    onChange={(e) => setJudulSurvey(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#016DB2]"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">Judul yang akan dilihat oleh responden pada halaman asesmen.</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Kategori Topik Survey<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={kategoriSurvey}
                        onChange={(e) => setKategoriSurvey(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 font-semibold text-slate-800 focus:outline-none focus:border-[#016DB2]"
                      >
                        <option>Penilaian KPI &amp; Kinerja</option>
                        <option>Budaya Kerja &amp; AKHLAK</option>
                        <option>K3 &amp; Keselamatan Operasional</option>
                        <option>Digitalisasi &amp; IT Portaverse</option>
                        <option>Pelatihan &amp; Fasilitas PMLI</option>
                        <option>Onboarding Karyawan Baru</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Inisiator Survey
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Hendra Indra Firmawan (Group SDM Pelindo)"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Deskripsi Survey<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan tujuan kuesioner dan instruksi pengisian kepada responden..."
                    value={deskripsiSurvey}
                    onChange={(e) => setDeskripsiSurvey(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl leading-relaxed resize-none text-xs text-slate-800 focus:outline-none focus:border-[#016DB2]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                    <span>*Maksimal 300 karakter</span>
                    <span>{deskripsiSurvey.length}/300</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Banner / Gambar Header Survey</label>
                  <div className="border-2 border-dashed border-sky-200 hover:border-sky-400 rounded-2xl p-4 bg-sky-50/20 text-center flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#016DB2] flex items-center justify-center font-bold shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-800 text-xs">{gambarContentName}</div>
                        <div className="text-[10px] text-slate-400">Ukuran 1200 x 400px (Max 2MB)</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Pilih gambar banner baru...")}
                      className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition shadow-2xs shrink-0"
                    >
                      Ganti Gambar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 2: DAFTAR PERTANYAAN & JAWABAN (CRUD LENGKAP)
             =================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6">

              {/* Top Action Bar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">2. Kelola Daftar Pertanyaan &amp; Jawaban</h3>
                  <p className="text-slate-500 mt-0.5">
                    Total <b>{questions.length} Butir Pertanyaan</b>. Anda dapat menambah, mengedit teks, menentukan opsi jawaban, atau mengubah jenis soal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddNewQuestion}
                  className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pertanyaan Baru</span>
                </button>
              </div>

              {/* Questions List & Inline Form Editors */}
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const isEditing = editingQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      className={`bg-white rounded-2xl border transition shadow-xs overflow-hidden ${isEditing ? "border-[#016DB2] ring-2 ring-blue-500/10" : "border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      {/* Question Card Header */}
                      <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-xl bg-sky-100 text-[#016DB2] font-black text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-slate-800 text-xs line-clamp-1">
                              {q.questionText || `(Pertanyaan Baru #${idx + 1})`}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 flex-wrap">
                              <span className="font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {q.type}
                              </span>
                              {(q.type === "Pilihan Tunggal" || q.type === "Pilihan Ganda" || q.type === "Skala Rating") ? (
                                <span className="font-semibold text-[#016DB2] bg-sky-50 px-2 py-0.5 rounded border border-sky-200 flex items-center gap-1">
                                  {q.chartType === "Bar Chart" ? <BarChart3 className="w-2.5 h-2.5" /> : q.chartType === "Map Chart" ? <MapPin className="w-2.5 h-2.5" /> : q.chartType === "Table" ? <Table className="w-2.5 h-2.5" /> : <PieChart className="w-2.5 h-2.5" />}
                                  <span>Grafik: {q.chartType || "Pie Chart"}</span>
                                </span>
                              ) : (
                                <span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                                  <Table className="w-2.5 h-2.5" />
                                  <span>Format: Table</span>
                                </span>
                              )}
                              {q.required ? (
                                <span className="text-red-500 font-bold">*Wajib diisi</span>
                              ) : (
                                <span>Opsional</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quick Action Buttons per Question */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingQuestionId(isEditing ? null : q.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${isEditing ? "bg-[#016DB2] text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                              }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isEditing ? "Tutup Editor" : "Edit Soal & Jawaban"}</span>
                          </button>

                          <button
                            type="button"
                            title="Duplikat Soal"
                            onClick={() => handleDuplicateQuestion(q.id)}
                            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            title="Hapus Soal"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1.5 rounded-xl bg-white border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Question Editor Form (Expandable) */}
                      {isEditing && (
                        <div className="p-6 space-y-5 text-xs bg-white">

                          {/* Row 1: Teks Pertanyaan & Tipe Soal */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                              <label className="block font-bold text-slate-700 mb-1">
                                Teks Pertanyaan<span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Masukkan kalimat pertanyaan survey..."
                                value={q.questionText}
                                onChange={(e) => handleUpdateQuestion(q.id, { questionText: e.target.value })}
                                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#016DB2]"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Tipe Pertanyaan<span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <select
                                  value={q.type}
                                  onChange={(e) => {
                                    const nextType = e.target.value as any;
                                    let nextOpts = q.options;
                                    if ((nextType === "Pilihan Tunggal" || nextType === "Pilihan Ganda") && q.options.length === 0) {
                                      nextOpts = ["Pilihan 1", "Pilihan 2", "Pilihan 3"];
                                    }
                                    const isChoiceOrRating = nextType === "Pilihan Tunggal" || nextType === "Pilihan Ganda" || nextType === "Skala Rating";
                                    const defaultChart = isChoiceOrRating ? (q.chartType && q.chartType !== "Table" ? q.chartType : nextType === "Pilihan Ganda" ? "Bar Chart" : "Pie Chart") : "Table";
                                    const nextOptionPoints = q.optionPoints || (nextType === "Skala Rating" ? [5, 10, 15, 20, 25] : [25, 20, 15, 10, 5]);
                                    handleUpdateQuestion(q.id, { type: nextType, options: nextOpts, optionPoints: nextOptionPoints, chartType: defaultChart });
                                  }}
                                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 font-semibold text-slate-800 focus:outline-none focus:border-[#016DB2]"
                                >
                                  <option value="Pilihan Tunggal">Pilihan Tunggal (Radio)</option>
                                  <option value="Pilihan Ganda">Pilihan Ganda (Checkbox)</option>
                                  <option value="Isian Panjang">Isian Panjang (Textarea)</option>
                                  <option value="Isian Pendek">Isian Pendek (Input Text)</option>
                                  <option value="Skala Rating">Skala Rating (1 - 5)</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          {/* Row 2: Required Toggle */}
                          <div className="flex items-center gap-3 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                              <input
                                type="checkbox"
                                checked={q.required}
                                onChange={(e) => handleUpdateQuestion(q.id, { required: e.target.checked })}
                                className="w-4 h-4 rounded accent-[#016DB2]"
                              />
                              <span>Wajib Diisi (Mandatory Question)</span>
                            </label>
                          </div>

                          {/* Row: Pilihan Format Tampilan Hasil Evaluasi (Hanya untuk Radio, Checkbox, Skala Rating) */}
                          {(() => {
                            const supportsCharts = q.type === "Pilihan Tunggal" || q.type === "Pilihan Ganda" || q.type === "Skala Rating";

                            if (supportsCharts) {
                              return (
                                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <label className="block font-bold text-slate-700 text-xs">
                                      Tampilan Hasil Evaluasi (Visualisasi Grafik / Output Analitik) <span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      Pilih bentuk visualisasi data yang akan digenerate saat responden mengisi
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {[
                                      { type: "Pie Chart", label: "Pie Chart", desc: "Grafik Donut / Proporsi", icon: PieChart },
                                      { type: "Bar Chart", label: "Bar Chart", desc: "Grafik Batang Komparasi", icon: BarChart3 },
                                      { type: "Map Chart", label: "Map Chart", desc: "Grafik Peta Sebaran Wilayah", icon: MapPin },
                                      { type: "Table", label: "Table", desc: "Tabel Rekapitulasi Data", icon: Table }
                                    ].map((cOpt) => {
                                      const IconComp = cOpt.icon;
                                      const isSelected = (q.chartType || "Pie Chart") === cOpt.type;
                                      return (
                                        <button
                                          key={cOpt.type}
                                          type="button"
                                          onClick={() => handleUpdateQuestion(q.id, { chartType: cOpt.type as any })}
                                          className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition ${
                                            isSelected
                                              ? "border-[#016DB2] bg-sky-50/70 text-[#016DB2] ring-2 ring-blue-500/15 shadow-xs"
                                              : "border-slate-200 hover:bg-slate-50 text-slate-700 bg-white"
                                          }`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#016DB2] text-white" : "bg-slate-100 text-slate-500"}`}>
                                              <IconComp className="w-3.5 h-3.5" />
                                            </div>
                                            {isSelected && (
                                              <span className="w-2 h-2 rounded-full bg-[#016DB2]"></span>
                                            )}
                                          </div>
                                          <div>
                                            <div className="font-bold text-xs">{cOpt.label}</div>
                                            <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">{cOpt.desc}</div>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs pt-3 mt-2">
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <Table className="w-4 h-4 text-slate-400" />
                                    <span>
                                      Tampilan Hasil Evaluasi: <b>Format Tabel &amp; Transkrip Teks Responden</b>
                                    </span>
                                  </div>
                                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-500 font-semibold">
                                    Default Otomatis (Tipe {q.type})
                                  </span>
                                </div>
                              );
                            }
                          })()}

                          {/* Row 3: Opsi Jawaban (Khusus Pilihan Tunggal & Ganda) */}
                          {(q.type === "Pilihan Tunggal" || q.type === "Pilihan Ganda") && (
                            <div className="space-y-3 pt-3 border-t border-slate-100">
                              <div className="flex items-center justify-between">
                                <label className="font-bold text-slate-800 text-xs">
                                  Daftar Pilihan Jawaban ({q.options.length} Opsi)
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleAddOption(q.id)}
                                  className="text-xs font-bold text-[#016DB2] hover:underline flex items-center gap-1"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Tambah Pilihan Jawaban
                                </button>
                              </div>

                              <div className="space-y-2">
                                {q.options.map((opt, optIdx) => (
                                  <div key={optIdx} className="flex items-center gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                                      {q.type === "Pilihan Tunggal" ? (
                                        <CircleDot className="w-3.5 h-3.5 text-slate-400" />
                                      ) : (
                                        <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                                      )}
                                    </span>

                                    <input
                                      type="text"
                                      value={opt}
                                      onChange={(e) => handleUpdateOption(q.id, optIdx, e.target.value)}
                                      placeholder={`Pilihan ${optIdx + 1}`}
                                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#016DB2]"
                                    />

                                    {/* Inputan Poin / Bobot Nilai per Opsi Jawaban */}
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50/80 border border-sky-200 rounded-xl shrink-0">
                                      <Award className="w-3.5 h-3.5 text-[#016DB2]" />
                                      <span className="text-[11px] font-bold text-sky-800 whitespace-nowrap">Poin:</span>
                                      <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={q.optionPoints?.[optIdx] ?? (optIdx === 0 ? 25 : optIdx === 1 ? 20 : optIdx === 2 ? 15 : optIdx === 3 ? 10 : 5)}
                                        onChange={(e) => handleUpdateOptionPoint(q.id, optIdx, Number(e.target.value) || 0)}
                                        className="w-14 px-1.5 py-1 bg-white border border-sky-300 rounded-lg text-xs font-black text-slate-800 text-center focus:outline-none focus:border-[#016DB2]"
                                        placeholder="0"
                                      />
                                      <span className="text-[10px] font-bold text-sky-600">pt</span>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteOption(q.id, optIdx)}
                                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                                      title="Hapus Pilihan"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Preview untuk Isian Panjang & Pendek */}
                          {q.type === "Isian Panjang" && (
                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                              <span className="text-[11px] text-slate-400 font-medium">Tampilan untuk responden:</span>
                              <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-400 text-xs italic">
                                [Kotak teks isian jawaban uraian panjang akan tampil di sini...]
                              </div>
                            </div>
                          )}

                          {q.type === "Isian Pendek" && (
                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                              <span className="text-[11px] text-slate-400 font-medium">Tampilan untuk responden:</span>
                              <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 text-xs italic">
                                [Input baris tunggal pendek...]
                              </div>
                            </div>
                          )}

                          {q.type === "Skala Rating" && (
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                  <Award className="w-4 h-4 text-amber-500" /> Bobot Poin per Skala Rating (1 - 5 Bintang)
                                </span>
                                <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                  Otomatis Terkalkulasi ke Skor Responden
                                </span>
                              </div>
                              <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 4, 5].map((num) => {
                                  const defaultPts = [5, 10, 15, 20, 25];
                                  const curPt = q.optionPoints?.[num - 1] ?? defaultPts[num - 1];
                                  return (
                                    <div key={num} className="p-2.5 bg-white border border-slate-200 rounded-xl text-center space-y-1.5">
                                      <div className="text-xs font-bold text-slate-800">{num} ⭐</div>
                                      <div className="flex items-center justify-center gap-1">
                                        <input
                                          type="number"
                                          min={0}
                                          max={100}
                                          value={curPt}
                                          onChange={(e) => handleUpdateOptionPoint(q.id, num - 1, Number(e.target.value) || 0)}
                                          className="w-12 p-1 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-[#016DB2] focus:outline-none focus:bg-white"
                                        />
                                        <span className="text-[10px] font-semibold text-slate-400">pt</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Add Question Button */}
              <button
                type="button"
                onClick={handleAddNewQuestion}
                className="w-full py-3 border-2 border-dashed border-sky-300 hover:border-[#016DB2] hover:bg-sky-50/50 rounded-2xl text-[#016DB2] font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Butir Pertanyaan Lainnya</span>
              </button>

            </div>
          )}

          {/* ===================================================================
              STEP 3: TARGET RESPONDEN
             =================================================================== */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">3. Target Responden &amp; Segmentasi</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Tentukan pegawai, role, dan entitas yang berhak mengisi survey ini.</p>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">Langkah 3 dari 4</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Role / Otoritas Pegawai</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-2">
                    {roles.map((r, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-[#016DB2] border border-sky-200 rounded-lg text-xs font-bold shadow-2xs">
                        {r}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => showToast("Pilih role tambahan...")}
                      className="px-2.5 py-1 bg-sky-100 hover:bg-sky-200 text-[#016DB2] rounded-lg text-xs font-bold"
                    >
                      + Tambah Role
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Entitas Pelindo Target</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-2">
                    {entities.map((e, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-slate-800 border border-slate-200 rounded-lg text-xs font-medium">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Organisasi / Divisi</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-2">
                    {organizations.map((org, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-slate-800 border border-slate-200 rounded-lg text-xs font-medium">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 4: PENGATURAN PERIODE & PENGINGAT
             =================================================================== */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">4. Pengaturan Jadwal &amp; Pengingat</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Konfigurasi batas waktu penyelesaian dan blast pengingat otomatis.</p>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">Langkah 4 dari 4</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tanggal Mulai Pengisian<span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={tglMulai}
                      onChange={(e) => setTglMulai(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tanggal Batas Akhir (Deadline)<span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={tglSelesai}
                      onChange={(e) => setTglSelesai(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800 text-xs">Aktifkan Pengingat Otomatis (Blast Reminder)</div>
                      <div className="text-[11px] text-slate-400">Kirim notifikasi kepada responden yang belum menyelesaikan survey</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reminderActive}
                        onChange={(e) => setReminderActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016DB2]"></div>
                    </label>
                  </div>

                  {reminderActive && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Frekuensi Pengingat</label>
                        <select
                          value={reminderFreq}
                          onChange={(e) => setReminderFreq(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                        >
                          <option>Setiap 3 hari sekali</option>
                          <option>Setiap 5 hari sekali</option>
                          <option>H-3 sebelum deadline</option>
                          <option>H-1 sebelum deadline</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mulai Kirim Pengingat Sejak</label>
                        <input
                          type="date"
                          value={reminderStartDate}
                          onChange={(e) => setReminderStartDate(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={singleResponseOnly}
                      onChange={(e) => setSingleResponseOnly(e.target.checked)}
                      className="rounded accent-[#016DB2]"
                    />
                    <span>Batasi 1 Kali Pengisian per Responden (Single Response Only)</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={anonymousResponse}
                      onChange={(e) => setAnonymousResponse(e.target.checked)}
                      className="rounded accent-[#016DB2]"
                    />
                    <span>Kuesioner Anonim (Identitas NIPP dan Nama disamarkan dalam laporan)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => {
                if (currentStep > 1) setCurrentStep(currentStep - 1);
                else setCurrentView("list");
              }}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition shadow-xs"
            >
              {currentStep === 1 ? "Batal" : "Kembali"}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmDraft(true)}
                className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition shadow-xs"
              >
                {formMode === "create" ? "Simpan Draft" : "Update Draft"}
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-1"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmPublish(true)}
                  className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{formMode === "create" ? "Publish Survey" : "Simpan Perubahan"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DIALOGS & MODALS: PUBLISH & DRAFT CONFIRMATIONS
         ========================================================================= */}
      {showConfirmPublish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-xs space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">
                {formMode === "create" ? "Konfirmasi Pembuatan Survey" : "Konfirmasi Perubahan Survey"}
              </h3>
              <button onClick={() => setShowConfirmPublish(false)}><X className="w-4 h-4" /></button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {formMode === "create"
                ? "Apakah Anda yakin untuk mempublikasikan survey ini ke seluruh target responden?"
                : "Apakah Anda yakin ingin menyimpan seluruh perubahan pada survey dan butir pertanyaan ini?"}
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold">
              {judulSurvey || "Survey Port Experience 2026"}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowConfirmPublish(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
                Batal
              </button>
              <button onClick={handleExecutePublish} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold">
                {formMode === "create" ? "Ya, Publish" : "Ya, Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPublish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <h3 className="font-black text-base text-slate-900">
              {formMode === "create" ? "Sukses Publish Survey Ini" : "Perubahan Survey Berhasil Disimpan"}
            </h3>
            <p className="text-xs text-slate-400">Data survey dan seluruh pertanyaan telah diperbarui.</p>
          </div>
        </div>
      )}

      {showConfirmDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-xs space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">Konfirmasi Simpan Draft</h3>
              <button onClick={() => setShowConfirmDraft(false)}><X className="w-4 h-4" /></button>
            </div>
            <p className="text-slate-600">Apakah Anda yakin ingin menyimpan formulir survey ini sebagai Draft?</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowConfirmDraft(false)} className="px-4 py-2 border border-slate-200 rounded-xl">
                Batal
              </button>
              <button onClick={handleExecuteDraft} className="px-5 py-2 bg-[#016DB2] text-white rounded-xl font-bold">
                Ya, Simpan ke Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <h3 className="font-black text-base text-slate-900">Sukses Menyimpan ke Draft</h3>
            <p className="text-xs text-slate-400">Anda dapat melanjutkan penyusunan survey kapan saja.</p>
          </div>
        </div>
      )}

      {/* MODAL: KONFIRMASI HAPUS DATA ARSIP / DRAFT */}
      {surveyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-xs space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2 text-red-600">
                <Trash2 className="w-4 h-4" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  {surveyToDelete.status === "Diarsipkan" ? "Hapus Data Arsip Survey" : "Hapus Draft Survey"}
                </h3>
              </div>
              <button onClick={() => setSurveyToDelete(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {surveyToDelete.status === "Diarsipkan"
                ? "Apakah Anda yakin ingin menghapus data assessment ini dari arsip? Status survey akan otomatis dikembalikan ke status 'Selesai'."
                : "Apakah Anda yakin ingin menghapus draft assessment ini secara permanen? Data yang telah dihapus tidak dapat dipulihkan kembali."}
            </p>

            <div className="p-3 bg-red-50/60 border border-red-100 rounded-xl space-y-1">
              <div className="font-bold text-slate-900 line-clamp-1">{surveyToDelete.title}</div>
              <div className="text-[11px] text-slate-500">Status Saat Ini: <span className="font-semibold text-red-600">{surveyToDelete.status}</span> &bull; {surveyToDelete.periodText}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSurveyToDelete(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDeleteSurvey(surveyToDelete.id, surveyToDelete.status)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition shadow-sm shadow-red-600/20"
              >
                {surveyToDelete.status === "Diarsipkan" ? "Ya, Hapus dari Arsip" : "Ya, Hapus Permanen"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ANALITIK & GRAFIK RINGKASAN HASIL PER CARD SURVEI (POV ADMIN / CORPU)
         ========================================================================= */}
      {cardAnalyticsSurvey && (() => {
        const ana = getSurveyAnalytics(cardAnalyticsSurvey);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-sky-100 text-[#016DB2] border border-sky-200 flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-[#016DB2]" />
                      <span>Analitik &amp; Grafik Survei (Per-Card)</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                      cardAnalyticsSurvey.status === "Aktif"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : cardAnalyticsSurvey.status === "Selesai"
                          ? "bg-slate-100 text-slate-700 border border-slate-200"
                          : cardAnalyticsSurvey.status === "Diarsipkan"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-amber-50 text-amber-700 border border-amber-300"
                    }`}>
                      {cardAnalyticsSurvey.status}
                    </span>
                    {cardAnalyticsSurvey.category && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {cardAnalyticsSurvey.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-base md:text-lg text-slate-900 leading-snug">
                    {cardAnalyticsSurvey.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap">
                    <span>ID: {cardAnalyticsSurvey.id}</span>
                    <span>&bull;</span>
                    <span>Pembuat: {cardAnalyticsSurvey.creatorName}</span>
                    <span>&bull;</span>
                    <span>Periode: {cardAnalyticsSurvey.periodText}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCardAnalyticsSurvey(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-7 space-y-6 overflow-y-auto text-xs">
                
                {/* 4 Summary Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Total Responden</div>
                    <div className="text-2xl font-black text-slate-900">
                      {cardAnalyticsSurvey.respondCount}{" "}
                      <span className="text-xs font-normal text-slate-400">/ {cardAnalyticsSurvey.targetCount}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {cardAnalyticsSurvey.targetCount - cardAnalyticsSurvey.respondCount} Belum Mengisi
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Tingkat Respon</div>
                    <div className="text-2xl font-black text-[#016DB2]">
                      {cardAnalyticsSurvey.respondRate}%
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{cardAnalyticsSurvey.respondRate >= 80 ? "Sangat Optimal" : "Sedang Berjalan"}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Skor Rata-Rata Asesmen</div>
                    <div className="text-2xl font-black text-emerald-600 flex items-center gap-1.5">
                      <Award className="w-5 h-5 text-[#016DB2]" />
                      <span>{ana.averageScorePoints} <span className="text-xs font-normal text-slate-400">/ {ana.maxScorePoints} pt</span></span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">
                      Predikat {ana.scoreGrade} &bull; Indeks {ana.averageRating}/5.0
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Durasi Rata-Rata &amp; NPS</div>
                    <div className="text-2xl font-black text-slate-900">
                      {ana.completionAvgMinutes} <span className="text-xs font-normal text-slate-400">Mnt</span>
                    </div>
                    <div className="text-[10px] text-[#016DB2] font-semibold">
                      Net Promoter Score: +{ana.npsScore}
                    </div>
                  </div>
                </div>

                {/* 2 Interactive Visual Charts in Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Chart 1: Donut Chart Distribusi Respon (lg:col-span-6) */}
                  <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <PieChart className="w-4 h-4 text-[#016DB2]" />
                          <span>Grafik Distribusi Jawaban &amp; Kepuasan</span>
                        </h4>
                        <p className="text-[10px] text-slate-400">Sebaran respon berdasarkan tingkat kepuasan responden</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                      <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                        <svg className="w-36 h-36 transform -rotate-90">
                          <circle cx="72" cy="72" r="52" stroke="#F1F5F9" strokeWidth="16" fill="none" />
                          {(() => {
                            let cumulativePct = 0;
                            const circumference = 326.7;
                            return ana.satisfactionData.map((s, idx) => {
                              const offset = circumference - (circumference * (cumulativePct + s.pct)) / 100;
                              cumulativePct += s.pct;
                              return (
                                <circle
                                  key={idx}
                                  cx="72"
                                  cy="72"
                                  r="52"
                                  stroke={s.color}
                                  strokeWidth="16"
                                  fill="none"
                                  strokeDasharray={circumference}
                                  strokeDashoffset={offset}
                                  strokeLinecap="round"
                                />
                              );
                            });
                          })()}
                        </svg>
                        <div className="absolute text-center">
                          <div className="text-xl font-black text-slate-900">{cardAnalyticsSurvey.respondCount}</div>
                          <div className="text-[9px] text-slate-400 font-semibold uppercase">Responden</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs font-semibold text-slate-700 flex-1 w-full">
                        {ana.satisfactionData.map((s, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-2 text-[11px]">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }}></span>
                              <span className="truncate">{s.label}</span>
                              {s.point !== undefined && (
                                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100 shrink-0">
                                  +{s.point} Poin
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-slate-900 shrink-0">
                              {s.count} <span className="text-slate-400 font-normal">({s.pct}%)</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chart 2: Bar Chart Aspek / Indikator Evaluasi (lg:col-span-6) */}
                  <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <BarChart3 className="w-4 h-4 text-[#016DB2]" />
                          <span>Grafik Aspek / Parameter Evaluasi Utama</span>
                        </h4>
                        <p className="text-[10px] text-slate-400">Tingkat efektivitas per indikator pada survei ini</p>
                      </div>
                    </div>

                    <div className="space-y-3 py-1">
                      {ana.aspectData.map((asp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-semibold text-slate-700 truncate">{asp.label}</span>
                              {asp.pointWeight !== undefined && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                                  Bobot: {asp.pointWeight} pt
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-slate-900 shrink-0">{asp.countText}</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${asp.scorePct}%`, backgroundColor: asp.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Chart 3: Demografi Entitas Responden Pelindo */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#016DB2]" />
                        <span>Sebaran Responden Berdasarkan Entitas &amp; Subholding Pelindo</span>
                      </h4>
                      <p className="text-[10px] text-slate-400">Distribusi partisipasi karyawan di masing-masing lingkungan kerja</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {ana.demographicsData.map((demo, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-800 truncate">{demo.entity}</span>
                          <span className="text-xs font-black text-[#016DB2]">{demo.pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${demo.pct}%`, backgroundColor: demo.color }}
                          ></div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {demo.count} Pegawai Terdaftar
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Insights & AI/Corpu Recommendation */}
                <div className="bg-gradient-to-r from-amber-50/90 to-sky-50/80 p-5 rounded-2xl border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Ringkasan Kesimpulan &amp; Rekomendasi Corpu</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {ana.keyInsight}
                  </p>
                </div>

                {/* Top Qualitative Feedback Quotes */}
                {ana.topSuggestions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>Saran &amp; Catatan Masukan dari Responden Terpilih</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ana.topSuggestions.map((sug, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-1.5">
                          <div className="font-bold text-slate-900 text-[11px] flex items-center justify-between">
                            <span>{sug.user}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{sug.role}</span>
                          </div>
                          <p className="text-xs text-slate-600 italic leading-relaxed">
                            &quot;{sug.text}&quot;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-7 py-4 border-t border-slate-100 bg-slate-50/60">
                <button
                  type="button"
                  onClick={() => showToast(`Mengunduh berkas laporan analitik & grafik untuk "${cardAnalyticsSurvey.title}"...`)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Laporan (Excel &amp; PDF)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCardAnalyticsSurvey(null)}
                    className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                  >
                    Tutup
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const target = cardAnalyticsSurvey;
                      setCardAnalyticsSurvey(null);
                      handleViewResult(target);
                    }}
                    className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-blue-600/20 flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Halaman Analisis Penuh</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-5 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
