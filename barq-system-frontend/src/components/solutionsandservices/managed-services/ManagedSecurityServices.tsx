import Image from 'next/image'
import React, { useState } from 'react'
import ServiceModal from '@/components/solutionsandservices/managed-services/ServiceModal'
import type {
    ManagedServiceCardsEntity,
} from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '@/lib/utils';

interface ManagedSecurityServicesProps {
    serviceCards: ManagedServiceCardsEntity[] | null;
}

const ManagedSecurityServices = ({
    serviceCards,

}: ManagedSecurityServicesProps) => {
    const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { i18n, t } = useTranslation();


    const handleLearnMore = (type: string) => {
        setSelectedServiceType(type)
        setIsModalOpen(true)
    }

    console.log({ serviceCards })
    return (
        <div className='max-w-7xl mx-auto relative z-50 lg:mt-[-180px] mt-[-80px] w-full px-[5%] xl:px-0' >
            {/* Section Header */}
            <div className='flex flex-col lg:flex-row lg:justify-between w-full relative gap-8 lg:gap-0 lg:items-start'  >
                <div className='lg:sticky lg:top-8 z-50 lg:self-start lg:shrink-0'>
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
                    {serviceCards?.map((service, index) => (
                        <div
                            id={index === 0 ? 'managed-service-1' : index === 1 ? 'managed' : 'managed-3'}
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
                                    src={getImageUrl(service.image)}
                                    alt={service.description?.slice(0, 10) || 'Service Image'}
                                    width={174}
                                    height={index === 0 ? 288 : index === 1 ? 304 : 264}
                                    className='lg:w-[174px] w-full lg:h-auto h-[220px] object-cover'
                                />
                                <div className='flex flex-col gap-4 w-full'>
                                    {/* Title */}
                                    <div className='flex items-center justify-between w-full'>
                                        <Image
                                            src={getImageUrl(service.logo)}
                                            alt={service.description?.slice(0, 10) || 'Service Image'}
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
                                        <div >
                                            <div className=''>
                                                <h3 className='text-[#9FA9AA] text-[14px] lg:text-[16px] frutiger-lt-std-bold leading-[21px] lg:leading-[24px]'>
                                                    {service?.bullet_one}
                                                </h3>
                                            </div>
                                            {<hr className='border-white opacity-10 my-2' />}
                                        </div>
                                        <div >
                                            <div className=''>
                                                <h3 className='text-[#9FA9AA] text-[14px] lg:text-[16px] frutiger-lt-std-bold leading-[21px] lg:leading-[24px]'>
                                                    {service?.bullet_two}
                                                </h3>
                                            </div>
                                            {<hr className='border-white opacity-10 my-2' />}
                                        </div>
                                    </div>
                                    {/* Learn More Button */}
                                    <button
                                        onClick={() => handleLearnMore(service.type)}
                                        className='flex items-center gap-4 text-[#25B8E4] text-[14px] lg:text-[16px] frutiger-lt-std-bold py-4 transition-all duration-300'
                                    >
                                        {t('solutionsandservices.learnMore')}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            className={`mt-[4px] ${i18n.language === "ar" ? "rotate-180" : ""}
                                            `}>
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
                onClose={() => setIsModalOpen(false)}
                serviceType={selectedServiceType}
            // onDownloadClick={handleDownloadClick}
            />

            {/* Download Bundles Form Modal */}
            {/* <DownloadBundlesForm
                isOpen={isDownloadFormOpen}
                onClose={closeDownloadForm}
            /> */}
        </div>
    )
}

export default ManagedSecurityServices
