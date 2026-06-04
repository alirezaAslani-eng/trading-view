import { ThemeProvider } from "@/context/app/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Box, CssBaseline } from "@mui/material";
import IranYekanMedium from "@/constant/app/nextjsFont/IranYekan-Medium";
import IranYekanDemibold from "@/constant/app/nextjsFont/IranYekan-Demibold";
import IranYekanRegular from "@/constant/app/nextjsFont/IranYekan-Regular";
import { PWC } from "@/types/utils";
import { QueryClientProvider } from "@/packages/react-query";
import { ReduxProvider } from "@/packages/redux";
import { Toaster } from "@/packages/react-hot-toast";

export default function RootLayout({ children }: PWC) {
  return (
    <QueryClientProvider>
      <ReduxProvider>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <CssBaseline />
            <html lang="fa" dir="rtl">
              <Box
                component={"body"}
                sx={{ minHeight: "100svh" }}
                className={`${IranYekanMedium.variable} ${IranYekanDemibold.variable} ${IranYekanRegular.variable}`}
              >
                {children}
                <Toaster />
              </Box>
            </html>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
