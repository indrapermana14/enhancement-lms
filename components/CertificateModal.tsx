"use client";

import React from "react";
import { X, Download, Printer, CheckCircle, ShieldCheck, QrCode } from "lucide-react";
import { Certificate } from "@/lib/mockData";

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pelindo-50 text-pelindo-700 flex items-center justify-center font-bold">
              📜
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Pratinjau Dokumen Sertifikat Resmi</h3>
              <p className="text-xs text-slate-500">Evidence Sah Pelatihan &bull; Terdaftar di Database Terpusat Pelindo</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - High Fidelity Certificate */}
        <div className="p-6 md:p-8 bg-slate-100 flex justify-center">
          <div className="w-full max-w-2xl bg-white border-8 border-pelindo-900 outline outline-2 outline-amber-500 outline-offset-[-6px] rounded-xl p-8 md:p-12 text-center relative shadow-xl cert-pattern-bg">
            
            {/* Header */}
            <div className="text-xs font-black tracking-[0.25em] text-pelindo-700 uppercase">
              PT Pelabuhan Indonesia (Persero)
            </div>
            <div className="text-[11px] font-semibold text-slate-500 tracking-wider mt-1">
              PORTAVERSE CORPORATE UNIVERSITY &bull; LEARNING EXCELLENCE CENTER
            </div>

            {/* Title */}
            <div className="text-2xl md:text-3xl font-black text-slate-900 mt-6 mb-2 tracking-wide">
              SERTIFIKAT KELULUSAN
            </div>
            <div className="inline-block px-3 py-1 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs text-slate-600">
              REGISTRASI NO: {certificate.no_sertifikat}
            </div>

            {/* Recipient */}
            <div className="text-xs text-slate-500 mt-6">Diberikan dengan predikat kelulusan resmi kepada:</div>
            
            <div className="text-xl md:text-2xl font-black text-pelindo-700 border-b-2 border-pelindo-700 inline-block px-6 pb-1 my-3">
              {certificate.nama_pegawai}
            </div>
            <div className="text-xs font-medium text-slate-600">
              NIP: {certificate.nip} &bull; Unit Kerja: {certificate.unit_kerja}
            </div>

            {/* Course Title */}
            <div className="mt-5 max-w-lg mx-auto text-xs md:text-sm text-slate-700 leading-relaxed">
              Telah berhasil menyelesaikan seluruh rangkaian kurikulum, evaluasi kompetensi, dan uji pemahaman pada program pelatihan:
              <div className="font-extrabold text-slate-900 text-base mt-1 text-pelindo-900">
                "{certificate.jenis_sertifikat}"
              </div>
              <div className="text-emerald-600 font-bold mt-1 text-xs">
                Predikat: {certificate.score}
              </div>
            </div>

            {/* Signatures and QR Code */}
            <div className="flex items-end justify-between mt-10 px-4 md:px-8 text-left">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-2 text-slate-700">
                  <QrCode className="w-10 h-10" />
                </div>
                <div className="font-mono text-[9px] text-slate-400 mt-1 font-semibold">QR-VERIFIED</div>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3" /> SAH & VALID
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">Jakarta, {certificate.tanggal_terbit}</div>
                <div className="font-serif italic text-xl text-pelindo-900 h-10 flex items-center justify-center font-bold">
                  Reini Delfianti
                </div>
                <div className="font-black text-pelindo-700 text-sm border-t border-slate-300 pt-1">
                  REINI DELFIANTI
                </div>
                <div className="text-[10px] text-slate-500">Group Head Pengelolaan SDM</div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Terhubung ke Talent Management System (TMS) & SAP ERP
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Tutup
            </button>
            <button 
              onClick={() => alert(`Mengunduh berkas sertifikat resmi ${certificate.no_sertifikat}.pdf...`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-pelindo-700 hover:bg-pelindo-800 text-white text-xs font-bold rounded-xl shadow-lg shadow-pelindo-700/20 transition"
            >
              <Download className="w-4 h-4" /> Download PDF Resmi
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
