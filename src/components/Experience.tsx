"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../lib/motion";

export interface ExperienceEntry {
  duration: string;
  role: string;
  company: string;
  description: string;
  image: string;
  link: string;
  isLeft: boolean;
}

const Experience: React.FC = () => {
  const [experienceData, setExperienceData] = useState<ExperienceEntry[]>([]);

  const fetchExperienceData = async () => {
    try {
      const res = await fetch(
        "https://opensheet.elk.sh/1kt25oPltiKO6hqA9qYSRFe6IegGdJ6yvFdt4LlU9do8/experience"
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const formatted = data.map((item: any, i: number) => ({
        duration: item.Duration,
        role: item.Role,
        company: item.Company,
        description: item.Description,
        image: item.Image,
        link: item.Link,
        isLeft: i % 2 === 0,
      }));
      setExperienceData(formatted);
    } catch (error) {
      console.error("Error fetching experience data:", error);
    }
  };

  useEffect(() => {
    fetchExperienceData();
  }, []);

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto reveal">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div variants={textVariant(0)}>
            <p className="text-xl md:text-2xl font-semibold text-center text-portfolio-darkGray dark:text-white mb-8">
              What I have done so far
            </p>
            <h2 className="text-4xl font-bold text-center text-portfolio-darkGray dark:text-white mb-8">
              Work <span className="text-portfolio-blue">Experience</span>
            </h2>
          </motion.div>

          <div className="mt-4 relative">
            {/* center line shorter by 20px */}
            <div
              className="absolute left-1/2 w-[2px] bg-portfolio-blue/30 dark:bg-portfolio-darkBlue/30 transform -translate-x-1/2 z-0"
              style={{ top: "20px", bottom: "20px" }}
            />

            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className={`relative mb-16 flex flex-col md:flex-row items-center justify-between gap-4 ${
                  exp.isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-portfolio-blue dark:bg-portfolio-darkBlue z-20 shadow" />

                {/* Text */}
                <div
                  className={`md:w-1/2 z-10 p-4 flex ${
                    exp.isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className="max-w-lg text-right md:text-left space-y-4">
                    <h3 className="text-2xl md:text-3xl font-semibold text-portfolio-darkGray dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-lg md:text-xl text-portfolio-blue dark:text-portfolio-darkBlue font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm md:text-base text-portfolio-gray dark:text-gray-400 italic">
                      {exp.duration}
                    </p>
                    <p className="text-base md:text-lg text-portfolio-gray dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1.5 text-sm font-medium bg-portfolio-blue text-white rounded hover:bg-portfolio-blue/80 transition-colors"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div
                  className={`md:w-1/2 z-10 p-4 flex ${
                    exp.isLeft ? "justify-end" : "justify-start"
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.role}
                    className="w-full max-w-md md:max-w-lg rounded-md shadow-lg border border-portfolio-blue/20 dark:border-portfolio-darkBlue/30 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
