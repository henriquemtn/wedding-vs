"use client"

import Countdown from "@/components/countdown";
import { HeroVideo } from "@/components/hero-video";
import LeafIcon from "@/components/ui/icons/leaf";
import { CalendarIcon, ClockIcon, HomeIcon, MapPinIcon, ShirtIcon, SprayCanIcon } from 'lucide-react';
import VitorSharonImage from "@/public/images/91943.jpg";
import Image from "next/image";
import { LeafDivider } from "@/components/leaf-divider";
import { GiftRegistry } from "@/components/gift-registry";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-[#F1EDEC] min-h-screen">
      <div className="container mx-auto px-4">
        <div id="home" className="pt-4 md:pt-8">
          <section className="relative mb-12">
            <div className="absolute inset-0 bg-black/40 rounded-md"></div>
            <Image
              alt="hero-image"
              src={VitorSharonImage}
              className="w-full h-[440px] object-cover rounded-md"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-6xl md:text-8xl tangerine-bold mb-2 drop-shadow-lg">Vitor & Sharon</h3>
              <div className="flex gap-4 items-center">
                <LeafIcon className="size-4 text-yellow-500 -scale-x-100" />
                <h2 className="text-white text-base md:text-xl drop-shadow-md">22 de Fevereiro de 2025</h2>
                <LeafIcon className="size-4 text-yellow-500" />
              </div>
            </motion.div>
          </section>
        </div>

        <LeafDivider />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          id="local" className="flex flex-col gap-8 md:flex-row justify-between items-start py-12">
          <div
            className="flex flex-col justify-start w-full md:w-1/2">
            <h3 className="text-[#755955] mb-4 text-sm font-semibold tracking-wider">SOBRE O EVENTO</h3>
            <h2 className="text-black text-3xl mb-6 font-light">O Casamento será no Sitio Vitória</h2>
            <Countdown />
            <ul className="flex flex-col gap-6 mt-8">
              <li className="flex items-center">
                <div className="flex items-center size-10">
                  <CalendarIcon className="text-[#755955] size-6 mr-4" />
                </div>
                <span className="text-black text-sm">22 de Fevereiro de 2025</span>
              </li>
              <li className="flex items-center">
                <div className="flex items-center size-10">
                  <ClockIcon className="text-[#755955] size-6 mr-4" />
                </div>
                <span className="text-black text-sm">Horário da Cerimônia terá início às 16:00, recomendado chegar até 15:45</span>
              </li>
              <li className="flex items-center">
                <div className="flex items-center size-10">
                  <MapPinIcon className="text-[#755955] size-6 mr-4" />
                </div>
                <span className="text-black text-sm">Rua Alfredo João Fermiano, 667 - Fundos, Biguaçu - SC, 88161-283</span>
              </li>
              <li className="flex items-center">
                <div className="flex items-center size-10">
                  <ShirtIcon className="text-[#755955] size-6 mr-4" />
                </div>
                <span className="text-black text-sm">Traje esporte fino</span>
              </li>
              <li className="flex items-center">
                <div className="flex items-center size-10">
                  <SprayCanIcon className="text-[#755955] size-6 mr-4" />
                </div>
                <span className="text-black text-sm">Uso de repelente é recomendado</span>
              </li>
              <li className="flex items-center">
                <div className="flex items-center size-10">
                  <HomeIcon className="text-[#755955] size-6 mr-4" />
                </div>
                <span className="text-black text-sm">Quem precisar se hospedar em um dos chalés, recomendamos fazer a reserva com antecedência</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-full md:w-1/2 mt-8 md:mt-0">
            <HeroVideo />
            <iframe className="rounded-md mt-4" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.6383243361847!2d-48.6644217!3d-27.5116214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95274c43f2404351%3A0x66992607a1199b04!2sS%C3%8DTIO%20VIT%C3%93RIA%20-%20Local%20para%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1735788234942!5m2!1spt-BR!2sbr" width="100%" height="125" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </motion.section>

        <LeafDivider />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          id="moments" className="py-12">
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
        </motion.section>

        <LeafDivider />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          id="gift" className="py-12 mb-12">
          <GiftRegistry />
        </motion.section>
      </div>
    </div>
  );
}

