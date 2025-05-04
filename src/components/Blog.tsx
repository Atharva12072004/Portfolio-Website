import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const SHEET_ID = '1kt25oPltiKO6hqA9qYSRFe6IegGdJ6yvFdt4LlU9do8';

type BlogEntry = {
  Title: string;
  Summary: string;
  Link: string;
  Date: string;
  Image: string;
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/Blog`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: BlogEntry[] = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-20">Loading blog posts...</div>;
  if (error) return <div className="text-center text-red-600 py-20">Error: {error}</div>;

  return (
    <section id="blog" className="section-padding bg-white dark:bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-portfolio-darkGray dark:text-white">
          Recent <span className="text-portfolio-blue">Articles</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-slate-700"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.Image}
                  alt={post.Title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-portfolio-darkGray dark:text-white">
                  {post.Title}
                </CardTitle>
                <CardDescription className="text-portfolio-gray dark:text-gray-300">
                  {post.Date}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-portfolio-gray dark:text-gray-300">{post.Summary}</p>
              </CardContent>

              <CardFooter>
                <a href={post.Link} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="text-portfolio-blue hover:text-portfolio-darkBlue">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read More
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
