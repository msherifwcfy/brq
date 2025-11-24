import Image from 'next/image'
import React, { useState, useMemo } from 'react'
import DownloadBundlesForm from './DownloadBundlesForm';
import { useTranslation } from 'react-i18next';
import type {
    AdditionalManagedServicesOneEntity,
    AdditionalManagedServicesTwoEntity,
} from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';

interface MoreServicesProps {
    additionalManagedServicesOne: AdditionalManagedServicesOneEntity[];
    additionalManagedServicesTwo: AdditionalManagedServicesTwoEntity[];
}

const MoreServices = ({
    additionalManagedServicesOne,
    additionalManagedServicesTwo,
}: MoreServicesProps) => {
    const [isDownloadFormOpen, setIsDownloadFormOpen] = useState(false);
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language || 'en';

    const firstTwoServices = useMemo(() => {
        return additionalManagedServicesOne.slice(0, 2).map((service) => {
            const translation = service.additional_managed_services_one_id_additional_managed_services_one_translations?.find(
                (t) => t.language === currentLanguage
            ) || service.additional_managed_services_one_id_additional_managed_services_one_translations?.[0];

            return {
                id: service.id.toString(),
                icon: getImageUrl(service.logo),
                description: translation?.description || service.description || '',
                ctaLabel: translation?.cta_label || 'Check our bundles',
            };
        });
    }, [additionalManagedServicesOne, currentLanguage]);

    const remainingServices = useMemo(() => {
        return additionalManagedServicesTwo.map((service) => {
            const translation = service.additional_managed_services_two_id_additional_managed_services_two_translations?.find(
                (t) => t.language === currentLanguage
            ) || service.additional_managed_services_two_id_additional_managed_services_two_translations?.[0];

            const description = translation?.description || service.description || '';
            const items = description.split('\n').filter(item => item.trim());

            return {
                id: service.id.toString(),
                icon: getImageUrl(service.logo),
                description: description,
                items: items,
            };
        });
    }, [additionalManagedServicesTwo, currentLanguage]);


    const handleDownloadFormOpen = () => {
        setIsDownloadFormOpen(true)
    }

    const handleDownloadFormClose = () => {
        setIsDownloadFormOpen(false)
    }

    return (
        <div className='max-w-7xl mx-auto relative z-50 lg:mt-[200px] mt-40 lg:pb-[178px] pb-[100px] w-full px-[5%] xl:px-0' >
            {/* Section Header */}
            <div id='managed-service-2' className='absolute top-[-5%]' />
            <div className='flex lg:mb-12 mb-8'>
                <div className=''>
                    <Image
                        src="/assets/solutionsandservices/managed-services/MORE SERVICES-WHITE 1.svg"
                        alt="More Services"
                        width={289}
                        height={80}
                        className='mb-4 lg:mb-6 lg:w-[289px] w-[210px] h-auto'
                    />
                    <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:w-[992px] w-full'>
                        BARQ Systems&apos; managed services go beyond keeping operations running we keep our customers ahead. From NOC <br className='hidden lg:block' /> operations and SLA governance to customer enablement, IT talent, professional services, warehouse support, and  <br className='hidden lg:block' />PMO expertise, we combine deep industry experience with a hands-on approach that empowers organizations to lead <br className='hidden lg:block' /> with resilience and agility                    </p>
                </div>
            </div>


            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10'>
                {firstTwoServices.map((service, index) => (
                    <div
                        key={service.id}
                        style={{
                            display: 'flex',
                            padding: '40px 24px',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                        }}
                        className='flex flex-col lg:h-[407px] h-auto'
                    >
                        {service.icon && (
                            <Image
                                src={service.icon}
                                alt="Service logo"
                                width={index === 0 ? 150 : 172}
                                height={48}
                                className='object-contain lg:w-[150px] w-[120px] h-auto'
                            />
                        )}
                        <p className='text-[#D9DDDD] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] w-full mt-6 lg:mt-8'>
                            {service.description.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < service.description.split('\n').length - 1 && <br className='hidden lg:block' />}
                                </React.Fragment>
                            ))}
                        </p>
                        <button
                            onClick={handleDownloadFormOpen}
                            className='flex items-center gap-4 text-[#25B8E4] text-[14px] lg:text-[16px] frutiger-lt-std-bold transition-all duration-300 py-4 mt-6 lg:mt-4 hover:text-[#1da3cc] cursor-pointer'>
                            {service.ctaLabel}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none" className={`mt-[2px] ${i18n.language === "ar" ? "rotate-180" : ""}`}>
                                <path d="M1 7H15M15 7L9 13M15 7L9 1" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Services Grid - 3x2 Layout - Desktop Only */}

            <div className='mt-8 lg:mt-12 lg:flex hidden flex-row h-[780px] gap-6'>
                {/* right side */}
                <div className='flex flex-col  w-full'>
                    {/*  */}
                    <div className='flex gap-6 h-[456px]'>
                        {/* First service from remainingServices */}
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
                            {remainingServices[0]?.icon && (
                                <Image
                                    src={remainingServices[0].icon}
                                    alt="Service logo"
                                    width={129}
                                    height={40}
                                    className='object-contain'
                                />
                            )}
                            {remainingServices[0]?.items && remainingServices[0].items.length > 0 && (
                                <div className='flex flex-col mt-8'>
                                    {remainingServices[0].items.map((item, idx) => (
                                        <p key={idx} className='text-[#D9DDDD] text-[18px] font-normal leading-[36px]'>{item}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col gap-6 flex-1'>
                            {/* Second service from remainingServices */}
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
                                {remainingServices[1]?.icon && (
                                    <Image
                                        src={remainingServices[1].icon}
                                        alt="Service logo"
                                        width={220}
                                        height={40}
                                        className='object-contain'
                                    />
                                )}
                                {remainingServices[1]?.items && remainingServices[1].items.length > 0 && (
                                    <div className='flex flex-col mt-8'>
                                        {remainingServices[1].items.map((item, idx) => (
                                            <p key={idx} className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>{item}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Third service from remainingServices */}
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
                                {remainingServices[2]?.icon && (
                                    <Image
                                        src={remainingServices[2].icon}
                                        alt="Service logo"
                                        width={189}
                                        height={48}
                                        className='object-contain'
                                    />
                                )}
                                {remainingServices[2]?.items && remainingServices[2].items.length > 0 && (
                                    <div className='flex flex-col mt-8'>
                                        {remainingServices[2].items.map((item, idx) => (
                                            <p key={idx} className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>{item}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='flex gap-6 mt-6'>
                        {/* Static VR Image Card */}
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
                            <div className='absolute w-[434px] '>
                                <Image src="/assets/solutionsandservices/managed-services/Rectangle 10.svg" alt="Customer Enablement" width={434} height={268} className='object-contain lg:min-w-[434px]  lg:h-[268px]' />
                            </div>
                            <Image
                                src="/assets/solutionsandservices/managed-services/woman-wearing-virtual-reality-simulator 1.png"
                                alt="VR Technology"
                                width={482}
                                height={360}
                                className='object-contain z-10 absolute top-[-21.8%] '
                            />
                        </div>
                        {/* Fourth service from remainingServices */}
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
                            {remainingServices[3]?.icon && (
                                <Image
                                    src={remainingServices[3].icon}
                                    alt="Service logo"
                                    width={193}
                                    height={40}
                                    className='object-contain'
                                />
                            )}
                            {remainingServices[3]?.items && remainingServices[3].items.length > 0 && (
                                <div className='flex flex-col mt-8'>
                                    {remainingServices[3].items.map((item, idx) => (
                                        <p key={idx} className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>{item}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Left side */}
                <div className='flex flex-col gap-6 w-[430px]'>
                    {/* Fifth service from remainingServices */}
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
                        {remainingServices[4]?.icon && (
                            <Image
                                src={remainingServices[4].icon}
                                alt="Service logo"
                                width={277}
                                height={40}
                                className='object-contain'
                            />
                        )}
                        {remainingServices[4]?.items && remainingServices[4].items.length > 0 && (
                            <div className='flex flex-col'>
                                {remainingServices[4].items.map((item, idx) => (
                                    <p key={idx} className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>{item}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Static Data Center Image Card */}
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
                            <Image src="/assets/solutionsandservices/managed-services/Rectangle 10 (1).svg" alt="Customer Enablement" width={398} height={532} className='object-contain' />
                        </div>
                        <Image
                            src="/assets/solutionsandservices/managed-services/data-center-technician-ensuring-safety-security-database-using-tablet 1.png"
                            alt="Data Center Technician"
                            width={440}
                            height={555}
                            className='object-contain z-10 top-[-8px] absolute left-[4%]'
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Stacked Cards */}
            <div className='lg:hidden flex flex-col gap-6 mt-8'>
                {remainingServices.map((service, index) => {
                    if (index === 3) {
                        return (
                            <React.Fragment key={`fragment-${index}`}>
                                <div
                                    style={{
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(10px)',
                                        minHeight: '280px',
                                    }}
                                    className='flex justify-center items-center p-4 relative'
                                >
                                    <div className='absolute '>
                                        <Image src="/assets/solutionsandservices/managed-services/Rectangle 10.svg" alt="Customer Enablement" width={434} height={268} className='object-contain' />
                                    </div>
                                    <Image
                                        src="/assets/solutionsandservices/managed-services/woman-wearing-virtual-reality-simulator 1.png"
                                        alt="VR Technology"
                                        width={482}
                                        height={360}
                                        className='object-contain z-10 relative scale-90'
                                    />
                                </div>
                                <div
                                    key={service?.id || `service-${index}`}
                                    style={{
                                        display: 'flex',
                                        padding: '40px 24px',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    className='flex flex-col'
                                >
                                    {service?.icon && (
                                        <Image
                                            src={service.icon}
                                            alt="Service logo"
                                            width={193}
                                            height={40}
                                            className='object-contain w-[155px] h-auto'
                                        />
                                    )}
                                    {service?.items && service.items.length > 0 && (
                                        <div className='flex flex-col mt-6'>
                                            {service.items.map((item, idx) => (
                                                <p key={idx} className='text-[#D9DDDD] text-[16px] font-normal leading-[24px]'>{item}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    }
                    if (index === 4) {
                        return (
                            <React.Fragment key={`fragment-${index}`}>
                                <div
                                    key={service?.id || `service-${index}`}
                                    style={{
                                        display: 'flex',
                                        padding: '40px 24px',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        gap: '32px',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    className='flex flex-col'
                                >
                                    {service?.icon && (
                                        <Image
                                            src={service.icon}
                                            alt="Service logo"
                                            width={277}
                                            height={40}
                                            className='object-contain w-[210px] h-auto'
                                        />
                                    )}
                                    {service?.items && service.items.length > 0 && (
                                        <div className='flex flex-col'>
                                            {service.items.map((item, idx) => (
                                                <p key={idx} className='text-[#D9DDDD] text-[16px] font-normal leading-[24px]'>{item}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div
                                    style={{
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(10px)',
                                        minHeight: '320px',
                                    }}
                                    className='flex justify-center items-center p-4 relative'
                                >
                                    <div className='absolute top-[-1px]'>
                                        <Image src="/assets/solutionsandservices/managed-services/Rectangle 10 (1).svg" alt="Customer Enablement" width={398} height={532} className='object-contain' />
                                    </div>
                                    <Image
                                        src="/assets/solutionsandservices/managed-services/data-center-technician-ensuring-safety-security-database-using-tablet 1.png"
                                        alt="Data Center Technician"
                                        width={440}
                                        height={555}
                                        className='object-contain z-10 relative scale-90'
                                    />
                                </div>
                            </React.Fragment>
                        );
                    }
                    return (
                        <div
                            key={service?.id || `service-${index}`}
                            style={{
                                display: 'flex',
                                padding: '40px 24px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)',
                            }}
                            className='flex flex-col'
                        >
                            {service?.icon && (
                                <Image
                                    src={service.icon}
                                    alt="Service logo"
                                    width={index === 0 ? 129 : index === 1 ? 220 : 189}
                                    height={40}
                                    className='object-contain w-[110px] h-auto'
                                />
                            )}
                            {service?.items && service.items.length > 0 && (
                                <div className='flex flex-col mt-6'>
                                    {service.items.map((item, idx) => (
                                        <p key={idx} className='text-[#D9DDDD] text-[16px] font-normal leading-[24px]'>{item}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <DownloadBundlesForm
                isOpen={isDownloadFormOpen}
                onClose={handleDownloadFormClose}
            />
        </div >
    )
}

export default MoreServices