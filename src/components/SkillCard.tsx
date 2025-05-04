import React from 'react';

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  level: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, level }) => (
  <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-portfolio-darkGray dark:text-white">
      {name}
    </h3>
    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 mt-2 overflow-hidden">
      <div
        className="bg-portfolio-blue h-2 rounded-full"
        style={{ width: `${level}%` }}
      ></div>
    </div>
    <span className="mt-1 text-sm text-portfolio-darkGray dark:text-white">
      {level}%
    </span>
  </div>
);

export default SkillCard;
