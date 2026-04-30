import PageHeader from "@/components/common/Appbar/PageHeader";
import TotalAssetCard from "@/components/template/Card/TotalAssetCard";
import ExchangeAssetForm from "@/components/template/Form/ExchangeAssetForm";
import PanelContainer from "@/components/ui/Layout/PanelContainer";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { Box, Grid } from "@mui/material";
import React from "react";

function page() {
  return (
    <PanelContainer>
      <PageHeader title="دارایی‌ها" subtitle="نمای کلی سرمایه و سفارشات" />
      <main>
        <Box sx={{ mt: "41px", display: "flex", gap: "24px" }}>
          {/* // * ----start------- Total Asset ----------- */}
          <PanelPaper sx={{ p: "20px 16px 31px 16px", flex: "1 1 698px" }}>
            <TotalAssetCard />
          </PanelPaper>
          {/* // * ----end------- Total Asset ----------- */}

          {/* // * -----start------ Exchange Asset ----------- */}
          <PanelPaper sx={{ p: "20px 16px 11px 16px", flex: "1 1 378px" }}>
            <ExchangeAssetForm />
          </PanelPaper>
          {/* // * -----end------ Exchange Asset ----------- */}
        </Box>
      </main>
    </PanelContainer>
  );
}

export default page;
