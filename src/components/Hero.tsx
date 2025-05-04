
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import TypingEffect from './TypingEffect';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Smooth scroll to About section
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-portfolio-darkBlue/30 to-black/60" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-portfolio-lightBlue mb-3">
            Hello, I'm
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            ATHARVA <span className="text-portfolio-blue">HARANE</span>
          </h1>
        </motion.div>
        
        <TypingEffect />

        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Turning Data into Actionable Insights
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Button 
            size="lg" 
            className="bg-portfolio-blue hover:bg-portfolio-darkBlue text-white rounded-md px-8 py-3 text-lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
          <Button 
            size="lg"
            variant="outline" 
            className="bg-transparent hover:bg-white/10 text-white border-white rounded-md px-8 py-3 text-lg"
            onClick={scrollToAbout}
          >
            About Me
          </Button>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
        transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <ArrowDown className="h-8 w-8 text-white" />
      </motion.div>
    </section>
  );
};

export default Hero;
