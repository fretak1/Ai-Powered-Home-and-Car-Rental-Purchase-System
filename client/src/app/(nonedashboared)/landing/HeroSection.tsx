"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="h-screen relative">
      <Image
        src={"/landing-splash.jpg"}
        alt="Your home and car market place"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
        >
          <div className=" max-w-4xl mx-auto px-16 sm:px-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Your Ai-Powered Home and Car Marketplace for all Ethiopian
            </h1>
            <p className="text-xl text-white mb-8">
              Explore our extensive listings of Homes and vehicles, tailored to
              your preferrences
            </p>

            <div className="flex justify-center">
              <Input
                type="text"
                value={"search query"}
                onChange={() => {}}
                placeholder="Search Your preferrence Car or Home"
                className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
              />

              <Button
                onClick={() => {}}
                className="bg-red-500 text-white rounded-none rounded-r-xl border-none hover:bg-red-600 h-12"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
