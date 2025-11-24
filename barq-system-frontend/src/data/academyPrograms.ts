export interface AcademyProgram {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  skills: string[];
}

export const academyPrograms: AcademyProgram[] = [
  {
    id: 1,
    title: 'Automation, Data & AI Track',
    subtitle: 'Foundation Tracks',
    description:
      'Gain hands-on experience in automating workflows, managing data, and applying AI to solve business challenges.',
    image: '/assets/academy-page/track-1.jpg',
    skills: [
      'Firewall setup and VPN security',
      'High availability and device management',
      'Network troubleshooting and IP configuration',
      'Routing protocols (OSP , BGP)',
      'VLANs and switching fundamentals',
      'Access control and security filtering',
    ],
  },
  {
    id: 2,
    title: 'Network & Security Track',
    subtitle: 'Foundation Tracks',
    description:
      'Learn to design, manage, and secure enterprise networks with modern cybersecurity practices.',
    image: '/assets/academy-page/track-2.jpg',
    skills: [
      'Firewall setup and VPN security',
      'High availability and device management',
      'Network troubleshooting and IP configuration',
      'Routing protocols (OSP , BGP)',
      'VLANs and switching fundamentals',
      'Access control and security filtering',
    ],
  },
  {
    id: 3,
    title: 'Project Management',
    subtitle: 'Foundation Tracks',
    description:
      'Master the essentials of planning, executing, and delivering successful technology projects.',
    image: '/assets/academy-page/track-3.jpg',
    skills: [
      'Firewall setup and VPN security',
      'High availability and device management',
      'Network troubleshooting and IP configuration',
      'Routing protocols (OSP , BGP)',
      'VLANs and switching fundamentals',
      'Access control and security filtering',
    ],
  },
];
