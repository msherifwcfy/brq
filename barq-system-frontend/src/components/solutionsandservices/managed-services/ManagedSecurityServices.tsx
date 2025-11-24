import Image from 'next/image'
import React, { useState } from 'react'
import ServiceModal from '@/components/solutionsandservices/managed-services/ServiceModal'
import DownloadBundlesForm from '@/components/solutionsandservices/managed-services/DownloadBundlesForm'

interface ServiceData {
    id: string;
    icon: string;
    title: string;
    image: string;
    description: string;
    modalContent: {
        sections: {
            icon?: string;
            desc?: string;
            title?: string;
            items?: string[];
            countries?: {
                name: string;
                regulator: string[];
            }[];
        }[];
    };
}

const ManagedSecurityServices = () => {
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloadFormOpen, setIsDownloadFormOpen] = useState(false);

    const managedSecurityServices: ServiceData[] = [
        {
            id: 'soc',
            icon: "/assets/solutionsandservices/managed-services/SOC - WHITE 1.svg",
            title: "SOC",
            image: "/assets/solutionsandservices/managed-services/image1.png",
            description: "Our SOC bundles deliver real-time protection and response, making it easy to choose the right coverage and get maximum value.",
            modalContent: {
                sections: [
                    {
                        icon: "/assets/solutionsandservices/managed-services/SOC BUNDLES-WHITE 1.svg",
                        title: "SOC Bundles",
                        desc: "Our SOC services provide robust, real-time protection and response capabilities. By productising our offerings into clear, structured bundles, we enable customers to easily identify the features and coverage levels that best match their requirements—streamlining decision-making and ensuring optimal value. ",
                        items: [
                            "Our SOC services provide robust, real-time protection and operational oversight via our state-of-the-art security operations center.",
                            "Through advanced threat detection technologies and expert security analysts, we deliver round-the-clock monitoring and rapid incident response.",
                            "Our SOC bundles deliver real-time protection and response, making it easy to choose the right coverage and get maximum value.",
                            "Discover The Bundles →"
                        ]
                    },
                    {
                        icon: "/assets/solutionsandservices/managed-services/IN-HOUSE SOC-WHITE 1.svg",
                        title: "IN House SOC",
                        desc: "BARQ Systems’ In-House SOC model delivers all security operations on-site at the customer’s premises, ensuring complete data confidentiality and control. Supported by our expert SOC professionals, this model guarantees that sensitive information remains securely within the customer's environment.  ",
                        items: [
                            "BARQ Systems in-house SOC model delivers all services in a premium, seamless, and comprehensive way.",
                            "Our comprehensive in-house approach ensures that every aspect of your security operations is managed with precision and care.",
                            "Experience enhanced security operations with our dedicated in-house SOC team providing 24/7 monitoring and support.",
                            "Discover The Bundles →"
                        ]
                    }
                ]
            }
        },
        {
            id: 'cybersecurity',
            icon: "/assets/solutionsandservices/managed-services/CYBERSECURITY-WHITE 2.svg",
            title: "CYBERSECURITY",
            image: "/assets/solutionsandservices/managed-services/image2.png",
            description: "AI-driven protection with tailored solutions like threat hunting, risk assessments, and endpoint security keeping your business safe around the clock.",
            modalContent: {
                sections: [
                    {
                        icon: "/assets/solutionsandservices/managed-services/OFFENSIVE-WHITE 1.svg",
                        title: "Offensive",
                        items: [
                            "Penetration Testing",
                            "Vulnerability Assessment",
                            "Phishing Campaigns Simulation",
                            "Source Code Review",
                            "Red Teaming"
                        ]
                    },
                    {
                        icon: "/assets/solutionsandservices/managed-services/DEFENSIVE-WHITE 1.svg",
                        title: "Defensive",
                        items: [
                            "Incident Response (IR)",
                            "Digital Forensics & Investigations",
                            "Configuration Review ",
                            "Tabletop Exercise",
                            "Threat Hunting",
                            "Design & Architecture Review",
                            "Blue Teaming",
                            "SOC Maturity Assessment",
                            "Threat Intelligence Service"
                        ]
                    }
                ]
            }
        },
        {
            id: 'grc',
            icon: "/assets/solutionsandservices/managed-services/GRC-WHITE 1.svg",
            title: "GRC",
            image: "/assets/solutionsandservices/managed-services/image3.png",
            description: "Comprehensive frameworks and tools to manage risk, enforce compliance.",
            modalContent: {
                sections: [
                    {
                        title: "International Certificates",
                        items: [
                            "ISO/IEC 27001 - Information Security Management",
                            "ISO 20000 - Information Service Management",
                            "ISO 22301 - Business Continuity Management",
                            "HIPAA",
                            "PCI DSS",
                            "COBIT",
                            "EU GDPR"
                        ]
                    },
                    {
                        title: "Local Regulators",
                        items: [],
                        countries: [
                            {
                                name: "Saudi Arabia",
                                regulator: [
                                    "Saudi Central Bank (SAMA)",
                                    "National Cybersecurity Authority (NCA)"
                                ]
                            },
                            {
                                name: "Egypt",
                                regulator: [
                                    "Central Bank of Egypt (CBE)",
                                    "Financial Regulatory Authority (FRA)"]
                            }, {
                                name: "UAE",
                                regulator: [
                                    "National Cybersecurity Strategy",
                                    "UAE Information Assurance Standard (NESA)",
                                    "Federal Data Protection Law (PDPL)"
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]

    const handleLearnMore = (service: ServiceData) => {
        setSelectedService(service)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
    }

    const handleDownloadClick = () => {
        // Close service modal and open download form
        setIsModalOpen(false)
        setIsDownloadFormOpen(true)
    }

    const closeDownloadForm = () => {
        setIsDownloadFormOpen(false)
    }

    return (
        <div className='max-w-7xl mx-auto relative z-50 lg:mt-[-180px] mt-[-80px] w-full px-[5%] xl:px-0' >
            {/* Section Header */}
            <div className='flex flex-col lg:flex-row lg:justify-between w-full relative gap-8 lg:gap-0'  >
                <div className='lg:sticky lg:top-8 z-50 lg:self-start'>
                    <div className='flex min-w-[180px] lg:min-w-[272px]'>
                        <Image
                            src="/assets/solutionsandservices/managed-services/MANAGED SECURITY SERVICES-WHITE 1.svg"
                            alt="Managed Security Services"
                            width={207}
                            height={80}
                            className='lg:w-[207px] w-[155px] h-auto'
                        />
                    </div>
                    <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:w-[616px] w-full mt-4 lg:mt-6'>
                        BARQ Systems&apos; Managed Security Services bundles deliver proven <br className='hidden lg:block' /> protection, combining advanced AI-driven technology with decades of <br className='hidden lg:block' /> cybersecurity expertise and tailored solutions.
                    </p>
                </div>
                {/* Right Side - Services Cards Grid */}
                <div className='flex flex-col gap-8 lg:gap-12 w-full lg:w-auto'>
                    {managedSecurityServices.map((service, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                padding: '24px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '16px',
                                maxWidth: '616px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)'
                            }}
                            className='flex-1 w-full'
                        >
                            {/* Content */}
                            <div className='flex flex-col lg:flex-row gap-4 lg:gap-8'>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    width={174}
                                    height={index === 0 ? 288 : index === 1 ? 304 : 264}
                                    className='lg:w-[174px] w-full lg:h-auto h-[220px] object-cover'
                                />
                                <div className='flex flex-col gap-4 w-full'>
                                    {/* Title */}
                                    <div className='flex items-center justify-between w-full'>
                                        <Image
                                            src={service.icon}
                                            alt={service.title}
                                            width={index === 0 ? 153 : index === 1 ? 328 : 128}
                                            height={index === 0 ? 48 : index === 1 ? 40 : 48}
                                            className='object-contain lg:w-auto w-[120px] h-auto'
                                        />
                                    </div>
                                    {/* Description */}
                                    <p
                                        className={`text-[#C5CBCC] text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] ${index === 0 ? "" : "lg:max-w-[362px] max-w-full"}`}
                                    >
                                        {service.description}
                                    </p>

                                    <div className='flex flex-col'>
                                        {service.modalContent.sections.map((section, sectionIndex) => (
                                            <div key={sectionIndex}>
                                                <div className=''>
                                                    <h3 className='text-[#9FA9AA] text-[14px] lg:text-[16px] frutiger-lt-std-bold leading-[21px] lg:leading-[24px]'>
                                                        {section.title}
                                                    </h3>
                                                </div>
                                                {sectionIndex !== 1 && <hr className='border-white opacity-10 my-2' />}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Learn More Button */}
                                    <button
                                        onClick={() => handleLearnMore(service)}
                                        className='flex items-center gap-4 text-[#25B8E4] text-[14px] lg:text-[16px] frutiger-lt-std-bold py-4 transition-all duration-300'
                                    >
                                        Learn More
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='pt-[2px]'>
                                            <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Modal */}
            <ServiceModal
                isOpen={isModalOpen}
                onClose={closeModal}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                service={selectedService as any}
                onDownloadClick={handleDownloadClick}
            />

            {/* Download Bundles Form Modal */}
            <DownloadBundlesForm
                isOpen={isDownloadFormOpen}
                onClose={closeDownloadForm}
            />
        </div>
    )
}

export default ManagedSecurityServices
