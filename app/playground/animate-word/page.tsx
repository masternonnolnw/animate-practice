"use client";

import { Button } from "@/components/ui/button";
import { animate, AnimatePresence, motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Example() {
  const targetNumber = 100;
  const [number, setNumber] = useState(0);

  useEffect(() => {
    animate(0, targetNumber, {
      onUpdate: (latest) => {
        setNumber(parseInt(latest.toFixed(0)));
      },
      duration: 5,
      type: "keyframes",
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-[100svh] bg-gray-900 items-center justify-center gap-2">
      <span className="text-7xl text-white">{number}</span>
    </div>
  );
}
