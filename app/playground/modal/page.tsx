"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import useMeasure from "react-use-measure";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PlaygroundPage = () => {
  const [showBasketBall, setShowBasketBall] = useState(true);

  return (
    <div className="w-full bg-white min-h-screen items-center justify-center flex flex-row gap-4">
      <motion.div
        className="flex flex-col w-full max-w-[500px] items-center border rounded-md bg-slate-100 p-5 min-h-[400px]"
        layoutId="background-container"
      >
        <Button
          onClick={() => setShowBasketBall((prev) => !prev)}
          variant="outline"
        >
          {showBasketBall ? "🏀" : "⚽"}
        </Button>
      </motion.div>

      <motion.div className="flex flex-col w-full max-w-[500px] items-center border rounded-md bg-slate-100 p-5 min-h-[400px]">
        <Button variant="outline">❤️</Button>
      </motion.div>

      <AnimatePresence>
        <Dialog open={showBasketBall} onOpenChange={setShowBasketBall}>
          <DialogContent className="min-w-[90vw] min-h-[90svh] p-0 bg-transparent border-none shadow-none">
            {showBasketBall ? (
              <motion.div
                className="flex bg-slate-100 p-4 rounded"
                layoutId="background-container"
              >
                <Button
                  onClick={() => setShowBasketBall((prev) => !prev)}
                  variant="outline"
                  className="mx-auto"
                >
                  {showBasketBall ? "🏀" : "⚽"}
                </Button>
              </motion.div>
            ) : null}
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </div>
  );
};

export default PlaygroundPage;
