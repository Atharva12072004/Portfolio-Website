// src/components/TimelineItem.tsx

import React from "react";

interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  description: string;
  image: string;
  link: string;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  company,
  description,
  image,
  link,
  isLeft,
}) => {
  return (
    <div className={`flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-center gap-6`}>
      <img src={image} alt={company} className="w-16 h-16 object-cover rounded-full" />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{company}</p>
        <p className="text-sm">{description}</p>
        <p className="text-xs text-gray-400">{date}</p>
        <a href={link} className="text-blue-500 underline text-sm" target="_blank" rel="noopener noreferrer">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default TimelineItem;
