export interface CareerOpportunity {
  id: number;
  title: string;
  location: string;
  openingDate: string;
  closingDate: string;
  category: string;
  description: string;
  keyResponsibilities: string[];
  requiredQualifications: string[];
  certifications?: string[];
}

export const careersData: CareerOpportunity[] = [
  {
    id: 1,
    title: 'Network Engineer',
    location: 'Riyadh Office',
    openingDate: 'July 14, 2024',
    closingDate: 'August 15, 2024',
    category: 'IT',
    description:
      'Join our Riyadh Office and be part of the team driving network innovation across the region.',
    keyResponsibilities: [
      'Install and configure all network devices.',
      'Manage, maintain, and monitor routers, switches, load balancers, firewalls, and IP-telephony solutions.',
      'Understand data center infrastructure and interconnections.',
      'Prepare daily network status reports and documentation.',
      'Participate in designing and implementing network solutions.',
      'Oversee current and upcoming network projects to ensure high-quality execution.',
    ],
    requiredQualifications: [
      'Professional experience with configuration and management of networking devices.',
      'Strong understanding of TCP/IP, LAN/WAN, routing, switching, and related technologies.',
      'Hands-on familiarity with routers, switches, firewalls, and network management systems.',
      'Bachelor’s degree in Computer Science, Computer Engineering, or equivalent.',
      'Minimum 4 years of experience in the networking field.',
    ],
    certifications: [
      'Cisco CCNP Datacenter',
      'Cisco CCNP R&S',
      'F5 Administration',
      'F5-301',
      'F5-303',
      'PCNSE',
    ],
  },
  {
    id: 2,
    title: 'Security Engineer',
    location: 'Riyadh Office',
    openingDate: 'July 14, 2024',
    closingDate: 'August 15, 2024',
    category: 'Technical',
    description:
      'Join BARQ Systems and be part of the team driving innovation within the region.',
    keyResponsibilities: [
      'Design and implement security architectures and solutions',
      'Monitor and respond to security incidents and threats',
      'Conduct security assessments and vulnerability testing',
      'Implement and maintain security controls and policies',
      'Collaborate with IT teams to ensure secure system configurations',
      'Stay updated on latest security threats and mitigation techniques',
    ],
    requiredQualifications: [
      'Previous experience in cybersecurity and information security',
      'Strong understanding of security protocols, cryptography, and authentication',
      'Hands on experience with firewalls, IDS/IPS, SIEM, and security tools',
      'Experience in incident response and security monitoring',
      'Minimum 3 years of experience in information security',
    ],
    certifications: [
      'CISSP',
      'CEH (Certified Ethical Hacker)',
      'CompTIA Security+',
      'CISM',
    ],
  },
  {
    id: 3,
    title: 'Senior Database Administrator',
    location: 'Voco Hotel, Riyadh, Saudi Arabia',
    openingDate: 'July 14, 2024',
    closingDate: 'August 15, 2024',
    category: 'IT',
    description:
      'Join BARQ Systems and be part of the team driving innovation within the region.',
    keyResponsibilities: [
      'Design, implement and maintain database systems',
      'Ensure database performance, security and availability',
      'Perform database backup and recovery operations',
      'Monitor database health and optimize performance',
      'Implement database security policies and access controls',
      'Troubleshoot and resolve database issues',
    ],
    requiredQualifications: [
      'Extensive experience with database management systems (Oracle, SQL Server, MySQL)',
      'Strong understanding of database design, indexing, and optimization',
      'Experience with database backup, recovery, and disaster recovery',
      'Knowledge of database security best practices',
      'Minimum 5 years of experience in database administration',
    ],
    certifications: [
      'Oracle Certified Professional (OCP)',
      'Microsoft Certified: Azure Database Administrator',
      'MySQL Database Administrator',
    ],
  },
  {
    id: 4,
    title: 'Monitoring Engineer',
    location: 'Voco Hotel, Riyadh, Saudi Arabia',
    openingDate: 'July 14, 2024',
    closingDate: 'August 15, 2024',
    category: 'Data',
    description:
      'Join BARQ Systems and be part of the team driving innovation within the region.',
    keyResponsibilities: [
      'Monitor and maintain IT infrastructure and applications',
      'Configure and manage monitoring tools and platforms',
      'Respond to alerts and incidents promptly',
      'Generate reports on system performance and availability',
      'Implement proactive monitoring strategies',
      'Collaborate with teams to improve system reliability',
    ],
    requiredQualifications: [
      'Experience with monitoring tools (Nagios, Zabbix, Prometheus, etc.)',
      'Strong understanding of IT infrastructure and network protocols',
      'Experience in incident management and troubleshooting',
      'Knowledge of scripting languages for automation',
      'Minimum 2 years of experience in IT monitoring',
    ],
    certifications: [
      'ITIL Foundation',
      'CompTIA Network+',
      'Monitoring Tool Certifications',
    ],
  },
  {
    id: 5,
    title: 'Help Desk Engineer',
    location: 'Voco Hotel, Riyadh, Saudi Arabia',
    openingDate: 'July 14, 2024',
    closingDate: 'August 15, 2024',
    category: 'IT',
    description:
      'Join BARQ Systems and be part of the team driving innovation within the region.',
    keyResponsibilities: [
      'Provide technical support to end users',
      'Troubleshoot hardware, software, and network issues',
      'Document and track support tickets',
      'Install and configure computer systems and applications',
      'Escalate complex issues to senior technical teams',
      'Maintain knowledge base and support documentation',
    ],
    requiredQualifications: [
      'Experience in IT help desk or technical support',
      'Strong troubleshooting and problem-solving skills',
      'Knowledge of Windows, Mac, and Linux operating systems',
      'Excellent communication and customer service skills',
      'Minimum 1 year of experience in help desk support',
    ],
    certifications: [
      'CompTIA A+',
      'ITIL Foundation',
      'Microsoft Certified: Modern Desktop Administrator',
    ],
  },
  {
    id: 6,
    title: 'Data Center Engineer',
    location: 'Voco Hotel, Riyadh, Saudi Arabia',
    openingDate: 'July 14, 2024',
    closingDate: 'August 15, 2024',
    category: 'IT',
    description:
      'Join BARQ Systems and be part of the team driving innovation within the region.',
    keyResponsibilities: [
      'Maintain and monitor data center infrastructure',
      'Install and configure servers, storage, and network equipment',
      'Perform routine maintenance and upgrades',
      'Ensure environmental controls and security measures',
      'Respond to hardware failures and incidents',
      'Document data center operations and procedures',
    ],
    requiredQualifications: [
      'Experience in data center operations and maintenance',
      'Knowledge of server hardware, storage systems, and networking',
      'Understanding of power, cooling, and environmental monitoring',
      'Experience with virtualization technologies',
      'Minimum 3 years of experience in data center environment',
    ],
    certifications: [
      'DCCA (Data Center Certified Associate)',
      'CompTIA Server+',
      'VMware Certified Professional',
    ],
  },
];
