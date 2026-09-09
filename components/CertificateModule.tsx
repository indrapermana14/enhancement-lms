"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  MoreHorizontal,
  ChevronDown,
  ArrowLeft,
  Calendar,
  X,
  Check,
  FileText,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Edit2,
  Image as ImageIcon,
  PenTool,
  UploadCloud,
  ExternalLink,
  ShieldCheck,
  Building2,
  Award,
  Sparkles,
  Layers,
  Filter,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Database
} from "lucide-react";

export interface CertItem {
  id: string;
  title: string;
  name: string;
  nipp: string;
  date: string;
  status: "Diterbitkan" | "Kadaluarsa";
  source: string;
  type: "attendance" | "competency" | "completion";
  issuer?: string;
  isExternal?: boolean;
  fileUrl?: string;
  expiryDateRaw?: string;
  category?: string;
}

export interface TemplateItem {
  id: string;
  title: string;
  desc: string;
  updatedDate: string;
  status: "Aktif" | "Non-Aktif";
  category: string;
  signerName: string;
  signerTitle: string;
  orientation: string;
  size: string;
  margin: { top: string; right: string; left: string; bottom: string };
}

const INITIAL_CERT_CARDS: CertItem[] = [
  { id: "1", title: "Sertifikat Kelulusan Port Digital Culture & Agility", name: "Hendra Firmawan", nipp: "11002324", date: "20 Desember 2026", status: "Diterbitkan", source: "LMS Portaverse (Internal)", type: "completion" },
  { id: "2", title: "Sertifikat Keahlian Port Strategy & Modern Logistics", name: "Hendra Firmawan", nipp: "11002324", date: "20 Desember 2026 - 20 Desember 2030", status: "Diterbitkan", source: "SAP (Pegawai Organik / PKWT)", type: "competency" },
  { id: "3", title: "Sertifikat Keahlian Operator Rubber Tyred Gantry", name: "Hendra Firmawan", nipp: "11002324", date: "20 Desember 2021 - 20 Desember 2025", status: "Kadaluarsa", source: "THANOS/PDS (Tenaga Alih Daya / Operator)", type: "competency" },
  { id: "4", title: "Sertifikat Kehadiran Basic Safety Training Maritime", name: "Hendra Firmawan", nipp: "11002324", date: "20 Desember 2026", status: "Diterbitkan", source: "ISMA (ABK / Seafarer)", type: "attendance" },
  { id: "5", title: "Sertifikat Penyelesaian E-Learning Keamanan Siber & Data", name: "Hendra Firmawan", nipp: "11002324", date: "15 Januari 2026", status: "Diterbitkan", source: "LMS Portaverse (Internal)", type: "completion" },
  { id: "6", title: "Sertifikat Keahlian Pelayanan Kapal & Pandu Pelabuhan", name: "Hendra Firmawan", nipp: "11002324", date: "20 Desember 2026 - 20 Desember 2030", status: "Diterbitkan", source: "SAP (Pegawai Organik / PKWT)", type: "competency" },
  { id: "7", title: "Sertifikat Keahlian Signalman & Rigger Pelabuhan", name: "Hendra Firmawan", nipp: "11002324", date: "20 Desember 2021 - 20 Desember 2025", status: "Kadaluarsa", source: "THANOS/PDS (Tenaga Alih Daya / Operator)", type: "competency" },
  { id: "8", title: "Sertifikat Kehadiran Webinar Maritime Safety 4.0", name: "Hendra Firmawan", nipp: "11002324", date: "20 Desember 2026", status: "Diterbitkan", source: "ISMA (ABK / Seafarer)", type: "attendance" }
];

const INITIAL_MY_CERTS: CertItem[] = [
  { id: "m1", title: "Sertifikat Kehadiran Workshop Port Operations", name: "Aan Sukwinandi", nipp: "11002324", date: "20 Desember 2026", status: "Diterbitkan", source: "LMS Portaverse", type: "attendance", isExternal: false, issuer: "Pelindo Corporate University" },
  { id: "m2", title: "Sertifikat Keahlian Supply Chain & Port Logistics", name: "Aan Sukwinandi", nipp: "11002324", date: "20 Desember 2026 - 20 Desember 2030", status: "Diterbitkan", source: "SAP (Pegawai Organik / PKWT)", type: "competency", isExternal: false, issuer: "PT PMLI" },
  { id: "m3", title: "Sertifikat Lisensi K3 Lingkungan Kerja", name: "Aan Sukwinandi", nipp: "11002324", date: "15 Jan 2024 - 15 Jan 2027", status: "Diterbitkan", source: "Eksternal (Luar LMS)", type: "competency", isExternal: true, issuer: "Kementerian Ketenagakerjaan RI & BNSP" },
  { id: "m4", title: "Certified Project Management Officer (PMO)", name: "Aan Sukwinandi", nipp: "11002324", date: "10 Agt 2023 - 10 Agt 2026", status: "Diterbitkan", source: "Eksternal (Luar LMS)", type: "competency", isExternal: true, issuer: "Project Management Institute (PMI)" },
  { id: "m5", title: "Sertifikat Keahlian Operator Rubber Tyred Gantry (RTG)", name: "Aan Sukwinandi", nipp: "11002324", date: "20 Des 2021 - 20 Des 2025", status: "Kadaluarsa", source: "THANOS/PDS (Tenaga Alih Daya / Operator)", type: "competency", isExternal: false, issuer: "PDS Training Center" },
  { id: "m6", title: "Sertifikat Kehadiran Webinar Maritime Safety 4.0", name: "Aan Sukwinandi", nipp: "11002324", date: "20 Desember 2026", status: "Diterbitkan", source: "ISMA (ABK / Seafarer)", type: "attendance", isExternal: false, issuer: "Pelindo Maritime Academy" }
];

