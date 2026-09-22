import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authProvider";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { VisitorTracker } from "@/components/analytics/visitor-tracker";

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
    default: "KapsInfos — Custom software, IoT services, help desk support, and prebuilt automation modules — CRM, HR, notifications, and AI — deployed services and supported by an engineering team that stays on.",
    template: "%s — KapsInfos",
  },
  description:
    "Custom software, IoT services, help desk support, and prebuilt automation modules — CRM, HR, notifications, and AI — deployed and supported by an engineering team that stays on.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <AuthProvider
          initialUser={
            user && {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              account: user.account,
              userStatus: user.userStatus,
              coinBalance: user.coinBalance,
              image: user.image,
            }
          }
          initialHasSession={Boolean(user)}
        >
          <VisitorTracker/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}