import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";
import DashboardSideDrawer from "@/components/DashboardSideDrawer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EV Dashboard",
  description: "Analyze EV data",
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
          <div className="w-full flex flex-col lg:flex-row h-full overflow-y-auto mb-10">
            <div className=" lg:hidden absolute z-50">
              <DashboardSideDrawer />
            </div>
            <div className=" flex-1 relative h-dvh w-dvw">
              <Navbar />
              {children}
            </div>
          </div>
          <ThemeSwitch />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
