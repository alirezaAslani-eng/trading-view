"use client";

import PageHeader from "@/components/common/Appbar/PageHeader";
import FastTradePanel from "@/components/template/FastTrade/FastTradePanel";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import { Box } from "@mui/material";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="خرید آسان"
          subtitle="خرید سریع و آسان محصولات"
        />
      </Header>
      <Main>
        <Section>
          <SectionContent sx={{ alignItems: "stretch" }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <FastTradePanel />
            </Box>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
