"use client";

import React, { useState } from "react";
import { 
  ClipboardList, 
  Search, 
  BarChart2, 
  PlusCircle, 
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle2, 
  Send,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Survey } from "@/lib/mockData";

interface SurveyModuleProps {
  surveys: Survey[];
  onOpenSurveyModal: (survey: Survey) => void;
  onAddSurvey: (survey: Survey) => void;
}

export default function SurveyModule({
  surveys,
  onOpenSurveyModal,
  onAddSurvey
}: SurveyModuleProps) {
  const [activeTab, setActiveTab] = useState<"gallery" | "builder">("gallery");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedAnalytics, setExpandedAnalytics] = useState<Record<string, boolean>>({});

  // Builder Form State
  const [newTitle, setNewTitle] = useState("Assessment Kesiapan Digital Mindset Pelindo 2025");
  const [newCreator, setNewCreator] = useState("Group SDM & IT Planning");
  const [newTarget, setNewTarget] = useState("Seluruh Entitas Pelindo Group");
  const [newDeadline, setNewDeadline] = useState("2025-11-15");
  const [newTargetNum, setNewTargetNum] = useState(2500);
  const [newDesc, setNewDesc] = useState("Kuesioner ini dirancang untuk memetakan pemahaman transformasi digital dan adopsi TOS Nusantara.");

  const toggleExpand = (id: string) => {
    setExpandedAnalytics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSurveys = surveys.filter(s => 
    !searchQuery || 
    s.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuilderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newS: Survey = {
      id: `SRV-2025-${String(surveys.length + 1).padStart(2, '0')}`,
      judul: newTitle,
      creator: newCreator,
      entitas_target: newTarget,
      total_responden_target: newTargetNum,
      total_respon: 1,
      status: "Sedang Berjalan",
      tenggat_waktu: newDeadline,
      persentase: 0.1,
      deskripsi: newDesc,
      kategori: ["Sangat Baik", "Cukup Baik", "Perlu Peningkatan"],
      votes: [10, 5, 2]
    };
    onAddSurvey(newS);
    setActiveTab("gallery");
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pelindo-700 via-pelindo-800 to-pelindo-900 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-pelindo-900/10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-pelindo-100 text-xs font-bold mb-2">
          <ClipboardList className="w-3.5 h-3.5 text-amber-300" /> Card-per-Survey Model
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Survey & Assessment Engine
        </h1>
        <p className="text-xs md:text-sm text-pelindo-100 mt-1.5 opacity-90 max-w-2xl">
          Pembuatan form survei mandiri internal (tanpa link pihak ketiga) dengan analitik hasil respons langsung di dalam masing-masing card.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Survei Diterbitkan</div>
          <div className="text-3xl font-black text-slate-900 my-1">{surveys.length} Formulir</div>
          <div className="text-xs text-pelindo-700 font-semibold">Format Card-per-Survey Mandiri</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Respon Pekerja Masuk</div>
          <div className="text-3xl font-black text-slate-900 my-1">
            {surveys.reduce((a, s) => a + s.total_respon, 0).toLocaleString()} <span className="text-xs font-normal">Pekerja</span>
          </div>
          <div className="text-xs text-emerald-600 font-bold">Tingkat responsivitas tinggi</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-Rata Penyelesaian</div>
          <div className="text-3xl font-black text-emerald-600 my-1">83.6%</div>
          <div className="text-xs text-slate-400">Target minimal tercapai</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs font-bold">
        <button 
          onClick={() => setActiveTab("gallery")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "gallery" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          🗂️ Card-per-Survey Gallery & Analitik ({surveys.length})
        </button>
        <button 
          onClick={() => setActiveTab("builder")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "builder" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          🛠️ Form Builder Survei Baru
        </button>
      </div>

      {/* =========================================================================
          TAB 1: CARD GALLERY & IN-CARD ANALYTICS
         ========================================================================= */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-card">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Cari survei, inisiator, target..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-pelindo-700"
              />
            </div>
            <button 
              onClick={() => setActiveTab("builder")}
              className="flex items-center gap-1.5 px-4 py-2 bg-pelindo-700 hover:bg-pelindo-800 text-white text-xs font-bold rounded-xl transition"
            >
              <PlusCircle className="w-4 h-4" /> Buat Survei Baru
            </button>
          </div>

          <div className="space-y-4">
            {filteredSurveys.map((s) => {
              const isExpanded = !!expandedAnalytics[s.id];
              return (
                <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{s.id}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">{s.judul}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Inisiator: <b className="text-slate-700">{s.creator}</b> &bull; Sasaran: <b>{s.entitas_target}</b> &bull; Deadline: <b>{s.tenggat_waktu}</b>
                      </p>
                    </div>

                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.status === "Sedang Berjalan" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-700 border border-slate-200"}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {s.deskripsi}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Respons Masuk: <b className="text-slate-800">{s.total_respon.toLocaleString()}</b> dari target <b>{s.total_responden_target.toLocaleString()}</b> pekerja
                      </span>
                      <span className="font-extrabold text-pelindo-700">{s.persentase}% Tercapai</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pelindo-700 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, s.persentase)}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-2 text-xs">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onOpenSurveyModal(s)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-pelindo-700 hover:bg-pelindo-800 text-white font-bold rounded-xl transition shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" /> Uji Isi Kuesioner (Simulasi User)
                      </button>
                      <button 
                        onClick={() => alert(`Mengunduh hasil respon ${s.id}.csv...`)}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" /> Ekspor CSV
                      </button>
                    </div>

                    <button 
                      onClick={() => toggleExpand(s.id)}
                      className="flex items-center gap-1 text-xs font-bold text-pelindo-700 hover:text-pelindo-900 transition"
                    >
                      <BarChart2 className="w-4 h-4" />
                      <span>{isExpanded ? "Tutup Analitik Grafik" : "Buka In-Card Analitik Grafik"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expandable In-Card Analytics */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-100 space-y-3 animate-in fade-in">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        📊 Visualisasi Sebaran Respons ({s.judul})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {s.kategori.map((cat, idx) => {
                          const vote = s.votes[idx] || 100;
                          return (
                            <div key={cat} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                              <span className="text-[11px] text-slate-500 font-semibold block truncate">{cat}</span>
                              <div className="text-lg font-black text-pelindo-700 my-1">
                                {typeof vote === 'number' && vote < 5 ? `⭐ ${vote}` : `${vote.toLocaleString()}`}
                              </div>
                              <span className="text-[10px] text-slate-400">Akumulasi Suara</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: FORM BUILDER SURVEI BARU
         ========================================================================= */}
      {activeTab === "builder" && (
        <form onSubmit={handleBuilderSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-card space-y-5 text-xs">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">🛠️ Form Builder Mandiri (Internal Tool)</h3>
            <p className="text-slate-500 text-xs">Susun kuesioner tanpa platform formulir pihak ketiga</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Judul Kuesioner Survei:</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Unit Pembuat / Inisiator:</label>
              <input 
                type="text" 
                value={newCreator}
                onChange={(e) => setNewCreator(e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Entitas Target Sasaran:</label>
              <select 
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
              >
                <option value="Seluruh Entitas Pelindo Group">Seluruh Entitas Pelindo Group</option>
                <option value="Kantor Pusat (Head Office)">Kantor Pusat (Head Office)</option>
                <option value="Subholding Pelindo Terminal Petikemas (SPTP)">Subholding Pelindo Terminal Petikemas (SPTP)</option>
                <option value="Subholding Pelindo Multi Terminal (SPMT)">Subholding Pelindo Multi Terminal (SPMT)</option>
                <option value="Regional 1 - 4">Regional 1 - 4</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Batas Waktu:</label>
                <input 
                  type="date" 
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Responden:</label>
                <input 
                  type="number" 
                  value={newTargetNum}
                  onChange={(e) => setNewTargetNum(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Deskripsi & Petunjuk Pengisian:</label>
            <textarea 
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 resize-none"
            />
          </div>

          {/* Question 1 Config */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block">Butir Pertanyaan 1:</span>
            <input 
              type="text" 
              defaultValue="Seberapa relevan materi pelatihan terhadap produktivitas Anda?"
              className="w-full p-2 bg-white rounded-xl border border-slate-200"
            />
            <div className="text-[11px] text-slate-500">Tipe Input: <b>Skala Bintang Likert (1 - 5)</b></div>
          </div>

          {/* Question 2 Config */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block">Butir Pertanyaan 2:</span>
            <input 
              type="text" 
              defaultValue="Tuliskan kendala yang dihadapi saat mengikuti sesi e-learning:"
              className="w-full p-2 bg-white rounded-xl border border-slate-200"
            />
            <div className="text-[11px] text-slate-500">Tipe Input: <b>Teks Terbuka / Esai</b></div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={() => setActiveTab("gallery")}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-pelindo-700 hover:bg-pelindo-800 text-white font-bold rounded-xl shadow-md transition"
            >
              Terbitkan Card Survei Baru
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
