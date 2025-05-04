import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';

// Replace with your actual spreadsheet ID
const SHEET_ID = '1kt25oPltiKO6hqA9qYSRFe6IegGdJ6yvFdt4LlU9do8';

type CertificationEntry = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
};

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        
        const res = await fetch(
          `https://opensheet.elk.sh/${SHEET_ID}/Certifications`
        );
        
        const text = await res.text();
        
        const json = JSON.parse(text);
        

        // If the sheet returns key-value rows, ensure correct headers
        if (Array.isArray(json) && json.length > 0 && 'Field' in json[0]) {
          throw new Error(
            'Certifications sheet returned Field/Value rows. Please ensure this tab has headers: title, issuer, date, image, link.'
          );
        }

        if (!Array.isArray(json)) {
          throw new Error('Unexpected JSON format for Certifications');
        }

        const data: CertificationEntry[] = json.map((item: any) => ({
          title: item.title || item.Title || '',
          issuer: item.issuer || item.Issuer || '',
          date: item.date || item.Date || '',
          image: item.image || item.Image || '',
          link: item.link || item.Link || '',
        }));

        setCertifications(data);
      } catch (err) {
        console.error('Error fetching certifications:', err);
        setError(err instanceof Error ? err.message : 'Failed to load certifications');
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) return <div className="text-center py-20">Loading certifications...</div>;
  if (error) return <div className="text-center text-red-600 py-20">Error: {error}</div>;

  return (
    <section id="certifications" className="section-padding bg-white dark:bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-portfolio-darkGray dark:text-white">
          Professional <span className="text-portfolio-blue">Certifications</span>
        </h2>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {certifications.map((cert, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
                    {/* Image container */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Hover overlay with info */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold text-lg">{cert.title}</h3>
                        <p className="text-gray-200">{cert.issuer}</p>
                        <p className="text-sm text-gray-300">{cert.date}</p>
                      </div>
                    </div>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center mt-6 gap-2">
            <CarouselPrevious className="static translate-y-0 mr-2" />
            <CarouselNext className="static translate-y-0 ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Certifications;
