"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Star, 
  Clock, 
  ChevronDown, 
  ArrowLeft, 
  Edit3, 
  Mail, 
  Phone, 
  Building, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  X, 
  Upload, 
  Trash2, 
  Calendar, 
  Check, 
  Briefcase, 
  PlayCircle, 
  FileText, 
  ChevronRight, 
  Download, 
  Filter, 
  Layers, 
  GraduationCap,
  AlertCircle,
  ExternalLink,
  Copy,
  Radio,
  Share2,
  Volume2,
  Sparkles,
  Headphones,
  Bell,
  Info,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export interface ParticipantDetailItem {
  id: string;
  name: string;
  nipp: string;
  company: string;
  email: string;
  phone: string;
  avatar: string;
  progress: number;
  status: "Selesai" | "Sedang Belajar";
  score: number;
  atasan: {
    name: string;
    nipp: string;
    role: string;
    email: string;
    phone: string;
    avatar: string;
  };
  adminWalletInfo: string;
  certificateStatus: "Belum Diunduh" | "Sudah Diunduh" | "Siap Terbit";
  chaptersProgress: {
    title: string;
    completed: boolean;
    score?: number;
  }[];
}

export interface ChapterItem {
  id: string;
  number: number;
  title: string;
  description: string;
  periodText: string;
  learningHour: string;
  type: string;
  link: string;
  totalLessons: number;
}

export interface CourseDetailItem {
  id: string;
  no: number;
  title: string;
  batch: string;
  category: string;
  period: string;
  duration: string;
  learningHours: number;
  participantsCount: string;
  rating: number;
  bannerImage: string;
  description: string;
  chapters: ChapterItem[];
  participants: ParticipantDetailItem[];
}

export interface TrainerSkill {
  id: string;
  category: string;
  rate: number; // 1 to 10
}

export interface TrainerDetail {
  id: string;
  name: string;
  category: "Internal" | "Eksternal";
  role: string;
  company: string;
  competency: string;
  hours: number;
  rating: number;
  avatar: string;
  email: string;
  phone: string;
  nipp?: string;
  about: string;
  skills: TrainerSkill[];
  courses: CourseDetailItem[];
}

interface CandidateEmployee {
  id: string;
  name: string;
  role: string;
  nipp: string;
  unit: string;
  avatar: string;
}

const DEFAULT_CHAPTERS: ChapterItem[] = [
  {
    id: "ch-1",
    number: 1,
    title: "BERLABUH : Let's Talk Transformation #2 : Dari Integrasi menuju Penguatan Korporasi One Pelindo",
    description: "Pelindo tengah menjalankan transformasi korporasi untuk membangun organisasi yang lebih lean, agile, efektif, dan mampu menciptakan sinergi yang lebih kuat dalam Pelindo Group. Transformasi tersebut tidak hanya menyentuh penataan struktur korporasi, tetapi juga penguatan peta peran, penyederhanaan proses, kejelasan kewenangan, serta penataan hubungan antara Kantor Pusat, Regional/Cabang, dan Anak Usaha. Dalam prosesnya, berbagai perubahan tersebut perlu didukung oleh governance dan landasan kewenangan yang jelas, sekaligus diterjemahkan ke dalam pola pengelolaan Anak Usaha dan cara kerja antarentitas yang lebih terintegrasi. Karena itu, streamlining tidak semata-mata dipahami sebagai perubahan struktur, tetapi sebagai upaya membangun One Pelindo Group dengan pembagian peran, accountability, dan mekanisme kerja yang lebih jelas. Namun, keberhasilan transformasi pada akhirnya tidak hanya ditentukan oleh rancangan yang dibuat di level korporasi, tetapi juga oleh bagaimana perubahan tersebut diterima, dipahami, dan dijalankan oleh pihak yang terdampak langsung. Podcast BERLABUH kali ini menghadirkan perspektif dari Pokja Streamlining, Group Head Hukum, Group Head Pengelolaan Anak Perusahaan, serta perwakilan pihak yang mengalami dampak transformasi, untuk membahas perjalanan tersebut secara utuh—mulai dari alasan perubahan, apa yang ditata, bagaimana governance dibangun, hingga seperti apa dampaknya dalam praktik dan apa yang perlu dipersiapkan untuk menjalankannya.",
    periodText: "2 September 2026, 13:00 WIB - 4 September 2026, 23:59 WIB",
    learningHour: "01:30:00",
    type: "Link",
    link: "https://linktr.ee/BerlabuhPelindo",
    totalLessons: 4
  },
  {
    id: "ch-2",
    number: 2,
    title: "Strategic Thinking & Problem Solving di Lingkungan Terminal Pelabuhan",
    description: "Pembelajaran lanjutan mengenai pemetaan permasalahan operasional pelabuhan, identifikasi bottleneck pada gate dan container yard, serta formulasi keputusan manajerial berbasis simulasi digital.",
    periodText: "5 September 2026, 09:00 WIB - 8 September 2026, 23:59 WIB",
    learningHour: "02:00:00",
    type: "Video & Workshop",
    link: "https://portaverse.pelindo.co.id/elearning/strategic-thinking",
    totalLessons: 5
  },
  {
    id: "ch-3",
    number: 3,
    title: "Execution Excellence & High Performance Team Dynamics",
    description: "Mengembangkan kepemimpinan kolaboratif antarentitas Subholding (SPTP, SPJM, SPSL) guna memastikan integrasi pelayanan kapal dan barang tanpa hambatan.",
    periodText: "9 September 2026, 13:00 WIB - 12 September 2026, 23:59 WIB",
    learningHour: "03:00:00",
    type: "Interactive Workshop",
    link: "https://portaverse.pelindo.co.id/elearning/execution-excellence",
    totalLessons: 6
  },
  {
    id: "ch-4",
    number: 4,
    title: "Post-Assessment, Action Plan & Evaluasi Komprehensif",
    description: "Uji pemahaman komprehensif seluruh peserta serta penyusunan action plan implementasi nyata di unit kerja masing-masing pasca pelatihan.",
    periodText: "13 September 2026, 08:00 WIB - 15 September 2026, 17:00 WIB",
    learningHour: "01:30:00",
    type: "Quiz & Evaluasi",
    link: "https://portaverse.pelindo.co.id/assessment/leadership-batch-3",
    totalLessons: 2
  }
];

