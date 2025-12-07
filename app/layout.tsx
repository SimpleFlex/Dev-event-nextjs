import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import LightRays from "../components/lightRays";
import "./globals.css";
import NavBar from "@/components/navBar";

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-Schibsted-Grotesk",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-Martian-Mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Feast App",
  description: "Built by primo.eth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SchibstedGrotesk.variable} ${MartianMono.variable} antialiased`}
      >
        <NavBar />
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ff0000"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
