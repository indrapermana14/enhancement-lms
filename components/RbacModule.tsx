"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Users, 
  FileText 
} from "lucide-react";
import { AuditLog } from "@/lib/mockData";

interface RbacModuleProps {
  auditLogs: AuditLog[];
  onAddAuditLog: (log: AuditLog) => void;
}

export default function RbacModule({ auditLogs, onAddAuditLog }: RbacModuleProps) {
  const [activeTab, setActiveTab] = useState<"matrix" | "vendor" | "pmli" | "audit">("matrix");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  // Vendor Test State
  const [vendorOrg, setVendorOrg] = useState("PT Integrasi Logistik Cipta Solusi (ILCS)");
  const [vendorEmail, setVendorEmail] = useState("support.lms@ilcs.co.id");
  const [testNip, setTestNip] = useState("");
  const [vendorTestResult, setVendorTestResult] = useState<{ status: "idle" | "success" | "error"; msg: string }>({ status: "idle", msg: "" });

  const handleTestVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (testNip.trim().length > 0) {
      setVendorTestResult({
        status: "error",
        msg: `❌ Pendaftaran Ditolak! Terdeteksi NIP Pegawai (${testNip}). Sesuai MoM FGD, Akun Vendor DILARANG KERAS di-bind ke NIP Pegawai untuk mencegah konflik peran pembelajar!`
      });
      onAddAuditLog({
        waktu: new Date().toISOString().slice(0, 16).replace("T", " "),
        aktor: "Sistem Validasi (Automated)",
        aksi: "Penolakan Akun Vendor",
        target: vendorOrg,
        keterangan: `Percobaan binding ke NIP pegawai ${testNip} diblokir otomatis oleh sistem`
      });
    } else {
      setVendorTestResult({
        status: "success",
        msg: "✅ Verifikasi Sukses! Akun Instansi Vendor terdaftar resmi tanpa terikat NIP pegawai perseorangan."
      });
      onAddAuditLog({
        waktu: new Date().toISOString().slice(0, 16).replace("T", " "),
        aktor: "Admin HO (Reini Delfianti)",
        aksi: "Aktivasi Akun Vendor",
        target: vendorOrg,
        keterangan: "Akun instansi disetujui untuk penyusunan modul & BAST V2"
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pelindo-700 via-pelindo-800 to-pelindo-900 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-pelindo-900/10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-pelindo-100 text-xs font-bold mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-300" /> Standardisasi Peran & Keamanan
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Role, Authority & Akun Management
        </h1>
        <p className="text-xs md:text-sm text-pelindo-100 mt-1.5 opacity-90 max-w-2xl">
          Penyeragaman Admin HO vs Admin Entitas, kebijakan anti-bind NIP akun vendor, hak khusus publikasi PMLI, dan pencatatan audit trail.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs font-bold overflow-x-auto">
        <button 
          onClick={() => setActiveTab("matrix")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "matrix" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          👥 Matriks Otoritas Pengguna
        </button>
        <button 
          onClick={() => setActiveTab("vendor")}
          className={`pb-3 px-4 transition border-b-2 flex items-center gap-1.5 ${activeTab === "vendor" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          <span>🏢 Proteksi Akun Vendor (Anti-Bind NIP)</span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
        </button>
        <button 
          onClick={() => setActiveTab("pmli")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "pmli" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          🏛️ Otoritas Khusus PT PMLI
        </button>
        <button 
          onClick={() => setActiveTab("audit")}
          className={`pb-3 px-4 transition border-b-2 ${activeTab === "audit" ? "border-pelindo-700 text-pelindo-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          📜 Audit Trail Log ({auditLogs.length})
        </button>
      </div>

      {/* =========================================================================
          TAB 1: MATRIX
         ========================================================================= */}
      {activeTab === "matrix" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Penyeragaman Matriks Otoritas & Peran Pengguna</h3>
            <p className="text-slate-500 text-xs">Standar pembagian hak akses sesuai kesepakatan FGD 2025</p>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">Kode Role</th>
                  <th className="p-3">Nama Peran Resmi</th>
                  <th className="p-3">Cakupan Entitas</th>
                  <th className="p-3">Hak Akses Kursus</th>
                  <th className="p-3">Hak Akses Sertifikat</th>
                  <th className="p-3">Otoritas Blast</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-pelindo-700">ADM-HO</td>
                  <td className="p-3 font-bold text-slate-900">Admin HO (Kantor Pusat)</td>
                  <td className="p-3">Seluruh Pelindo Group</td>
                  <td className="p-3 font-semibold text-emerald-600">Kelola & Terbitkan Global</td>
                  <td className="p-3">Master & Template Dinamis</td>
                  <td className="p-3 font-bold text-pelindo-700">Penuh (Seluruh Group)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-600">ADM-ENT</td>
                  <td className="p-3 font-bold text-slate-900">Admin Entitas (Subholding/Regional)</td>
                  <td className="p-3">Entitas Tertentu (SPMT/SPTP/dsb)</td>
                  <td className="p-3">Review & Approval Lokal</td>
                  <td className="p-3">Input Sertifikat Eksternal</td>
                  <td className="p-3">Khusus Entitas Terkait</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-700">ADM-PMLI</td>
                  <td className="p-3 font-bold text-slate-900">Admin Khusus PT PMLI</td>
                  <td className="p-3">Pusat Pembelajaran Korporat</td>
                  <td className="p-3 font-semibold text-purple-700">Self-Publishing (Tanpa Antre)</td>
                  <td className="p-3">Terbitkan Sertifikat Pelatihan</td>
                  <td className="p-3">Peserta Kelas Terdaftar</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-amber-700">VNDR-ORG</td>
                  <td className="p-3 font-bold text-slate-900">Akun Instansi Mitra / Vendor</td>
                  <td className="p-3">Lembaga Eksternal</td>
                  <td className="p-3">Pengajuan Draft & Bab Kursus</td>
                  <td className="p-3">Upload Softcopy Dokumen</td>
                  <td className="p-3 text-red-600 font-bold">Tidak Diizinkan</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-500">USER-EMP</td>
                  <td className="p-3 font-bold text-slate-900">Pekerja / Learner</td>
                  <td className="p-3">Individu Pegawai</td>
                  <td className="p-3">Daftar & Belajar di LMS</td>
                  <td className="p-3">Unduh Sertifikat Personal</td>
                  <td className="p-3 text-slate-400">Penerima Pesan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: VENDOR VALIDATION GUARD
         ========================================================================= */}
      {activeTab === "vendor" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Aturan Ketat MoM FGD 2025: Larangan Binding Akun Vendor ke NIP Pegawai</span>
            </div>
            <p className="leading-relaxed">
              Akun operasional vendor/subcon wajib berupa <b>Akun Instansi Badan Usaha</b> dan <b>DILARANG KERAS di-bind ke NIP Pegawai Pelindo</b>. Hal ini untuk mencegah konflik role di front-end di mana pegawai yang bersangkutan kehilangan hak akses sebagai pembelajar.
            </p>
          </div>

          <form onSubmit={handleTestVendor} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-card space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100">
              🧪 Simulator Validasi Akun Instansi Vendor
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Instansi / Badan Usaha Vendor:</label>
                <input 
                  type="text" 
                  value={vendorOrg}
                  onChange={(e) => setVendorOrg(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Operasional Badan Usaha:</label>
                <input 
                  type="email" 
                  value={vendorEmail}
                  onChange={(e) => setVendorEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-bold text-slate-800">
                Uji Masukkan NIP Pegawai (Coba ketik '102881' untuk menguji pemblokiran otomatis):
              </label>
              <input 
                type="text" 
                placeholder="Kosongkan jika bukan pegawai..."
                value={testNip}
                onChange={(e) => setTestNip(e.target.value)}
                className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-mono text-xs focus:outline-none focus:border-pelindo-700"
              />
              <span className="text-[11px] text-slate-400 block">
                🔒 Sistem otomatis memblokir aktivasi jika terdeteksi NIP pegawai terdaftar di SAP/THANOS.
              </span>
            </div>

            {vendorTestResult.status === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-start gap-2.5 animate-in fade-in">
                <XCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                <span>{vendorTestResult.msg}</span>
              </div>
            )}

            {vendorTestResult.status === "success" && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-bold flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                <span>{vendorTestResult.msg}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-pelindo-700 hover:bg-pelindo-800 text-white font-bold rounded-xl shadow-md transition"
              >
                Uji Verifikasi Guardrail Akun
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PMLI AUTHORITY
         ========================================================================= */}
      {activeTab === "pmli" && (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-card space-y-4 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-base">🏛️ Otoritas Khusus PT PMLI (Self-Publishing Rights)</h3>
            <p className="text-slate-500 text-xs">
              Pemberian kewenangan langsung mempublikasikan pelatihan ke katalog Portaverse tanpa melalui antrean verifikasi Corpu HO.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { title: "Izin Direct Course Publishing", desc: "Mempublikasikan kursus dan kelas baru langsung aktif di katalog Portaverse", active: true },
              { title: "Izin Penerbitan Sertifikat Resmi PMLI", desc: "Menggunakan template sertifikat resmi dengan tanda tangan Group Head SDM", active: true },
              { title: "Izin Penugasan Trainer Mandiri", desc: "Menunjuk internal SME & mitra pengajar tanpa verifikasi Corpu HO", active: true },
              { title: "Akses Learning Analytics Lintas Entitas", desc: "Memantau jam belajar dan penyelesaian kursus seluruh subholding & regional", active: true },
            ].map((auth) => (
              <div key={auth.title} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">{auth.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{auth.desc}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                  Aktif
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="button"
              onClick={() => showToast("Konfigurasi otoritas khusus PMLI telah berhasil diperbarui.")}
              className="px-5 py-2.5 bg-pelindo-700 hover:bg-pelindo-800 text-white font-bold rounded-xl transition"
            >
              Simpan Konfigurasi Otoritas
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: AUDIT TRAIL
         ========================================================================= */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Audit Trail Log Aktivitas & Keamanan</h3>
              <p className="text-slate-500 text-[11px]">Pencatatan riwayat persetujuan, penolakan, dan mutasi kewenangan sistem</p>
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">Waktu Eksekusi</th>
                <th className="p-3">Aktor / Pengguna</th>
                <th className="p-3">Aksi Sistem</th>
                <th className="p-3">Target Entitas</th>
                <th className="p-3">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {auditLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono text-slate-500 text-[11px]">{log.waktu}</td>
                  <td className="p-3 font-bold text-slate-800">{log.aktor}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${log.aksi.includes("Penolakan") ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                      {log.aksi}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-900">{log.target}</td>
                  <td className="p-3 text-slate-600">{log.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
