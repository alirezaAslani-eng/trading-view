import PageHeader from "@/components/common/Appbar/PageHeader";
import PanelContainer from "@/components/ui/Layout/PanelContainer";
import { Box } from "@mui/material";
import React from "react";

function page() {
  return (
    <main>
      <PanelContainer>
        <PageHeader title="دارایی‌ها" subtitle="نمای کلی سرمایه و سفارشات" />
      </PanelContainer>
    </main>
  );
}

export default page;