const DEFAULT_PARTICIPANTS: ParticipantDetailItem[] = [
  { 
    id: "p1", 
    name: "AAN SUKWINANDI", 
    nipp: "102800", 
    company: "PT Pelabuhan Indonesia - Regional 2", 
    email: "ANANDI@PELINDO.CO.ID", 
    phone: "08128585546", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80", 
    progress: 100, 
    status: "Selesai", 
    score: 95,
    atasan: {
      name: "BUDI PRASETIO",
      nipp: "101410",
      role: "Executive Director 2",
      email: "BUDI.PRASETIO@PELINDO.CO.ID",
      phone: "08128585546",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
    },
    adminWalletInfo: "Tidak ada informasi admin wallet yang tersedia.",
    certificateStatus: "Belum Diunduh",
    chaptersProgress: [
      { title: "BERLABUH : Let's Talk Transformation #2 : Dari Integrasi menuju Penguatan Korporasi One Pelindo", completed: true, score: 96 },
      { title: "Strategic Thinking & Problem Solving di Lingkungan Terminal Pelabuhan", completed: true, score: 94 },
      { title: "Execution Excellence & High Performance Team Dynamics", completed: true, score: 95 },
      { title: "Post-Assessment, Action Plan & Evaluasi Komprehensif", completed: true, score: 95 }
    ]
  },
  { 
    id: "p2", 
    name: "Hendra Firmawan", 
    nipp: "11002324", 
    company: "PT Pelabuhan Indonesia (Persero)", 
    email: "hendra.firmawan@pelindo.co.id", 
    phone: "081234567891", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80", 
    progress: 100, 
    status: "Selesai", 
    score: 92,
    atasan: {
      name: "DWI PRASETYA",
      nipp: "101205",
      role: "Senior Manager SDM HO",
      email: "dwi.prasetya@pelindo.co.id",
      phone: "08119988776",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
    },
    adminWalletInfo: "Budget Korporat Head Office Pelindo - Disetujui",
    certificateStatus: "Sudah Diunduh",
    chaptersProgress: [
      { title: "BERLABUH : Let's Talk Transformation #2", completed: true, score: 92 },
      { title: "Strategic Thinking & Problem Solving", completed: true, score: 90 },
      { title: "Execution Excellence & Team Dynamics", completed: true, score: 94 },
      { title: "Post-Assessment & Evaluasi", completed: true, score: 92 }
    ]
  },
  { 
    id: "p3", 
    name: "Yogi Muhammad Irshad", 
    nipp: "11002753", 
    company: "Subholding Pelindo Terminal Petikemas (SPTP)", 
    email: "yogi.irshad@sptp.co.id", 
    phone: "081298765432", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80", 
    progress: 100, 
    status: "Selesai", 
    score: 95,
    atasan: {
      name: "ARIF WIBOWO",
      nipp: "101509",
      role: "VP Operasi Petikemas SPTP",
      email: "arif.wibowo@sptp.co.id",
      phone: "081344556677",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    adminWalletInfo: "Budget Learning SPTP 2026 - Disetujui",
    certificateStatus: "Belum Diunduh",
    chaptersProgress: [
      { title: "BERLABUH : Let's Talk Transformation #2", completed: true, score: 95 },
      { title: "Strategic Thinking & Problem Solving", completed: true, score: 95 },
      { title: "Execution Excellence & Team Dynamics", completed: true, score: 95 },
      { title: "Post-Assessment & Evaluasi", completed: true, score: 95 }
    ]
  },
  { 
    id: "p4", 
    name: "Raditya Satyatama", 
    nipp: "11002911", 
    company: "Subholding Pelindo Jasa Maritim (SPJM)", 
    email: "raditya.s@spjm.co.id", 
    phone: "081388776655", 
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80", 
    progress: 85, 
    status: "Sedang Belajar", 
    score: 88,
    atasan: {
      name: "KURNIAWAN EFFENDI",
      nipp: "101680",
      role: "General Manager Pelayanan Kapal SPJM",
      email: "kurniawan@spjm.co.id",
      phone: "081277665544",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
    },
    adminWalletInfo: "Budget SPJM Pool - Disetujui",
    certificateStatus: "Belum Diunduh",
    chaptersProgress: [
      { title: "BERLABUH : Let's Talk Transformation #2", completed: true, score: 88 },
      { title: "Strategic Thinking & Problem Solving", completed: true, score: 90 },
      { title: "Execution Excellence & Team Dynamics", completed: true, score: 86 },
      { title: "Post-Assessment & Evaluasi", completed: false, score: 0 }
    ]
  },
  { 
    id: "p5", 
    name: "Amanda Sujiwo", 
    nipp: "11003420", 
    company: "Subholding Pelindo Solusi Logistik (SPSL)", 
    email: "amanda.sujiwo@spsl.co.id", 
    phone: "081122334455", 
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80", 
    progress: 90, 
    status: "Sedang Belajar", 
    score: 89,
    atasan: {
      name: "SURYO HADINOTO",
      nipp: "101890",
      role: "Direktur Logistik SPSL",
      email: "suryo.h@spsl.co.id",
      phone: "081399887711",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
    },
    adminWalletInfo: "SPSL Development Fund - Disetujui",
    certificateStatus: "Belum Diunduh",
    chaptersProgress: [
      { title: "BERLABUH : Let's Talk Transformation #2", completed: true, score: 90 },
      { title: "Strategic Thinking & Problem Solving", completed: true, score: 88 },
      { title: "Execution Excellence & Team Dynamics", completed: true, score: 90 },
      { title: "Post-Assessment & Evaluasi", completed: false, score: 0 }
    ]
  },
  { 
    id: "p6", 
    name: "Evelyn Halim", 
    nipp: "11003881", 
    company: "PT PMLI (Pembelajaran & Konsultansi)", 
    email: "evelyn.halim@pmli.co.id", 
    phone: "081299887766", 
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80", 
    progress: 100, 
    status: "Selesai", 
    score: 94,
    atasan: {
      name: "BAMBANG IRAWAN",
      nipp: "101340",
      role: "Direktur Utama PT PMLI",
      email: "bambang.i@pmli.co.id",
      phone: "081188776655",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    adminWalletInfo: "Subsidi Pelatihan Anak Perusahaan - Disetujui",
    certificateStatus: "Sudah Diunduh",
    chaptersProgress: [
      { title: "BERLABUH : Let's Talk Transformation #2", completed: true, score: 95 },
      { title: "Strategic Thinking & Problem Solving", completed: true, score: 94 },
      { title: "Execution Excellence & Team Dynamics", completed: true, score: 93 },
      { title: "Post-Assessment & Evaluasi", completed: true, score: 94 }
    ]
  }
];

const PRESET_SKILL_CATEGORIES = [
  "Leadership & Team Building",
  "Container Terminal Operations & Equipment",
  "Port Safety, Health & Environment (HSE)",
  "Maritime Supply Chain & Logistics Agility",
  "Port Engineering & Marine Machinery",
  "Strategic Thinking & Business Decision Making",
  "ISPS Code & Port Facility Security",
  "AKHLAK Values & Corporate Governance",
  "Data Analytics & Smart Port Transformation"
];

const INITIAL_TRAINERS: TrainerDetail[] = [
  {
    id: "1",
    name: "Muhammad Khairoudin",
    category: "Internal",
    role: "Head Manager Container",
    company: "PT Pelabuhan Indonesia",
    competency: "Leadership and Team Building",
    hours: 128,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "muhammad.khairoudin@gmail.com",
    phone: "+62 812-3456-7890",
    nipp: "11002853",
    about: "Berpengalaman lebih dari 8 tahun dalam pengembangan SDM dan pelatihan, dengan spesialisasi pada leadership, manajemen tim, dan pengembangan organisasi. Berfokus membantu peserta mengembangkan kemampuan kepemimpinan dan meningkatkan efektivitas kerja melalui pembelajaran yang aplikatif.",
    skills: [
      { id: "s1", category: "Leadership & Team Building", rate: 9 },
      { id: "s2", category: "Container Terminal Operations & Equipment", rate: 8 },
      { id: "s3", category: "Port Safety, Health & Environment (HSE)", rate: 9 },
      { id: "s4", category: "Strategic Thinking & Business Decision Making", rate: 8 }
    ],
    courses: [
      { 
        id: "c-101", 
        no: 1, 
        title: "Leadership Fundamentals", 
        batch: "Program Leadership Batch 3", 
        category: "Leadership", 
        period: "12 Mei 2025 - 12 Juni 2025", 
        duration: "10 Jam", 
        learningHours: 10,
        participantsCount: "24 Peserta", 
        rating: 4.8,
        bannerImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
        description: "Program pelatihan kepemimpinan berbobot 10 Learning Hours (LH) yang dirancang khusus bagi para calon pemimpin operasional dan manajerial di lingkungan Pelindo Group untuk menguasai kompetensi inti AKHLAK, strategic agility, dan coaching tim.",
        chapters: DEFAULT_CHAPTERS,
        participants: DEFAULT_PARTICIPANTS
      },
      { 
        id: "c-102", 
        no: 2, 
        title: "Problem Solving & Decsion Making", 
        batch: "Pelatihan Kompetensi Inti", 
        category: "Core Competency", 
        period: "12 Mei 2025 - 12 Juni 2025", 
        duration: "20 Jam", 
        learningHours: 20,
        participantsCount: "24 Peserta", 
        rating: 4.8,
        bannerImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80",
        description: "Metodologi terstruktur pemecahan masalah kritis dan pengambilan keputusan operasional maritim berbasis data analitik dan mitigasi risiko operasional.",
        chapters: DEFAULT_CHAPTERS,
        participants: DEFAULT_PARTICIPANTS
      }
    ]
  },
  {
    id: "2",
    name: "Evelyn Halim Perdana",
    category: "Eksternal",
    role: "Head Manager Container",
    company: "Coursera",
    competency: "Leadership and Team Building",
    hours: 128,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    email: "evelyn.perdana@coursera.partner.com",
    phone: "+62 811-9876-5432",
    nipp: "EXT-88210",
    about: "Konsultan SDM Senior & Master Trainer tersertifikasi internasional dengan spesialisasi pengembangan kepemimpinan maritim dan transformasi budaya kerja industri logistik.",
    skills: [
      { id: "s1", category: "Maritime Supply Chain & Logistics Agility", rate: 10 },
      { id: "s2", category: "Leadership & Team Building", rate: 9 },
      { id: "s3", category: "Data Analytics & Smart Port Transformation", rate: 8 }
    ],
    courses: [
      { 
        id: "c-201", 
        no: 1, 
        title: "Maritime Supply Chain Agility", 
        batch: "Executive Batch 1", 
        category: "Supply Chain", 
        period: "10 April 2025 - 20 April 2025", 
        duration: "14 Jam", 
        learningHours: 14,
        participantsCount: "30 Peserta", 
        rating: 4.9,
        bannerImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
        description: "Strategi ketahanan rantai pasok maritim dan pelabuhan global menghadapi disrupsi logistik.",
        chapters: DEFAULT_CHAPTERS,
        participants: DEFAULT_PARTICIPANTS
      }
    ]
  }
];

const INTERNAL_CANDIDATES: CandidateEmployee[] = [
  { id: "c1", name: "Muhammad Khairoudin", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
  { id: "c2", name: "Anwar Kamatura", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
  { id: "c3", name: "Edwin Vanderman", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
  { id: "c4", name: "Sulaiman Wisnuma", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" },
  { id: "c5", name: "Joko Susono", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" },
  { id: "c6", name: "Yanto Cipto Kusumo", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
  { id: "c7", name: "Dendi Karno", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" },
  { id: "c8", name: "Hermansyah Abdali", role: "Officer I Fasilitas Terminal", nipp: "11051312", unit: "Terminal Petikemas Ternate SPTP", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80" },
];

export default function TrainerModule(props?: any) {
  // Views: "list" | "profile" | "course_detail" | "chapter_detail" | "add_external" | "edit_external" | "add_internal" | "edit_internal"
  const [currentView, setCurrentView] = useState<"list" | "profile" | "course_detail" | "chapter_detail" | "add_external" | "edit_external" | "add_internal" | "edit_internal">("list");
  
  // Selected State
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerDetail>(INITIAL_TRAINERS[0]);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetailItem>(INITIAL_TRAINERS[0].courses[0]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem>(DEFAULT_CHAPTERS[0]);

  // NEW: Participant Modal State (Screenshot 14.54.00)
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantDetailItem>(DEFAULT_PARTICIPANTS[0]);
  const [notifSentSuccess, setNotifSentSuccess] = useState(false);

  // Main List Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [competencyFilter, setCompetencyFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  // Course Detail Tab
  const [courseTab, setCourseTab] = useState<"materi" | "peserta" | "rating">("materi");
  const [participantSearch, setParticipantSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("Semua Entitas");

  // Trainers Dataset
  const [trainers, setTrainers] = useState<TrainerDetail[]>(INITIAL_TRAINERS);

  // Modals & Popups
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showSelectInternalModal, setShowSelectInternalModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showSuccessSaveModal, setShowSuccessSaveModal] = useState(false);

  // Form State for Add/Edit
  const [formName, setFormName] = useState("Muhammad Khairoudin");
  const [formRole, setFormRole] = useState("Head Manager Container");
  const [formCompany, setFormCompany] = useState("PT Pelabuhan Indonesia");
  const [formVendor, setFormVendor] = useState("Coursera");
  const [formEmail, setFormEmail] = useState("muhammad.khairoudin@gmail.com");
  const [formPhone, setFormPhone] = useState("+62 812-3456-7890");
  const [formCompetency, setFormCompetency] = useState("Leadership & Team Building");
  const [formAbout, setFormAbout] = useState("Template sertifikat untuk berbagai program pelatihan dan pengembangan kompetensi peserta.");
  const [formAvatar, setFormAvatar] = useState(selectedTrainer.avatar);

  // Dynamic Skills (Min 3, Rate 1-10)
  const [formSkills, setFormSkills] = useState<TrainerSkill[]>([
    { id: "sk-1", category: "Leadership & Team Building", rate: 9 },
    { id: "sk-2", category: "Container Terminal Operations & Equipment", rate: 8 },
    { id: "sk-3", category: "Port Safety, Health & Environment (HSE)", rate: 9 }
  ]);

  // Skill Handlers
  const handleAddSkillRow = () => {
    const newId = `sk-${Date.now()}`;
    const nextCategory = PRESET_SKILL_CATEGORIES.find(cat => !formSkills.some(s => s.category === cat)) || "Kompetensi Manajerial";
    setFormSkills([...formSkills, { id: newId, category: nextCategory, rate: 8 }]);
  };

  const handleRemoveSkillRow = (id: string) => {
    setFormSkills(formSkills.filter(s => s.id !== id));
  };

  const handleUpdateSkillCategory = (id: string, category: string) => {
    setFormSkills(formSkills.map(s => s.id === id ? { ...s, category } : s));
  };

  const handleUpdateSkillRate = (id: string, rate: number) => {
    const cleanRate = Math.max(1, Math.min(10, rate));
    setFormSkills(formSkills.map(s => s.id === id ? { ...s, rate: cleanRate } : s));
  };

  // Filtered Trainer List
  const filteredTrainers = trainers.filter(t => {
    const matchCategory = categoryFilter === "Semua" || t.category === categoryFilter;
    const matchCompetency = competencyFilter === "Semua" || 
      t.competency.toLowerCase().includes(competencyFilter.toLowerCase()) ||
      t.skills?.some(s => s.category.toLowerCase().includes(competencyFilter.toLowerCase()));
    const matchQuery = !searchQuery || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.competency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchCompetency && matchQuery;
  });

  // Handler: Click Card to open Profile
  const handleOpenProfile = (trainer: TrainerDetail) => {
    setSelectedTrainer(trainer);
    setCurrentView("profile");
  };

  // Handler: Click Course Row to open Course Detail
  const handleOpenCourseDetail = (course: CourseDetailItem) => {
    setSelectedCourse(course);
    setCurrentView("course_detail");
  };

  // Handler: Click Chapter to open Beautified Chapter Detail
  const handleOpenChapterDetail = (chapter: ChapterItem) => {
    setSelectedChapter(chapter);
    setCurrentView("chapter_detail");
  };

  // Handler: Click Participant row to open Popup Modal
  const handleOpenParticipantDetail = (participant: ParticipantDetailItem) => {
    setSelectedParticipant(participant);
    setNotifSentSuccess(false);
    setShowParticipantModal(true);
  };

  // Handler: Open Edit Profile
  const handleOpenEdit = () => {
    setFormName(selectedTrainer.name);
    setFormRole(selectedTrainer.role);
    setFormCompany(selectedTrainer.company);
    setFormVendor(selectedTrainer.company);
    setFormEmail(selectedTrainer.email);
    setFormPhone(selectedTrainer.phone);
    setFormCompetency(selectedTrainer.competency);
    setFormAbout(selectedTrainer.about);
    setFormAvatar(selectedTrainer.avatar);
    setFormSkills(selectedTrainer.skills && selectedTrainer.skills.length >= 3 ? selectedTrainer.skills : [
      { id: "sk-1", category: "Leadership & Team Building", rate: 9 },
      { id: "sk-2", category: "Container Terminal Operations & Equipment", rate: 8 },
      { id: "sk-3", category: "Port Safety, Health & Environment (HSE)", rate: 9 }
    ]);

    if (selectedTrainer.category === "Internal") {
      setCurrentView("edit_internal");
    } else {
      setCurrentView("edit_external");
    }
  };

  // Handler: Select Candidate from Internal Directory Modal
  const handleSelectCandidate = (candidate: CandidateEmployee) => {
    setShowSelectInternalModal(false);
    setFormName(candidate.name);
    setFormRole(candidate.role);
    setFormCompany("PT Pelabuhan Indonesia");
    setFormEmail(`${candidate.name.toLowerCase().replace(/\s+/g, ".")}@pelindo.co.id`);
    setFormPhone("+62 812-3456-7890");
    setFormCompetency("Leadership & Team Building");
    setFormAbout("Pegawai berprestasi dengan kompetensi teknis dan manajerial teruji yang diajukan sebagai internal trainer Pelindo.");
    setFormAvatar(candidate.avatar);
    setFormSkills([
      { id: "sk-1", category: "Container Terminal Operations & Equipment", rate: 9 },
      { id: "sk-2", category: "Port Safety, Health & Environment (HSE)", rate: 8 },
      { id: "sk-3", category: "Leadership & Team Building", rate: 8 }
    ]);
    setCurrentView("add_internal");
  };

  // Handler: Validate & Trigger Confirmation Save
  const handleValidateAndSubmit = () => {
    if (formSkills.length < 3) {
      alert(`Peringatan: Minimal 3 kategori/katalog keahlian wajib diisi! (Saat ini baru ada ${formSkills.length} keahlian).`);
      return;
    }
    for (const s of formSkills) {
      if (!s.category.trim()) {
        alert("Peringatan: Nama katalog/kategori keahlian tidak boleh kosong!");
        return;
      }
    }
    setShowConfirmSaveModal(true);
  };

  // Handler: Save Trainer Form
  const handleConfirmSave = () => {
    setShowConfirmSaveModal(false);
    setShowSuccessSaveModal(true);

    if (currentView === "add_internal" || currentView === "add_external") {
      const isInternal = currentView === "add_internal";
      const newTr: TrainerDetail = {
        id: String(Date.now()),
        name: formName,
        category: isInternal ? "Internal" : "Eksternal",
        role: formRole,
        company: isInternal ? formCompany : formVendor,
        competency: formSkills[0]?.category || formCompetency,
        hours: 0,
        rating: 5.0,
        avatar: formAvatar,
        email: formEmail,
        phone: formPhone,
        nipp: isInternal ? "11051399" : "EXT-9901",
        about: formAbout,
        skills: formSkills,
        courses: []
      };
      setTrainers([newTr, ...trainers]);
      setSelectedTrainer(newTr);
    } else {
      const updated = {
        ...selectedTrainer,
        name: formName,
        role: formRole,
        company: selectedTrainer.category === "Internal" ? formCompany : formVendor,
        email: formEmail,
        phone: formPhone,
        competency: formSkills[0]?.category || formCompetency,
        about: formAbout,
        avatar: formAvatar,
        skills: formSkills
      };
      setTrainers(trainers.map(t => t.id === selectedTrainer.id ? updated : t));
      setSelectedTrainer(updated);
    }

    setTimeout(() => {
      setShowSuccessSaveModal(false);
      setCurrentView("profile");
    }, 1500);
  };

  // Handler: Send Notification to Participant
  const handleSendNotification = () => {
    setNotifSentSuccess(true);
    setTimeout(() => {
      setNotifSentSuccess(false);
    }, 4000);
  };

  // Filtered Participants in Course Detail
  const filteredParticipants = (selectedCourse.participants || []).filter(p => {
    const matchCompany = companyFilter === "Semua Entitas" || p.company.includes(companyFilter);
    const matchQuery = !participantSearch || 
      p.name.toLowerCase().includes(participantSearch.toLowerCase()) ||
      p.nipp.includes(participantSearch) ||
      p.company.toLowerCase().includes(participantSearch.toLowerCase());
    return matchCompany && matchQuery;
  });

  return (
    <div className="space-y-6 select-none font-sans">

      {/* =========================================================================
          VIEW 1: MAIN TRAINER MANAGEMENT PAGE (SCREENSHOT 14.18.00)
         ========================================================================= */}
      {currentView === "list" && (
        <div className="space-y-6">
          
          {/* Header & Breadcrumbs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-medium flex items-center gap-2 mb-1">
                <span>LMS</span>
                <span>&gt;</span>
                <span className="text-slate-700 font-semibold">Manajemen Trainer</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manajemen Trainer</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Modul berisi trainer internal maupun eksternal yang tergabung pada aplikasi Portaverse.
              </p>
            </div>

            {/* "+ Tambah Trainer" Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="px-5 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20 transition shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Trainer</span>
              </button>

              {showAddMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-30 text-xs animate-in fade-in">
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      setShowSelectInternalModal(true);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-800 transition flex items-center gap-2"
                  >
                    <Users className="w-4 h-4 text-[#016DB2]" />
                    <span>Tambah Trainer Internal</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      setFormName("");
                      setFormRole("");
                      setFormVendor("Coursera");
                      setFormEmail("");
                      setFormPhone("");
                      setFormCompetency("Leadership & Team Building");
                      setFormAbout("Spesialis pelatihan bersertifikat internasional dengan keahlian aplikatif.");
                      setFormAvatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80");
                      setFormSkills([
                        { id: "sk-1", category: "Leadership & Team Building", rate: 9 },
                        { id: "sk-2", category: "Maritime Supply Chain & Logistics Agility", rate: 9 },
                        { id: "sk-3", category: "Strategic Thinking & Business Decision Making", rate: 8 }
                      ]);
                      setCurrentView("add_external");
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-800 transition flex items-center gap-2"
                  >
                    <Building className="w-4 h-4 text-amber-600" />
                    <span>Tambah Trainer External</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search & Filter Bar */}
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

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={competencyFilter}
                  onChange={(e) => setCompetencyFilter(e.target.value)}
                  className="w-full sm:w-48 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs"
                >
                  <option value="Semua">Kompetensi: Semua</option>
                  <option value="Leadership">Leadership & Team Building</option>
                  <option value="Supply Chain">Supply Chain</option>
                  <option value="Core">Core Competency</option>
                  <option value="Safety">Safety & HSE</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>

              <div className="relative flex-1 sm:flex-none">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-44 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#016DB2] appearance-none pr-8 shadow-xs"
                >
                  <option value="Semua">Kategori: Semua</option>
                  <option value="Internal">Internal</option>
                  <option value="Eksternal">Eksternal</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-600">
            Total {filteredTrainers.length} Trainer
          </div>

          {/* Grid of Trainer Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                onClick={() => handleOpenProfile(trainer)}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 p-4 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs group-hover:scale-105 transition duration-200"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-[#016DB2] transition">
                        {trainer.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {trainer.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${trainer.category === "Internal" ? "bg-sky-50 text-[#016DB2] border-sky-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                      {trainer.category}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold">
                      {trainer.hours} Jam
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <span>{trainer.rating}</span>
                      <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Kompetensi Utama</span>
                    <span className="font-bold text-slate-600">{(trainer.skills || []).length} Katalog</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate mt-0.5">
                    {trainer.competency}
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
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
              </div>
            </div>
            <div>1-8 dari 8032</div>
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

      {/* =========================================================================
          VIEW 2: TRAINER PROFILE DETAIL
         ========================================================================= */}
      {currentView === "profile" && (
        <div className="space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button 
              onClick={() => setCurrentView("list")}
              className="hover:text-[#016DB2] transition font-medium"
            >
              LMS
            </button>
            <span>&gt;</span>
            <button 
              onClick={() => setCurrentView("list")}
              className="hover:text-[#016DB2] transition font-medium"
            >
              Manajemen Trainer
            </button>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">Trainer Profile</span>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={selectedTrainer.avatar}
                  alt={selectedTrainer.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow-sm"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg font-black text-slate-900">{selectedTrainer.name}</h2>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${selectedTrainer.category === "Internal" ? "bg-sky-50 text-[#016DB2] border-sky-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    {selectedTrainer.category}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  {selectedTrainer.nipp} &bull; {selectedTrainer.role} &bull; <b className="text-slate-700">{selectedTrainer.company}</b> &bull; {selectedTrainer.competency}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5 hover:text-slate-800">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTrainer.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-slate-800">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTrainer.phone}</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenEdit}
              className="px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition self-start md:self-center"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Section: Tentang */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-2">
            <h3 className="font-extrabold text-sm text-slate-900">Tentang</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedTrainer.about}
            </p>
          </div>

          {/* Katalog & Rate Keahlian Trainer */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#016DB2]" />
                  <span>Katalog &amp; Rate Keahlian Trainer (Skala 1 - 10)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Penilaian tingkat penguasaan instruktur per bidang kompetensi spesifik</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-sky-50 text-[#016DB2] border border-sky-100 rounded-lg">
                {(selectedTrainer.skills || []).length} Katalog Keahlian Terdaftar
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {(selectedTrainer.skills || []).map((skill, idx) => (
                <div key={skill.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-slate-900 leading-snug">{skill.category}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[11px] font-black shrink-0">
                      {skill.rate} / 10
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${skill.rate >= 9 ? "bg-emerald-500" : skill.rate >= 7 ? "bg-[#016DB2]" : "bg-amber-500"}`}
                        style={{ width: `${skill.rate * 10}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>Rate: {skill.rate}/10</span>
                      <span>{skill.rate >= 9 ? "Expert / Master" : skill.rate >= 7 ? "Proficient" : "Intermediate"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Total Jam Mengajar</div>
                <div className="text-2xl font-black text-slate-900">{selectedTrainer.hours} Jam</div>
                <div className="text-[11px] text-slate-400">Setara {Math.round(selectedTrainer.hours / 8)} Hari</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#016DB2] flex items-center justify-center border border-sky-100">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Total Materi/Kursus</div>
                <div className="text-2xl font-black text-slate-900">18</div>
                <div className="text-[11px] text-slate-400">Kursus</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Sesi Mengajar</div>
                <div className="text-2xl font-black text-slate-900">36</div>
                <div className="text-[11px] text-slate-400">Sesi</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Rata-rata Rating</div>
                <div className="text-2xl font-black text-slate-900">{selectedTrainer.rating}/5</div>
                <div className="text-[11px] text-slate-400">Dari 152 Evaluasi</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Section: Riwayat Mengajar Terbaru */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Riwayat Mengajar Terbaru</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Klik pada baris materi/kursus di bawah ini untuk melihat <b>Detail Lengkap Kursus, Banner, Chapter, dan Peserta</b></p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari Kursus atau Kategori"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white"
                />
              </div>

              <div className="relative w-full sm:w-44">
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 appearance-none pr-8">
                  <option>Kategori: Semua</option>
                  <option>Leadership</option>
                  <option>Core Competency</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Teaching History Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                    <th className="pb-3 pl-2">No</th>
                    <th className="pb-3">Materi/Kursus ⇅</th>
                    <th className="pb-3">Kategori ⇅</th>
                    <th className="pb-3">Tanggal Periode ⇅</th>
                    <th className="pb-3">Durasi ⇅</th>
                    <th className="pb-3">Peserta ⇅</th>
                    <th className="pb-3 text-right">Rating ⇅</th>
                    <th className="pb-3 pr-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {selectedTrainer.courses.length > 0 ? (
                    selectedTrainer.courses.map((c) => (
                      <tr 
                        key={c.no} 
                        onClick={() => handleOpenCourseDetail(c)}
                        className="hover:bg-sky-50/60 cursor-pointer transition group"
                        title="Klik untuk membuka detail kursus ini"
                      >
                        <td className="py-3.5 pl-2 text-slate-400">{c.no}</td>
                        <td className="py-3.5">
                          <div className="font-bold text-slate-900 group-hover:text-[#016DB2] transition flex items-center gap-1.5">
                            <span>{c.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#016DB2] transition" />
                          </div>
                          <div className="text-[11px] text-slate-400">{c.batch}</div>
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${c.category === "Leadership" ? "bg-sky-50 text-[#016DB2] border-sky-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                            {c.category}
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-500">{c.period}</td>
                        <td className="py-3.5 font-semibold text-slate-800">{c.duration}</td>
                        <td className="py-3.5 text-slate-600">{c.participantsCount}</td>
                        <td className="py-3.5 text-right">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                            {c.rating}
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          </span>
                        </td>
                        <td className="py-3.5 pr-2 text-right">
                          <span className="px-2.5 py-1 bg-white group-hover:bg-[#016DB2] group-hover:text-white text-[#016DB2] border border-slate-200 group-hover:border-[#016DB2] rounded-lg text-[10px] font-bold transition shadow-2xs">
                            Buka Detail
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        Belum ada riwayat mengajar kursus yang tercatat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Tampilkan</span>
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
                  <option>8</option>
                </select>
              </div>
              <div>1-8 dari 8032</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">
                  Sebelumnya
                </button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">
                  Berikutnya
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW 3: DATA DETAIL KURSUS
         ========================================================================= */}
      {currentView === "course_detail" && (
        <div className="space-y-6">
          
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button 
              onClick={() => setCurrentView("profile")}
              className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#016DB2] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back ke Profile Trainer</span>
            </button>
            <span>|</span>
            <span>LMS</span>
            <span>&gt;</span>
            <button onClick={() => setCurrentView("list")} className="hover:underline">Manajemen Trainer</button>
            <span>&gt;</span>
            <button onClick={() => setCurrentView("profile")} className="hover:underline">Trainer Profile</button>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">Detail Kursus</span>
          </div>

          {/* Banner Kursus / Kelas */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 text-white min-h-[220px] flex flex-col justify-between p-6 md:p-8">
            <img 
              src={selectedCourse.bannerImage} 
              alt={selectedCourse.title}
              className="absolute inset-0 w-full h-full object-cover opacity-35 filter saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600/90 text-white rounded-lg text-xs font-black tracking-wider uppercase backdrop-blur-md">
                  {selectedCourse.category}
                </span>
                <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold backdrop-blur-md border border-white/20">
                  {selectedCourse.batch}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/90 text-white rounded-lg text-xs font-bold shadow-sm">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>{selectedCourse.rating} / 5.0</span>
                <span className="text-[10px] font-normal opacity-90">(152 Rating)</span>
              </div>
            </div>

            <div className="relative z-10 space-y-2 mt-4">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {selectedCourse.title}
              </h1>
              <p className="text-xs md:text-sm text-slate-200 max-w-3xl leading-relaxed">
                {selectedCourse.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
                <span>Instruktur: <b className="text-white font-bold">{selectedTrainer.name}</b> ({selectedTrainer.role})</span>
              </div>
            </div>
          </div>

          {/* 4 Detail Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Learning Hour (LH)</div>
                <div className="text-2xl font-black text-[#016DB2]">{selectedCourse.learningHours} Jam LH</div>
                <div className="text-[11px] text-slate-400">Total Durasi Pembelajaran</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#016DB2] flex items-center justify-center border border-sky-100">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Periode Kursus</div>
                <div className="text-sm font-black text-slate-900 mt-1">{selectedCourse.period}</div>
                <div className="text-[11px] text-emerald-600 font-semibold">Aktif &amp; Terjadwal</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">List Peserta Terdaftar</div>
                <div className="text-2xl font-black text-slate-900">{selectedCourse.participants.length} Orang</div>
                <div className="text-[11px] text-slate-400">Dari berbagai entitas Pelindo</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Rating Kursus</div>
                <div className="text-2xl font-black text-slate-900">{selectedCourse.rating} / 5.0</div>
                <div className="text-[11px] text-slate-400">Tingkat Kepuasan 98%</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Detail Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex border-b border-slate-200 px-6 pt-3 gap-6 text-xs font-bold text-slate-500 bg-slate-50/50">
              <button
                onClick={() => setCourseTab("materi")}
                className={`pb-3 border-b-2 transition flex items-center gap-2 ${courseTab === "materi" ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Chapter &amp; Silabus Materi ({selectedCourse.chapters.length})</span>
              </button>

              <button
                onClick={() => setCourseTab("peserta")}
                className={`pb-3 border-b-2 transition flex items-center gap-2 ${courseTab === "peserta" ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
              >
                <Users className="w-4 h-4" />
                <span>List Peserta &amp; Progress ({selectedCourse.participants.length})</span>
              </button>

              <button
                onClick={() => setCourseTab("rating")}
                className={`pb-3 border-b-2 transition flex items-center gap-2 ${courseTab === "rating" ? "border-[#016DB2] text-[#016DB2]" : "border-transparent hover:text-slate-800"}`}
              >
                <Star className="w-4 h-4" />
                <span>Evaluasi &amp; Ulasan Rating</span>
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* TAB 1: CHAPTER / SILABUS MATERI */}
              {courseTab === "materi" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">Struktur Kurikulum &amp; Chapter Pembelajaran</h3>
                      <p className="text-xs text-slate-500">
                        Klik pada salah satu kartu chapter untuk membuka <b>Detail Chapter, Deskripsi Lengkap, Learning Hour &amp; Akses Media</b>.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#016DB2] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                      Total: {selectedCourse.learningHours} Learning Hours
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedCourse.chapters.map((chap, idx) => (
                      <div 
                        key={chap.id || idx}
                        onClick={() => handleOpenChapterDetail(chap)}
                        className="p-4 bg-slate-50/80 hover:bg-sky-50/60 rounded-2xl border border-slate-200 hover:border-sky-300 flex flex-col md:flex-row md:items-center justify-between gap-4 transition cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#016DB2] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs group-hover:bg-[#016DB2] group-hover:text-white transition">
                            {chap.number || idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-sky-100 text-[#016DB2] rounded text-[10px] font-bold">
                                Chapter {chap.number || idx + 1}
                              </span>
                            </div>
                            <h4 className="font-bold text-xs text-slate-900 mt-1 group-hover:text-[#016DB2] transition line-clamp-1">
                              {chap.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                              <span className="flex items-center gap-1 text-slate-600 font-semibold">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {chap.learningHour || "01:30:00"}
                              </span>
                              <span>&bull;</span>
                              <span>{chap.periodText || "2 - 4 September 2026"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <span className="px-2.5 py-1 bg-white text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold capitalize">
                            Tipe: {chap.type}
                          </span>
                          <button 
                            type="button"
                            className="px-3.5 py-1.5 bg-[#016DB2] group-hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                          >
                            <span>Buka Chapter</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: LIST PESERTA (CLICKABLE FOR DETAIL POPUP) */}
              {courseTab === "peserta" && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative flex-1 w-full">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari Peserta, Nama, atau NIPP"
                        value={participantSearch}
                        onChange={(e) => setParticipantSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div className="relative w-full sm:w-60">
                      <select 
                        value={companyFilter}
                        onChange={(e) => setCompanyFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 appearance-none pr-8"
                      >
                        <option>Semua Entitas</option>
                        <option>PT Pelabuhan Indonesia</option>
                        <option>SPTP</option>
                        <option>SPJM</option>
                        <option>SPSL</option>
                        <option>PMLI</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>

                    <button 
                      onClick={() => alert("Mengunduh laporan daftar hadir & nilai peserta...")}
                      className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" /> Export Excel
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                          <th className="pb-3 pl-2">Peserta</th>
                          <th className="pb-3">NIPP</th>
                          <th className="pb-3">Entitas / Company</th>
                          <th className="pb-3">Progress Belajar</th>
                          <th className="pb-3">Nilai Akhir</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 pr-2 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {filteredParticipants.map((p) => (
                          <tr 
                            key={p.id} 
                            onClick={() => handleOpenParticipantDetail(p)}
                            className="hover:bg-sky-50/60 cursor-pointer transition group"
                            title="Klik untuk membuka popup Detail Peserta"
                          >
                            <td className="py-3 pl-2">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:scale-105 transition"
                                />
                                <div>
                                  <div className="font-bold text-slate-900 group-hover:text-[#016DB2] transition">{p.name}</div>
                                  <div className="text-[11px] text-slate-400">Peserta Aktif</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 font-mono text-slate-600">{p.nipp}</td>
                            <td className="py-3">
                              <span className="font-semibold text-slate-800">{p.company}</span>
                            </td>
                            <td className="py-3 w-40">
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-slate-600">
                                  <span>{p.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${p.progress === 100 ? "bg-emerald-500" : "bg-[#016DB2]"}`}
                                    style={{ width: `${p.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 font-bold text-slate-900">{p.score} / 100</td>
                            <td className="py-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.status === "Selesai" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="py-3 pr-2 text-right">
                              <span className="px-2.5 py-1 bg-white group-hover:bg-[#016DB2] group-hover:text-white text-[#016DB2] border border-slate-200 group-hover:border-[#016DB2] rounded-lg text-[10px] font-bold transition shadow-2xs">
                                Detail Peserta
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: RATING */}
              {courseTab === "rating" && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-around gap-6">
                    <div className="text-center space-y-1">
                      <div className="text-4xl font-black text-slate-900">{selectedCourse.rating}</div>
                      <div className="flex justify-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                        <Star className="w-4 h-4 fill-amber-500" />
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Berdasarkan 152 Peserta</div>
                    </div>

                    <div className="space-y-1.5 w-full max-w-xs text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6">5 ★</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[85%] rounded-full"></div>
                        </div>
                        <span className="w-8 text-right font-bold text-slate-600">85%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6">4 ★</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[12%] rounded-full"></div>
                        </div>
                        <span className="w-8 text-right font-bold text-slate-600">12%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6">3 ★</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[3%] rounded-full"></div>
                        </div>
                        <span className="w-8 text-right font-bold text-slate-600">3%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-slate-900">Ulasan Terbaru Peserta</h4>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>Yogi Muhammad Irshad (SPTP)</span>
                        <span className="text-amber-500 flex items-center gap-1">5.0 ★</span>
                      </div>
                      <p className="text-slate-600">"Penyampaian materi dari trainer sangat lugas dan aplikatif di terminal petikemas. Pembahasan studi kasus nyata sangat membantu kami."</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>Amanda Sujiwo (SPSL)</span>
                        <span className="text-amber-500 flex items-center gap-1">4.8 ★</span>
                      </div>
                      <p className="text-slate-600">"Sesi interaktif dan workshop membuat peserta sangat antusias. Materi AKHLAK dan leadership terintegrasi dengan baik."</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW 4: DETAIL CHAPTER BEAUTIFIED
         ========================================================================= */}
      {currentView === "chapter_detail" && (
        <div className="space-y-6">
          
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button 
              onClick={() => setCurrentView("course_detail")}
              className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#016DB2] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back ke Detail Kursus</span>
            </button>
            <span>|</span>
            <span>LMS</span>
            <span>&gt;</span>
            <button onClick={() => setCurrentView("list")} className="hover:underline">Manajemen Trainer</button>
            <span>&gt;</span>
            <button onClick={() => setCurrentView("profile")} className="hover:underline">Trainer Profile</button>
            <span>&gt;</span>
            <button onClick={() => setCurrentView("course_detail")} className="hover:underline">{selectedCourse.title}</button>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">Chapter {selectedChapter.number}</span>
          </div>

          {/* Hero Chapter Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 bg-[#E0F2FE] text-[#016DB2] border border-blue-200 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#016DB2]" />
                  <span>Chapter {selectedChapter.number}</span>
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Sesi Pembelajaran Aktif</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert("Membagikan tautan chapter...")}
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition"
                  title="Bagikan Chapter"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-400 font-medium">Instruktur: <b>{selectedTrainer.name}</b></span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nama Chapter</div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                {selectedChapter.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <Calendar className="w-4 h-4 text-[#016DB2]" />
                <span><b>Pelaksanaan:</b> {selectedChapter.periodText}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 text-[#016DB2] font-bold">
                <Clock className="w-4 h-4" />
                <span>Learning Hour: {selectedChapter.learningHour}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <Radio className="w-4 h-4 text-purple-600" />
                <span><b>Tipe:</b> {selectedChapter.type}</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#016DB2]" />
                    <span>Deskripsi Chapter</span>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Kurikulum Pelindo Group</span>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed space-y-3 font-normal text-justify">
                  <p className="bg-sky-50/50 p-4 rounded-2xl border-l-4 border-[#016DB2] italic text-slate-800">
                    "{selectedChapter.description.slice(0, 220)}..."
                  </p>
                  <p>
                    {selectedChapter.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800">Pilar Utama Pembahasan Transformasi:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-700">
                      <b className="text-slate-900 block mb-0.5">1. Lean &amp; Agile</b>
                      Penyederhanaan proses &amp; kejelasan kewenangan cabang.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-700">
                      <b className="text-slate-900 block mb-0.5">2. Governance Kuat</b>
                      Pola tata kelola terintegrasi holding dan anak perusahaan.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-700">
                      <b className="text-slate-900 block mb-0.5">3. One Pelindo Sinergi</b>
                      Peta peran akuntabel antar fungsi operasional maritim.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Materi Tambahan &amp; Bahan Bacaan</span>
                </h3>
                
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-[10px]">
                        PDF
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Materi Paparan Pokja Streamlining 2026.pdf</div>
                        <div className="text-[10px] text-slate-400">Ukuran: 4.2 MB &bull; Edisi Agustus 2026</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert("Mengunduh Materi Paparan Pokja Streamlining 2026.pdf...")}
                      className="px-3 py-1.5 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg font-bold text-slate-700 flex items-center gap-1 text-[11px] shadow-2xs"
                    >
                      <Download className="w-3 h-3" /> Unduh
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#016DB2] flex items-center justify-center font-bold text-[10px]">
                        DOC
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Transkrip Tanya Jawab Podcast BERLABUH #2.docx</div>
                        <div className="text-[10px] text-slate-400">Ukuran: 1.8 MB &bull; Risalah Diskusi</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert("Mengunduh Transkrip Tanya Jawab...")}
                      className="px-3 py-1.5 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg font-bold text-slate-700 flex items-center gap-1 text-[11px] shadow-2xs"
                    >
                      <Download className="w-3 h-3" /> Unduh
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-black text-sm text-slate-900">Detail Chapter</h3>
                  <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-bold">
                    Resource Link
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tipe Chapter</div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-800 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-[#016DB2]" />
                      <span>{selectedChapter.type}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Link Pembelajaran</div>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
                      <div className="font-mono text-[11px] text-[#016DB2] font-semibold break-all">
                        {selectedChapter.link}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedChapter.link);
                            alert("Link berhasil disalin ke clipboard!");
                          }}
                          className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-700 flex items-center justify-center gap-1.5 text-[11px] transition shadow-2xs"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Salin Link</span>
                        </button>

                        <a
                          href={selectedChapter.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 bg-[#016DB2] hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 text-[11px] transition shadow-2xs"
                        >
                          <span>Buka Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-inner space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs truncate">Podcast BERLABUH Pelindo</div>
                        <div className="text-[10px] text-slate-300">Episode #2 &bull; 01:30:00</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-[#016DB2]"></div>
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                        <span>01:00:00</span>
                        <span>01:30:00</span>
                      </div>
                    </div>

                    <div className="flex justify-center pt-1">
                      <button 
                        onClick={() => alert("Memutar audio podcast BERLABUH #2...")}
                        className="px-4 py-1.5 bg-white text-slate-900 rounded-full font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 transition shadow-sm"
                      >
                        <PlayCircle className="w-4 h-4 fill-slate-900 text-white" />
                        <span>Dengarkan Podcast</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setCurrentView("course_detail")}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Silabus Kursus</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const nextChapter = selectedCourse.chapters[1] || selectedCourse.chapters[0];
                handleOpenChapterDetail(nextChapter);
              }}
              className="px-5 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md shadow-blue-600/20 flex items-center gap-1.5"
            >
              <span>Lanjut ke Chapter 2</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* =========================================================================
          POPUP MODAL: DETAIL PESERTA (MATCHING SCREENSHOT 14.54.00 BUT BEAUTIFIED!)
         ========================================================================= */}
      {showParticipantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#016DB2] flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Detail Peserta</h3>
                  <p className="text-[11px] text-slate-400">Informasi progres, status persetujuan alur kelas, dan data atasan peserta</p>
                </div>
              </div>
              <button 
                onClick={() => setShowParticipantModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-7 overflow-y-auto space-y-6">
              
              {/* Peserta Profile Banner Card */}
              <div className="p-5 bg-gradient-to-r from-sky-50/80 via-white to-slate-50/50 rounded-2xl border border-sky-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={selectedParticipant.avatar}
                      alt={selectedParticipant.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base text-slate-900 uppercase tracking-tight">
                        {selectedParticipant.name}
                      </h4>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                        {selectedParticipant.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 font-medium">
                      <b className="font-mono text-slate-700">{selectedParticipant.nipp}</b> &bull; {selectedParticipant.company}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-[11px]">{selectedParticipant.email}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-[11px]">{selectedParticipant.phone}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right self-end sm:self-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Nilai Akhir</div>
                  <div className="text-xl font-black text-slate-900">{selectedParticipant.score} / 100</div>
                </div>
              </div>

              {/* 2-Column Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
                
                {/* Left Column: Progress Chapter (4 Cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900">Progress Chapter</h4>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {selectedParticipant.chaptersProgress.filter(c => c.completed).length} / {selectedParticipant.chaptersProgress.length} Selesai
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {selectedParticipant.chaptersProgress.map((chap, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-slate-200 hover:border-sky-300 transition flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${chap.completed ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-slate-100 text-slate-400"}`}>
                            {chap.completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                          </div>
                          <span className="font-medium text-slate-800 line-clamp-1 text-[11px]">
                            {chap.title}
                          </span>
                        </div>

                        {chap.completed ? (
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold shrink-0">On-going</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Progress Kelas, Status Flow Stepper, Atasan, Wallet, Sertifikat, Notifikasi (7 Cols) */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Progress Kelas */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Progress Kelas</span>
                      <span className="font-black text-[#016DB2]">{selectedParticipant.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${selectedParticipant.progress === 100 ? "bg-[#016DB2]" : "bg-sky-500"}`}
                        style={{ width: `${selectedParticipant.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Status Kelas (Interactive 6-step Flow) */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs text-slate-900">Status Kelas</h5>
                    
                    <div className="relative py-2">
                      <div className="absolute top-5 left-4 right-4 h-0.5 bg-emerald-500 z-0"></div>
                      
                      <div className="relative z-10 grid grid-cols-6 gap-1 text-center">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-600 leading-tight">
                            Menunggu Persetujuan Atasan
                          </span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-600 leading-tight">
                            Menunggu Persetujuan Admin Wallet
                          </span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-600 leading-tight">
                            Menunggu PIC Kelas
                          </span>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-600 leading-tight">
                            Belum Mulai
                          </span>
                        </div>

                        {/* Step 5 */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-600 leading-tight">
                            Sedang Berjalan
                          </span>
                        </div>

                        {/* Step 6 */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#016DB2] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-black text-[#016DB2] leading-tight">
                            Selesai
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informasi Atasan */}
                  <div className="space-y-1.5">
                    <h5 className="font-bold text-xs text-slate-900">Informasi Atasan</h5>
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedParticipant.atasan.avatar}
                          alt={selectedParticipant.atasan.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                        <div className="text-xs space-y-0.5">
                          <div className="font-black text-slate-900 uppercase">{selectedParticipant.atasan.name}</div>
                          <div className="text-[11px] text-slate-500">{selectedParticipant.atasan.nipp} &bull; {selectedParticipant.atasan.role}</div>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-0.5">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedParticipant.atasan.email}</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedParticipant.atasan.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informasi Admin Wallet */}
                  <div className="space-y-1 text-xs">
                    <h5 className="font-bold text-slate-900">Informasi Admin Wallet</h5>
                    <p className="text-slate-500 text-[11px] italic">
                      {selectedParticipant.adminWalletInfo}
                    </p>
                  </div>

                  {/* Status Sertifikat */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <span>Status Sertifikat</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-sky-50 text-[#016DB2] border border-sky-200 rounded-lg text-xs font-bold inline-block">
                        {selectedParticipant.certificateStatus}
                      </span>
                    </div>
                  </div>

                  {/* Notifikasi Peserta */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <h5 className="font-bold text-slate-900">Notifikasi Peserta</h5>
                    <p className="text-slate-500 text-[11px]">
                      Kirim notifikasi ke peserta untuk mengingatkan kursus atau penyelesaian tugas.
                    </p>

                    {notifSentSuccess && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Notifikasi pengingat berhasil dikirimkan ke aplikasi Portaverse peserta!</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSendNotification}
                      className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm shadow-blue-600/20"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Kirim Notifikasi</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-7 py-3.5 border-t border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-400">
                LMS Portaverse &bull; Enterprise Learning Management
              </span>
              <button
                type="button"
                onClick={() => setShowParticipantModal(false)}
                className="px-5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition shadow-2xs"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5 & 6: FORM TAMBAH / EDIT TRAINER EXTERNAL
         ========================================================================= */}
      {(currentView === "add_external" || currentView === "edit_external") && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => setCurrentView(currentView === "add_external" ? "list" : "profile")} className="flex items-center gap-1 text-slate-700 font-bold hover:text-[#016DB2]">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span>|</span>
            <span>LMS</span>
            <span>&gt;</span>
            <span>Manajemen Trainer</span>
            <span>&gt;</span>
            <span>Trainer Profile</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">
              {currentView === "add_external" ? "Tambah Trainer External" : "Edit Profile Trainer"}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentView === "add_external" ? "Tambah Trainer External" : "Edit Profile Trainer"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola data instruktur eksternal mitra penyedia pelatihan dan sertifikasi.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Pengaturan Foto Profile</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={formAvatar}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#016DB2] ring-2 ring-white"></span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert("Pilih file foto dari komputer...")}
                      className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                    >
                      Ubah Foto
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80")}
                      className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">Format file PNG, JPG. Maksimal 2MB</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-5 text-xs">
              <h3 className="font-bold text-sm text-slate-900">Pengaturan Informasi Trainer</h3>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentView === "edit_external" && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kategori Trainer<span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select disabled className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl appearance-none pr-8">
                        <option>External</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                    </div>
                  </div>
                )}
                <div className={currentView === "edit_external" ? "" : "md:col-span-2"}>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vendor<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={formVendor}
                      onChange={(e) => setFormVendor(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 focus:outline-none focus:border-[#016DB2]"
                    >
                      <option>Coursera</option>
                      <option>PMLI</option>
                      <option>DNV GL</option>
                      <option>LinkedIn Learning</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email<span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No Telepon<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tentang Trainer</label>
                <textarea
                  rows={3}
                  value={formAbout}
                  onChange={(e) => setFormAbout(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2] resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* SECTION KATALOG / KATEGORI KEAHLIAN & RATE (1-10) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#016DB2]" />
                    <span>Katalog / Kategori Keahlian &amp; Rate Kemahiran (Skala 1 - 10)</span>
                    <span className="text-red-500 font-bold">*</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Input katalog keahlian instruktur. <b>Minimal 3 kategori keahlian wajib diisi</b> dan dapat lebih dari 3.
                  </p>
                </div>

                <div>
                  {formSkills.length >= 3 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{formSkills.length} Terdaftar (Memenuhi Syarat Min. 3)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg text-xs font-bold animate-pulse">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Baru {formSkills.length}/3 (Kurang {3 - formSkills.length} lagi)</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {formSkills.map((skill, index) => (
                  <div 
                    key={skill.id}
                    className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-[#016DB2] font-black text-[11px] flex items-center justify-center shadow-2xs">
                        {index + 1}
                      </span>
                      <span className="font-bold text-slate-700">Keahlian #{index + 1}</span>
                    </div>

                    <div className="flex-1 w-full">
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Katalog / Kategori Keahlian</label>
                      <input
                        type="text"
                        list={`skill-presets-${skill.id}`}
                        value={skill.category}
                        onChange={(e) => handleUpdateSkillCategory(skill.id, e.target.value)}
                        placeholder="Pilih atau ketik kategori keahlian..."
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2]"
                      />
                      <datalist id={`skill-presets-${skill.id}`}>
                        {PRESET_SKILL_CATEGORIES.map((cat, i) => (
                          <option key={i} value={cat} />
                        ))}
                      </datalist>
                    </div>

                    <div className="w-full md:w-64">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-slate-400 font-bold">Rate Kemahiran (1 - 10)</label>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-black text-xs">
                          {skill.rate} / 10
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-bold">1</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={skill.rate}
                          onChange={(e) => handleUpdateSkillRate(skill.id, parseInt(e.target.value))}
                          className="w-full accent-[#016DB2] cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 font-bold">10</span>
                      </div>
                    </div>

                    <div className="self-end md:self-center pt-2 md:pt-4">
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillRow(skill.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleAddSkillRow}
                  className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-[#016DB2] border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Katalog Keahlian Lainnya</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  Total: <b>{formSkills.length} Keahlian</b> (Wajib minimal 3)
                </span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentView(currentView === "add_external" ? "list" : "profile")}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleValidateAndSubmit}
              className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 7 & 8: FORM TAMBAH / EDIT TRAINER INTERNAL
         ========================================================================= */}
      {(currentView === "add_internal" || currentView === "edit_internal") && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => setCurrentView(currentView === "add_internal" ? "list" : "profile")} className="flex items-center gap-1 text-slate-700 font-bold hover:text-[#016DB2]">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span>|</span>
            <span>LMS</span>
            <span>&gt;</span>
            <span>Manajemen Trainer</span>
            <span>&gt;</span>
            <span>Trainer Profile</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">
              {currentView === "add_internal" ? "Tambah Trainer Internal" : "Edit Profile Trainer"}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentView === "add_internal" ? "Tambah Trainer Internal" : "Edit Profile Trainer"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola data Subject Matter Expert (SME) dan instruktur internal Pelindo.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6 text-xs">
              <h3 className="font-bold text-sm text-slate-900">Pengaturan Informasi Trainer</h3>
              <div className="relative inline-block">
                <img
                  src={formAvatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#016DB2] ring-2 ring-white"></span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentView === "edit_internal" && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kategori Trainer<span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select disabled className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl appearance-none pr-8">
                        <option>Internal</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                    </div>
                  </div>
                )}
                <div className={currentView === "edit_internal" ? "" : "md:col-span-2"}>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Perusahaan<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl appearance-none pr-8 focus:outline-none focus:border-[#016DB2]"
                    >
                      <option>PT Pelabuhan Indonesia</option>
                      <option>Subholding Pelindo Terminal Petikemas (SPTP)</option>
                      <option>Subholding Pelindo Jasa Maritim (SPJM)</option>
                      <option>Subholding Pelindo Solusi Logistik (SPSL)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email<span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No Telepon<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tentang Trainer</label>
                <textarea
                  rows={3}
                  value={formAbout}
                  onChange={(e) => setFormAbout(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2] resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* SECTION KATALOG / KATEGORI KEAHLIAN & RATE (1-10) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#016DB2]" />
                    <span>Katalog / Kategori Keahlian &amp; Rate Kemahiran (Skala 1 - 10)</span>
                    <span className="text-red-500 font-bold">*</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Input katalog keahlian instruktur. <b>Minimal 3 kategori keahlian wajib diisi</b> dan dapat lebih dari 3.
                  </p>
                </div>

                <div>
                  {formSkills.length >= 3 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{formSkills.length} Terdaftar (Memenuhi Syarat Min. 3)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg text-xs font-bold animate-pulse">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Baru {formSkills.length}/3 (Kurang {3 - formSkills.length} lagi)</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {formSkills.map((skill, index) => (
                  <div 
                    key={skill.id}
                    className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-[#016DB2] font-black text-[11px] flex items-center justify-center shadow-2xs">
                        {index + 1}
                      </span>
                      <span className="font-bold text-slate-700">Keahlian #{index + 1}</span>
                    </div>

                    <div className="flex-1 w-full">
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Katalog / Kategori Keahlian</label>
                      <input
                        type="text"
                        list={`skill-presets-int-${skill.id}`}
                        value={skill.category}
                        onChange={(e) => handleUpdateSkillCategory(skill.id, e.target.value)}
                        placeholder="Pilih atau ketik kategori keahlian..."
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#016DB2]"
                      />
                      <datalist id={`skill-presets-int-${skill.id}`}>
                        {PRESET_SKILL_CATEGORIES.map((cat, i) => (
                          <option key={i} value={cat} />
                        ))}
                      </datalist>
                    </div>

                    <div className="w-full md:w-64">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-slate-400 font-bold">Rate Kemahiran (1 - 10)</label>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-black text-xs">
                          {skill.rate} / 10
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-bold">1</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={skill.rate}
                          onChange={(e) => handleUpdateSkillRate(skill.id, parseInt(e.target.value))}
                          className="w-full accent-[#016DB2] cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 font-bold">10</span>
                      </div>
                    </div>

                    <div className="self-end md:self-center pt-2 md:pt-4">
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillRow(skill.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleAddSkillRow}
                  className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-[#016DB2] border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Katalog Keahlian Lainnya</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  Total: <b>{formSkills.length} Keahlian</b> (Wajib minimal 3)
                </span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentView(currentView === "add_internal" ? "list" : "profile")}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleValidateAndSubmit}
              className="px-6 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS
         ========================================================================= */}

      {/* MODAL 1: PILIH CALON TRAINER INTERNAL */}
      {showSelectInternalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Pilih Calon Trainer Internal</h3>
              <button onClick={() => setShowSelectInternalModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari Nama Atau NIPP"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#016DB2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                {INTERNAL_CANDIDATES.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => handleSelectCandidate(cand)}
                    className="p-3 bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 rounded-xl transition cursor-pointer flex flex-col justify-between group shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#016DB2] ring-1.5 ring-white"></span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs text-slate-900 truncate group-hover:text-[#016DB2] transition">
                          {cand.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {cand.role}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-100 mt-2 truncate">
                      {cand.nipp} &bull; {cand.unit}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>Tampilkan</span>
                  <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
                    <option>8</option>
                  </select>
                </div>
                <div>1-8 dari 8032</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">
                    Sebelumnya
                  </button>
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">
                    Berikutnya
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setShowSelectInternalModal(false)}
                className="px-5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: KONFIRMASI SIMPAN TRAINER */}
      {showConfirmSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi</h3>
              <button onClick={() => setShowConfirmSaveModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 text-xs text-slate-600 leading-relaxed space-y-2">
              <div>Apakah anda yakin untuk Menyimpan Trainer ini?</div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700">
                <span>Total <b>{formSkills.length} Katalog Keahlian</b> terverifikasi siap disimpan.</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setShowConfirmSaveModal(false)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
              >
                Tidak
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-5 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SUKSES SIMPAN TRAINER */}
      {showSuccessSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Sukses Menyimpan Trainer</h3>
            <p className="text-xs text-slate-400 mt-1">Data trainer beserta katalog keahlian telah berhasil disimpan ke Portaverse.</p>
          </div>
        </div>
      )}

    </div>
  );
}
