import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";
import DashboardSideDrawer from "@/components/DashboardSideDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile Update App",
  description: "update profile of user",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foregroundl `}>
        <ThemeContextProvider>
          <div className="w-full flex flex-col lg:flex-row h-full overflow-y-auto">
            <div className="absolute z-50">
              <DashboardSideDrawer />
            </div>
            <div className=" flex-1 relative h-dvh w-dvw">{children}</div>
          </div>
          <ThemeSwitch />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
