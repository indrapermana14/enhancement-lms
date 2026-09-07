"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Download,
  Check,
  X,
  Info,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
  MoreVertical,
  SlidersHorizontal
} from "lucide-react";

export interface ReviewRequestRoleProps {
  onAddAuditLog?: (log: any) => void;
}

interface RequestRoleItem {
  id: string;
  applicantName: string;
  nipp: string;
  roleTitle: string;
  email: string;
  entity: string;
  roleExisting: string;
  requestedRole: string;
  status: "Waiting Approval 1" | "Waiting Approval 2" | "Approved" | "Rejected";
  approvalProgress: string; // "0/2", "1/2", "2/2"
  approverName: string;
  approverRole: string;
  approverAvatar: string;
  phone?: string;
  telp?: string;
  statusPegawai?: string;
  skPengangkatan?: string;
  skPosisiTerakhir?: string;
  registerDate?: string;
  dateSubmitted?: string;
  dateUpdated?: string;
  rejectReason?: string;
}

const INITIAL_MY_APPROVALS: RequestRoleItem[] = [
  {
    id: "MY-REQ-1",
    applicantName: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    roleExisting: "HO_Admin_TMS",
    requestedRole: "HO_SuperAdmin",
    status: "Waiting Approval 1",
    approvalProgress: "0/2",
    approverName: "Albertus Brian",
    approverRole: "Atasan Langsung",
    approverAvatar: "H",
    phone: "+62 81234221234",
    telp: "021-2312312",
    statusPegawai: "PKWTT PELINDO",
    skPengangkatan: "SK Pengangkatan Pekerja",
    skPosisiTerakhir: "SK Posisi Terakhir",
    registerDate: "26/09/2025 12:00",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "MY-REQ-2",
    applicantName: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    roleExisting: "HO_Admin_TMS",
    requestedRole: "HO_SuperAdmin",
    status: "Waiting Approval 1",
    approvalProgress: "0/2",
    approverName: "Albertus Brian",
    approverRole: "Atasan Langsung",
    approverAvatar: "H",
    phone: "+62 81234221234",
    telp: "021-2312312",
    statusPegawai: "PKWTT PELINDO",
    skPengangkatan: "SK Pengangkatan Pekerja",
    skPosisiTerakhir: "SK Posisi Terakhir",
    registerDate: "26/09/2025 12:00",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "MY-REQ-3",
    applicantName: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    roleExisting: "HO_Admin_TMS",
    requestedRole: "HO_SuperAdmin",
    status: "Waiting Approval 1",
    approvalProgress: "0/2",
    approverName: "Albertus Brian",
    approverRole: "Atasan Langsung",
    approverAvatar: "H",
    phone: "+62 81234221234",
    telp: "021-2312312",
    statusPegawai: "PKWTT PELINDO",
    skPengangkatan: "SK Pengangkatan Pekerja",
    skPosisiTerakhir: "SK Posisi Terakhir",
    registerDate: "26/09/2025 12:00",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "MY-REQ-4",
    applicantName: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    roleExisting: "HO_Admin_TMS",
    requestedRole: "HO_SuperAdmin",
    status: "Waiting Approval 1",
    approvalProgress: "0/2",
    approverName: "Albertus Brian",
    approverRole: "Atasan Langsung",
    approverAvatar: "H",
    phone: "+62 81234221234",
    telp: "021-2312312",
    statusPegawai: "PKWTT PELINDO",
    skPengangkatan: "SK Pengangkatan Pekerja",
    skPosisiTerakhir: "SK Posisi Terakhir",
    registerDate: "26/09/2025 12:00",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "MY-REQ-5",
    applicantName: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    roleExisting: "HO_Admin_TMS",
    requestedRole: "HO_SuperAdmin",
    status: "Waiting Approval 1",
    approvalProgress: "0/2",
    approverName: "Albertus Brian",
    approverRole: "Atasan Langsung",
    approverAvatar: "H",
    phone: "+62 81234221234",
    telp: "021-2312312",
    statusPegawai: "PKWTT PELINDO",
    skPengangkatan: "SK Pengangkatan Pekerja",
    skPosisiTerakhir: "SK Posisi Terakhir",
    registerDate: "26/09/2025 12:00",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  }
];

