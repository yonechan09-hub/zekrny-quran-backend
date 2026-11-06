import type { Metadata } from "next";
export const metadata: Metadata = { title: "Zekrny Quran API", description: "Private Quran Foundation API proxy" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
