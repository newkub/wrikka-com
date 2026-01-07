export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'certification' | 'award' | 'milestone' | 'recognition';
  icon: string;
  issuer?: string;
  credentialUrl?: string;
  badgeUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  date: string;
}

// Mock data - replace with real data
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'AWS Certified Developer',
    description: 'Associate Level Certification',
    date: '2024-03-15',
    type: 'certification',
    icon: 'mdi:aws',
    issuer: 'Amazon Web Services',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
  {
    id: '2',
    title: 'Vue.js Expert',
    description: 'Advanced Vue.js and Nuxt.js expertise',
    date: '2023-11-20',
    type: 'milestone',
    icon: 'mdi:vuejs',
    issuer: 'Vue.js Community',
  },
  {
    id: '3',
    title: 'Open Source Contributor',
    description: '100+ contributions to open source projects',
    date: '2024-01-10',
    type: 'milestone',
    icon: 'mdi:github',
    issuer: 'GitHub',
  },
  {
    id: '4',
    title: 'Best Web Application',
    description: 'Winner of Hackathon 2023',
    date: '2023-08-15',
    type: 'award',
    icon: 'mdi:trophy',
    issuer: 'Tech Conference',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechStart Inc.',
    content: 'Veerapong is an exceptional developer who consistently delivers high-quality work. His expertise in Vue.js and modern web technologies is outstanding.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    date: '2024-02-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Digital Solutions',
    content: 'Working with Veerapong was a fantastic experience. He\'s not just a great coder but also an excellent problem solver and team player.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    date: '2024-01-20',
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'UX Designer',
    company: 'Creative Studio',
    content: 'Veerapong has an amazing ability to bring designs to life. His attention to detail and commitment to user experience is remarkable.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    date: '2023-12-10',
  },
];
