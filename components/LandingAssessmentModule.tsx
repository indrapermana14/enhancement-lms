"use client";

import React, { useState } from "react";
import { 
  ClipboardCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft, 
  Award, 
  Send, 
  FileText, 
  Star, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  Download, 
  X, 
  Check, 
  Building, 
  ShieldCheck, 
  Layers, 
  MessageSquare, 
  Lightbulb, 
  Rocket, 
  Search, 
  ChevronLeft, 
  Bell, 
  HelpCircle,
  GripVertical
} from "lucide-react";

interface AssignedAssessment {
  id: string;
  title: string;
  category: string;
  originModule: "KMS" | "LMS" | "TMS" | "IMS" | "PMS" | "CMS" | "EM";
  deadline: string;
  durationMinutes: number;
  totalQuestions: number;
  status: "Belum Dikerjakan" | "Sedang Dikerjakan" | "Selesai";
  progressPct: number;
  score?: number;
  assignedBy: string;
}

interface CalendarAgenda {
  id: string;
  typeCategory: "Pribadi" | "Komunitas";
  subCategory: "Jadwal Pelatihan" | "Agenda CoP" | "Tenggat Waktu";
  title: string;
  subtitle: string;
  dateStr: string;
  timeStr: string;
  speaker?: string;
  type: "Online" | "Offline" | "Mandatori Sistem";
  link?: string;
  description: string;
  badgeText?: string;
  isUrgent?: boolean;
}

const DEFAULT_CALENDAR_AGENDAS: CalendarAgenda[] = [
  // SENIN, 7 SEPTEMBER 2026 (Active Day)
  {
    id: "AGD-001",
    typeCategory: "Pribadi",
    subCategory: "Jadwal Pelatihan",
    title: "Workshop TOS Nusantara Digital Twin & Pelatihan Subholding",
    subtitle: "Corporate University Pelindo (LMS)",
    dateStr: "Senin, 7 September 2026",
    timeStr: "09:00 - 12:00 WIB",
    speaker: "DR. IR. BUDI SANTOSO, M.M.",
    type: "Online",
    link: "https://portaverse.pelindo.co.id/lms/course-tos-digital-twin",
    description: "Sesi pembelajaran mandiri dan simulasi interaktif modul strategi ketahanan rantai pasok maritim dan simulasi terminal petikemas nusantara.",
    badgeText: "Jadwal Pelatihan"
  },
  {
    id: "AGD-002",
    typeCategory: "Komunitas",
    subCategory: "Agenda CoP",
    title: "CoP Sharing Best Practice Terminal Operasional & Zero Accident",
    subtitle: "SPTP Safety & Operational Excellence",
    dateStr: "Senin, 7 September 2026",
    timeStr: "13:00 - 15:00 WIB",
    speaker: "AKBAR RAMADHAN",
    type: "Online",
    link: "https://linktr.ee/CoP2026",
    description: "Sharing session berkala komunitas praktisi terminal untuk update standard operating procedure (SOP) keselamatan kerja dan penanganan risiko insiden.",
    badgeText: "Agenda CoP"
  },
  {
    id: "AGD-003",
    typeCategory: "Pribadi",
    subCategory: "Tenggat Waktu",
    title: "Batas Akhir Pengisian Evaluasi Level 3 - Port Safety Maturity",
    subtitle: "Evaluasi Dampak Perilaku Pasca Pelatihan (Level 3 Kirkpatrick)",
    dateStr: "Senin, 7 September 2026",
    timeStr: "Batas Waktu: 23:59 WIB",
    speaker: "Biro Pengendalian Mutu Diklat (HO)",
    type: "Mandatori Sistem",
    link: "https://portaverse.pelindo.co.id/assessment/evaluasi-level-3",
    description: "Wajib diisi oleh seluruh alumni peserta pelatihan batch Agustus 2026 dan diverifikasi oleh atasan langsung untuk mengukur penerapan perilaku K3 di lapangan pasca program diklat.",
    badgeText: "Tenggat Waktu Evaluasi Level 3",
    isUrgent: true
  },

  // KAMIS, 10 SEPTEMBER 2026
  {
    id: "AGD-004",
    typeCategory: "Pribadi",
    subCategory: "Jadwal Pelatihan",
    title: "Pelatihan Transformasi Digital & Automasi Container Crane",
    subtitle: "LMS - Technical Port Operations",
    dateStr: "Kamis, 10 September 2026",
    timeStr: "08:30 - 11:30 WIB",
    speaker: "Tim Automasi Terminal Petikemas",
    type: "Online",
    link: "https://portaverse.pelindo.co.id/lms/crane-automation",
    description: "Program peningkatan kompetensi teknis pengoperasian Container Crane otomatis dan integrasi sistem teleoperation.",
    badgeText: "Jadwal Pelatihan"
  },
  {
    id: "AGD-005",
    typeCategory: "Pribadi",
    subCategory: "Tenggat Waktu",
    title: "Batas Akhir Pengisian Evaluasi Level 3 - Leadership AKHLAK Pelindo",
    subtitle: "Evaluasi Pasca Diklat Core Values & Culture",
    dateStr: "Kamis, 10 September 2026",
    timeStr: "Batas Waktu: 23:59 WIB",
    speaker: "Corporate University Pelindo (HO)",
    type: "Mandatori Sistem",
    description: "Batas pengisian form evaluasi perubahan perilaku kerja kepemimpinan oleh atasan langsung dan self-assessment pasca pelatihan.",
    badgeText: "Tenggat Waktu Evaluasi Level 3",
    isUrgent: true
  },

  // SELASA, 15 SEPTEMBER 2026
  {
    id: "AGD-006",
    typeCategory: "Komunitas",
    subCategory: "Agenda CoP",
    title: "CoP Digital Innovation & Port Security Level 3",
    subtitle: "IMS Cyber & Physical Port Security",
    dateStr: "Selasa, 15 September 2026",
    timeStr: "10:00 - 12:00 WIB",
    speaker: "RAHMAT HIDAYAT, S.KOM.",
    type: "Online",
    link: "https://linktr.ee/CoP-Security2026",
    description: "Diskusi implementasi standard ISPS Code dan mitigasi celah keamanan siber pada infrastruktur smart port pelabuhan.",
    badgeText: "Agenda CoP"
  },
  {
    id: "AGD-007",
    typeCategory: "Pribadi",
    subCategory: "Tenggat Waktu",
    title: "Deadline Kuesioner Evaluasi Pasca Pelatihan & Survey KPI Q3",
    subtitle: "Divisi Transformasi & Human Capital",
    dateStr: "Selasa, 15 September 2026",
    timeStr: "Batas Waktu: 17:00 WIB",
    speaker: "Divisi SDM Subholding SPTP",
    type: "Mandatori Sistem",
    description: "Pengisian evaluasi kepuasan peserta, penguasaan materi, dan dampak pengisian indikator KPI baru.",
    badgeText: "Tenggat Waktu",
    isUrgent: true
  },

  // RABU, 16 SEPTEMBER 2026
  {
    id: "AGD-008",
    typeCategory: "Pribadi",
    subCategory: "Jadwal Pelatihan",
    title: "Pelatihan Port Equipment Reliability & Predictive Maintenance",
    subtitle: "LMS Special Engineering Program",
    dateStr: "Rabu, 16 September 2026",
    timeStr: "09:00 - 12:00 WIB",
    speaker: "ENG. SURYADI, S.T., M.T.",
    type: "Online",
    link: "https://portaverse.pelindo.co.id/lms/port-reliability",
    description: "Peningkatan kapabilitas pemeliharaan prediktif berbasis IoT sensor pada peralatan utama dermaga (STS & RTG).",
    badgeText: "Jadwal Pelatihan"
  },
  {
    id: "AGD-009",
    typeCategory: "Pribadi",
    subCategory: "Jadwal Pelatihan",
    title: "Uji Pemahaman SOP Knowledge Sharing & Repository Management Pelindo",
    subtitle: "Divisi Transformasi & KMS Pelindo",
    dateStr: "Rabu, 16 September 2026",
    timeStr: "13:30 - 15:30 WIB",
    speaker: "Tim KMS Corpu",
    type: "Online",
    link: "https://portaverse.pelindo.co.id/kms/sharing-hub",
    description: "Pelatihan tata kelola sharing knowledge dan pengunggahan best practice dokumen di portal KMS.",
    badgeText: "Jadwal Pelatihan"
  },

  // SENIN, 21 SEPTEMBER 2026
  {
    id: "AGD-010",
    typeCategory: "Pribadi",
    subCategory: "Jadwal Pelatihan",
    title: "Pelatihan K3 Pelabuhan & Safety Leadership Level 2",
    subtitle: "IMS Safety Culture Maturity",
    dateStr: "Senin, 21 September 2026",
    timeStr: "09:00 - 12:00 WIB",
    speaker: "Safety Officer SPTP",
    type: "Offline",
    description: "Pelatihan tatap muka keselamatan operasional di area terminal petikemas dan sertifikasi internal K3.",
    badgeText: "Jadwal Pelatihan"
  },
  {
    id: "AGD-011",
    typeCategory: "Komunitas",
    subCategory: "Agenda CoP",
    title: "CoP Green Port & Decarbonization Maritime 2026",
    subtitle: "Komunitas Green Energy Pelindo",
    dateStr: "Senin, 21 September 2026",
    timeStr: "13:30 - 15:30 WIB",
    speaker: "AKBAR RAMADHAN & TIM ESG",
    type: "Online",
    link: "https://linktr.ee/CoP-GreenPort",
    description: "Kolaborasi aksi dekarbonisasi terminal pelabuhan, shore connection, dan program efisiensi konsumsi daya listrik alat.",
    badgeText: "Agenda CoP"
  },
  {
    id: "AGD-012",
    typeCategory: "Pribadi",
    subCategory: "Tenggat Waktu",
    title: "Batas Akhir Pengisian Evaluasi Level 3 - Port Operational Readiness",
    subtitle: "Evaluasi Transformasi Terminal Operasional (Lean & Agile)",
    dateStr: "Senin, 21 September 2026",
    timeStr: "Batas Waktu: 23:59 WIB",
    speaker: "Corporate University Pelindo (HO)",
    type: "Mandatori Sistem",
    description: "Pengisian form evaluasi Level 3 Kirkpatrick untuk memvalidasi perubahan perilaku kerja operasional di dermaga dan lapangan penumpukan.",
    badgeText: "Tenggat Waktu Evaluasi Level 3",
    isUrgent: true
  },

  // KAMIS, 24 SEPTEMBER 2026
  {
    id: "AGD-013",
    typeCategory: "Komunitas",
    subCategory: "Agenda CoP",
    title: "CoP Maritime Logistics Hub & Port Automation Transformation",
    subtitle: "SPTP Innovation Chapter",
    dateStr: "Kamis, 24 September 2026",
    timeStr: "14:00 - 16:00 WIB",
    speaker: "Tim Digital Solution Pelindo",
    type: "Online",
    link: "https://linktr.ee/CoP-LogisticsHub",
    description: "Pembahasan integrasi TOS Nusantara dengan sistem logistik hinterland dan monitoring tracking kontainer secara real-time.",
    badgeText: "Agenda CoP"
  },

  // SENIN, 27 JULI 2026 & MINGGU, 27 SEPTEMBER 2026
  {
    id: "AGD-014",
    typeCategory: "Komunitas",
    subCategory: "Agenda CoP",
    title: "COP Update Mekanisme Pelaporan Kecelakaan Kerja",
    subtitle: "SPTP Safety Transformation",
    dateStr: "Senin, 27 Juli 2026",
    timeStr: "09:00 - 11:00 WIB",
    speaker: "AKBAR RAMADHAN",
    type: "Online",
    link: "https://linktr.ee/CoP2026",
    description: "Sosialisasi alur pelaporan insiden darurat dan integrasi sistem digital incident report di seluruh wilayah subholding SPTP.",
    badgeText: "Agenda CoP"
  },
  {
    id: "AGD-015",
    typeCategory: "Pribadi",
    subCategory: "Tenggat Waktu",
    title: "Batas Akhir Pengisian Evaluasi Level 3 - Safety Transformation SPTP",
    subtitle: "Evaluasi Pasca Pelatihan K3 & Lingkungan Pelabuhan",
    dateStr: "Senin, 27 Juli 2026",
    timeStr: "Batas Waktu: 23:59 WIB",
    speaker: "Direktorat SDM & Umum SPTP",
    type: "Mandatori Sistem",
    description: "Batas akhir pengisian instrumen evaluasi implementasi perilaku Level 3 pasca pelatihan keselamatan kerja di pelabuhan.",
    badgeText: "Tenggat Waktu Evaluasi Level 3",
    isUrgent: true
  },

  // KAMIS, 1 OKTOBER 2026
  {
    id: "AGD-016",
    typeCategory: "Pribadi",
    subCategory: "Tenggat Waktu",
    title: "Batas Akhir Pengisian Evaluasi Level 3 - Q3 Competency Review",
    subtitle: "Corporate University Pelindo Mandatori",
    dateStr: "Kamis, 1 Oktober 2026",
    timeStr: "Batas Waktu: 23:59 WIB",
    speaker: "Corpu Pelindo Mandatori",
    type: "Mandatori Sistem",
    description: "Batas akhir evaluasi implementasi seluruh program pelatihan triwulan 3 tahun 2026.",
    badgeText: "Tenggat Waktu Evaluasi Level 3",
    isUrgent: true
  }
];

