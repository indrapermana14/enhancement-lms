"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Download,
  Check,
  X,
  Info,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
  Plus
} from "lucide-react";

export interface RoleAccessInternalModuleProps {
  onAddAuditLog?: (log: any) => void;
}

interface RequestApprovalItem {
  id: string;
  requestedRole: string;
  status: "APPROVED" | "WAITING APPROVAL 1" | "WAITING APPROVAL 2" | "REJECTED";
  approvalProgress: string; // "2/2", "0/2", "1/2"
  approverName: string;
  approverRole: string;
  approverAvatar?: string;
  dateSubmitted: string;
  dateUpdated: string;
  rejectReason?: string;
}

const INITIAL_REQUEST_APPROVALS: RequestApprovalItem[] = [
  {
    id: "REQ-001",
    requestedRole: "ILCS_AdminModulHO_TMS_PMS_LMS",
    status: "APPROVED",
    approvalProgress: "2/2",
    approverName: "Super Admin, Admin Modul HO",
    approverRole: "Super Admin",
    approverAvatar: "",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "REQ-002",
    requestedRole: "ILCS_AdminModulHO_TMS_PMS_LMS",
    status: "WAITING APPROVAL 1",
    approvalProgress: "0/2",
    approverName: "JUJU JUARSIH",
    approverRole: "Atasan Langsung",
    approverAvatar: "JJ",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "REQ-003",
    requestedRole: "ILCS_AdminModulHO_TMS_PMS_LMS",
    status: "WAITING APPROVAL 1",
    approvalProgress: "0/2",
    approverName: "JUJU JUARSIH",
    approverRole: "Atasan Langsung",
    approverAvatar: "JJ",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "REQ-004",
    requestedRole: "ILCS_AdminModulHO_TMS_PMS_LMS",
    status: "WAITING APPROVAL 1",
    approvalProgress: "0/2",
    approverName: "JUJU JUARSIH",
    approverRole: "Atasan Langsung",
    approverAvatar: "JJ",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "REQ-005",
    requestedRole: "ILCS_AdminModulHO_TMS_PMS_LMS",
    status: "WAITING APPROVAL 1",
    approvalProgress: "0/2",
    approverName: "JUJU JUARSIH",
    approverRole: "Atasan Langsung",
    approverAvatar: "JJ",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00"
  },
  {
    id: "REQ-006",
    requestedRole: "ILCS_AdminModulHO_TMS_PMS_LMS",
    status: "REJECTED",
    approvalProgress: "0/2",
    approverName: "JUJU JUARSIH",
    approverRole: "Atasan Langsung",
    approverAvatar: "JJ",
    dateSubmitted: "15/05/2024 10:00",
    dateUpdated: "15/05/2024 12:00",
    rejectReason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam erat magna, vestibulum vel aliquam in, molestie vitae sem. Phasellus pellentesque eu risus in luctus. Donec et tortor a enim malesuada sodales."
  }
];

interface SelectableMetricRole {
  id: string;
  name: string;
  description: string;
}

const METRIC_ROLES_LIST: SelectableMetricRole[] = [
  { id: "mr-1", name: "Super_Admin", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-2", name: "Admin_Modul_HO_TMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-3", name: "Admin_Modul_HO_KMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-4", name: "Admin_Modul_HO_LMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-5", name: "Admin_Modul_HO_CMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-6", name: "Admin_Modul_HO_IMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-7", name: "ILCS_ADMIN", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-8", name: "ILCS_ADMIN_TMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-9", name: "ILCS_ADMIN_LMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-10", name: "ILCS_ADMIN_KMS", description: "Role ini memberikan akses penuh ke semua Metrics" },
  { id: "mr-11", name: "ILCS_ADMIN_IMS", description: "Role ini memberikan akses penuh ke semua Metrics" }
];

