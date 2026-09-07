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

export default function LandingAssessmentModule() {
  // Flow Stages:
  // 1. "popup_prompt": Landing page with Survey Popup modal (Screenshot 16.55.36)
  // 2. "filling_form": Full Questionnaire Form (Screenshot 16.55.53)
  // 3. "completed_dashboard": Assessment list & completion dashboard (Screenshot 16.54.13)
  const [landingStage, setLandingStage] = useState<"popup_prompt" | "filling_form" | "completed_dashboard">("popup_prompt");
  const [showSurveyModal, setShowSurveyModal] = useState(true);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>("Semua Modul");

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
    <div className="space-y-6 font-sans select-none">

      {/* =========================================================================
          STAGE 1: LANDING PAGE WITH SURVEY POPUP (SCREENSHOT 16.55.36)
         ========================================================================= */}
      {landingStage === "popup_prompt" && (
        <div className="relative min-h-[82vh] space-y-6">
          
          {/* Landing Background Portal UI */}
          <div className="space-y-6 opacity-45 pointer-events-none filter blur-[0.4px]">
            
            {/* Announcement Banner */}
            <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-100 rounded-3xl p-6 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#016DB2] uppercase tracking-wider">Evaluasi Tahunan</span>
                <h3 className="text-base font-black text-slate-900">Ingin tahu hasil akhir laporan evaluasi tahunan anda?</h3>
                <p className="text-xs text-slate-500">Klik tombol di bawah untuk melihat ringkasan performa dan pencapaian kompetensi.</p>
                <button className="mt-2 px-4 py-2 bg-[#016DB2] text-white font-bold rounded-xl text-xs shadow-xs">
                  Lihat Laporan Evaluasi Tahunan
                </button>
              </div>
              <div className="w-24 h-24 bg-sky-100 rounded-2xl flex items-center justify-center text-[#016DB2]">
                <FileText className="w-12 h-12" />
              </div>
            </div>

            {/* Welcome Greeting */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900">Selamat Datang Kembali, Raden Istafako Tawakkal!</h2>
                <p className="text-xs text-slate-500">Menghubungkan BUMN 1 Pelabuhan Bersama Portaverse.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Raden Istafako Tawakkal</div>
                  <div className="text-slate-400">104793 &bull; Dept Perencanaan Organisasi &amp; SDM</div>
                </div>
              </div>
            </div>

            {/* Calendar and Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 h-64 flex items-center justify-center text-slate-400 text-xs">
                <span>Ilustrasi Digitalisasi Terminal Petikemas Pelindo &amp; Pelayanan Kapal</span>
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>Kalender &amp; Agenda</span>
                  <button className="px-3 py-1 bg-[#016DB2] text-white rounded-lg text-[10px]">Buat Agenda</button>
                </div>
                <div className="h-44 bg-slate-50 rounded-2xl flex items-center justify-center text-xs text-slate-400">
                  Agustus 2026
                </div>
              </div>
            </div>

          </div>

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
              <div className="pl-6 space-y-1">
                <input
                  type="text"
                  value={ansQ4}
                  onChange={(e) => setAnsQ4(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#016DB2]"
                  required
                />
                <div className="text-[10px] text-slate-400">*Maximum Input 500 Character</div>
              </div>
            </div>

            {/* Question 5: Pilihan Ganda Penggunaan */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-sm text-slate-900">5.</span>
                <h3 className="font-bold text-sm text-slate-900">
                  Biasanya kamu menggunakan portaverse untuk apa?
                </h3>
              </div>
              <div className="space-y-2 pl-6">
                {["Melihat Social Media", "Melihat KPI Saya", "Melihat Community"].map((opt) => (
                  <label
                    key={opt}
                    onClick={() => {
                      if (ansQ5.includes(opt)) {
                        setAnsQ5(ansQ5.filter(x => x !== opt));
                      } else {
                        setAnsQ5([...ansQ5, opt]);
                      }
                    }}
                    className="flex items-center gap-2.5 cursor-pointer font-medium text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={ansQ5.includes(opt)}
                      onChange={() => {}}
                      className="w-4 h-4 accent-[#016DB2] rounded"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bottom Form Actions matching Screenshot 16.55.53 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setLandingStage("popup_prompt")}
                className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-xs transition"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-7 py-2.5 bg-[#016DB2] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition"
              >
                Submit
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

    </div>
  );
}
