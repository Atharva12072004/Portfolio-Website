// src/components/Contact.tsx
import React, { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, runTransaction, onValue } from 'firebase/database';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import SocialLinks from './SocialLinks';
import VisitCounter from './VisitCounter';

// Import Lucide icons
import { Phone, Mail, MapPin } from 'lucide-react';

// --- Firebase init (only run once) ---
const firebaseConfig = {
  apiKey: 'AIzaSyCBIeH2t_e5W_JncMzP62q67VBM3Q_EC5E',
  authDomain: 'portfolio-92569.firebaseapp.com',
  databaseURL: 'https://portfolio-92569-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'portfolio-92569',
  storageBucket: 'portfolio-92569.firebasestorage.app',
  messagingSenderId: '106806193235',
  appId: '1:106806193235:web:794f23be14227edb4d2aa6'
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

const Contact: React.FC = () => {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon."
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 reveal items-stretch">

        {/* Right Column: Contact Form */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-portfolio-darkGray dark:text-white">
            Send Me a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name" name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-portfolio-blue focus:border-portfolio-blue"
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email" name="email" type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-portfolio-blue focus:border-portfolio-blue"
              />
            </div>
            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject" name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-portfolio-blue focus:border-portfolio-blue"
              />
            </div>
            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message" name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md h-32 focus:ring-portfolio-blue focus:border-portfolio-blue dark:bg-background"
              ></textarea>
            </div>
            <Button
              type="submit"
              className="bg-portfolio-blue hover:bg-portfolio-darkBlue text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

        {/* Left Column: Info + Visitor Count + Footer */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-portfolio-darkGray dark:text-white">
              Get In <span className="text-portfolio-blue">Touch</span>
            </h2>
            <p className="text-portfolio-gray dark:text-gray-300 mb-4">
              Turning complex data into actionable insights through advanced analytics and machine learning solutions.
            </p>
            <p className="text-portfolio-gray dark:text-gray-300 mb-8">
              Have a project in mind or just want to chat about data science? Feel free to reach out using the contact form or connect with me directly through social media.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-portfolio-darkGray dark:text-white">
                Connect With Me
              </h3>
              <SocialLinks />
            </div>

            {/* Contact Details with bottom margin */}
            <div className="space-y-4 mb-6">
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="bg-portfolio-blue text-white p-3 rounded-full">
                  <Phone size={16} />
                </div>
                <span className="text-portfolio-darkGray dark:text-white">
                  +91 8010098690
                </span>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="bg-portfolio-blue text-white p-3 rounded-full">
                  <Mail size={16} />
                </div>
                <span className="text-portfolio-darkGray dark:text-white">
                  atharvaharane1272004@gmail.com
                </span>
              </div>
              {/* Location */}
              <div className="flex items-center space-x-3">
                <div className="bg-portfolio-blue text-white p-3 rounded-full">
                  <MapPin size={16} />
                </div>
                <span className="text-portfolio-darkGray dark:text-white">
                  Badlapur, Mumbai
                </span>
              </div>
            </div>
          </div>

          
          {/* Visitor Counter (light: light-gray / dark: slate-800) */}
<div className="
  bg-gray-200 dark:bg-slate-800   /* <-- switch here */
  rounded-md
  w-full max-w-xs mx-auto
  mt-4 sm:mt-6
  py-1 px-2 sm:py-2 sm:px-3 md:py-3 md:px-4
">
  <VisitCounter />
</div>


          {/* Footer Reserved Line */}
          <p className="text-portfolio-gray dark:text-gray-300 mt-4 text-center">
            © {currentYear} Atharva Harane&apos;s Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
