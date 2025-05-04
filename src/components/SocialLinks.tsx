import { Github, Linkedin, Mail, User, Instagram, Twitter, Phone } from 'lucide-react';

const SocialLinks = () => {
  const links = [
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="w-5 h-5" />, 
      url: 'https://www.linkedin.com/in/atharva-harane-367930285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', 
      color: 'bg-[#0077B5]' 
    },
    { 
      name: 'GitHub', 
      icon: <Github className="w-5 h-5" />, 
      url: 'https://github.com/Atharva12072004', 
      color: 'bg-[#333]' 
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: 'mailto:atharvaharane1272004@gmail.com',
      color: 'bg-[#EA4335]'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram className="w-5 h-5" />, 
      url: 'https://www.instagram.com', 
      color: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' 
    },
    { 
      name: 'X', 
      icon: <Twitter className="w-5 h-5" />, 
      url: 'https://x.com/AtharvaHarane?t=YjHlUq82RiF_kMOG8xTofw&s=09', 
      color: 'bg-[#1DA1F2]' 
    },
    {
      name: 'Phone',
      icon: <User className="w-5 h-5" />, // You can change this icon if you prefer
      url: 'tel:+918010098690', // Replace with your actual number
      color: 'bg-[#10B981]'
    } 
  ];

  return (
    <div className="flex space-x-4">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.color} text-white p-3 rounded-full hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