const INITIAL_HISTORY: RequestRoleItem[] = [
  {
    id: "HIST-1",
    applicantName: "HENDRI AJI",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Integrasi Logistik Cipta Solusi",
    roleExisting: "Pekerja",
    requestedRole: "TMS_Admin",
    status: "Waiting Approval 2",
    approvalProgress: "1/2",
    approverName: "Admin Modul HO TMS",
    approverRole: "Super Admin",
    approverAvatar: "HA",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "HIST-2",
    applicantName: "YOGI MUHAMMAD",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Integrasi Logistik Cipta Solusi",
    roleExisting: "IMS_Admin",
    requestedRole: "TMS_Admin",
    status: "Approved",
    approvalProgress: "2/2",
    approverName: "Admin Modul HO TMS",
    approverRole: "Super Admin",
    approverAvatar: "YM",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "HIST-3",
    applicantName: "YOGI MUHAMMAD",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Integrasi Logistik Cipta Solusi",
    roleExisting: "IMS_Admin",
    requestedRole: "TMS_Admin",
    status: "Approved",
    approvalProgress: "2/2",
    approverName: "Admin Modul HO TMS",
    approverRole: "Super Admin",
    approverAvatar: "YM",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "HIST-4",
    applicantName: "YOGI MUHAMMAD",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Integrasi Logistik Cipta Solusi",
    roleExisting: "IMS_Admin",
    requestedRole: "TMS_Admin",
    status: "Approved",
    approvalProgress: "2/2",
    approverName: "Admin Modul HO TMS",
    approverRole: "Super Admin",
    approverAvatar: "YM",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "HIST-5",
    applicantName: "DEMAS BAKRI SUAJA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Integrasi Logistik Cipta Solusi",
    roleExisting: "Pekerja",
    requestedRole: "Super_Admin",
    status: "Rejected",
    approvalProgress: "1/2",
    approverName: "Super Admin",
    approverRole: "Super Admin",
    approverAvatar: "DB",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00",
    rejectReason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam erat magna, vestibulum vel aliquam in, molestie vitae sem. Phasellus pellentesque eu risus in luctus. Donec et tortor a enim malesuada sodales."
  }
];

