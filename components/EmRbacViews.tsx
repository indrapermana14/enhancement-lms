"use client";

import React from "react";
import UserRoleManagementModule from "./UserRoleManagementModule";
import RoleAccessInternalModule from "./RoleAccessInternalModule";
import ReviewRequestRoleModule from "./ReviewRequestRoleModule";
import { AuditLog } from "@/lib/mockData";

interface EmRbacViewsProps {
  viewMode: "dashboard_user_role" | "role_internal" | "review_request";
  auditLogs?: AuditLog[];
  onAddAuditLog?: (log: AuditLog) => void;
}

export default function EmRbacViews({ viewMode, auditLogs = [], onAddAuditLog }: EmRbacViewsProps) {
  if (viewMode === "role_internal") {
    return (
      <RoleAccessInternalModule 
        onAddAuditLog={onAddAuditLog}
      />
    );
  }

  if (viewMode === "review_request") {
    return (
      <ReviewRequestRoleModule 
        onAddAuditLog={onAddAuditLog}
      />
    );
  }

  return (
    <UserRoleManagementModule 
      key={viewMode}
      initialViewMode={viewMode}
      onAddAuditLog={onAddAuditLog}
    />
  );
}
