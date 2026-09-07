"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Download,
  Plus,
  Check,
  CheckCircle2,
  X,
  AlertTriangle,
  MoreVertical,
  Mail,
  FileText,
  Shield,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  History,
  Eye,
  Info,
  FileSpreadsheet,
  CloudUpload,
  UserCheck,
  Edit2,
  RefreshCw,
  ExternalLink,
  Archive
} from "lucide-react";

export interface UserRoleModuleProps {
  initialViewMode?: "dashboard_user_role" | "role_internal" | "review_request";
  onAddAuditLog?: (log: any) => void;
}

interface UserItem {
  id: string;
  name: string;
  nipp: string;
  roleTitle: string;
  email: string;
  entity: string;
  module: string;
  roleName: string;
  typeRole: string;
  status: "Active" | "Inactive";
  registerDate: string;
  phone?: string;
  statusPegawai?: string;
}

interface RoleMasterItem {
  id: string;
  namaRole: string;
  deskripsiRole: string;
  menu: string;
  tipeRole: string;
}

interface RequestRoleItem {
  id: string;
  name: string;
  nipp: string;
  title: string;
  email: string;
  entity: string;
  roleExisting: string;
  requestedRole: string;
  status: "Waiting Approval 1" | "Waiting Approval 2" | "Approved" | "Rejected";
  approvalProgress: string;
  approver: string;
  date: string;
}

interface UserInvitationItem {
  id: string;
  name: string;
  nipp: string;
  email: string;
  masaAktif: string;
  status: "Terikrim" | "Kadaluarsa" | "Gagal";
}

interface ReviewSignupItem {
  id: string;
  name: string;
  nipp: string;
  email: string;
  phone: string;
  statusPegawai: string;
  skPengangkatan: string;
  skPosisiTerakhir: string;
  registerDate: string;
  statusApproved: "Waiting Approval" | "Approved" | "Rejected";
  statusEmail: "Terkirim" | "Gagal" | "-";
  alasanReject?: string;
  masaAktifSk?: string;
}

interface ArchiveUserItem {
  id: string;
  name: string;
  nipp: string;
  email: string;
  title: string;
  entity: string;
  status: "Archived";
  archiveDate: string;
}

const INITIAL_USERS: UserItem[] = [
  {
    id: "U-1",
    name: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    module: "TMS",
    roleName: "HO_SuperAdmin",
    typeRole: "Super Admin",
    status: "Active",
    registerDate: "26/09/2025 12:00",
    phone: "+62 81234221234",
    statusPegawai: "PKWTT PELINDO"
  },
  {
    id: "U-2",
    name: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Integrasi Logistik Cipta Solusi",
    module: "LMS",
    roleName: "SPT_Admin_LMS",
    typeRole: "Admin Modul HO",
    status: "Active",
    registerDate: "26/09/2025 12:00",
    phone: "+62 81234221234",
    statusPegawai: "PKWTT PELINDO"
  },
  {
    id: "U-3",
    name: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelindo Multi Terminal",
    module: "KMS",
    roleName: "SPMT_Admin_TMS",
    typeRole: "Admin Entitas",
    status: "Active",
    registerDate: "26/09/2025 12:00",
    phone: "+62 81234221234",
    statusPegawai: "PKWTT PELINDO"
  },
  {
    id: "U-4",
    name: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelindo Terminal Petikemas",
    module: "IMS",
    roleName: "SPMT_Admin_IMS",
    typeRole: "Admin Entitas",
    status: "Active",
    registerDate: "26/09/2025 12:00",
    phone: "+62 81234221234",
    statusPegawai: "PKWTT PELINDO"
  },
  {
    id: "U-5",
    name: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelindo Solusi Logistik",
    module: "CMS",
    roleName: "ILCS_Admin_TMS",
    typeRole: "Admin Entitas",
    status: "Active",
    registerDate: "26/09/2025 12:00",
    phone: "+62 81234221234",
    statusPegawai: "PKWTT PELINDO"
  },
  {
    id: "U-6",
    name: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelindo Jasa Maritim",
    module: "USER",
    roleName: "User",
    typeRole: "User",
    status: "Active",
    registerDate: "26/09/2025 12:00",
    phone: "+62 81234221234",
    statusPegawai: "PKWTT PELINDO"
  },
  {
    id: "U-7",
    name: "HENDRA",
    nipp: "105320",
    roleTitle: "Senior Assistant Officer Perencanaan Proyek",
    email: "hendra@pelindo.co.id",
    entity: "PT Pelabuhan Indonesia",
    module: "USER",
    roleName: "User",
    typeRole: "User",
    status: "Active",
    registerDate: "26/09/2025 12:00",
    phone: "+62 81234221234",
    statusPegawai: "PKWTT PELINDO"
  }
];

const INITIAL_ROLE_MASTERS: RoleMasterItem[] = [
  { id: "RM-1", namaRole: "HO_SuperAdmin", deskripsiRole: "Role ini memberikan akses penuh ke semua Menu Portaverse", menu: "Semua", tipeRole: "Super Admin" },
  { id: "RM-2", namaRole: "SPTP_Admin_KMS", deskripsiRole: "Role ini memberikan akses untuk penuh menu KMS", menu: "KMS", tipeRole: "Admin Entitas" },
  { id: "RM-3", namaRole: "SPTP_Admin_LMS", deskripsiRole: "Role ini memberikan akses penuh menu LMS", menu: "LMS", tipeRole: "Admin Entitas" },
  { id: "RM-4", namaRole: "SPMT_Admin_TMS", deskripsiRole: "Role ini memberikan akses penuh menu TMS", menu: "TMS", tipeRole: "Admin Entitas" },
  { id: "RM-5", namaRole: "SPMT_Admin_IMS", deskripsiRole: "Role ini memberikan akses penuh ke IMS", menu: "IMS", tipeRole: "Admin Entitas" },
  { id: "RM-6", namaRole: "ILCS_Admin_TMS", deskripsiRole: "Role ini memberikan akses penuh menu TMS", menu: "TMS", tipeRole: "Admin Modul HO" },
  { id: "RM-7", namaRole: "User", deskripsiRole: "Role ini memberikan akses penuh menu USER", menu: "Semua", tipeRole: "User" }
];

const INITIAL_REQUEST_ROLES: RequestRoleItem[] = [
  { id: "REQ-1", name: "HENDRI AJI", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "TMS_Admin", status: "Waiting Approval 2", approvalProgress: "1/2", approver: "Admin Modul HO TMS", date: "26/09/2025 12:00" },
  { id: "REQ-2", name: "HENDRI AJI", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "TMS_Admin", status: "Waiting Approval 2", approvalProgress: "1/2", approver: "Admin Modul HO TMS", date: "26/09/2025 12:00" },
  { id: "REQ-3", name: "HENDRI AJI", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "TMS_Admin", status: "Waiting Approval 2", approvalProgress: "1/2", approver: "Admin Modul HO TMS", date: "26/09/2025 12:00" },
  { id: "REQ-4", name: "HENDRI AJI", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "TMS_Admin", status: "Waiting Approval 2", approvalProgress: "1/2", approver: "Admin Modul HO TMS", date: "26/09/2025 12:00" },
  { id: "REQ-5", name: "HENDRI AJI", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "TMS_Admin", status: "Waiting Approval 2", approvalProgress: "1/2", approver: "Admin Modul HO TMS", date: "26/09/2025 12:00" }
];