export default function ReviewRequestRoleModule({ onAddAuditLog }: ReviewRequestRoleProps) {
  // Top Tabs: "my_approval" | "history"
  const [activeTab, setActiveTab] = useState<"my_approval" | "history">("my_approval");

  // Page View Mode: "list" | "view_permission"
  const [viewMode, setViewMode] = useState<"list" | "view_permission">("list");
  const [selectedRoleForPermission, setSelectedRoleForPermission] = useState<string>("HO_SuperAdmin");
  const [activeModuleTab, setActiveModuleTab] = useState<"KMS" | "TMS" | "LMS" | "CMS" | "IMS">("TMS");

  // Lists Data
  const [myApprovals, setMyApprovals] = useState<RequestRoleItem[]>(INITIAL_MY_APPROVALS);
  const [historyList, setHistoryList] = useState<RequestRoleItem[]>(INITIAL_HISTORY);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  // Action Menu Dropdown ID
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  // Hover Tooltip ID
  const [hoveredTooltipId, setHoveredTooltipId] = useState<string | null>(null);

  // Modals
  const [selectedReviewItem, setSelectedReviewItem] = useState<RequestRoleItem | null>(null);
  const [showConfirmApproveModal, setShowConfirmApproveModal] = useState<RequestRoleItem | null>(null);
  const [showConfirmRejectModal, setShowConfirmRejectModal] = useState<RequestRoleItem | null>(null);
  const [selectedAssignRole, setSelectedAssignRole] = useState("User");
  const [rejectReasonText, setRejectReasonText] = useState("");

  const [logActivityItem, setLogActivityItem] = useState<RequestRoleItem | null>(null);

  // Success Notification
  const [successModalText, setSuccessModalText] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const triggerSuccess = (text: string) => {
    setSuccessModalText(text);
    setTimeout(() => {
      setSuccessModalText(null);
    }, 2200);
  };

  const handleApproveFinal = () => {
    if (!showConfirmApproveModal) return;
    const target = showConfirmApproveModal;

    // Update list: move from myApprovals to history with Approved status
    setMyApprovals(myApprovals.filter(item => item.id !== target.id));
    setHistoryList([
      {
        ...target,
        status: "Approved",
        approvalProgress: "2/2",
        requestedRole: selectedAssignRole || target.requestedRole
      },
      ...historyList
    ]);

    setShowConfirmApproveModal(null);
    setSelectedReviewItem(null);
    triggerSuccess("Sukses Approve Request Approval");

    if (onAddAuditLog) {
      onAddAuditLog({
        waktu: new Date().toISOString().slice(0, 16).replace("T", " "),
        aktor: "Approver",
        aksi: "Approve Request Role",
        target: target.applicantName,
        keterangan: `Menyetujui permohonan role ${target.requestedRole} menjadi ${selectedAssignRole}`
      });
    }
  };

  const handleRejectFinal = () => {
    if (!showConfirmRejectModal) return;
    const target = showConfirmRejectModal;

    setMyApprovals(myApprovals.filter(item => item.id !== target.id));
    setHistoryList([
      {
        ...target,
        status: "Rejected",
        approvalProgress: "0/2",
        rejectReason: rejectReasonText || "Permohonan role tidak memenuhi kriteria kelayakan unit."
      },
      ...historyList
    ]);

    setShowConfirmRejectModal(null);
    setSelectedReviewItem(null);
    setRejectReasonText("");
    triggerSuccess("Sukses Reject Request Approval");

    if (onAddAuditLog) {
      onAddAuditLog({
        waktu: new Date().toISOString().slice(0, 16).replace("T", " "),
        aktor: "Approver",
        aksi: "Reject Request Role",
        target: target.applicantName,
        keterangan: `Menolak permohonan role ${target.requestedRole}`
      });
    }
  };

  // Current List based on active tab
  const currentItems = activeTab === "my_approval" ? myApprovals : historyList;
  const filteredItems = currentItems.filter(item => {
    const matchSearch = item.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requestedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nipp.includes(searchQuery);

    if (activeTab === "history" && statusFilter !== "Semua") {
      return matchSearch && item.status.toLowerCase() === statusFilter.toLowerCase();
    }
    return matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* =========================================================================
          VIEW: VIEW ROLE PERMISSION (Screenshot 16.09.04)
         ========================================================================= */}
      {viewMode === "view_permission" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span 
              className="cursor-pointer hover:text-slate-800"
              onClick={() => setViewMode("list")}
            >
              Role Metrics User Internal
            </span>
            <span>&gt;</span>
            <span className="font-bold text-[#016DB2]">View Role Metrics User Internal</span>
          </div>

          <button
            onClick={() => setViewMode("list")}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#016DB2] hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">View Role Access User Internal</h1>
            <p className="text-xs text-slate-500 mt-0.5">Lihat detail akses user internal.</p>
          </div>

          {/* Role Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#016DB2] flex items-center justify-center font-bold">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedRoleForPermission}</h2>
                  <p className="text-xs text-slate-500">PT Pelindo Indonesia | Super Admin</p>
                </div>
              </div>
              <button 
                onClick={() => triggerSuccess("File Guidebook.pdf berhasil diunduh.")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#016DB2] text-[#016DB2] hover:bg-sky-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Guidebook
              </button>
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed">
              <span className="font-bold text-slate-700 block mb-1">Deskripsi</span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
          </div>

          {/* Module Tabs (KMS, TMS, LMS, CMS, IMS) */}
          <div className="flex border-b border-slate-200 gap-8 text-xs font-bold">
            {(["KMS", "TMS", "LMS", "CMS", "IMS"] as const).map(mod => (
              <button
                key={mod}
                onClick={() => setActiveModuleTab(mod)}
                className={`pb-3 cursor-pointer transition-colors ${
                  activeModuleTab === mod ? "text-[#016DB2] border-b-2 border-[#016DB2]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {mod}
              </button>
            ))}
          </div>

          {/* List Akses Menu */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-700">List Akses Menu</div>

            {/* Dashboard Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <div className="font-bold text-slate-800">Dashboard</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  "Lihat Laporan Evaluasi Tahunan",
                  "Lihat Semua Kompetensi",
                  "Lihat Semua KPI"
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Profile Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <div className="font-bold text-slate-800">My Profile</div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  "Unduh CV",
                  "Edit Employee Brief Profile",
                  "Sinkronisasi Identtias Pekerja",
                  "Edit Executive Summary",
                  "Sinkronisasi Data Keluarga",
                  "Edit Data Keluarga",
                  "Edit Riwayat Penyakit",
                  "Edit Rekam Medis"
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW: MAIN REVIEW REQUEST ROLE (Screenshot 16.08.49 & 16.08.57)
         ========================================================================= */}
      {viewMode === "list" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Review Request Role
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Kelola User dan Role dengan terpusat, aman, dan efisien
            </p>
          </div>

          {/* Primary Sub-Tabs: My Approval (5) & History */}
          <div className="flex border-b border-slate-200 gap-8 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("my_approval")}
              className={`pb-3.5 cursor-pointer transition-colors relative flex items-center gap-2 ${
                activeTab === "my_approval" ? "text-[#016DB2] font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>My Approval</span>
              <span className="w-5 h-5 rounded-full bg-[#016DB2] text-white text-[11px] font-bold flex items-center justify-center">
                {myApprovals.length}
              </span>
              {activeTab === "my_approval" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#016DB2]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`pb-3.5 cursor-pointer transition-colors relative ${
                activeTab === "history" ? "text-[#016DB2] font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              History
              {activeTab === "history" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#016DB2]" />
              )}
            </button>
          </div>

          {/* Table Container Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {activeTab === "my_approval" ? "Request Role" : "Request Role History"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeTab === "my_approval" 
                  ? "Anda dapat Request Approval di bawah ini" 
                  : "Anda dapat melihat History Request Role di bawah ini"}
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Cari disini"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                />
              </div>

              {activeTab === "history" && (
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-9 appearance-none focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                  >
                    <option value="Semua">Status: Semua</option>
                    <option value="Approved">Approved</option>
                    <option value="Waiting Approval 2">Waiting Approval 2</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Menampilkan <span className="font-bold text-slate-800">{filteredItems.length} Role.</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">REQUEST BY</th>
                    <th className="p-3.5">ENTITAS</th>
                    <th className="p-3.5">ROLE EXISTING</th>
                    <th className="p-3.5">REQUESTED ROLE</th>
                    <th className="p-3.5">STATUS</th>
                    <th className="p-3.5">APPROVAL PROGRESS</th>
                    <th className="p-3.5">APPROVER</th>
                    <th className="p-3.5 text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredItems.map(item => {
                    let tooltipText = "Menunggu Approval Atasan Langsung";
                    if (item.status === "Approved") tooltipText = "Approval Proggress Selesai";
                    else if (item.status === "Waiting Approval 2") tooltipText = "Menunggu Approval Super Admin";
                    else if (item.status === "Rejected") tooltipText = "Request Approval Ditolak";

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Request By */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#016DB2] text-[11px] font-bold flex items-center justify-center shrink-0">
                              {item.applicantName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                {item.applicantName} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{item.nipp}</span>
                              </div>
                              <div className="text-[11px] text-slate-400">{item.roleTitle}</div>
                              <div className="text-[11px] text-[#016DB2]">{item.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Entitas */}
                        <td className="p-3.5 font-medium text-slate-800">{item.entity}</td>

                        {/* Role Existing */}
                        <td className="p-3.5 font-medium text-slate-700">{item.roleExisting}</td>

                        {/* Requested Role */}
                        <td className="p-3.5 font-bold text-slate-900">{item.requestedRole}</td>

                        {/* Status Badge */}
                        <td className="p-3.5">
                          <span className={`px-3 py-1 rounded-md text-[11px] font-bold border ${
                            item.status === "Approved"
                              ? "border-emerald-500 text-emerald-600 bg-white"
                              : item.status === "Rejected"
                              ? "border-red-500 text-red-600 bg-white"
                              : "border-[#016DB2] text-[#016DB2] bg-white"
                          }`}>
                            {item.status}
                          </span>
                        </td>

                        {/* Approval Progress */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  item.status === "Approved"
                                    ? "w-full bg-[#016DB2]"
                                    : item.approvalProgress === "1/2"
                                    ? "w-1/2 bg-[#016DB2]"
                                    : "w-0 bg-transparent"
                                }`}
                              />
                            </div>
                            <span className="font-bold text-slate-700 text-xs">{item.approvalProgress}</span>

                            {/* Tooltip Hover */}
                            <div className="relative inline-block">
                              <button
                                onMouseEnter={() => setHoveredTooltipId(item.id)}
                                onMouseLeave={() => setHoveredTooltipId(null)}
                                className="text-slate-400 hover:text-slate-600 focus:outline-hidden"
                              >
                                <Info className="w-4 h-4" />
                              </button>

                              {hoveredTooltipId === item.id && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-[11px] font-medium rounded-lg whitespace-nowrap shadow-lg z-40 animate-in fade-in zoom-in-95">
                                  {tooltipText}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Approver */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            {item.approverAvatar ? (
                              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                                {item.approverAvatar}
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                                <UserCheck className="w-3.5 h-3.5" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-slate-900 text-xs">{item.approverName}</div>
                              {item.approverRole && (
                                <div className="text-[10px] text-slate-400">{item.approverRole}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Actions Dropdown */}
                        <td className="p-3.5 text-center relative">
                          <button
                            onClick={() => setActiveActionId(activeActionId === item.id ? null : item.id)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Dropdown Menu (Screenshot 16.09.34) */}
                          {activeActionId === item.id && (
                            <div className="absolute right-4 top-10 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-left animate-in zoom-in-95">
                              {activeTab === "my_approval" && (
                                <button
                                  onClick={() => {
                                    setSelectedReviewItem(item);
                                    setActiveActionId(null);
                                  }}
                                  className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2 cursor-pointer"
                                >
                                  Approve atau Reject
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedRoleForPermission(item.requestedRole);
                                  setViewMode("view_permission");
                                  setActiveActionId(null);
                                }}
                                className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                              >
                                View Role Permission
                              </button>
                              <button
                                onClick={() => {
                                  setLogActivityItem(item);
                                  setActiveActionId(null);
                                }}
                                className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                              >
                                View Log Activity
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <div className="relative">
                  <select
                    value={rowsPerPage}
                    onChange={e => setRowsPerPage(Number(e.target.value))}
                    className="border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 pr-6 appearance-none bg-white font-medium"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>

                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === p ? "bg-[#016DB2] text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                  className="px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: APPROVE ATAU REJECT REQUEST APPROVAL (Screenshot 16.09.17 Left)
         ========================================================================= */}
      {selectedReviewItem && !showConfirmApproveModal && !showConfirmRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Approve atau reject request approval</h3>
              <button 
                onClick={() => setSelectedReviewItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#016DB2] font-black flex items-center justify-center">
                  {selectedReviewItem.applicantName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    {selectedReviewItem.applicantName} &bull; <span className="text-slate-500 font-normal">{selectedReviewItem.nipp}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{selectedReviewItem.roleTitle}</div>
                  <div className="text-[11px] text-[#016DB2]">{selectedReviewItem.email}</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-md text-[11px] font-bold border border-[#016DB2] text-[#016DB2] bg-white">
                Waiting Approval
              </span>
            </div>

            {/* Grid Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Entitas</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedReviewItem.entity}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Role Existing</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedReviewItem.roleExisting}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Requested Role</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedReviewItem.requestedRole}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Approver</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                    H
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-[11px]">Ilham Eka Putra Sriyanto</div>
                    <div className="text-[10px] text-slate-400">Super Admin</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedReviewItem(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => setShowConfirmRejectModal(selectedReviewItem)}
                className="px-5 py-2.5 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => setShowConfirmApproveModal(selectedReviewItem)}
                className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: KONFIRMASI APPROVE & ASSIGN ROLE (Screenshot 16.09.28 Right)
         ========================================================================= */}
      {showConfirmApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setShowConfirmApproveModal(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin untuk Approve Request Approval Ini?
            </p>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-800">Informasi User</div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-[#016DB2] font-bold flex items-center justify-center">
                    {showConfirmApproveModal.applicantName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      {showConfirmApproveModal.applicantName} &bull; <span className="text-slate-500 font-normal">{showConfirmApproveModal.nipp}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{showConfirmApproveModal.roleTitle}</div>
                    <div className="text-[11px] text-[#016DB2]">{showConfirmApproveModal.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="text-slate-400">Nomor Handphone</span>
                    <div className="font-bold text-slate-800 mt-0.5">{showConfirmApproveModal.phone || "+62 81234221234"}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Nomor Telepon</span>
                    <div className="font-bold text-slate-800 mt-0.5">{showConfirmApproveModal.telp || "021-2312312"}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Status Pegawai</span>
                    <div className="font-bold text-slate-800 mt-0.5">{showConfirmApproveModal.statusPegawai || "PKWTT PELINDO"}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">SK Pengangkatan Pekerja</span>
                    <div className="font-bold text-[#016DB2] mt-0.5 flex items-center gap-1 cursor-pointer">
                      <FileText className="w-3 h-3" /> SK Pengangkatan Pekerja
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">SK Posisi Terkahir</span>
                    <div className="font-bold text-[#016DB2] mt-0.5 flex items-center gap-1 cursor-pointer">
                      <FileText className="w-3 h-3" /> SK Posisi Terakhir
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Tanggal Register</span>
                    <div className="font-bold text-slate-800 mt-0.5">{showConfirmApproveModal.registerDate || "26/09/2025 12:00"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Role Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Assign Role<span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={selectedAssignRole}
                  onChange={e => setSelectedAssignRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 appearance-none focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                >
                  <option value="User">User</option>
                  <option value="HO_SuperAdmin">HO_SuperAdmin</option>
                  <option value="TMS_Admin">TMS_Admin</option>
                  <option value="LMS_HO_Admin">LMS_HO_Admin</option>
                  <option value="Admin Modul HO">Admin Modul HO</option>
                  <option value="Admin Entitas">Admin Entitas</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmApproveModal(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={handleApproveFinal}
                className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Ya, Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: KONFIRMASI REJECT (Screenshot 16.09.28 Left)
         ========================================================================= */}
      {showConfirmRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setShowConfirmRejectModal(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Menyetujui permintaan ini dan kirim undangan role baru?
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#016DB2] font-bold flex items-center justify-center">
                  {showConfirmRejectModal.applicantName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{showConfirmRejectModal.applicantName} &bull; {showConfirmRejectModal.nipp}</div>
                  <div className="text-[11px] text-[#016DB2]">{showConfirmRejectModal.email}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold border border-[#016DB2] text-[#016DB2] bg-white">
                Waiting Approval
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Entitas</span>
                <p className="font-bold text-slate-900 mt-0.5">{showConfirmRejectModal.entity}</p>
              </div>
              <div>
                <span className="text-slate-400">Role Existing</span>
                <p className="font-bold text-slate-900 mt-0.5">{showConfirmRejectModal.roleExisting}</p>
              </div>
              <div>
                <span className="text-slate-400">Requested Role</span>
                <p className="font-bold text-slate-900 mt-0.5">{showConfirmRejectModal.requestedRole}</p>
              </div>
              <div>
                <span className="text-slate-400">Approver</span>
                <div className="font-bold text-slate-900 mt-0.5">Ilham Eka Putra Sriyanto</div>
              </div>
            </div>

            {/* Reason Textarea */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-700">Masukan Alasan Reject</label>
              <textarea
                value={rejectReasonText}
                onChange={e => setRejectReasonText(e.target.value)}
                placeholder="Masukan alasan reject (Min. 150 Characters)"
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmRejectModal(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={handleRejectFinal}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Ya, Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: LOG ACTIVITY TIMELINE (Screenshot 16.06.48 & 16.06.55)
         ========================================================================= */}
      {logActivityItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Log Activity</h3>
              <button 
                onClick={() => setLogActivityItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Requester Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3 text-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#016DB2] font-black text-sm flex items-center justify-center shrink-0">
                {logActivityItem.applicantName.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  {logActivityItem.applicantName} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{logActivityItem.nipp}</span>
                </div>
                <div className="text-[11px] text-slate-400">{logActivityItem.roleTitle} &bull; {logActivityItem.entity}</div>
                <div className="text-[11px] text-[#016DB2]">{logActivityItem.email}</div>
              </div>
            </div>

            <div className="text-xs font-bold text-slate-700">Berikut ini adalah Log Request Role</div>

            {/* Timeline */}
            <div className="space-y-4 text-xs relative pl-6 border-l-2 border-slate-200 ml-4 py-1">
              {logActivityItem.status === "Waiting Approval 1" && (
                <>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-blue-100 text-[#016DB2] flex items-center justify-center">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Waiting for Approval by Atasan Langsung</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 12:00</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl mt-1.5 border border-slate-100 font-bold text-slate-800 text-[11px]">
                        {logActivityItem.approverName}
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="absolute -left-[31px] top-2.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{logActivityItem.applicantName} Submitted</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 10:00</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {logActivityItem.status === "Approved" && (
                <>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Approved by Admin Modul HO</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 12:00</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl mt-1.5 border border-slate-100 font-bold text-slate-800 text-[11px]">
                        Ilham Eka Putra Sriyanto
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="absolute -left-[31px] top-2.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Approved by Atasan Langsung</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 12:00</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl mt-1.5 border border-slate-100 font-bold text-slate-800 text-[11px]">
                        Albertus Brian Kama Jaya
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="absolute -left-[31px] top-2.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Submitted by {logActivityItem.applicantName}</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 10:00</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {logActivityItem.status === "Rejected" && (
                <>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Rejected by Atasan Langsung</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 12:00</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl mt-1.5 border border-slate-100 text-[11px] space-y-1">
                        <div className="font-bold text-slate-800">Ilham Eka Putra Sriyanto</div>
                        <div className="text-red-600 font-semibold">Alasan Ditolak :</div>
                        <p className="text-slate-600 leading-relaxed">
                          {logActivityItem.rejectReason || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam erat magna, vestibulum vel aliquam in, molestie vitae sem. Phasellus pellentesque eu risus in luctus. Donec et tortor a enim malesuada sodales."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="absolute -left-[31px] top-2.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{logActivityItem.applicantName} Submitted</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 10:00</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setLogActivityItem(null)}
                className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: SUKSES DIALOG (Screenshot 16.09.34 Left & Center)
         ========================================================================= */}
      {successModalText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs pointer-events-none">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{successModalText}</h3>
          </div>
        </div>
      )}

    </div>
  );
}
