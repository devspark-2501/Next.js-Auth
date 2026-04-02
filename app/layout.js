import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "NextAuth.js Auth",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900">
        
        <SessionWrapper>
          <div>
            
            <NavBar />

              {children}

          </div>
        </SessionWrapper>

      </body>
    </html>
  );
}