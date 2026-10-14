import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { JawabotWidget } from "@/components/JawabotWidget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
      <MobileCta />
      <JawabotWidget />
    </>
  );
}
