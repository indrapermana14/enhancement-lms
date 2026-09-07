"use client";

import React, { useState } from "react";
import { 
  BellRing, 
  Send, 
  Smartphone, 
  Monitor, 
  BarChart2, 
  CheckCircle2, 
  Eye, 
  Clock, 
  AlertTriangle 
} from "lucide-react";

export default function NotificationModule() {
  const [activeTab, setActiveTab] = useState<"analytics" | "simulator" | "test">("analytics");
  const [testTitle, setTestTitle] = useState("Pengingat: Evaluasi Level 3 Kelas Smart Port");
  const [testBody, setTestBody] = useState("Batas akhir pengisian form evaluasi bersama atasan adalah hari Jumat pekan ini.");
  const [testSent, setTestSent] = useState(false);

  const handleTestSend = (e: React.FormEvent) => {
    e.preventDefault();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pelindo-700 via-pelindo-800 to-pelindo-900 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-pelindo-900/10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-pelindo-100 text-xs font-bold mb-2">
          <BellRing className="w-3.5 h-3.5 text-amber-300" /> Web & Mobile Push
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Push Notification & Analytics Engine
        </h1>
        <p className="text-xs md:text-sm text-pelindo-100 mt-1.5 opacity-90 max-w-2xl">
          Pengiriman notifikasi real-time ke web browser dan aplikasi smartphone pekerja dengan dashboard rasio keterbacaan (open rate).
        </p>
      </div>

      {testSent && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Notifikasi berhasil ditembakkan ke target penerima via Firebase Cloud Messaging!
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Notifikasi Terkirim</div>
          <div className="text-3xl font-black text-slate-900 my-1">48.210</div>
          <div className="text-xs text-emerald-600 font-bold">+12% dari bulan lalu</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rasio Dibaca (Open Rate)</div>
          <div className="text-3xl font-black text-pelindo-700 my-1">84.6%</div>
          <div className="text-xs text-emerald-600 font-bold">Target KPI: &gt; 80%</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rasio Klik Aksi (CTR)</div>
          <div className="text-3xl font-black text-amber-600 my-1">62.1%</div>
          <div className="text-xs text-slate-400">Langsung masuk LMS</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tingkat Sukses Kirim</div>
          <div className="text-3xl font-black text-emerald-600 my-1">99.6%</div>
          <div className="text-xs text-slate-400">Firebase Cloud Push</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs font-bold">
        <button 
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "analytics" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          📊 Analitik Keterbacaan per Kategori
        </button>
        <button 
          onClick={() => setActiveTab("simulator")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "simulator" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          📲 Simulator Tampilan Web & Mobile
        </button>
        <button 
          onClick={() => setActiveTab("test")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "test" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          🚀 Uji Coba Pengiriman Notifikasi
        </button>
      </div>

      {/* =========================================================================
          TAB 1: ANALYTICS
         ========================================================================= */}
      {activeTab === "analytics" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Tingkat Responsivitas Kategori Notifikasi</h3>
            <p className="text-xs text-slate-500">Memantau efektivitas saluran komunikasi di setiap modul LMS</p>
          </div>

          <div className="space-y-4 text-xs">
            {[
              { cat: "Reminder Pelatihan Offline H-3 / H-1", sent: 14200, opened: 12800, rate: 90.1 },
              { cat: "Peringatan Sertifikat Expired (H-30)", sent: 3840, opened: 3450, rate: 89.8 },
              { cat: "Tenggat Pengisian Evaluasi Level 3", sent: 4120, opened: 3620, rate: 87.8 },
              { cat: "Pengumuman Kelulusan & Sertifikat Terbit", sent: 8950, opened: 8200, rate: 91.6 },
              { cat: "Kuis Harian / Daily Quiz Pagi", sent: 12600, opened: 9800, rate: 77.7 },
              { cat: "Agenda Community of Practice (CoP)", sent: 4500, opened: 2900, rate: 64.4 },
            ].map((item) => (
              <div key={item.cat} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-800">{item.cat}</span>
                  <span className="text-pelindo-700">{item.opened.toLocaleString()} / {item.sent.toLocaleString()} dibaca ({item.rate}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pelindo-700 rounded-full" 
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: SIMULATOR WEB & MOBILE
         ========================================================================= */}
      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Web Push */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
              <Monitor className="w-4 h-4 text-pelindo-700" />
              <span>Tampilan Web In-App Push (Desktop Browser)</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 border-l-4 border-l-pelindo-700 rounded-xl shadow-md text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-pelindo-700">⚓ PORTAVERSE LMS</span>
                <span>Baru Saja</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Peringatan Masa Berlaku: Sertifikat Segera Kadaluwarsa</h4>
              <p className="text-slate-600 leading-relaxed">
                Sertifikat <b>Port Operations Excellence</b> Anda akan berakhir dalam 50 hari (22 Oktober 2025). Segera ajukan penjadwalan sertifikasi ulang.
              </p>
              <div className="flex justify-end gap-2 pt-1">
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-700">Nanti</button>
                <button className="px-3 py-1 bg-pelindo-700 hover:bg-pelindo-800 text-white rounded-lg font-bold">Periksa</button>
              </div>
            </div>
          </div>

          {/* Mobile App */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Tampilan Mobile Push (Portaverse Mobile App)</span>
            </div>

            <div className="max-w-xs mx-auto border-8 border-slate-900 rounded-[36px] p-4 bg-slate-100 shadow-xl relative">
              <div className="w-24 h-4 bg-slate-900 mx-auto rounded-b-xl mb-4"></div>
              
              <div className="space-y-2.5">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-pelindo-700 text-left">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>⚓ PORTAVERSE &bull; LMS</span>
                    <span>15m</span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 mt-0.5">Jadwal Pelatihan Offline H-3</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Kelas Port Safety di Gedung PMLI Ciawi akan dimulai 3 hari lagi.
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500 text-left">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>⚓ PORTAVERSE &bull; KUIS</span>
                    <span>1j</span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 mt-0.5">Kuis Harian Tersedia!</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Raih 50 Poin Karma dengan menjawab kuis AKHLAK pagi ini.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 3: TEST SENDER
         ========================================================================= */}
      {activeTab === "test" && (
        <form onSubmit={handleTestSend} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100">
            🚀 Uji Coba Pengiriman Notifikasi Push
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Judul Notifikasi:</label>
              <input 
                type="text" 
                value={testTitle} 
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold" 
                required 
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Sasaran:</label>
              <select className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <option>Muhammad Indra Permana (Pekerja Saya Sendiri)</option>
                <option>Peserta Kelas Port Safety Batch 4</option>
                <option>Admin Regional 2</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Pesan Notifikasi:</label>
            <textarea 
              rows={3} 
              value={testBody} 
              onChange={(e) => setTestBody(e.target.value)}
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 resize-none" 
              required 
            />
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              className="flex items-center gap-1.5 px-6 py-2.5 bg-pelindo-700 hover:bg-pelindo-800 text-white font-bold rounded-xl transition"
            >
              <Send className="w-4 h-4" /> Tembakkan Notifikasi Uji Coba
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
