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
  ChevronUp
} from "lucide-react";

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
  answers: {
    q1: string;
    q2: string[];
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
    options: ["Sangat Baik", "Baik", "Cukup", "Kurang Baik", "Tidak Baik"]
  },
  {
    id: "q2",
    number: 2,
    questionText: "Apa yang menurut Anda paling sulit dalam proses pengisian KPI?",
    type: "Pilihan Ganda",
    required: true,
    options: ["Memahami Indikator KPI", "Input data / angka", "Sistem / Teknologi yang digunakan", "Alur pengisian yang panjang", "Lainnya"]
  },
  {
    id: "q3",
    number: 3,
    questionText: "Apa Saran Anda untuk meningkatkan proses pengisian KPI?",
    type: "Isian Panjang",
    required: true,
    options: []
  },
  {
    id: "q4",
    number: 4,
    questionText: "Apa kendala utama yang anda alami saat mengisi KPI?",
    type: "Isian Pendek",
    required: true,
    options: []
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
    answers: {
      q1: "Sangat Mudah",
      q2: ["Memahami indikator KPI", "Input Data / Angka"],
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
    answers: {
      q1: "Baik",
      q2: ["Memahami indikator KPI"],
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
    answers: {
      q1: "Cukup",
      q2: ["Memahami indikator KPI", "Input data / angka", "Sistem/teknologi yang digunakan"],
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
    answers: {
      q1: "Kurang Baik",
      q2: ["Memahami indikator KPI", "Input data / angka"],
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
    answers: {
      q1: "Tidak Baik",
      q2: ["Memahami indikator KPI", "Input data / angka"],
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

  // Confirmation & Success Modals
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);
  const [showSuccessPublish, setShowSuccessPublish] = useState(false);
  const [showConfirmDraft, setShowConfirmDraft] = useState(false);
  const [showSuccessDraft, setShowSuccessDraft] = useState(false);

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
        options: ["Sangat Puas", "Puas", "Cukup", "Kurang Puas", "Tidak Puas"]
      },
      {
        id: `q-${Date.now()}-2`,
        number: 2,
        questionText: "Fasilitas apa saja yang menurut Anda perlu ditingkatkan?",
        type: "Pilihan Ganda",
        required: true,
        options: ["Materi Modul Pembelajaran", "Kecepatan Akses Portal LMS", "Kualitas Audio & Video", "Kesesuaian Jadwal", "Lainnya"]
      },
      {
        id: `q-${Date.now()}-3`,
        number: 3,
        questionText: "Tuliskan saran perbaikan untuk penyelenggaraan sesi berikutnya:",
        type: "Isian Panjang",
        required: false,
        options: []
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
      options: ["Pilihan 1", "Pilihan 2", "Pilihan 3"]
    };
    setQuestions([...questions, newQ]);
    setEditingQuestionId(newId);
  };

  const handleUpdateQuestion = (id: string, updates: Partial<QuestionItem>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      alert("Survey minimal harus memiliki 1 butir pertanyaan.");
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
        return {
          ...q,
          options: [...q.options, `Pilihan ${q.options.length + 1}`]
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

  const handleDeleteOption = (questionId: string, optIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        if (q.options.length <= 2) {
          alert("Pilihan ganda / tunggal minimal memiliki 2 pilihan jawaban.");
          return q;
        }
        return {
          ...q,
          options: q.options.filter((_, i) => i !== optIndex)
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
    <div className="space-y-6 font-sans select-none">

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
                    <span className={`px-3 py-0.5 rounded-md text-[11px] font-bold border ${
                      item.status === "Aktif" 
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
                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === item.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-30 text-xs font-semibold animate-in fade-in">
                          <button
                            onClick={() => handleViewResult(item)}
                            className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 transition flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat Hasil</span>
                          </button>
                          
                          <button
                            onClick={() => handleOpenEditSurvey(item)}
                            className="w-full text-left px-3.5 py-1.5 hover:bg-blue-50 text-[#016DB2] transition flex items-center gap-2"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Survey</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Periode Pengisian: {item.periodText}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
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
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                  selectedSurvey.status === "Aktif" 
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
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
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link survey berhasil disalin!");
                }}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Link Survey</span>
              </button>

              <button
                type="button"
                onClick={() => alert("Mengunduh laporan survey format Excel & PDF...")}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Report</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenEditSurvey(selectedSurvey)}
                className="px-4 py-2 bg-[#016DB2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Survey</span>
              </button>
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
              <div className="text-3xl font-black text-slate-900">06:24 <span className="text-xs font-normal text-slate-400">Menit per Responden</span></div>
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
          {resultTab === "analisis" && (
            <div className="space-y-6">
              
              {/* Question 1: Donut Chart */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 text-xs">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                      Q1
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Bagaimana pengalaman Anda secara keseluruhan dalam pengisian KPI?
                      </h3>
                      <div className="text-[11px] text-slate-400 mt-0.5">Pilihan Tunggal</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalQuestion({
                      number: 1,
                      title: "Bagaimana pengalaman Anda secara keseluruhan dalam pengisian KPI?",
                      type: "Pilihan Tunggal"
                    })}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shadow-2xs shrink-0"
                  >
                    Lihat Detail
                  </button>
                </div>

                <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-center gap-10">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-44 h-44 transform -rotate-90">
                      <circle cx="88" cy="88" r="64" stroke="#E2E8F0" strokeWidth="18" fill="none" />
                      <circle cx="88" cy="88" r="64" stroke="#059669" strokeWidth="18" fill="none" strokeDasharray="402" strokeDashoffset="297" />
                      <circle cx="88" cy="88" r="64" stroke="#10B981" strokeWidth="18" fill="none" strokeDasharray="402" strokeDashoffset="209" />
                      <circle cx="88" cy="88" r="64" stroke="#016DB2" strokeWidth="18" fill="none" strokeDasharray="402" strokeDashoffset="330" />
                      <circle cx="88" cy="88" r="64" stroke="#F59E0B" strokeWidth="18" fill="none" strokeDasharray="402" strokeDashoffset="378" />
                      <circle cx="88" cy="88" r="64" stroke="#EF4444" strokeWidth="18" fill="none" strokeDasharray="402" strokeDashoffset="394" />
                    </svg>

                    <div className="absolute text-center">
                      <div className="text-2xl font-black text-slate-900">96</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Responden</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs font-semibold text-slate-700 min-w-56">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
                        <span>Sangat Baik</span>
                      </div>
                      <span className="font-bold text-slate-900">25 <span className="text-slate-400 font-normal">(26%)</span></span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                        <span>Baik</span>
                      </div>
                      <span className="font-bold text-slate-900">48 <span className="text-slate-400 font-normal">(48%)</span></span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#016DB2]"></span>
                        <span>Cukup</span>
                      </div>
                      <span className="font-bold text-slate-900">17 <span className="text-slate-400 font-normal">(18%)</span></span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                        <span>Kurang Baik</span>
                      </div>
                      <span className="font-bold text-slate-900">6 <span className="text-slate-400 font-normal">(6%)</span></span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                        <span>Tidak Baik</span>
                      </div>
                      <span className="font-bold text-slate-900">2 <span className="text-slate-400 font-normal">(2%)</span></span>
                    </div>
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
                        Apa yang menurut Anda paling sulit dalam proses pengisian KPI?
                      </h3>
                      <div className="text-[11px] text-slate-400 mt-0.5">Pilihan Ganda</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalQuestion({
                      number: 2,
                      title: "Apa yang menurut Anda paling sulit dalam proses pengisian KPI?",
                      type: "Pilihan Ganda"
                    })}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shadow-2xs shrink-0"
                  >
                    Lihat Detail
                  </button>
                </div>

                <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="w-56 font-semibold text-slate-700 truncate">Memahami Indikator KPI</span>
                    <div className="flex-1 h-3.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#016DB2] rounded-full" style={{ width: "42%" }}></div>
                    </div>
                    <span className="w-36 text-right font-bold text-slate-800">42% <span className="font-normal text-slate-400">(70 Orang)</span></span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="w-56 font-semibold text-slate-700 truncate">Input data/angka</span>
                    <div className="flex-1 h-3.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#016DB2] rounded-full" style={{ width: "28%" }}></div>
                    </div>
                    <span className="w-36 text-right font-bold text-slate-800">28% <span className="font-normal text-slate-400">(43 Orang)</span></span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="w-56 font-semibold text-slate-700 truncate">Sistem/Teknologi yang digunakan</span>
                    <div className="flex-1 h-3.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#016DB2] rounded-full" style={{ width: "18%" }}></div>
                    </div>
                    <span className="w-36 text-right font-bold text-slate-800">18% <span className="font-normal text-slate-400">(30 Orang)</span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

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

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
              Jawaban Responden
            </h3>

            <div className="space-y-4">
              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                    Q1
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Seberapa mudah proses pengisian KPI bagi Anda?</h4>
                    <div className="text-[10px] text-slate-400">Pilihan Tunggal</div>
                  </div>
                </div>

                <div className="pt-2 pl-8">
                  <div className="text-[11px] text-slate-400 font-semibold mb-0.5">Jawaban</div>
                  <div className="font-bold text-xs text-slate-800">{selectedRespondent.answers.q1}</div>
                </div>
              </div>

              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#016DB2] font-black text-[11px] flex items-center justify-center shrink-0">
                    Q2
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Apa yang menurut Anda paling sulit dalam proses pengisian KPI?</h4>
                    <div className="text-[10px] text-slate-400">Pilihan Ganda</div>
                  </div>
                </div>

                <div className="pt-2 pl-8">
                  <div className="text-[11px] text-slate-400 font-semibold mb-1">Jawaban</div>
                  <ul className="space-y-1">
                    {selectedRespondent.answers.q2.map((item, i) => (
                      <li key={i} className="font-bold text-xs text-slate-800 flex items-center gap-2">
                        <span>&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
              <span className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border shadow-xs ${
                formMode === "create"
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
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  currentStep === 1 ? "bg-[#016DB2] text-white shadow-xs" : currentStep > 1 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
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
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  currentStep === 2 ? "bg-[#016DB2] text-white shadow-xs" : currentStep > 2 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
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
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  currentStep === 3 ? "bg-[#016DB2] text-white shadow-xs" : currentStep > 3 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
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
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  currentStep === 4 ? "bg-[#016DB2] text-white shadow-xs" : "bg-slate-100 text-slate-400"
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
                      onClick={() => alert("Pilih gambar banner baru...")}
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
                      className={`bg-white rounded-2xl border transition shadow-xs overflow-hidden ${
                        isEditing ? "border-[#016DB2] ring-2 ring-blue-500/10" : "border-slate-200 hover:border-slate-300"
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
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span className="font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {q.type}
                              </span>
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
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                              isEditing ? "bg-[#016DB2] text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
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
                                    handleUpdateQuestion(q.id, { type: nextType, options: nextOpts });
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

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteOption(q.id, optIdx)}
                                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
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
                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                              <span className="text-[11px] text-slate-400 font-medium">Tampilan untuk responden:</span>
                              <div className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-lg">
                                {[1, 2, 3, 4, 5].map(num => (
                                  <div key={num} className="flex-1 py-1.5 rounded bg-slate-50 text-center font-bold text-slate-700 border border-slate-200">
                                    {num} ⭐
                                  </div>
                                ))}
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
                      onClick={() => alert("Pilih role tambahan...")}
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

    </div>
  );
}
