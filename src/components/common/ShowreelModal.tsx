"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-cyan-200 aspect-video flex flex-col justify-center items-center text-[#071527]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 hover:text-[#00A3E0] transition-colors border border-slate-200"
            >
              <X size={20} />
            </button>

            {/* Video preview / playback placeholder with luxury animation */}
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-cyan-50/90 via-white to-sky-100/70 p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00A3E0] to-[#0284c7] text-white flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/25 cursor-pointer"
              >
                <Play size={32} className="ml-1 fill-white text-white" />
              </motion.div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-[#071527]">
                Rejubliss 3D Animation Studios Showreel
              </h3>
              <p className="text-slate-600 max-w-md text-sm md:text-base">
                Discover our award-winning 3D product animations, photorealistic CGI, and
                interactive WebGL digital experiences.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
