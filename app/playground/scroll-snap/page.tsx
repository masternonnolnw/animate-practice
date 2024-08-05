"use client";

import { motion } from "framer-motion";

const ScrollSnapPage = () => {
  return (
    <div className="w-full min-h-screen snap-y snap-mandatory max-h-[100svh] overflow-y-auto">
      <div className="flex w-full relative min-h-[100svh] justify-center items-center bg-red-400 snap-center snap-always">
        1
      </div>
      <div className="flex w-full relative min-h-[100svh] justify-center items-center bg-blue-400 snap-center snap-always">
        2
        <motion.div
          className="absolute left-0 bottom-0 h-[400px] w-[200px] bg-slate-50"
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: 1, x: 0 }}
        />
      </div>
    </div>
  );
};

export default ScrollSnapPage;
