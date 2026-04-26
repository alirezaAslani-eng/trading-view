import PageHeader from "@/components/common/Appbar/PageHeader";
import { Box } from "@mui/material";
import React from "react";

function page() {
  return (
    <Box sx={{ px: "28px" }}>
      <PageHeader title="دارایی‌ها" subtitle="نمای کلی سرمایه و سفارشات" />
    </Box>
  );
}

export default page;
