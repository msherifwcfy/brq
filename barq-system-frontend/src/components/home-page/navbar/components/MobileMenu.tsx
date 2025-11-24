import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { whoWeAreItems, whatWeDoItems, servicesSubmenuItems, newsroomItems } from '../constants/menuItems';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    mobileWhoWeAreOpen: boolean;
    setMobileWhoWeAreOpen: (open: boolean) => void;
    mobileWhatWeDoOpen: boolean;
    setMobileWhatWeDoOpen: (open: boolean) => void;
    mobileInsightsOpen: boolean;
    setMobileInsightsOpen: (open: boolean) => void;
    mobileServicesOpen: boolean;
    setMobileServicesOpen: (open: boolean) => void;
}

export const MobileMenu = ({
    isOpen,
    setIsOpen,
    mobileWhoWeAreOpen,
    setMobileWhoWeAreOpen,
    mobileWhatWeDoOpen,
    setMobileWhatWeDoOpen,
    mobileInsightsOpen,
    setMobileInsightsOpen,
    mobileServicesOpen,
    setMobileServicesOpen,
}: MobileMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className='min-[1080px]:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-lg z-[99999999] overflow-y-auto'
                >
                    <div className='flex flex-col p-6 pt-[120px] space-y-6'>
                        {/* Mobile Who We Are */}
                        <div className='border-b border-[#FFFFFF1A] pb-4'>
                            <button
                                className='flex items-center justify-between w-full text-white text-[16px] font-medium'
                                onClick={() => setMobileWhoWeAreOpen(!mobileWhoWeAreOpen)}
                            >
                                <span>Who We Are</span>
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    animate={{ rotate: mobileWhoWeAreOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                            </button>
                            <AnimatePresence>
                                {mobileWhoWeAreOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className='overflow-hidden'
                                    >
                                        <div className='flex flex-col space-y-3 mt-4'>
                                            {whoWeAreItems.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className='flex items-start space-x-3 p-3 rounded-lg bg-[#FFFFFF0A] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <div className='w-[24px] h-[24px] flex-shrink-0 mt-1'>
                                                        {item.icon}
                                                    </div>
                                                    <div className='flex-1'>
                                                        <h3 className='text-white text-[14px] font-medium mb-1'>{item.label}</h3>
                                                        <p className='text-[#C5CBCC] text-[12px] leading-[140%]'>{item.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile What We Do */}
                        <div className='border-b border-[#FFFFFF1A] pb-4'>
                            <button
                                className='flex items-center justify-between w-full text-white text-[16px] font-medium'
                                onClick={() => setMobileWhatWeDoOpen(!mobileWhatWeDoOpen)}
                            >
                                <span>What We Do</span>
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    animate={{ rotate: mobileWhatWeDoOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                            </button>
                            <AnimatePresence>
                                {mobileWhatWeDoOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className='overflow-hidden'
                                    >
                                        <div className='flex flex-col space-y-3 mt-4'>
                                            {whatWeDoItems.map((item) => (
                                                <div key={item.label}>
                                                    <Link
                                                        href={item.href}
                                                        className='flex items-start space-x-3 p-3 rounded-lg bg-[#FFFFFF0A] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                        onClick={(e) => {
                                                            if (item.hasSubmenu) {
                                                                e.preventDefault();
                                                                setMobileServicesOpen(!mobileServicesOpen);
                                                            } else {
                                                                setIsOpen(false);
                                                            }
                                                        }}
                                                    >
                                                        <div className='w-[24px] h-[24px] flex-shrink-0 mt-1'>
                                                            {item.icon}
                                                        </div>
                                                        <div className='flex-1'>
                                                            <div className='flex items-center justify-between'>
                                                                <h3 className='text-white text-[14px] font-medium mb-1'>{item.label}</h3>
                                                                {item.hasSubmenu && (
                                                                    <motion.svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 16 16"
                                                                        fill="none"
                                                                        animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        <path d="M4 6L8 10L12 6" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </motion.svg>
                                                                )}
                                                            </div>
                                                            <p className='text-[#C5CBCC] text-[12px] leading-[140%]'>{item.description}</p>
                                                        </div>
                                                    </Link>
                                                    {item.hasSubmenu && mobileServicesOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className='ml-4 mt-2 space-y-2'
                                                        >
                                                            {servicesSubmenuItems.map((subItem) => (
                                                                <Link
                                                                    key={subItem.label}
                                                                    href={subItem.href}
                                                                    className='block p-3 rounded-lg bg-[#FFFFFF05] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    <h4 className='text-white text-[13px]'>{subItem.label}</h4>
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Insights & Resources */}
                        <div className='border-b border-[#FFFFFF1A] pb-4'>
                            <button
                                className='flex items-center justify-between w-full text-white text-[16px] font-medium'
                                onClick={() => setMobileInsightsOpen(!mobileInsightsOpen)}
                            >
                                <span>Insights & Resources</span>
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    animate={{ rotate: mobileInsightsOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                            </button>
                            <AnimatePresence>
                                {mobileInsightsOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className='overflow-hidden'
                                    >
                                        <div className='flex flex-col space-y-3 mt-4'>
                                            {newsroomItems.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className='flex items-start space-x-3 p-3 rounded-lg bg-[#FFFFFF0A] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <div className='w-[24px] h-[24px] flex-shrink-0 mt-1'>
                                                        {item.icon}
                                                    </div>
                                                    <div className='flex-1'>
                                                        <h3 className='text-white text-[14px] font-medium mb-1'>{item.label}</h3>
                                                        <p className='text-[#C5CBCC] text-[12px] leading-[140%]'>{item.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Careers */}
                        <Link
                            href='/careers'
                            className='text-white text-[16px] font-medium border-b border-[#FFFFFF1A] pb-4'
                            onClick={() => setIsOpen(false)}
                        >
                            Careers
                        </Link>

                        {/* Mobile Contact Us */}
                        <Link
                            href='/contact-us'
                            className='text-white text-[16px] font-medium border-b border-[#FFFFFF1A] pb-4'
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

