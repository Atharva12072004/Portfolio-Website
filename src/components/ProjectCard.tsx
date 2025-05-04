import React from 'react';

interface Props {
  title: string;
  description: string;
  techUsed: string;
  link: string;
  image: string;
}

const ProjectCard: React.FC<Props> = ({ title, description, techUsed, link, image }) => {
  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-portfolio-blue mb-2">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{description}</p>
        {techUsed && (
          <p className="text-xs text-gray-500 mb-4">
            <strong>Tech Used:</strong> {techUsed}
          </p>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-portfolio-blue text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
