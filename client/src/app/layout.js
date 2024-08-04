import { Merriweather } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"]
});

export const metadata = {
  title: "Teologia com Limonada",
  description: "Homepage do blog",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={merriweather.className}>
        <div className="min-h-screen flex flex-col">
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
