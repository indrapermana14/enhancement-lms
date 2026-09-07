"use client";

import React, { useState } from "react";
import Navbar, { UserRole, AppModule } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import OverviewModule from "@/components/OverviewModule";
import CertificateModule from "@/components/CertificateModule";
import TrainerModule from "@/components/TrainerModule";
import SurveyModule from "@/components/SurveyModule";
import CalendarModule from "@/components/CalendarModule";
import NotificationModule from "@/components/NotificationModule";
import BlastModule from "@/components/BlastModule";
import BlastMessageModule from "@/components/BlastMessageModule";
import RbacModule from "@/components/RbacModule";
import AssessmentManagement from "@/components/AssessmentManagement";
import LandingAssessmentModule from "@/components/LandingAssessmentModule";
import EmRbacViews from "@/components/EmRbacViews";

import CertificateModal from "@/components/CertificateModal";
import SurveyModal from "@/components/SurveyModal";
import TrainerModal from "@/components/TrainerModal";

import { 
  Certificate, 
  Trainer, 
  Survey, 
  CalendarEvent, 
  BlastItem, 
  AuditLog,
  INITIAL_CERTIFICATES, 
  INITIAL_TRAINERS, 
  INITIAL_SURVEYS, 
  INITIAL_CALENDAR, 
  INITIAL_BLAST, 
  INITIAL_AUDIT_LOGS 
} from "@/lib/mockData";

