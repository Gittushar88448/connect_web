import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { AuthProvider } from "@/components/auth/authProvider";
import { ACCESS_TOKEN_COOKIE, ACCESS_USER_PROFILE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants";


const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk', // Optional: for Tailwind CSS CSS variables
  display: 'swap',
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

  const accessToken =
    cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  const refreshToken =
    cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  const userProfileCookie =
    cookieStore.get(ACCESS_USER_PROFILE)?.value;

  let initialUser = null;

  if (userProfileCookie) {
    try {
      initialUser = JSON.parse(
        userProfileCookie
      );
    } catch {
      initialUser = null;
    }
  }

  const hasSession =
    !!accessToken ||
    !!refreshToken &&
    !!initialUser;

  return (
    <html lang="en">
      <body>
        <AuthProvider
          initialUser={hasSession ? initialUser : null}
          initialHasSession={hasSession}
        >
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}