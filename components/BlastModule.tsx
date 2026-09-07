"use client";

import React, { useState } from "react";
import { 
  Megaphone, 
  Send, 
  Users, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Filter, 
  Sparkles 
} from "lucide-react";
import { BlastItem } from "@/lib/mockData";

interface BlastModuleProps {
  blastHistory: BlastItem[];
  onAddBlast: (item: BlastItem) => void;
}

export default function BlastModule({ blastHistory, onAddBlast }: BlastModuleProps) {
  const [activeTab, setActiveTab] = useState<"compose" | "history">("compose");
  const [title, setTitle] = useState("Pemberitahuan Wajib: Pendaftaran Pelatihan Port Security Batch 3");
  const [targetEntity, setTargetEntity] = useState("Seluruh Regional 1 - 4 & Subholding");
  const [body, setBody] = useState("Kepada Seluruh Insan Pelindo yang terhormat,\n\nDiberitahukan bahwa pendaftaran kelas mandatori Port Security & Safety Batch 3 telah dibuka di Portaverse LMS. Batas akhir pendaftaran adalah hari Jumat pekan ini.\n\nSalam,\nCorporate University Pelindo");
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleTemplateChange = (tmpl: string) => {
    if (tmpl === "level3") {
      setTitle("Pemberitahuan Wajib: Pengisian Evaluasi Level 3 (Behavior Impact)");
      setBody("Kepada Rekan-rekan Peserta Pelatihan Q2 2025,\n\nPelatihan yang Anda ikuti telah berjalan 3 bulan. Dimohon segera melengkapi formulir Evaluasi Level 3 bersama atasan langsung Anda paling lambat tanggal 15 bulan ini.\n\nSalam,\nGroup SDM Pelindo");
    } else if (tmpl === "cert") {
      setTitle("Peringatan Masa Berlaku: Perpanjangan Sertifikat K3 Pelabuhan");
      setBody("Peringatan Masa Berlaku Sertifikat,\n\nSertifikat kompetensi K3 dan operasional Anda akan berakhir dalam kurun waktu 30 hari. Dimohon segera menghubungi tim SDM entitas Anda untuk pendaftaran ujian perpanjangan lisensi.\n\nSalam,\nCorporate University Pelindo");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newB: BlastItem = {
      id: `BLST-${String(blastHistory.length + 82).padStart(3, '0')}`,
      tanggal: new Date().toISOString().slice(0, 16).replace("T", " "),
      judul: title,
      target: targetEntity,
      penerima: 4850,
      terkirim: 4850,
      dibuka: 4120,
      rasio_baca: "84.9%",
      status: "Selesai"
    };
    onAddBlast(newB);
    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
      setActiveTab("history");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pelindo-700 via-pelindo-800 to-pelindo-900 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-pelindo-900/10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-pelindo-100 text-xs font-bold mb-2">
          <Megaphone className="w-3.5 h-3.5 text-sky-300" /> Komunikasi Massal Terarah
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Blast Message Engine
        </h1>
        <p className="text-xs md:text-sm text-pelindo-100 mt-1.5 opacity-90 max-w-2xl">
          Pengiriman pesan prioritas ke portal Portaverse dan email korporat dengan segmentasi unit kerja dan analitik keterbacaan.
        </p>
      </div>

      {sendSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Blast Message berhasil diproses dan dikirimkan ke 4.850 pekerja terdaftar!
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Kampanye Blast</div>
          <div className="text-3xl font-black text-slate-900 my-1">{blastHistory.length} Pesan</div>
          <div className="text-xs text-slate-400">Pesan prioritas korporat</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jangkauan Pekerja</div>
          <div className="text-3xl font-black text-slate-900 my-1">
            {blastHistory.reduce((a, b) => a + b.penerima, 0).toLocaleString()} <span className="text-xs font-normal">Pekerja</span>
          </div>
          <div className="text-xs text-emerald-600 font-bold">100% Terverifikasi</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-Rata Rasio Baca</div>
          <div className="text-3xl font-black text-pelindo-700 my-1">85.3%</div>
          <div className="text-xs text-emerald-600 font-bold">Efektivitas sangat tinggi</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs font-bold">
        <button 
          onClick={() => setActiveTab("compose")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "compose" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          ✍️ Susun & Kirim Blast Message
        </button>
        <button 
          onClick={() => setActiveTab("history")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "history" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          📊 Riwayat Kampanye & Statistik ({blastHistory.length})
        </button>
      </div>

      {/* =========================================================================
          TAB 1: COMPOSE
         ========================================================================= */}
      {activeTab === "compose" && (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-card space-y-5 text-xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Formulir Pesan Massal Terarah</h3>
              <p className="text-slate-500 text-xs">Tentukan segmentasi audiens dan gunakan template portal terstandar</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => handleTemplateChange("level3")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-[11px]"
              >
                Template: Evaluasi Level 3
              </button>
              <button 
                type="button" 
                onClick={() => handleTemplateChange("cert")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-[11px]"
              >
                Template: Sertifikat H-30
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Entitas Target Sasaran:</label>
              <select 
                value={targetEntity}
                onChange={(e) => setTargetEntity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold"
              >
                <option value="Seluruh Regional 1 - 4 & Subholding">Seluruh Regional 1 - 4 & Subholding (Pelindo Group)</option>
                <option value="Kantor Pusat (Head Office)">Kantor Pusat (Head Office)</option>
                <option value="Subholding Pelindo Multi Terminal (SPMT)">Subholding Pelindo Multi Terminal (SPMT)</option>
                <option value="Subholding Pelindo Terminal Petikemas (SPTP)">Subholding Pelindo Terminal Petikemas (SPTP)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kanal Pengiriman:</label>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-bold text-pelindo-700">
                Pesan Portal In-App + Email Korporat Pelindo
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Blast Message:</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Pesan Lengkap:</label>
            <textarea 
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 resize-none font-sans"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-slate-500 text-[11px]">
              Estimasi Jangkauan Penerima: <b className="text-slate-900">~4.850 Pekerja Terverifikasi</b>
            </span>

            <button 
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 bg-pelindo-700 hover:bg-pelindo-800 text-white font-bold rounded-xl shadow-md transition"
            >
              <Send className="w-4 h-4" /> Proses & Kirim Sekarang
            </button>
          </div>
        </form>
      )}

      {/* =========================================================================
          TAB 2: HISTORY
         ========================================================================= */}
      {activeTab === "history" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">ID Pesan</th>
                <th className="p-3">Waktu Kirim</th>
                <th className="p-3">Judul Pesan</th>
                <th className="p-3">Target Entitas</th>
                <th className="p-3">Penerima</th>
                <th className="p-3">Rasio Dibaca</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {blastHistory.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-slate-800">{b.id}</td>
                  <td className="p-3 text-slate-500">{b.tanggal}</td>
                  <td className="p-3 font-bold text-slate-900 max-w-xs truncate">{b.judul}</td>
                  <td className="p-3 text-slate-600">{b.target}</td>
                  <td className="p-3 font-semibold">{b.penerima.toLocaleString()} Org</td>
                  <td className="p-3 font-extrabold text-pelindo-700">{b.rasio_baca}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
