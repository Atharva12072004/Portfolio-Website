// components/AchievementCard.tsx

import React from 'react';

interface Props {
  title: string;
  description: string;
  position: string;
  image: string;
  date: string;
  link: string;
}

const AchievementCard: React.FC<Props> = ({ title, description, position, image, date, link }) => {
  return (
    <div className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-4 flex flex-col items-center">
      {image && (
        <div className="w-full h-[250px] overflow-hidden flex justify-center items-center rounded mb-4 bg-gray-100">
          <img
            src={image}
            alt={title}
            className="object-contain max-h-full max-w-full"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-center text-portfolio-blue mb-1">{title}</h3>
      <p className="text-sm text-center text-gray-600 dark:text-gray-300">{description}</p>
      {position && (
        <p className="text-sm text-green-600 font-medium mt-1">Position: {position}</p>
      )}
      <p className="text-xs text-gray-500 mt-1">{date}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 text-sm font-medium bg-portfolio-blue text-white rounded hover:bg-blue-600 transition"
        >
          View More
        </a>
      )}
    </div>
  );
};

export default AchievementCard;
