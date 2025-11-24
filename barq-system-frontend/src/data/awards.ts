export interface Award {
  id: number;
  title: string;
  description: string;
  image: string;
  year?: string;
}

export const awards: Award[] = [
  {
    id: 1,
    title: 'Fortinet Solution Delivery Excellence Award – KSA, 2024',
    description:
      'Recognized for delivering high-quality cybersecurity solutions at the Fortinet Partner Award Night in Riyadh.',
    image: '/assets/awards-page/1.svg',
    year: '2024',
  },
  {
    id: 2,
    title: 'Gold Sponsor Award – Caisec 2024',
    description:
      'Honored as gold sponsor at Caisec 2024, reinforcing our role in shaping cybersecurity in the region.',
    image: '/assets/awards-page/2.png',
    year: '2024',
  },
  {
    id: 3,
    title: 'EPSP Summit Award – Cairo ICT 2024',
    description:
      'Received the EPSP Summit Award by Fortinet at Cairo ICT 2024, reflecting our strong partnership.',
    image: '/assets/awards-page/3.png',
    year: '2024',
  },
  {
    id: 4,
    title: 'Modon Excellence Award – 2024',
    description:
      'Recognized for our 9-year partnership with MODON and commitment to long-term value.',
    image: '/assets/awards-page/4.svg',
    year: '2024',
  },
  {
    id: 5,
    title: 'Fortinet Security Day Awards – Cairo, 2024',
    description:
      'Won three awards: Top-Performing Partner, SD-WAN Partner, and Platinum Sponsor.',
    image: '/assets/awards-page/5.svg',
    year: '2024',
  },
  {
    id: 6,
    title: 'UiPath Commitment & Appreciation Award – LEAP 2024',
    description:
      'Recognized for strategic partnership and contribution to advancing enterprise automation.',
    image: '/assets/awards-page/6.png',
    year: '2024',
  },
  {
    id: 7,
    title: 'UiPath Impact EMEA Partner Award 2024',
    description:
      'Acknowledged for AI and automation-led transformation across EMEA with UiPath.',
    image: '/assets/awards-page/7.svg',
    year: '2024',
  },
  {
    id: 8,
    title: 'Infoblox Largest Deal of the Year – 2024',
    description:
      'Recognized by Infoblox for securing the largest deal of the year.',
    image: '/assets/awards-page/8.svg',
    year: '2024',
  },
  {
    id: 9,
    title: 'Telecom Customer of the Year – GO Telecom, 2024',
    description:
      'Awarded by GO Telecom for trusted partnership and impactful digital solutions.',
    image: '/assets/awards-page/9.svg',
    year: '2024',
  },
  {
    id: 10,
    title: 'Banking Sector Excellence Award – 2024',
    description:
      'Recognized by Trend Micro for leading the largest banking sector cybersecurity partnerships.',
    image: '/assets/awards-page/10.svg',
    year: '2024',
  },
  {
    id: 11,
    title: 'Platinum Winner – Stars Club, Silicon 21 (2024)',
    description:
      "Achieved platinum status in Silicon 21's partner program for top-tier performance.",
    image: '/assets/awards-page/11.png',
    year: '2024',
  },
];

// Utility functions for pagination
export const paginateAwards = (
  awards: Award[],
  currentPage: number,
  itemsPerPage: number
): Award[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return awards.slice(startIndex, endIndex);
};

export const getTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};
