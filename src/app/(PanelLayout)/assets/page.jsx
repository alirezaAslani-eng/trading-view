import PageHeader from "@/components/common/Appbar/PageHeader";
import TotalAssetCard from "@/components/template/Card/TotalAssetCard";
import ExchangeAssetForm from "@/components/template/Form/ExchangeAssetForm";
import PanelContainer from "@/components/ui/Layout/PanelContainer";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { Box, Typography } from "@mui/material";

import AssetCartTable from "@/components/template/Table/AssetCartTable";
import OpenBuysTable from "@/components/template/Table/OpenBuysTable";
import BuySellQueueCard from "@/components/template/Card/BuySellQueueCard";
const section_shared_sx = { mt: "50px" };
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
        {/* // * ----- Table ----- */}
        <Box sx={section_shared_sx}>
          <Typography variant="h6" sx={{ color: "text.heading" }}>
            {"لیست دارایی کالا"}
          </Typography>
          <Box sx={{ mt: "15px" }}>
            <AssetCartTable />
          </Box>
        </Box>

        {/* // * ----- Table ----- */}
        <Box sx={section_shared_sx}>
          <Typography variant="h6" sx={{ color: "text.heading" }}>
            {"لیست سفارشات باز"}
          </Typography>
          <Box
            sx={{
              mt: "15px",
              display: "flex",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            <Box sx={{ width: "75.90%" }}>
              <OpenBuysTable />
            </Box>

            <Box sx={{ width: "21.90%" }}>
              <BuySellQueueCard />
            </Box>
          </Box>
        </Box>
      </main>
    </PanelContainer>
  );
}

export default page;
