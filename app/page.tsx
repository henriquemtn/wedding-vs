import Countdown from "@/components/countdown";
import { HeroVideo } from "@/components/hero-video";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";


export default function Home() {
  return (
    <div className="bg-[#F1EDEC] min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center h-80">
          <h3 className="text-[#755955] text-6xl tangerine-bold">Vitor & Sharon</h3>
          <p></p>
          <div className="h-[1px] w-full bg-[#755955]" />
        </div>

        <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
          <div className="flex flex-col justify-start w-full md:w-1/2">
            <h3 className="text-[#755955] mb-4 text-sm">SOBRE O EVENTO</h3>
            <h2 className="text-black text-2xl mb-2">O Casamento será realizado no Sitio Vitória</h2>
            <Countdown />
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center">
                <CalendarIcon className="text-[#755955] size-6 mr-4" />
                <span className="text-black text-sm">22 DE FEVEREIRO DE 2025</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="text-[#755955] size-6 mr-4" />
                <span className="text-black text-sm">13:00</span>
              </div>
              <div className="flex items-center">
                <div className="w-[40px] pr-4">
                  <MapPinIcon className="text-[#755955] size-6" />
                </div>
                <span className="text-black text-sm">Rua Alfredo João Fermiano, 667 - Fundos, Biguaçu - SC, 88161-283</span>
              </div>
            </div>
          </div>
          <HeroVideo />
        </div>
      </div>
    </div>
  );
}
