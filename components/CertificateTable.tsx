"use client";

import React from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileText
} from "lucide-react";
import { CertItem } from "./CertificateModule";

export interface CertificateTableProps {
  items: CertItem[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onDetail: (item: CertItem) => void;
  onDownload: (item: CertItem) => void;
  onDelete?: (item: CertItem) => void;
  isMyCert?: boolean;
}

export default function CertificateTable({
  items,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onDetail,
  onDownload,
  onDelete,
  isMyCert = false
}: CertificateTableProps) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const pagedItems = items.slice(startIndex, startIndex + pageSize);

  const getSourceBadge = (source: string, isExternal?: boolean) => {
    if (isExternal || source.toLowerCase().includes("eksternal")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
          <ExternalLink className="w-3 h-3 text-purple-600 shrink-0" />
          <span>Luar LMS (Eksternal)</span>
        </span>
      );
    }
    if (source.includes("SAP")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
          <span>SAP HCIS (Organik/PKWT)</span>
        </span>
      );
    }
    if (source.includes("THANOS") || source.includes("PDS")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
          <span>THANOS/PDS (Alih Daya)</span>
        </span>
      );
    }
    if (source.includes("ISMA")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
          <span>ISMA (Pelaut/ABK)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-50 text-[#016DB2] border border-sky-200">
        <span className="w-1.5 h-1.5 rounded-full bg-[#016DB2] shrink-0"></span>
        <span>LMS Portaverse (Internal)</span>
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-3 text-center w-14">NO</th>
              <th className="py-3.5 px-4 min-w-[230px]">NIPP / NAMA / FOTO</th>
              <th className="py-3.5 px-4 min-w-[170px]">COMPANY</th>
              <th className="py-3.5 px-4 min-w-[210px]">NAMA KURSUS</th>
              <th className="py-3.5 px-4 min-w-[150px]">NAMA KELAS</th>
              <th className="py-3.5 px-4 min-w-[180px]">PERIODE SERTIFIKAT</th>
              <th className="py-3.5 px-4 min-w-[170px]">SUMBER SERTIFIKAT</th>
              <th className="py-3.5 px-4 min-w-[190px] text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {pagedItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-14 px-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-800">Tidak ada sertifikat ditemukan</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Coba sesuaikan kata kunci pencarian atau filter status dan kanal sumber sertifikat.
                  </p>
                </td>
              </tr>
            ) : (
              pagedItems.map((item, index) => {
                const rowNo = startIndex + index + 1;
                const courseTitle =
                  item.courseName ||
                  item.title.replace(/^Sertifikat\s+(Kelulusan|Keahlian|Kehadiran|Penyelesaian|Lisensi|Kompetensi)\s+/i, "");
                const classNameText = item.className || "Batch 1 - Reguler";
                const companyName =
                  item.company ||
                  (item.source.includes("SAP")
                    ? "PT Pelabuhan Indonesia (Persero)"
                    : item.source.includes("THANOS")
                    ? "PT Pelindo Daya Sejahtera (PDS)"
                    : item.source.includes("ISMA")
                    ? "PT Pelindo Marine Service"
                    : "PT Pendidikan Maritim & Logistik Indonesia (PMLI)");

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* 1. NO */}
                    <td className="py-4 px-3 text-center font-bold text-slate-500">
                      {rowNo}
                    </td>

                    {/* 2. NIPP / NAMA / FOTO */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0 shadow-2xs"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#016DB2] to-sky-400 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {item.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => onDetail(item)}
                            className="font-bold text-slate-900 text-xs hover:text-[#016DB2] transition truncate block text-left cursor-pointer"
                            title={`Lihat detail sertifikat ${item.name}`}
                          >
                            {item.name}
                          </button>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                            <span className="text-slate-400 font-sans font-medium text-[10px]">NIPP:</span>
                            <span>{item.nipp}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. COMPANY */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[170px]" title={companyName}>
                          {companyName}
                        </span>
                      </div>
                    </td>

                    {/* 4. NAMA KURSUS */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-xs line-clamp-2 leading-snug" title={courseTitle}>
                        {courseTitle}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {item.type === "competency"
                          ? "Uji Kompetensi"
                          : item.type === "completion"
                          ? "Kelulusan Kursus"
                          : "Kehadiran / Workshop"}
                      </div>
                    </td>

                    {/* 5. NAMA KELAS */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/70">
                        {classNameText}
                      </span>
                    </td>

                    {/* 6. PERIODE SERTIFIKAT */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.date}</span>
                      </div>
                      <div className="mt-1">
                        {item.status === "Diterbitkan" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Diterbitkan
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            Kadaluarsa
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 7. SUMBER SERTIFIKAT */}
                    <td className="py-4 px-4">
                      {getSourceBadge(item.source, item.isExternal)}
                    </td>

                    {/* 8. ACTION (DETAIL, DOWNLOAD SERTIFIKAT) */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onDetail(item)}
                          className="px-2.5 py-1.5 bg-[#016DB2]/10 hover:bg-[#016DB2] hover:text-white text-[#016DB2] rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer shrink-0"
                          title="Lihat Detail Sertifikat"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDownload(item)}
                          className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer shrink-0"
                          title="Download Sertifikat PDF"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Download</span>
                        </button>
                        {item.isExternal && onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(item)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                            title="Hapus Sertifikat Eksternal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-200 text-xs text-slate-600 bg-white">
        <div className="flex items-center gap-2">
          <span>Tampilkan</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold appearance-none pr-6 focus:outline-none focus:border-[#016DB2]"
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={32}>32</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
          <span>data per halaman</span>
        </div>

        <div className="font-medium text-slate-500">
          {totalItems === 0
            ? "0 data"
            : `${startIndex + 1}-${Math.min(startIndex + pageSize, totalItems)} dari ${totalItems} sertifikat`}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage <= 1}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs border transition flex items-center gap-1 ${
              safeCurrentPage <= 1
                ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition cursor-pointer ${
                  safeCurrentPage === p
                    ? "bg-[#016DB2] text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onPageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage >= totalPages}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs border transition flex items-center gap-1 ${
              safeCurrentPage >= totalPages
                ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs cursor-pointer"
            }`}
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
