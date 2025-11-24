'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { TeamMember } from '@/data/leadership';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface MemberBioModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: TeamMember | null;
    onNext: () => void;
    onPrevious: () => void;
    onSelectMember: (index: number) => void;
    currentIndex: number;
    totalMembers: number;
    teamMembers?: TeamMember[];
}

export default function MemberBioModal({
    isOpen,
    onClose,
    member,
    onNext,
    onPrevious,
    currentIndex,
    totalMembers,
}: MemberBioModalProps) {
    const { i18n } = useTranslation();

    if (!member) return null;

    const isFirstMember = currentIndex === 0;
    const isLastMember = currentIndex === totalMembers - 1;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay className="bg-black/50" />
            <DialogContent
                className={cn(
                    "w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] lg:w-full lg:min-w-7xl max-w-none",
                    "max-h-[75vh] sm:h-[80vh] lg:h-auto lg:min-h-[522px]",
                    "p-0 !grid-none flex flex-col",
                    "fixed top-[40%] lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    background: "rgba(0, 0, 0, 0.64)",
                    backdropFilter: "blur(10px)"
                }}
                showCloseButton={false}
            >
                <div className="relative w-full h-full flex-1 overflow-y-auto lg:overflow-hidden">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={`absolute border-[2px] border-[#fff] w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] flex items-center justify-center top-4 ${i18n.language === "ar" ? "left-4" : "right-4"} sm:top-6 sm:${i18n.language === "ar" ? "left-6" : "right-6"} lg:top-6 lg:${i18n.language === "ar" ? "left-6" : "right-6"} z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer`}
                    >
                        <XIcon size={30} className='text-white min-w-[18px] min-h-[18px] sm:min-w-[20px] sm:min-h-[20px]' />
                    </button>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 h-full py-8 pb-8 px-4 sm:px-6 lg:py-6 lg:pb-6 lg:mt-2 lg:px-6">
                        {/* Left Side - Image */}
                        <motion.div
                            className="flex items-center justify-center w-full lg:w-auto"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div
                                style={{
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255, 255, 255, 0.10)",
                                    backgroundImage: `url("${encodeURI(member.image)}")`,
                                    backgroundPosition: member.id === "ghadah-aldabbagh" ? "90% 100%" : "center center",
                                    backgroundSize: member.id === "ghadah-aldabbagh" ? "cover" : "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                    backdropFilter: "blur(10px)"

                                }}
                                className="relative w-[350px] lg:w-[505px]  h-[300px] lg:h-[414px]">
                            </div>
                        </motion.div>

                        {/* Right Side - Content */}
                        <motion.div
                            className="flex flex-col justify-center w-full lg:min-w-[695px]"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="w-full">
                                {/* Name and Position */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <h2 className="text-white text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] frutiger-lt-std-bold leading-[1.2] lg:leading-[42.3px] mb-2 sm:mb-3 lg:mb-4 break-words">
                                        {member.name}
                                    </h2>
                                    <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] mb-3 sm:mb-4 text-[#ECEEEE] frutiger-lt-std-bold leading-[1.2] lg:leading-[28.8px] opacity-[87%] break-words">
                                        {member.position}
                                    </p>
                                </motion.div>
                                {/* Bio */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <p className={`text-[#D9DDDD] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.5] lg:leading-[27px] mb-6 sm:mb-8 lg:mb-[52px]
                                        ${member.id === "mahmoud-soliman" ? "lg:max-w-[656px]" :
                                            member.id === "mohamed-tawfik" ? "lg:max-w-[670px]" :
                                                member.id === "ramy-abdallah" ? "lg:max-w-[680px]" :
                                                    member.id === "tamer-assaad" ? "lg:max-w-[672px]" :
                                                        member.id === "farah-swailam" ? "lg:max-w-[660px]" :
                                                            member.id === "ahmed-taher" ? "lg:max-w-[675px]" :
                                                                member.id === "ahmed-alyamani" ? "lg:max-w-[667.8px]" :
                                                                    member.id === "mohamed-jazeel" ? "lg:max-w-[675px]" :
                                                                        member.id === "ghadah-aldabbagh" ? "lg:max-w-[665px]" :
                                                                            "lg:max-w-[695px]"}
                                        max-h-none lg:h-[202px] opacity-[87%] break-words overflow-wrap-anywhere`}>
                                        {member.bio}
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-4 pb-4 sm:pb-6 lg:pb-0"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    <div className="flex justify-center gap-4 sm:gap-6">
                                        <button
                                            onClick={onPrevious}
                                            disabled={isFirstMember}
                                            className={cn(
                                                "w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] lg:w-[58px] lg:h-14 flex items-center justify-center rounded-full border-[1.5px] bg-transparent transition-all duration-300",
                                                isFirstMember
                                                    ? "border-gray-600 opacity-40 cursor-not-allowed"
                                                    : "border-[#5DADE2] text-[#5DADE2] hover:bg-white/10"
                                            )}
                                        >
                                            <Image
                                                src="/assets/leadership/left-arrow.svg"
                                                alt="arrow-left"
                                                width={14}
                                                height={18}
                                                className={cn(
                                                    'min-h-[16px] sm:min-h-[18px]',
                                                    !isFirstMember && 'hover:fill-white',
                                                    i18n.language === "ar" ? "rotate-180" : ""
                                                )}
                                            />
                                        </button>
                                        <button
                                            onClick={onNext}
                                            disabled={isLastMember}
                                            className={cn(
                                                "w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] lg:w-[58px] lg:h-14 flex items-center justify-center rounded-full border-[1.5px] bg-transparent transition-all duration-300",
                                                isLastMember
                                                    ? "border-gray-600 opacity-40 cursor-not-allowed"
                                                    : "border-[#5DADE2] text-[#5DADE2] hover:bg-white/10"
                                            )}
                                        >
                                            <Image
                                                src="/assets/leadership/right-arrow.svg"
                                                alt="arrow-right"
                                                width={14}
                                                height={18}
                                                className={cn(
                                                    'min-h-[16px] sm:min-h-[18px]',
                                                    !isLastMember && 'hover:fill-white',
                                                    i18n.language === "ar" ? "rotate-180" : ""

                                                )}
                                            />
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </DialogContent >
        </Dialog >
    );
}