export default function HomePage() {
  // Global Role & Module State
  const [currentRole, setCurrentRole] = useState<UserRole>("Admin HO (Corpu)");
  const [currentModule, setCurrentModule] = useState<AppModule>("LMS");
  const [currentTab, setCurrentTab] = useState<string>("certificate");

  // Dynamic Data States
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [surveys, setSurveys] = useState<Survey[]>(INITIAL_SURVEYS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR);
  const [blastHistory, setBlastHistory] = useState<BlastItem[]>(INITIAL_BLAST);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Modal Dialog States
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [activeSurveyModal, setActiveSurveyModal] = useState<Survey | null>(null);
  const [activeTrainerModal, setActiveTrainerModal] = useState<Trainer | null>(null);

  // Handlers
  const handleModuleChange = (newMod: string) => {
    const mod = newMod as AppModule;
    setCurrentModule(mod);
    if (mod === "LMS") {
      setCurrentTab("certificate");
    } else if (mod === "EM") {
      setCurrentTab("blast");
    } else if (mod === "Landing Page") {
      setCurrentTab("landing_assessment_fill");
    }
  };

  const handleRoleChange = (newRole: string) => {
    const r = newRole as UserRole;
    setCurrentRole(r);
    // If currently on certificate tab, stay in LMS certificate tab!
    if (currentTab === "certificate") {
      setCurrentModule("LMS");
      return;
    }
    // Role smart-navigation
    if (r === "User") {
      if (currentModule === "LMS") {
        setCurrentTab("certificate");
      } else {
        setCurrentModule("Landing Page");
        setCurrentTab("landing_assessment_fill");
      }
    } else if (r === "Trainer") {
      setCurrentModule("LMS");
      setCurrentTab("trainer");
    } else if (r === "Vendor" || r === "Subcon") {
      setCurrentModule("LMS");
      setCurrentTab("certificate");
    }
  };

  const handleAddCertificate = (newCert: Certificate) => {
    setCertificates([newCert, ...certificates]);
  };

  const handleSyncTms = () => {
    setCertificates(certificates.map(c => ({ ...c, tms_sync_status: "Synced" })));
  };

  const handleAddTrainer = (newTrn: Trainer) => {
    setTrainers([newTrn, ...trainers]);
  };

  const handleApproveTrainer = (trainerId: string) => {
    setTrainers(trainers.map(t => t.id === trainerId ? { ...t, status_penugasan: "Tersedia" } : t));
  };

  const handleRejectTrainer = (trainerId: string) => {
    setTrainers(trainers.map(t => t.id === trainerId ? { ...t, status_penugasan: "Menunggu Approval" } : t));
  };

  const handleAddSurvey = (newSurvey: Survey) => {
    setSurveys([newSurvey, ...surveys]);
  };

  const handleSubmitSurveyResponse = (surveyId: string) => {
    setSurveys(surveys.map(s => {
      if (s.id === surveyId) {
        const nextResp = s.total_respon + 1;
        const nextPct = Math.round((nextResp / s.total_responden_target) * 1000) / 10;
        return { ...s, total_respon: nextResp, persentase: nextPct };
      }
      return s;
    }));
  };

  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents([...calendarEvents, newEvent]);
  };

  const handleAddBlast = (newBlast: BlastItem) => {
    setBlastHistory([newBlast, ...blastHistory]);
  };

  const handleAddAuditLog = (newLog: AuditLog) => {
    setAuditLogs([newLog, ...auditLogs]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Enterprise Navbar with Role & Module Selectors */}
      <Navbar 
        currentRole={currentRole} 
        onRoleChange={handleRoleChange} 
        currentModule={currentModule}
        onModuleChange={handleModuleChange}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Dynamic Sidebar */}
        <Sidebar 
          currentModule={currentModule}
          currentTab={currentTab} 
          onTabChange={setCurrentTab} 
          currentRole={currentRole}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* =================================================================
              MODUL 1: LMS (Management Certificate, Management Trainer)
             ================================================================= */}
          {currentTab === "certificate" && (
            <CertificateModule 
              currentRole={currentRole}
              onRoleChange={handleRoleChange}
            />
          )}

          {currentTab === "trainer" && (
            <TrainerModule 
              trainers={trainers}
              onSelectTrainer={setActiveTrainerModal}
              onApproveTrainer={handleApproveTrainer}
              onRejectTrainer={handleRejectTrainer}
              onAddTrainer={handleAddTrainer}
            />
          )}

          {/* =================================================================
              MODUL 2: EM (Blast, Assessment, User & Role, Role Internal, Review)
             ================================================================= */}
          {currentTab === "blast" && (
            <BlastMessageModule />
          )}

          {currentTab === "assessment_mgmt" && (
            <AssessmentManagement />
          )}

          {currentTab === "em_dashboard_user_role" && (
            <EmRbacViews 
              viewMode="dashboard_user_role"
              auditLogs={auditLogs}
              onAddAuditLog={handleAddAuditLog}
            />
          )}

          {currentTab === "em_role_akses_internal" && (
            <EmRbacViews 
              viewMode="role_internal"
              auditLogs={auditLogs}
              onAddAuditLog={handleAddAuditLog}
            />
          )}

          {currentTab === "em_review_request_role" && (
            <EmRbacViews 
              viewMode="review_request"
              auditLogs={auditLogs}
              onAddAuditLog={handleAddAuditLog}
            />
          )}

          {/* =================================================================
              MODUL 3: LANDING PAGE (Pengisian Assessment untuk User yang Di-assign)
             ================================================================= */}
          {currentTab === "landing_assessment_fill" && (
            <LandingAssessmentModule />
          )}

          {currentTab === "overview" && (
            <OverviewModule onNavigate={setCurrentTab} />
          )}

          {currentTab === "survey" && (
            <SurveyModule 
              surveys={surveys}
              onOpenSurveyModal={setActiveSurveyModal}
              onAddSurvey={handleAddSurvey}
            />
          )}

          {currentTab === "calendar" && (
            <CalendarModule 
              events={calendarEvents}
              onAddEvent={handleAddCalendarEvent}
            />
          )}

          {currentTab === "notification" && (
            <NotificationModule />
          )}

          {currentTab === "rbac" && (
            <RbacModule 
              auditLogs={auditLogs}
              onAddAuditLog={handleAddAuditLog}
            />
          )}

        </main>
      </div>

      {/* Global Modals */}
      <CertificateModal 
        certificate={previewCert}
        onClose={() => setPreviewCert(null)}
      />

      <SurveyModal 
        survey={activeSurveyModal}
        onClose={() => setActiveSurveyModal(null)}
        onSubmitResponse={handleSubmitSurveyResponse}
      />

      <TrainerModal 
        trainer={activeTrainerModal}
        onClose={() => setActiveTrainerModal(null)}
      />

    </div>
  );
}
