"use client";

import React from "react";
import { X, Award, Clock, Star, BookOpen, Quote, CheckCircle2 } from "lucide-react";
import { Trainer } from "@/lib/mockData";

interface TrainerModalProps {
  trainer: Trainer | null;
  onClose: () => void;
}

export default function TrainerModal({ trainer, onClose }: TrainerModalProps) {
  if (!trainer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>👨‍🏫 Direktori Instruktur Pelindo Group</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img 
              src={trainer.avatar} 
              alt={trainer.nama}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{trainer.nama}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${trainer.tipe.includes("Internal") ? "bg-sky-50 text-sky-700 border border-sky-200" : "bg-purple-50 text-purple-700 border border-purple-200"}`}>
                  {trainer.tipe}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">NIP/ID: <span className="font-mono font-semibold">{trainer.nip}</span> &bull; {trainer.unit}</p>
              <p className="text-xs font-semibold text-pelindo-700 mt-0.5">Spesialisasi: {trainer.bidang_keahlian}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                <Clock className="w-3.5 h-3.5 text-pelindo-700" /> Jam Mengajar
              </div>
              <div className="text-2xl font-black text-slate-900">{trainer.total_jam_mengajar} <span className="text-xs font-normal">Jam</span></div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Total Batch
              </div>
              <div className="text-2xl font-black text-slate-900">{trainer.jumlah_kelas} <span className="text-xs font-normal">Kelas</span></div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Skor Evaluasi
              </div>
              <div className="text-2xl font-black text-amber-600">{trainer.rating_peserta} <span className="text-xs font-normal">/ 5.0</span></div>
            </div>
          </div>

          {/* Bio and Review */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Profil & Pengalaman Pengajar</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {trainer.bio}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Sertifikasi Instruktur Resmi (TOT)</h4>
              <div className="flex items-center gap-2 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold">
                <Award className="w-4 h-4 text-emerald-600" /> {trainer.sertifikasi_tot}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Kutipan Evaluasi Peserta Pelatihan</h4>
              <div className="flex gap-3 p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900 italic">
                <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>"{trainer.review_quote}"</span>
              </div>
            </div>
          </div>

          {/* Recent History Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Riwayat Kelas yang Pernah Diampu</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="p-2.5">Judul Kelas</th>
                    <th className="p-2.5">Durasi</th>
                    <th className="p-2.5">Sasaran Peserta</th>
                    <th className="p-2.5">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-medium">Smart Port Operations Batch 2</td>
                    <td className="p-2.5">24 Jam</td>
                    <td className="p-2.5">SPTP & SPMT</td>
                    <td className="p-2.5 font-bold text-amber-600">⭐ 4.90</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">ISPS Code Dermaga & Audit K3</td>
                    <td className="p-2.5">18 Jam</td>
                    <td className="p-2.5">Regional 2</td>
                    <td className="p-2.5 font-bold text-amber-600">⭐ 4.88</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">Pengenalan TOS Nusantara Baru</td>
                    <td className="p-2.5">16 Jam</td>
                    <td className="p-2.5">Pegawai Baru HO</td>
                    <td className="p-2.5 font-bold text-amber-600">⭐ 4.95</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
