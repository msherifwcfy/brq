"use client"
import Navbar from '@/components/home-page/navbar'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from 'next/navigation';

const caseStudiesData = [
    {
        id: 1,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: 'Seamless Network Migration for e&',
        description:
            'e&, a global technology company, faced a critical network migration challenge that risked disrupting their operations. They turned to BARQ Systems, known for its expertise with Juniper Networks technologies, to resolve the complex technical issue.',
        img: '/assets/caseStudies/Image.png',
    },
    {
        id: 2,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: 'Successful Data Center Relocation to New Capital for ACA',
        description:
            'When Egypt&apos;s Administrative Control Authority relocated its entire data center to the New Administrative Capital, the stakes were high: zero downtime. BARQ Systems executed the migration flawlessly over a single weekend, with every system live and operations uninterrupted.',
        img: '/assets/caseStudies/Image-4.png',
    },
    {
        id: 3,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: 'How MNT-Halan Scaled with BARQ Systems',
        description:
            'MNT-Halan, Egypt&apos;s fastest-growing fintech, faced the challenge of protecting millions of customer transactions while scaling at speed. Rather than building security operations in-house, the company partnered with BARQ Systems to unlock stronger defenses, faster detection, and a future-ready SOC.',
        img: '/assets/caseStudies/Image-6.png',
    },
    {
        id: 4,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: 'Fortifying Security: Allianz&apos;s Journey to Enhanced Data Protection',
        description:
            'To protect sensitive customer data and meet strict global regulations, Allianz Egypt needed a unified approach to cybersecurity. Partnering with BARQ Systems, the insurer achieved faster detection, stronger resilience, and full compliance all while reinforcing customer trust.',
        img: '/assets/caseStudies/Image-5.png',
    },
    {
        id: 5,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: 'Proactive Security at Scale: Fawry Partners with BARQ Systems',
        description:
            'As Egypt&apos;s fintech leader managing millions of daily transactions, Fawry needed stronger defenses to match its rapid growth. Partnering with BARQ Systems, the company achieved proactive threat mitigation, 100% compliance with PCI DSS and CBE standards, and faster response times, cutting incident resolution from 45 minutes to just 15. Together, the two teams built a scalable security framework ready to support Fawry&apos;s future growth.',
        img: '/assets/caseStudies/Image-2.png',
    },
    {
        id: 6,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: "Pioneering Partnership: Transforming CBE&apos;s IT Landscape",
        description:
            'As Egypt&apos;s financial sector modernized, the Central Bank of Egypt needed to centralize account management and tighten security across highly sensitive systems. BARQ Systems delivered a tailored integration with zero disruption, earning commendation from CBE&apos;s leadership and setting a new benchmark for governance in the sector.',
        img: '/assets/caseStudies/Image-3.png',
    },
    {
        id: 7,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: 'Connecting the Kingdom: A Technical Transformation',
        description:
            'Spanning deserts, mountains, and cities, Saudi Arabia needed resilient telecom infrastructure across 2,200 sites nationwide. Over three years and 8,000 site visits, BARQ Systems boosted network visibility by 50%, cut repair times by 20%, and strengthened local teams helping the Kingdom advance its communications strategy.',
        img: '',
    },
    {
        id: 8,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title:
            "Advancing Water Management: A Six-Year Partnership with Saudi Arabia&apos;s Water Authority",
        description:
            'Over six years, Saudi Arabia&apos;s Water Authority has partnered with BARQ Systems to modernize and secure its nationwide infrastructure. Together, we&apos;ve delivered projects that boosted network visibility by 50%, strengthened application performance and security, and enhanced cyber resilience across 17 sites. This long-term collaboration highlights how innovative technologies and strategic support can drive sustainable water management for the Kingdom&apos;s future.',
        img: '/assets/caseStudies/image-7.png',
    },
    {
        id: 9,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title: "Decade of Technical Support in Saudi Arabia&apos;s Energy Sector",
        description:
            'For nearly 10 years, a leading Saudi energy authority has partnered with BARQ Systems to modernize its IT backbone. By rebuilding the data center with HPE solutions, we delivered 30% greater efficiency, stronger security across every domain, and reinforced the Kingdom&apos;s vision for a more resilient energy future.',
        img: '',
    },
    {
        id: 10,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title:
            'Forging a Secure Future: Partnership with Saudi Arabia&apos;s ICT Leader',
        description:
            'For four years, BARQ Systems has partnered with a leading Saudi ICT organization to strengthen the Kingdom&apos;s communications infrastructure. Together, we enhanced domain service security, raising NCA compliance to 80%, introduced advanced application performance monitoring, and reinforced network security to protect critical infrastructure. This long-term collaboration reflects BARQ&apos;s commitment to resilience, innovation, and exceptional customer support.',
        img: '',
    },
    {
        id: 11,
        date: 'Aug 14, 2025',
        read: '3 min read',
        title:
            'BARQ Systems & EMKAN (AlRajhi Group): A groundbreaking Robotic Process Automation (RPA) initiative',
        description:
            'As part of AlRajhi Group, Emkan Finance sought to modernize its automation approach. Partnering with BARQ Systems, the company launched a groundbreaking RPA initiative that reduced robots from 100+ to just 43, cut license costs by over 50%, and accelerated request processing by 60%. With dedicated on-site support, Emkan transformed efficiency while forging a long-term strategic partnership with BARQ Systems.',
        img: '',
    },
];

