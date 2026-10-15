import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Condiciones from "@/components/Condiciones";
import Productos from "@/components/Productos";
import Barberos from "@/components/Barberos";
import Resenas from "@/components/Resenas";
import Beneficios from "@/components/Beneficios";
import Ubicacion from "@/components/Ubicacion";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import MisCitasModal from "@/components/MisCitasModal";
import CompartirModal from "@/components/CompartirModal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Condiciones />
        <Productos />
        <Barberos />
        <Resenas />
        <Beneficios />
        <Ubicacion />
      </main>
      <Footer />

      {/* Global Modals */}
      <BookingModal />
      <MisCitasModal />
      <CompartirModal />
    </>
  );
}