const INITIAL_LOG_REQUEST_ROLES: RequestRoleItem[] = [
  { id: "LOG-1", name: "HENDRA", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Pelabuhan Indonesia", roleExisting: "User", requestedRole: "LMS_HO_Admin", status: "Approved", approvalProgress: "2/2", approver: "Ilham Eka Putra Sriyanto", date: "26/09/2025 12:00" },
  { id: "LOG-2", name: "HENDRA", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Pelabuhan Indonesia", roleExisting: "User", requestedRole: "LMS_HO_Admin", status: "Waiting Approval 1", approvalProgress: "0/2", approver: "Atasan Langsung", date: "26/09/2025 12:00" },
  { id: "LOG-3", name: "HENDRA", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Pelabuhan Indonesia", roleExisting: "User", requestedRole: "LMS_HO_Admin", status: "Waiting Approval 1", approvalProgress: "0/2", approver: "Atasan Langsung", date: "26/09/2025 12:00" },
  { id: "LOG-4", name: "HENDRA", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Pelabuhan Indonesia", roleExisting: "User", requestedRole: "TMS_HO_Admin", status: "Approved", approvalProgress: "2/2", approver: "Ilham Eka Putra Sriyanto", date: "26/09/2025 12:00" },
  { id: "LOG-5", name: "HENDRA", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "KMS_HO_Admin", status: "Rejected", approvalProgress: "0/2", approver: "Ilham Eka Putra Sriyanto", date: "26/09/2025 12:00" },
  { id: "LOG-6", name: "HENDRA", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "KMS_HO_Admin", status: "Rejected", approvalProgress: "0/2", approver: "Ilham Eka Putra Sriyanto", date: "26/09/2025 12:00" },
  { id: "LOG-7", name: "HENDRA", nipp: "105320", title: "Senior Assistant Officer Perencanaan Proyek", email: "hendra@pelindo.co.id", entity: "PT Integrasi Logistik Cipta Solusi", roleExisting: "User", requestedRole: "KMS_HO_Admin", status: "Rejected", approvalProgress: "0/2", approver: "Ilham Eka Putra Sriyanto", date: "26/09/2025 12:00" }
];

const INITIAL_INVITATIONS: UserInvitationItem[] = [
  { id: "INV-1", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", masaAktif: "26/09/2025 12:00 - 27/09/2025 12:00", status: "Gagal" },
  { id: "INV-2", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", masaAktif: "26/09/2025 12:00 - 27/09/2025 12:00", status: "Kadaluarsa" },
  { id: "INV-3", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", masaAktif: "26/09/2025 12:00 - 27/09/2025 12:00", status: "Terikrim" },
  { id: "INV-4", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", masaAktif: "26/09/2025 12:00 - 27/09/2025 12:00", status: "Terikrim" },
  { id: "INV-5", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", masaAktif: "26/09/2025 12:00 - 27/09/2025 12:00", status: "Terikrim" },
  { id: "INV-6", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", masaAktif: "26/09/2025 12:00 - 27/09/2025 12:00", status: "Terikrim" },
  { id: "INV-7", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", masaAktif: "26/09/2025 12:00 - 27/09/2025 12:00", status: "Terikrim" }
];

const INITIAL_SIGNUPS: ReviewSignupItem[] = [
  { id: "SGN-1", name: "HENDRA LUKMAN SANTOSO", nipp: "105320", email: "hendra@pelindo.co.id", phone: "+62 81234221234", statusPegawai: "PKWTT PELINDO", skPengangkatan: "SK Pengangkatan Pekerja", skPosisiTerakhir: "SK Posisi Terkahir", registerDate: "26/09/2025 12:00", statusApproved: "Waiting Approval", statusEmail: "-" },
  { id: "SGN-2", name: "HENDRA LUKMAN SANTOSO", nipp: "105320", email: "hendra@pelindo.co.id", phone: "+62 81234221234", statusPegawai: "PKWTT PELINDO", skPengangkatan: "SK Pengangkatan Pekerja", skPosisiTerakhir: "SK Posisi Terkahir", registerDate: "26/09/2025 12:00", statusApproved: "Rejected", statusEmail: "-", alasanReject: "Dokumen SK Pengangkatan tidak terbaca jelas dan masa berlaku telah terlewat batas pengajuan." },
  { id: "SGN-3", name: "HENDRA LUKMAN SANTOSO", nipp: "105320", email: "hendra@pelindo.co.id", phone: "+62 81234221234", statusPegawai: "PKWTT PELINDO", skPengangkatan: "SK Pengangkatan Pekerja", skPosisiTerakhir: "SK Posisi Terkahir", registerDate: "26/09/2025 12:00", statusApproved: "Approved", statusEmail: "Terkirim" },
  { id: "SGN-4", name: "HENDRA LUKMAN SANTOSO", nipp: "105320", email: "hendra@pelindo.co.id", phone: "+62 81234221234", statusPegawai: "PKWTT PELINDO", skPengangkatan: "SK Pengangkatan Pekerja", skPosisiTerakhir: "SK Posisi Terkahir", registerDate: "26/09/2025 12:00", statusApproved: "Approved", statusEmail: "Gagal" },
  { id: "SGN-5", name: "HENDRA LUKMAN SANTOSO", nipp: "105320", email: "hendra@pelindo.co.id", phone: "+62 81234221234", statusPegawai: "PKWTT PELINDO", skPengangkatan: "SK Pengangkatan Pekerja", skPosisiTerakhir: "SK Posisi Terkahir", registerDate: "26/09/2025 12:00", statusApproved: "Approved", statusEmail: "Gagal" },
  { id: "SGN-6", name: "HENDRA LUKMAN SANTOSO", nipp: "105320", email: "hendra@pelindo.co.id", phone: "+62 81234221234", statusPegawai: "PKWTT PELINDO", skPengangkatan: "SK Pengangkatan Pekerja", skPosisiTerakhir: "SK Posisi Terkahir", registerDate: "26/09/2025 12:00", statusApproved: "Approved", statusEmail: "Terkirim" },
  { id: "SGN-7", name: "HENDRA LUKMAN SANTOSO", nipp: "105320", email: "hendra@pelindo.co.id", phone: "+62 81234221234", statusPegawai: "PKWTT PELINDO", skPengangkatan: "SK Pengangkatan Pekerja", skPosisiTerakhir: "SK Posisi Terkahir", registerDate: "26/09/2025 12:00", statusApproved: "Approved", statusEmail: "Terkirim" }
];

const INITIAL_ARCHIVE_USERS: ArchiveUserItem[] = [
  { id: "ARC-1", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", title: "Senior Assistant Officer Perencanaan Proyek", entity: "PT Integrasi Logistik Cipta Solusi", status: "Archived", archiveDate: "26/09/2025 12:00" },
  { id: "ARC-2", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", title: "Senior Assistant Officer Perencanaan Proyek", entity: "PT Integrasi Logistik Cipta Solusi", status: "Archived", archiveDate: "26/09/2025 12:00" },
  { id: "ARC-3", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", title: "Senior Assistant Officer Perencanaan Proyek", entity: "PT Pelabuhan Indonesia", status: "Archived", archiveDate: "26/09/2025 12:00" },
  { id: "ARC-4", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", title: "Senior Assistant Officer Perencanaan Proyek", entity: "PT Pelabuhan Indonesia", status: "Archived", archiveDate: "26/09/2025 12:00" },
  { id: "ARC-5", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", title: "Senior Assistant Officer Perencanaan Proyek", entity: "PT Integrasi Logistik Cipta Solusi", status: "Archived", archiveDate: "26/09/2025 12:00" },
  { id: "ARC-6", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", title: "Senior Assistant Officer Perencanaan Proyek", entity: "PT Integrasi Logistik Cipta Solusi", status: "Archived", archiveDate: "26/09/2025 12:00" },
  { id: "ARC-7", name: "HENDRA", nipp: "105320", email: "hendra@pelindo.co.id", title: "Senior Assistant Officer Perencanaan Proyek", entity: "PT Integrasi Logistik Cipta Solusi", status: "Archived", archiveDate: "26/09/2025 12:00" }
];

export default function UserRoleManagementModule({ initialViewMode = "dashboard_user_role", onAddAuditLog }: UserRoleModuleProps) {
  // Main Top-level Tabs
  const [activeMainTab, setActiveMainTab] = useState<"dashboard" | "role_mgmt" | "user_mgmt">(() => {
    if (initialViewMode === "role_internal" || initialViewMode === "review_request") return "role_mgmt";
    return "dashboard";
  });

  // Sub-tabs under Role Management
  const [roleSubTab, setRoleSubTab] = useState<"master_role" | "review_request_role" | "log_request_role">(() => {
    if (initialViewMode === "review_request") return "review_request_role";
    return "master_role";
  });

  // Sub-tabs under User Management
  const [userSubTab, setUserSubTab] = useState<"invitation_list" | "review_signup" | "user_list" | "archive">("invitation_list");

  // Page View Modes (Detail Profile, Tambah Role, View Role Detail)
  const [pageView, setPageView] = useState<"list" | "tambah_role" | "view_role_detail" | "detail_profile">("list");
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<RoleMasterItem | null>(null);
  const [selectedUserForProfile, setSelectedUserForProfile] = useState<UserItem | null>(null);

  // Lists State
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [roleMasters, setRoleMasters] = useState<RoleMasterItem[]>(INITIAL_ROLE_MASTERS);
  const [requestRoles, setRequestRoles] = useState<RequestRoleItem[]>(INITIAL_REQUEST_ROLES);
  const [logRequestRoles, setLogRequestRoles] = useState<RequestRoleItem[]>(INITIAL_LOG_REQUEST_ROLES);
  const [invitations, setInvitations] = useState<UserInvitationItem[]>(INITIAL_INVITATIONS);
  const [signups, setSignups] = useState<ReviewSignupItem[]>(INITIAL_SIGNUPS);
  const [archiveUsers, setArchiveUsers] = useState<ArchiveUserItem[]>(INITIAL_ARCHIVE_USERS);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEntity, setFilterEntity] = useState("Semua");
  const [filterTypeRole, setFilterTypeRole] = useState("Semua");
  const [filterMenu, setFilterMenu] = useState("Semua");
  const [adminTypeFilter, setAdminTypeFilter] = useState("Semua");

  // Open Actions Menu Popover ID
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Modals state
  const [showDownloadReportModal, setShowDownloadReportModal] = useState(false);
  const [selectedReportRoleType, setSelectedReportRoleType] = useState("Super Admin");

  const [viewDetailModalUser, setViewDetailModalUser] = useState<any | null>(null);
  const [logActivityModalUser, setLogActivityModalUser] = useState<any | null>(null);

  // Approve / Reject Request Modal
  const [approvalModalItem, setApprovalModalItem] = useState<RequestRoleItem | null>(null);
  const [confirmApproveModalItem, setConfirmApproveModalItem] = useState<RequestRoleItem | null>(null);
  const [confirmRejectModalItem, setConfirmRejectModalItem] = useState<RequestRoleItem | null>(null);
  const [assignedRoleValue, setAssignedRoleValue] = useState("HO_SuperAdmin");
  const [rejectReasonText, setRejectReasonText] = useState("");

  // Review Signup User Modal
  const [reviewSignupModalItem, setReviewSignupModalItem] = useState<ReviewSignupItem | null>(null);
  const [confirmSignupApproveItem, setConfirmSignupApproveItem] = useState<ReviewSignupItem | null>(null);
  const [confirmSignupRejectItem, setConfirmSignupRejectItem] = useState<ReviewSignupItem | null>(null);
  const [warningPasswordAlreadySet, setWarningPasswordAlreadySet] = useState(false);
  const [confirmResendEmailItem, setConfirmResendEmailItem] = useState<ReviewSignupItem | null>(null);

  // User List: Assign Role Modal & Archive Confirmation Modal
  const [assignRoleModalUser, setAssignRoleModalUser] = useState<UserItem | null>(null);
  const [confirmAssignRoleUser, setConfirmAssignRoleUser] = useState<{ user: UserItem; newRole: string } | null>(null);
  const [confirmArchiveUser, setConfirmArchiveUser] = useState<UserItem | null>(null);
  const [confirmUnarchiveUser, setConfirmUnarchiveUser] = useState<ArchiveUserItem | null>(null);

  // Send Invitation & Bulk Invitation
  const [showSendInvitationModal, setShowSendInvitationModal] = useState(false);
  const [confirmSendInvitationData, setConfirmSendInvitationData] = useState<{ nipp: string; name: string; email: string } | null>(null);
  const [invitationForm, setInvitationForm] = useState({ nipp: "", name: "", email: "" });
  
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkStep, setBulkStep] = useState<1 | 2>(1);
  const [bulkActiveCategory, setBulkActiveCategory] = useState<number>(1);
  const [confirmBulkSubmit, setConfirmBulkSubmit] = useState(false);

  // Success Modal State
  const [successModal, setSuccessModal] = useState<{ title: string; subtitle?: string } | null>(null);

  // Profile Sub-tab
  const [profileTab, setProfileTab] = useState("Data Personal");

  // Tambah Role Form Matrix State
  const [tambahRoleForm, setTambahRoleForm] = useState({
    tipeRole: "Super Admin",
    entityPackage: "PT Pelabuhan Indonesia",
    guidebookFile: "Guidebook.pdf",
    deskripsi: "Role ini memberikan akses penuh ke semua Metrics",
    selectedMenus: ["KMS", "TMS", "LMS", "IMS", "CMS"],
    activeMenuDetail: "TMS",
    selectedSubmenus: ["My Profile", "Organization Management", "Development Plan", "Role Management", "Headquarter", "Master Dictionary", "Master Pegawai"],
    activeSubmenuDetail: "Organization Management",
    selectedPermissions: [
      "Buat Master Posisi",
      "Unggah Master Posisi",
      "Unduh Master Posisi",
      "Buat Master Organisasi",
      "Unggah SK Direksi",
      "Lihat Versi SK Direksi",
      "Unggah Master Direksi",
      "Unduh Master Organisasi"
    ]
  });
  const [confirmSaveRoleModal, setConfirmSaveRoleModal] = useState(false);

  // View Role Detail Sub-tabs
  const [viewRoleModuleTab, setViewRoleModuleTab] = useState("TMS");

  const triggerSuccess = (title: string, subtitle?: string) => {
    setSuccessModal({ title, subtitle });
    setTimeout(() => {
      setSuccessModal(null);
    }, 2500);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "Active" ? "Inactive" : "Active";
        triggerSuccess(`Status User diubah menjadi ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* =========================================================================
          PAGE VIEW: DETAIL PROFILE (Screenshot 13.52.09)
         ========================================================================= */}
      {pageView === "detail_profile" && selectedUserForProfile && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="cursor-pointer hover:text-slate-800" onClick={() => setPageView("list")}>Detail Pekerja</span>
            <span>&gt;</span>
            <span className="font-bold text-[#016DB2]">Detail Profile</span>
          </div>

          <button
            onClick={() => setPageView("list")}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#016DB2] hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Detail Profile</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Berikut adalah data lengkap mulai data personal, riwayat, hingga prestasi yang dimiliki pekerja.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-[#016DB2] flex items-center justify-center font-black text-xl">
                  {selectedUserForProfile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedUserForProfile.name}</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    104926 &bull; <span className="text-[#016DB2] font-semibold">{selectedUserForProfile.email.toUpperCase()}</span> &bull; -
                  </p>
                </div>
              </div>
              <button 
                onClick={() => triggerSuccess("Unduh CV Berhasil", "File CV.pdf sedang diunduh...")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#016DB2] hover:bg-[#00558c] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" /> Unduh CV
              </button>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <div className="text-slate-400 font-medium">Posisi Aktif:</div>
                  <div className="text-[#016DB2] font-bold mt-0.5">Manager Pengelolaan Operasi Banjarmasin SPTP</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Organisasi Aktif:</div>
                  <div className="text-[#016DB2] font-bold mt-0.5">Dinas Pengelolaan Operasi Banjarmasin SPTP</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Perusahaan Aktif:</div>
                  <div className="text-[#016DB2] font-bold mt-0.5">Terminal Petikemas Banjarmasin SPTP</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-slate-400 font-medium">Atasan Definitif:</div>
                  <div className="text-[#016DB2] font-bold mt-0.5">Manager Pengelolaan Operasi Banjarmasin SPTP</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Posisi Atasan Definitif:</div>
                  <div className="text-[#016DB2] font-bold mt-0.5">Dinas Pengelolaan Operasi Banjarmasin SPTP</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Atasan Job Assignment:</div>
                  <div className="text-slate-700 font-bold mt-0.5">-</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-slate-400 font-medium">Posisi Atasan Job Assignment:</div>
                  <Edit2 className="w-3.5 h-3.5 text-[#016DB2] cursor-pointer" />
                </div>
                <div className="text-slate-700 font-bold">-</div>

                <div className="pt-2">
                  <div className="text-slate-400 font-medium mb-2">Social Media:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5"><span className="text-slate-400">📷</span> -</div>
                    <div className="flex items-center gap-1.5"><span className="text-slate-400">👤</span> -</div>
                    <div className="flex items-center gap-1.5"><span className="text-blue-600 font-bold">in</span> -</div>
                    <div className="flex items-center gap-1.5"><span className="text-blue-500 font-semibold">ABDIS SHAUMI R.</span></div>
                    <div className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">💬</span> -</div>
                    <div className="flex items-center gap-1.5"><span className="text-sky-400 font-bold">🐦</span> -</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs space-y-1 text-xs font-semibold">
              {[
                "Data Personal",
                "Riwayat Pendidikan & Jabatan",
                "Riwayat Pelatihan",
                "Riwayat Penugasan",
                "Klasifikasi Pekerja",
                "Riwayat Cuti & Indisipliner"
              ].map(tab => (
                <button
                  key={tab}
                  onClick={() => setProfileTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                    profileTab === tab ? "bg-sky-50 text-[#016DB2] font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Identitas Pekerja
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">NIK</span>
                  <span className="font-bold text-slate-900">: 6371043105860004</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">NPWP</span>
                  <span className="font-bold text-slate-900">: 797712593732000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Tempat Lahir</span>
                  <span className="font-bold text-slate-900">: Banjarmasin</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Tanggal Lahir</span>
                  <span className="font-bold text-slate-900">: 1986-05-31</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Tanggal Mulai Bekerja</span>
                  <span className="font-bold text-slate-900">: -</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Tanggal Diangkat Pegawai</span>
                  <span className="font-bold text-slate-900">: -</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Status Pekerja</span>
                  <span className="font-bold text-slate-900">: Alih Tugas</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Kelas Jabatan Individu</span>
                  <span className="font-bold text-slate-900">: 17</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Jenis Kelamin</span>
                  <span className="font-bold text-slate-900">: Laki-Laki</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">BPJS Ketenagakerjaan</span>
                  <span className="font-bold text-slate-900">: 08009604383</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW: TAMBAH ROLE (Screenshot 13.44.25)
         ========================================================================= */}
      {pageView === "tambah_role" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="cursor-pointer hover:text-slate-800" onClick={() => setPageView("list")}>Role Metrics User Internal</span>
            <span>&gt;</span>
            <span className="font-bold text-[#016DB2]">Tambah Role Metrics User Internal</span>
          </div>

          <button
            onClick={() => setPageView("list")}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#016DB2] hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tambah Role Access User Internal</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Atur dan buat role baru untuk menentukan hak akses user internal sesuai kebutuhan.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs">
            <div className="space-y-1.5 max-w-md">
              <label className="font-bold text-slate-700">Tipe Role<span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={tambahRoleForm.tipeRole}
                  onChange={e => setTambahRoleForm({ ...tambahRoleForm, tipeRole: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium appearance-none focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin Modul HO">Admin Modul HO</option>
                  <option value="Admin Entitas">Admin Entitas</option>
                  <option value="User">User</option>
                  <option value="SME">SME</option>
                  <option value="SME Trainer">SME Trainer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Subcon">Subcon</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* 3-Column Permission Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Column 1: Menu */}
              <div className="flex flex-col">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700">
                  <span>Menu</span>
                  <label className="flex items-center gap-1.5 text-[11px] cursor-pointer text-slate-500 hover:text-slate-800">
                    Select All
                    <input 
                      type="checkbox" 
                      checked={tambahRoleForm.selectedMenus.length === 5}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTambahRoleForm({ ...tambahRoleForm, selectedMenus: ["KMS", "TMS", "LMS", "IMS", "CMS"] });
                        } else {
                          setTambahRoleForm({ ...tambahRoleForm, selectedMenus: [] });
                        }
                      }}
                      className="rounded text-[#016DB2]"
                    />
                  </label>
                </div>
                <div className="p-2 space-y-1">
                  {[
                    { id: "KMS", label: "KMS (Knowledge Management System)" },
                    { id: "TMS", label: "TMS (Talent Management System)" },
                    { id: "LMS", label: "LMS (Learning Management System)" },
                    { id: "IMS", label: "IMS (Innovation Management System)" },
                    { id: "CMS", label: "CMS (Culture Management System)" }
                  ].map(item => {
                    const isSelected = tambahRoleForm.selectedMenus.includes(item.id);
                    const isActive = tambahRoleForm.activeMenuDetail === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setTambahRoleForm({ ...tambahRoleForm, activeMenuDetail: item.id })}
                        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                          isActive ? "bg-sky-50 text-[#016DB2] font-bold" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              if (isSelected) {
                                setTambahRoleForm({
                                  ...tambahRoleForm,
                                  selectedMenus: tambahRoleForm.selectedMenus.filter(m => m !== item.id)
                                });
                              } else {
                                setTambahRoleForm({
                                  ...tambahRoleForm,
                                  selectedMenus: [...tambahRoleForm.selectedMenus, item.id]
                                });
                              }
                            }}
                            className="rounded text-[#016DB2]"
                          />
                          <span>{item.label}</span>
                        </label>
                        {isActive && <ArrowRight className="w-3.5 h-3.5 text-[#016DB2]" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Submenu */}
              <div className="flex flex-col">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700">
                  <span>Submenu</span>
                  <label className="flex items-center gap-1.5 text-[11px] cursor-pointer text-slate-500 hover:text-slate-800">
                    Select All
                    <input 
                      type="checkbox" 
                      checked={tambahRoleForm.selectedSubmenus.length >= 7}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTambahRoleForm({ ...tambahRoleForm, selectedSubmenus: ["My Profile", "Organization Management", "Development Plan", "Role Management", "Headquarter", "Master Dictionary", "Master Pegawai"] });
                        } else {
                          setTambahRoleForm({ ...tambahRoleForm, selectedSubmenus: [] });
                        }
                      }}
                      className="rounded text-[#016DB2]"
                    />
                  </label>
                </div>
                <div className="p-2 space-y-1">
                  {[
                    "My Profile",
                    "Organization Management",
                    "Development Plan",
                    "Role Management",
                    "Headquarter",
                    "Master Dictionary",
                    "Master Pegawai"
                  ].map(sub => {
                    const isSelected = tambahRoleForm.selectedSubmenus.includes(sub);
                    const isActive = tambahRoleForm.activeSubmenuDetail === sub;
                    return (
                      <div
                        key={sub}
                        onClick={() => setTambahRoleForm({ ...tambahRoleForm, activeSubmenuDetail: sub })}
                        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                          isActive ? "bg-sky-50 text-[#016DB2] font-bold" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              if (isSelected) {
                                setTambahRoleForm({
                                  ...tambahRoleForm,
                                  selectedSubmenus: tambahRoleForm.selectedSubmenus.filter(s => s !== sub)
                                });
                              } else {
                                setTambahRoleForm({
                                  ...tambahRoleForm,
                                  selectedSubmenus: [...tambahRoleForm.selectedSubmenus, sub]
                                });
                              }
                            }}
                            className="rounded text-[#016DB2]"
                          />
                          <span>{sub}</span>
                        </label>
                        {isActive && <ArrowRight className="w-3.5 h-3.5 text-[#016DB2]" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Permission */}
              <div className="flex flex-col">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700">
                  <span>Permission</span>
                  <label className="flex items-center gap-1.5 text-[11px] cursor-pointer text-slate-500 hover:text-slate-800">
                    Select All
                    <input 
                      type="checkbox" 
                      checked={tambahRoleForm.selectedPermissions.length >= 8}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTambahRoleForm({ 
                            ...tambahRoleForm, 
                            selectedPermissions: [
                              "Buat Master Posisi",
                              "Unggah Master Posisi",
                              "Unduh Master Posisi",
                              "Buat Master Organisasi",
                              "Unggah SK Direksi",
                              "Lihat Versi SK Direksi",
                              "Unggah Master Direksi",
                              "Unduh Master Organisasi"
                            ] 
                          });
                        } else {
                          setTambahRoleForm({ ...tambahRoleForm, selectedPermissions: [] });
                        }
                      }}
                      className="rounded text-[#016DB2]"
                    />
                  </label>
                </div>
                <div className="p-2 space-y-1">
                  {[
                    "Buat Master Posisi",
                    "Unggah Master Posisi",
                    "Unduh Master Posisi",
                    "Buat Master Organisasi",
                    "Unggah SK Direksi",
                    "Lihat Versi SK Direksi",
                    "Unggah Master Direksi",
                    "Unduh Master Organisasi"
                  ].map(perm => {
                    const isChecked = tambahRoleForm.selectedPermissions.includes(perm);
                    return (
                      <label key={perm} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (isChecked) {
                              setTambahRoleForm({
                                ...tambahRoleForm,
                                selectedPermissions: tambahRoleForm.selectedPermissions.filter(p => p !== perm)
                              });
                            } else {
                              setTambahRoleForm({
                                ...tambahRoleForm,
                                selectedPermissions: [...tambahRoleForm.selectedPermissions, perm]
                              });
                            }
                          }}
                          className="rounded text-[#016DB2]"
                        />
                        <span>{perm}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Package Entitas<span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    value={tambahRoleForm.entityPackage}
                    onChange={e => setTambahRoleForm({ ...tambahRoleForm, entityPackage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium appearance-none focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                  >
                    <option value="PT Pelabuhan Indonesia">PT Pelabuhan Indonesia</option>
                    <option value="PT Pelindo Multi Terminal">PT Pelindo Multi Terminal</option>
                    <option value="PT Pelindo Terminal Petikemas">PT Pelindo Terminal Petikemas</option>
                    <option value="PT Pelindo Jasa Maritim">PT Pelindo Jasa Maritim</option>
                    <option value="PT Pelindo Solusi Logistik">PT Pelindo Solusi Logistik</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Upload Guidebook</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={tambahRoleForm.guidebookFile}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => triggerSuccess("Upload Guidebook", "File Guidebook berhasil diunggah")}
                    className="px-5 py-2.5 bg-[#016DB2] hover:bg-[#00558c] text-white rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="font-bold text-slate-700">Masukan Dekskripsi Role<span className="text-red-500">*</span></label>
              <textarea
                value={tambahRoleForm.deskripsi}
                onChange={e => setTambahRoleForm({ ...tambahRoleForm, deskripsi: e.target.value })}
                maxLength={150}
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>*Maximum Input 150 Character</span>
                <span>{tambahRoleForm.deskripsi.length}/150</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPageView("list")}
                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => setConfirmSaveRoleModal(true)}
                className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white font-bold cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW: VIEW ROLE DETAIL (Screenshot 13.45.36)
         ========================================================================= */}
      {pageView === "view_role_detail" && selectedRoleForDetail && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="cursor-pointer hover:text-slate-800" onClick={() => setPageView("list")}>Role Metrics User Internal</span>
            <span>&gt;</span>
            <span className="font-bold text-[#016DB2]">View Role Metrics User Internal</span>
          </div>

          <button
            onClick={() => setPageView("list")}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#016DB2] hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">View Role Access User Internal</h1>
            <p className="text-xs text-slate-500 mt-0.5">Lihat detail akses user internal.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#016DB2] flex items-center justify-center font-bold">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedRoleForDetail.namaRole}</h2>
                  <p className="text-xs text-slate-500">PT Pelindo Indonesia | {selectedRoleForDetail.tipeRole}</p>
                </div>
              </div>
              <button 
                onClick={() => triggerSuccess("Download Guidebook", "Mengunduh file Guidebook.pdf...")}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#016DB2] text-[#016DB2] hover:bg-sky-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Guidebook
              </button>
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed">
              <span className="font-bold text-slate-700">Deskripsi:</span><br />
              {selectedRoleForDetail.deskripsiRole || "Role ini memberikan akses pengelolaan modul dan pengguna secara menyeluruh di lingkungan Pelindo."}
            </div>
          </div>

          <div className="flex border-b border-slate-200 gap-8 text-xs font-bold">
            {["KMS", "TMS", "LMS", "CMS", "IMS"].map(mod => (
              <button
                key={mod}
                onClick={() => setViewRoleModuleTab(mod)}
                className={`pb-3 cursor-pointer transition-colors ${
                  viewRoleModuleTab === mod ? "text-[#016DB2] border-b-2 border-[#016DB2]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {mod}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-700">List Akses Menu</div>

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

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <div className="font-bold text-slate-800">My Profile</div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  "Unduh CV",
                  "Edit Employee Brief Profile",
                  "Sinkronisasi Identitas Pekerja",
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
          PAGE VIEW: MAIN LISTS
         ========================================================================= */}
      {pageView === "list" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              User &amp; Role Management
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Kelola User dan Role dengan terpusat, aman, dan efisien
            </p>
          </div>

          {/* 3 Primary Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-8 text-sm font-semibold">
            <button
              onClick={() => setActiveMainTab("dashboard")}
              className={`pb-3.5 cursor-pointer transition-colors relative ${
                activeMainTab === "dashboard" ? "text-[#016DB2] font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Dashboard User &amp; Role
              {activeMainTab === "dashboard" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#016DB2]" />
              )}
            </button>

            <button
              onClick={() => setActiveMainTab("role_mgmt")}
              className={`pb-3.5 cursor-pointer transition-colors relative flex items-center gap-2 ${
                activeMainTab === "role_mgmt" ? "text-[#016DB2] font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Role Management</span>
              <span className="w-5 h-5 rounded-full bg-[#016DB2] text-white text-[11px] font-bold flex items-center justify-center">
                5
              </span>
              {activeMainTab === "role_mgmt" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#016DB2]" />
              )}
            </button>

            <button
              onClick={() => setActiveMainTab("user_mgmt")}
              className={`pb-3.5 cursor-pointer transition-colors relative flex items-center gap-2 ${
                activeMainTab === "user_mgmt" ? "text-[#016DB2] font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>User Management</span>
              <span className="w-5 h-5 rounded-full bg-[#016DB2] text-white text-[11px] font-bold flex items-center justify-center">
                5
              </span>
              {activeMainTab === "user_mgmt" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#016DB2]" />
              )}
            </button>
          </div>

          {/* TAB 1: DASHBOARD USER & ROLE */}
          {activeMainTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                  <select
                    value={filterEntity}
                    onChange={e => setFilterEntity(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 pr-9 appearance-none shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                  >
                    <option value="Semua">Entitas: Semua</option>
                    <option value="PT Pelabuhan Indonesia">PT Pelabuhan Indonesia</option>
                    <option value="PT Pelindo Multi Terminal">PT Pelindo Multi Terminal</option>
                    <option value="PT Pelindo Terminal Petikemas">PT Pelindo Terminal Petikemas</option>
                    <option value="PT Pelindo Jasa Maritim">PT Pelindo Jasa Maritim</option>
                    <option value="PT Pelindo Solusi Logistik">PT Pelindo Solusi Logistik</option>
                    <option value="PT Integrasi Logistik Cipta Solusi">PT Integrasi Logistik Cipta Solusi</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>

                <button
                  onClick={() => setShowDownloadReportModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Report
                </button>
              </div>

              {/* 3 Donut Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="font-bold text-sm text-slate-800">Super Admin</div>
                  <div className="flex items-center justify-center py-2">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#016DB2" strokeWidth="12" strokeDasharray="238.76" strokeDashoffset="0" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-slate-900">50</span>
                        <span className="text-[10px] text-slate-400 font-semibold">Total</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#016DB2]" />
                        <span className="text-slate-600 font-medium">PT Pelabuhan Indonesia (Persero)</span>
                      </div>
                      <span className="font-bold text-slate-900">50</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-slate-800">Admin</div>
                    <div className="relative">
                      <select 
                        value={adminTypeFilter}
                        onChange={e => setAdminTypeFilter(e.target.value)}
                        className="text-[11px] font-semibold border border-slate-200 rounded-lg px-2.5 py-1 bg-white text-slate-700 pr-6 appearance-none focus:outline-hidden"
                      >
                        <option value="Semua">Jenis Admin: Semua</option>
                        <option value="HO">Admin Modul HO</option>
                        <option value="Entitas">Admin Entitas</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#016DB2" strokeWidth="12" strokeDasharray="50 188" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#06B6D4" strokeWidth="12" strokeDasharray="50 188" strokeDashoffset="-50" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8B5CF6" strokeWidth="12" strokeDasharray="50 188" strokeDashoffset="-100" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray="50 188" strokeDashoffset="-150" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-slate-900">300</span>
                        <span className="text-[10px] text-slate-400 font-semibold">Total</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-[11px] border-t border-slate-100 pt-3 max-h-32 overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#016DB2]" /> PT Pelabuhan Indonesia</span>
                      <span className="font-bold text-slate-800">50 (16.7%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-cyan-500" /> Subholding Pelindo Multi Terminal</span>
                      <span className="font-bold text-slate-800">50 (16.7%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-purple-500" /> Subholding Pelindo Terminal Petikemas</span>
                      <span className="font-bold text-slate-800">50 (16.7%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-amber-500" /> Subholding Pelindo Jasa Maritim</span>
                      <span className="font-bold text-slate-800">50 (16.7%)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="font-bold text-sm text-slate-800">User</div>
                  <div className="flex items-center justify-center py-2">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray="180 58" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="58 180" strokeDashoffset="-180" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-slate-900">300</span>
                        <span className="text-[10px] text-slate-400 font-semibold">Total</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-[11px] border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Insan Pelindo Head Office</span>
                      <span className="font-bold text-slate-800">180 (60%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-blue-500" /> Insan Entitas Anak Perusahaan</span>
                      <span className="font-bold text-slate-800">120 (40%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User List Table Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">User List</h3>
                  <p className="text-xs text-slate-500">Anda dapat User List dibawah ini</p>
                </div>

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

                  <div className="relative">
                    <select
                      value={filterEntity}
                      onChange={e => setFilterEntity(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden"
                    >
                      <option value="Semua">Entitas: Semua</option>
                      <option value="PT Pelabuhan Indonesia">PT Pelabuhan Indonesia</option>
                      <option value="PT Integrasi Logistik Cipta Solusi">PT Integrasi Logistik Cipta Solusi</option>
                      <option value="PT Pelindo Multi Terminal">PT Pelindo Multi Terminal</option>
                      <option value="PT Pelindo Terminal Petikemas">PT Pelindo Terminal Petikemas</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={filterTypeRole}
                      onChange={e => setFilterTypeRole(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden"
                    >
                      <option value="Semua">Tipe Role: Semua</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin Modul HO">Admin Modul HO</option>
                      <option value="Admin Entitas">Admin Entitas</option>
                      <option value="User">User</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Menampilkan <span className="font-bold text-slate-800">{users.length} User.</span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3.5">USER</th>
                        <th className="p-3.5">ENTITAS</th>
                        <th className="p-3.5">MODUL</th>
                        <th className="p-3.5">NAMA ROLE</th>
                        <th className="p-3.5">TYPE ROLE</th>
                        <th className="p-3.5">STATUS</th>
                        <th className="p-3.5 text-center">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/70">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                                {u.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  {u.name} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{u.nipp}</span>
                                </div>
                                <div className="text-[11px] text-slate-400">{u.roleTitle}</div>
                                <div className="text-[11px] text-[#016DB2]">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 font-medium text-slate-800">{u.entity}</td>
                          <td className="p-3.5 font-semibold text-slate-700">{u.module}</td>
                          <td className="p-3.5 font-semibold text-slate-800">{u.roleName}</td>
                          <td className="p-3.5 font-medium text-slate-600">{u.typeRole}</td>
                          <td className="p-3.5">
                            <button
                              onClick={() => handleToggleUserStatus(u.id)}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                                u.status === "Active" 
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                                  : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                              }`}
                            >
                              {u.status}
                            </button>
                          </td>
                          <td className="p-3.5 text-center relative">
                            <button
                              onClick={() => setActiveActionMenuId(activeActionMenuId === u.id ? null : u.id)}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeActionMenuId === u.id && (
                              <div className="absolute right-6 top-8 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                <button
                                  onClick={() => {
                                    setViewDetailModalUser(u);
                                    setActiveActionMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-400" /> View Detail
                                </button>
                                <button
                                  onClick={() => {
                                    setLogActivityModalUser(u);
                                    setActiveActionMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                >
                                  <History className="w-3.5 h-3.5 text-slate-400" /> Log User Management
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedUserForProfile(u);
                                    setPageView("detail_profile");
                                    setActiveActionMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-[#016DB2] flex items-center gap-2 cursor-pointer"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-[#016DB2]" /> View Detail Profile
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROLE MANAGEMENT (5) */}
          {activeMainTab === "role_mgmt" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRoleSubTab("master_role")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                    roleSubTab === "master_role"
                      ? "bg-sky-50 text-[#016DB2] border-[#016DB2]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Master Role
                </button>

                <button
                  onClick={() => setRoleSubTab("review_request_role")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1.5 ${
                    roleSubTab === "review_request_role"
                      ? "bg-sky-50 text-[#016DB2] border-[#016DB2]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span>Review Request Role</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#016DB2] text-white text-[10px]">5</span>
                </button>

                <button
                  onClick={() => setRoleSubTab("log_request_role")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                    roleSubTab === "log_request_role"
                      ? "bg-sky-50 text-[#016DB2] border-[#016DB2]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Log Request Role
                </button>
              </div>

              {/* SUB-TAB 2.1: MASTER ROLE */}
              {roleSubTab === "master_role" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Master Role</h3>
                      <p className="text-xs text-slate-500">Anda dapat Role List dibawah ini</p>
                    </div>
                    <button
                      onClick={() => setPageView("tambah_role")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Tambah Role
                    </button>
                  </div>

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

                    <div className="relative">
                      <select
                        value={filterMenu}
                        onChange={e => setFilterMenu(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden"
                      >
                        <option value="Semua">Menu: Semua</option>
                        <option value="KMS">KMS</option>
                        <option value="LMS">LMS</option>
                        <option value="TMS">TMS</option>
                        <option value="IMS">IMS</option>
                        <option value="CMS">CMS</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={filterTypeRole}
                        onChange={e => setFilterTypeRole(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden"
                      >
                        <option value="Semua">Tipe Role: Semua</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin Modul HO">Admin Modul HO</option>
                        <option value="Admin Entitas">Admin Entitas</option>
                        <option value="User">User</option>
                        <option value="SME">SME</option>
                        <option value="SME Trainer">SME Trainer</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Subcon">Subcon</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-800">{roleMasters.length} Role.</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">NAMA ROLE</th>
                          <th className="p-3.5">DESKRIPSI ROLE</th>
                          <th className="p-3.5 text-center">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {roleMasters.map(rm => (
                          <tr key={rm.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5 font-bold text-slate-900">{rm.namaRole}</td>
                            <td className="p-3.5 text-slate-600 max-w-xl">{rm.deskripsiRole}</td>
                            <td className="p-3.5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === rm.id ? null : rm.id)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeActionMenuId === rm.id && (
                                <div className="absolute right-6 top-8 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                  <button
                                    onClick={() => {
                                      setSelectedRoleForDetail(rm);
                                      setPageView("view_role_detail");
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-400" /> View
                                  </button>
                                  <button
                                    onClick={() => {
                                      setPageView("tambah_role");
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Edit2 className="w-3.5 h-3.5 text-slate-400" /> Edit
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2.2: REVIEW REQUEST ROLE */}
              {roleSubTab === "review_request_role" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Request Role</h3>
                    <p className="text-xs text-slate-500">Anda dapat Request Approval di bawah ini</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Cari disini"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                      />
                    </div>
                    <div className="relative">
                      <select className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden">
                        <option>Status: Semua</option>
                        <option>Waiting Approval 1</option>
                        <option>Waiting Approval 2</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-800">{requestRoles.length} Role.</span>
                  </div>

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
                        {requestRoles.map(req => (
                          <tr key={req.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                                  HA
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    {req.name} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{req.nipp}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-400">{req.title}</div>
                                  <div className="text-[11px] text-[#016DB2]">{req.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 font-medium text-slate-800">{req.entity}</td>
                            <td className="p-3.5 font-medium text-slate-700">{req.roleExisting}</td>
                            <td className="p-3.5 font-bold text-slate-900">{req.requestedRole}</td>
                            <td className="p-3.5">
                              <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-sky-300 bg-sky-50 text-[#016DB2]">
                                {req.status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="w-1/2 h-full bg-[#016DB2] rounded-full" />
                                </div>
                                <span className="font-bold text-slate-700">{req.approvalProgress}</span>
                                <Info className="w-3.5 h-3.5 text-slate-400" />
                              </div>
                            </td>
                            <td className="p-3.5 font-semibold text-slate-800">{req.approver}</td>
                            <td className="p-3.5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === req.id ? null : req.id)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeActionMenuId === req.id && (
                                <div className="absolute right-6 top-8 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                  <button
                                    onClick={() => {
                                      setApprovalModalItem(req);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2 cursor-pointer"
                                  >
                                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Approve atau Reject
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedRoleForDetail({
                                        id: "RM-99",
                                        namaRole: req.requestedRole,
                                        deskripsiRole: `Role yang dimohonkan oleh ${req.name}`,
                                        menu: "TMS",
                                        tipeRole: "Admin Modul HO"
                                      });
                                      setPageView("view_role_detail");
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-400" /> View Role Permission
                                  </button>
                                  <button
                                    onClick={() => {
                                      setLogActivityModalUser(req);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <History className="w-3.5 h-3.5 text-slate-400" /> View Log Activity
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2.3: LOG REQUEST ROLE */}
              {roleSubTab === "log_request_role" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Log Request Role</h3>
                    <p className="text-xs text-slate-500">Anda dapat Log Role Managemen List di bawah ini</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Cari disini"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                      />
                    </div>
                    <div className="relative">
                      <select className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden">
                        <option>Status: Semua</option>
                        <option>Approved</option>
                        <option>Waiting Approval 1</option>
                        <option>Rejected</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-800">{logRequestRoles.length} Role.</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">USER</th>
                          <th className="p-3.5">ENTITAS</th>
                          <th className="p-3.5">EXISTING ROLE</th>
                          <th className="p-3.5">REQUESTED ROLE</th>
                          <th className="p-3.5">TANGGAL AKTIVITAS</th>
                          <th className="p-3.5">STATUS</th>
                          <th className="p-3.5 text-center">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {logRequestRoles.map(log => (
                          <tr key={log.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                                  H
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    {log.name} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{log.nipp}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-400">{log.title}</div>
                                  <div className="text-[11px] text-[#016DB2]">{log.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 font-medium text-slate-800">{log.entity}</td>
                            <td className="p-3.5 font-medium text-slate-700">{log.roleExisting}</td>
                            <td className="p-3.5 font-bold text-slate-900">{log.requestedRole}</td>
                            <td className="p-3.5 font-medium text-slate-600">{log.date}</td>
                            <td className="p-3.5">
                              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                                log.status === "Approved"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : log.status === "Rejected"
                                  ? "bg-red-50 text-red-700 border-red-300"
                                  : "bg-sky-50 text-[#016DB2] border-sky-300"
                              }`}>
                                {log.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === log.id ? null : log.id)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeActionMenuId === log.id && (
                                <div className="absolute right-6 top-8 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                  <button
                                    onClick={() => {
                                      setViewDetailModalUser(log);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-400" /> View Detail
                                  </button>
                                  <button
                                    onClick={() => {
                                      setLogActivityModalUser(log);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <History className="w-3.5 h-3.5 text-slate-400" /> View Log Activity
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: USER MANAGEMENT (5) */}
          {activeMainTab === "user_mgmt" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setUserSubTab("invitation_list")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                    userSubTab === "invitation_list"
                      ? "bg-sky-50 text-[#016DB2] border-[#016DB2]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  User Invitation List
                </button>

                <button
                  onClick={() => setUserSubTab("review_signup")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1.5 ${
                    userSubTab === "review_signup"
                      ? "bg-sky-50 text-[#016DB2] border-[#016DB2]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span>Review Signup User</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#016DB2] text-white text-[10px]">5</span>
                </button>

                <button
                  onClick={() => setUserSubTab("user_list")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                    userSubTab === "user_list"
                      ? "bg-sky-50 text-[#016DB2] border-[#016DB2]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  User List
                </button>

                <button
                  onClick={() => setUserSubTab("archive")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                    userSubTab === "archive"
                      ? "bg-sky-50 text-[#016DB2] border-[#016DB2]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Archive
                </button>
              </div>

              {/* SUB-TAB 3.1: USER INVITATION LIST */}
              {userSubTab === "invitation_list" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">User Invitation List</h3>
                      <p className="text-xs text-slate-500">
                        Kirim Invitiation, bulk, dan lihat log Unregistred User terdaftar di bawah ini
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowSendInvitationModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#016DB2] text-[#016DB2] hover:bg-sky-50 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4" /> Kirim Invitation
                      </button>
                      <button
                        onClick={() => {
                          setBulkStep(1);
                          setShowBulkModal(true);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <CloudUpload className="w-4 h-4" /> Bulk
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Cari disini"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                      />
                    </div>
                    <div className="relative">
                      <select className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden">
                        <option>Status: Semua</option>
                        <option>Terikrim</option>
                        <option>Kadaluarsa</option>
                        <option>Gagal</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-800">{invitations.length} Role.</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">USER</th>
                          <th className="p-3.5">MASA AKTIF INVITATION</th>
                          <th className="p-3.5">STATUS</th>
                          <th className="p-3.5 text-center">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {invitations.map(inv => (
                          <tr key={inv.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                                  H
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    {inv.name} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{inv.nipp}</span>
                                  </div>
                                  <div className="text-[11px] text-[#016DB2]">{inv.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 font-medium text-slate-600">{inv.masaAktif}</td>
                            <td className="p-3.5">
                              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                                inv.status === "Terikrim"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : inv.status === "Kadaluarsa"
                                  ? "bg-amber-50 text-amber-700 border-amber-300"
                                  : "bg-red-50 text-red-700 border-red-300"
                              }`}>
                                {inv.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === inv.id ? null : inv.id)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeActionMenuId === inv.id && (
                                <div className="absolute right-6 top-8 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                  <button
                                    onClick={() => {
                                      setViewDetailModalUser(inv);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-400" /> View Detail
                                  </button>
                                  <button
                                    onClick={() => {
                                      triggerSuccess(`Kirim Ulang Undangan ke ${inv.email}`);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Kirim Ulang
                                  </button>
                                  <button
                                    onClick={() => {
                                      setLogActivityModalUser(inv);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <History className="w-3.5 h-3.5 text-slate-400" /> View Log Activity
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3.2: REVIEW SIGNUP USER */}
              {userSubTab === "review_signup" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Review Signup User</h3>
                    <p className="text-xs text-slate-500">Anda dapat mereview user yang sudah melakukan Signup Di bawah ini</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Cari disini"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                      />
                    </div>
                    <div className="relative">
                      <select className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden">
                        <option>Status Approved: Semua</option>
                        <option>Waiting Approval</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden">
                        <option>Status Email: Semua</option>
                        <option>Terkirim</option>
                        <option>Gagal</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-800">{signups.length} Role.</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">USER</th>
                          <th className="p-3.5">NOMOR HANDPHONE</th>
                          <th className="p-3.5">STATUS PEGAWAI</th>
                          <th className="p-3.5">SK PENGANGKATAN PEKERJA</th>
                          <th className="p-3.5">SK POSISI TERKAHIR</th>
                          <th className="p-3.5">TANGGAL REGISTER</th>
                          <th className="p-3.5">STATUS APPROVED</th>
                          <th className="p-3.5">STATUS EMAIL</th>
                          <th className="p-3.5 text-center">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {signups.map(sgn => (
                          <tr key={sgn.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                                  H
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    {sgn.name} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{sgn.nipp}</span>
                                  </div>
                                  <div className="text-[11px] text-[#016DB2]">{sgn.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 font-medium text-slate-700">{sgn.phone}</td>
                            <td className="p-3.5 font-medium text-slate-700">{sgn.statusPegawai}</td>
                            <td className="p-3.5">
                              <button 
                                onClick={() => triggerSuccess("Membuka Dokumen", "File SK Pengangkatan Pekerja.pdf")}
                                className="inline-flex items-center gap-1.5 text-[#016DB2] font-semibold hover:underline cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" /> {sgn.skPengangkatan}
                              </button>
                            </td>
                            <td className="p-3.5">
                              <button 
                                onClick={() => triggerSuccess("Membuka Dokumen", "File SK Posisi Terakhir.pdf")}
                                className="inline-flex items-center gap-1.5 text-[#016DB2] font-semibold hover:underline cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" /> {sgn.skPosisiTerakhir}
                              </button>
                            </td>
                            <td className="p-3.5 text-slate-600">{sgn.registerDate}</td>
                            <td className="p-3.5">
                              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                                sgn.statusApproved === "Approved"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : sgn.statusApproved === "Rejected"
                                  ? "bg-red-50 text-red-700 border-red-300"
                                  : "bg-sky-50 text-[#016DB2] border-sky-300"
                              }`}>
                                {sgn.statusApproved}
                              </span>
                            </td>
                            <td className="p-3.5">
                              {sgn.statusEmail !== "-" ? (
                                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                                  sgn.statusEmail === "Terkirim"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                    : "bg-red-50 text-red-700 border-red-300"
                                }`}>
                                  {sgn.statusEmail}
                                </span>
                              ) : (
                                <span className="text-slate-400 font-bold">-</span>
                              )}
                            </td>
                            <td className="p-3.5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === sgn.id ? null : sgn.id)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeActionMenuId === sgn.id && (
                                <div className="absolute right-6 top-8 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                  <button
                                    onClick={() => {
                                      setReviewSignupModalItem(sgn);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-400" /> View Detail
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (sgn.statusApproved === "Approved" && sgn.statusEmail === "Terkirim") {
                                        setWarningPasswordAlreadySet(true);
                                      } else {
                                        setConfirmResendEmailItem(sgn);
                                      }
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Resend Email Set Password
                                  </button>
                                  <button
                                    onClick={() => {
                                      setLogActivityModalUser(sgn);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <History className="w-3.5 h-3.5 text-slate-400" /> View Log History
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3.3: USER LIST */}
              {userSubTab === "user_list" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">User List</h3>
                    <p className="text-xs text-slate-500">Anda dapat Log User Managemen List di bawah ini</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Cari disini"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                      />
                    </div>
                    <div className="relative">
                      <select className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 pr-8 appearance-none focus:outline-hidden">
                        <option>Entitas: Semua</option>
                        <option>PT Pelabuhan Indonesia</option>
                        <option>PT Integrasi Logistik Cipta Solusi</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-800">7 Role.</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">USER</th>
                          <th className="p-3.5">ENTITAS</th>
                          <th className="p-3.5">ROLE</th>
                          <th className="p-3.5">TANGGAL REGISTER</th>
                          <th className="p-3.5">STATUS</th>
                          <th className="p-3.5 text-center">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {users.map((u, i) => (
                          <tr key={u.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                                  H
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    {u.name} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{u.nipp}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-400">{u.roleTitle}</div>
                                  <div className="text-[11px] text-[#016DB2]">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 font-medium text-slate-800">{u.entity}</td>
                            <td className="p-3.5">
                              {i === 0 ? (
                                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                                  Role <span className="px-2 py-0.5 rounded-full bg-[#016DB2] text-white text-[10px] font-bold">+2</span>
                                </span>
                              ) : (
                                <span className="font-medium text-slate-700">{u.typeRole}</span>
                              )}
                            </td>
                            <td className="p-3.5 text-slate-600">{u.registerDate}</td>
                            <td className="p-3.5">
                              <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-300 bg-emerald-50 text-emerald-700">
                                {u.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === u.id ? null : u.id)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeActionMenuId === u.id && (
                                <div className="absolute right-6 top-8 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                  <button
                                    onClick={() => {
                                      setAssignRoleModalUser(u);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <UserCheck className="w-3.5 h-3.5 text-slate-400" /> Assign Role
                                  </button>
                                  <button
                                    onClick={() => {
                                      setConfirmArchiveUser(u);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-red-600 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Archive className="w-3.5 h-3.5 text-red-400" /> Archive
                                  </button>
                                  <button
                                    onClick={() => {
                                      setLogActivityModalUser(u);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <History className="w-3.5 h-3.5 text-slate-400" /> View Log History
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedUserForProfile(u);
                                      setPageView("detail_profile");
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-[#016DB2] flex items-center gap-2 cursor-pointer"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5 text-[#016DB2]" /> View Detail Profile
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3.4: ARCHIVE */}
              {userSubTab === "archive" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Archive User List</h3>
                    <p className="text-xs text-slate-500">
                      Kirim Invitiation, bulk, dan lihat log Unregistred User terdaftar di bawah ini
                    </p>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Cari disini"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                    />
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-800">{archiveUsers.length} User.</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">USER</th>
                          <th className="p-3.5">ENTITAS</th>
                          <th className="p-3.5">STATUS</th>
                          <th className="p-3.5 text-center">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {archiveUsers.map(arc => (
                          <tr key={arc.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                                  H
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    {arc.name} <span className="text-slate-400">&bull;</span> <span className="text-slate-500 font-normal">{arc.nipp}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-400">{arc.title}</div>
                                  <div className="text-[11px] text-[#016DB2]">{arc.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 font-medium text-slate-800">{arc.entity}</td>
                            <td className="p-3.5">
                              <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-slate-300 bg-slate-100 text-slate-600">
                                {arc.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === arc.id ? null : arc.id)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeActionMenuId === arc.id && (
                                <div className="absolute right-6 top-8 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                                  <button
                                    onClick={() => {
                                      setViewDetailModalUser(arc);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-400" /> View
                                  </button>
                                  <button
                                    onClick={() => {
                                      setConfirmUnarchiveUser(arc);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-emerald-600 flex items-center gap-2 cursor-pointer"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-emerald-500" /> Unarchive
                                  </button>
                                  <button
                                    onClick={() => {
                                      setLogActivityModalUser(arc);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                                  >
                                    <History className="w-3.5 h-3.5 text-slate-400" /> Log Activity
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODALS & POPUPS
         ========================================================================= */}

      {/* 1. Modal: Download Report */}
      {showDownloadReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Download Report</h3>
              <button 
                onClick={() => setShowDownloadReportModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Pilih Tipe Role yang ingin Anda unduh laporannya.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Pilih Tipe Role</label>
              <div className="relative">
                <select
                  value={selectedReportRoleType}
                  onChange={e => setSelectedReportRoleType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 appearance-none focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin Modul HO">Admin Modul HO</option>
                  <option value="Admin Entitas">Admin Entitas</option>
                  <option value="User">User</option>
                  <option value="SME">SME</option>
                  <option value="SME Trainer">SME Trainer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Subcon">Subcon</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowDownloadReportModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowDownloadReportModal(false);
                  triggerSuccess("Download Report Berhasil", `Laporan Tipe Role: ${selectedReportRoleType} (.xlsx) telah diunduh.`);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: View Detail Log User Management List */}
      {viewDetailModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">View Detail Log User Management List</h3>
              <button 
                onClick={() => setViewDetailModalUser(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#016DB2] font-black flex items-center justify-center">
                  H
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    {viewDetailModalUser.name || "HENDRA"} &bull; <span className="text-slate-500">{viewDetailModalUser.nipp || "105320"}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{viewDetailModalUser.email || "hendra@pelindo.co.id"}</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-300 bg-emerald-50 text-emerald-700">
                {viewDetailModalUser.status || viewDetailModalUser.statusApproved || "Active"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Nomor Handphone</span>
                <p className="font-bold text-slate-900 mt-0.5">{viewDetailModalUser.phone || "+62 81234221234"}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Status Pegawai</span>
                <p className="font-bold text-slate-900 mt-0.5">{viewDetailModalUser.statusPegawai || "PKWTT PELINDO"}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">SK Pengangkatan Pekerja</span>
                <p className="font-bold text-[#016DB2] mt-0.5 flex items-center gap-1 cursor-pointer">
                  <FileText className="w-3.5 h-3.5" /> SK Pengangkatan Pekerja
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">SK Posisi Terakhir</span>
                <p className="font-bold text-[#016DB2] mt-0.5 flex items-center gap-1 cursor-pointer">
                  <FileText className="w-3.5 h-3.5" /> SK Posisi Terakhir
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Tanggal Register</span>
                <p className="font-bold text-slate-900 mt-0.5">{viewDetailModalUser.registerDate || "26/09/2025 12:00"}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Masa Aktif SK</span>
                <p className="font-bold text-slate-900 mt-0.5">26/09/2025 - 26/09/2026</p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewDetailModalUser(null)}
                className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: Log Activity Timeline */}
      {logActivityModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Log Activity</h3>
              <button 
                onClick={() => setLogActivityModalUser(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3 text-xs">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#016DB2] font-bold flex items-center justify-center shrink-0">
                H
              </div>
              <div>
                <div className="font-bold text-slate-900">HENDRA &bull; 105320</div>
                <div className="text-[11px] text-slate-500">PT. Integrasi Logistik Cipta Solusi</div>
              </div>
            </div>

            <div className="text-xs font-bold text-slate-700">Berikut ini adalah Log Request Role</div>

            <div className="space-y-4 text-xs relative pl-6 border-l-2 border-slate-200 ml-3">
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <X className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Rejected by Atasan Langsung</span>
                    <span className="text-[10px] text-slate-400">15/05/2024 12:00</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl mt-1.5 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div className="font-bold text-slate-800">Ilham Eka Putra Sriyanto</div>
                    <div className="text-red-600 font-semibold">Alasan Ditolak:</div>
                    <p className="leading-relaxed">
                      Dokumen lampiran SK penugasan tidak sesuai dengan kriteria role yang diajukan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative pt-2">
                <div className="absolute -left-[31px] top-2 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Hendra Submitted</span>
                    <span className="text-[10px] text-slate-400">15/05/2024 10:00</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Pengajuan request role baru melalui sistem</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setLogActivityModalUser(null)}
                className="px-6 py-2 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: Approve atau reject request approval */}
      {approvalModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Approve atau reject request approval</h3>
              <button 
                onClick={() => setApprovalModalItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#016DB2] font-black flex items-center justify-center">
                  H
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">
                    {approvalModalItem.name} &bull; <span className="text-slate-500">{approvalModalItem.nipp}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{approvalModalItem.title}</div>
                  <div className="text-[11px] text-[#016DB2]">{approvalModalItem.email}</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-sky-300 bg-sky-50 text-[#016DB2]">
                Waiting Approval
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Entitas</span>
                <p className="font-bold text-slate-900 mt-0.5">{approvalModalItem.entity}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Role Existing</span>
                <p className="font-bold text-slate-900 mt-0.5">{approvalModalItem.roleExisting}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Requested Role</span>
                <p className="font-bold text-slate-900 mt-0.5">{approvalModalItem.requestedRole}</p>
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

            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
              <button
                onClick={() => setApprovalModalItem(null)}
                className="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  setConfirmRejectModalItem(approvalModalItem);
                  setApprovalModalItem(null);
                }}
                className="px-5 py-2 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setConfirmApproveModalItem(approvalModalItem);
                  setApprovalModalItem(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Confirm Approve */}
      {confirmApproveModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmApproveModalItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin untuk Approve Request Approval Ini?
            </p>

            <div className="p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-[#016DB2] font-black flex items-center justify-center">
                  H
                </div>
                <div>
                  <div className="font-bold text-slate-900">
                    {confirmApproveModalItem.name} &bull; <span className="text-slate-500">{confirmApproveModalItem.nipp}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{confirmApproveModalItem.title}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px]">Nomor Handphone</span>
                  <div className="font-bold text-slate-800">+62 81234221234</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Status Pegawai</span>
                  <div className="font-bold text-slate-800">PKWTT PELINDO</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Assign Role<span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={assignedRoleValue}
                  onChange={e => setAssignedRoleValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 appearance-none focus:outline-hidden focus:ring-2 focus:ring-[#016DB2]"
                >
                  <option value="HO_SuperAdmin">HO_SuperAdmin</option>
                  <option value="TMS_Admin">TMS_Admin</option>
                  <option value="LMS_HO_Admin">LMS_HO_Admin</option>
                  <option value="User">User</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmApproveModalItem(null)}
                className="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={() => {
                  const targetId = confirmApproveModalItem.id;
                  setRequestRoles(requestRoles.map(r => r.id === targetId ? { ...r, status: "Approved" } : r));
                  setConfirmApproveModalItem(null);
                  triggerSuccess("Sukses Approve Request Approval", `Role ${assignedRoleValue} telah aktif untuk pengguna.`);
                }}
                className="px-5 py-2 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Confirm Reject */}
      {confirmRejectModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmRejectModalItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin untuk Reject Request Approval Ini?
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Masukan Alasan Reject<span className="text-red-500">*</span></label>
              <textarea
                value={rejectReasonText}
                onChange={e => setRejectReasonText(e.target.value)}
                placeholder="Masukan alasan reject (Min. 150 Characters)"
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
              <span className="text-[10px] text-slate-400">Min. 150 karakter</span>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmRejectModalItem(null)}
                className="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  const targetId = confirmRejectModalItem.id;
                  setRequestRoles(requestRoles.map(r => r.id === targetId ? { ...r, status: "Rejected" } : r));
                  setConfirmRejectModalItem(null);
                  triggerSuccess("Sukses Reject Request Approval", "Notifikasi penolakan telah dikirim ke pemohon.");
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Ya, Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal Review Signup User Detail & Action */}
      {reviewSignupModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">View Detail Log User Management List</h3>
              <button 
                onClick={() => setReviewSignupModalItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#016DB2] font-black flex items-center justify-center">
                  H
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">
                    {reviewSignupModalItem.name} &bull; <span className="text-slate-500">{reviewSignupModalItem.nipp}</span>
                  </div>
                  <div className="text-[11px] text-[#016DB2]">{reviewSignupModalItem.email}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                reviewSignupModalItem.statusApproved === "Approved"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : reviewSignupModalItem.statusApproved === "Rejected"
                  ? "bg-red-50 text-red-700 border-red-300"
                  : "bg-sky-50 text-[#016DB2] border-sky-300"
              }`}>
                {reviewSignupModalItem.statusApproved}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Nomor Handphone</span>
                <p className="font-bold text-slate-900 mt-0.5">{reviewSignupModalItem.phone}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Status Pegawai</span>
                <p className="font-bold text-slate-900 mt-0.5">{reviewSignupModalItem.statusPegawai}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">SK Pengangkatan Pekerja</span>
                <p className="font-bold text-[#016DB2] mt-0.5 flex items-center gap-1 cursor-pointer">
                  <FileText className="w-3.5 h-3.5" /> SK Pengangkatan Pekerja
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">SK Posisi Terakhir</span>
                <p className="font-bold text-[#016DB2] mt-0.5 flex items-center gap-1 cursor-pointer">
                  <FileText className="w-3.5 h-3.5" /> SK Posisi Terakhir
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Tanggal Register</span>
                <p className="font-bold text-slate-900 mt-0.5">{reviewSignupModalItem.registerDate}</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-700">Tanggal Masa Aktif SK Posisi Terakhir</label>
              <input
                type="date"
                defaultValue="2025-02-17"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
              <button
                onClick={() => setReviewSignupModalItem(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  setConfirmSignupRejectItem(reviewSignupModalItem);
                  setReviewSignupModalItem(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setConfirmSignupApproveItem(reviewSignupModalItem);
                  setReviewSignupModalItem(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Modal Confirm Signup Approve & Assign Role */}
      {confirmSignupApproveItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmSignupApproveItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin untuk Approve Request Approval Ini?
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900">{confirmSignupApproveItem.name}</div>
              <div className="text-slate-500">{confirmSignupApproveItem.email}</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Assign Role<span className="text-red-500">*</span></label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-hidden"
              >
                <option>User</option>
                <option>HO_SuperAdmin</option>
                <option>Admin Modul HO</option>
                <option>Admin Entitas</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmSignupApproveItem(null)}
                className="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={() => {
                  const targetId = confirmSignupApproveItem.id;
                  setSignups(signups.map(s => s.id === targetId ? { ...s, statusApproved: "Approved", statusEmail: "Terkirim" } : s));
                  setConfirmSignupApproveItem(null);
                  triggerSuccess("Sukses Approve Request Approval", "Email set password otomatis terkirim ke user.");
                }}
                className="px-5 py-2 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal Confirm Signup Reject */}
      {confirmSignupRejectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmSignupRejectItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin untuk reject Request Approval Ini?
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Alasan Reject<span className="text-red-500">*</span></label>
              <textarea
                placeholder="Masukan alasan reject (Min. 150 Characters)"
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmSignupRejectItem(null)}
                className="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={() => {
                  const targetId = confirmSignupRejectItem.id;
                  setSignups(signups.map(s => s.id === targetId ? { ...s, statusApproved: "Rejected" } : s));
                  setConfirmSignupRejectItem(null);
                  triggerSuccess("Sukses Reject Request Approval", "User telah dinotifikasi penolakan registrasi.");
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Ya, Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. Modal Alert: Set Email Password Sudah Dilakukan */}
      {warningPasswordAlreadySet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Set Email Password Sudah Dilakukan</h3>
            <p className="text-xs text-slate-500">
              User ini sudah melakukan set password. Email set password tidak perlu dikirim ulang.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setWarningPasswordAlreadySet(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. Modal: Resend Email Set Password Confirmation */}
      {confirmResendEmailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmResendEmailItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin Resend Email set Password ke <span className="text-[#016DB2]">{confirmResendEmailItem.email}</span>?
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmResendEmailItem(null)}
                className="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={() => {
                  const targetEmail = confirmResendEmailItem.email;
                  setConfirmResendEmailItem(null);
                  triggerSuccess("Sukses Resend Email Set Password", `Email telah dikirim ulang ke ${targetEmail}`);
                }}
                className="px-5 py-2 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Kirim Ulang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. Modal: Assign Role */}
      {assignRoleModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Assign Role</h3>
              <button 
                onClick={() => setAssignRoleModalUser(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#016DB2] font-bold flex items-center justify-center">
                H
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">
                  {assignRoleModalUser.name} &bull; <span className="text-slate-500">{assignRoleModalUser.nipp}</span>
                </div>
                <div className="text-[11px] text-slate-400">{assignRoleModalUser.roleTitle}</div>
                <div className="text-[11px] text-[#016DB2]">{assignRoleModalUser.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Entitas</span>
                <p className="font-bold text-slate-900 mt-0.5 text-[11px]">{assignRoleModalUser.entity}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Role</span>
                <p className="font-bold text-slate-900 mt-0.5 text-[11px]">{assignRoleModalUser.typeRole}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Tanggal Register</span>
                <p className="font-bold text-slate-900 mt-0.5 text-[11px]">{assignRoleModalUser.registerDate}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Assign New Role<span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  id="newRoleSelect"
                  defaultValue="HO_SuperAdmin"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 appearance-none focus:outline-hidden"
                >
                  <option value="HO_SuperAdmin">HO_SuperAdmin</option>
                  <option value="TMS_Admin">TMS_Admin</option>
                  <option value="LMS_HO_Admin">LMS_HO_Admin</option>
                  <option value="ILCS_Admin_KMS">ILCS_Admin_KMS</option>
                  <option value="ILCS_Admin_TMS">ILCS_Admin_TMS</option>
                  <option value="ILCS_Admin_CMS">ILCS_Admin_CMS</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setAssignRoleModalUser(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  const sel = (document.getElementById("newRoleSelect") as HTMLSelectElement)?.value || "HO_SuperAdmin";
                  setConfirmAssignRoleUser({ user: assignRoleModalUser, newRole: sel });
                  setAssignRoleModalUser(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. Modal: Confirm Assign Role */}
      {confirmAssignRoleUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmAssignRoleUser(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin Assign Role ini?
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
              <div className="font-bold text-slate-900">{confirmAssignRoleUser.user.name} &bull; {confirmAssignRoleUser.user.nipp}</div>
              <div className="text-slate-500">{confirmAssignRoleUser.user.email}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center gap-4 text-xs font-bold">
              <span className="text-slate-600">{confirmAssignRoleUser.user.typeRole}</span>
              <ArrowRight className="w-4 h-4 text-[#016DB2]" />
              <span className="text-[#016DB2]">{confirmAssignRoleUser.newRole}</span>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmAssignRoleUser(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  const targetUser = confirmAssignRoleUser.user;
                  const newRole = confirmAssignRoleUser.newRole;
                  setUsers(users.map(u => u.id === targetUser.id ? { ...u, roleName: newRole, typeRole: newRole } : u));
                  setConfirmAssignRoleUser(null);
                  triggerSuccess("Sukses Assigne Role", `Role baru ${newRole} telah ditetapkan.`);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 14. Modal Confirm Archive User */}
      {confirmArchiveUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmArchiveUser(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin Archive User ini?
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
              <div className="font-bold text-slate-900">{confirmArchiveUser.name} &bull; {confirmArchiveUser.nipp}</div>
              <div className="text-slate-500">{confirmArchiveUser.email}</div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmArchiveUser(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  const targetUser = confirmArchiveUser;
                  setArchiveUsers([
                    {
                      id: `ARC-${Date.now()}`,
                      name: targetUser.name,
                      nipp: targetUser.nipp,
                      email: targetUser.email,
                      title: targetUser.roleTitle,
                      entity: targetUser.entity,
                      status: "Archived",
                      archiveDate: "Hari ini"
                    },
                    ...archiveUsers
                  ]);
                  setConfirmArchiveUser(null);
                  triggerSuccess("Sukses Archive User", "User telah dipindahkan ke daftar arsip.");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15. Modal Confirm Unarchive User */}
      {confirmUnarchiveUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmUnarchiveUser(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin Unarchive User ini?
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
              <div className="font-bold text-slate-900">{confirmUnarchiveUser.name} &bull; {confirmUnarchiveUser.nipp}</div>
              <div className="text-slate-500">{confirmUnarchiveUser.email}</div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmUnarchiveUser(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  const targetId = confirmUnarchiveUser.id;
                  setArchiveUsers(archiveUsers.filter(a => a.id !== targetId));
                  setConfirmUnarchiveUser(null);
                  triggerSuccess("Sukses Unarchive User", "User telah dikembalikan ke daftar aktif.");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Unarchive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 16. Modal: Kirim Invitation */}
      {showSendInvitationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Kirim Invitation</h3>
              <button 
                onClick={() => setShowSendInvitationModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">NIPP<span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Masukan NIPP"
                    value={invitationForm.nipp}
                    onChange={e => setInvitationForm({ ...invitationForm, nipp: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Masukan Nama"
                  value={invitationForm.name}
                  onChange={e => setInvitationForm({ ...invitationForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Email<span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="Masukan Email"
                value={invitationForm.email}
                onChange={e => setInvitationForm({ ...invitationForm, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSendInvitationModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setConfirmSendInvitationData({
                    nipp: invitationForm.nipp || "11002754",
                    name: invitationForm.name || "Yogi Muhammad Irshad",
                    email: invitationForm.email || "yogimuhammadirshad@gmail.com"
                  });
                  setShowSendInvitationModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Kirim Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 17. Modal Confirm Kirim Invitation */}
      {confirmSendInvitationData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
              <button 
                onClick={() => setConfirmSendInvitationData(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Apakah anda yakin Mengirim Invitation Access User ini?
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-slate-400">NIPP</span><span className="font-bold text-slate-900">{confirmSendInvitationData.nipp}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Nama</span><span className="font-bold text-slate-900">{confirmSendInvitationData.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="font-bold text-[#016DB2]">{confirmSendInvitationData.email}</span></div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmSendInvitationData(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  const targetEmail = confirmSendInvitationData.email;
                  setConfirmSendInvitationData(null);
                  triggerSuccess("Sukses Mengirim Invitation", `Undangan telah dikirim ke ${targetEmail}`);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Kirim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 18. Modal: Bulk Invitation */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Bulk Invitation List</h3>
              <button 
                onClick={() => setShowBulkModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bulkStep === 1 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Supported files: .xlsx, .xls, .csv<br />
                    Max file size: 15mb
                  </div>
                  <button 
                    onClick={() => triggerSuccess("Download Template Berhasil", "Template_Bulk_Invitation.xlsx telah diunduh")}
                    className="px-4 py-2 rounded-xl border border-[#016DB2] text-[#016DB2] hover:bg-sky-50 text-xs font-bold cursor-pointer"
                  >
                    Download Template
                  </button>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3 bg-slate-50/50">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#016DB2] flex items-center justify-center">
                    <CloudUpload className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-slate-600">
                    Drop your document here<br />
                    or <span className="text-[#016DB2] font-bold cursor-pointer hover:underline">browse your file</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">User Invitation List.xlsx</div>
                      <div className="text-[11px] text-slate-400">2.4 MB</div>
                    </div>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
                    Change File
                  </button>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setBulkStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Informasi NIPP</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
                    {[
                      { id: 1, label: "NIPP Siap Disimpan", count: "20 / 100" },
                      { id: 2, label: "NIPP Terdaftar di Portaverse", count: "20 / 100" },
                      { id: 3, label: "NIPP yang tidak ada di MDM", count: "20 / 100" },
                      { id: 4, label: "NIPP menunggu approval admin", count: "20 / 100" },
                      { id: 5, label: "NIPP menunggu pembuatan Password", count: "20 / 100" }
                    ].map(card => (
                      <div
                        key={card.id}
                        onClick={() => setBulkActiveCategory(card.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          bulkActiveCategory === card.id
                            ? "bg-sky-50 border-[#016DB2] shadow-xs"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="text-[11px] font-semibold text-slate-600 leading-snug">{card.label}</div>
                        <div className="text-lg font-black text-slate-900 mt-2">{card.count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-800">Daftar NIPP Siap disimpan</div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cari disini"
                        className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                        <tr>
                          <th className="p-3">NIPP</th>
                          <th className="p-3">NAMA</th>
                          <th className="p-3">EMAIL</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {[
                          { nipp: "111002321", name: "Harya Pravidya Putrarendani", email: "haryapravidya@ilcs.co.id" },
                          { nipp: "111002322", name: "Raditya Satyatama", email: "raditya@ilcs.co.id" },
                          { nipp: "111002323", name: "Afif Tahjudin", email: "afiftahjudin@ilcs.co.id" },
                          { nipp: "111002325", name: "Demas Bermani", email: "demas.bermani@ilcs.co.id" },
                          { nipp: "111002328", name: "Amanda Nadjwa", email: "amanda.nadjwa@ilcs.co.id" }
                        ].map(row => (
                          <tr key={row.nipp} className="hover:bg-slate-50">
                            <td className="p-3 font-mono font-semibold text-slate-900">{row.nipp}</td>
                            <td className="p-3 font-bold text-slate-800">{row.name}</td>
                            <td className="p-3 text-[#016DB2] font-medium">{row.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setBulkStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setConfirmBulkSubmit(true)}
                    className="px-6 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 19. Modal Confirm Bulk Submit */}
      {confirmBulkSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
            <p className="text-xs text-slate-600">
              Apakah anda yakin untuk Bulk Invitation ini?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmBulkSubmit(false)}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  setConfirmBulkSubmit(false);
                  setShowBulkModal(false);
                  triggerSuccess("Sukses bulk invitation list", "100 data user telah diproses ke dalam antrean invitation.");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 20. Modal Confirm Simpan Role Baru */}
      {confirmSaveRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900">Konfirmasi</h3>
            <p className="text-xs text-slate-600">
              Apakah anda yakin untuk Menyimpan Metrics Role ini?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmSaveRoleModal(false)}
                className="px-5 py-2.5 rounded-xl border border-[#016DB2] text-[#016DB2] hover:bg-sky-50 text-xs font-bold cursor-pointer"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={() => {
                  setConfirmSaveRoleModal(false);
                  setRoleMasters([
                    {
                      id: `RM-${Date.now()}`,
                      namaRole: `${tambahRoleForm.tipeRole}_Custom`,
                      deskripsiRole: tambahRoleForm.deskripsi,
                      menu: tambahRoleForm.activeMenuDetail,
                      tipeRole: tambahRoleForm.tipeRole
                    },
                    ...roleMasters
                  ]);
                  setPageView("list");
                  triggerSuccess("Sukses Menyimpan Metrics Role Baru", "Role baru telah ditambahkan ke dalam Master Role.");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#016DB2] hover:bg-[#00558c] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL SUCCESS POPUP DIALOG */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs pointer-events-none">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{successModal.title}</h3>
            {successModal.subtitle && (
              <p className="text-xs text-slate-500">{successModal.subtitle}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
