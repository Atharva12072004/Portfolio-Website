import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';

const SHEET_ID = '1kt25oPltiKO6hqA9qYSRFe6IegGdJ6yvFdt4LlU9do8';

interface Project {
  title: string;
  description: string;
  techUsed: string;
  link: string;
  image: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/Projects`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Record<string, string>[] = await res.json();
        const formatted: Project[] = data.map(item => ({
          title: item.Title || '',
          description: item.Description || '',
          techUsed: item['Tech Used'] || '',
          link: item.Link || '',
          image: item.Image || '',
        }));
        setProjects(formatted);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-20">Loading projects...</div>;
  if (error) return <div className="text-center text-red-600 py-20">{error}</div>;

  return (
    <section id="projects" className="section-padding bg-white dark:bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-portfolio-darkGray dark:text-white">
          Featured <span className="text-portfolio-blue">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              description={project.description}
              techUsed={project.techUsed}
              link={project.link}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
