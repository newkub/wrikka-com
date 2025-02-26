'use client';

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

const blocks = [
  {
    title: "สั่งซื้อคอร์สเรียน",
    description: "course.wrikka.com",
    image: "https://res.cloudinary.com/daldcdwqs/image/upload/f_auto/v1732942577/learn-wrikka-com/hfuxgfyeg3ycdqyi6pzk.webp",
    link: "https://course.wrikka.com/",
    icon: "ph:chalkboard-teacher-fill"
  },
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
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            wrikka.com
          </h1>
        </div>

        {/* Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blocks.map((block, index) => (
            <Link 
              key={index} 
              href={block.link}
              className="block-link block transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-white border border-gray-200 p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon={block.icon} className="w-8 h-8 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-800">{block.description}</h2>
                </div>
                <p className="text-gray-600 mt-2">{block.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}