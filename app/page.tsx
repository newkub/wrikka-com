'use client';

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const cards = [
  {
    title: "เรียนรู้เพิ่มเติม จ่ายครั้งเดียวเข้าถึงได้ทั้งหมด",
    description: "learn.wrikka.com",
    image: "https://res.cloudinary.com/daldcdwqs/image/upload/f_auto/v1732946890/learn-wrikka-com/htvmczcdkqg08gcl0abe.webp",
    link: "https://learn.wrikka.com/",
    icon: "ph:graduation-cap-fill"
  },
  {
    title: "บทความต่างๆในเรื่องที่น่าสนใจ",
    description: "blog.wrikka.com",
    image: "https://res.cloudinary.com/daldcdwqs/image/upload/f_auto/v1732942577/learn-wrikka-com/hfuxgfyeg3ycdqyi6pzk.webp",
    link: "https://blog.wrikka.com/",
    icon: "ph:book-bookmark-fill"
  }
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Create background stars
    const night = document.querySelector('.night');
    if (night) {
      // Add small stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star-small';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        night.appendChild(star);
      }
      // Add medium stars
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star-medium';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        night.appendChild(star);
      }
    }
  }, []);

  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-black via-[#050505] to-black text-white p-8 overflow-hidden relative"
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    >
      {/* Interactive background glow */}
      <div 
        className="absolute pointer-events-none inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      {/* Background stars */}
      <div className="night" />
      
      {/* Shooting Stars */}
      <div className="shooting-stars">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="shooting-star" />
        ))}
      </div>

      <div className="relative">
        {/* Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gray-800/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-800/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-800/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-200">wrikka.com</h1>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <Link 
                key={index} 
                href={card.link}
                className="group block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="backdrop-blur-md bg-white/[0.08] rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-white/[0.12] group-hover:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]">
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon icon={card.icon} className="w-6 h-6 text-gray-300" />
                      <h2 className="text-2xl font-bold text-white">{card.description}</h2>
                    </div>
                    <p className="text-gray-400 text-sm">{card.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
