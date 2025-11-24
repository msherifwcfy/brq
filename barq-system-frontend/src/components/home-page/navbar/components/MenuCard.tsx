import { motion } from 'framer-motion';

interface MenuCardProps {
    label: string;
    description?: string;
    icon: React.ReactNode;
    href: string;
    index: number;
    onClick: (e: React.MouseEvent) => void;
    onMouseEnter?: () => void;
    hasSubmenu?: boolean;
    isSubmenuOpen?: boolean;
    showArrow?: boolean;
}

export const MenuCard = ({
    label,
    description,
    icon,
    index,
    onClick,
    onMouseEnter,
    hasSubmenu,
    isSubmenuOpen,
    showArrow = true,
}: MenuCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className='relative w-[370px] min-h-[90px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
            onMouseEnter={onMouseEnter}
        >
            <div
                className='flex items-start space-x-[6px] p-3 transition-all duration-200 cursor-pointer'
                onClick={onClick}
                onMouseDown={e => e.stopPropagation()}
            >
                <div className='w-[24px] h-[24px] mt-[2px] transition-colors'>
                    {icon}
                </div>
                <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-white text-[16px] leading-[22.4px] tracking-[-0.128px] font-normal mb-1'>
                            {label}
                        </h3>
                        {showArrow && !hasSubmenu && (
                            <svg className='opacity-0 group-hover/card:opacity-100 transition-opacity duration-200' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z" fill="#25B8E4" />
                            </svg>
                        )}
                        {hasSubmenu && (
                            <div className='w-[24px] h-[24px] transition-transform duration-200'>
                                {isSubmenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                        )}
                    </div>
                    {description && (
                        <p className='text-[#C5CBCC] text-[14px] leading-[140%] font-normal transition-colors'>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

