"use client";

import React from "react";
import { 
  Award, 
  GraduationCap, 
  Megaphone, 
  ClipboardList, 
  LayoutDashboard, 
  ShieldCheck, 
  Sliders, 
  UserCheck, 
  Compass, 
  ChevronDown, 
  Layers, 
  FileText, 
  LineChart,
  BookOpen
} from "lucide-react";

interface SidebarProps {
  currentModule: string; // "Landing Page" | "LMS" | "EM"
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentRole: string;
}

export default function Sidebar({ 
  currentModule, 
  currentTab, 
  onTabChange, 
  currentRole 
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between shrink-0">
      
      {/* Top Section */}
      <div>
        {/* Brand Logo matching Portaverse */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#016DB2] flex items-center justify-center text-white font-black text-base shadow-sm">
              P
            </div>
            <div>
              <span className="text-lg font-black text-slate-800 tracking-tight block leading-none">portaverse</span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">LMS &amp; Enterprise</span>
            </div>
          </div>
        </div>

        {/* Module Context Header */}
        <div className="px-5 pt-4 pb-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#016DB2]" />
            <span>Modul: {currentModule}</span>
          </div>
        </div>

        {/* Dynamic Navigation Menus Per Module */}
        <nav className="px-3 space-y-1 text-xs">
          
          {/* ===================================================================
              MODULE 1: LMS (Management Certificate, Management Trainer, Management Survey)
             =================================================================== */}
          {currentModule === "LMS" && (
            <>
              <button
                onClick={() => onTabChange("certificate")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "certificate" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Award className={`w-4 h-4 shrink-0 ${currentTab === "certificate" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">
                    {currentRole === "User" ? "Sertifikat Saya" : "Management Certificate"}
                  </div>
                  <div className={`text-[10px] ${currentTab === "certificate" ? "text-blue-100" : "text-slate-400"}`}>
                    {currentRole === "User" 
                      ? "Riwayat internal & eksternal" 
                      : currentRole === "Subcon" 
                      ? "Monitoring sertifikat peserta" 
                      : currentRole === "Vendor" 
                      ? "Penerbitan & template sertifikat" 
                      : "Kelola sertifikat & template dinamis"}
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("trainer")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "trainer" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <GraduationCap className={`w-4 h-4 shrink-0 ${currentTab === "trainer" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Management Trainer</div>
                  <div className={`text-[10px] ${currentTab === "trainer" ? "text-blue-100" : "text-slate-400"}`}>
                    Direktori instruktur, jam &amp; kursus
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("assessment_mgmt")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "assessment_mgmt" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <ClipboardList className={`w-4 h-4 shrink-0 ${currentTab === "assessment_mgmt" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Management Survey</div>
                  <div className={`text-[10px] ${currentTab === "assessment_mgmt" ? "text-blue-100" : "text-slate-400"}`}>
                    Kelola kuesioner, respon &amp; analitik
                  </div>
                </div>
              </button>
            </>
          )}

          {/* ===================================================================
              MODULE 2: EM (Enterprise Module)
              - Blast Message
              - Management Survey (Assessment Management)
              - Dashboard User & Role Management
              - Role Akses Internal
              - Review Request Role
             =================================================================== */}
          {currentModule === "EM" && (
            <>
              <button
                onClick={() => onTabChange("blast")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "blast" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Megaphone className={`w-4 h-4 shrink-0 ${currentTab === "blast" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Blast Message</div>
                  <div className={`text-[10px] ${currentTab === "blast" ? "text-blue-100" : "text-slate-400"}`}>
                    Komunikasi massal terarah
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("assessment_mgmt")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "assessment_mgmt" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <ClipboardList className={`w-4 h-4 shrink-0 ${currentTab === "assessment_mgmt" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Management Survey</div>
                  <div className={`text-[10px] ${currentTab === "assessment_mgmt" ? "text-blue-100" : "text-slate-400"}`}>
                    Kelola kuesioner &amp; assign pegawai
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("em_dashboard_user_role")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "em_dashboard_user_role" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <LayoutDashboard className={`w-4 h-4 shrink-0 ${currentTab === "em_dashboard_user_role" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Dashboard User &amp; Role Management</div>
                  <div className={`text-[10px] ${currentTab === "em_dashboard_user_role" ? "text-blue-100" : "text-slate-400"}`}>
                    Pengawasan akun &amp; hierarki peran
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("em_role_akses_internal")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "em_role_akses_internal" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <ShieldCheck className={`w-4 h-4 shrink-0 ${currentTab === "em_role_akses_internal" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Role Akses Internal</div>
                  <div className={`text-[10px] ${currentTab === "em_role_akses_internal" ? "text-blue-100" : "text-slate-400"}`}>
                    Otoritas Holding, PMLI &amp; Subholding
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("em_review_request_role")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "em_review_request_role" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Sliders className={`w-4 h-4 shrink-0 ${currentTab === "em_review_request_role" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Review Request Role</div>
                  <div className={`text-[10px] ${currentTab === "em_review_request_role" ? "text-blue-100" : "text-slate-400"}`}>
                    Persetujuan pengajuan role baru
                  </div>
                </div>
              </button>
            </>
          )}

          {/* ===================================================================
              MODULE 3: LANDING PAGE (Pengisian Assessment untuk User yang Di-assign)
             =================================================================== */}
          {currentModule === "Landing Page" && (
            <>
              <button
                onClick={() => onTabChange("landing_assessment_fill")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "landing_assessment_fill" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <UserCheck className={`w-4 h-4 shrink-0 ${currentTab === "landing_assessment_fill" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Pengisian Asesmen User</div>
                  <div className={`text-[10px] ${currentTab === "landing_assessment_fill" ? "text-blue-100" : "text-slate-400"}`}>
                    Asesmen yang di-assign ke Anda
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("certificate")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "certificate" ? "bg-[#016DB2] text-white font-bold shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Award className={`w-4 h-4 shrink-0 ${currentTab === "certificate" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Sertifikat Saya</div>
                  <div className={`text-[10px] ${currentTab === "certificate" ? "text-blue-100" : "text-slate-400"}`}>
                    Riwayat sertifikat internal &amp; eksternal
                  </div>
                </div>
              </button>

              <button
                onClick={() => onTabChange("overview")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${currentTab === "overview" ? "bg-[#016DB2] text-white font-bold shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Compass className={`w-4 h-4 shrink-0 ${currentTab === "overview" ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold">Katalog Pembelajaran Publik</div>
                  <div className={`text-[10px] ${currentTab === "overview" ? "text-blue-100" : "text-slate-400"}`}>
                    Eksplorasi kursus umum
                  </div>
                </div>
              </button>
            </>
          )}

        </nav>
      </div>

      {/* Bottom Performance HQ Section */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Sliders className="w-4 h-4 text-slate-500" />
          <div>
            <div>Performance HQ</div>
            <div className="text-[10px] font-normal text-slate-400">Admin console</div>
          </div>
        </div>

        <div className="flex gap-2 text-xs">
          <button className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg font-semibold text-slate-700 flex items-center justify-center gap-1">
            <FileText className="w-3 h-3 text-slate-500" /> Planning
          </button>
          <button className="flex-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg font-semibold text-emerald-700 flex items-center justify-center gap-1">
            <LineChart className="w-3 h-3 text-emerald-600" /> Monitoring
          </button>
        </div>

        {/* User Card */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition">
          <div className="flex items-center gap-2.5">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
              alt="User"
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-slate-800">
                {currentRole === "User" ? "Aan Sukwinandi" : currentRole === "Trainer" ? "M. Khairoudin" : "Juju Juarsih"}
              </div>
              <div className="text-[10px] text-slate-400">{currentRole}</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

      </div>

    </aside>
  );
}