export default function RoleAccessInternalModule({ onAddAuditLog }: RoleAccessInternalModuleProps) {
  // Navigation View: "list" | "request_role" | "view_permission"
  const [currentView, setCurrentView] = useState<"list" | "request_role" | "view_permission">("list");
  
  // Previous view tracker for breadcrumb & back
  const [previousView, setPreviousView] = useState<"list" | "request_role">("list");

  // Requests Data
  const [requests, setRequests] = useState<RequestApprovalItem[]>(INITIAL_REQUEST_APPROVALS);

  // Filters & Search in Main List
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  // Selected Role for Permission Detail View
  const [selectedRoleForPermission, setSelectedRoleForPermission] = useState<string>("Admin_Modul_HO_TMS");
  const [activeModuleTab, setActiveModuleTab] = useState<"KMS" | "TMS" | "LMS" | "CMS" | "IMS">("TMS");

  // Request Metrics Role Page Selection
  const [selectedRoleCheckboxes, setSelectedRoleCheckboxes] = useState<string[]>([]);
  const [searchRoleQuery, setSearchRoleQuery] = useState("");

  // Action Menu Dropdown ID
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  // Tooltip Hover ID
  const [hoveredTooltipId, setHoveredTooltipId] = useState<string | null>(null);

  // Modals
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Sukses Mengirim Request Approval");
  const [logActivityItem, setLogActivityItem] = useState<RequestApprovalItem | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2200);
  };

  const handleToggleSelectRole = (roleName: string) => {
    if (selectedRoleCheckboxes.includes(roleName)) {
      setSelectedRoleCheckboxes(selectedRoleCheckboxes.filter(r => r !== roleName));
    } else {
      setSelectedRoleCheckboxes([...selectedRoleCheckboxes, roleName]);
    }
  };

  const handleSendRequestConfirm = () => {
    setShowConfirmModal(false);

    if (selectedRoleCheckboxes.length > 0) {
      const newItems: RequestApprovalItem[] = selectedRoleCheckboxes.map((roleName, idx) => ({
        id: `REQ-${Date.now()}-${idx}`,
        requestedRole: roleName,
        status: "WAITING APPROVAL 1",
        approvalProgress: "0/2",
        approverName: "JUJU JUARSIH",
        approverRole: "Atasan Langsung",
        approverAvatar: "JJ",
        dateSubmitted: "Hari ini, 12:00",
        dateUpdated: "Hari ini, 12:00"
      }));

      setRequests([...newItems, ...requests]);
      setSelectedRoleCheckboxes([]);
    }

    setCurrentView("list");
    triggerSuccess("Sukses Mengirim Request Approval");

    if (onAddAuditLog) {
      onAddAuditLog({
        waktu: new Date().toISOString().slice(0, 16).replace("T", " "),
        aktor: "HENDRA",
        aksi: "Request Metrics Role",
        target: selectedRoleCheckboxes.join(", "),
        keterangan: "Mengirimkan permohonan request approval role metrics internal"
      });
    }
  };

  // Filtered requests
  const filteredRequests = requests.filter(item => {
    const matchSearch = item.requestedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.approverName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "Semua") return matchSearch;
    return matchSearch && item.status.toLowerCase() === statusFilter.toLowerCase();
  });

  // Filtered selectable roles in Request Role Page
  const filteredMetricRoles = METRIC_ROLES_LIST.filter(r => 
    r.name.toLowerCase().includes(searchRoleQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchRoleQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* =========================================================================
          VIEW 1: VIEW ROLE ACCESS USER INTERNAL (Screenshot 16.06.08 & 16.06.34)
         ========================================================================= */}
      {currentView === "view_permission" && (
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span 
              className="cursor-pointer hover:text-slate-800" 
              onClick={() => setCurrentView("list")}
            >
              Role Metrics User Internal
            </span>
            <span>&gt;</span>
            {previousView === "request_role" && (
              <>
                <span 
                  className="cursor-pointer hover:text-slate-800"
                  onClick={() => setCurrentView("request_role")}
                >
                  Request Metrics Role
                </span>
                <span>&gt;</span>
              </>
            )}
            <span className="font-bold text-[#016DB2]">View Role Metrics User Internal</span>
          </div>

          <button
            onClick={() => setCurrentView(previousView)}
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
                  <p className="text-xs text-slate-500">PT Pelindo Indonesia | Admin Modul HO</p>
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

          {/* List Akses Menu Cards */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-700">List Akses Menu</div>

            {/* Dashboard Access Box */}
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

            {/* My Profile Access Box */}
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
          VIEW 2: REQUEST METRICS ROLE (Screenshot 16.06.01 & 16.06.18)
         ========================================================================= */}
      {currentView === "request_role" && (
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span 
              className="cursor-pointer hover:text-slate-800"
              onClick={() => setCurrentView("list")}
            >
              Role Metrics User Internal
            </span>
            <span>&gt;</span>
            <span className="font-bold text-[#016DB2]">Request Metrics Role</span>
          </div>

          <button
            onClick={() => setCurrentView("list")}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#016DB2] hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Request Metrics Role</h1>
            <p className="text-xs text-slate-500 mt-0.5">Request Metrics Role sesuai kebutuhanmu disini</p>
          </div>

          {/* Requester Card */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Requester</label>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-4 text-xs">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#016DB2] font-black text-lg flex items-center justify-center shrink-0">
                H
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>HENDRA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-slate-500 font-normal">105320</span>
                </div>
                <div className="text-slate-500 flex items-center gap-2">
                  <span>Senior Assistant Officer Perencanaan Proyek</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>PT. Integrasi Logistik Cipta Solusi</span>
                </div>
                <div className="text-[#016DB2] font-medium">hendra@pelindo.co.id</div>
              </div>
            </div>
          </div>

          {/* Select Metrics Role List Section */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700">Select Metrics Role</label>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Cari Metrics Role"
                value={searchRoleQuery}
                onChange={e => setSearchRoleQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs max-h-[460px] overflow-y-auto">
              {filteredMetricRoles.map(role => {
                const isSelected = selectedRoleCheckboxes.includes(role.name);
                return (
                  <div
                    key={role.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <label className="flex items-center gap-3.5 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectRole(role.name)}
                        className="w-4 h-4 rounded border-slate-300 text-[#016DB2] focus:ring-[#016DB2]"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{role.name}</div>
                        <div className="text-[11px] text-slate-400">{role.description}</div>
                      </div>
                    </label>
                    <button
                      onClick={() => {
                        setSelectedRoleForPermission(role.name);
                        setPreviousView("request_role");
                        setCurrentView("view_permission");
                      }}
                      className="p-1.5 text-slate-400 hover:text-[#016DB2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex justify-between items-center pt-3">
            <button
              onClick={() => setCurrentView("list")}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              disabled={selectedRoleCheckboxes.length === 0}
              onClick={() => setShowConfirmModal(true)}
              className="px-7 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: ROLE ACCESS USER INTERNAL MAIN LIST (Screenshot 16.05.23)
         ========================================================================= */}
      {currentView === "list" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Role Access User Internal
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Headquarter untuk mengatur modul pada TMS
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Request Approval</h2>
              <p className="text-xs text-slate-500 mt-0.5">Anda dapat Request Approval dibawah ini</p>
            </div>

            {/* Filter and Action Header */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Cari Request Approval disini"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-9 appearance-none focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                >
                  <option value="Semua">Status: Semua</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="WAITING APPROVAL 1">WAITING APPROVAL 1</option>
                  <option value="WAITING APPROVAL 2">WAITING APPROVAL 2</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <button
                onClick={() => setCurrentView("request_role")}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" /> Request Metrics Role
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Menampilkan <span className="font-bold text-slate-800">1 - {filteredRequests.length}</span> dari <span className="font-bold text-slate-800">53</span> data Role
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">REQUESTED ROLE</th>
                    <th className="p-3.5">STATUS</th>
                    <th className="p-3.5">APPROVAL PROGRESS</th>
                    <th className="p-3.5">APPROVER</th>
                    <th className="p-3.5 text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredRequests.map(item => {
                    // Tooltip text calculation
                    let tooltipText = "Menunggu Approval Atasan Langsung";
                    if (item.status === "APPROVED") tooltipText = "Approval Proggress Selesai";
                    else if (item.status === "WAITING APPROVAL 2") tooltipText = "Menunggu Approval Super Admin";
                    else if (item.status === "REJECTED") tooltipText = "Request Approval Ditolak";

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">
                          {item.requestedRole}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-3 py-1 rounded-md text-[11px] font-bold border ${
                            item.status === "APPROVED"
                              ? "border-emerald-500 text-emerald-600 bg-white"
                              : item.status === "REJECTED"
                              ? "border-red-500 text-red-600 bg-white"
                              : "border-[#016DB2] text-[#016DB2] bg-white"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  item.status === "APPROVED" 
                                    ? "w-full bg-[#016DB2]" 
                                    : item.approvalProgress === "1/2" 
                                    ? "w-1/2 bg-[#016DB2]" 
                                    : "w-0 bg-transparent"
                                }`} 
                              />
                            </div>
                            <span className="font-bold text-slate-700 text-xs">{item.approvalProgress}</span>
                            
                            {/* Interactive Tooltip matching Screenshot 16.06.59 */}
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
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            {item.approverAvatar ? (
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#016DB2] text-[11px] font-bold flex items-center justify-center shrink-0">
                                {item.approverAvatar}
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                                <UserCheck className="w-4 h-4" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-slate-900 text-xs uppercase">{item.approverName}</div>
                              {item.approverRole && (
                                <div className="text-[11px] text-slate-400">{item.approverRole}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-center relative">
                          <button
                            onClick={() => setActiveActionId(activeActionId === item.id ? null : item.id)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 mx-auto cursor-pointer"
                          >
                            <span>Aksi</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          </button>

                          {/* Dropdown Menu (Screenshot 16.06.59) */}
                          {activeActionId === item.id && (
                            <div className="absolute right-4 top-11 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-left animate-in zoom-in-95">
                              <button
                                onClick={() => {
                                  setSelectedRoleForPermission(item.requestedRole);
                                  setPreviousView("list");
                                  setCurrentView("view_permission");
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
            <div className="flex items-center justify-center gap-1.5 pt-4">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {[1, 2, 3, 4, 5].map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    currentPage === p
                      ? "bg-[#016DB2] text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}

              <span className="text-slate-400 px-1">...</span>

              <button
                onClick={() => setCurrentPage(11)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === 11
                    ? "bg-[#016DB2] text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                11
              </button>

              <button 
                onClick={() => setCurrentPage(Math.min(11, currentPage + 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: KONFIRMASI REQUEST APPROVAL (Screenshot 16.06.18)
         ========================================================================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Apakah anda yakin untuk Mengirim Request Approval Ini?
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={handleSendRequestConfirm}
                className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Ya, Kirim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: LOG ACTIVITY (Screenshot 16.06.48 & 16.06.55)
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

            {/* Requester Header Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3 text-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#016DB2] font-black text-sm flex items-center justify-center shrink-0">
                H
              </div>
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  HENDRA <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">105320</span>
                </div>
                <div className="text-[11px] text-slate-400">Senior Assistant Officer Perencanaan Proyek &bull; PT. Integrasi Logistik Cipta Solusi</div>
                <div className="text-[11px] text-[#016DB2]">hendra@pelindo.co.id</div>
              </div>
            </div>

            <div className="text-xs font-bold text-slate-700">Berikut ini adalah Log Request Role</div>

            {/* Dynamic Timeline based on Status */}
            <div className="space-y-4 text-xs relative pl-6 border-l-2 border-slate-200 ml-4 py-1">
              
              {/* VARIATION 1: WAITING APPROVAL 1 */}
              {logActivityItem.status === "WAITING APPROVAL 1" && (
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
                        <span className="font-bold text-slate-900">Hendra Submitted</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 10:00</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* VARIATION 2: WAITING APPROVAL 2 */}
              {logActivityItem.status === "WAITING APPROVAL 2" && (
                <>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-blue-100 text-[#016DB2] flex items-center justify-center">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Waiting for Approval by Admin Modul HO</span>
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
                        <span className="font-bold text-slate-900">Submited By Hendra</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 10:00</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* VARIATION 3: REJECTED (Screenshot 16.06.55 Left) */}
              {logActivityItem.status === "REJECTED" && (
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
                        <span className="font-bold text-slate-900">Hendra Submitted</span>
                        <span className="text-[10px] text-slate-400">15/05/2024 10:00</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* VARIATION 4: APPROVED FULLY (Screenshot 16.06.55 Right) */}
              {logActivityItem.status === "APPROVED" && (
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
                        Ahmad Sophian
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="absolute -left-[31px] top-2.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Submited By Hendra</span>
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
          MODAL 3: SUKSES NOTIFIKASI DIALOG (Screenshot 16.06.26)
         ========================================================================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs pointer-events-none">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{successMessage}</h3>
          </div>
        </div>
      )}

    </div>
  );
}
