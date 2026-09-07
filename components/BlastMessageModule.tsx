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
  FileText,
  Mail,
  Bell,
  RefreshCw,
  Edit3,
  ExternalLink,
  Layers,
  ChevronRight
} from "lucide-react";

export interface BlastItem {
  id: string;
  no: number;
  judul: string;
  modul: "KMS" | "LMS" | "TMS" | "IMS" | "PMS" | "CMS" | "EM";
  menu: string;
  priority: "Important" | "Normal";
  targetCount: number;
  targetLabel: string;
  jenisJadwal: "Scheduled" | "Immediate";
  waktuKirim: string;
  createdBy: string;
  createdDate: string;
  status: "Scheduled" | "Terkirim" | "Gagal Terkirim" | "Draft";
  channels: ("Push Notification" | "Email")[];
  deskripsi: string;
  content: string;
  imageFileName: string;
  attachmentFileName: string;
  roles: string[];
  entities: string[];
  organizations: string[];
  users: string[];
  logs: {
    date: string;
    time: string;
    text: string;
    type: "success" | "info" | "error" | "warning";
  }[];
}

export interface TargetRecipient {
  no: number;
  name: string;
  nipp: string;
  email: string;
  pushStatus: "Sukses" | "Partial" | "Gagal";
  emailStatus: "Sukses" | "Gagal";
  keterangan: string;
}

