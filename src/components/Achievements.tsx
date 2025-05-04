// components/Achievements.tsx

import React, { useEffect, useState } from 'react';
import AchievementCard from './AchievementCard';

const SHEET_ID = '1kt25oPltiKO6hqA9qYSRFe6IegGdJ6yvFdt4LlU9do8';

interface Achievement {
  title: string;
  description: string;
  position: string;
  image: string;
  date: string;
  link: string;
}

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/Achievements`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Record<string, string>[] = await res.json();
        const formatted: Achievement[] = data.map(item => ({
          title: item.Certificate || '',
          description: item.Competition || '',
          position: item.Position || '',
          image: item.Image || '',
          date: item.Date || '',
          link: item.Link || '',
        }));
        setAchievements(formatted);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError(err instanceof Error ? err.message : 'Failed to load achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) return <div className="text-center py-20">Loading achievements...</div>;
  if (error) return <div className="text-center text-red-600 py-20">{error}</div>;

  return (
    <section id="achievements" className="section-padding bg-gray-50 dark:bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-portfolio-darkGray dark:text-white">
          My <span className="text-portfolio-blue">Achievements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((ach, idx) => (
            <AchievementCard key={idx} {...ach} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
