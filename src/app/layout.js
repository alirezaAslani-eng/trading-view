import { ThemeProvider } from "@/context/app/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { theme } from "@/packages/mui/theme";
import { CssBaseline } from "@mui/material";
import IranYekanMedium from "@/constant/app/nextjsFont/IranYekan-Medium";
import IranYekanDemibold from "@/constant/app/nextjsFont/IranYekan-Demibold";
import IranYekanRegular from "@/constant/app/nextjsFont/IranYekan-Regular";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${IranYekanMedium.variable} ${IranYekanDemibold.variable} ${IranYekanRegular.variable}`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
