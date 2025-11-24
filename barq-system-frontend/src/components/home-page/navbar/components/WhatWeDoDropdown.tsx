import { motion, AnimatePresence } from 'framer-motion';
import { MenuCard } from './MenuCard';
import { ChevronIconWithHover } from './ChevronIcon';
import { whatWeDoItems, servicesSubmenuItems } from '../constants/menuItems';

interface WhatWeDoDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isServicesSubmenuOpen: boolean;
  setIsServicesSubmenuOpen: (open: boolean) => void;
  closeAllDropdowns: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const WhatWeDoDropdown = ({
  isOpen,
  setIsOpen,
  isServicesSubmenuOpen,
  setIsServicesSubmenuOpen,
  closeAllDropdowns,
  dropdownRef,
}: WhatWeDoDropdownProps) => {
  const handleItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setIsServicesSubmenuOpen(false);
    window.location.href = href;
  };

  const handleMouseEnter = (hasSubmenu: boolean) => {
    if (hasSubmenu) {
      setIsServicesSubmenuOpen(true);
    } else {
      setIsServicesSubmenuOpen(false);
    }
  };

  return (
    <div
      className={`${isOpen ? 'bg-[#FFFFFF14] border-[#FFFFFF1A]' : ''} relative hover:bg-[#FFFFFF14] py-2 group/what-we-do rounded-[4px] min-w-[145px] border-[1px] border-transparent hover:border-[1px] hover:border-[#FFFFFF1A]`}
      ref={dropdownRef}
    >
      <div
        className='flex items-center space-x-[2px] cursor-pointer transition-colors px-5 text-[14px] leading-[19.6px] tracking-[-0.112px]'
        onClick={() => {
          setIsOpen(!isOpen);
          closeAllDropdowns();
          setIsServicesSubmenuOpen(false);
        }}
      >
        <span>What We Do</span>
        <ChevronIconWithHover
          isOpen={isOpen}
          groupHoverClass='group-hover/what-we-do:hidden'
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              background: 'rgba(0, 0, 0, 0.64)',
              backdropFilter: 'blur(10px)',
            }}
            className={`absolute top-full left-[-70%] mt-[13.22px] ${
              isServicesSubmenuOpen
                ? 'min-w-[816px] max-h-[356px]'
                : 'min-w-[434px] max-h-[256px]'
            } border border-[#FFFFFF1A] rounded-[8px] backdrop-[blur(10px)] overflow-hidden z-[9999]`}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            onMouseLeave={() => setIsServicesSubmenuOpen(false)}
          >
            <div className='p-8'>
              <div
                className={`${isServicesSubmenuOpen ? 'grid grid-cols-2 gap-6' : 'space-y-3'}`}
              >
                {/* Left Column - Main Items */}
                <div className='space-y-3'>
                  {whatWeDoItems.map((item, index) => (
                    <MenuCard
                      key={item.label}
                      {...item}
                      index={index}
                      onClick={e => handleItemClick(e, item.href)}
                      onMouseEnter={() =>
                        handleMouseEnter(item.hasSubmenu || false)
                      }
                      isSubmenuOpen={isServicesSubmenuOpen}
                    />
                  ))}
                </div>

                {/* Right Column - Submenu Items */}
                {isServicesSubmenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className='space-y-3'
                  >
                    {servicesSubmenuItems.map((subItem, index) => (
                      <motion.div
                        key={subItem.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className='relative w-[370px] min-h-[60px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14]'
                      >
                        <div
                          className='flex items-center p-4 transition-all duration-200 cursor-pointer group'
                          onClick={e => handleItemClick(e, subItem.href)}
                          onMouseDown={e => e.stopPropagation()}
                        >
                          <h4 className='text-white text-[16px] leading-[22.4px] tracking-[-0.128px] font-normal transition-colors'>
                            {subItem.label}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
