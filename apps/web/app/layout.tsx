import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

export const metadata = {
    title: 'Sector3 | F1 Live Stats',
};

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`antialiased bg-black text-white ${jetbrainsMono.variable}`}>
                {children}
            </body>
        </html>
    );
}