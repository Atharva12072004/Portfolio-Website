import React, { useEffect, useRef, useMemo } from 'react';
import SkillCard from './SkillCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart2, PieChart, MessageCircle, Database } from 'lucide-react';

// Ensure Devicon CSS is loaded in index.html:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const baseSkills = useMemo(
    () => [
      { name: 'Python', icon: <i className="devicon-python-plain colored text-4xl" />, level: 65 },
      { name: 'SQL', icon: <i className="devicon-mysql-plain colored text-4xl" />, level: 70 },
      { name: 'Excel', icon: <BarChart2 className="w-10 h-10 text-green-600" />, level: 90 },
      { name: 'Power BI', icon: <PieChart className="w-10 h-10 text-yellow-500" />, level: 85 },
      { name: 'Machine Learning', icon: <i className="devicon-tensorflow-original colored text-4xl" />, level: 75 },
      { name: 'Data Visualization', icon: <i className="devicon-d3js-plain colored text-4xl" />, level: 80 },
      { name: 'Deep Learning', icon: <i className="devicon-pytorch-original colored text-4xl" />, level: 55 },
      { name: 'NLP', icon: <MessageCircle className="w-10 h-10 text-indigo-500" />, level: 40 },
      { name: 'Big Data', icon: <i className="devicon-apache-plain colored text-4xl" />, level: 75 },
      { name: 'Statistics', icon: <Database className="w-10 h-10 text-blue-500" />, level: 90 },
      { name: 'Data Engineering', icon: <i className="devicon-docker-plain colored text-4xl" />, level: 85 },
      { name: 'Cloud Computing', icon: <i className="devicon-googlecloud-plain colored text-4xl" />, level: 50 },
      { name: 'HTML 5', icon: <i className="devicon-html5-plain colored text-4xl" />, level: 95 },
      { name: 'CSS 3', icon: <i className="devicon-css3-plain colored text-4xl" />, level: 90 },
      { name: 'JavaScript', icon: <i className="devicon-javascript-plain colored text-4xl" />, level: 80 },
      { name: 'TailWind CSS', icon: <i className="devicon-tailwindcss-plain colored text-4xl" />, level: 90 },
      { name: 'React JS', icon: <i className="devicon-react-original colored text-4xl" />, level: 70 },
      { name: 'TypeScript', icon: <i className="devicon-typescript-original colored text-4xl" />, level: 60 },
    ],
    []
  );

  const skills = useMemo(
    () => [...baseSkills].sort((a, b) => b.level - a.level),
    [baseSkills]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-slate-900">
      <div ref={sectionRef} className="max-w-7xl mx-auto reveal">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-portfolio-darkGray dark:text-white">
          Technical <span className="text-portfolio-blue">Skills</span>
        </h2>

        {isMobile ? (
          <Carousel className="w-full">
            <CarouselContent>
              {skills.map((skill, idx) => (
                <CarouselItem key={idx} className="basis-full p-2 h-full">
                  <SkillCard name={skill.name} icon={skill.icon} level={skill.level} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {skills.map((skill, idx) => (
              <div key={idx} className="h-full">
                <SkillCard name={skill.name} icon={skill.icon} level={skill.level} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
