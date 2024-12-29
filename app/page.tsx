import Countdown from "@/components/countdown";
import { HeroVideo } from "@/components/hero-video";
import LeafIcon from "@/components/ui/icons/leaf";
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import VitorSharonImage from "@/public/images/91943.jpg";
import Image from "next/image";
import { LeafDivider } from "@/components/leaf-divider";
import { GiftRegistry } from "@/components/gift-registry";

export default function Home() {
  return (
    <div className="bg-[#F1EDEC] min-h-screen">
      <div className="container mx-auto p-4">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-black/40 rounded-md"></div>
          <Image
            alt="hero-image"
            src={VitorSharonImage}
            className="w-full h-[440px] object-cover rounded-md"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-6xl md:text-8xl tangerine-bold mb-2 drop-shadow-lg">Vitor & Sharon</h3>
            <div className="flex gap-4 items-center">
              <LeafIcon className="size-4 text-yellow-500 -scale-x-100" />
              <h2 className="text-white text-base md:text-xl drop-shadow-md">22 de Fevereiro de 2025</h2>
              <LeafIcon className="size-4 text-yellow-500" />
            </div>
          </div>
        </div>

        <LeafDivider />

        <div className="flex flex-col gap-8 md:flex-row justify-between items-start">
          <div className="flex flex-col justify-start w-full md:w-1/2">
            <h3 className="text-[#755955] mb-4 text-sm font-semibold tracking-wider">SOBRE O EVENTO</h3>
            <h2 className="text-black text-3xl mb-6 font-light">O Casamento será no Sitio Vitória</h2>
            <Countdown />
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center">
                <CalendarIcon className="text-[#755955] size-6 mr-4" />
                <span className="text-black text-sm">22 DE FEVEREIRO DE 2025</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="text-[#755955] size-6 mr-4" />
                <span className="text-black text-sm">13:00</span>
              </div>
              <div className="flex items-start">
                <div className="w-[40px] pr-4 pt-1">
                  <MapPinIcon className="text-[#755955] size-6" />
                </div>
                <span className="text-black text-sm">Rua Alfredo João Fermiano, 667 - Fundos, Biguaçu - SC, 88161-283</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <HeroVideo />
          </div>
        </div>

        <LeafDivider />

        <div className="pb-12">
          <h3 className="text-[#755955] mb-4 text-sm font-semibold tracking-wider">MOMENTOS ESPECIAIS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Image
              alt="Vitor and Sharon moment 1"
              src={VitorSharonImage}
              className="w-full h-[240px] object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            <Image
              alt="Vitor and Sharon moment 2"
              src={VitorSharonImage}
              className="w-full h-[240px] object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            <Image
              alt="Vitor and Sharon moment 3"
              src={VitorSharonImage}
              className="w-full h-[240px] object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            <Image
              alt="Vitor and Sharon moment 4"
              src={VitorSharonImage}
              className="w-full h-[240px] object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        </div>

        <LeafDivider />

       <GiftRegistry />
      </div>
    </div>
  );
}

