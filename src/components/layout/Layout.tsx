"use client";

import { AppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { NAVIGATION } from "../shared/Navigation";
import { LinearProgress } from "@mui/material";
import React, { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<LinearProgress />}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          title: "Sabbir",
          homeUrl: "/",
        }}
      >
        <DashboardLayout>{children}</DashboardLayout>
      </AppProvider>
    </Suspense>
  );
}
