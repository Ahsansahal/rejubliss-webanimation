"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code,
  PenTool,
  Film,
  Box,
  Activity,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Website Design & Development",
    description: "Modern, responsive, and high-performance websites that convert.",
    image: "/images/hero_tablet.jpg",
    icon: Code,
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Brand identities, marketing designs, and visual assets that make an impact.",
    image: "/images/graphic_design.jpg",
    icon: PenTool,
  },
  {
    id: "2d-anim",
    title: "2D Animation",
    description: "Engaging 2D animations for storytelling, explainers, and brand communication.",
    image: "/images/character_animation.jpg",
    icon: Film,
  },
  {
    id: "3d-anim",
    title: "3D Animation",
    description: "Realistic 3D animations and product visualization that bring ideas to life.",
    image: "/images/car_3d.jpg",
    icon: Box,
  },
  {
    id: "motion-design",
    title: "Motion Design",
    description: "Dynamic motion graphics and animations for digital experiences.",
    image: "/images/gold_motion.jpg",
    icon: Activity,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#faf8f5]">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-[#cba145]" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-[#cba145]">
                Our Services
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0a2920] leading-tight">
              Creative Services for Modern Brands
            </h2>
            <p className="text-[#5e6d66] text-sm sm:text-base mt-2 max-w-xl">
              From websites to animations, we bring your ideas to life with
              creativity, technology, and strategy.
            </p>
          </div>

          <Link
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0a2920] hover:text-[#cba145] transition-colors group shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight
              size={15}
              className="text-[#cba145] group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-4 sm:p-4.5 border border-[#ede8df] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container with floating icon badge */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-5 bg-[#f4efe6]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating circular icon badge */}
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-[#0a2920] text-white flex items-center justify-center shadow-md">
                      <Icon size={14} className="text-[#cba145]" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-[17px] font-bold text-[#0a2920] mb-2 leading-snug">
                    {service.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-[13px] text-[#5e6d66] leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Learn More link */}
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0a2920] group-hover:text-[#cba145] transition-colors mt-auto pt-2"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    size={13}
                    className="text-[#cba145] group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
