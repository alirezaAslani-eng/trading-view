import PageHeader from "@/components/common/Appbar/PageHeader";
import TotalAssetCard from "@/components/template/Card/TotalAssetCard";
import PanelContainer from "@/components/ui/Layout/PanelContainer";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { Box } from "@mui/material";
import React from "react";

function page() {
  return (
    <PanelContainer>
      <PageHeader title="دارایی‌ها" subtitle="نمای کلی سرمایه و سفارشات" />
      <main>
        <Box sx={{ mt: "41px" }}>
          <PanelPaper sx={{ p: "20px 16px 31px 16px", width: "698px" }}>
            <TotalAssetCard />
          </PanelPaper>
        </Box>
      </main>
    </PanelContainer>
  );
}

export default page;
