"use client";

import React from "react";
import { motion } from "framer-motion";
import { link } from "fs";
import { title } from "process";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Features = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white"
    >
      <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-12 w-full sm:w-2/3 mx-auto"
        >
          Quickly find your perfect home and car with our AI-powered search and
          recommendation engine
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-12 xl:gap-16 gap-8">
          {[0, 1, 2].map((index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                imageSrc={`/landing-search${3 - index}.png`}
                title={
                  [
                    "trustworthy and reliable listings",
                    "Browse Rentals with Confidence",
                    "Simple and Efficient Search",
                  ][index]
                }
                description={
                  [
                    "Discover verified listings with transparent reviews and ratings from previous tenants, ensuring you find a trustworthy home or car rental.",
                    "get access to user reviews and ratings to make informed decisions about your next rental property or vehicle.",
                    "find trustworthy listings quickly with our user-friendly interface and advanced filtering options.",
                  ][index]
                }
                linkText={
                  ["explore homes", "Discover", "start searching"][index]
                }
                linkHref={["/explore", "/discover", "/search"][index]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}) => (
  <div className="text-center">
    <div className="p-4 rounded-lg mb-4 flex items-center justify-center h-48">
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={400}
        className="w-full object-contain h-full"
      />
    </div>

    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="mb-4">{description}</p>
    <Link
      href={linkHref}
      className="inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
      scroll={false}
    >
      {linkText}
    </Link>
  </div>
);

export default Features;
