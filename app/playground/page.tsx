"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import useMeasure from "react-use-measure";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PlaygroundPage = () => {
  const [selectBall, setSelectBall] = useState("A");

  const TABS = ["Tab 1", "Tab 2", "Tab 3"];

  const [activeTab, setActiveTab] = useState(TABS[0]);

  const [showBasketBall, setShowBasketBall] = useState(true);

  const hideVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const [elementRef, bounds] = useMeasure();

  return (
    <div className="w-full bg-white min-h-screen items-center justify-center flex flex-col gap-4">
      <motion.div
        className="flex flex-col w-full max-w-[1000px] items-center border rounded-md bg-slate-100"
        animate={{ height: bounds.height }}
        layoutId="background-container"
      >
        <div
          className={cn(
            "flex flex-col gap-2 w-full h-fit items-center p-4",
            showBasketBall ? "min-h-[800px]" : ""
          )}
          ref={elementRef}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open in Modal</Button>
            </DialogTrigger>
            <DialogContent className="p-0">
              <motion.div
                className="bg-red-100 p-4 rounded-md"
                layoutId="background-container"
              >
                test
              </motion.div>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col gap-2">
            {TABS.map((tab) => (
              <motion.li
                layout
                className={cn(
                  "relative cursor-pointer px-2 py-1 text-sm outline-none transition-colors",
                  activeTab === tab ? "text-gray-800" : "text-gray-700"
                )}
                tabIndex={0}
                key={tab}
                onFocus={() => setActiveTab(tab)}
                onMouseOver={() => setActiveTab(tab)}
                onMouseLeave={() => setActiveTab(tab)}
              >
                {activeTab === tab ? (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-lg bg-black/5"
                  />
                ) : null}
                <span className="relative text-inherit">{tab}</span>
              </motion.li>
            ))}
          </div>

          <div className="flex flex-row justify-between w-full items-center h-[200px]">
            <motion.button
              className={cn(
                "flex w-[100px] h-[100px] bg-red-400 hover:bg-red-300 rounded-full duration-500 items-center justify-center"
              )}
              animate={{
                width: 100,
                height: selectBall === "A" ? 150 : 100,
              }}
              onFocus={() => setSelectBall("A")}
              onMouseOver={() => setSelectBall("A")}
              onMouseLeave={() => setSelectBall("A")}
            >
              {selectBall === "A" && (
                <motion.span layoutId="ball" className="text-[50px]">
                  🏀
                </motion.span>
              )}
            </motion.button>
            <motion.button
              className={cn(
                "flex bg-blue-400 hover:bg-blue-300 rounded-full duration-500 items-center justify-center"
              )}
              animate={{
                width: 100,
                height: selectBall === "B" ? 150 : 100,
              }}
              onFocus={() => setSelectBall("B")}
              onMouseOver={() => setSelectBall("B")}
              onMouseLeave={() => setSelectBall("B")}
            >
              {selectBall === "B" && (
                <motion.span layoutId="ball" className="text-[50px]">
                  ⚽
                </motion.span>
              )}
            </motion.button>
          </div>

          <Button
            onClick={() => {
              setShowBasketBall((prev) => !prev);
            }}
            variant="outline"
          >
            <AnimatePresence mode="wait" initial={false}>
              {showBasketBall ? (
                <motion.span
                  key="checkmark"
                  variants={hideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  🏀
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  variants={hideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  ⚽
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlaygroundPage;
