import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { AuthProvider } from "@/components/auth/authProvider";


const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const dataFont = JetBrains_Mono({
  variable: "--font-data",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Connect Hub — Custom software, IoT services, help desk support, and prebuilt automation modules — CRM, HR, notifications, and AI — deployed services and supported by an engineering team that stays on.",
    template: "%s — Connect Hub",
  },
  description:
    "Custom software, IoT services, help desk support, and prebuilt automation modules — CRM, HR, notifications, and AI — deployed and supported by an engineering team that stays on.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get("user_profile")?.value;
  let initialUser = null;
  if (userCookie) {
    try {
      initialUser = JSON.parse(userCookie);

    } catch (error) {
      console.error("Failed to parse user_profile cookie:", error);
    }
  }

  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${dataFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider initialUser={initialUser}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
