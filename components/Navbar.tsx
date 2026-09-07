"use client";

import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Grid, 
  FileText, 
  ChevronDown, 
  Shield, 
  Layers, 
  User, 
  UserCheck, 
  Building, 
  GraduationCap, 
  Briefcase,
  Sparkles
} from "lucide-react";

export type UserRole = 
  | "User" 
  | "Superadmin" 
  | "Admin HO (Corpu)" 
  | "Admin Entitas (Corpu)" 
  | "Vendor" 
  | "Subcon" 
  | "Trainer";

export type AppModule = 
  | "Landing Page" 
  | "LMS" 
  | "EM";

interface NavbarProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  currentModule: string;
  onModuleChange: (module: string) => void;
}

export const AVAILABLE_ROLES: { id: UserRole; label: string; desc: string }[] = [
  { id: "User", label: "User", desc: "Pekerja / Learner Pelindo" },
  { id: "Superadmin", label: "Superadmin", desc: "Akses Penuh Seluruh Sistem" },
  { id: "Admin HO (Corpu)", label: "Admin HO (Corpu)", desc: "Kantor Pusat / Holding Corpu" },
  { id: "Admin Entitas (Corpu)", label: "Admin Entitas (Corpu)", desc: "Subholding & Regional" },
  { id: "Vendor", label: "Vendor", desc: "Lembaga Mitra Eksternal" },
  { id: "Subcon", label: "Subcon", desc: "Mitra Sub-Kontraktor Pelatihan" },
  { id: "Trainer", label: "Trainer", desc: "Instruktur Internal / Eksternal" },
];

export const AVAILABLE_MODULES: { id: AppModule; label: string; desc: string; badge: string }[] = [
  { id: "Landing Page", label: "Landing Page", desc: "Portal Publik & Pengisian Asesmen User", badge: "Portal" },
  { id: "LMS", label: "LMS", desc: "Management Certificate & Trainer", badge: "Learning" },
  { id: "EM", label: "EM", desc: "Blast, Assessment & Role Management", badge: "Enterprise" },
];

export default function Navbar({ 
  currentRole, 
  onRoleChange, 
  currentModule, 
  onModuleChange 
}: NavbarProps) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showModuleMenu, setShowModuleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Superadmin": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Admin HO (Corpu)": return "bg-sky-100 text-[#016DB2] border-sky-200";
      case "Admin Entitas (Corpu)": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Trainer": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Vendor":
      case "Subcon": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getModuleBadgeColor = (mod: string) => {
    switch (mod) {
      case "LMS": return "bg-sky-50 text-[#016DB2] border-sky-200";
      case "EM": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Landing Page": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 lg:px-8 py-3 flex items-center justify-between shadow-xs select-none">
      
      {/* Left: User Welcome */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#016DB2] to-blue-700 text-white flex items-center justify-center font-black text-sm shadow-xs">
          P
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs md:text-sm font-bold text-slate-800 leading-none">
              Portaverse Portal
            </h2>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadgeColor(currentRole)}`}>
              {currentRole}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-none">
            Modul Aktif: <b className="text-[#016DB2]">{currentModule}</b>
          </p>
        </div>
      </div>

      {/* Center Search Bar (Hidden on Mobile) */}
      <div className="flex-1 max-w-md mx-6 relative hidden xl:block">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Cari fitur, materi, sertifikat, atau asesmen..." 
            className="w-full pl-10 pr-12 py-2 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-200 focus:border-[#016DB2] focus:outline-none transition shadow-2xs"
          />
          <div className="absolute right-3 px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-mono text-slate-400 font-bold bg-white">
            ⌘ K
          </div>
        </div>
      </div>

      {/* Right Controls: Role Selector, Module Selector & Quick Actions */}
      <div className="flex items-center gap-2.5">
        
        {/* ===================================================================
            DROPDOWN 1: PILIHAN MODULE (Landing Page, LMS, EM)
           =================================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowModuleMenu(!showModuleMenu);
              setShowRoleMenu(false);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition shadow-2xs ${getModuleBadgeColor(currentModule)}`}
          >
            <Layers className="w-3.5 h-3.5 text-[#016DB2]" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-medium block -mb-0.5">Modul:</span>
              <span className="text-xs font-black">{currentModule}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {showModuleMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs animate-in fade-in">
              <div className="px-3 py-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-xs">Pilih Modul Aplikasi</span>
                <p className="text-[10px] text-slate-400">Navigasi ke ekosistem modul Portaverse</p>
              </div>

              <div className="space-y-1 mt-1.5">
                {AVAILABLE_MODULES.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => {
                      onModuleChange(mod.id);
                      setShowModuleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-center justify-between group ${currentModule === mod.id ? "bg-sky-50 text-[#016DB2] font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">{mod.label}</span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded font-semibold">
                          {mod.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{mod.desc}</div>
                    </div>
                    {currentModule === mod.id && (
                      <span className="w-2 h-2 rounded-full bg-[#016DB2]"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===================================================================
            DROPDOWN 2: PILIHAN ROLE (User, Superadmin, Admin HO, etc.)
           =================================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowModuleMenu(false);
            }}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold flex items-center gap-2 transition shadow-2xs"
          >
            <Shield className="w-3.5 h-3.5 text-slate-600" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-medium block -mb-0.5">Role:</span>
              <span className="text-xs font-black">{currentRole}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs animate-in fade-in">
              <div className="px-3 py-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-xs">Pilih Peran Pengguna (Role)</span>
                <p className="text-[10px] text-slate-400">Ganti sudut pandang otoritas akun</p>
              </div>

              <div className="space-y-1 mt-1.5 max-h-72 overflow-y-auto">
                {AVAILABLE_ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      onRoleChange(role.id);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${currentRole === role.id ? "bg-sky-50 text-[#016DB2] font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    <div>
                      <div className="font-bold text-xs">{role.label}</div>
                      <div className="text-[10px] text-slate-400">{role.desc}</div>
                    </div>
                    {currentRole === role.id && (
                      <span className="w-2 h-2 rounded-full bg-[#016DB2]"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              setShowRoleMenu(false);
              setShowModuleMenu(false);
            }}
            title="Notifikasi"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 text-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-800">
                <span>Notifikasi Masuk (3)</span>
                <span className="text-[10px] text-[#016DB2] font-semibold cursor-pointer">Tandai Dibaca</span>
              </div>
              <div className="divide-y divide-slate-50 mt-1">
                <div className="py-2 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
                  <div className="font-bold text-slate-800">Asesmen Baru Ditugaskan</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Asesmen Budaya AKHLAK 2026 telah di-assign ke NIPP Anda.</p>
                </div>
                <div className="py-2 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
                  <div className="font-bold text-slate-800">Sertifikat Siap Diunduh</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Sertifikat Leadership Fundamentals telah terverifikasi.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          title="Bantuan & Panduan"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
}
