"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

const SHEET_ID = "1kt25oPltiKO6hqA9qYSRFe6IegGdJ6yvFdt4LlU9do8";

type FieldValueRow = {
  Field: string;
  Value: string;
};

type AboutData = Record<string, string>;

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/About`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const rows: FieldValueRow[] = await res.json();
        const dataObj = rows.reduce<AboutData>((acc, { Field, Value }) => {
          acc[Field] = Value;
          return acc;
        }, {});
        setAboutData(dataObj);
      } catch (err) {
        console.error("Error fetching About data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch About data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center">Loading About...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  const description = aboutData["Description"] || "No description available.";
  const skills = aboutData["Skills"]
    ? aboutData["Skills"].split(",").map((s) => s.trim())
    : [];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="overflow-hidden rounded-full shadow-lg mx-auto md:mx-0 w-40 h-40 sm:w-60 sm:h-60 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text & Button */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-portfolio-darkGray dark:text-white">
            About <span className="text-portfolio-blue">Me</span>
          </h2>

          <p className="text-portfolio-gray dark:text-gray-300 mb-6 leading-relaxed whitespace-pre-line">
            {description}
          </p>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-portfolio-lightBlue/20 text-portfolio-blue px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* ✅ Direct Download CV Link */}
          <a
  href="./Atharva Harane CV.pdf"
  download="Atharva-Harane-CV.pdf"
  className="inline-flex items-center bg-portfolio-blue hover:bg-portfolio-darkBlue text-white font-medium px-4 py-2 rounded-md transition duration-300"
>
  <Download className="mr-2 h-4 w-4" />
  Download CV
</a>

        </div>
      </div>
    </section>
  );
};

export default About;
