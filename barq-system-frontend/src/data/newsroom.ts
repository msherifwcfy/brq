export interface NewsItem {
  id: number;
  category: 'News' | 'Press Release' | 'Interviews';
  date: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  mainImage?: string;
  videoUrl?: string; // For interviews/videos
  videoPoster?: string; // Dedicated poster image for videos
  mediaType?: 'image' | 'vertical-video' | 'horizontal-video'; // Type of media for layout
}

export const newsroomData: NewsItem[] = [
  {
    id: 1,
    category: 'News',
    date: 'May 2024',
    title: 'BARQ Systems Launches AI Guardrails to Secure AI Interactions',
    mainImage: '/assets/newsroom/Main image (1).png',
    description:
      'BARQ introduces AI Gateway Guardrails, featuring advanced Arabic search and dual protection to secure sensitive data in AI systems.',
    image: '/assets/newsroom/img-1.jpg',
    buttonText: 'Read More',
    mediaType: 'image',
  },
  {
    id: 2,
    category: 'News',
    date: 'April 2024',
    title: 'BARQ Systems Introduces In-House SOC for Government Organizations',
    description:
      'A groundbreaking SOC solution that enables government entities to build and operate their own SOCs with compliance, control, and efficiency.',
    image: '/assets/newsroom/img-2.png',
    buttonText: 'Read More',
    mediaType: 'vertical-video',
    videoUrl: '/assets/newsroom/BARQ Systems-In House SOC Arabic Video .mp4',
    videoPoster: '/assets/newsroom/img-2.png', // Custom poster for this video
  },
  {
    id: 3,
    category: 'News',
    date: 'March 2024',
    title: 'BARQ Systems Joins the UN Global Compact Network Egypt',
    description:
      'Reinforcing commitment to ethical business and sustainability, BARQ aligns with the UN’s Ten Principles.',
    image: '/assets/newsroom/img-3.png',
    buttonText: 'Read More',
    mediaType: 'image',
  },
  {
    id: 4,
    category: 'Press Release',
    date: 'June 2024',
    title:
      'BARQ Systems Becomes a UiPath Agentic Automation Fast Track Partner',
    description:
      'Recognized for leadership in agentic automation and commitment to advancing intelligent automation in the region.',
    image: '/assets/newsroom/img-4.png',
    buttonText: 'Read More',
    mediaType: 'image',
  },
  {
    id: 5,
    category: 'Interviews',
    date: 'February 2024',
    title: 'CEO Mahmoud Soliman at F5 APPWorld',
    description:
      'Mahmoud Soliman shares how AI strengthens partner infrastructure, focusing on public institutions and tourism.',
    image: '/assets/newsroom/img-5.png',
    buttonText: 'Watch Video',
    videoUrl: '/assets/newsroom/F5 APPWorld.mp4',
    mediaType: 'horizontal-video',
    videoPoster: '/assets/newsroom/img-5.png', // Custom poster for this video
  },
];