const INITIAL_TEMPLATES: TemplateItem[] = [
  { id: "t1", title: "Sertifikat Kehadiran", desc: "Template untuk sertifikat kehadiran acara.", updatedDate: "18 Mei 2026", status: "Aktif", category: "Sertifikat Kehadiran", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
  { id: "t2", title: "Sertifikat Kelulusan", desc: "Template untuk sertifikat kelulusan pelatihan.", updatedDate: "18 Mei 2026", status: "Non-Aktif", category: "Sertifikat Kelulusan", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
  { id: "t3", title: "Sertifikat Pelatihan", desc: "Templat untuk sertifikat telah mengikuti Pelatihan", updatedDate: "18 Mei 2026", status: "Non-Aktif", category: "Sertifikat Pelatihan", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
  { id: "t4", title: "Sertifikat Webinar", desc: "Template untuk sertifikat pealtihan Webinar", updatedDate: "18 Mei 2026", status: "Aktif", category: "Sertifikat Webinar", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
  { id: "t5", title: "Sertifikat Kehadiran", desc: "Template untuk sertifikat kehadiran acara.", updatedDate: "18 Mei 2026", status: "Aktif", category: "Sertifikat Kehadiran", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
  { id: "t6", title: "Sertifikat Kelulusan", desc: "Template untuk sertifikat kelulusan pelatihan.", updatedDate: "18 Mei 2026", status: "Non-Aktif", category: "Sertifikat Kelulusan", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
  { id: "t7", title: "Sertifikat Pelatihan", desc: "Templat untuk sertifikat telah mengikuti Pelatihan", updatedDate: "18 Mei 2026", status: "Non-Aktif", category: "Sertifikat Pelatihan", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
  { id: "t8", title: "Sertifikat Webinar", desc: "Template untuk sertifikat pealtihan Webinar", updatedDate: "18 Mei 2026", status: "Aktif", category: "Sertifikat Webinar", signerName: "Robert Satoso Ibrahim", signerTitle: "Manager Trainer", orientation: "Landscape", size: "A4 (210×290 mm)", margin: { top: "15 cm", right: "15 cm", left: "15 cm", bottom: "15 cm" } },
];

export const SYNCED_MOCK_CERTS: CertItem[] = [
  // --- KANAL 1: SAP (Pegawai Organik / PKWT) ---
  {
    id: "sync-sap-1",
    title: "Sertifikat Keahlian Port Strategy & Modern Logistics 2026",
    name: "Hendra Firmawan",
    nipp: "11002324",
    date: "05 Maret 2026 - 05 Maret 2030",
    status: "Diterbitkan",
    source: "SAP (Pegawai Organik / PKWT)",
    type: "competency",
    issuer: "Pelindo Corporate University (SAP HCIS)"
  },
  {
    id: "sync-sap-2",
    title: "Sertifikat Kehadiran Executive Leadership & Transformation",
    name: "Amanda Sujiwo",
    nipp: "11003420",
    date: "20 Februari 2026",
    status: "Diterbitkan",
    source: "SAP (Pegawai Organik / PKWT)",
    type: "attendance",
    issuer: "PT Pelindo (Persero) HO"
  },
  {
    id: "sync-sap-3",
    title: "Sertifikat Kompetensi Maritime Finance & Commercial",
    name: "Yogi Muhammad Irshad",
    nipp: "11002753",
    date: "14 Januari 2026 - 14 Januari 2029",
    status: "Diterbitkan",
    source: "SAP (Pegawai Organik / PKWT)",
    type: "competency",
    issuer: "Subholding SPTP"
  },
  {
    id: "sync-sap-4",
    title: "Sertifikat Keahlian Pelayanan Kapal & Pandu Pelabuhan",
    name: "Raditya Satyatama",
    nipp: "11002911",
    date: "10 Januari 2026 - 10 Januari 2030",
    status: "Diterbitkan",
    source: "SAP (Pegawai Organik / PKWT)",
    type: "competency",
    issuer: "Subholding SPJM"
  },
  {
    id: "sync-sap-5",
    title: "Sertifikat Kehadiran Transformasi Digital & Cyber Security",
    name: "Aan Sukwinandi",
    nipp: "102800",
    date: "28 Februari 2026",
    status: "Diterbitkan",
    source: "SAP (Pegawai Organik / PKWT)",
    type: "attendance",
    issuer: "Direktorat SDM Pelindo"
  },
  {
    id: "sync-sap-6",
    title: "Sertifikat Kepatuhan Good Corporate Governance & AKHLAK",
    name: "Ricky Sutejo",
    nipp: "11002388",
    date: "15 Desember 2025 - 15 Desember 2028",
    status: "Diterbitkan",
    source: "SAP (Pegawai Organik / PKWT)",
    type: "completion",
    issuer: "Pelindo Corporate University"
  },
  {
    id: "sync-sap-7",
    title: "Sertifikat Manajemen Risiko Operasional BUMN Pelabuhan",
    name: "Evelyn Halim",
    nipp: "11002410",
    date: "02 Desember 2021 - 02 Desember 2024",
    status: "Kadaluarsa",
    source: "SAP (Pegawai Organik / PKWT)",
    type: "competency",
    issuer: "PMLI Risk Academy"
  },

  // --- KANAL 2: THANOS/PDS (Tenaga Alih Daya / Operator) ---
  {
    id: "sync-thanos-1",
    title: "Sertifikat Keahlian Operator Rubber Tyred Gantry (RTG)",
    name: "Budi Santoso",
    nipp: "PDS-88219",
    date: "12 Januari 2026 - 12 Januari 2029",
    status: "Diterbitkan",
    source: "THANOS/PDS (Tenaga Alih Daya / Operator)",
    type: "competency",
    issuer: "PDS Training Center"
  },
  {
    id: "sync-thanos-2",
    title: "Sertifikat K3 Operator Head Truck & Terminal Tractor",
    name: "Ahmad Fauzi",
    nipp: "PDS-88340",
    date: "18 Januari 2026 - 18 Januari 2028",
    status: "Diterbitkan",
    source: "THANOS/PDS (Tenaga Alih Daya / Operator)",
    type: "competency",
    issuer: "HSE Pelindo Marine & Terminal"
  },
  {
    id: "sync-thanos-3",
    title: "Sertifikat Kesiapsiagaan Tanggap Darurat Terminal Curah",
    name: "Dedi Kurniawan",
    nipp: "PDS-88102",
    date: "05 Februari 2026",
    status: "Diterbitkan",
    source: "THANOS/PDS (Tenaga Alih Daya / Operator)",
    type: "attendance",
    issuer: "THANOS Operasional Center"
  },
  {
    id: "sync-thanos-4",
    title: "Sertifikat Lisensi Operator Quay Container Crane (QCC)",
    name: "Rahmat Hidayat",
    nipp: "PDS-88451",
    date: "10 November 2025 - 10 November 2028",
    status: "Diterbitkan",
    source: "THANOS/PDS (Tenaga Alih Daya / Operator)",
    type: "competency",
    issuer: "PDS Training Center & BNSP"
  },
  {
    id: "sync-thanos-5",
    title: "Sertifikat Keahlian Rigger & Signalman Pelabuhan",
    name: "Surya Pratama",
    nipp: "PDS-88612",
    date: "20 Agustus 2022 - 20 Agustus 2025",
    status: "Kadaluarsa",
    source: "THANOS/PDS (Tenaga Alih Daya / Operator)",
    type: "competency",
    issuer: "LSP Pelabuhan Indonesia"
  },
  {
    id: "sync-thanos-6",
    title: "Sertifikat Pengenalan Sistem TOS Portaverse Terminal",
    name: "Agus Setiawan",
    nipp: "PDS-88743",
    date: "19 Februari 2026",
    status: "Diterbitkan",
    source: "THANOS/PDS (Tenaga Alih Daya / Operator)",
    type: "attendance",
    issuer: "ILCS Digital Training"
  },

  // --- KANAL 3: ISMA (ABK / Seafarer) ---
  {
    id: "sync-isma-1",
    title: "Sertifikat Kehadiran Basic Safety Training (BST) Maritime",
    name: "Capt. Joko Widodo",
    nipp: "ISMA-7701",
    date: "15 Januari 2026 - 15 Januari 2031",
    status: "Diterbitkan",
    source: "ISMA (ABK / Seafarer)",
    type: "competency",
    issuer: "Maritime Training Center ISMA"
  },
  {
    id: "sync-isma-2",
    title: "Sertifikat Kompetensi Deck Officer Class III (ANT-III)",
    name: "M. Arifin",
    nipp: "ISMA-7744",
    date: "22 Februari 2026 - 22 Februari 2031",
    status: "Diterbitkan",
    source: "ISMA (ABK / Seafarer)",
    type: "competency",
    issuer: "Kementerian Perhubungan Laut & ISMA"
  },
  {
    id: "sync-isma-3",
    title: "Sertifikat Ship Security Officer (SSO) ISPS Code",
    name: "Bambang Hermanto",
    nipp: "ISMA-7729",
    date: "04 Maret 2026 - 04 Maret 2031",
    status: "Diterbitkan",
    source: "ISMA (ABK / Seafarer)",
    type: "competency",
    issuer: "Pelindo Marine Safety Unit"
  },
  {
    id: "sync-isma-4",
    title: "Sertifikat Keahlian Engine Room Resource Management (ERM)",
    name: "Doni Prasetyo",
    nipp: "ISMA-7780",
    date: "11 Januari 2026 - 11 Januari 2031",
    status: "Diterbitkan",
    source: "ISMA (ABK / Seafarer)",
    type: "competency",
    issuer: "ISMA Maritime Academy"
  },
  {
    id: "sync-isma-5",
    title: "Sertifikat Advanced Fire Fighting (AFF) Armada Tunda",
    name: "Hendra Gunawan",
    nipp: "ISMA-7792",
    date: "14 Mei 2020 - 14 Mei 2025",
    status: "Kadaluarsa",
    source: "ISMA (ABK / Seafarer)",
    type: "competency",
    issuer: "BP3IP & ISMA Fleet Operations"
  },

  // --- KANAL 4: LMS Portaverse (Internal LMS / Pelatihan Online) ---
  {
    id: "sync-lms-1",
    title: "Sertifikat Kelulusan Kursus Port Digital Culture & Agility",
    name: "Aan Sukwinandi",
    nipp: "11002324",
    date: "01 Maret 2026",
    status: "Diterbitkan",
    source: "LMS Portaverse (Internal)",
    type: "completion",
    issuer: "Portaverse Learning Platform"
  },
  {
    id: "sync-lms-2",
    title: "Sertifikat Penyelesaian E-Learning Keamanan Siber & Pelindungan Data",
    name: "Dinda Rahmasari",
    nipp: "11004122",
    date: "25 Februari 2026",
    status: "Diterbitkan",
    source: "LMS Portaverse (Internal)",
    type: "completion",
    issuer: "Portaverse Cyber Security Center"
  },
  {
    id: "sync-lms-3",
    title: "Sertifikat Kompetensi Modul TOS Operasional Pelabuhan Modern",
    name: "Hendra Firmawan",
    nipp: "11002324",
    date: "10 Februari 2026 - 10 Februari 2030",
    status: "Diterbitkan",
    source: "LMS Portaverse (Internal)",
    type: "competency",
    issuer: "Pelindo Learning Management System"
  },
  {
    id: "sync-lms-4",
    title: "Sertifikat Kehadiran Webinar Solusi Logistik Maritim 2026",
    name: "Yogi Muhammad Irshad",
    nipp: "11002753",
    date: "18 Januari 2026",
    status: "Diterbitkan",
    source: "LMS Portaverse (Internal)",
    type: "attendance",
    issuer: "Portaverse Event & Webinar"
  },
  {
    id: "sync-lms-5",
    title: "Sertifikat Kelulusan Microlearning Budaya AKHLAK Pelindo",
    name: "Fajar Nugroho",
    nipp: "11003189",
    date: "12 Januari 2026",
    status: "Diterbitkan",
    source: "LMS Portaverse (Internal)",
    type: "completion",
    issuer: "Portaverse Microlearning Hub"
  },
  {
    id: "sync-lms-6",
    title: "Sertifikat Pelatihan Dasar K3 Lingkungan Kerja Pelabuhan (Online)",
    name: "Siti Nurhaliza",
    nipp: "11004890",
    date: "05 November 2022 - 05 November 2025",
    status: "Kadaluarsa",
    source: "LMS Portaverse (Internal)",
    type: "competency",
    issuer: "Portaverse Safety Academy"
  }
];

export type CertificatePOV = "admin_corpu" | "user" | "subcon" | "vendor";

interface CertificateModuleProps {
  currentRole?: string;
  onRoleChange?: (role: string) => void;
}

export default function CertificateModule({ currentRole = "Admin HO (Corpu)", onRoleChange }: CertificateModuleProps) {
  // Normalize POV from role
  const getPOV = (role: string): CertificatePOV => {
    if (role === "User") return "user";
    if (role === "Subcon") return "subcon";
    if (role === "Vendor") return "vendor";
    return "admin_corpu";
  };

  const [activePOV, setActivePOV] = useState<CertificatePOV>(getPOV(currentRole));

  // Sync state if currentRole prop changes
  useEffect(() => {
    const pov = getPOV(currentRole);
    setActivePOV(pov);

    // Auto-adjust default active tab based on POV
    if (pov === "user") {
      setActiveTab("saya");
    } else if (pov === "subcon") {
      setActiveTab("semua");
    } else if (pov === "vendor") {
      if (activeTab === "saya") setActiveTab("semua");
    }
  }, [currentRole]);

  // Navigation: "list" (Main) | "create" (Buat Sertifikat) | "create_template" (Buat Template) | "edit_template" (Edit Template)
  const [currentView, setCurrentView] = useState<"list" | "create" | "create_template" | "edit_template">("list");
  const [activeTab, setActiveTab] = useState<"semua" | "template" | "saya">(
    getPOV(currentRole) === "user" ? "saya" : "semua"
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sourceFilter, setSourceFilter] = useState("Semua");
  const [userChannelFilter, setUserChannelFilter] = useState("Semua"); // For POV User: Semua | LMS | SAP | THANOS | ISMA | Eksternal
  const [userOriginFilter, setUserOriginFilter] = useState("Semua"); // For POV User: Semua | Internal | Eksternal

  // Certificate & Template State
  const [certList, setCertList] = useState<CertItem[]>(INITIAL_CERT_CARDS);
  const [myCertList, setMyCertList] = useState<CertItem[]>(INITIAL_MY_CERTS);
  const [templates, setTemplates] = useState<TemplateItem[]>(INITIAL_TEMPLATES);

  // Context Menu Dropdowns
  const [openCertMenuId, setOpenCertMenuId] = useState<string | null>(null);
  const [openTmplMenuId, setOpenTmplMenuId] = useState<string | null>(null);

  // Modals
  const [showCertPreviewModal, setShowCertPreviewModal] = useState(false);
  const [previewCertData, setPreviewCertData] = useState<any>(null);
  const [showTmplPreviewModal, setShowTmplPreviewModal] = useState(false);

  // Sync Flow Modals (Admin / Vendor / Subcon)
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncLms, setSyncLms] = useState(true);
  const [syncSap, setSyncSap] = useState(true);
  const [syncThanos, setSyncThanos] = useState(true);
  const [syncIsma, setSyncIsma] = useState(true);
  const [showSyncConfirmModal, setShowSyncConfirmModal] = useState(false);
  const [showSyncSuccessModal, setShowSyncSuccessModal] = useState(false);

  // Modal Preview Hasil Sinkronisasi Multi-Kanal (Popup Tab per Sumber & Card-Card Pagination)
  const [showSyncResultModal, setShowSyncResultModal] = useState(false);
  const [syncResultActiveTab, setSyncResultActiveTab] = useState<string>("Semua");
  const [syncResultPage, setSyncResultPage] = useState(1);
  const [syncResultSearch, setSyncResultSearch] = useState("");
  const [syncResultStatusFilter, setSyncResultStatusFilter] = useState("Semua");
  const syncResultItemsPerPage = 6;

  // POV User Sync Flow Modals
  const [showUserSyncModal, setShowUserSyncModal] = useState(false);
  const [userSyncLms, setUserSyncLms] = useState(true);
  const [userSyncSap, setUserSyncSap] = useState(true);
  const [userSyncThanos, setUserSyncThanos] = useState(true);
  const [userSyncIsma, setUserSyncIsma] = useState(true);
  const [userSyncBnsp, setUserSyncBnsp] = useState(true);
  const [showUserSyncConfirmModal, setShowUserSyncConfirmModal] = useState(false);
  const [showUserSyncSuccessModal, setShowUserSyncSuccessModal] = useState(false);

  // POV User: Modal Tambah Sertifikat Baru (Luar LMS Portaverse / Eksternal)
  const [showAddExternalCertModal, setShowAddExternalCertModal] = useState(false);
  const [showAddExternalConfirmModal, setShowAddExternalConfirmModal] = useState(false);
  const [showAddExternalSuccessModal, setShowAddExternalSuccessModal] = useState(false);

  // Form State: Tambah Sertifikat Eksternal
  const [extTitle, setExtTitle] = useState("");
  const [extIssuer, setExtIssuer] = useState("");
  const [extNumber, setExtNumber] = useState("");
  const [extCategory, setExtCategory] = useState("Keahlian / Kompetensi");
  const [extIssueDate, setExtIssueDate] = useState("2026-01-15");
  const [extExpDate, setExtExpDate] = useState("2029-01-15");
  const [extNoExpiry, setExtNoExpiry] = useState(false);
  const [extFileName, setExtFileName] = useState("sertifikat_eksternal_kompetensi.pdf");
  const [extNotes, setExtNotes] = useState("");

  // Create Certificate Flow Modals (Screenshot 3)
  const [showCreateCertConfirmModal, setShowCreateCertConfirmModal] = useState(false);
  const [showCreateCertSuccessModal, setShowCreateCertSuccessModal] = useState(false);

  // Template Flow Modals (Screenshot 4)
  const [showCreateTmplConfirmModal, setShowCreateTmplConfirmModal] = useState(false);
  const [showCreateTmplSuccessModal, setShowCreateTmplSuccessModal] = useState(false);
  const [showSaveTmplConfirmModal, setShowSaveTmplConfirmModal] = useState(false);
  const [showSaveTmplSuccessModal, setShowSaveTmplSuccessModal] = useState(false);

  // Form State: Buat Sertifikat (Screenshot 2)
  const [certName, setCertName] = useState("Template Sertifikat Pelatihan Umum");
  const [certDesc, setCertDesc] = useState("Template sertifikat untuk berbagai program pelatihan dan pengembangan kompetensi peserta.");
  const [selectedTemplateId, setSelectedTemplateId] = useState("kelulusan");
  const [certNumber, setCertNumber] = useState("PMLI/CERT/2026/0001");
  const [certValueName, setCertValueName] = useState("Pelatihan Leadership Development");
  const [issueDate, setIssueDate] = useState("2026-03-30");
  const [expDate, setExpDate] = useState("2030-03-30");
  const [participants, setParticipants] = useState<string[]>([
    "Yogi Muhammad Irshad (NIP 12320011)",
    "Hendra (NIP 12320011)",
    "Raditya Satyatama (NIP 12320011)",
    "Agus Bermantyo (NIP 12320011)",
    "Evelyn Halim (NIP 12320011)",
    "Amanda Sujiwo (NIP 12320011)",
    "Ricky Sutejo (NIP 12320011)"
  ]);

  // Form State: Buat / Edit Template Sertifikat
  const [tmplFormId, setTmplFormId] = useState("");
  const [tmplName, setTmplName] = useState("Template Sertifikat Pelatihan Umum");
  const [tmplDesc, setTmplDesc] = useState("Template sertifikat untuk berbagai program pelatihan dan pengembangan kompetensi peserta.");
  const [tmplCategory, setTmplCategory] = useState("Sertifikat Kehadiran");
  const [tmplStatus, setTmplStatus] = useState<"Aktif" | "Non-Aktif">("Aktif");
  const [tmplOrientation, setTmplOrientation] = useState("Landscape");
  const [tmplSize, setTmplSize] = useState("A4 (210×290 mm)");
  const [tmplMarginTop, setTmplMarginTop] = useState("15 cm");
  const [tmplMarginRight, setTmplMarginRight] = useState("15 cm");
  const [tmplMarginLeft, setTmplMarginLeft] = useState("15 cm");
  const [tmplMarginBottom, setTmplMarginBottom] = useState("15 cm");
  const [tmplSignerType, setTmplSignerType] = useState<"manual" | "preset">("manual");
  const [tmplSignerName, setTmplSignerName] = useState("Robert Satoso Ibrahim");
  const [tmplSignerTitle, setTmplSignerTitle] = useState("Manager Trainer");

  // Safe Toast Notification (replaces window.alert for sandboxed iframes / v0)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Handlers
  const handlePOVChange = (newPOV: CertificatePOV) => {
    setActivePOV(newPOV);
    let targetRole = "Admin HO (Corpu)";
    if (newPOV === "user") {
      targetRole = "User";
      setActiveTab("saya");
    } else if (newPOV === "subcon") {
      targetRole = "Subcon";
      setActiveTab("semua");
    } else if (newPOV === "vendor") {
      targetRole = "Vendor";
      if (activeTab === "saya") setActiveTab("semua");
    }
    onRoleChange?.(targetRole);
  };

  const handleOpenEditTemplate = (tmpl: TemplateItem) => {
    setOpenTmplMenuId(null);
    setTmplFormId(tmpl.id);
    setTmplName(tmpl.title);
    setTmplDesc(tmpl.desc);
    setTmplCategory(tmpl.category);
    setTmplStatus(tmpl.status);
    setTmplOrientation(tmpl.orientation);
    setTmplSize(tmpl.size);
    setTmplMarginTop(tmpl.margin.top);
    setTmplMarginRight(tmpl.margin.right);
    setTmplMarginLeft(tmpl.margin.left);
    setTmplMarginBottom(tmpl.margin.bottom);
    setTmplSignerName(tmpl.signerName);
    setTmplSignerTitle(tmpl.signerTitle);
    setCurrentView("edit_template");
  };

  const handleDeleteTemplate = (id: string) => {
    setOpenTmplMenuId(null);
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleOpenCertPreview = (item?: any) => {
    setOpenCertMenuId(null);
    setPreviewCertData(item || {
      name: activePOV === "user" ? "Aan Sukwinandi" : "Yogi Muhammad Irshad",
      nipp: "11002324",
      course: certValueName || "Pelatihan Leadership Development",
      issuer: "Pelindo Corporate University • PT PMLI"
    });
    setShowCertPreviewModal(true);
  };

  const handleDeleteCert = (id: string, isMyCert = false) => {
    setOpenCertMenuId(null);
    if (isMyCert) {
      setMyCertList(myCertList.filter(c => c.id !== id));
    } else {
      setCertList(certList.filter(c => c.id !== id));
    }
  };

  const handleExecuteSync = () => {
    setShowSyncModal(false);
    setShowSyncConfirmModal(true);
  };

  const handleConfirmSync = () => {
    setShowSyncConfirmModal(false);
    setShowSyncSuccessModal(true);
    setTimeout(() => {
      setShowSyncSuccessModal(false);
      setSyncResultPage(1);
      setSyncResultActiveTab("Semua");
      setSyncResultSearch("");
      setSyncResultStatusFilter("Semua");
      setShowSyncResultModal(true);
    }, 1200);
  };

  const handleApplySyncToMainList = () => {
    const hasLms = syncLms || userSyncLms;
    const hasSap = syncSap || userSyncSap;
    const hasThanos = syncThanos || userSyncThanos;
    const hasIsma = syncIsma || userSyncIsma;

    const newItems = SYNCED_MOCK_CERTS.filter(sc => {
      const isLms = sc.source.includes("LMS") && hasLms;
      const isSap = sc.source.includes("SAP") && hasSap;
      const isThanos = sc.source.includes("THANOS") && hasThanos;
      const isIsma = sc.source.includes("ISMA") && hasIsma;
      return isLms || isSap || isThanos || isIsma;
    });

    const existingIds = new Set(certList.map(c => c.id));
    const itemsToAdd = newItems.filter(item => !existingIds.has(item.id));
    setCertList([...itemsToAdd, ...certList]);
    setShowSyncResultModal(false);
    showToast(`${itemsToAdd.length} data sertifikat baru berhasil diterapkan ke daftar utama!`);
  };

  // User Sync Handlers
  const handleExecuteUserSync = () => {
    setShowUserSyncModal(false);
    setShowUserSyncConfirmModal(true);
  };

  const handleConfirmUserSync = () => {
    setShowUserSyncConfirmModal(false);
    setShowUserSyncSuccessModal(true);

    // Add a freshly synced cert from SAP/BNSP
    const syncedItem: CertItem = {
      id: `synced-${Date.now()}`,
      title: "Sertifikat Pelatihan Port Strategy & Modern Logistics 2026",
      name: "Aan Sukwinandi",
      nipp: "11002324",
      date: "05 Maret 2026 - 05 Maret 2029",
      status: "Diterbitkan",
      source: "SAP (Pegawai Organik / PKWT)",
      type: "competency",
      isExternal: false,
      issuer: "Pelindo Corporate University (SAP HCIS Synced)"
    };
    setMyCertList([syncedItem, ...myCertList]);

    setTimeout(() => {
      setShowUserSyncSuccessModal(false);
      setSyncResultPage(1);
      setSyncResultActiveTab("Semua");
      setSyncResultSearch("");
      setSyncResultStatusFilter("Semua");
      setShowSyncResultModal(true);
    }, 1200);
  };

  // User Tambah Sertifikat Eksternal Handlers
  const handleConfirmAddExternalCert = () => {
    setShowAddExternalConfirmModal(false);
    setShowAddExternalSuccessModal(true);

    const newExtCert: CertItem = {
      id: `ext-${Date.now()}`,
      title: extTitle || "Sertifikasi Profesi Manajemen Pelabuhan Eksternal",
      name: "Aan Sukwinandi",
      nipp: "11002324",
      date: extNoExpiry ? `${extIssueDate} (Berlaku Seumur Hidup)` : `${extIssueDate} - ${extExpDate}`,
      status: "Diterbitkan",
      source: "Eksternal (Luar LMS)",
      type: "competency",
      issuer: extIssuer || "Badan Nasional Sertifikasi Profesi (BNSP)",
      isExternal: true,
      category: extCategory
    };

    setMyCertList([newExtCert, ...myCertList]);

    // Reset form
    setExtTitle("");
    setExtIssuer("");
    setExtNumber("");
    setExtNotes("");

    setTimeout(() => {
      setShowAddExternalSuccessModal(false);
      setShowAddExternalCertModal(false);
    }, 1600);
  };

  const handleConfirmCreateCert = () => {
    setShowCreateCertConfirmModal(false);
    setShowCreateCertSuccessModal(true);
    const newCert: CertItem = {
      id: String(Date.now()),
      title: certName,
      name: participants[0]?.split(" (")[0] || "Yogi Muhammad Irshad",
      nipp: "11002753",
      date: issueDate,
      status: "Diterbitkan",
      source: "SAP (Pegawai Organik / PKWT)",
      type: "attendance"
    };
    setCertList([newCert, ...certList]);
    setTimeout(() => {
      setShowCreateCertSuccessModal(false);
      setCurrentView("list");
    }, 1600);
  };

  const handleConfirmCreateTemplate = () => {
    setShowCreateTmplConfirmModal(false);
    setShowCreateTmplSuccessModal(true);
    const newTmpl: TemplateItem = {
      id: `t${templates.length + 1}`,
      title: tmplName,
      desc: tmplDesc,
      updatedDate: "18 Mei 2026",
      status: tmplStatus,
      category: tmplCategory,
      signerName: tmplSignerName,
      signerTitle: tmplSignerTitle,
      orientation: tmplOrientation,
      size: tmplSize,
      margin: { top: tmplMarginTop, right: tmplMarginRight, left: tmplMarginLeft, bottom: tmplMarginBottom }
    };
    setTemplates([newTmpl, ...templates]);
    setTimeout(() => {
      setShowCreateTmplSuccessModal(false);
      setCurrentView("list");
      setActiveTab("template");
    }, 1600);
  };

  const handleConfirmSaveTemplate = () => {
    setShowSaveTmplConfirmModal(false);
    setShowSaveTmplSuccessModal(true);
    setTemplates(templates.map(t => t.id === tmplFormId ? {
      ...t,
      title: tmplName,
      desc: tmplDesc,
      category: tmplCategory,
      status: tmplStatus,
      orientation: tmplOrientation,
      size: tmplSize,
      margin: { top: tmplMarginTop, right: tmplMarginRight, left: tmplMarginLeft, bottom: tmplMarginBottom },
      signerName: tmplSignerName,
      signerTitle: tmplSignerTitle
    } : t));
    setTimeout(() => {
      setShowSaveTmplSuccessModal(false);
      setCurrentView("list");
      setActiveTab("template");
    }, 1600);
  };

  // Filtered lists
  const filteredCertList = certList.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nipp.includes(searchQuery);
    const matchesStatus = statusFilter === "Semua" || c.status === statusFilter;
    const matchesSource = sourceFilter === "Semua" || c.source.toLowerCase().includes(sourceFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesSource;
  });

  const filteredMyCertList = myCertList.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.issuer && c.issuer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.nipp.includes(searchQuery);
    const matchesStatus = statusFilter === "Semua" || c.status === statusFilter;
    const matchesOrigin = userOriginFilter === "Semua" ||
      (userOriginFilter === "Eksternal" && c.isExternal) ||
      (userOriginFilter === "Internal" && !c.isExternal);
    const matchesChannel = userChannelFilter === "Semua" ||
      (userChannelFilter === "Eksternal" && (c.isExternal || c.source.toLowerCase().includes("eksternal"))) ||
      c.source.toLowerCase().includes(userChannelFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesOrigin && matchesChannel;
  });

  // Calculate stats for POV User
  const myTotalCount = myCertList.length;
  const myPublishedCount = myCertList.filter(c => c.status === "Diterbitkan").length;
  const myExpiredCount = myCertList.filter(c => c.status === "Kadaluarsa").length;
  const myExternalCount = myCertList.filter(c => c.isExternal).length;

  return (
    <div className="space-y-6 font-sans">

      {/* =========================================================================
          VIEW 1: MAIN LIST (ROLE-AWARE VIEWS: ADMIN/CORPU, USER, SUBCON, VENDOR)
         ========================================================================= */}
      {currentView === "list" && (
        <div className="space-y-6">

          {/* Top Header & POV Quick-Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-medium flex items-center gap-2 mb-1">
                <span>LMS</span>
                <span>&gt;</span>
                <span className="text-slate-700 font-semibold">
                  {activePOV === "user" ? "Sertifikat Saya" : "Manajemen Sertifikat"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activePOV === "user" ? "Sertifikat Saya" : "Manajemen Sertifikat"}
                </h1>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${activePOV === "user" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    activePOV === "subcon" ? "bg-amber-50 text-amber-800 border-amber-200" :
                      activePOV === "vendor" ? "bg-orange-50 text-orange-800 border-orange-200" :
                        "bg-sky-50 text-[#016DB2] border-sky-200"
                  }`}>
                  POV: {activePOV === "admin_corpu" ? "Admin / Corpu" : activePOV.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activePOV === "user"
                  ? "Kelola riwayat sertifikat pelatihan internal LMS Portaverse dan sertifikat luar LMS yang pernah Anda ikuti."
                  : activePOV === "subcon"
                    ? "Pantau dan kelola seluruh sertifikat peserta pelatihan khusus mitra Subcon."
                    : activePOV === "vendor"
                      ? "Kelola daftar penerbitan sertifikat pelatihan mitra dan template sertifikat dinamis."
                      : "Modul terpusat untuk mengelola, menerbitkan, dan mendesain template sertifikat dalam Portaverse."}
              </p>
            </div>

            {/* Quick POV Selector Pills for Testing / Demo */}
            <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 shrink-0 self-start lg:self-auto">
              <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider hidden sm:inline">
                Pilih POV:
              </span>
              <button
                onClick={() => handlePOVChange("admin_corpu")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activePOV === "admin_corpu"
                    ? "bg-[#016DB2] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <span>Admin/Corpu</span>
              </button>
              <button
                onClick={() => handlePOVChange("user")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activePOV === "user"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <span>User</span>
              </button>
              <button
                onClick={() => handlePOVChange("vendor")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activePOV === "vendor"
                    ? "bg-orange-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <span>Vendor</span>
              </button>
              <button
                onClick={() => handlePOVChange("subcon")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activePOV === "subcon"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <span>Subcon</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              ROLE-BASED SEGMENTED TABS:
              - Admin/Corpu: 3 Tabs (Semua Sertifikat, Template Sertifikat, Sertifikat Saya)
              - Vendor: 2 Tabs (Semua Sertifikat, Template Sertifikat) -> NO "Sertifikat Saya"
              - User: NO TABS (Hidden)
              - Subcon: NO TABS (Hidden)
             ========================================================================= */}
          {activePOV !== "user" && activePOV !== "subcon" && (
            <div className="bg-white p-1 rounded-2xl border border-slate-200 inline-flex shadow-xs w-full">
              <button
                onClick={() => setActiveTab("semua")}
                className={`flex-1 py-2.5 px-6 rounded-xl text-xs font-bold transition text-center ${activeTab === "semua" ? "bg-[#E0F2FE] text-[#016DB2]" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Semua Sertifikat
              </button>
              <button
                onClick={() => setActiveTab("template")}
                className={`flex-1 py-2.5 px-6 rounded-xl text-xs font-bold transition text-center ${activeTab === "template" ? "bg-[#E0F2FE] text-[#016DB2]" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Template Sertifikat
              </button>
              {/* Only POV Admin/Corpu sees "Sertifikat Saya" tab here. Vendor DOES NOT see this tab */}
              {activePOV === "admin_corpu" && (
                <button
                  onClick={() => setActiveTab("saya")}
                  className={`flex-1 py-2.5 px-6 rounded-xl text-xs font-bold transition text-center ${activeTab === "saya" ? "bg-[#E0F2FE] text-[#016DB2]" : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  Sertifikat Saya
                </button>
              )}
            </div>
          )}

          {/* =====================================================================
              VIEW: SEMUA SERTIFIKAT (FOR ADMIN/CORPU, SUBCON, VENDOR)
             ===================================================================== */}
          {(activePOV === "subcon" || (activePOV !== "user" && activeTab === "semua")) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-base font-extrabold text-slate-900">
                  {activePOV === "subcon" ? "Semua Sertifikat Mitra Subcon" : "Semua Sertifikat"}
                </div>
                {activePOV === "subcon" && (
                  <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-lg">
                    Menampilkan data pelatihan peserta Subcon
                  </span>
                )}
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#016DB2] flex items-center justify-center border border-blue-100">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-700">Total Sertifikat</div>
                  </div>
                  <div className="text-3xl font-black text-slate-900">1.248</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-700">Diterbitkan</div>
                  </div>
                  <div className="text-3xl font-black text-slate-900">1.102</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-700">Kadaluarsa</div>
                  </div>
                  <div className="text-3xl font-black text-slate-900">167</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari Sertifikat, Nama, atau NIPP"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2] shadow-xs"
                  />
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap sm:flex-nowrap">
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full sm:w-40 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs"
                    >
                      <option value="Semua">Status: Semua</option>
                      <option value="Diterbitkan">Diterbitkan</option>
                      <option value="Kadaluarsa">Kadaluarsa</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  {/* Multi-Kanal Source Filter */}
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                      className="w-full sm:w-48 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs"
                    >
                      <option value="Semua">Kanal: Semua Sumber</option>
                      <option value="LMS">LMS Portaverse (Internal)</option>
                      <option value="SAP">SAP (Organik/PKWT)</option>
                      <option value="THANOS">THANOS/PDS (Alih Daya)</option>
                      <option value="ISMA">ISMA (Pelaut/ABK)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => setShowSyncModal(true)}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-[#016DB2] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition shrink-0"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sinkronisasi</span>
                  </button>

                  <button
                    onClick={() => setCurrentView("create")}
                    className="px-4 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat sertifikat</span>
                  </button>
                </div>
              </div>

              {/* Rekap Desember Banner */}
              <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <b>Fitur Tambahan MoM FGD:</b> Rekapitulasi Tahunan Kadaluwarsa Edisi Desember tersedia untuk perencanaan TNA & uji kompetensi ulang 2026.
                  </span>
                </div>
                <button
                  onClick={() => showToast("Mengunduh Rekap_Sertifikat_Expired_Desember_2025.csv...")}
                  className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-amber-900 font-bold flex items-center gap-1 shadow-xs transition shrink-0 self-start sm:self-auto"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-700" /> Unduh Rekap Desember
                </button>
              </div>

              {/* Certificate Cards Grid (4 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredCertList.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between">
                    <div onClick={() => handleOpenCertPreview(item)} className="p-3 bg-slate-50 border-b border-slate-100 cursor-pointer relative group">
                      <div className="w-full h-36 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between text-center relative overflow-hidden shadow-xs">
                        <div className="flex items-center justify-between text-[7px] font-bold text-slate-600">
                          <span className="text-[#016DB2]">BUMN &bull; PELINDO</span>
                          <span className="text-slate-400">PMLI</span>
                        </div>
                        <div>
                          <div className="text-[10px] font-black tracking-wider text-slate-800 uppercase">CERTIFICATE</div>
                          <div className="text-[7px] text-slate-400 font-semibold tracking-widest uppercase">OF ATTENDANCE</div>
                        </div>
                        <div className="my-1">
                          <div className="text-[6px] text-slate-400">Diberikan kepada:</div>
                          <div className="text-[8px] font-bold text-[#016DB2] truncate">{item.name}</div>
                          <div className="text-[6px] text-slate-400">{item.nipp}</div>
                        </div>
                        <div className="flex justify-between items-end text-[6px] text-slate-400 border-t border-slate-100 pt-0.5">
                          <span>AKHLAK</span>
                          <span className="font-serif italic font-bold text-slate-700">Robert S. Ibrahim</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.name} • {item.nipp}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.date}</div>
                        <div className="text-[9px] text-sky-700 font-medium mt-1 bg-sky-50 px-2 py-0.5 rounded inline-block">
                          {item.source}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 relative">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.status === "Diterbitkan"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                          }`}>
                          {item.status}
                        </span>

                        <div className="relative">
                          <button
                            onClick={() => setOpenCertMenuId(openCertMenuId === item.id ? null : item.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {openCertMenuId === item.id && (
                            <div className="absolute right-0 bottom-6 w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30 text-xs animate-in fade-in">
                              <button
                                onClick={() => handleOpenCertPreview(item)}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                              >
                                <Eye className="w-3.5 h-3.5" /> Preview
                              </button>
                              <button
                                onClick={() => {
                                  setOpenCertMenuId(null);
                                  showToast(`Mengunduh sertifikat ${item.title} - ${item.name}.pdf...`);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                              >
                                <Download className="w-3.5 h-3.5" /> Download
                              </button>
                              <button
                                onClick={() => handleDeleteCert(item.id)}
                                className="w-full text-left px-3 py-1.5 hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span>Tampilkan</span>
                  <div className="relative">
                    <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold appearance-none pr-6 focus:outline-none">
                      <option>8</option>
                      <option>16</option>
                      <option>32</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
                  </div>
                </div>
                <div>1-{filteredCertList.length} dari 8032</div>
                <div className="flex gap-2">
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 shadow-xs transition">
                    Sebelumnya
                  </button>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 shadow-xs transition">
                    Berikutnya
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW: TEMPLATE SERTIFIKAT (FOR ADMIN/CORPU & VENDOR)
             ===================================================================== */}
          {activePOV !== "user" && activePOV !== "subcon" && activeTab === "template" && (
            <div className="space-y-6">
              <div className="text-base font-extrabold text-slate-900">Template Sertifikat</div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari Template Sertifikat"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2] shadow-xs"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <select className="w-full sm:w-44 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs">
                      <option>Status: Semua</option>
                      <option>Status: Aktif</option>
                      <option>Status: Non-Aktif</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => {
                      setTmplFormId("");
                      setTmplName("Template Sertifikat Pelatihan Umum");
                      setTmplDesc("Template sertifikat untuk berbagai program pelatihan dan pengembangan kompetensi peserta.");
                      setCurrentView("create_template");
                    }}
                    className="px-4 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Template</span>
                  </button>
                </div>
              </div>

              {/* Template Cards Grid (4 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((tmpl) => (
                  <div key={tmpl.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between">
                    <div onClick={() => setShowTmplPreviewModal(true)} className="p-3 bg-slate-50 border-b border-slate-100 cursor-pointer relative group">
                      <div className="w-full h-36 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between text-center relative overflow-hidden shadow-xs">
                        <div className="flex items-center justify-between text-[7px] font-bold text-slate-600">
                          <span className="text-[#016DB2]">BUMN &bull; PELINDO</span>
                          <span className="text-slate-400">PMLI</span>
                        </div>
                        <div>
                          <div className="text-[10px] font-black tracking-wider text-slate-800 uppercase">CERTIFICATE</div>
                          <div className="text-[7px] text-slate-400 font-semibold tracking-widest uppercase">OF COMPLETION</div>
                        </div>
                        <div className="flex justify-between items-end text-[6px] text-slate-400 border-t border-slate-100 pt-0.5">
                          <span>AKHLAK</span>
                          <span className="font-serif italic font-bold text-slate-700">{tmpl.signerName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{tmpl.title}</h4>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{tmpl.desc}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Diperbarui {tmpl.updatedDate}</div>
                      </div>

                      <div className="flex items-center justify-between pt-1 relative">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${tmpl.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                          }`}>
                          {tmpl.status}
                        </span>

                        <div className="relative">
                          <button
                            onClick={() => setOpenTmplMenuId(openTmplMenuId === tmpl.id ? null : tmpl.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {openTmplMenuId === tmpl.id && (
                            <div className="absolute right-0 bottom-6 w-28 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30 text-xs animate-in fade-in">
                              <button
                                onClick={() => handleOpenEditTemplate(tmpl)}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTemplate(tmpl.id)}
                                className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span>Tampilkan</span>
                  <div className="relative">
                    <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold appearance-none pr-6 focus:outline-none">
                      <option>8</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
                  </div>
                </div>
                <div>1-{templates.length} dari {templates.length}</div>
                <div className="flex gap-2">
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 shadow-xs transition">
                    Sebelumnya
                  </button>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 shadow-xs transition">
                    Berikutnya
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW: SERTIFIKAT SAYA (EXCLUSIVE VIEW FOR POV USER & AVAILABLE IN ADMIN/CORPU)
              POV User Requirement:
              - Hilangkan tab menu
              - Hanya menampilkan "Sertifikat Saya"
              - Terdapat button Async / Sinkronisasi
              - Terdapat button Tambah Sertifikat Baru (Luar LMS Portaverse)
             ===================================================================== */}
          {(activePOV === "user" || (activePOV === "admin_corpu" && activeTab === "saya")) && (
            <div className="space-y-6">

              {/* Header Title & Information */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#016DB2]" />
                    <span>Sertifikat Saya &amp; Riwayat Pelatihan</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Portofolio resmi sertifikat internal LMS Portaverse &amp; sertifikat mandiri di luar LMS.
                  </p>
                </div>
                {activePOV === "user" && (
                  <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Akun Terverifikasi: <b>Aan Sukwinandi (11002324)</b></span>
                  </div>
                )}
              </div>

              {/* 4 Metric Cards for User */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500">Total Sertifikat</div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{myTotalCount}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#016DB2] flex items-center justify-center border border-blue-100">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500">Diterbitkan / Aktif</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{myPublishedCount}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500">Kadaluarsa</div>
                    <div className="text-2xl sm:text-3xl font-black text-red-600 mt-1">{myExpiredCount}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-purple-200 bg-purple-50/20 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-purple-700">Luar LMS (Eksternal)</div>
                    <div className="text-2xl sm:text-3xl font-black text-purple-900 mt-1">{myExternalCount}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Action Bar for User POV */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari Sertifikat Saya, Nama Pelatihan, atau Lembaga Penerbit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2] shadow-xs"
                  />
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap sm:flex-nowrap">
                  {/* Status Filter */}
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full sm:w-36 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs"
                    >
                      <option value="Semua">Status: Semua</option>
                      <option value="Diterbitkan">Diterbitkan</option>
                      <option value="Kadaluarsa">Kadaluarsa</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  {/* Multi-Kanal Filter (LMS, SAP, THANOS, ISMA, Eksternal) */}
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={userChannelFilter}
                      onChange={(e) => setUserChannelFilter(e.target.value)}
                      className="w-full sm:w-48 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs"
                    >
                      <option value="Semua">Kanal: Semua Sumber</option>
                      <option value="LMS">LMS Portaverse (Internal)</option>
                      <option value="SAP">SAP (Organik/PKWT)</option>
                      <option value="THANOS">THANOS/PDS (Alih Daya)</option>
                      <option value="ISMA">ISMA (Pelaut/ABK)</option>
                      <option value="Eksternal">Eksternal (Luar LMS)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  {/* Asal Sertifikat Filter (Internal / Eksternal) */}
                  {/* <div className="relative flex-1 sm:flex-none">
                    <select 
                      value={userOriginFilter}
                      onChange={(e) => setUserOriginFilter(e.target.value)}
                      className="w-full sm:w-44 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs"
                    >
                      <option value="Semua">Asal: Semua Sumber</option>
                      <option value="Internal">Internal LMS Portaverse</option>
                      <option value="Eksternal">Eksternal (Luar LMS)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div> */}

                  {/* MANDATORY BUTTON: ASYNC / SINKRONISASI FOR USER */}
                  <button
                    onClick={() => setShowUserSyncModal(true)}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-[#016DB2] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition shrink-0"
                    title="Sinkronisasi sertifikat dari SAP HCM, THANOS, ISMA, dan BNSP"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sinkronisasi</span>
                  </button>

                  {/* MANDATORY BUTTON: TAMBAH SERTIFIKAT BARU (LUAR LMS) FOR USER */}
                  <button
                    onClick={() => setShowAddExternalCertModal(true)}
                    className="px-4 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Sertifikat Baru</span>
                  </button>
                </div>
              </div>

              {/* Banner Info for User on External Certs */}
              <div className="bg-gradient-to-r from-blue-50/80 to-sky-50 border border-blue-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#016DB2] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      Pernah mengikuti pelatihan atau sertifikasi di luar LMS Portaverse?
                    </div>
                    <div className="text-slate-600 mt-0.5">
                      Gunakan tombol <b>Tambah Sertifikat Baru</b> untuk mencatat sertifikat BNSP, sertifikasi keahlian, atau workshop eksternal Anda agar tersimpan dalam portofolio korporat.
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddExternalCertModal(true)}
                  className="px-4 py-2 bg-white hover:bg-blue-50 border border-blue-300 text-[#016DB2] rounded-xl font-bold flex items-center gap-1.5 shrink-0 shadow-xs transition self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Sertifikat
                </button>
              </div>

              {/* Personal Certificate Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMyCertList.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between group">
                    <div onClick={() => handleOpenCertPreview(item)} className="p-3 bg-slate-50 border-b border-slate-100 cursor-pointer relative">
                      <div className="w-full h-36 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between text-center relative overflow-hidden shadow-xs">
                        {/* Certificate Card Header Badge */}
                        <div className="flex items-center justify-between text-[7px] font-bold text-slate-600">
                          <span className="text-[#016DB2]">
                            {item.isExternal ? "SERTIFIKAT EKSTERNAL" : "BUMN • PELINDO"}
                          </span>
                          <span className={item.isExternal ? "text-purple-600 font-extrabold" : "text-slate-400"}>
                            {item.isExternal ? "NON-LMS" : item.source.includes("SAP") ? "SAP HCIS" : item.source.includes("THANOS") ? "THANOS/PDS" : item.source.includes("ISMA") ? "ISMA" : "PORTAVERSE"}
                          </span>
                        </div>
                        <div>
                          <div className="text-[10px] font-black tracking-wider text-slate-800 uppercase">
                            CERTIFICATE
                          </div>
                          <div className="text-[7px] text-slate-400 font-semibold tracking-widest uppercase truncate">
                            {item.type === "competency" ? "OF COMPETENCE" : "OF ATTENDANCE"}
                          </div>
                        </div>
                        <div className="my-1">
                          <div className="text-[6px] text-slate-400">Diberikan kepada:</div>
                          <div className="text-[8px] font-bold text-[#016DB2] truncate">{item.name}</div>
                          <div className="text-[6px] text-slate-400">{item.nipp}</div>
                        </div>
                        <div className="flex justify-between items-end text-[6px] text-slate-400 border-t border-slate-100 pt-0.5">
                          <span>{item.isExternal ? "VERIFIED" : "AKHLAK"}</span>
                          <span className="font-serif italic font-bold text-slate-700 truncate max-w-[90px]">
                            {item.issuer || "Robert S. Ibrahim"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        {/* Channel / Source Tag */}
                        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                          {item.isExternal ? (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                              <ExternalLink className="w-2.5 h-2.5" /> Luar LMS (Eksternal)
                            </span>
                          ) : item.source.includes("SAP") ? (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              SAP HCIS
                            </span>
                          ) : item.source.includes("THANOS") ? (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                              THANOS/PDS
                            </span>
                          ) : item.source.includes("ISMA") ? (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                              ISMA SEAFARER
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-sky-50 text-[#016DB2] border border-sky-200">
                              LMS Portaverse
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">{item.title}</h4>
                        <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                          Penerbit: <b>{item.issuer || item.source}</b>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 relative">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.status === "Diterbitkan"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                          }`}>
                          {item.status}
                        </span>

                        <div className="relative">
                          <button
                            onClick={() => setOpenCertMenuId(openCertMenuId === item.id ? null : item.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {openCertMenuId === item.id && (
                            <div className="absolute right-0 bottom-6 w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30 text-xs animate-in fade-in">
                              <button
                                onClick={() => handleOpenCertPreview(item)}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                              >
                                <Eye className="w-3.5 h-3.5" /> Preview
                              </button>
                              <button
                                onClick={() => {
                                  setOpenCertMenuId(null);
                                  showToast(`Mengunduh sertifikat ${item.title} - ${item.name}.pdf...`);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                              >
                                <Download className="w-3.5 h-3.5" /> Download
                              </button>
                              {item.isExternal && (
                                <button
                                  onClick={() => handleDeleteCert(item.id, true)}
                                  className="w-full text-left px-3 py-1.5 hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredMyCertList.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-800">Tidak ada sertifikat ditemukan</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Coba ubah kata kunci pencarian atau gunakan tombol Sinkronisasi / Tambah Sertifikat Baru.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("Semua");
                      setUserChannelFilter("Semua");
                      setUserOriginFilter("Semua");
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                  >
                    Reset Filter
                  </button>
                </div>
              )}

              {/* Pagination for User */}
              {filteredMyCertList.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span>Tampilkan</span>
                    <div className="relative">
                      <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold appearance-none pr-6 focus:outline-none">
                        <option>8</option>
                        <option>16</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
                    </div>
                  </div>
                  <div>1-{filteredMyCertList.length} dari {filteredMyCertList.length}</div>
                  <div className="flex gap-2">
                    <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 shadow-xs transition">
                      Sebelumnya
                    </button>
                    <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 shadow-xs transition">
                      Berikutnya
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          VIEW 2: BUAT SERTIFIKAT (FOR ADMIN/CORPU, SUBCON, VENDOR)
         ========================================================================= */}
      {currentView === "create" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <button
              onClick={() => setCurrentView("list")}
              className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#016DB2] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span>|</span>
            <span>LMS</span>
            <span>&gt;</span>
            <span>Manajemen Sertifikat</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">Buat Sertifikat</span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Buat Sertifikat</h1>
            <p className="text-xs text-slate-500 mt-0.5">Isi informasi dibawah ini sesuai dengan informasi sertifikat yang ingin anda buat.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-8">
            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Informasi Standar Sertifikat</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Sertifikat<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#016DB2]"
                />
                <div className="text-[11px] text-slate-400 mt-1">Nama sertifikat yang akan digunakan untuk sertifikat ini.</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Sertifikat</label>
                <textarea
                  rows={3}
                  value={certDesc}
                  onChange={(e) => setCertDesc(e.target.value)}
                  maxLength={200}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#016DB2] resize-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>*Max 200 Char</span>
                  <span>{certDesc.length}/200</span>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Pilih Template</h3>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari Template Sertifikat"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 overflow-x-auto pb-2">
                {[
                  { id: "kehadiran", title: "Sertifikat Kehadiran", desc: "Template untuk sertifikat kehadiran acara." },
                  { id: "kelulusan", title: "Sertifikat Kelulusan", desc: "Template untuk sertifikat kelulusan pelatihan." },
                  { id: "pelatihan", title: "Sertifikat Pelatihan", desc: "Template untuk sertifikat telah mengikuti Pelatihan" },
                  { id: "webinar1", title: "Sertifikat Webinar", desc: "Template untuk sertifikat pealtihan Webinar" },
                  { id: "webinar2", title: "Sertifikat Webinar", desc: "Template untuk sertifikat pealtihan Webinar" },
                ].map((tmpl) => {
                  const isSelected = selectedTemplateId === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplateId(tmpl.id)}
                      className={`p-2.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between text-left ${isSelected ? "border-[#016DB2] bg-blue-50/20" : "border-slate-200 hover:border-slate-300 bg-white"}`}
                    >
                      <div className="w-full h-24 bg-white border border-slate-200 rounded-lg p-2 mb-2 flex flex-col justify-between text-center relative overflow-hidden">
                        <div className="flex justify-between text-[5px] text-slate-500 font-bold">
                          <span className="text-[#016DB2]">BUMN &bull; PELINDO</span>
                          <span>PMLI</span>
                        </div>
                        <div className="text-[8px] font-black text-slate-800">CERTIFICATE</div>
                        <div className="text-[5px] text-slate-400">OF COMPLETION</div>
                        <div className="flex justify-between text-[5px] text-slate-400 pt-0.5 border-t border-slate-100">
                          <span>AKHLAK</span>
                          <span>Manager Trainer</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 leading-tight">{tmpl.title}</div>
                        <div className="text-[10px] text-slate-400 mt-1 leading-snug">{tmpl.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4 pt-4 border-t border-slate-100 text-xs">
              <h3 className="font-bold text-sm text-slate-900">Identifier Sertifikat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Value Nomor Sertifikat<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Value Nama Sertifikat<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={certValueName}
                    onChange={(e) => setCertValueName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Penerbitan<span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Kadaluarsa</label>
                  <input
                    type="date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">Masukan Tanggal Kadaluarsa jika ada tanggal kadaluarsa</div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Peserta<span className="text-red-500">*</span></label>
                <div className="border border-slate-200 rounded-xl p-3 bg-white space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari Peserta"
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {participants.map((p) => (
                      <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition">
                        <span>{p}</span>
                        <button
                          type="button"
                          onClick={() => setParticipants(participants.filter(item => item !== p))}
                          className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentView("list")}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleOpenCertPreview()}
              className="px-5 py-2.5 bg-white border border-[#016DB2] text-[#016DB2] hover:bg-blue-50 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Preview Sertifikat
            </button>
            <button
              type="button"
              onClick={() => setShowCreateCertConfirmModal(true)}
              className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
            >
              Simpan Sertifikat
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3 & 4: BUAT TEMPLATE / EDIT TEMPLATE
         ========================================================================= */}
      {(currentView === "create_template" || currentView === "edit_template") && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <button
              onClick={() => {
                setCurrentView("list");
                setActiveTab("template");
              }}
              className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#016DB2] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span>|</span>
            <span>LMS</span>
            <span>&gt;</span>
            <span>Manajemen Sertifikat</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">
              {currentView === "create_template" ? "Buat Template Sertifikat" : "Edit Template Sertifikat"}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentView === "create_template" ? "Buat Template Sertifikat" : "Edit Template Sertifikat"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentView === "create_template" ? "Buat template sertifikat baru yang dapat digunakan pada buat sertifikat" : "Edit template sertifikat baru yang dapat digunakan pada buat sertifikat"}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-8 text-xs">

            {/* Card 1: Informasi Template */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Informasi Template</h3>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Tempalte<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={tmplName}
                  onChange={(e) => setTmplName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                />
                <div className="text-[11px] text-slate-400 mt-1">Masukan nama template yang mudah dikenali</div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Template</label>
                <textarea
                  rows={3}
                  value={tmplDesc}
                  onChange={(e) => setTmplDesc(e.target.value)}
                  maxLength={200}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2] resize-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>*Max 200 Char</span>
                  <span>{tmplDesc.length}/200</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={tmplCategory}
                      onChange={(e) => setTmplCategory(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 focus:outline-none focus:border-[#016DB2]"
                    >
                      <option>Sertifikat Kehadiran</option>
                      <option>Sertifikat Kelulusan</option>
                      <option>Sertifikat Pelatihan</option>
                      <option>Sertifikat Webinar</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Template<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={tmplStatus}
                      onChange={(e: any) => setTmplStatus(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 focus:outline-none focus:border-[#016DB2]"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Pengaturan Template */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Pengaturan Template</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Orientasi<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={tmplOrientation}
                      onChange={(e) => setTmplOrientation(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 focus:outline-none focus:border-[#016DB2]"
                    >
                      <option>Landscape</option>
                      <option>Portrait</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ukuran<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={tmplSize}
                      onChange={(e) => setTmplSize(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 focus:outline-none focus:border-[#016DB2]"
                    >
                      <option>A4 (210×290 mm)</option>
                      <option>Letter (216×279 mm)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">Margin</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Atas</span>
                    <input type="text" value={tmplMarginTop} onChange={(e) => setTmplMarginTop(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-center" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Kanan</span>
                    <input type="text" value={tmplMarginRight} onChange={(e) => setTmplMarginRight(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-center" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Kiri</span>
                    <input type="text" value={tmplMarginLeft} onChange={(e) => setTmplMarginLeft(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-center" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Bawah</span>
                    <input type="text" value={tmplMarginBottom} onChange={(e) => setTmplMarginBottom(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-center" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">Background</label>
                <div className="w-full p-6 border-2 border-dashed border-sky-300 rounded-2xl bg-sky-50/20 text-center space-y-3">
                  <div className="w-28 h-16 mx-auto bg-white border border-slate-200 rounded shadow-xs flex items-center justify-center p-1">
                    <div className="w-full h-full border border-dashed border-blue-300 flex items-center justify-center text-[8px] text-slate-400 font-bold">
                      PELINDO TEMPLATE
                    </div>
                  </div>
                  <button type="button" onClick={() => showToast("Memilih file background template...")} className="text-xs font-bold text-[#016DB2] hover:underline block mx-auto">
                    Ganti Background
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">*Max Size: 5Mb, Format: jpg, png, pdf.</div>
              </div>
            </div>

            {/* Card 3: Penandatangan */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Penandatangan</h3>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="radio" name="signerType" checked={tmplSignerType === "manual"} onChange={() => setTmplSignerType("manual")} className="accent-[#016DB2]" />
                  <span>Input Manual</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                  <input type="radio" name="signerType" checked={tmplSignerType === "preset"} onChange={() => setTmplSignerType("preset")} className="accent-[#016DB2]" />
                  <span>Pilih dari Data Penandatangan</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Penandatangan<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={tmplSignerName}
                    onChange={(e) => setTmplSignerName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={tmplSignerTitle}
                    onChange={(e) => setTmplSignerTitle(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">Tanda tangan</label>
                <div className="w-full p-8 border-2 border-dashed border-sky-300 rounded-2xl bg-sky-50/20 text-center space-y-3">
                  <div className="font-serif italic text-3xl font-bold text-slate-800 tracking-wide">
                    {tmplSignerName}
                  </div>
                  <button type="button" onClick={() => showToast("Memilih tanda tangan digital...")} className="text-xs font-bold text-[#016DB2] hover:underline block mx-auto">
                    Ganti Tanda tangan
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">*Max Size: 5Mb, Format: jpg, png.</div>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setCurrentView("list");
                setActiveTab("template");
              }}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => setShowTmplPreviewModal(true)}
              className="px-5 py-2.5 bg-white border border-[#016DB2] text-[#016DB2] hover:bg-blue-50 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Preview Template
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentView === "create_template") {
                  setShowCreateTmplConfirmModal(true);
                } else {
                  setShowSaveTmplConfirmModal(true);
                }
              }}
              className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
            >
              Simpan Template
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS FOR POV USER: TAMBAH SERTIFIKAT BARU (LUAR LMS PORTAVERSE)
         ========================================================================= */}
      {showAddExternalCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tambah Sertifikat Baru (Luar LMS)</h3>
                  <p className="text-[11px] text-slate-500">Isi data sertifikat pelatihan yang Anda ikuti di luar LMS Portaverse.</p>
                </div>
              </div>
              <button onClick={() => setShowAddExternalCertModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Sertifikat / Pelatihan<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Certified Scrum Master (CSM) / Sertifikasi K3 Umum"
                  value={extTitle}
                  onChange={(e) => setExtTitle(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Institusi / Lembaga Penerbit<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: BNSP / PMI / Kemnaker / Coursera"
                    value={extIssuer}
                    onChange={(e) => setExtIssuer(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nomor Sertifikat / Lisensi<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: CERT-BNSP-2026-99120"
                    value={extNumber}
                    onChange={(e) => setExtNumber(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kategori / Jenis Kompetensi<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={extCategory}
                    onChange={(e) => setExtCategory(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs appearance-none pr-8 focus:outline-none focus:border-[#016DB2]"
                  >
                    <option>Keahlian / Kompetensi Teknis</option>
                    <option>Lisensi K3 &amp; Keselamatan Kerja</option>
                    <option>Kehadiran Workshop / Seminar Nasional</option>
                    <option>Sertifikasi Profesi &amp; Manajemen</option>
                    <option>Bahasa Asing &amp; Softskills</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tanggal Penerbitan<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={extIssueDate}
                    onChange={(e) => setExtIssueDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Tanggal Kadaluarsa</label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-500">
                      <input
                        type="checkbox"
                        checked={extNoExpiry}
                        onChange={(e) => setExtNoExpiry(e.target.checked)}
                        className="rounded accent-[#016DB2]"
                      />
                      <span>Seumur Hidup</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    disabled={extNoExpiry}
                    value={extExpDate}
                    onChange={(e) => setExtExpDate(e.target.value)}
                    className={`w-full p-2.5 border rounded-xl text-xs focus:outline-none ${extNoExpiry ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white border-slate-200 focus:border-[#016DB2]"
                      }`}
                  />
                </div>
              </div>

              {/* File Upload Dropzone */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Unggah Dokumen Sertifikat (PDF / JPG / PNG)<span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-purple-200 hover:border-purple-400 rounded-2xl p-5 bg-purple-50/20 text-center space-y-2 transition cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {extFileName ? extFileName : "Klik atau seret file sertifikat ke sini"}
                  </div>
                  <div className="text-[11px] text-slate-400">Maksimal 5MB (Format: PDF, JPG, PNG)</div>
                  <button
                    type="button"
                    onClick={() => setExtFileName("sertifikat_eksternal_terverifikasi.pdf")}
                    className="px-3 py-1 bg-white border border-purple-300 text-purple-700 rounded-lg text-xs font-bold shadow-xs hover:bg-purple-50"
                  >
                    Pilih File dari Komputer
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan / Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Keterangan materi, nilai ujian, atau relevansi kompetensi..."
                  value={extNotes}
                  onChange={(e) => setExtNotes(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2] resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setShowAddExternalCertModal(false)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!extTitle.trim()) {
                    showToast("Harap isi Nama Sertifikat terlebih dahulu!");
                    return;
                  }
                  setShowAddExternalConfirmModal(true);
                }}
                className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Simpan Sertifikat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: KONFIRMASI TAMBAH SERTIFIKAT EKSTERNAL */}
      {showAddExternalConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi Tambah Sertifikat</h3>
              <button onClick={() => setShowAddExternalConfirmModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-xs text-slate-600 leading-relaxed space-y-2">
              <p>Apakah Anda yakin data sertifikat eksternal luar LMS ini sudah benar dan sesuai dokumen asli?</p>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                <b>{extTitle || "Sertifikat Eksternal"}</b><br />
                <span className="text-[11px] text-slate-500">Penerbit: {extIssuer || "BNSP / Lembaga Eksternal"}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button onClick={() => setShowAddExternalConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                Batal
              </button>
              <button onClick={handleConfirmAddExternalCert} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUKSES TAMBAH SERTIFIKAT EKSTERNAL */}
      {showAddExternalSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Sertifikat Berhasil Ditambahkan</h3>
            <p className="text-xs text-slate-400 mt-1">Sertifikat luar LMS berhasil disimpan ke dalam daftar Sertifikat Saya.</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS FOR POV USER: SINKRONISASI (ASYNC) SERTIFIKAT SAYA
         ========================================================================= */}
      {showUserSyncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#016DB2]" />
                <h3 className="font-bold text-slate-900 text-sm">Sinkronisasi Sertifikat Saya</h3>
              </div>
              <button onClick={() => setShowUserSyncModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="text-slate-600 font-medium leading-relaxed">
                Pilih sumber data terintegrasi untuk memperbarui riwayat sertifikasi atas nama <b>Aan Sukwinandi (11002324)</b>:
              </div>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input type="checkbox" checked={userSyncLms} onChange={(e) => setUserSyncLms(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <div>
                    <span className="font-bold text-slate-800 block">LMS Portaverse (Internal LMS)</span>
                    <span className="text-[11px] text-slate-400">Kursus online, webinar, &amp; microlearning internal aplikasi</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input type="checkbox" checked={userSyncSap} onChange={(e) => setUserSyncSap(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <div>
                    <span className="font-bold text-slate-800 block">SAP HCIS Pelindo</span>
                    <span className="text-[11px] text-slate-400">Riwayat pelatihan &amp; kompetensi pegawai organik/PKWT</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input type="checkbox" checked={userSyncThanos} onChange={(e) => setUserSyncThanos(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <div>
                    <span className="font-bold text-slate-800 block">THANOS / PDS</span>
                    <span className="text-[11px] text-slate-400">Sertifikasi operator &amp; tenaga alih daya operasional</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input type="checkbox" checked={userSyncIsma} onChange={(e) => setUserSyncIsma(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <div>
                    <span className="font-bold text-slate-800 block">ISMA / Buku Pelaut Digital</span>
                    <span className="text-[11px] text-slate-400">Kualifikasi maritim, ABK &amp; sertifikasi kepelautan</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input type="checkbox" checked={userSyncBnsp} onChange={(e) => setUserSyncBnsp(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <div>
                    <span className="font-bold text-slate-800 block">Integrasi BNSP &amp; LSP Terdaftar</span>
                    <span className="text-[11px] text-slate-400">Tarik data sertifikasi profesi nasional otomatis via NIK</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button
                type="button"
                onClick={() => {
                  setShowUserSyncModal(false);
                  setShowSyncResultModal(true);
                }}
                className="text-[#016DB2] hover:underline font-semibold text-xs flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Hasil Terakhir</span>
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowUserSyncModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                  Batal
                </button>
                <button onClick={handleExecuteUserSync} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Mulai Sinkronisasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: KONFIRMASI USER SINKRONISASI */}
      {showUserSyncConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi Sinkronisasi</h3>
              <button onClick={() => setShowUserSyncConfirmModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-xs text-slate-600 leading-relaxed">
              Apakah Anda ingin melakukan sinkronisasi data sertifikat sekarang? Sistem akan memeriksa pembaruan data dari kanal eksternal yang dipilih.
            </div>
            <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button onClick={() => setShowUserSyncConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                Tidak
              </button>
              <button onClick={handleConfirmUserSync} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
                Ya, Sinkronisasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUKSES USER SINKRONISASI */}
      {showUserSyncSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 text-[#016DB2] flex items-center justify-center mb-3">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Sukses Sinkronisasi Sertifikat</h3>
            <p className="text-xs text-slate-400 mt-1">Data sertifikasi terbaru dari SAP HCM &amp; BNSP berhasil diperbarui.</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL MODALS (PREVIEWS, TEMPLATE MODALS, GENERAL SYNC)
         ========================================================================= */}

      {/* MODAL: PREVIEW SERTIFIKAT */}
      {showCertPreviewModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Preview Sertifikat</h3>
              <button onClick={() => setShowCertPreviewModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 bg-slate-100 flex justify-center">
              <div className="w-full bg-white border-4 border-[#016DB2] rounded-xl p-8 text-center shadow-lg relative cert-pattern-bg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left text-[10px] font-black tracking-widest text-[#016DB2]">
                    {previewCertData?.isExternal ? "SERTIFIKASI EKSTERNAL" : "BUMN • PELINDO"}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-800">
                      {previewCertData?.issuer ? previewCertData.issuer : "PELINDO"}
                    </div>
                    <div className="text-[7px] text-slate-400 font-semibold">
                      {previewCertData?.isExternal ? "TERVERIFIKASI RESMI" : "PEMBELAJARAN & KONSULTANSI"}
                    </div>
                  </div>
                </div>
                <div className="text-xl font-black text-slate-900 tracking-wider mt-4">CERTIFICATE</div>
                <div className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
                  {previewCertData?.type === "competency" ? "OF COMPETENCE" : "OF ATTENDANCE"}
                </div>
                <div className="text-[10px] text-slate-400 mt-4">Diberikan kepada :</div>
                <div className="text-base font-black text-[#016DB2] my-1">
                  {previewCertData?.name || "Aan Sukwinandi"}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{previewCertData?.nipp || "11002324"}</div>
                <div className="text-[10px] text-slate-600 mt-3 max-w-md mx-auto leading-relaxed">
                  Atas partisipasinya sebagai peserta dalam program pelatihan / sertifikasi:<br />
                  <b className="text-slate-800 font-bold">{previewCertData?.title || previewCertData?.course || certValueName}</b>
                </div>
                <div className="text-[8px] text-slate-400 mt-2">
                  Diterbitkan oleh : {previewCertData?.issuer || "Pelindo Corporate University • PT PMLI"}
                </div>
                <div className="flex justify-between items-end mt-8 px-4 text-left">
                  <div>
                    <div className="text-[9px] font-black text-slate-700">AKHLAK</div>
                    <div className="text-[7px] text-slate-400">Amanah &bull; Kompeten &bull; Harmonis</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif italic text-sm font-bold text-slate-800">
                      {previewCertData?.issuer ? previewCertData.issuer : "Robert Santoso Ibrahim"}
                    </div>
                    <div className="text-[9px] font-bold text-[#016DB2] border-t border-slate-300 pt-0.5 mt-0.5">
                      Direktur / Authorized Signer
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-6 py-3 border-t border-slate-100 bg-slate-50 gap-2">
              <button
                onClick={() => {
                  showToast(`Mengunduh file sertifikat ${previewCertData?.title || "sertifikat"}.pdf...`);
                }}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button onClick={() => setShowCertPreviewModal(false)} className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW TEMPLATE */}
      {showTmplPreviewModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Preview Template</h3>
              <button onClick={() => setShowTmplPreviewModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 bg-slate-100 flex justify-center">
              <div className="w-full bg-white border-4 border-[#016DB2] rounded-xl p-8 text-center shadow-lg relative cert-pattern-bg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left text-[10px] font-black tracking-widest text-[#016DB2]">BUMN &bull; PELINDO</div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-800">PELINDO</div>
                    <div className="text-[7px] text-slate-400 font-semibold">PEMBELAJARAN &amp; KONSULTANSI</div>
                  </div>
                </div>
                <div className="text-xl font-black text-slate-900 tracking-wider mt-6">CERTIFICATE</div>
                <div className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">OF COMPLETION</div>
                <div className="h-16 flex items-center justify-center text-xs text-slate-400 italic">
                  [Area Dinamis Nama Peserta &amp; Materi Pelatihan]
                </div>
                <div className="flex justify-between items-end mt-8 px-4 text-left">
                  <div>
                    <div className="text-[9px] font-black text-slate-700">AKHLAK</div>
                    <div className="text-[7px] text-slate-400">Amanah &bull; Kompeten &bull; Harmonis</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif italic text-sm font-bold text-slate-800">{tmplSignerName}</div>
                    <div className="text-[9px] font-bold text-[#016DB2] border-t border-slate-300 pt-0.5 mt-0.5">{tmplSignerName}</div>
                    <div className="text-[8px] text-slate-500">{tmplSignerTitle}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button onClick={() => setShowTmplPreviewModal(false)} className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SINKRONISASI UMUM (ADMIN / SUBCON / VENDOR) */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Sinkronisasi Multi-Kanal</h3>
              <button onClick={() => setShowSyncModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="text-slate-500 font-medium">Pilih kanal database yang ingin disinkronkan:</div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="checkbox" checked={syncLms} onChange={(e) => setSyncLms(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <span className="font-bold text-slate-800">LMS Portaverse <span className="font-normal text-slate-500">(Aplikasi Internal LMS / Kursus Online)</span></span>
                </label>
                <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="checkbox" checked={syncSap} onChange={(e) => setSyncSap(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <span className="font-bold text-slate-800">SAP <span className="font-normal text-slate-500">(Pegawai Organik / PKWT)</span></span>
                </label>
                <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="checkbox" checked={syncThanos} onChange={(e) => setSyncThanos(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <span className="font-bold text-slate-800">THANOS/PDS <span className="font-normal text-slate-500">(Tenaga Alih Daya / Operator)</span></span>
                </label>
                <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="checkbox" checked={syncIsma} onChange={(e) => setSyncIsma(e.target.checked)} className="w-4 h-4 rounded accent-[#016DB2]" />
                  <span className="font-bold text-slate-800">ISMA <span className="font-normal text-slate-500">(ABK / Seafarer)</span></span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button
                type="button"
                onClick={() => {
                  setShowSyncModal(false);
                  setShowSyncResultModal(true);
                }}
                className="text-[#016DB2] hover:underline font-semibold text-xs flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Hasil Terakhir</span>
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowSyncModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                  Tidak
                </button>
                <button onClick={handleExecuteSync} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
                  Sinkronisasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: KONFIRMASI SINKRONISASI UMUM */}
      {showSyncConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi</h3>
              <button onClick={() => setShowSyncConfirmModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-xs text-slate-600 leading-relaxed">
              Apakah anda yakin untuk Sinkronisasi daftar template dan sertifikat ini?
            </div>
            <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button onClick={() => setShowSyncConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                Tidak
              </button>
              <button onClick={handleConfirmSync} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
                Ya, Sinkronisasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUKSES SINKRONISASI UMUM */}
      {showSyncSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 text-[#016DB2] flex items-center justify-center mb-3">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Sukses Synchronize</h3>
            <p className="text-xs text-slate-400 mt-1">Data sertifikat multi-kanal berhasil ditarik dan disinkronkan.</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: PREVIEW HASIL SINKRONISASI MULTI-KANAL (TAB SUMBER & CARD PAGINATION)
         ========================================================================= */}
      {showSyncResultModal && (() => {
        // Channels checked
        const hasLms = syncLms || userSyncLms;
        const hasSap = syncSap || userSyncSap;
        const hasThanos = syncThanos || userSyncThanos;
        const hasIsma = syncIsma || userSyncIsma;

        // Base items based on checked channels
        const baseSyncedItems = SYNCED_MOCK_CERTS.filter((item) => {
          if (item.source.includes("LMS") && hasLms) return true;
          if (item.source.includes("SAP") && hasSap) return true;
          if (item.source.includes("THANOS") && hasThanos) return true;
          if (item.source.includes("ISMA") && hasIsma) return true;
          return false;
        });

        // Tab Counts
        const countTotal = baseSyncedItems.length;
        const countLms = baseSyncedItems.filter(i => i.source.includes("LMS")).length;
        const countSap = baseSyncedItems.filter(i => i.source.includes("SAP")).length;
        const countThanos = baseSyncedItems.filter(i => i.source.includes("THANOS")).length;
        const countIsma = baseSyncedItems.filter(i => i.source.includes("ISMA")).length;

        // Filter by active tab
        let tabFilteredItems = baseSyncedItems;
        if (syncResultActiveTab === "LMS") {
          tabFilteredItems = baseSyncedItems.filter(i => i.source.includes("LMS"));
        } else if (syncResultActiveTab === "SAP") {
          tabFilteredItems = baseSyncedItems.filter(i => i.source.includes("SAP"));
        } else if (syncResultActiveTab === "THANOS") {
          tabFilteredItems = baseSyncedItems.filter(i => i.source.includes("THANOS"));
        } else if (syncResultActiveTab === "ISMA") {
          tabFilteredItems = baseSyncedItems.filter(i => i.source.includes("ISMA"));
        }

        // Filter by search query & status filter
        const finalFilteredItems = tabFilteredItems.filter(i => {
          const matchSearch =
            i.title.toLowerCase().includes(syncResultSearch.toLowerCase()) ||
            i.name.toLowerCase().includes(syncResultSearch.toLowerCase()) ||
            i.nipp.toLowerCase().includes(syncResultSearch.toLowerCase());
          const matchStatus = syncResultStatusFilter === "Semua" || i.status === syncResultStatusFilter;
          return matchSearch && matchStatus;
        });

        // Pagination calculation
        const totalItems = finalFilteredItems.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / syncResultItemsPerPage));
        const safeCurrentPage = Math.min(syncResultPage, totalPages);
        const startIndex = (safeCurrentPage - 1) * syncResultItemsPerPage;
        const endIndex = Math.min(startIndex + syncResultItemsPerPage, totalItems);
        const paginatedItems = finalFilteredItems.slice(startIndex, endIndex);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-3 sm:p-4 md:p-6 animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95">

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 text-[#016DB2] flex items-center justify-center shadow-2xs shrink-0">
                    <Database className="w-5 h-5 text-[#016DB2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base md:text-lg text-slate-900">
                        Preview Hasil Sinkronisasi Multi-Kanal
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Sinkron Sukses
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Menampilkan data sertifikat yang berhasil ditarik dari basis data terintegrasi Pelindo.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSyncResultModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Summary Ribbon */}
              <div className="bg-gradient-to-r from-sky-50/90 via-blue-50/60 to-slate-50 border-b border-sky-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-500 font-medium">Total Ditemukan:</span>
                  <span className="font-black text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-sky-200 shadow-2xs">
                    {countTotal} Sertifikat
                  </span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {hasLms && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-100 text-[#016DB2] border border-sky-200">
                        LMS: {countLms}
                      </span>
                    )}
                    {hasSap && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-[#016DB2] border border-blue-200">
                        SAP: {countSap}
                      </span>
                    )}
                    {hasThanos && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                        THANOS: {countThanos}
                      </span>
                    )}
                    {hasIsma && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-100 text-teal-700 border border-teal-200">
                        ISMA: {countIsma}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Waktu: 09 September 2026, 09:18 WIB</span>
                </div>
              </div>

              {/* TAB SUMBER DATA (BARIS TERPISAH) */}
              <div className="px-6 pt-3 pb-0 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-2 overflow-x-auto pb-3 text-xs font-bold scrollbar-thin">
                  <button
                    type="button"
                    onClick={() => {
                      setSyncResultActiveTab("Semua");
                      setSyncResultPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${syncResultActiveTab === "Semua"
                        ? "bg-[#016DB2] text-white shadow-xs font-bold"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-semibold"
                      }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Semua Kanal</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${syncResultActiveTab === "Semua" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                      {countTotal}
                    </span>
                  </button>

                  {hasLms && (
                    <button
                      type="button"
                      onClick={() => {
                        setSyncResultActiveTab("LMS");
                        setSyncResultPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${syncResultActiveTab === "LMS"
                          ? "bg-[#016DB2] text-white shadow-xs font-bold"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-semibold"
                        }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>LMS Portaverse (Internal)</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${syncResultActiveTab === "LMS" ? "bg-white/20 text-white" : "bg-sky-100 text-[#016DB2]"
                        }`}>
                        {countLms}
                      </span>
                    </button>
                  )}

                  {hasSap && (
                    <button
                      type="button"
                      onClick={() => {
                        setSyncResultActiveTab("SAP");
                        setSyncResultPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${syncResultActiveTab === "SAP"
                          ? "bg-[#016DB2] text-white shadow-xs font-bold"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-semibold"
                        }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>SAP (Organik / PKWT)</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${syncResultActiveTab === "SAP" ? "bg-white/20 text-white" : "bg-blue-100 text-[#016DB2]"
                        }`}>
                        {countSap}
                      </span>
                    </button>
                  )}

                  {hasThanos && (
                    <button
                      type="button"
                      onClick={() => {
                        setSyncResultActiveTab("THANOS");
                        setSyncResultPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${syncResultActiveTab === "THANOS"
                          ? "bg-purple-700 text-white shadow-xs font-bold"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-semibold"
                        }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>THANOS / PDS (Tenaga Alih Daya)</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${syncResultActiveTab === "THANOS" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"
                        }`}>
                        {countThanos}
                      </span>
                    </button>
                  )}

                  {hasIsma && (
                    <button
                      type="button"
                      onClick={() => {
                        setSyncResultActiveTab("ISMA");
                        setSyncResultPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${syncResultActiveTab === "ISMA"
                          ? "bg-teal-700 text-white shadow-xs font-bold"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-semibold"
                        }`}
                    >
                      <Award className="w-4 h-4" />
                      <span>ISMA (ABK / Seafarer)</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${syncResultActiveTab === "ISMA" ? "bg-white/20 text-white" : "bg-teal-100 text-teal-700"
                        }`}>
                        {countIsma}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* TOOLBAR FILTER & SEARCH (BARIS TERPISAH) */}
              <div className="px-6 py-3 border-b border-slate-200 bg-slate-50/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Search Field */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari berdasarkan nama pegawai, NIPP, atau judul sertifikat..."
                      value={syncResultSearch}
                      onChange={(e) => {
                        setSyncResultSearch(e.target.value);
                        setSyncResultPage(1);
                      }}
                      className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2] shadow-2xs transition"
                    />
                    {syncResultSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setSyncResultSearch("");
                          setSyncResultPage(1);
                        }}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Filter & Reset Buttons */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <select
                        value={syncResultStatusFilter}
                        onChange={(e) => {
                          setSyncResultStatusFilter(e.target.value);
                          setSyncResultPage(1);
                        }}
                        className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 appearance-none pr-8 focus:outline-none focus:border-[#016DB2] shadow-2xs cursor-pointer"
                      >
                        <option value="Semua">Status: Semua Status</option>
                        <option value="Diterbitkan">Status: Diterbitkan / Aktif</option>
                        <option value="Kadaluarsa">Status: Kadaluarsa</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                    </div>

                    {(syncResultSearch || syncResultStatusFilter !== "Semua") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSyncResultSearch("");
                          setSyncResultStatusFilter("Semua");
                          setSyncResultPage(1);
                        }}
                        className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition whitespace-nowrap"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Body: Card-Card Grid & Pagination */}
              <div className="p-6 md:p-7 overflow-y-auto flex-1 space-y-6 bg-slate-50/50">
                {paginatedItems.length === 0 ? (
                  <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-2">
                    <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="font-bold text-sm text-slate-800">Tidak ada sertifikat ditemukan</h4>
                    <p className="text-xs text-slate-400">Silakan ubah kata kunci pencarian atau ganti filter sumber kanal.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paginatedItems.map((item) => {
                      const isLms = item.source.includes("LMS");
                      const isSap = item.source.includes("SAP");
                      const isThanos = item.source.includes("THANOS");
                      const isIsma = item.source.includes("ISMA");

                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
                        >
                          {/* Mini Certificate Card Mockup */}
                          <div
                            onClick={() => handleOpenCertPreview(item)}
                            className="p-3 bg-slate-50/80 border-b border-slate-100 cursor-pointer relative"
                          >
                            <div className="w-full h-32 bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col justify-between text-center relative overflow-hidden shadow-2xs group-hover:border-[#016DB2] transition">
                              <div className="flex items-center justify-between text-[7px] font-bold text-slate-600">
                                <span className="text-[#016DB2]">BUMN &bull; PELINDO</span>
                                <span className="text-slate-400">PMLI</span>
                              </div>
                              <div>
                                <div className="text-[9px] font-black tracking-wider text-slate-800 uppercase">
                                  CERTIFICATE
                                </div>
                                <div className="text-[6.5px] text-slate-400 font-semibold tracking-widest uppercase">
                                  {item.type === "competency" ? "OF COMPETENCY" : item.type === "completion" ? "OF COMPLETION" : "OF ATTENDANCE"}
                                </div>
                              </div>
                              <div className="my-0.5">
                                <div className="text-[6px] text-slate-400">Diberikan kepada:</div>
                                <div className="text-[8px] font-bold text-[#016DB2] truncate">{item.name}</div>
                                <div className="text-[6px] text-slate-400">{item.nipp}</div>
                              </div>
                              <div className="flex justify-between items-end text-[6px] text-slate-400 border-t border-slate-100 pt-0.5">
                                <span className="font-semibold text-[6.5px]">AKHLAK</span>
                                <span className="font-serif italic font-bold text-slate-700">Robert S. Ibrahim</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Content Details */}
                          <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${isLms
                                    ? "bg-sky-50 text-[#016DB2] border-sky-200"
                                    : isSap
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : isThanos
                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                        : "bg-teal-50 text-teal-700 border-teal-200"
                                  }`}>
                                  {isLms ? "LMS PORTAVERSE" : isSap ? "SAP HCIS" : isThanos ? "THANOS/PDS" : "ISMA SEAFARER"}
                                </span>

                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${item.status === "Diterbitkan"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                  }`}>
                                  {item.status}
                                </span>
                              </div>

                              <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                                {item.title}
                              </h4>

                              <div className="text-[11px] text-slate-600 font-medium">
                                {item.name} <span className="text-slate-400">•</span> <span className="font-mono text-slate-500">{item.nipp}</span>
                              </div>

                              <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5">
                                <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{item.date}</span>
                              </div>
                            </div>

                            {/* Card Actions */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenCertPreview(item)}
                                className="flex-1 py-1.5 px-2 bg-sky-50 hover:bg-sky-100 text-[#016DB2] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Lihat Preview</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => showToast(`Mengunduh ${item.title} - ${item.name}.pdf...`)}
                                className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-[11px] font-semibold transition border border-slate-200"
                                title="Unduh Sertifikat"
                              >
                                <Download className="w-3.5 h-3.5 text-slate-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination Controls */}
                {totalItems > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-2xs">
                    <div className="font-medium text-slate-500">
                      Menampilkan <b className="text-slate-800">{startIndex + 1} - {endIndex}</b> dari <b className="text-slate-800">{totalItems}</b> sertifikat
                      {syncResultActiveTab !== "Semua" && (
                        <span className="text-slate-400"> (Kanal: {syncResultActiveTab})</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSyncResultPage(prev => Math.max(1, prev - 1))}
                        disabled={safeCurrentPage === 1}
                        className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold flex items-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Sebelumnya</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => setSyncResultPage(pageNum)}
                            className={`w-8 h-8 rounded-xl font-bold text-xs transition ${safeCurrentPage === pageNum
                                ? "bg-[#016DB2] text-white shadow-xs"
                                : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700"
                              }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSyncResultPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={safeCurrentPage === totalPages}
                        className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold flex items-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
                      >
                        <span>Selanjutnya</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 bg-white">
                <button
                  type="button"
                  onClick={() => showToast("Mengunduh Rekapitulasi Hasil Sinkronisasi Multi-Kanal (18 data .xlsx)...")}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Unduh Rekap Sinkronisasi (.xlsx)</span>
                </button>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setShowSyncResultModal(false)}
                    className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition"
                  >
                    Tutup
                  </button>

                  <button
                    type="button"
                    onClick={handleApplySyncToMainList}
                    className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Terapkan ke Daftar Semua Sertifikat</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* MODAL: KONFIRMASI BUAT SERTIFIKAT */}
      {showCreateCertConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi</h3>
              <button onClick={() => setShowCreateCertConfirmModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-xs text-slate-600 leading-relaxed">
              Apakah anda yakin untuk Membuat Sertifikat ini?
            </div>
            <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button onClick={() => setShowCreateCertConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                Tidak
              </button>
              <button onClick={handleConfirmCreateCert} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
                Ya, Buat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUKSES BUAT SERTIFIKAT */}
      {showCreateCertSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Sukses Membuat Sertifikat Baru</h3>
            <p className="text-xs text-slate-400 mt-1">Sertifikat telah diterbitkan dan tersimpan di database.</p>
          </div>
        </div>
      )}

      {/* MODAL: KONFIRMASI BUAT TEMPLATE */}
      {showCreateTmplConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi</h3>
              <button onClick={() => setShowCreateTmplConfirmModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-xs text-slate-600 leading-relaxed">
              Apakah anda yakin untuk Membuat daftar template ini?
            </div>
            <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button onClick={() => setShowCreateTmplConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                Tidak
              </button>
              <button onClick={handleConfirmCreateTemplate} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
                Ya, Buat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUKSES BUAT TEMPLATE */}
      {showCreateTmplSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Sukses Membuat Template Sertifikat</h3>
            <p className="text-xs text-slate-400 mt-1">Template sertifikat baru berhasil ditambahkan.</p>
          </div>
        </div>
      )}

      {/* MODAL: KONFIRMASI SIMPAN TEMPLATE */}
      {showSaveTmplConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi</h3>
              <button onClick={() => setShowSaveTmplConfirmModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-xs text-slate-600 leading-relaxed">
              Apakah anda yakin untuk Menyimpan perubahan template ini?
            </div>
            <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button onClick={() => setShowSaveTmplConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold">
                Tidak
              </button>
              <button onClick={handleConfirmSaveTemplate} className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUKSES SIMPAN TEMPLATE */}
      {showSaveTmplSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Sukses Menyimpan Template Sertifikat</h3>
            <p className="text-xs text-slate-400 mt-1">Perubahan template sertifikat telah diperbarui.</p>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[90] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-5 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
