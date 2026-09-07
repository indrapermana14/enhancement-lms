"use client";

import React from "react";
import { Users, Award, GraduationCap, Sparkles, FileText, CheckCircle2, ArrowRight } from "lucide-react";

interface OverviewModuleProps {
  onNavigate: (tabId: string) => void;
}

export default function OverviewModule({ onNavigate }: OverviewModuleProps) {
  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-pelindo-700 via-pelindo-800 to-pelindo-950 text-white rounded-2xl p-7 md:p-9 shadow-xl shadow-pelindo-900/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-pelindo-100 text-xs font-bold mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Transformasi Corporate University 2025
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Dashboard Eksekutif & Ringkasan Kebutuhan Enhancement LMS
          </h1>
          <p className="text-sm md:text-base text-pelindo-100 mt-2 leading-relaxed opacity-95">
            Portaverse Learning & Knowledge Management Fase 3 &bull; PT Pelabuhan Indonesia (Persero)
          </p>
          
          <div className="flex flex-wrap gap-2.5 mt-5">
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-full text-xs font-bold">
              Target: 10.944 Insan Pelindo
            </span>
            <span className="px-3 py-1 bg-sky-500/20 border border-sky-400/40 text-sky-300 rounded-full text-xs font-bold">
              Nodin: DL.01/2/6/1/PSBL/PGLS-25
            </span>
            <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/40 text-purple-300 rounded-full text-xs font-bold">
              MoM FGD Pelindo Tower 2025 Approved
            </span>
          </div>
        </div>

        <div className="absolute right-[-40px] bottom-[-40px] opacity-10 text-[240px] select-none pointer-events-none font-black text-white">
          ⚓
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Cakupan Pengguna</span>
            <Users className="w-4 h-4 text-pelindo-700" />
          </div>
          <div className="text-3xl font-black text-slate-900 my-2">10.944</div>
          <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 4 Subholding & Regional
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Database Sertifikat</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 my-2">3 Kanal</div>
          <div className="text-xs text-pelindo-700 font-bold flex items-center gap-1">
            <span>SAP, THANOS & ISMA</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Trainer Management</span>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 my-2">Clean Dev</div>
          <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <span>Pelacakan Jam Mengajar</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Pilar Enhancement</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 my-2">7 Modul</div>
          <div className="text-xs text-purple-600 font-bold flex items-center gap-1">
            <span>General Feature + LMS Core</span>
          </div>
        </div>
      </div>

      {/* FGD Agreement Cards */}
      <div className="bg-white p-6 md:p-7 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-pelindo-700" />
          <h2 className="text-lg font-bold text-slate-900">Rangkuman Kesepakatan Utama FGD Enhancement 2025</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div 
            onClick={() => onNavigate("certificate")}
            className="p-4 rounded-xl border border-slate-200 hover:border-pelindo-700 hover:bg-pelindo-50/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 group-hover:text-pelindo-700">
              <span>1. 📜 Certificate Management Terpusat</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Redefinisi sebagai <b>Database Sertifikat Terpusat</b> sebagai evidence resmi perusahaan, bebas dari hardcode pejabat SDM, konsolidasi SAP (Organik), THANOS (Alih Daya), ISMA (Pelaut), serta rekap kadaluwarsa tahunan setiap Desember.
            </p>
          </div>

          <div 
            onClick={() => onNavigate("trainer")}
            className="p-4 rounded-xl border border-slate-200 hover:border-pelindo-700 hover:bg-pelindo-50/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 group-hover:text-pelindo-700">
              <span>2. 👨‍🏫 Trainer Management (Clean Development)</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Memperluas cakupan menjadi <b>Trainer Management</b> (internal SME & eksternal mitra) dengan arsitektur bersih (*clean dev*), pelacakan total jam mengajar (teaching hours) untuk pemerataan penugasan, dan approval flow.
            </p>
          </div>

          <div 
            onClick={() => onNavigate("survey")}
            className="p-4 rounded-xl border border-slate-200 hover:border-pelindo-700 hover:bg-pelindo-50/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 group-hover:text-pelindo-700">
              <span>3. 📋 Survey & Assessment (Card Model)</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Form builder mandiri internal berbentuk <b>Card-per-Survey</b> agar admin unit dapat berkolaborasi tanpa link luar, pop-up kuesioner di beranda pegawai, serta grafik analitik respons langsung di dalam card.
            </p>
          </div>

          <div 
            onClick={() => onNavigate("calendar")}
            className="p-4 rounded-xl border border-slate-200 hover:border-pelindo-700 hover:bg-pelindo-50/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 group-hover:text-pelindo-700">
              <span>4. 📅 Calendar & Agenda Terpadu</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Penyatuan jadwal Pelatihan LMS (Online/Offline), Community of Practice (CoP), dan tenggat Evaluasi Level 3, dengan reminder H-7 / H-3 serta sinkronisasi ke Outlook & Google Calendar.
            </p>
          </div>

          <div 
            onClick={() => onNavigate("notification")}
            className="p-4 rounded-xl border border-slate-200 hover:border-pelindo-700 hover:bg-pelindo-50/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 group-hover:text-pelindo-700">
              <span>5. 🔔 Push Notification & Analytics</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Dukungan Web & Mobile Push Notification dengan <b>Dashboard Analitik Notifikasi</b> yang memantau trafik serta tingkat responsivitas pengguna (rasio terkirim vs dibaca/diklik) di masing-masing modul.
            </p>
          </div>

          <div 
            onClick={() => onNavigate("rbac")}
            className="p-4 rounded-xl border border-slate-200 hover:border-pelindo-700 hover:bg-pelindo-50/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 group-hover:text-pelindo-700">
              <span>6. 🛡️ Role, Authority & Akun Management</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Penyeragaman Admin HO vs Admin Entitas, aturan ketat akun vendor wajib Akun Instansi dan <b>DILARANG di-bind ke NIP pegawai</b>, hak khusus self-publishing PT PMLI, dan pencatatan Audit Trail.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