const CaseStudiesContent = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('All');
    const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const router = useRouter();
    const pageSize = 9;
    const caseStudies = useMemo(() => caseStudiesData, []);

    const industries = ['All', 'Banking & Financial Services', 'Telecom', 'Public & Government', 'Education', 'Energy & Oil & Gas', 'Commercial'];
    const countries = ['All', 'Egypt', 'UAE', 'KSA'];

    const totalPages = Math.max(1, Math.ceil(caseStudies.length / pageSize));
    const pageItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return caseStudies.slice(start, start + pageSize);
    }, [caseStudies, currentPage]);

    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
    };

    const handleIndustryChange = (industry: string) => {
        setSelectedIndustry(industry);
    };

    const handleCaseStudyClick = (id: number) => {
        router.push(`/case-studies/${id}`);
    };

    return (
        <div className='bg-black relative overflow-hidden '>
            <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/caseStudies/background-2.svg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "3163px",
                    width: "100%"
                }}
            />

            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
                <div className='lg:mt-[120.48px] mt-[70px]'>
                    <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-3 lg:mb-4 w-full lg:w-[787px]' style={{
                        background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Insights
                    </h3>
                    <h1 className='text-[32px] lg:text-[48px] text-white frutiger-lt-std-bold leading-[38px] lg:leading-[57.6px] max-w-[787px]' >
                        Case Studies & Success Stories
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row  mt-[16px] items-start lg:items-center gap-4">
                    <div className='w-full lg:w-[778px]'>
                        <p
                            className='text-[#D9DDDD] text-[16px] lg:text-[18px] font-normal  leading-[24px] lg:leading-[27px] max-w-[664px]'>
                            Discover how BARQ Systems empowers businesses with innovative solutions, <br className='hidden lg:block' /> driving transformation, resilience, and measurable results across industries.
                        </p>
                    </div>
                    {/* filters */}
                    <div className='flex flex-wrap items-center gap-3 lg:gap-4 w-full lg:w-auto'>
                        <div className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M1 1H17V3.172C16.9999 3.70239 16.7891 4.21101 16.414 4.586L12 9V16L6 18V9.5L1.52 4.572C1.18545 4.20393 1.00005 3.7244 1 3.227V1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className='text-[#FFF] text-[16px] lg:text-[18px] font-normal  leading-[24px] lg:leading-[27px] '>
                                Filter by
                            </p>
                        </div>
                        <Select value={selectedCountry} onValueChange={handleCountryChange}>
                            <SelectTrigger className='text-white text-[16px] lg:text-[18px] min-w-[150px] lg:min-w-[172px] p-3 lg:p-4  min-h-[48px] lg:min-h-[56px]' style={{
                                borderRadius: "16px",
                                border: "1px solid rgba(255, 255, 255, 0.16)",
                                background: "rgba(255, 255, 255, 0.04)",
                                backdropFilter: "blur(10px)"
                            }}>
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent
                                className=" h-fit overflow-y-auto shadow-lg [&>*]:p-6"
                                style={{
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255, 255, 255, 0.16)",
                                    background: "rgba(0, 0, 0, 0.48)",
                                    backdropFilter: "blur(10px)"
                                }}
                            >
                                {countries.map((country) => (
                                    <SelectItem
                                        key={country}
                                        value={country}
                                        className="cursor-pointer text-white font-normal  "
                                        style={{
                                            color: "#FFF",
                                            fontSize: "18px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "150%"
                                        }}
                                    >
                                        {country === 'All' ? 'Country' : country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                            <SelectTrigger className='text-white text-[16px] lg:text-[18px] min-w-[150px] lg:max-w-[172px] lg:w-[172px] p-3 lg:p-4  min-h-[48px] lg:min-h-[56px] ' style={{
                                borderRadius: "16px",
                                border: "1px solid rgba(255, 255, 255, 0.16)",
                                background: "rgba(255, 255, 255, 0.04)",
                                backdropFilter: "blur(10px)"
                            }}>
                                <SelectValue placeholder={"Industry"} />
                            </SelectTrigger>
                            <SelectContent
                                className=" h-fit overflow-y-auto shadow-lg [&>*]:p-6"
                                style={{
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255, 255, 255, 0.16)",
                                    background: "rgba(0, 0, 0, 0.48)",
                                    backdropFilter: "blur(10px)"
                                }}
                            >
                                {industries.map((industry) => (
                                    <SelectItem
                                        key={industry}
                                        value={industry}
                                        className="cursor-pointer text-white font-normal "
                                        style={{
                                            color: "#FFF",
                                            fontSize: "18px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "150%"
                                        }}
                                    >
                                        {industry === 'All' ? 'Industry' : industry}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {currentPage === 1 && (
                    <div className='lg:mt-[96px] mt-[48px] flex flex-col lg:flex-row gap-6 lg:gap-8 items-center '>
                        <div className='w-full lg:w-auto'>
                            <Image src="/assets/caseStudies/Image-h-2.png" alt="Case Studies" width={619} height={333} className='w-full lg:w-[619px] h-auto lg:h-[333px] object-cover rounded-[8px]' />
                        </div>
                        <div className='flex flex-col  max-w-full lg:max-w-[497px] p-0 lg:p-4'>
                            <div className='flex items-center gap-[6px] mb-3 lg:mb-4 text-[#FFFFFF80] text-[12px] lg:text-[13.7px] font-normal leading-[16px] lg:leading-[18.2px] tracking-[-0.288px]'>
                                Sep 17, 2025
                                <div className='text-[#FFFFFF80] h-[3px] w-[3px] bg-[#FFFFFF80] rounded-full' />
                                4 min read
                            </div>
                            <h3 className='text-white text-[22px] lg:text-[27.2px] mb-2 font-normal leading-[30px] lg:leading-[36.4px] tracking-[-0.56px]'>
                                Successful Data Center Relocation to the New Capital for ACA
                            </h3>
                            <p className='text-[#FFFFFF99]  mb-3 lg:mb-4 text-[14px] lg:text-[15.6px] font-normal leading-[18px] lg:leading-[20.8px] tracking-[-0.32px]'>
                                BARQ Systems partnered with the Administrative Control Authority (ACA) to deliver mission-critical IT solutions, reinforcing security and operational efficiency across sensitive national projects.
                            </p>
                            <button className='text-[#25B8E4]  flex  gap-3 lg:gap-4 items-center text-[14px] lg:text-[16px] frutiger-lt-std-bold py-3 lg:py-4  '>
                                Explore Case Study
                                <span className='mt-[2px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 24 25" fill="none" className='lg:w-[24px] lg:h-[25px]'>
                                        <path d="M5 12.605H19M19 12.605L13 18.605M19 12.605L13 6.60498" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>)}

                {/* Cards section */}
                <div className={` ${currentPage === 1 ? 'lg:mt-[64px] mt-[48px]' : 'lg:mt-[96px] mt-[64px]'}`}>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] lg:gap-x-[48px] gap-y-[48px] lg:gap-y-[64px]'>
                        {pageItems.map((item) => (
                            <div key={item.id} className='group w-full lg:w-[395px] h-auto lg:h-[656px] rounded-[16px] flex flex-col'>
                                <div className='w-full lg:w-[394.666px] min-h-[250px] lg:min-h-[317.34px] relative overflow-hidden rounded-[8px]'>
                                    {
                                        item.img ? (
                                            <Image src={item.img} alt={item.title} fill className='object-cover rounded-[8px] transform transition-transform duration-500 ease-out group-hover:scale-[1.03]' />
                                        ) : (
                                            <div style={{
                                                borderRadius: "8px",
                                                background: "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)"
                                            }} className='w-full lg:w-[394.666px] h-[250px] lg:h-[317.34px]' />
                                        )
                                    }
                                </div>
                                <div className='flex flex-col  flex-1 mt-4 lg:mt-6 justify-between'>
                                    <div>

                                        <div className='flex items-center gap-[6px] text-[#FFFFFF66] text-[12px] lg:text-[14px] font-normal leading-[16px] lg:leading-[18.2px] tracking-[-0.288px]'>
                                            {item.date}
                                            <div className='text-[#FFFFFF80] h-[3px] w-[3px] bg-[#FFFFFF80] rounded-full' />
                                            {item.read}
                                        </div>
                                        <h3 className='text-white min-h-[50px] lg:min-h-[62px] text-[20px] lg:text-[24px]  font-normal leading-[26px] lg:leading-[31.2px] tracking-[-0.4px] mt-3 lg:mt-4'>
                                            {item.title}
                                        </h3>
                                        <p className='text-[#FFFFFF99] min-h-[70px] lg:h-[91px]  mt-3 lg:mt-4 text-[13px] lg:text-[14px] font-normal leading-[17px] lg:leading-[18.2px] line-clamp-5 tracking-[-0.188px] '>
                                            {item.description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleCaseStudyClick(item.id)}
                                        className=' cursor-pointer text-[#25B8E4] flex gap-3 lg:gap-4 items-center text-[14px] lg:text-[16px] frutiger-lt-std-bold py-3 lg:py-4 mt-4 lg:mt-6'>
                                        Explore Case Study
                                        <span className='mt-[2px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 24 25" fill="none" className='lg:w-[24px] lg:h-[25px]'>
                                                <path d="M5 12.605H19M19 12.605L13 18.605M19 12.605L13 6.60498" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className='flex items-center justify-center gap-2 mt-[64px] lg:mt-[96px] pb-[60px] lg:pb-[109px]'>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-3 lg:p-4 h-[40px] lg:h-[45px] w-[60px] lg:w-[68px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px)   text-white disabled:text-gray-500 disabled:cursor-not-allowed   hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A]  transition-colors"
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const page = idx + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`p-3 lg:p-4 h-[40px] lg:h-[45px] w-[38px] lg:w-[43px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px]  font-medium transition-all backdrop:blur(10px) duration-200 ${currentPage === page
                                        ? 'bg-[#25B8E4] text-white'
                                        : 'bg-[#FFFFFF0A] text-white border border-[#FFFFFF29] hover:bg-[#25B8E4] hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-3 lg:p-4 h-[40px] lg:h-[45px] w-[60px] lg:w-[68px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px)   text-white disabled:text-gray-500 disabled:cursor-not-allowed  hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A]  transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseStudiesContent

