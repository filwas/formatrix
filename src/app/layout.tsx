import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { DynamicFormProvider } from "@/context/DynamicFormContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import StickerSmileyIcon from "@/components/icons/StickerSmileyIcon";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Formatrix",
  description: "Create your fantastical forms with AI!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <DynamicFormProvider>
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-50">
              <Button variant="outline"><a href="/">Formatrix</a></Button>
              <SignedOut>
                <div className="flex gap-4">
                  <Button className="min-w-36">
                    <SignInButton>Zaloguj</SignInButton>
                  </Button>
                  <Button variant="outline" className="min-w-36">
                    <SignUpButton>Zarejestruj się</SignUpButton>
                  </Button>
                </div>
              </SignedOut>
              <SignedIn>
                <Button variant="outline">
                  <a href="/forms">Panel użytkownika</a>
                </Button>
              </SignedIn>
            </header>
            <Toaster/>
            <main>{children}</main>
          </DynamicFormProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
