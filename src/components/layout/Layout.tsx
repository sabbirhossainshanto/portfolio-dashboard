"use client";

import { AppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { NAVIGATION } from "../shared/Navigation";

interface LayoutProps {
  window?: () => Window;
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { window } = props;
  const layoutWindow = window !== undefined ? window() : undefined;
  return (
    <AppProvider navigation={NAVIGATION} window={layoutWindow}>
      <DashboardLayout>{props.children}</DashboardLayout>
    </AppProvider>
  );
}
