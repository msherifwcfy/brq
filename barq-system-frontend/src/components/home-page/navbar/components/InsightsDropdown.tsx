import { motion, AnimatePresence } from 'framer-motion';
import { ChevronIconWithHover } from './ChevronIcon';
import { newsroomItems } from '../constants/menuItems';

interface InsightsDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeAllDropdowns: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const InsightsDropdown = ({
  isOpen,
  setIsOpen,
  closeAllDropdowns,
  dropdownRef,
}: InsightsDropdownProps) => {
  const handleItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    window.location.href = href;
  };

  return (
    <div
      className={`${isOpen ? 'bg-[#FFFFFF14] border-[#FFFFFF1A]' : ''} relative hover:bg-[#FFFFFF14] py-2 group/insights rounded-[4px] min-w-[187px] border-[1px] border-transparent hover:border-[#FFFFFF1A]`}
      ref={dropdownRef}
    >
      <div
        className='flex items-center space-x-[2px] cursor-pointer transition-colors px-5 text-[14px] leading-[19.6px] tracking-[-0.112px]'
        onClick={() => {
          setIsOpen(!isOpen);
          closeAllDropdowns();
        }}
      >
        <span>Insights & Resources</span>
        <ChevronIconWithHover
          isOpen={isOpen}
          groupHoverClass='group-hover/insights:hidden'
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='absolute top-full left-[-160%] mt-[13.22px] h-[216px] w-[832px] border border-[#FFFFFF1A] rounded-[8px] backdrop-[blur(10px)] overflow-hidden z-[9999]'
            style={{
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              background: 'rgba(0, 0, 0, 0.64)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            <div className='p-8 w-[832px] h-[216px]'>
              <div className='grid grid-cols-2 gap-3'>
                {/* Left Column */}
                <div className='space-y-4'>
                  {newsroomItems.slice(0, 2).map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className='relative w-[370px] h-[70px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
                    >
                      <div
                        className='flex items-start space-x-[6px] p-3 transition-all duration-200 cursor-pointer group'
                        onClick={e => handleItemClick(e, item.href)}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <div className='w-[24px] h-[24px] mt-[2px] transition-colors'>
                          {item.icon}
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-white text-[16px] leading-[22.4px] tracking-[-0.128px] font-normal mb-1'>
                            {item.label}
                          </h3>
                          <p className='text-[#C5CBCC] text-[14px] leading-[140%] font-normal transition-colors'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <svg
                        className='opacity-0 absolute top-3 right-3 group-hover/card:opacity-100 transition-opacity duration-200'
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                      >
                        <path
                          d='M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z'
                          fill='#25B8E4'
                        />
                      </svg>
                    </motion.div>
                  ))}
                </div>

                {/* Right Column */}
                <div className='space-y-4'>
                  {newsroomItems.slice(2).map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: (index + 2) * 0.05 }}
                      className='relative w-[370px] h-[70px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
                    >
                      <div
                        className='flex items-start space-x-[6px] p-3 rounded- transition-all duration-200 cursor-pointer group'
                        onClick={e => handleItemClick(e, item.href)}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <div className='w-[24px] h-[24px] mt-[2px] transition-colors'>
                          {item.icon}
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-white text-[16px] leading-[22.4px] tracking-[-0.128px] font-normal mb-1'>
                            {item.label}
                          </h3>
                          <p className='text-[#C5CBCC] text-[14px] leading-[140%] font-normal transition-colors'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <svg
                        className='opacity-0 absolute top-3 right-3 group-hover/card:opacity-100 transition-opacity duration-200'
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                      >
                        <path
                          d='M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z'
                          fill='#25B8E4'
                        />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
