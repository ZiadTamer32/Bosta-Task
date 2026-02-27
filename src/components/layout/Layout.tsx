import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]">
      <Header />
      <main className="flex-1 pt-16">
        <div className="page-enter">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
