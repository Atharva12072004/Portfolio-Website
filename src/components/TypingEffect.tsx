import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const roles = ['Computer Engineer','Data Analyst', 'Data Scientist Enthusiast', 'Frontend Developer'];

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const currentRole = roles[index];

    if (!isDeleting && subIndex === currentRole.length) {
      setPause(true);
      setTimeout(() => {
        setIsDeleting(true);
        setPause(false);
      }, 1000); // pause after full word typed
      return;
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    if (pause) return;

    const timeout = setTimeout(() => {
      const nextSubIndex = subIndex + (isDeleting ? -1 : 1);
      setText(currentRole.substring(0, nextSubIndex));
      setSubIndex(nextSubIndex);
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, pause]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h2 className="text-2xl md:text-3xl font-medium text-gray-200 mb-6">
        {text}
        <span className="border-r-2 border-white animate-pulse ml-1" />
      </h2>
    </motion.div>
  );
};

export default TypingEffect;
