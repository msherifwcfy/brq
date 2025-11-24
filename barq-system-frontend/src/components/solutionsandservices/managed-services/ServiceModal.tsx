'use client';

import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
            title: string;
            items: string[];
            countries?: {
                name: string;
                regulator: string[];
            }[];
        }[];
    };
}

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: ServiceData | null;
    onDownloadClick?: () => void;
}

export default function ServiceModal({
    isOpen,
    onClose,
    service,
    onDownloadClick
}: ServiceModalProps) {
    const handleDownloadClick = () => {
        if (onDownloadClick) {
            onDownloadClick();
        }
    };

    if (!service) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay className="bg-black/10" />
            <DialogContent
                className={cn(
                    `w-full lg:min-w-[1280px] lg:max-w-[1280px] ${service?.id === "cybersecurity" ? "lg:h-[501px]" :
                        service?.id === "grc" ? "lg:h-[523px]" :
                            "lg:h-[465px]"
                    } max-h-[523px] p-0 overflow-hidden",
                    "fixed top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                `)}
                style={{
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    background: "rgba(0, 0, 0, 0.64)",
                    backdropFilter: "blur(10px)"
                }}
                showCloseButton={false}
            >
                <div className="relative w-full h-full  lg:w-[1280px]">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute border-[2px] border-[#fff] w-[30px] h-[30px] flex items-center justify-center top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    >
                        <XIcon size={30} className='text-white min-w-[20px] min-h-[20px]' />
                    </button>

                    {/* Content */}
                    <div className={`relative z-10 flex gap-10 h-full ${service.id === "grc" ? "px-8" : "px-6"} pt-[80px] pb-8`}>
                        {/* Left Side - Image */}

                        {/* Right Side - Content */}
                        <motion.div
                            className="flex flex-col justify-center min-w-[695px]"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="w-full">
                                {/* Service Title */}
                                {/* Service Sections */}
                                <motion.div
                                    className={`flex ${(service.id === "cybersecurity" || service.id === "grc") ? "gap-[40px]" : "gap-10"}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    {service.modalContent.sections.map((section, index: number) => (
                                        <div key={index} className={`flex-1  flex flex-col    items-start py-10 px-6 ${(service.id === "cybersecurity" || service.id === "grc") ? "justify-start" : "justify-between"}`}
                                            style={{
                                                minWidth: (service.id === "cybersecurity" || service.id === "grc") ? "588px" : "596px",
                                                height: service.id === "grc" ? "411px" : (service.id === "cybersecurity" ? "389px" : "353px"),
                                                borderRadius: "24px",
                                                border: "1px solid rgba(255, 255, 255, 0.16)",
                                                background: "rgba(255, 255, 255, 0.04)",
                                                backdropFilter: "blur(10px)",
                                            }}>
                                            <h3 className="text-[#25B8E4] text-[18px] frutiger-lt-std-bold leading-[21.6px] ">
                                                {section?.icon && (
                                                    <Image
                                                        src={section.icon as string}
                                                        alt={section.title}
                                                        width={
                                                            (index === 0 && service.id === "soc") ? 134 :
                                                                (index === 1 && service.id === "soc") ? 126 :
                                                                    (index === 2 && service.id === "cybersecurity") ? 247 :
                                                                        (index === 3 && service.id === "cybersecurity") ? 241 :
                                                                            200
                                                        }
                                                        height={48}
                                                        className={`lg:h-[48px] ${(service.id === "cybersecurity" && index === 0) ? "lg:w-[247px]" : (service.id === "cybersecurity" && index === 1) ? "lg:w-[241px]" : "lg:w-[200px]"}`}
                                                    />
                                                )}
                                            </h3>

                                            {(service.id === "soc") && (
                                                <div
                                                    className={`text-[18px] mt-8 text-[#D9DDDD] leading-[27px] lg:h-[130px] ${index === 0 ? "tracking-[0.02em]" : "tracking-[0.01em]"}`}
                                                >
                                                    {section.desc}
                                                </div>
                                            )}

                                            {(service.id === "soc") && (
                                                <div className='flex '>
                                                    <button
                                                        onClick={handleDownloadClick}
                                                        className="text-[#25B8E4] flex items-center cursor-pointer gap-4  text-[16px] py-4 mt-4  frutiger-lt-std-bold hover:text-[#1da3cc] transition-colors"
                                                    >
                                                        Download The Bundles
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='pt-[2px]'>
                                                            <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="#25B8E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}

                                            {service.id === "cybersecurity" && (
                                                <div className='mt-7  '>
                                                    {section.items.map((item: string, itemIndex: number) => (
                                                        <div key={itemIndex} className=''>
                                                            <p className="text-white text-[18px]  leading-[26.5px] ">
                                                                •  {item}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {service.id === "grc" && (
                                                <div>
                                                    <div className=' text-white text-[36px]  leading-[27px]  frutiger-lt-std-bold' >
                                                        {section?.title}
                                                    </div>
                                                    {index === 0 ?
                                                        <div className='mt-8'>
                                                            {section.items.map((item: string, itemIndex: number) => (
                                                                <div key={itemIndex} >
                                                                    <p className="text-white text-[18px]  leading-[27px] ">
                                                                        •  {item}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        :
                                                        <div className='mt-8'>
                                                            {section.countries?.map((country, countryIndex: number) => (
                                                                <div key={countryIndex} >
                                                                    <p className="text-[#25B8E4] frutiger-lt-std-bold text-[18px]  leading-[27px] ">
                                                                        •  {country.name}
                                                                    </p>
                                                                    {country.regulator?.map((regulator: string, regulatorIndex: number) => (
                                                                        <p key={regulatorIndex} className="text-white ml-4 text-[18px]  leading-[27px] ">
                                                                            {regulator}
                                                                        </p>
                                                                    ))}

                                                                </div>
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                            )}

                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
}