const INITIAL_BLASTS: BlastItem[] = [
  {
    id: "BLST-01",
    no: 1,
    judul: "Update Portaverse KMS Social Media",
    modul: "KMS",
    menu: "Communities of Practice",
    priority: "Important",
    targetCount: 1000,
    targetLabel: "1000+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Scheduled",
    channels: ["Push Notification", "Email"],
    deskripsi: "Evaluasi Keamanan: Sudah Siap Menutup Tahun? Tinjau celah keamanan sebelum tahun baru.",
    content: "Saatnya rutin evaluasi kebijakan dan prosedur keamanan sebelum masuk ke tahun baru! 📋 Tinjau kembali celah keamanan, insiden yang terjadi, hasil audit, dan temuan red/blue team untuk menentukan prioritas perbaikan. 🔍🛡️\n\nPerbarui kontrol keamanan yang sudah tidak relevan, pastikan semuanya tetap up-to-date, dan tetapkan prioritas peningkatan keamanan untuk tahun berikutnya. Evaluasi yang menyeluruh akan bikin pertahanan makin kuat dan merata di seluruh organisasi. 💼✨\n\nTinjau kebijakan, identifikasi kelemahan, dan perbarui langkah pengamanan Anda agar lebih siap menghadapi ancaman tahun depan. 🔥 Persiapkan keamanan sistem Anda sejak sekarang! 🔒🚀\n\n#EvaluasiKeamanan #TinjauKebijakan #IdentifikasiKelemahan",
    imageFileName: "Gambar.png",
    attachmentFileName: "Kebijakan_Keamanan_2026.pdf",
    roles: ["HO_SuperAdmin", "Admin_KMS", "Admin_LMS", "Admin_TMS"],
    entities: ["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "+30 More"],
    organizations: ["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "+30 More"],
    users: ["Hermansyah", "Yogi Muhammad Irshad", "Ricky Abdulla", "Afif Tahjudin", "+10 More"],
    logs: [
      { date: "20/05/2024", time: "10:00", text: "Scheduled oleh Herman Lukman Santoso (Akan dikirim pada 26/09/2025 12:00)", type: "info" }
    ]
  },
  {
    id: "BLST-02",
    no: 2,
    judul: "Pemberitahuan Untuk Reset password",
    modul: "KMS",
    menu: "User Account & Security",
    priority: "Normal",
    targetCount: 300,
    targetLabel: "300+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Terkirim",
    channels: ["Push Notification", "Email"],
    deskripsi: "Pemberitahuan berkala untuk melakukan pembaruan kata sandi akun SSO Portaverse.",
    content: "Halo Insan Pelindo, Demi menjaga keamanan akses sistem internal, mohon segera perbarui password akun Portaverse Anda secara berkala sesuai standar kompleksitas kata sandi Pelindo.",
    imageFileName: "Security_Notice.png",
    attachmentFileName: "",
    roles: ["HO_SuperAdmin", "Admin_LMS", "Admin_TMS"],
    entities: ["PT Pelabuhan Indonesia", "PT Pelindo Solusi Logistik"],
    organizations: ["PT Pelabuhan Indonesia"],
    users: ["Hermansyah", "Yogi Muhammad Irshad"],
    logs: [
      { date: "20/01/2026", time: "12:00", text: "Blast selesai dikirim (200 Penerima)", type: "success" },
      { date: "20/01/2026", time: "12:00", text: "Blast mulai dikirim oleh Herman Lukman Santoso", type: "info" }
    ]
  },
  {
    id: "BLST-03",
    no: 3,
    judul: "Pemberitahuan Keamanan Segmentasi Jaringan",
    modul: "KMS",
    menu: "IT & Infrastructure",
    priority: "Normal",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Terkirim",
    channels: ["Email"],
    deskripsi: "Pemberitahuan pemeliharaan segmentasi jaringan internal pelabuhan.",
    content: "Diinformasikan kepada seluruh unit kerja terkait akan adanya implementasi firewall dan isolasi segmentasi jaringan operasional terminal.",
    imageFileName: "Network_Plan.png",
    attachmentFileName: "SOP_Jaringan.pdf",
    roles: ["Admin_KMS", "Admin_TMS"],
    entities: ["PT Pelindo Terminal Petikemas"],
    organizations: ["Divisi TI"],
    users: ["Ricky Abdulla", "Afif Tahjudin"],
    logs: [
      { date: "20/01/2026", time: "12:00", text: "Blast selesai dikirim (40 Penerima)", type: "success" },
      { date: "20/01/2026", time: "12:00", text: "Blast mulai dikirim oleh Herman Lukman Santoso", type: "info" }
    ]
  },
  {
    id: "BLST-04",
    no: 4,
    judul: "Pemberitahuan Update KPI Dictionary",
    modul: "KMS",
    menu: "Performance Management",
    priority: "Important",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Terkirim",
    channels: ["Push Notification", "Email"],
    deskripsi: "Kamus KPI 2026 telah diperbarui di modul KMS dan PMS.",
    content: "Seluruh tim HC dan PIC Kinerja dapat mengunduh dokumen KPI Dictionary versi 2026 melalui repository resmi KMS.",
    imageFileName: "KPI_Dict.png",
    attachmentFileName: "Kamus_KPI_2026.pdf",
    roles: ["HO_SuperAdmin", "Admin_KMS"],
    entities: ["PT Pelabuhan Indonesia"],
    organizations: ["Biro SDM"],
    users: ["Hermansyah", "Afif Tahjudin"],
    logs: [
      { date: "20/01/2026", time: "12:00", text: "Blast selesai dikirim (40 Penerima)", type: "success" },
      { date: "20/01/2026", time: "12:00", text: "Blast mulai dikirim oleh Herman Lukman Santoso", type: "info" }
    ]
  },
  {
    id: "BLST-05",
    no: 5,
    judul: "Pemberitahuan Update KPI Dictionary (Batch 2)",
    modul: "KMS",
    menu: "Performance Management",
    priority: "Important",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Gagal Terkirim",
    channels: ["Push Notification", "Email"],
    deskripsi: "Gagal mengirimkan notifikasi karena token gateway FCM terputus.",
    content: "Pengiriman pesan massal mengalami kendala koneksi timeout pada server gateway pihak ketiga.",
    imageFileName: "",
    attachmentFileName: "",
    roles: ["Admin_KMS"],
    entities: ["PT Pelabuhan Indonesia"],
    organizations: ["Biro SDM"],
    users: ["Hermansyah"],
    logs: [
      { date: "15/05/2024", time: "12:00", text: "Edited oleh Admin PMS (Status Gagal Terkirim)", type: "error" },
      { date: "24/09/2025", time: "10:00", text: "Draft oleh Herman Lukman Santoso", type: "info" }
    ]
  },
  {
    id: "BLST-06",
    no: 6,
    judul: "Pemberitahuan Update KPI Dictionary (Batch 3)",
    modul: "KMS",
    menu: "Performance Management",
    priority: "Important",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Gagal Terkirim",
    channels: ["Email"],
    deskripsi: "Gagal mengirimkan email broadcast ke domain eksternal.",
    content: "Terdeteksi bounce rate tinggi pada alamat email penerima non-aktif.",
    imageFileName: "",
    attachmentFileName: "",
    roles: ["Admin_KMS"],
    entities: ["PT Pelindo Solusi Logistik"],
    organizations: ["Divisi Operasi"],
    users: ["Ricky Abdulla"],
    logs: [
      { date: "15/05/2024", time: "12:00", text: "Gagal dikirimkan oleh SMTP Gateway", type: "error" }
    ]
  },
  {
    id: "BLST-07",
    no: 7,
    judul: "Pemberitahuan Update KPI Dictionary (Batch 4)",
    modul: "KMS",
    menu: "Performance Management",
    priority: "Important",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Gagal Terkirim",
    channels: ["Push Notification"],
    deskripsi: "Gagal mengirimkan notifikasi.",
    content: "Koneksi terputus.",
    imageFileName: "",
    attachmentFileName: "",
    roles: ["Admin_KMS"],
    entities: ["PT Pelabuhan Indonesia"],
    organizations: ["Biro SDM"],
    users: ["Hermansyah"],
    logs: [
      { date: "15/05/2024", time: "12:00", text: "Gagal Terkirim ke 40 target", type: "error" }
    ]
  }
];

const INITIAL_DRAFTS: BlastItem[] = [
  {
    id: "DRFT-01",
    no: 1,
    judul: "Update Portaverse KMS Social Media (Draft)",
    modul: "KMS",
    menu: "Communities of Practice",
    priority: "Important",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Draft",
    channels: ["Push Notification", "Email"],
    deskripsi: "Lorem Ipsum sol Do lor Mame",
    content: "Saatnya rutin evaluasi kebijakan dan prosedur keamanan sebelum masuk ke tahun baru! 📋 Tinjau kembali celah keamanan, insiden yang terjadi, hasil audit, dan temuan red/blue team untuk menentukan prioritas perbaikan.",
    imageFileName: "Gambar.png",
    attachmentFileName: "",
    roles: ["HO_SuperAdmin", "Admin_KMS", "Admin_LMS", "Admin_TMS", "Admin_TMS", "Admin_TMS"],
    entities: ["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "+30 More"],
    organizations: ["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "+30 More"],
    users: ["Hemansyah", "Yogi Muhammad Irshad", "Ricky Abdulla", "Afif Tahjudin", "+10 More"],
    logs: [
      { date: "18/02/2025", time: "10:00", text: "Draft oleh Herman Lukman Santoso", type: "info" }
    ]
  },
  {
    id: "DRFT-02",
    no: 2,
    judul: "Pemberitahuan Untuk Reset password (Draft)",
    modul: "KMS",
    menu: "User Account & Security",
    priority: "Normal",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "26/09/2025 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Draft",
    channels: ["Email"],
    deskripsi: "Pemberitahuan reset password",
    content: "Mohon reset password Anda.",
    imageFileName: "",
    attachmentFileName: "",
    roles: ["Admin_KMS"],
    entities: ["PT Pelabuhan Indonesia"],
    organizations: ["PT Pelabuhan Indonesia"],
    users: ["Hemansyah"],
    logs: [
      { date: "18/02/2025", time: "10:00", text: "Draft oleh Herman Lukman Santoso", type: "info" }
    ]
  },
  {
    id: "DRFT-03",
    no: 3,
    judul: "Pemberitahuan Keamanan Segmentasi Jaringan (Draft)",
    modul: "KMS",
    menu: "IT & Infrastructure",
    priority: "Normal",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "06/01/2026 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Draft",
    channels: ["Push Notification"],
    deskripsi: "Segmentasi Jaringan",
    content: "Pemberitahuan segmentasi jaringan.",
    imageFileName: "",
    attachmentFileName: "",
    roles: ["Admin_KMS"],
    entities: ["PT Pelabuhan Indonesia"],
    organizations: ["PT Pelabuhan Indonesia"],
    users: ["Hemansyah"],
    logs: [
      { date: "18/02/2025", time: "10:00", text: "Draft oleh Herman Lukman Santoso", type: "info" }
    ]
  },
  {
    id: "DRFT-04",
    no: 4,
    judul: "Pemberitahuan Update KPI DIctionary (Draft)",
    modul: "KMS",
    menu: "Performance Management",
    priority: "Important",
    targetCount: 40,
    targetLabel: "40+ Target",
    jenisJadwal: "Scheduled",
    waktuKirim: "06/01/2026 12:00",
    createdBy: "Herman Lukman Santoso",
    createdDate: "26/09/2025 12:00",
    status: "Draft",
    channels: ["Push Notification", "Email"],
    deskripsi: "Update kamus KPI",
    content: "Kamus KPI telah diperbarui.",
    imageFileName: "",
    attachmentFileName: "",
    roles: ["Admin_KMS"],
    entities: ["PT Pelabuhan Indonesia"],
    organizations: ["PT Pelabuhan Indonesia"],
    users: ["Hemansyah"],
    logs: [
      { date: "18/02/2025", time: "10:00", text: "Draft oleh Herman Lukman Santoso", type: "info" }
    ]
  }
];

const MOCK_TARGET_RECIPIENTS: TargetRecipient[] = [
  {
    no: 1,
    name: "HENDRA LUKMAN SANTOSO",
    nipp: "105320",
    email: "hendra@pelindo.co.id",
    pushStatus: "Partial",
    emailStatus: "Gagal",
    keterangan: "Token FCM not found and Email not found"
  },
  {
    no: 2,
    name: "HENDRA LUKMAN SANTOSO",
    nipp: "105320",
    email: "hendra@pelindo.co.id",
    pushStatus: "Sukses",
    emailStatus: "Gagal",
    keterangan: "Email Not Found"
  },
  {
    no: 3,
    name: "HENDRA LUKMAN SANTOSO",
    nipp: "105320",
    email: "hendra@pelindo.co.id",
    pushStatus: "Sukses",
    emailStatus: "Sukses",
    keterangan: "Sukses"
  },
  {
    no: 4,
    name: "HENDRA LUKMAN SANTOSO",
    nipp: "105320",
    email: "hendra@pelindo.co.id",
    pushStatus: "Sukses",
    emailStatus: "Sukses",
    keterangan: "Sukses"
  },
  {
    no: 5,
    name: "HENDRA LUKMAN SANTOSO",
    nipp: "105320",
    email: "hendra@pelindo.co.id",
    pushStatus: "Sukses",
    emailStatus: "Sukses",
    keterangan: "Sukses"
  }
];

export default function BlastMessageModule() {
  // Views: "list" | "create" | "edit" | "view"
  const [currentView, setCurrentView] = useState<"list" | "create" | "edit" | "view">("list");
  const [mainTab, setMainTab] = useState<"Daftar Blast Message" | "Draft">("Daftar Blast Message");
  const [selectedModulHeader, setSelectedModulHeader] = useState<string>("KMS");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Active Blast Item for Edit/View/Log/Target Modal
  const [activeBlast, setActiveBlast] = useState<BlastItem>(INITIAL_BLASTS[0]);

  // Form State
  const [formJudul, setFormJudul] = useState("Evaluasi Keamanan: Sudah Siap Menutup Tahun?");
  const [formModul, setFormModul] = useState<"KMS" | "LMS" | "TMS" | "IMS" | "PMS" | "CMS" | "EM">("KMS");
  const [formMenu, setFormMenu] = useState("Communities of Practice");
  const [formPriority, setFormPriority] = useState<"Important" | "Normal">("Important");
  const [formChannels, setFormChannels] = useState<("Push Notification" | "Email")[]>(["Push Notification", "Email"]);
  const [formDeskripsi, setFormDeskripsi] = useState("Lorem Ipsum sol Do lor Mame");
  const [formJenisJadwal, setFormJenisJadwal] = useState<"Scheduled" | "Immediate">("Scheduled");
  const [formDate, setFormDate] = useState("August 23, 2025");
  const [formTime, setFormTime] = useState("09.30");
  const [formImage, setFormImage] = useState("Gambar.png");
  const [formAttachment, setFormAttachment] = useState("");
  const [formContent, setFormContent] = useState(`Saatnya rutin evaluasi kebijakan dan prosedur keamanan sebelum masuk ke tahun baru! 📋\nTinjau kembali celah keamanan, insiden yang terjadi, hasil audit, dan temuan red/blue team untuk menentukan prioritas perbaikan. 🔍🛡️\n\nPerbarui kontrol keamanan yang sudah tidak relevan, pastikan semuanya tetap up-to-date, dan tetapkan prioritas peningkatan keamanan untuk tahun berikutnya.\nEvaluasi yang menyeluruh akan bikin pertahanan makin kuat dan merata di seluruh organisasi. 💼✨\n\nTinjau kebijakan, identifikasi kelemahan, dan perbarui langkah pengamanan Anda agar lebih siap menghadapi ancaman tahun depan.\n🔥 Persiapkan keamanan sistem Anda sejak sekarang! 🔒🚀\n\n#EvaluasiKeamanan #TinjauKebijakan #IdentifikasiKelemahan`);

  const [formRoles, setFormRoles] = useState<string[]>(["HO_SuperAdmin", "Admin_KMS", "Admin_LMS", "Admin_TMS", "Admin_TMS", "Admin_TMS"]);
  const [formEntities, setFormEntities] = useState<string[]>(["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "+30 More"]);
  const [formOrgs, setFormOrgs] = useState<string[]>(["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "PT Pelindo Multi Terminal", "+30 More"]);
  const [formUsers, setFormUsers] = useState<string[]>(["Hemansyah", "Yogi Muhammad Irshad", "Ricky Abdulla", "Afif Tahjudin", "Afif Tahjudin", "Afif Tahjudin", "Afif Tahjudin", "Afif Tahjudin", "Afif Tahjudin", "+10 More"]);

  // Modals
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [showEmailSampleModal, setShowEmailSampleModal] = useState(false);

  // Dropdown Picker Modals for Roles, Entities, Users (Screenshots 21-24)
  const [activePicker, setActivePicker] = useState<"role" | "entity" | "org" | "user" | null>(null);

  // Blasts Data
  const [blasts, setBlasts] = useState<BlastItem[]>(INITIAL_BLASTS);
  const [drafts, setDrafts] = useState<BlastItem[]>(INITIAL_DRAFTS);

  // Filtered List
  const currentList = mainTab === "Daftar Blast Message" ? blasts : drafts;
  const filteredList = currentList.filter(item => {
    const matchStatus = statusFilter === "Semua" || item.status === statusFilter;
    const matchSearch = !searchQuery || item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || item.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleOpenCreate = () => {
    setFormJudul("");
    setFormDeskripsi("");
    setFormContent("");
    setFormImage("");
    setFormAttachment("");
    setCurrentView("create");
  };

  const handleOpenEdit = (item: BlastItem) => {
    setActiveBlast(item);
    setFormJudul(item.judul);
    setFormModul(item.modul);
    setFormMenu(item.menu);
    setFormPriority(item.priority);
    setFormChannels(item.channels);
    setFormDeskripsi(item.deskripsi);
    setFormJenisJadwal(item.jenisJadwal);
    setFormContent(item.content);
    setFormImage(item.imageFileName);
    setFormAttachment(item.attachmentFileName);
    setFormRoles(item.roles);
    setFormEntities(item.entities);
    setFormOrgs(item.organizations);
    setFormUsers(item.users);
    setOpenMenuId(null);
    setCurrentView("edit");
  };

  const handleOpenView = (item: BlastItem) => {
    setActiveBlast(item);
    setFormJudul(item.judul);
    setFormModul(item.modul);
    setFormMenu(item.menu);
    setFormPriority(item.priority);
    setFormChannels(item.channels);
    setFormDeskripsi(item.deskripsi);
    setFormJenisJadwal(item.jenisJadwal);
    setFormContent(item.content);
    setFormImage(item.imageFileName);
    setFormAttachment(item.attachmentFileName);
    setFormRoles(item.roles);
    setFormEntities(item.entities);
    setFormOrgs(item.organizations);
    setFormUsers(item.users);
    setOpenMenuId(null);
    setCurrentView("view");
  };

  const handleOpenLog = (item: BlastItem) => {
    setActiveBlast(item);
    setOpenMenuId(null);
    setShowLogModal(true);
  };

  const handleOpenTargetModal = (item: BlastItem) => {
    setActiveBlast(item);
    setShowTargetModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlast: BlastItem = {
      id: `BLST-${Date.now()}`,
      no: blasts.length + 1,
      judul: formJudul || "Blast Message Baru",
      modul: formModul,
      menu: formMenu,
      priority: formPriority,
      targetCount: 1000,
      targetLabel: "1000+ Target",
      jenisJadwal: formJenisJadwal,
      waktuKirim: `${formDate} ${formTime}`,
      createdBy: "Herman Lukman Santoso",
      createdDate: "Hari ini",
      status: formJenisJadwal === "Scheduled" ? "Scheduled" : "Terkirim",
      channels: formChannels,
      deskripsi: formDeskripsi,
      content: formContent,
      imageFileName: formImage,
      attachmentFileName: formAttachment,
      roles: formRoles,
      entities: formEntities,
      organizations: formOrgs,
      users: formUsers,
      logs: [
        { date: "Hari ini", time: "12:00", text: `Dibuat & disubmit oleh Herman Lukman Santoso`, type: "success" }
      ]
    };
    setBlasts([newBlast, ...blasts]);
    setCurrentView("list");
  };

  const handleSaveDraft = () => {
    const newDraft: BlastItem = {
      id: `DRFT-${Date.now()}`,
      no: drafts.length + 1,
      judul: formJudul || "Draft Blast Message Baru",
      modul: formModul,
      menu: formMenu,
      priority: formPriority,
      targetCount: 40,
      targetLabel: "40+ Target",
      jenisJadwal: formJenisJadwal,
      waktuKirim: `${formDate} ${formTime}`,
      createdBy: "Herman Lukman Santoso",
      createdDate: "Hari ini",
      status: "Draft",
      channels: formChannels,
      deskripsi: formDeskripsi,
      content: formContent,
      imageFileName: formImage,
      attachmentFileName: formAttachment,
      roles: formRoles,
      entities: formEntities,
      organizations: formOrgs,
      users: formUsers,
      logs: [
        { date: "Hari ini", time: "10:00", text: "Draft disimpan oleh Herman Lukman Santoso", type: "info" }
      ]
    };
    setDrafts([newDraft, ...drafts]);
    setCurrentView("list");
  };

  return (
    <div className="space-y-6 font-sans">

      {/* =========================================================================
          VIEW 1: DAFTAR BLAST MESSAGE & DRAFT LIST (SCREENSHOT 09.33.10 s/d 09.33.30)
         ========================================================================= */}
      {currentView === "list" && (
        <div className="space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blast Message</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Kelola dan kirim blast message dengan cepat dan mudah.
              </p>
            </div>

            {/* Selected Modul Dropdown matching Screenshot 09.33.10 */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-slate-400 font-medium">Selected Modul:</span>
              <div className="relative">
                <select
                  value={selectedModulHeader}
                  onChange={(e) => setSelectedModulHeader(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 appearance-none pr-8 shadow-2xs focus:outline-none focus:border-[#016DB2]"
                >
                  <option>KMS</option>
                  <option>LMS</option>
                  <option>TMS</option>
                  <option>IMS</option>
                  <option>PMS</option>
                  <option>CMS</option>
                  <option>EM</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 5 Metric Summary Counter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            
            {/* Card 1: Total Blast Message */}
            <div 
              onClick={() => { setMainTab("Daftar Blast Message"); setStatusFilter("Semua"); }}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#016DB2] hover:shadow-sm transition cursor-pointer flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Total Blast</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#016DB2] flex items-center justify-center border border-blue-100">
                  <Send className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {blasts.length} <span className="text-xs font-semibold text-slate-400">Pesan</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  +{drafts.length} Draf tersimpan
                </div>
              </div>
            </div>

            {/* Card 2: Status Terkirim */}
            <div 
              onClick={() => { setMainTab("Daftar Blast Message"); setStatusFilter("Terkirim"); }}
              className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-2xs hover:border-emerald-500 hover:shadow-sm transition cursor-pointer flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">Status Terkirim</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600 tracking-tight">
                  {blasts.filter(b => b.status === "Terkirim").length} <span className="text-xs font-semibold text-emerald-700/60">Pesan</span>
                </div>
                <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                  Terkirim ke semua target
                </div>
              </div>
            </div>

            {/* Card 3: Status Gagal Terkirim */}
            <div 
              onClick={() => { setMainTab("Daftar Blast Message"); setStatusFilter("Gagal Terkirim"); }}
              className="bg-white p-4 rounded-2xl border border-rose-200/80 shadow-2xs hover:border-rose-500 hover:shadow-sm transition cursor-pointer flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800">Gagal Terkirim</span>
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-rose-600 tracking-tight">
                  {blasts.filter(b => b.status === "Gagal Terkirim").length} <span className="text-xs font-semibold text-rose-700/60">Pesan</span>
                </div>
                <div className="text-[10px] text-rose-600 font-medium mt-0.5">
                  Perlu pengiriman ulang
                </div>
              </div>
            </div>

            {/* Card 4: Jumlah per Jenis Jadwal */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Jenis Jadwal</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> Scheduled:
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {blasts.filter(b => b.jenisJadwal === "Scheduled").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Immediate:
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {blasts.filter(b => b.jenisJadwal === "Immediate").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 5: Jumlah per Priority */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Jumlah Priority</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Important:
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {blasts.filter(b => b.priority === "Important").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Normal:
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {blasts.filter(b => b.priority === "Normal").length}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Main Tabs: Daftar Blast Message vs Draft matching Screenshot 09.33.10 & 09.33.21 */}
          <div className="flex border-b border-slate-200 gap-8 text-xs font-bold text-slate-500">
            <button
              onClick={() => setMainTab("Daftar Blast Message")}
              className={`pb-3 border-b-2 transition ${mainTab === "Daftar Blast Message" ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
            >
              Daftar Blast Message
            </button>
            <button
              onClick={() => setMainTab("Draft")}
              className={`pb-3 border-b-2 transition ${mainTab === "Draft" ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
            >
              Draft
            </button>
          </div>

          {/* Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Daftar Blast Message</h2>
              <p className="text-xs text-slate-400">Tambah dan atur blast message Portaverse</p>
            </div>
          </div>

          {/* Filter Bar: Search, Status Filter Dropdown, + Tambah Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari disini"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2] shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-44">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 appearance-none pr-8 shadow-2xs"
                >
                  <option value="Semua">Status: Semua</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Terkirim">Terkirim</option>
                  <option value="Gagal Terkirim">Gagal Terkirim</option>
                  {mainTab === "Draft" && <option value="Draft">Draft</option>}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
              </div>

              {mainTab === "Daftar Blast Message" && (
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="px-5 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah</span>
                </button>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <b className="text-slate-800">{filteredList.length}</b> Blast Message.
          </div>

          {/* Table matching Screenshot 09.33.10 & 09.33.21 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-[11px] text-slate-400 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 pl-4 w-10">NO</th>
                    <th className="py-3.5">JUDUL</th>
                    <th className="py-3.5">MODUL</th>
                    <th className="py-3.5">PRIORITY</th>
                    <th className="py-3.5">TARGET</th>
                    <th className="py-3.5">JENIS JADWAL</th>
                    <th className="py-3.5">WAKTU KIRIM</th>
                    <th className="py-3.5">CREATED BY</th>
                    <th className="py-3.5">CREATED DATE</th>
                    <th className="py-3.5 text-center">STATUS</th>
                    <th className="py-3.5 pr-4 text-center">AKSI</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredList.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 pl-4 text-slate-400">{idx + 1}</td>

                      <td className="py-4 font-bold text-slate-900 max-w-xs truncate">
                        {item.judul}
                      </td>

                      <td className="py-4 text-slate-700 font-semibold">{item.modul}</td>

                      <td className="py-4">
                        <span className="inline-flex items-center gap-1.5 font-bold text-[11px]">
                          <span className={`w-2 h-2 rounded-full ${item.priority === "Important" ? "bg-red-500" : "bg-emerald-500"}`}></span>
                          <span className={item.priority === "Important" ? "text-slate-900" : "text-slate-700"}>{item.priority}</span>
                        </span>
                      </td>

                      <td className="py-4">
                        <button
                          type="button"
                          onClick={() => handleOpenTargetModal(item)}
                          className="font-bold text-[#016DB2] hover:underline"
                        >
                          {item.targetLabel}
                        </button>
                      </td>

                      <td className="py-4 text-slate-600">{item.jenisJadwal}</td>

                      <td className="py-4 text-slate-600 font-mono text-[11px]">{item.waktuKirim}</td>

                      <td className="py-4 text-slate-800">{item.createdBy}</td>

                      <td className="py-4 text-slate-500 font-mono text-[11px]">{item.createdDate}</td>

                      {/* Status Badge matching Screenshot 09.33.10 */}
                      <td className="py-4 text-center">
                        <span className={`px-3 py-1 rounded-md text-[11px] font-bold border inline-block min-w-24 ${
                          item.status === "Scheduled" 
                            ? "border-amber-300 text-amber-600 bg-amber-50/40" 
                            : item.status === "Terkirim"
                            ? "border-emerald-300 text-emerald-700 bg-emerald-50/40"
                            : item.status === "Gagal Terkirim"
                            ? "border-red-300 text-red-600 bg-red-50/40"
                            : "border-sky-300 text-[#016DB2] bg-sky-50/40"
                        }`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Action 3-dots Menu matching Screenshot 09.36.57 */}
                      <td className="py-4 pr-4 text-center relative">
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                        >
                          <MoreVertical className="w-4 h-4 text-[#016DB2]" />
                        </button>

                        {openMenuId === item.id && (
                          <div className="absolute right-4 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-30 text-xs font-semibold animate-in fade-in text-left">
                            
                            {item.status === "Draft" && (
                              <button
                                onClick={() => {
                                  setOpenMenuId(null);
                                  handleFormSubmit({ preventDefault: () => {} } as any);
                                }}
                                className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 transition"
                              >
                                Submit
                              </button>
                            )}

                            <button
                              onClick={() => handleOpenView(item)}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 transition"
                            >
                              View
                            </button>

                            {item.status === "Draft" && (
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 transition"
                              >
                                Edit
                              </button>
                            )}

                            {item.status === "Draft" && (
                              <button
                                onClick={() => {
                                  setDrafts(drafts.filter(d => d.id !== item.id));
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-red-600 transition"
                              >
                                Delete
                              </button>
                            )}

                            {item.status === "Gagal Terkirim" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  showToast("Mengirim ulang blast message ke target yang gagal...");
                                }}
                                className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-[#016DB2] transition"
                              >
                                Resend
                              </button>
                            )}

                            <button
                              onClick={() => handleOpenLog(item)}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 transition border-t border-slate-100"
                            >
                              Log Activity
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-200 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs">
                  <option>5</option>
                  <option>10</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button className="text-slate-400 hover:text-slate-700">&lt; Prev</button>
                <button className="px-2.5 py-1 bg-[#016DB2] text-white rounded-lg font-bold">1</button>
                <button className="px-2.5 py-1 hover:bg-slate-100 rounded-lg">2</button>
                <button className="px-2.5 py-1 hover:bg-slate-100 rounded-lg">3</button>
                <button className="text-slate-700 hover:text-slate-900 font-semibold">Next &gt;</button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW 2: BUAT / EDIT / VIEW BLAST MESSAGE (SCREENSHOT 09.33.40 - 09.35.13)
         ========================================================================= */}
      {(currentView === "create" || currentView === "edit" || currentView === "view") && (
        <div className="space-y-6">
          
          {/* Breadcrumb & Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <button onClick={() => setCurrentView("list")} className="hover:text-[#016DB2]">Daftar Blast message</button>
                <span>&gt;</span>
                <span className="text-slate-700 font-semibold">
                  {currentView === "create" ? "Buat Blast Message" : currentView === "edit" ? "Edit Blast Message" : "View Blast Message"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Selected Modul:</span>
              <span className="px-3 py-1 bg-sky-100 text-[#016DB2] rounded-lg text-xs font-black border border-sky-200">
                {formModul}
              </span>

              <span className={`px-3.5 py-1 rounded-lg text-xs font-bold border ${
                currentView === "create" ? "border-amber-300 text-amber-600 bg-amber-50/40"
                : activeBlast.status === "Terkirim" ? "border-emerald-300 text-emerald-700 bg-emerald-50/40"
                : activeBlast.status === "Gagal Terkirim" ? "border-red-300 text-red-600 bg-red-50/40"
                : "border-amber-300 text-amber-600 bg-amber-50/40"
              }`}>
                {currentView === "create" ? "Draft" : activeBlast.status}
              </span>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6 text-xs">
            
            {/* Card 1: Informasi Blast Message matching Screenshot 09.33.40 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-5">
              <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Informasi Blast Message
              </h3>

              {/* Judul */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Blast Message<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  disabled={currentView === "view"}
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  placeholder="Evaluasi Keamanan: Sudah Siap Menutup Tahun?"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-[#016DB2] disabled:bg-slate-50"
                  required
                />
              </div>

              {/* 4 Fields Grid: Modul, Menu, Priority Type, Channel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Modul */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Modul<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      disabled={currentView === "view"}
                      value={formModul}
                      onChange={(e) => setFormModul(e.target.value as any)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 font-semibold text-slate-800 focus:outline-none focus:border-[#016DB2] disabled:bg-slate-50"
                    >
                      <option>KMS</option>
                      <option>LMS</option>
                      <option>TMS</option>
                      <option>IMS</option>
                      <option>PMS</option>
                      <option>CMS</option>
                      <option>EM</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Menu */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Menu<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      disabled={currentView === "view"}
                      value={formMenu}
                      onChange={(e) => setFormMenu(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 font-semibold text-slate-800 focus:outline-none focus:border-[#016DB2] disabled:bg-slate-50"
                    >
                      <option>Communities of Practice</option>
                      <option>Knowledge Repository</option>
                      <option>Course LMS</option>
                      <option>General Announcement</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Priority Type */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority Type<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      disabled={currentView === "view"}
                      value={formPriority}
                      onChange={(e) => setFormPriority(e.target.value as any)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 font-semibold text-slate-800 focus:outline-none focus:border-[#016DB2] disabled:bg-slate-50"
                    >
                      <option>Important</option>
                      <option>Normal</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Channel Checkboxes */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Channel</label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        disabled={currentView === "view"}
                        checked={formChannels.includes("Push Notification")}
                        onChange={() => {
                          if (formChannels.includes("Push Notification")) {
                            setFormChannels(formChannels.filter(c => c !== "Push Notification"));
                          } else {
                            setFormChannels([...formChannels, "Push Notification"]);
                          }
                        }}
                        className="w-4 h-4 accent-[#016DB2] rounded"
                      />
                      <span>Push Notification</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        disabled={currentView === "view"}
                        checked={formChannels.includes("Email")}
                        onChange={() => {
                          if (formChannels.includes("Email")) {
                            setFormChannels(formChannels.filter(c => c !== "Email"));
                          } else {
                            setFormChannels([...formChannels, "Email"]);
                          }
                        }}
                        className="w-4 h-4 accent-[#016DB2] rounded"
                      />
                      <span>Email</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Deskripsi */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Deskripsi Blast Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  disabled={currentView === "view"}
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl leading-relaxed focus:outline-none focus:border-[#016DB2] resize-none disabled:bg-slate-50"
                  required
                />
                <div className="text-[11px] text-slate-400 text-right mt-1">*Maximum Input 200 Character ({formDeskripsi.length}/200)</div>
              </div>

              {/* Jenis Jadwal & Waktu Kirim */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Jadwal<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      disabled={currentView === "view"}
                      value={formJenisJadwal}
                      onChange={(e) => setFormJenisJadwal(e.target.value as any)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 font-semibold text-slate-800 disabled:bg-slate-50"
                    >
                      <option>Scheduled</option>
                      <option>Immediate</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {formJenisJadwal === "Scheduled" ? (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Waktu Kirim<span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          disabled={currentView === "view"}
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl pr-8 font-semibold disabled:bg-slate-50"
                        />
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                      </div>
                      <div className="w-28">
                        <input
                          type="text"
                          disabled={currentView === "view"}
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-center disabled:bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Waktu Kirim<span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value="Langsung Dikirim (Immediate)"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-emerald-700"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Card 2: Content matching Screenshot 09.33.51 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-5">
              <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Content
              </h3>

              {/* 2 File Upload Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Upload Gambar Content</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled={currentView === "view"}
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Gambar.png"
                      className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold disabled:bg-slate-100"
                    />
                    {currentView !== "view" && (
                      <button
                        type="button"
                        onClick={() => showToast("File gambar banner berhasil dipilih.")}
                        className="px-4 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold shadow-2xs"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Max Size: 10 Mb &bull; Format: png, jpg</div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Upload File</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled={currentView === "view"}
                      value={formAttachment}
                      onChange={(e) => setFormAttachment(e.target.value)}
                      placeholder="Upload File"
                      className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold disabled:bg-slate-100"
                    />
                    {currentView !== "view" && (
                      <button
                        type="button"
                        onClick={() => showToast("File lampiran PDF berhasil dipilih.")}
                        className="px-4 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold shadow-2xs"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Max Size: 50 Mb &bull; Max 1 File Upload Format: pdf</div>
                </div>
              </div>

              {/* Isi Content */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Content</label>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200 text-slate-600">
                    <button type="button" className="p-1 hover:bg-slate-200 rounded"><Bold className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded"><Italic className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded"><Underline className="w-3.5 h-3.5" /></button>
                    <span className="text-slate-300">|</span>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded font-bold text-[10px]">H1</button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded font-bold text-[10px]">H2</button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded font-bold text-[10px]">H3</button>
                    <span className="text-slate-300">|</span>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded"><List className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded"><ListOrdered className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded"><LinkIcon className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded"><Eraser className="w-3.5 h-3.5" /></button>
                  </div>

                  <textarea
                    rows={6}
                    disabled={currentView === "view"}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full p-4 text-xs leading-relaxed focus:outline-none resize-none disabled:bg-slate-50"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2.5">
                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(true)}
                    className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition shadow-2xs"
                  >
                    Show Preview
                  </button>
                  {currentView !== "view" && (
                    <button
                      type="button"
                      onClick={() => setFormContent("")}
                      className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition shadow-2xs"
                    >
                      Clear Content
                    </button>
                  )}
                  {formChannels.includes("Email") && (
                    <button
                      type="button"
                      onClick={() => setShowEmailSampleModal(true)}
                      className="px-4 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#016DB2] font-bold rounded-xl text-xs transition border border-sky-200 ml-auto flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Preview Email Client</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Card 3: Target Blast Message matching Screenshot 09.34.12 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Target Blast Message
              </h3>

              {/* Pilih Role */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Pilih Role</label>
                <div 
                  onClick={() => currentView !== "view" && setActivePicker("role")}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-2 cursor-pointer hover:border-sky-300 transition"
                >
                  {formRoles.map((r, i) => (
                    <span key={i} className="px-2.5 py-1 bg-sky-50 text-[#016DB2] border border-sky-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <span>{r}</span>
                      {currentView !== "view" && <X className="w-3 h-3 hover:text-red-600" onClick={(e) => { e.stopPropagation(); setFormRoles(formRoles.filter((_, idx) => idx !== i)); }} />}
                    </span>
                  ))}
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-auto pointer-events-none" />
                </div>
              </div>

              {/* Pilih Entitas */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Pilih Entitas</label>
                <div 
                  onClick={() => currentView !== "view" && setActivePicker("entity")}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-2 cursor-pointer hover:border-sky-300 transition"
                >
                  {formEntities.map((ent, i) => (
                    <span key={i} className="px-2.5 py-1 bg-sky-50 text-[#016DB2] border border-sky-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <span>{ent}</span>
                      {currentView !== "view" && <X className="w-3 h-3 hover:text-red-600" onClick={(e) => { e.stopPropagation(); setFormEntities(formEntities.filter((_, idx) => idx !== i)); }} />}
                    </span>
                  ))}
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-auto pointer-events-none" />
                </div>
              </div>

              {/* Pilih Organization */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Pilih Organization</label>
                <div 
                  onClick={() => currentView !== "view" && setActivePicker("org")}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-2 cursor-pointer hover:border-sky-300 transition"
                >
                  {formOrgs.map((org, i) => (
                    <span key={i} className="px-2.5 py-1 bg-sky-50 text-[#016DB2] border border-sky-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <span>{org}</span>
                      {currentView !== "view" && <X className="w-3 h-3 hover:text-red-600" onClick={(e) => { e.stopPropagation(); setFormOrgs(formOrgs.filter((_, idx) => idx !== i)); }} />}
                    </span>
                  ))}
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-auto pointer-events-none" />
                </div>
              </div>

              {/* Pilih User */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Pilih User</label>
                <div 
                  onClick={() => currentView !== "view" && setActivePicker("user")}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-2 cursor-pointer hover:border-sky-300 transition"
                >
                  {formUsers.map((u, i) => (
                    <span key={i} className="px-2.5 py-1 bg-sky-50 text-[#016DB2] border border-sky-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <span>{u}</span>
                      {currentView !== "view" && <X className="w-3 h-3 hover:text-red-600" onClick={(e) => { e.stopPropagation(); setFormUsers(formUsers.filter((_, idx) => idx !== i)); }} />}
                    </span>
                  ))}
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-auto pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentView("list")}
                className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-2xs transition"
              >
                {currentView === "view" ? "Kembali" : "Batal"}
              </button>

              {currentView !== "view" && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-2xs transition"
                  >
                    Save as Draft
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

          </form>

        </div>
      )}

      {/* =========================================================================
          MODAL 1: PREVIEW BLAST MESSAGE (SCREENSHOT 09.35.31 & 09.35.46)
         ========================================================================= */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95">
            
            <div className="flex items-center justify-between px-7 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-extrabold text-sm text-slate-900">Preview Blast Message</h3>
              <button onClick={() => setShowPreviewModal(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 overflow-y-auto space-y-4 text-xs">
              <h2 className="text-base md:text-lg font-black text-slate-900 leading-snug">
                {formJudul || "Evaluasi Keamanan: Sudah Siap Menutup Tahun?"}
              </h2>

              <div className="space-y-3 text-slate-700 leading-relaxed whitespace-pre-line">
                {formContent || "Isi konten broadcast..."}
              </div>

              {/* Graphic Banner Illustration matching Screenshot 09.35.31 */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                  alt="Security Banner"
                  className="w-full h-56 object-cover"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-7 py-4 border-t border-slate-100 bg-slate-50/50 text-xs">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl shadow-2xs transition"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPreviewModal(false);
                  handleFormSubmit({ preventDefault: () => {} } as any);
                }}
                className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: GMAIL EMAIL CLIENT PREVIEW (SCREENSHOT 09.36.04)
         ========================================================================= */}
      {showEmailSampleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95">
            
            {/* Gmail Top Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-100 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="font-bold text-slate-800">Email Notification Preview</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px]">Inbox</span>
              </div>
              <button onClick={() => setShowEmailSampleModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-7 overflow-y-auto space-y-5 text-xs">
              <div className="flex items-start justify-between border-b pb-4">
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900">ADMIN PORTAVERSE &lt;adminportaverse@gmail.com&gt;</div>
                  <div className="text-slate-400">to me &bull; Wed, Sep 15, 8:07 AM</div>
                </div>
                <span className="text-[10px] text-slate-400">7 of 785</span>
              </div>

              {/* Email Content Body */}
              <div className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
                <div className="flex items-center gap-2 font-black text-xl text-[#016DB2]">
                  <div className="w-7 h-7 rounded-lg bg-[#016DB2] text-white flex items-center justify-center text-xs">P</div>
                  <span>portaverse</span>
                </div>

                <h3 className="font-black text-base text-slate-900 leading-snug">
                  {formJudul}
                </h3>

                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                  alt="Security Banner"
                  className="w-full h-48 object-cover rounded-xl"
                />

                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-xs">
                  {formContent}
                </p>
              </div>
            </div>

            <div className="flex justify-end px-7 py-3 border-t border-slate-100 bg-slate-50/50 text-xs">
              <button
                type="button"
                onClick={() => setShowEmailSampleModal(false)}
                className="px-5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl shadow-2xs"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: LOG BLAST MESSAGE (SCREENSHOT 09.37.24 s/d 09.38.21)
         ========================================================================= */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col animate-in zoom-in-95">
            
            <div className="flex items-center justify-between px-7 py-4 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Log Blast Message</h3>
              <button onClick={() => setShowLogModal(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
              
              {/* Left Column: Metadata */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="text-slate-400 text-[11px]">Judul</div>
                  <h4 className="font-black text-sm text-slate-900 mt-0.5">{activeBlast.judul}</h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-slate-400 text-[11px]">Priority</div>
                    <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${activeBlast.priority === "Important" ? "bg-red-500" : "bg-emerald-500"}`}></span>
                      <span>{activeBlast.priority}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[11px]">Channel</div>
                    <div className="font-bold text-slate-900 mt-0.5">{activeBlast.channels.join(" &bull; ") || "In- App"}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-slate-400 text-[11px]">Waktu Jadwal</div>
                    <div className="font-bold text-slate-900 mt-0.5 font-mono text-[11px]">{activeBlast.waktuKirim}</div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[11px]">Created By</div>
                    <div className="font-bold text-slate-900 mt-0.5">{activeBlast.createdBy}</div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-1">Status</div>
                  <span className={`px-3 py-1 rounded-md text-[11px] font-bold border inline-block ${
                    activeBlast.status === "Terkirim" ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                    : activeBlast.status === "Gagal Terkirim" ? "border-red-300 text-red-600 bg-red-50"
                    : "border-amber-300 text-amber-600 bg-amber-50"
                  }`}>
                    {activeBlast.status}
                  </span>
                </div>
              </div>

              {/* Right Column: Timeline Riwayat Log matching Screenshot 09.37.24 */}
              <div className="md:col-span-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="font-bold text-slate-700 text-xs">Berikut ini adalah riwayat Log Blast Message</div>

                <div className="space-y-4 pt-2 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {activeBlast.logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-3 relative pl-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        log.type === "success" ? "bg-emerald-500 text-white" 
                        : log.type === "error" ? "bg-red-500 text-white" 
                        : "bg-[#016DB2] text-white"
                      }`}>
                        {log.type === "success" ? <Check className="w-3.5 h-3.5" /> : log.type === "error" ? <X className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-mono text-[10px] text-slate-400">{log.date} {log.time}</div>
                        <div className="font-semibold text-slate-800 text-xs">{log.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: TARGET BLAST MESSAGE DETAIL TABLE (SCREENSHOT 10.03.54)
         ========================================================================= */}
      {showTargetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95">
            
            <div className="flex items-center justify-between px-7 py-4 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Target Blast Message</h3>
              <button onClick={() => setShowTargetModal(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 overflow-y-auto space-y-5 text-xs">
              
              {/* 4 Metric Cards matching Screenshot 10.03.54 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Sukses Push */}
                <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between text-slate-600 font-semibold text-xs">
                    <span>Sukses Push</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">250 <span className="text-xs font-normal text-slate-400">/ 1000</span></div>
                </div>

                {/* Gagal Push */}
                <div className="bg-red-50/40 p-4 rounded-2xl border border-red-200 space-y-1">
                  <div className="flex items-center justify-between text-slate-600 font-semibold text-xs">
                    <span>Gagal Push</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">250 <span className="text-xs font-normal text-slate-400">/ 1000</span></div>
                </div>

                {/* Sukses Email */}
                <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between text-slate-600 font-semibold text-xs">
                    <span>Sukses Email</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">250 <span className="text-xs font-normal text-slate-400">/ 1000</span></div>
                </div>

                {/* Gagal Email */}
                <div className="bg-red-50/40 p-4 rounded-2xl border border-red-200 space-y-1">
                  <div className="flex items-center justify-between text-slate-600 font-semibold text-xs">
                    <span>Gagal Email</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">250 <span className="text-xs font-normal text-slate-400">/ 1000</span></div>
                </div>

              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari disini"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white"
                />
              </div>

              {/* Table matching Screenshot 10.03.54 */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[11px] text-slate-400 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 pl-4 w-10">NO</th>
                      <th className="py-3">NAMA</th>
                      <th className="py-3 text-center">STATUS PUSH NOTIFCATION PORTAVERSE</th>
                      <th className="py-3 text-center">STATUS EMAIL</th>
                      <th className="py-3 pr-4">KETERANGAN</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-xs">
                    {MOCK_TARGET_RECIPIENTS.map((rec) => (
                      <tr key={rec.no} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 pl-4 text-slate-400 font-medium">{rec.no}</td>

                        <td className="py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-sky-100 text-[#016DB2] font-black text-xs flex items-center justify-center">
                              {rec.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{rec.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{rec.nipp} &bull; {rec.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 text-center">
                          <span className={`px-3 py-0.5 rounded text-[10px] font-bold border inline-block ${
                            rec.pushStatus === "Sukses" ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                            : rec.pushStatus === "Partial" ? "border-amber-300 text-amber-600 bg-amber-50"
                            : "border-red-300 text-red-600 bg-red-50"
                          }`}>
                            {rec.pushStatus}
                          </span>
                        </td>

                        <td className="py-3.5 text-center">
                          <span className={`px-3 py-0.5 rounded text-[10px] font-bold border inline-block ${
                            rec.emailStatus === "Sukses" ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                            : "border-red-300 text-red-600 bg-red-50"
                          }`}>
                            {rec.emailStatus}
                          </span>
                        </td>

                        <td className="py-3.5 pr-4 text-slate-700 font-medium">
                          {rec.keterangan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs">
                    <option>5</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="text-slate-400">&lt; Prev</button>
                  <button className="px-2 py-0.5 bg-[#016DB2] text-white rounded font-bold">1</button>
                  <button className="px-2 py-0.5 hover:bg-slate-100 rounded">2</button>
                  <button className="px-2 py-0.5 hover:bg-slate-100 rounded">3</button>
                  <button className="text-slate-700">Next &gt;</button>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end gap-2 px-7 py-4 border-t border-slate-100 bg-slate-50/50 text-xs">
              <button
                type="button"
                onClick={() => setShowTargetModal(false)}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl shadow-2xs transition"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast("Melakukan resend pesan ke target gagal...");
                  setShowTargetModal(false);
                }}
                className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition"
              >
                Resend
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: PICKER DIALOG (ROLE, ENTITY, ORG, USER - SCREENSHOT 21-24)
         ========================================================================= */}
      {activePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 space-y-4 animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm text-slate-900 capitalize">Pilih {activePicker}</h3>
              <button onClick={() => setActivePicker(null)}><X className="w-4 h-4" /></button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              <label className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg cursor-pointer font-bold text-slate-900">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#016DB2]" />
                <span>Pilih Semua</span>
              </label>

              {activePicker === "role" && ["HO_SuperAdmin", "Admin_KMS", "Admin_LMS", "Admin_TMS", "Admin_IMS", "Admin_PMS"].map((r) => (
                <label key={r} className="flex items-center gap-2.5 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-slate-800">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#016DB2]" />
                  <span>{r}</span>
                </label>
              ))}

              {activePicker === "entity" && ["PT Pelabuhan Indonesia", "PT Pelindo Multi Terminal", "PT Pelindo Terminal Petikemas", "PT Pelindo Solusi Logistik"].map((e) => (
                <label key={e} className="flex items-center gap-2.5 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-slate-800">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#016DB2]" />
                  <span>{e}</span>
                </label>
              ))}

              {activePicker === "user" && [
                { name: "Hermansyah", role: "DH Perencanaan & Penyelenggaraan Pembelajaran", nipp: "10849" },
                { name: "Yogi Muhammad Irshad", role: "VP Operasi Petikemas SPTP", nipp: "11002753" },
                { name: "Ricky Abdulla", role: "Manager IT System", nipp: "105322" },
                { name: "Afif Tahjudin", role: "Staff SDM", nipp: "104992" }
              ].map((u, i) => (
                <label key={i} className="flex items-start gap-2.5 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-slate-800">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#016DB2] mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[10px] text-slate-400">{u.role} &bull; NIPP: {u.nipp}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setActivePicker(null)}
                className="px-5 py-2 bg-[#016DB2] text-white rounded-xl font-bold shadow-xs"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-bounce text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
