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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#071527] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 aspect-video flex flex-col justify-center items-center text-white"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 hover:text-[#00e5ff] transition-colors"
            >
              <X size={20} />
            </button>

            {/* Video preview / playback placeholder with luxury animation */}
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#050e1b] via-[#071527] to-[#0a1d35] p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#0284c7] text-[#050e1b] flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/30 cursor-pointer"
              >
                <Play size={32} className="ml-1 fill-[#050e1b]" />
              </motion.div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Rejubliss 3D Animation Studios Showreel
              </h3>
              <p className="text-slate-300 max-w-md text-sm md:text-base">
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
