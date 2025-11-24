
import React, { useState } from 'react'
import ServiceModal from './ServiceModal'
import DownloadBundlesForm from './DownloadBundlesForm';

interface ServiceData {
    id: string;
    icon: string;
    title: string;
    description: string;
    items: string[];
    modalContent: {
        sections: {
            icon?: string;
            desc?: string;
            title?: string;
            items?: string[];
        }[];
    };
}

const MoreServices = () => {
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloadFormOpen, setIsDownloadFormOpen] = useState(false);

    const moreServices: ServiceData[] = [
        {
            id: 'noc',
            icon: "/assets/solutionsandservices/managed-services/NOC-White 1.svg",
            title: "NOC",
            description: "Our NOC bundles Services deliver high-availability network monitoring and management, backed by a proven track record with large, sensitive, and mission-critical environments. Trusted by major clients across key sectors, our expert teams ensure seamless performance, rapid incident response, and operational continuity, reflecting our commitment to reliability, security, and service excellence",
            items: ["Check our bundles", "→"],
            modalContent: {
                sections: [
                    {
                        title: "NOC Services",
                        desc: "Network Operations Center services providing 24/7 monitoring and management.",
                        items: [
                            "Network monitoring and management",
                            "Incident response and resolution",
                            "Performance optimization",
                            "Preventive maintenance"
                        ]
                    }
                ]
            }
        },
        {
            id: 'sla',
            icon: "/assets/solutionsandservices/managed-services/SLA-WHITE 1.svg",
            title: "SLA",
            description: "BARQ Systems delivers SLA Master Agreement Services as bundled tiers, offering clear, scalable service levels tailored to client needs, ensuring consistent performance, transparency, and reliable support.",
            items: ["Check our bundles", "→"],
            modalContent: {
                sections: [
                    {
                        title: "SLA Services",
                        desc: "Service Level Agreement management and monitoring.",
                        items: [
                            "SLA definition and management",
                            "Performance monitoring",
                            "Compliance reporting",
                            "Service optimization"
                        ]
                    }
                ]
            }
        },
        {
            id: 'pmo',
            icon: "/assets/solutionsandservices/managed-services/PMO AS-WHITE 1.svg",
            title: "PMO AS A SERVICE",
            description: "",
            items: [
                "• End-to-End Project",
                "Management support",
                "• Resource & Milestone planning",
                "• Risk and Issue Management",
                "• Documentation and Reporting"
            ],
            modalContent: {
                sections: [
                    {
                        title: "PMO Services",
                        desc: "Project Management Office as a Service.",
                        items: [
                            "Project portfolio management",
                            "Resource planning and allocation",
                            "Risk management",
                            "Project reporting and analytics"
                        ]
                    }
                ]
            }
        },
        {
            id: 'it-operations',
            icon: "/public/assets/solutionsandservices/hereo-image-bg-2.png",
            title: "IT OPERATIONS & TALENT SERVICES",
            description: "",
            items: [
                "• Managed Infrastructure Operation",
                "• Outsourcing",
                "• HR & Human Capital"
            ],
            modalContent: {
                sections: [
                    {
                        title: "IT Operations & Talent",
                        desc: "Comprehensive IT operations and talent management services.",
                        items: [
                            "Infrastructure management",
                            "IT outsourcing solutions",
                            "Talent acquisition and management",
                            "Skills development programs"
                        ]
                    }
                ]
            }
        },
        {
            id: 'customer-enablement',
            icon: "/assets/solutionsandservices/managed-services/CUSTOMER ENABLEMENT-WHITE 1.svg",
            title: "CUSTOMER ENABLEMENT & TRAINING",
            description: "",
            items: [
                "• Product Training Workshops",
                "• Security Awareness Training"
            ],
            modalContent: {
                sections: [
                    {
                        title: "Customer Enablement",
                        desc: "Training and enablement services for customers.",
                        items: [
                            "Product training workshops",
                            "Security awareness programs",
                            "Best practices training",
                            "Certification programs"
                        ]
                    }
                ]
            }
        },
        {
            id: 'professional-services',
            icon: "/assets/solutionsandservices/managed-services/PROFESSIONAL SERVICES-WHITE 1.svg",
            title: "PROFESSIONAL SERVICES",
            description: "",
            items: [
                "• Implementation Services",
                "• Migration Services"
            ],
            modalContent: {
                sections: [
                    {
                        title: "Professional Services",
                        desc: "Expert implementation and migration services.",
                        items: [
                            "System implementation",
                            "Data migration services",
                            "Integration services",
                            "Consulting and advisory"
                        ]
                    }
                ]
            }
        },
        {
            id: 'warehousing',
            icon: "/assets/solutionsandservices/managed-services/WAREHOUSING SERVICES-WHITE 1.svg",
            title: "WAREHOUSING SERVICES",
            description: "",
            items: [
                "• RMA",
                "• Hardware Inventory",
                "• Hardware Shipping",
                "• Spare parts Management."
            ],
            modalContent: {
                sections: [
                    {
                        title: "Warehousing Services",
                        desc: "Comprehensive warehousing and logistics services.",
                        items: [
                            "RMA processing",
                            "Inventory management",
                            "Shipping and logistics",
                            "Spare parts management"
                        ]
                    }
                ]
            }
        }
    ];

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
    }

    const handleDownloadFormOpen = () => {
        setIsDownloadFormOpen(true)
    }

    const handleDownloadFormClose = () => {
        setIsDownloadFormOpen(false)
    }

    return (
        <div className='max-w-7xl mx-auto relative z-50 mt-[200px] pb-[178px] w-full' >
            {/* Section Header */}
            <div id='more-services' className='absolute top-[-5%]' />
            <div className='flex  mb-12'>
                <div className=''>
                    <img
                        src="/assets/solutionsandservices/managed-services/MORE SERVICES-WHITE 1.svg"
                        alt="More Services"
                        width={289}
                        height={80}
                        className=' mb-6'
                    />
                    <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] w-[992px]'>
                        BARQ Systems’ managed services go beyond keeping operations running we keep our customers ahead. From NOC <br /> operations and SLA governance to customer enablement, IT talent, professional services, warehouse support, and  <br />PMO expertise, we combine deep industry experience with a hands-on approach that empowers organizations to lead <br /> with resilience and agility                    </p>
                </div>
            </div>


            <div className='grid grid-cols-2 gap-10  '>
                <div
                    style={{
                        display: 'flex',
                        padding: '40px 24px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        height: "407px",
                        justifyContent: 'space-between',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(10px)',
                    }}
                    className='flex flex-col'
                >
                    <img
                        src={moreServices[0].icon}
                        alt={moreServices[0].title}
                        width={150}
                        height={48}
                        className='object-contain'
                    />
                    <p className='text-[#D9DDDD]  h-[175px] text-[18px] font-normal leading-[27px]  max-w-[572px] mt-8'>
                        Our NOC bundles Services deliver high-availability network <br /> monitoring and management, backed by a proven track record <br /> with large, sensitive, and mission-critical environments. Trusted by <br /> major clients across key sectors, our expert teams ensure seamless <br /> performance, rapid incident response, and operational continuity,<br /> reflecting our commitment to reliability, security, and service <br /> excellence
                    </p>
                    <button
                        onClick={handleDownloadFormOpen}
                        className='flex items-center gap-4 text-[#25B8E4] text-[16px] frutiger-lt-std-bold transition-all duration-300 py-4 mt-4 hover:text-[#1da3cc] cursor-pointer'>
                        Check our bundles
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                            <path d="M1 7H15M15 7L9 13M15 7L9 1" stroke="#25B8E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        padding: '40px 24px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        height: "407px",
                        justifyContent: 'space-between',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(10px)',
                    }}
                    className='flex flex-col'
                >
                    <div>
                        <img
                            src={moreServices[1].icon}
                            alt={moreServices[1].title}
                            width={172}
                            height={48}
                            className='object-contain'
                        />
                        <p className='text-[#D9DDDD] h-[175px] text-[18px] font-normal leading-[27px]  max-w-[572px] mt-8'>
                            BARQ Systems delivers SLA Master Agreement Services as bundled tiers, offering clear, scalable service levels tailored to client needs, ensuring consistent performance, transparency, and reliable <br />support.
                        </p>
                    </div>
                    <button
                        onClick={handleDownloadFormOpen}
                        className='flex items-center gap-4 text-[#25B8E4] text-[16px] frutiger-lt-std-bold transition-all duration-300 py-4 mt-4 hover:text-[#1da3cc] cursor-pointer'>
                        Check our bundles
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                            <path d="M1 7H15M15 7L9 13M15 7L9 1" stroke="#25B8E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Services Grid - 3x2 Layout */}

            <div className='mt-12 flex   h-[780px]'>
                {/* right side */}
                <div className='flex flex-col  w-full'>
                    {/*  */}
                    <div className='flex gap-6 h-[456px]'>
                        {/* PMO */}
                        <div
                            style={{
                                display: 'flex',
                                padding: '40px 24px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)',
                                width: "342px",

                            }}
                            className='flex flex-col flex-1'
                        >
                            <img
                                src="/assets/solutionsandservices/managed-services/PMO AS-WHITE 1.svg"
                                alt="PMO AS A SERVICE"
                                width={129}
                                height={40}
                                className='object-contain'
                            />
                            <div className='flex flex-col  mt-8'>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[36px]'>• End-to-End Project</p>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[36px] ml-2'>Management support</p>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[36px]'>• Resource & Milestone planning</p>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[36px]'>• Risk and Issue Management</p>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[36px]'>• Documentation and Reporting</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6 flex-1'>
                            {/* IT OPERATIONS & TALENT SERVICES */}
                            <div
                                style={{
                                    display: 'flex',
                                    padding: '40px 24px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255, 255, 255, 0.16)',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(10px)',
                                    height: "216px",
                                    width: "460px"
                                }}
                                className='flex flex-col'
                            >
                                <img
                                    src="/assets/solutionsandservices/managed-services/IT OPERATIONS.svg"
                                    alt="IT OPERATIONS & TALENT SERVICES"
                                    width={220}
                                    height={40}
                                    className='object-contain'
                                />
                                <div className='flex flex-col mt-8'>
                                    <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Managed Infrastructure Operation</p>
                                    <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Outsourcing</p>
                                    <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• HR & Human Capital</p>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: 'flex',
                                    padding: '40px 24px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    height: "216px",
                                    width: "460px",
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255, 255, 255, 0.16)',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(10px)',

                                }}
                                className='flex flex-col'
                            >
                                <img
                                    src="/assets/solutionsandservices/managed-services/PROFESSIONAL SERVICES-WHITE 1.svg"
                                    alt="PROFESSIONAL SERVICES"
                                    width={189}
                                    height={48}
                                    className='object-contain'
                                />
                                <div className='flex flex-col  mt-8'>
                                    <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Implementation Services</p>
                                    <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Migration Services</p>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='flex gap-6 mt-6'>
                        <div
                            style={{
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)',
                                height: "300px",
                                width: "466px"
                            }}
                            className='flex justify-center items-center p-4 relative'
                        >

                            <div className='absolute '>
                                <img src="/assets/solutionsandservices/managed-services/Rectangle 10.svg" alt="Customer Enablement" width={434} height={268} className='object-contain' />
                            </div>
                            <img
                                src="/assets/solutionsandservices/managed-services/woman-wearing-virtual-reality-simulator 1.png"
                                alt="VR Technology"
                                width={482}
                                height={360}
                                className='object-contain z-10 absolute top-[-21.8%] '
                            />
                        </div>
                        {/* WAREHOUSING SERVICES */}
                        <div
                            style={{
                                display: 'flex',
                                padding: '40px 24px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)',
                                height: "300px",
                                width: "336px"
                            }}
                            className='flex flex-col'
                        >
                            <img
                                src="/assets/solutionsandservices/managed-services/WAREHOUSING SERVICES-WHITE 1.svg"
                                alt="WAREHOUSING SERVICES"
                                width={193}
                                height={40}
                                className='object-contain'
                            />
                            <div className='flex flex-col  mt-8'>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• RMA</p>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Hardware Inventory</p>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Hardware Shipping</p>
                                <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Spare parts Management.</p>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Left side */}
                <div className='flex flex-col gap-6 w-[430px]'>
                    <div
                        style={{
                            display: 'flex',
                            padding: '40px 24px',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '32px',
                            borderRadius: '16px',
                            height: "192px",
                            minWidth: "430px",
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                        }}
                        className='flex flex-col '
                    >

                        <img
                            src="/assets/solutionsandservices/managed-services/CUSTOMER ENABLEMENT-WHITE 1.svg"
                            alt="CUSTOMER ENABLEMENT & TRAINING"
                            width={277}
                            height={40}
                            className='object-contain'
                        />
                        <div className='flex flex-col  '>
                            <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Product Training Workshops</p>
                            <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>• Security Awareness Training</p>
                        </div>
                    </div>
                    <div
                        style={{
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                            minHeight: '280px',
                            height: "564px",
                        }}
                        className='flex justify-center items-center p-4 relative'
                    >
                        <div className='absolute top-[-1px]'>
                            <img src="/assets/solutionsandservices/managed-services/Rectangle 10 (1).svg" alt="Customer Enablement" width={398} height={532} className='object-contain' />
                        </div>
                        <img
                            src="/assets/solutionsandservices/managed-services/data-center-technician-ensuring-safety-security-database-using-tablet 1.png"
                            alt="Data Center Technician"
                            width={440}
                            height={555}
                            className='object-contain z-10 top-[-8px] absolute left-[4%]'
                        />
                    </div>
                </div>
            </div>

            <DownloadBundlesForm
                isOpen={isDownloadFormOpen}
                onClose={handleDownloadFormClose}
            />


            {/* Service Modal */}
            <ServiceModal
                isOpen={isModalOpen}
                onClose={closeModal}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                service={selectedService as any}
            />
        </div >
    )
}

export default MoreServices