export default function LandingAssessmentModule() {
  // Flow Stages:
  // 1. "popup_prompt": Landing page with Survey Popup modal (Screenshot 16.55.36)
  // 2. "filling_form": Full Questionnaire Form (Screenshot 16.55.53)
  // 3. "completed_dashboard": Assessment list & completion dashboard (Screenshot 16.54.13)
  const [landingStage, setLandingStage] = useState<"popup_prompt" | "filling_form" | "completed_dashboard">("popup_prompt");
  const [showSurveyModal, setShowSurveyModal] = useState(true);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>("Semua Modul");

  // Agendas State
  const [agendasList, setAgendasList] = useState<CalendarAgenda[]>(DEFAULT_CALENDAR_AGENDAS);

  // Calendar Detail Modal State (Tabs: "Pribadi" vs "Komunitas")
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
  const [selectedModalTab, setSelectedModalTab] = useState<"Pribadi" | "Komunitas">("Komunitas");

  // Buat Agenda Form Modal State
  const [showCreateAgendaModal, setShowCreateAgendaModal] = useState(false);
  const [agendaName, setAgendaName] = useState("");
  const [agendaCategory, setAgendaCategory] = useState<"Pribadi" | "Komunitas">("Pribadi");
  const [agendaSubCategory, setAgendaSubCategory] = useState<"Jadwal Pelatihan" | "Agenda CoP" | "Tenggat Waktu">("Jadwal Pelatihan");
  const [agendaStartDate, setAgendaStartDate] = useState("2026-09-07");
  const [agendaStartTime, setAgendaStartTime] = useState("09:00");
  const [agendaEndTime, setAgendaEndTime] = useState("11:00");
  const [agendaWorkerSearch, setAgendaWorkerSearch] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>(["Kahfiarsyad Julyan Elevenday", "Akbar Ramadhan"]);
  const [agendaType, setAgendaType] = useState<"Offline" | "Online">("Online");
  const [agendaDescription, setAgendaDescription] = useState("");
  
  // Calendar Month State & Data
  const [calendarMonthIndex, setCalendarMonthIndex] = useState(2); // 0: Juli, 1: Agustus, 2: September, 3: Oktober
  const monthsData = [
    {
      name: "Juli 2026",
      days: [
        { day: 29, sub: "Jun", isMuted: true, dateStr: "Senin, 29 Juni 2026" },
        { day: 30, sub: "Jun", isMuted: true, dateStr: "Selasa, 30 Juni 2026" },
        { day: 1, dateStr: "Rabu, 1 Juli 2026" },
        { day: 2, dateStr: "Kamis, 2 Juli 2026" },
        { day: 3, dateStr: "Jumat, 3 Juli 2026" },
        { day: 4, dateStr: "Sabtu, 4 Juli 2026" },
        { day: 5, dateStr: "Minggu, 5 Juli 2026" },
        { day: 6, dateStr: "Senin, 6 Juli 2026" },
        { day: 7, dateStr: "Selasa, 7 Juli 2026" },
        { day: 8, dateStr: "Rabu, 8 Juli 2026" },
        { day: 9, dateStr: "Kamis, 9 Juli 2026" },
        { day: 10, dateStr: "Jumat, 10 Juli 2026", pribadi: 1, komunitas: 0 },
        { day: 11, dateStr: "Sabtu, 11 Juli 2026" },
        { day: 12, dateStr: "Minggu, 12 Juli 2026" },
        { day: 13, dateStr: "Senin, 13 Juli 2026" },
        { day: 14, dateStr: "Selasa, 14 Juli 2026" },
        { day: 15, dateStr: "Rabu, 15 Juli 2026", pribadi: 0, komunitas: 1 },
        { day: 16, dateStr: "Kamis, 16 Juli 2026" },
        { day: 17, dateStr: "Jumat, 17 Juli 2026" },
        { day: 18, dateStr: "Sabtu, 18 Juli 2026" },
        { day: 19, dateStr: "Minggu, 19 Juli 2026" },
        { day: 20, dateStr: "Senin, 20 Juli 2026" },
        { day: 21, dateStr: "Selasa, 21 Juli 2026" },
        { day: 22, dateStr: "Rabu, 22 Juli 2026" },
        { day: 23, dateStr: "Kamis, 23 Juli 2026" },
        { day: 24, dateStr: "Jumat, 24 Juli 2026" },
        { day: 25, dateStr: "Sabtu, 25 Juli 2026" },
        { day: 26, dateStr: "Minggu, 26 Juli 2026" },
        { day: 27, sub: "Jul", dateStr: "Senin, 27 Juli 2026", pribadi: 0, komunitas: 1 },
        { day: 28, sub: "Jul", dateStr: "Selasa, 28 Juli 2026", pribadi: 1, komunitas: 0 },
        { day: 29, sub: "Jul", dateStr: "Rabu, 29 Juli 2026" },
        { day: 30, sub: "Jul", dateStr: "Kamis, 30 Juli 2026" },
        { day: 31, sub: "Jul", dateStr: "Jumat, 31 Juli 2026" },
        { day: 1, sub: "Agt", isMuted: true, dateStr: "Sabtu, 1 Agustus 2026" },
        { day: 2, sub: "Agt", isMuted: true, dateStr: "Minggu, 2 Agustus 2026" },
      ]
    },
    {
      name: "Agustus 2026",
      days: [
        { day: 27, sub: "Jul", isMuted: true, dateStr: "Senin, 27 Juli 2026", pribadi: 0, komunitas: 1 },
        { day: 28, sub: "Jul", isMuted: true, dateStr: "Selasa, 28 Juli 2026" },
        { day: 29, sub: "Jul", isMuted: true, dateStr: "Rabu, 29 Juli 2026" },
        { day: 30, sub: "Jul", isMuted: true, dateStr: "Kamis, 30 Juli 2026" },
        { day: 31, sub: "Jul", isMuted: true, dateStr: "Jumat, 31 Juli 2026" },
        { day: 1, dateStr: "Sabtu, 1 Agustus 2026" },
        { day: 2, dateStr: "Minggu, 2 Agustus 2026" },
        { day: 3, dateStr: "Senin, 3 Agustus 2026" },
        { day: 4, dateStr: "Selasa, 4 Agustus 2026" },
        { day: 5, dateStr: "Rabu, 5 Agustus 2026" },
        { day: 6, dateStr: "Kamis, 6 Agustus 2026" },
        { day: 7, dateStr: "Jumat, 7 Agustus 2026" },
        { day: 8, dateStr: "Sabtu, 8 Agustus 2026" },
        { day: 9, dateStr: "Minggu, 9 Agustus 2026" },
        { day: 10, dateStr: "Senin, 10 Agustus 2026" },
        { day: 11, dateStr: "Selasa, 11 Agustus 2026" },
        { day: 12, dateStr: "Rabu, 12 Agustus 2026", pribadi: 1, komunitas: 1 },
        { day: 13, dateStr: "Kamis, 13 Agustus 2026" },
        { day: 14, dateStr: "Jumat, 14 Agustus 2026" },
        { day: 15, dateStr: "Sabtu, 15 Agustus 2026" },
        { day: 16, dateStr: "Minggu, 16 Agustus 2026" },
        { day: 17, dateStr: "Senin, 17 Agustus 2026", sub: "HUT RI", pribadi: 0, komunitas: 0 },
        { day: 18, dateStr: "Selasa, 18 Agustus 2026" },
        { day: 19, dateStr: "Rabu, 19 Agustus 2026" },
        { day: 20, dateStr: "Kamis, 20 Agustus 2026" },
        { day: 21, dateStr: "Jumat, 21 Agustus 2026" },
        { day: 22, dateStr: "Sabtu, 22 Agustus 2026" },
        { day: 23, dateStr: "Minggu, 23 Agustus 2026" },
        { day: 24, dateStr: "Senin, 24 Agustus 2026" },
        { day: 25, dateStr: "Selasa, 25 Agustus 2026", pribadi: 0, komunitas: 1 },
        { day: 26, dateStr: "Rabu, 26 Agustus 2026" },
        { day: 27, dateStr: "Kamis, 27 Agustus 2026" },
        { day: 28, dateStr: "Jumat, 28 Agustus 2026" },
        { day: 29, dateStr: "Sabtu, 29 Agustus 2026" },
        { day: 30, dateStr: "Minggu, 30 Agustus 2026" },
      ]
    },
    {
      name: "September 2026",
      days: [
        { day: 31, sub: "Agt", isMuted: true, dateStr: "Senin, 31 Agustus 2026" },
        { day: 1, dateStr: "Selasa, 1 September 2026" },
        { day: 2, dateStr: "Rabu, 2 September 2026" },
        { day: 3, dateStr: "Kamis, 3 September 2026" },
        { day: 4, dateStr: "Jumat, 4 September 2026" },
        { day: 5, dateStr: "Sabtu, 5 September 2026" },
        { day: 6, dateStr: "Minggu, 6 September 2026" },
        { day: 7, isActive: true, dateStr: "Senin, 7 September 2026", pribadi: 2, komunitas: 1 },
        { day: 8, dateStr: "Selasa, 8 September 2026" },
        { day: 9, dateStr: "Rabu, 9 September 2026" },
        { day: 10, dateStr: "Kamis, 10 September 2026", pribadi: 2, komunitas: 0 },
        { day: 11, dateStr: "Jumat, 11 September 2026" },
        { day: 12, dateStr: "Sabtu, 12 September 2026" },
        { day: 13, dateStr: "Minggu, 13 September 2026" },
        { day: 14, dateStr: "Senin, 14 September 2026" },
        { day: 15, dateStr: "Selasa, 15 September 2026", pribadi: 1, komunitas: 1 },
        { day: 16, dateStr: "Rabu, 16 September 2026", pribadi: 2, komunitas: 0 },
        { day: 17, dateStr: "Kamis, 17 September 2026" },
        { day: 18, dateStr: "Jumat, 18 September 2026" },
        { day: 19, dateStr: "Sabtu, 19 September 2026" },
        { day: 20, dateStr: "Minggu, 20 September 2026" },
        { day: 21, dateStr: "Senin, 21 September 2026", pribadi: 2, komunitas: 1 },
        { day: 22, dateStr: "Selasa, 22 September 2026" },
        { day: 23, dateStr: "Rabu, 23 September 2026" },
        { day: 24, dateStr: "Kamis, 24 September 2026", pribadi: 0, komunitas: 1 },
        { day: 25, dateStr: "Jumat, 25 September 2026" },
        { day: 26, dateStr: "Sabtu, 26 September 2026" },
        { day: 27, dateStr: "Minggu, 27 September 2026", sub: "Jul", pribadi: 1, komunitas: 1 },
        { day: 28, dateStr: "Senin, 28 September 2026" },
        { day: 29, dateStr: "Selasa, 29 September 2026" },
        { day: 30, dateStr: "Rabu, 30 September 2026" },
        { day: 1, sub: "Okt", isMuted: true, dateStr: "Kamis, 1 Oktober 2026", pribadi: 1, komunitas: 0 },
        { day: 2, sub: "Okt", isMuted: true, dateStr: "Jumat, 2 Oktober 2026" },
        { day: 3, sub: "Okt", isMuted: true, dateStr: "Sabtu, 3 Oktober 2026" },
        { day: 4, sub: "Okt", isMuted: true, dateStr: "Minggu, 4 Oktober 2026" },
      ]
    },
    {
      name: "Oktober 2026",
      days: [
        { day: 28, sub: "Sep", isMuted: true, dateStr: "Senin, 28 September 2026" },
        { day: 29, sub: "Sep", isMuted: true, dateStr: "Selasa, 29 September 2026" },
        { day: 30, sub: "Sep", isMuted: true, dateStr: "Rabu, 30 September 2026" },
        { day: 1, dateStr: "Kamis, 1 Oktober 2026", pribadi: 1, komunitas: 0 },
        { day: 2, dateStr: "Jumat, 2 Oktober 2026" },
        { day: 3, dateStr: "Sabtu, 3 Oktober 2026" },
        { day: 4, dateStr: "Minggu, 4 Oktober 2026" },
        { day: 5, dateStr: "Senin, 5 Oktober 2026", pribadi: 1, komunitas: 0 },
        { day: 6, dateStr: "Selasa, 6 Oktober 2026" },
        { day: 7, dateStr: "Rabu, 7 Oktober 2026" },
        { day: 8, dateStr: "Kamis, 8 Oktober 2026" },
        { day: 9, dateStr: "Jumat, 9 Oktober 2026" },
        { day: 10, dateStr: "Sabtu, 10 Oktober 2026" },
        { day: 11, dateStr: "Minggu, 11 Oktober 2026" },
        { day: 12, dateStr: "Senin, 12 Oktober 2026" },
        { day: 13, dateStr: "Selasa, 13 Oktober 2026" },
        { day: 14, dateStr: "Rabu, 14 Oktober 2026", pribadi: 0, komunitas: 1 },
        { day: 15, dateStr: "Kamis, 15 Oktober 2026" },
        { day: 16, dateStr: "Jumat, 16 Oktober 2026" },
        { day: 17, dateStr: "Sabtu, 17 Oktober 2026" },
        { day: 18, dateStr: "Minggu, 18 Oktober 2026" },
        { day: 19, dateStr: "Senin, 19 Oktober 2026" },
        { day: 20, dateStr: "Selasa, 20 Oktober 2026" },
        { day: 21, dateStr: "Rabu, 21 Oktober 2026" },
        { day: 22, dateStr: "Kamis, 22 Oktober 2026" },
        { day: 23, dateStr: "Jumat, 23 Oktober 2026" },
        { day: 24, dateStr: "Sabtu, 24 Oktober 2026" },
        { day: 25, dateStr: "Minggu, 25 Oktober 2026" },
        { day: 26, dateStr: "Senin, 26 Oktober 2026" },
        { day: 27, dateStr: "Selasa, 27 Oktober 2026", pribadi: 2, komunitas: 1 },
        { day: 28, dateStr: "Rabu, 28 Oktober 2026" },
        { day: 29, dateStr: "Kamis, 29 Oktober 2026" },
        { day: 30, dateStr: "Jumat, 30 Oktober 2026" },
        { day: 31, dateStr: "Sabtu, 31 Oktober 2026" },
        { day: 1, sub: "Nov", isMuted: true, dateStr: "Minggu, 1 November 2026" },
      ]
    }
  ];

  const currentMonth = monthsData[calendarMonthIndex];
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDateClick = (dateStr: string, defaultTab: "Pribadi" | "Komunitas" = "Komunitas") => {
    setSelectedCalendarDate(dateStr);
    setSelectedModalTab(defaultTab);
  };

  const handlePrevMonth = () => {
    setCalendarMonthIndex((prev) => (prev > 0 ? prev - 1 : monthsData.length - 1));
  };

  const handleNextMonth = () => {
    setCalendarMonthIndex((prev) => (prev < monthsData.length - 1 ? prev + 1 : 0));
  };

  const handleCreateAgendaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgenda: CalendarAgenda = {
      id: `AGD-${Date.now().toString().slice(-4)}`,
      typeCategory: agendaCategory,
      subCategory: agendaSubCategory,
      title: agendaName || "Agenda Baru",
      subtitle: agendaSubCategory === "Tenggat Waktu" 
        ? "Evaluasi Dampak Perilaku Pasca Pelatihan (Level 3 Kirkpatrick)" 
        : agendaSubCategory === "Agenda CoP" 
        ? "SPTP Community of Practice Chapter" 
        : "Corporate University Pelindo (LMS)",
      dateStr: agendaStartDate,
      timeStr: `${agendaStartTime} - ${agendaEndTime} WIB`,
      speaker: selectedWorkers.join(", "),
      type: agendaType,
      description: agendaDescription || "Agenda baru yang dibuat pengguna.",
      badgeText: agendaSubCategory === "Tenggat Waktu" ? "Tenggat Waktu Evaluasi Level 3" : agendaSubCategory === "Agenda CoP" ? "Agenda CoP" : "Jadwal Pelatihan",
      isUrgent: agendaSubCategory === "Tenggat Waktu"
    };

    setAgendasList(prev => [newAgenda, ...prev]);
    setShowCreateAgendaModal(false);
    showToast(`Agenda "${agendaName || 'Agenda Baru'}" (${agendaCategory === 'Pribadi' ? 'Agenda Pribadi' : 'Agenda Komunitas'}) berhasil ditambahkan ke kalender!`);
    setAgendaName("");
    setAgendaDescription("");
  };

  // Form Answers State (Screenshot 16.55.53)
  const [ansQ1, setAnsQ1] = useState<string>("Sangat Baik");
  const [ansQ2, setAnsQ2] = useState<string>("Bagian Header");
  const [ansQ3, setAnsQ3] = useState<string>("Akan lebih baik jika tersedia buku panduan atau video tutorial yang menjelaskan langkah-langkah pengisian KPI secara lengkap dan mudah dipahami.");
  const [ansQ4, setAnsQ4] = useState<string>("Sulit memahami indikator KPI yang digunakan");
  const [ansQ5, setAnsQ5] = useState<string[]>(["Melihat KPI Saya"]);

  // Completed Assessments List for Stage 3 (Screenshot 16.54.13) with Modules KMS, LMS, TMS, IMS, PMS, CMS, EM
  const [assignedList] = useState<AssignedAssessment[]>([
    {
      id: "ASM-001",
      title: "Evaluasi Kompetensi Kepemimpinan & Budaya AKHLAK Pelindo 2026",
      category: "Core Values AKHLAK",
      originModule: "LMS",
      deadline: "15 September 2026",
      durationMinutes: 20,
      totalQuestions: 6,
      status: "Selesai",
      progressPct: 100,
      score: 93,
      assignedBy: "Corporate University Pelindo (HO)"
    },
    {
      id: "ASM-002",
      title: "Asesmen Kesiapan Transformasi Operasional Terminal (Lean & Agile)",
      category: "Operasional Maritim",
      originModule: "TMS",
      deadline: "20 September 2026",
      durationMinutes: 25,
      totalQuestions: 6,
      status: "Selesai",
      progressPct: 100,
      score: 93,
      assignedBy: "Divisi SDM Subholding SPTP"
    },
    {
      id: "ASM-003",
      title: "Port Safety Compliance & Safety Culture Maturity Level 3",
      category: "K3 & Lingkungan Pelabuhan",
      originModule: "IMS",
      deadline: "31 Agustus 2026",
      durationMinutes: 15,
      totalQuestions: 6,
      status: "Selesai",
      progressPct: 100,
      score: 94,
      assignedBy: "Direktorat SDM & Umum"
    },
    {
      id: "ASM-004",
      title: "Uji Pemahaman SOP Knowledge Sharing & Repository Pelindo",
      category: "Knowledge Management",
      originModule: "KMS",
      deadline: "25 September 2026",
      durationMinutes: 15,
      totalQuestions: 8,
      status: "Selesai",
      progressPct: 100,
      score: 90,
      assignedBy: "Divisi Transformasi & KMS Pelindo"
    },
    {
      id: "ASM-005",
      title: "Evaluasi Kinerja Port Equipment Maintenance & KPI Q3",
      category: "Performance Review",
      originModule: "PMS",
      deadline: "28 September 2026",
      durationMinutes: 30,
      totalQuestions: 10,
      status: "Selesai",
      progressPct: 100,
      score: 95,
      assignedBy: "Biro Perencanaan Kinerja (HO)"
    },
    {
      id: "ASM-006",
      title: "Asesmen Kepatuhan Vendor & Manajemen Kontrak Pelabuhan",
      category: "Vendor Governance",
      originModule: "CMS",
      deadline: "30 September 2026",
      durationMinutes: 20,
      totalQuestions: 6,
      status: "Selesai",
      progressPct: 100,
      score: 92,
      assignedBy: "Divisi Pengadaan & CMS Pelindo"
    },
    {
      id: "ASM-007",
      title: "Survey New KPI Experience & Onboarding Pegawai Baru",
      category: "Employee Engagement",
      originModule: "EM",
      deadline: "18 Oktober 2026",
      durationMinutes: 10,
      totalQuestions: 5,
      status: "Selesai",
      progressPct: 100,
      score: 96,
      assignedBy: "Divisi Human Capital (EM)"
    }
  ]);

  // Handler Submit Survey Form
  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to Screenshot 16.54.13 page
    setLandingStage("completed_dashboard");
  };

  return (
    <div className="space-y-6 font-sans">

      {/* =========================================================================
          STAGE 1: LANDING PAGE WITH SURVEY POPUP (SCREENSHOT 16.55.36)
         ========================================================================= */}
      {landingStage === "popup_prompt" && (
        <div className="relative min-h-[82vh] space-y-6">
          
          {/* Landing Background Portal UI */}
          <div className={`space-y-8 transition-all duration-300 ${showSurveyModal ? "opacity-35 pointer-events-none filter blur-[0.6px]" : "opacity-100"}`}>
            
            {/* Greeting Header */}
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Selamat Datang Kembali, <span className="text-[#016DB2]">Kahfiarsyad Julyan Elevenday</span>!
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                Menghubungkan BUMN 1 Pelabuhan Bersama Portaverse
              </p>
            </div>

            {/* Main 2-Column Grid (Left: Harbor Illustration, Right: Profile & Calendar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Isometric Harbor Illustration */}
              <div className="lg:col-span-6 flex items-center justify-center py-4 relative">
                <div className="w-full max-w-lg aspect-square bg-gradient-to-b from-sky-50/50 to-slate-50/80 rounded-3xl border border-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
                  {/* High Quality Isometric Port SVG Illustration */}
                  <svg viewBox="0 0 500 420" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ocean Base Island */}
                    <ellipse cx="250" cy="270" rx="200" ry="110" fill="#38BDF8" fillOpacity="0.25" />
                    <ellipse cx="250" cy="270" rx="180" ry="95" fill="#0284C7" fillOpacity="0.35" />
                    <ellipse cx="250" cy="265" rx="160" ry="80" fill="#E2E8F0" />
                    
                    {/* Pier / Dock Platform */}
                    <path d="M120 260 L250 325 L380 260 L250 195 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
                    <path d="M120 260 L120 275 L250 340 L250 325 Z" fill="#94A3B8" />
                    <path d="M250 325 L250 340 L380 275 L380 260 Z" fill="#64748B" />

                    {/* Dock Railings */}
                    <path d="M130 255 L250 315 L370 255" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />

                    {/* Ship 1 (Left Cargo Vessel) */}
                    <g transform="translate(40, 20)">
                      {/* Ship Hull */}
                      <path d="M80 200 L180 250 L170 270 L60 215 Z" fill="#334155" />
                      <path d="M60 215 L170 270 L160 280 L50 225 Z" fill="#0F172A" />
                      {/* Ship Deck Cabin */}
                      <path d="M120 210 L160 230 L160 205 L120 185 Z" fill="#F1F5F9" />
                      <path d="M160 230 L170 225 L170 200 L160 205 Z" fill="#CBD5E1" />
                      <rect x="130" y="195" width="8" height="6" fill="#0284C7" rx="1" />
                      <rect x="142" y="201" width="8" height="6" fill="#0284C7" rx="1" />
                      {/* Containers on ship */}
                      <path d="M85 195 L115 210 L115 195 L85 180 Z" fill="#0284C7" />
                      <path d="M115 210 L125 205 L125 190 L115 195 Z" fill="#0369A1" />
                    </g>

                    {/* Ship 2 (Right Feeder Vessel) */}
                    <g transform="translate(140, 60)">
                      {/* Hull */}
                      <path d="M80 190 L190 245 L180 265 L60 205 Z" fill="#1E293B" />
                      <path d="M60 205 L180 265 L170 275 L50 215 Z" fill="#0284C7" />
                      {/* Bridge */}
                      <path d="M140 205 L180 225 L180 195 L140 175 Z" fill="#FFFFFF" />
                      <path d="M180 225 L190 220 L190 190 L180 195 Z" fill="#E2E8F0" />
                      {/* Containers */}
                      <path d="M85 185 L115 200 L115 185 L85 170 Z" fill="#0284C7" />
                      <path d="M115 200 L125 195 L125 180 L115 185 Z" fill="#0369A1" />
                      <path d="M118 178 L148 193 L148 178 L118 163 Z" fill="#0EA5E9" />
                      <path d="M148 193 L158 188 L158 173 L148 178 Z" fill="#0284C7" />
                    </g>

                    {/* Port Tower Crane (Quayside Crane) */}
                    <g transform="translate(180, 50)">
                      {/* Crane Base Legs */}
                      <path d="M40 180 L55 60 L75 60 L90 180" stroke="#64748B" strokeWidth="3" fill="none" />
                      <line x1="45" y1="140" x2="85" y2="140" stroke="#94A3B8" strokeWidth="2" />
                      <line x1="50" y1="100" x2="80" y2="100" stroke="#94A3B8" strokeWidth="2" />
                      <line x1="45" y1="140" x2="80" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
                      <line x1="85" y1="140" x2="50" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
                      {/* Crane Boom Arm */}
                      <path d="M10 55 L160 55 L140 45 L20 45 Z" fill="#334155" />
                      <path d="M55 45 L65 15 L75 45 Z" fill="#475569" />
                      <line x1="65" y1="15" x2="150" y2="55" stroke="#94A3B8" strokeWidth="1.5" />
                      <line x1="65" y1="15" x2="15" y2="55" stroke="#94A3B8" strokeWidth="1.5" />
                      {/* Crane Cabin & Cable */}
                      <rect x="90" y="55" width="16" height="12" fill="#0284C7" rx="1" />
                      <line x1="98" y1="67" x2="98" y2="110" stroke="#334155" strokeWidth="1.5" />
                      <rect x="90" y="110" width="16" height="8" fill="#F59E0B" rx="1" />
                    </g>

                    {/* Stacked Containers on Terminal */}
                    <g transform="translate(230, 210)">
                      <path d="M20 30 L50 45 L50 30 L20 15 Z" fill="#0284C7" />
                      <path d="M50 45 L60 40 L60 25 L50 30 Z" fill="#0369A1" />
                      <path d="M20 15 L50 30 L60 25 L30 10 Z" fill="#38BDF8" />

                      <path d="M55 47 L85 62 L85 47 L55 32 Z" fill="#334155" />
                      <path d="M85 62 L95 57 L95 42 L85 47 Z" fill="#1E293B" />
                      <path d="M55 32 L85 47 L95 42 L65 27 Z" fill="#64748B" />
                    </g>

                    {/* Seagulls flying */}
                    <path d="M330 100 Q335 95 340 100 Q345 95 350 100" stroke="#64748B" strokeWidth="1.5" fill="none" />
                    <path d="M355 115 Q360 110 365 115 Q370 110 375 115" stroke="#64748B" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Right Column: User Profile & Interactive Calendar */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* 1. Profile Info Card (Exact match to screenshot) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-inner">
                    <svg className="w-9 h-9 text-[#016DB2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="space-y-1 text-xs">
                    <h3 className="font-black text-sm md:text-base text-slate-900 leading-tight">
                      Kahfiarsyad Julyan Elevenday
                    </h3>
                    <div className="font-black text-[#016DB2] text-xs">107050</div>
                    <div className="font-bold text-slate-800">
                      Department Head Pengelolaan Talenta Kinerja
                    </div>
                    <div className="text-slate-600 font-medium">
                      Department Pengelolaan Talenta dan Kinerja
                    </div>
                    <div className="text-slate-400 font-medium">
                      kahfiarsyad.julyan@pelindo.co.id
                    </div>
                  </div>
                </div>

                {/* 2. Calendar & Notifications Card (Exact match to screenshot) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  
                  {/* Tabs: Kalender vs Pemberitahuan */}
                  <div className="grid grid-cols-2 text-center text-xs font-bold border-b border-slate-200">
                    <button className="py-3.5 border-b-2 border-[#016DB2] text-[#016DB2]">
                      Kalender
                    </button>
                    <button className="py-3.5 text-slate-500 hover:text-slate-800 transition">
                      Pemberitahuan
                    </button>
                  </div>

                  <div className="p-5 space-y-4">
                    
                    {/* Month Bar & Buat Agenda Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                        <button 
                          type="button"
                          onClick={handlePrevMonth}
                          className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition"
                          title="Bulan Sebelumnya"
                        >
                          &lt;
                        </button>
                        <span className="min-w-[110px] text-center font-bold text-slate-800">{currentMonth.name}</span>
                        <button 
                          type="button"
                          onClick={handleNextMonth}
                          className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition"
                          title="Bulan Berikutnya"
                        >
                          &gt;
                        </button>
                      </div>

                      <button 
                        type="button"
                        onClick={() => setShowCreateAgendaModal(true)}
                        className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                      >
                        Buat Agenda
                      </button>
                    </div>

                    {/* Calendar Legends */}
                    <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <span>Agenda Pribadi</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                        <span>Agenda Komunitas</span>
                      </div>
                    </div>

                    {/* 7x5 Interactive Grid */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                      <div className="grid grid-cols-7 text-center font-bold bg-slate-50/70 border-b border-slate-200 text-slate-600 py-2.5">
                        <span>Sen</span>
                        <span>Sel</span>
                        <span>Rab</span>
                        <span>Kam</span>
                        <span>Jum</span>
                        <span>Sab</span>
                        <span>Min</span>
                      </div>

                      <div className="grid grid-cols-7 text-center divide-x divide-y divide-slate-100 font-medium text-slate-700 bg-white">
                        {currentMonth.days.map((dayItem, idx) => {
                          const hasAgendas = dayItem.pribadi !== undefined || dayItem.komunitas !== undefined;

                          return (
                            <button
                              key={`${dayItem.dateStr}-${idx}`}
                              type="button"
                              onClick={() => {
                                const defaultTab = (dayItem.komunitas ?? 0) > 0 ? "Komunitas" : "Pribadi";
                                handleDateClick(dayItem.dateStr, defaultTab);
                              }}
                              className={`p-1.5 min-h-[58px] flex flex-col items-center justify-between hover:bg-sky-50/70 transition relative ${
                                dayItem.isMuted ? "text-slate-400 bg-slate-50/40" : "text-slate-700"
                              }`}
                            >
                              {/* Day Number and Sub-Month label */}
                              <div className="flex flex-col items-center justify-center pt-0.5">
                                {dayItem.isActive ? (
                                  <span className="w-6 h-6 rounded-full bg-[#016DB2] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                                    {dayItem.day}
                                  </span>
                                ) : (
                                  <span className={`font-semibold text-xs leading-none ${dayItem.isMuted ? "text-slate-400" : "text-slate-700"}`}>
                                    {dayItem.day}
                                  </span>
                                )}
                                {dayItem.sub && (
                                  <span className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                                    {dayItem.sub}
                                  </span>
                                )}
                              </div>

                              {/* Agenda Indicators (● Pribadi  ● Komunitas) */}
                              {hasAgendas ? (
                                <div className="flex items-center justify-center gap-1.5 text-[10px] font-medium leading-none pb-0.5 mt-1">
                                  <span className="inline-flex items-center gap-0.5 text-sky-500 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                                    <span>{dayItem.pribadi ?? 0}</span>
                                  </span>
                                  <span className="inline-flex items-center gap-0.5 text-rose-400 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                    <span>{dayItem.komunitas ?? 0}</span>
                                  </span>
                                </div>
                              ) : (
                                <div className="h-3"></div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Banner: Statistik Penting */}
            <div className="bg-[#016DB2] text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black tracking-tight">Statistik Penting</h2>
                  <p className="text-xs text-blue-100 opacity-90">Ringkasan aktivitas pembelajaran &amp; evaluasi kinerja portaverse Anda.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowSurveyModal(true)}
                  className="px-4 py-2 bg-white text-[#016DB2] hover:bg-sky-50 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Buka Kuesioner KPI
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-900">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Pelatihan Selesai</div>
                  <div className="text-2xl font-black text-[#016DB2]">12 Modul</div>
                  <div className="text-[10px] text-emerald-600 font-bold">+2 Modul bulan ini</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Total Jam Belajar</div>
                  <div className="text-2xl font-black text-slate-900">48.5 Jam</div>
                  <div className="text-[10px] text-slate-400">Target 40 Jam/Tahun Tercapai</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Sertifikat Kompetensi</div>
                  <div className="text-2xl font-black text-amber-600">8 Sertifikat</div>
                  <div className="text-[10px] text-slate-400">Portaverse &amp; Eksternal</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Skor Asesmen Rata-Rata</div>
                  <div className="text-2xl font-black text-emerald-600">94.8 / 100</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Kategori Sangat Baik</div>
                </div>
              </div>
            </div>

          </div>

          {/* Floating trigger button to reopen survey popup if closed */}
          {!showSurveyModal && (
            <button
              type="button"
              onClick={() => setShowSurveyModal(true)}
              className="fixed bottom-6 right-6 z-40 px-5 py-3 bg-[#016DB2] hover:bg-blue-700 text-white rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2.5 border border-white/20 animate-bounce transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Buka Kuesioner KPI (1 Survey Tersedia)</span>
            </button>
          )}

          {/* ===================================================================
              POPUP MODAL: "BANTU KAMI MENYEMPURNAKAN PENGISIAN KPI BARU"
              (EXACT MATCH TO SCREENSHOT 16.55.36)
             =================================================================== */}
          {showSurveyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95">
                
                {/* Modal Title Bar */}
                <div className="flex items-center justify-between px-7 py-4 border-b border-slate-100 bg-white">
                  <h3 className="font-black text-slate-900 text-base">Survey</h3>
                  <button 
                    onClick={() => setShowSurveyModal(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Two-Column Body matching Screenshot 16.55.36 */}
                <div className="p-7 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Visual Banner Graphic */}
                  <div className="md:col-span-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50/80 p-6 rounded-3xl border border-sky-100/80 space-y-4 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                    
                    <div className="space-y-2 relative z-10">
                      <span className="px-3 py-1 bg-[#016DB2] text-white rounded-full text-[10px] font-black tracking-wider uppercase inline-flex items-center gap-1.5 shadow-xs">
                        <FileText className="w-3 h-3" />
                        <span>ISI SURVEY</span>
                      </span>

                      <h2 className="text-xl font-black text-slate-900 leading-tight">
                        Bantu Kami <br />
                        <span className="text-[#016DB2]">Menyempurnakan</span> <br />
                        Pengisian KPI Baru
                      </h2>

                      <p className="text-[11px] text-slate-600 leading-relaxed max-w-xs">
                        Isi survey <b>Evaluasi Pengisian KPI Baru</b> dan bantu kami menciptakan pengalaman yang lebih mudah, jelas, dan efektif.
                      </p>
                    </div>

                    {/* 3 Value Features */}
                    <div className="space-y-2.5 relative z-10 text-xs">
                      <div className="flex items-start gap-2.5 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-white shadow-2xs">
                        <div className="w-7 h-7 rounded-xl bg-sky-100 text-[#016DB2] flex items-center justify-center shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[11px]">Cepat &amp; Mudah</div>
                          <div className="text-[10px] text-slate-500">Hanya butuh beberapa menit untuk mengisi survey.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-white shadow-2xs">
                        <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[11px]">Pendapat Anda Berarti</div>
                          <div className="text-[10px] text-slate-500">Masukan Anda membantu kami memperbaiki proses pengisian KPI agar lebih baik.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-white shadow-2xs">
                        <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[11px]">Pengalaman Lebih Baik</div>
                          <div className="text-[10px] text-slate-500">Hasil survey akan kami gunakan untuk meningkatkan fitur dan kemudahan pengisian KPI baru.</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer note in banner */}
                    <div className="p-2.5 bg-sky-600/10 rounded-xl border border-sky-200/60 text-[10px] text-[#016DB2] font-semibold flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-[#016DB2] shrink-0" />
                      <span><b>Setiap Masukan, Membentuk Perubahan:</b> Pendapat Anda sangat berharga.</span>
                    </div>

                  </div>

                  {/* Right Column: Invitation Description matching Screenshot 16.55.36 */}
                  <div className="md:col-span-6 space-y-4 text-xs text-slate-700">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                      Bantu Kami Menyempurnakan Pengisian KPI Baru!
                    </h2>

                    <div className="space-y-2.5 leading-relaxed text-slate-600">
                      <p className="font-semibold text-slate-800">
                        Yuk, Bagikan Pengalamanmu!
                      </p>
                      <p>
                        Kami sedang mengevaluasi pengalaman pegawai dalam menggunakan proses pengisian KPI yang baru.
                      </p>
                      <p>
                        Melalui survey ini, kami ingin mengetahui:
                      </p>
                      
                      <div className="space-y-1.5 pl-2 font-medium text-slate-800">
                        <div className="flex items-center gap-2">
                          <span>💡</span>
                          <span>Apa yang sudah berjalan dengan baik</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🔍</span>
                          <span>Bagian mana yang masih terasa kurang mudah</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🚀</span>
                          <span>Apa yang dapat kami tingkatkan ke depannya</span>
                        </div>
                      </div>

                      <p className="pt-1">
                        Setiap masukanmu berarti dan akan membantu kami menciptakan proses pengisian KPI yang lebih mudah, jelas, dan efektif.
                      </p>

                      <p className="flex items-center gap-1.5 text-slate-800 font-semibold">
                        <span>📝</span>
                        <span>Luangkan beberapa menit untuk mengisi survey dan sampaikan pengalamanmu.</span>
                      </p>

                      <p className="font-bold text-[#016DB2]">
                        Suaramu membantu kami berkembang! 💙
                      </p>
                    </div>
                  </div>

                </div>

                {/* Modal Action Buttons matching Screenshot 16.55.36 */}
                <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setShowSurveyModal(false)}
                    className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition shadow-2xs"
                  >
                    Tutup
                  </button>

                  <button
                    type="button"
                    onClick={() => setLandingStage("filling_form")}
                    className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
                  >
                    <span>Isi Survey Sekarang</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Quick Floating Banner if user closed modal so they can reopen it */}
          {!showSurveyModal && (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2.5 text-slate-800 font-semibold">
                <FileText className="w-4 h-4 text-[#016DB2]" />
                <span>Anda memiliki 1 Survey Mandatori yang belum diisi: <b>Survey New KPI Experience</b></span>
              </div>
              <button
                onClick={() => setLandingStage("filling_form")}
                className="px-4 py-2 bg-[#016DB2] text-white font-bold rounded-xl shadow-xs hover:bg-blue-700"
              >
                Isi Survey Sekarang
              </button>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          STAGE 2: FORM PENGISIAN SURVEY (SCREENSHOT 16.55.53)
         ========================================================================= */}
      {landingStage === "filling_form" && (
        <div className="space-y-6">
          
          {/* Breadcrumb & Title matching Screenshot 16.55.53 */}
          <div>
            <div className="text-xs text-slate-400 font-medium flex items-center gap-2 mb-1">
              <button onClick={() => setLandingStage("popup_prompt")} className="hover:text-[#016DB2]">Home</button>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">Isi Survey</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Survey New KPI Experience
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Mengukur tingkat keterlibatan dan evaluasi karyawan dalam pengisian KPI Baru
            </p>
          </div>

          {/* Questionnaire Form */}
          <form onSubmit={handleSubmitSurvey} className="space-y-6">
            
            {/* Question 1 matching Screenshot 16.55.53 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-sm text-slate-900">1.</span>
                <h3 className="font-bold text-sm text-slate-900">
                  Secara keseluruhan, bagaimana pengalaman anda dalam proses pengisian KPI Terbaru?
                </h3>
              </div>

              <div className="space-y-2.5 pl-6">
                {["Sangat Baik", "Baik", "Cukup", "Kurang"].map((opt) => (
                  <label 
                    key={opt}
                    onClick={() => setAnsQ1(opt)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${ansQ1 === opt ? "border-[#016DB2] bg-sky-50/50 text-[#016DB2] font-bold" : "border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"}`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${ansQ1 === opt ? "border-[#016DB2]" : "border-slate-300"}`}>
                      {ansQ1 === opt && <div className="w-2 h-2 rounded-full bg-[#016DB2]"></div>}
                    </div>
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 2 matching Screenshot 16.55.53 with Preview Box */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-sm text-slate-900">2.</span>
                <h3 className="font-bold text-sm text-slate-900">
                  Bagianmana yang menurutmu Bagus pada halaman portaverse?
                </h3>
              </div>

              {/* Preview Screenshot Image Box matching 16.55.53 */}
              <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-sky-300 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80"
                  alt="Portaverse Preview"
                  className="max-h-56 object-cover rounded-xl shadow-xs border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-6">
                {["Bagian Header", "Bagian Tengah", "Bagian Bawah", "Bagian Menu"].map((opt) => (
                  <label
                    key={opt}
                    onClick={() => setAnsQ2(opt)}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-center justify-center transition ${ansQ2 === opt ? "border-[#016DB2] bg-sky-50 text-[#016DB2] font-bold" : "border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"}`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${ansQ2 === opt ? "border-[#016DB2]" : "border-slate-300"}`}>
                      {ansQ2 === opt && <div className="w-1.5 h-1.5 rounded-full bg-[#016DB2]"></div>}
                    </div>
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 3: Cerita Keluhanmu */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-sm text-slate-900">3.</span>
                <h3 className="font-bold text-sm text-slate-900">
                  Apa Saran Anda untuk meningkatkan proses pengisian KPI?
                </h3>
              </div>
              <div className="pl-6">
                <textarea
                  rows={3}
                  value={ansQ3}
                  onChange={(e) => setAnsQ3(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#016DB2] resize-none leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Question 4: Apa kendala utama */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-sm text-slate-900">4.</span>
                <h3 className="font-bold text-sm text-slate-900">
                  Apa kendala utama yang anda alami saat mengisi KPI
                </h3>
              </div>
              <div className="pl-6">
                <input
                  type="text"
                  value={ansQ4}
                  onChange={(e) => setAnsQ4(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#016DB2]"
                  required
                />
              </div>
            </div>

            {/* Question 5: Fitur yang sering digunakan */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-sm text-slate-900">5.</span>
                <h3 className="font-bold text-sm text-slate-900">
                  Apa saja fitur yang sering kamu gunakan?
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-6">
                {["Melihat KPI Saya", "Input Target KPI", "Melihat Ranking"].map((f) => {
                  const isChecked = ansQ5.includes(f);
                  return (
                    <label
                      key={f}
                      onClick={() => {
                        if (isChecked) {
                          setAnsQ5(ansQ5.filter((x) => x !== f));
                        } else {
                          setAnsQ5([...ansQ5, f]);
                        }
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${isChecked ? "border-[#016DB2] bg-sky-50 text-[#016DB2] font-bold" : "border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"}`}
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isChecked ? "bg-[#016DB2] border-[#016DB2] text-white" : "border-slate-300"}`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{f}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setLandingStage("popup_prompt")}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Jawaban Survey</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* =========================================================================
          STAGE 3: COMPLETED DASHBOARD (EXACT MATCH TO SCREENSHOT 16.54.13)
         ========================================================================= */}
      {landingStage === "completed_dashboard" && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Top Banner matching Screenshot 16.54.13 */}
          <div className="bg-[#016DB2] text-white rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/20">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Portal Asesmen Peserta Terdaftar &bull; Portaverse Landing</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                Pengisian Asesmen Kompetensi Pegawai
              </h1>
              <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
                Halaman khusus bagi Anda untuk melihat daftar kuesioner dan asesmen wajib yang telah di-assign oleh manajemen. Selesaikan asesmen tepat waktu untuk pembaruan profil kompetensi &amp; sertifikasi.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-xs space-y-1 shrink-0">
              <div className="text-[10px] text-blue-200 uppercase font-bold">PESERTA TERLOGIN</div>
              <div className="font-bold text-sm text-white">Aan Sukwinandi</div>
              <div className="text-[11px] text-blue-100">NIPP: 102800 &bull; Regional 2</div>
            </div>
          </div>

          {/* 3 Metric Cards matching Screenshot 16.54.13 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: Asesmen Belum Diisi */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Asesmen Wajib Belum Diisi</div>
                <div className="text-2xl font-black text-slate-900">0 Asesmen</div>
                <div className="text-[11px] text-slate-400">Harap diselesaikan sebelum batas waktu</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            {/* Card 2: Sedang Dikerjakan */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Sedang Dikerjakan</div>
                <div className="text-2xl font-black text-[#016DB2]">0 Asesmen</div>
                <div className="text-[11px] text-slate-400">Draft jawaban tersimpan aman</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#016DB2] flex items-center justify-center border border-sky-100">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            {/* Card 3: Asesmen Telah Selesai */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Asesmen Telah Selesai</div>
                <div className="text-2xl font-black text-emerald-600">
                  {assignedList.filter(x => selectedModuleFilter === "Semua Modul" || x.originModule === selectedModuleFilter).length} Asesmen
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">Tervalidasi Corpu</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Section: Daftar Asesmen yang Ditugaskan Kepada Anda matching Screenshot 16.54.13 */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Daftar Asesmen yang Ditugaskan Kepada Anda</h3>
                <p className="text-xs text-slate-500">Pilih asesmen di bawah ini untuk melihat lembar penugasan dan evaluasi</p>
              </div>
              <span className="text-xs font-bold text-[#016DB2] bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-100 self-start sm:self-auto">
                {assignedList.filter(x => selectedModuleFilter === "Semua Modul" || x.originModule === selectedModuleFilter).length} Program Ditugaskan
              </span>
            </div>

            {/* Pilihan Asal Modul (KMS, LMS, TMS, IMS, PMS, CMS, EM) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#016DB2]" />
                  <span>Pilih Asal Modul Assessment:</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Menampilkan modul: <b className="text-slate-700">{selectedModuleFilter}</b>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(["Semua Modul", "KMS", "LMS", "TMS", "IMS", "PMS", "CMS", "EM"] as const).map((mod) => {
                  const count = mod === "Semua Modul" 
                    ? assignedList.length 
                    : assignedList.filter(x => x.originModule === mod).length;

                  return (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setSelectedModuleFilter(mod)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${selectedModuleFilter === mod ? "bg-[#016DB2] text-white shadow-md shadow-blue-600/20" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                    >
                      <span>{mod}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedModuleFilter === mod ? "bg-white/25 text-white" : "bg-slate-200 text-slate-700"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assessment Cards Grid with Module Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {assignedList
                .filter(x => selectedModuleFilter === "Semua Modul" || x.originModule === selectedModuleFilter)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      
                      {/* Card Header: Module Badge + Category + Status */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Modul: {item.originModule}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-[#016DB2] border border-sky-200">
                            {item.category}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          {item.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Ditugaskan oleh: <b>{item.assignedBy}</b>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] space-y-1.5 text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-[#016DB2]" /> Batas Waktu:
                          </span>
                          <span className="font-bold text-slate-800">{item.deadline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-[#016DB2]" /> Durasi &amp; Soal:
                          </span>
                          <span className="font-semibold text-slate-800">{item.durationMinutes} Mnt ({item.totalQuestions} Butir)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          MODAL 1: DETAIL AGENDA MODAL (EXACT MATCH TO GAMBAR 1 - PRIBADI & KOMUNITAS)
         ========================================================================= */}
      {selectedCalendarDate && (() => {
        const matchingAgendas = agendasList.filter(item => 
          item.dateStr.toLowerCase() === selectedCalendarDate.toLowerCase() ||
          (selectedCalendarDate.includes("27") && item.dateStr.includes("27")) ||
          (selectedCalendarDate.includes("7 September") && item.dateStr.includes("7 September")) ||
          (selectedCalendarDate.includes("10 September") && item.dateStr.includes("10 September")) ||
          (selectedCalendarDate.includes("15 September") && item.dateStr.includes("15 September")) ||
          (selectedCalendarDate.includes("16 September") && item.dateStr.includes("16 September")) ||
          (selectedCalendarDate.includes("21 September") && item.dateStr.includes("21 September")) ||
          (selectedCalendarDate.includes("24 September") && item.dateStr.includes("24 September")) ||
          (selectedCalendarDate.includes("1 Oktober") && item.dateStr.includes("1 Oktober"))
        );

        const pribadiItems = matchingAgendas.filter(x => x.typeCategory === "Pribadi");
        const komunitasItems = matchingAgendas.filter(x => x.typeCategory === "Komunitas");

        const displayItems = selectedModalTab === "Pribadi" ? pribadiItems : komunitasItems;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
                <h3 className="font-black text-sm md:text-base text-slate-900">
                  {selectedCalendarDate}
                </h3>
                <button 
                  type="button"
                  onClick={() => setSelectedCalendarDate(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 text-xs overflow-y-auto">
                
                {/* 2 Primary Filter Tabs matching Gambar 1 */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedModalTab("Pribadi")}
                    className={`px-3.5 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition text-xs ${
                      selectedModalTab === "Pribadi"
                        ? "bg-sky-50 border-sky-400 text-[#016DB2]"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Agenda Pribadi ({pribadiItems.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedModalTab("Komunitas")}
                    className={`px-3.5 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition text-xs ${
                      selectedModalTab === "Komunitas"
                        ? "bg-sky-50 border-sky-400 text-[#016DB2]"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span>Agenda Komunitas ({komunitasItems.length})</span>
                  </button>
                </div>

                {/* Event Cards List */}
                <div className="space-y-4 pt-1">
                  {displayItems.length > 0 ? (
                    displayItems.map((agenda) => {
                      const isDeadline = agenda.subCategory === "Tenggat Waktu";
                      const isPelatihan = agenda.subCategory === "Jadwal Pelatihan";

                      return (
                        <div 
                          key={agenda.id}
                          className={`border rounded-2xl p-5 space-y-4 shadow-2xs transition ${
                            isDeadline 
                              ? "border-amber-300 bg-amber-50/20" 
                              : selectedModalTab === "Komunitas" 
                              ? "border-slate-200 bg-white" 
                              : "border-sky-200 bg-white"
                          }`}
                        >
                          {/* Sub-Category Badge */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              {isDeadline ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3 text-amber-600" />
                                  <span>{agenda.badgeText || "Tenggat Waktu Evaluasi Level 3"}</span>
                                </span>
                              ) : isPelatihan ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-[#016DB2] border border-sky-200 flex items-center gap-1">
                                  <BookOpen className="w-3 h-3 text-[#016DB2]" />
                                  <span>{agenda.badgeText || "Jadwal Pelatihan LMS"}</span>
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                  <span>{agenda.badgeText || "Agenda CoP"}</span>
                                </span>
                              )}

                              <span className="text-[10px] font-semibold text-slate-400">
                                {agenda.type}
                              </span>
                            </div>

                            <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                              <Clock className={`w-3.5 h-3.5 ${isDeadline ? "text-amber-600" : "text-[#016DB2]"}`} />
                              <span>{agenda.timeStr}</span>
                            </div>
                          </div>

                          {/* Thumbnail & Title */}
                          <div className="flex items-start gap-3.5">
                            <div className={`w-16 h-11 rounded-lg overflow-hidden shrink-0 border flex items-center justify-center relative shadow-xs ${
                              isDeadline ? "bg-amber-100 border-amber-200 text-amber-700" : selectedModalTab === "Komunitas" ? "bg-slate-900 border-slate-200" : "bg-sky-900 border-sky-200"
                            }`}>
                              {isDeadline ? (
                                <Clock className="w-6 h-6 text-amber-600" />
                              ) : selectedModalTab === "Komunitas" ? (
                                <>
                                  <img 
                                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=160&auto=format&fit=crop&q=80" 
                                    alt="CoP"
                                    className="w-full h-full object-cover opacity-85"
                                  />
                                  <span className="absolute text-[8px] font-black text-amber-300 bottom-0.5 right-1">COP</span>
                                </>
                              ) : (
                                <>
                                  <img 
                                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80" 
                                    alt="LMS"
                                    className="w-full h-full object-cover opacity-85"
                                  />
                                  <span className="absolute text-[8px] font-black text-white bottom-0.5 right-1">LMS</span>
                                </>
                              )}
                            </div>

                            <div>
                              <h4 className="font-black text-sm text-slate-900 leading-snug">
                                {agenda.title}
                              </h4>
                              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                                {agenda.subtitle}
                              </div>
                            </div>
                          </div>

                          {/* Details Field List */}
                          <div className="space-y-3 pt-1">
                            <div>
                              <div className="font-bold text-slate-800 text-[11px]">Tanggal Agenda</div>
                              <div className="text-slate-500 mt-0.5 font-medium">
                                {agenda.timeStr}
                              </div>
                            </div>

                            {agenda.speaker && (
                              <div>
                                <div className="font-bold text-slate-800 text-[11px]">
                                  {isDeadline ? "Penyelenggara / Unit Terkait" : "Pembicara"}
                                </div>
                                <div className="text-[#016DB2] font-bold mt-0.5 cursor-pointer hover:underline">
                                  {agenda.speaker}
                                </div>
                              </div>
                            )}

                            <div>
                              <div className="font-bold text-slate-800 text-[11px]">Tipe Agenda</div>
                              <div className="text-slate-500 mt-0.5 font-medium">{agenda.type}</div>
                            </div>

                            {agenda.link && (
                              <div>
                                <div className="font-bold text-slate-800 text-[11px]">Link Agenda</div>
                                <a 
                                  href={agenda.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[#016DB2] hover:underline break-all mt-0.5 block font-semibold"
                                >
                                  {agenda.link}
                                </a>
                              </div>
                            )}

                            <div>
                              <div className="font-bold text-slate-800 text-[11px]">Deskripsi Agenda</div>
                              <div className="text-slate-600 mt-0.5 leading-relaxed">
                                {agenda.description}
                              </div>
                            </div>
                          </div>

                          {/* Direct Action Button */}
                          <div className="pt-2 flex items-center justify-end border-t border-slate-100">
                            {isDeadline ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCalendarDate(null);
                                  setLandingStage("filling_form");
                                }}
                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Isi Evaluasi Level 3 Sekarang</span>
                              </button>
                            ) : selectedModalTab === "Komunitas" ? (
                              <a
                                href={agenda.link || "https://linktr.ee/CoP2026"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                              >
                                <span>Gabung Sesi CoP</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <a
                                href={agenda.link || "https://portaverse.pelindo.co.id/lms"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                              >
                                <span>Buka Modul Pelatihan</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>

                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl space-y-2">
                      <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                      <div className="font-bold text-slate-600">Tidak ada {selectedModalTab === "Pribadi" ? "Agenda Pribadi" : "Agenda Komunitas"} pada tanggal ini.</div>
                      <div className="text-[11px]">Gunakan tombol &quot;Buat Agenda&quot; untuk menambahkan agenda baru.</div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          MODAL 2: FORM BUAT AGENDA MODAL (EXACT MATCH TO GAMBAR 2)
         ========================================================================= */}
      {showCreateAgendaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
              <h3 className="font-black text-sm md:text-base text-slate-900">
                Buat Agenda Baru
              </h3>
              <button 
                type="button"
                onClick={() => setShowCreateAgendaModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body matching Gambar 2 */}
            <form onSubmit={handleCreateAgendaSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              
              {/* 1. Nama Agenda * */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Agenda <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama agenda (misal: Pelatihan K3, Sesi CoP, dll)"
                  value={agendaName}
                  onChange={(e) => setAgendaName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#016DB2]"
                />
              </div>

              {/* Kategori Agenda */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kategori Agenda <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label 
                    onClick={() => {
                      setAgendaCategory("Pribadi");
                      setAgendaSubCategory("Jadwal Pelatihan");
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                      agendaCategory === "Pribadi" && agendaSubCategory === "Jadwal Pelatihan" ? "border-[#016DB2] bg-sky-50 text-[#016DB2] font-bold" : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#016DB2] mt-1 shrink-0"></span>
                    <div>
                      <div className="text-xs">Agenda Pribadi</div>
                      <div className="text-[10px] text-slate-500 font-normal">Jadwal Pelatihan LMS / Corpu</div>
                    </div>
                  </label>

                  <label 
                    onClick={() => {
                      setAgendaCategory("Komunitas");
                      setAgendaSubCategory("Agenda CoP");
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                      agendaCategory === "Komunitas" ? "border-rose-400 bg-rose-50 text-rose-600 font-bold" : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185] mt-1 shrink-0"></span>
                    <div>
                      <div className="text-xs">Agenda Komunitas</div>
                      <div className="text-[10px] text-slate-500 font-normal">Agenda Sesi CoP (Sharing Session)</div>
                    </div>
                  </label>

                  <label 
                    onClick={() => {
                      setAgendaCategory("Pribadi");
                      setAgendaSubCategory("Tenggat Waktu");
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                      agendaCategory === "Pribadi" && agendaSubCategory === "Tenggat Waktu" ? "border-amber-400 bg-amber-50 text-amber-800 font-bold" : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0"></span>
                    <div>
                      <div className="text-xs">Agenda Pribadi</div>
                      <div className="text-[10px] text-slate-500 font-normal">Tenggat Waktu Evaluasi Level 3</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* 2. Tanggal Mulai *, Waktu Mulai *, Waktu Selesai (3-Column Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tanggal Mulai <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={agendaStartDate}
                      onChange={(e) => setAgendaStartDate(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 pr-9 focus:outline-none focus:border-[#016DB2]"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Waktu Mulai <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="--.--"
                      required
                      value={agendaStartTime}
                      onChange={(e) => setAgendaStartTime(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 pr-9 focus:outline-none focus:border-[#016DB2]"
                    />
                    <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Waktu Selesai
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="--.--"
                      value={agendaEndTime}
                      onChange={(e) => setAgendaEndTime(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 pr-9 focus:outline-none focus:border-[#016DB2]"
                    />
                    <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 3. Nama Pekerja */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Pekerja
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari nama pekerja"
                    value={agendaWorkerSearch}
                    onChange={(e) => setAgendaWorkerSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Pekerja terpilih akan mendapatkan notifikasi dan kalender agenda
                </div>

                {/* Worker Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedWorkers.map((w) => (
                    <span key={w} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-50 text-[#016DB2] border border-sky-100 rounded-lg text-[11px] font-semibold">
                      <span>{w}</span>
                      <button 
                        type="button"
                        onClick={() => setSelectedWorkers(selectedWorkers.filter(item => item !== w))}
                        className="hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Tipe Agenda * */}
              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  Tipe Agenda <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2.5 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="agendaType"
                      value="Offline"
                      checked={agendaType === "Offline"}
                      onChange={() => setAgendaType("Offline")}
                      className="w-4 h-4 accent-[#016DB2]"
                    />
                    <span>Offline</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="agendaType"
                      value="Online"
                      checked={agendaType === "Online"}
                      onChange={() => setAgendaType("Online")}
                      className="w-4 h-4 accent-[#016DB2]"
                    />
                    <span>Online</span>
                  </label>
                </div>
              </div>

              {/* 5. Deskripsi Agenda * */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Deskripsi Agenda <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Masukkan deskripsi agenda..."
                  value={agendaDescription}
                  onChange={(e) => setAgendaDescription(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl leading-relaxed resize-none text-xs text-slate-800 focus:outline-none focus:border-[#016DB2]"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateAgendaModal(false)}
                  className="px-5 py-2 bg-white border border-sky-500 hover:bg-sky-50 text-[#016DB2] rounded-xl font-bold transition shadow-2xs"
                >
                  Kembali
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs transition"
                >
                  Buat Agenda
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

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
