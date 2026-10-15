import type { Metadata } from "next";
import { Inter, Oswald, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";
import { BUSINESS } from "@/data/barbershop-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const kaushan = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kaushan",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BUSINESS.name} | Reserva tu cita`,
  description:
    "Corte de cabello, corte de barba, manicura y combos en Quality Barber Shop. Reserva tu cita en línea en minutos.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${oswald.variable} ${kaushan.variable} antialiased`}
    >
      <body className="min-h-full bg-bg text-ink relative">
        <BookingProvider>
          {/* Ambient Aurora glow */}
          <div aria-hidden="true" className="aurora-field">
            <div className="aurora-blob aurora-blob--brown" />
            <div className="aurora-blob aurora-blob--gold" />
            <div className="aurora-blob aurora-blob--wine" />
          </div>

          <div className="relative z-10">{children}</div>
        </BookingProvider>
      </body>
    </html>
  );
}
