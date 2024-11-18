// RootLayout.js
import Navigation from "./component/navigation/navbar";
import { StoreProvider } from "./context/StoreProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "basic ecommerce",
  description: "ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${inter.className} h-screen overflow-hidden`}>
          <Navigation />
          <div className="h-[calc(100vh-3rem)] overflow-y-auto">{children}</div>
        </body>
      </StoreProvider>
    </html>
  );
}
