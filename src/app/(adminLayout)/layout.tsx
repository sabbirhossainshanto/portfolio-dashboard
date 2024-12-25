import Layout from "@/src/components/layout/Layout";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
};

export default layout;
