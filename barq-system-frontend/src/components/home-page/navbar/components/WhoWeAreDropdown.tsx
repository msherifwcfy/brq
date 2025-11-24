import { motion, AnimatePresence } from 'framer-motion';
import { MenuCard } from './MenuCard';
import { ChevronIconWithHover } from './ChevronIcon';
import { whoWeAreItems } from '../constants/menuItems';

interface WhoWeAreDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeAllDropdowns: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const WhoWeAreDropdown = ({
  isOpen,
  setIsOpen,
  closeAllDropdowns,
  dropdownRef,
}: WhoWeAreDropdownProps) => {
  const handleItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    window.location.href = href;
  };

  return (
    <div
      className={`${isOpen ? 'bg-[#FFFFFF14] border-[#FFFFFF1A]' : ''} relative hover:bg-[#FFFFFF14] group/who-we-are py-2 rounded-[4px] min-w-[145px] border-[1px] border-transparent hover:border-[#FFFFFF1A]`}
      ref={dropdownRef}
    >
      <div
        className='flex items-center space-x-[2px] cursor-pointer transition-colors px-5 text-[14px] leading-[19.6px] tracking-[-0.112px]'
        onClick={() => {
          setIsOpen(!isOpen);
          closeAllDropdowns();
        }}
      >
        <span>Who We Are</span>
        <ChevronIconWithHover
          isOpen={isOpen}
          groupHoverClass='group-hover/who-we-are:hidden'
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='absolute top-full left-[-80%] mt-[8.22px] w-[832px] max-h-[358px] bg-[#000000A3] border border-[#FFFFFF1A] rounded-[8px] backdrop-[blur(10px)] overflow-hidden z-[9999]'
            style={{
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              background: 'rgba(0, 0, 0, 0.64)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            <div className='p-8 w-[832px]'>
              <div className='grid grid-cols-2 gap-3'>
                {/* Left Column */}
                <div className='space-y-3'>
                  {whoWeAreItems.slice(0, 3).map((item, index) => (
                    <MenuCard
                      key={item.label}
                      {...item}
                      index={index}
                      onClick={e => handleItemClick(e, item.href)}
                    />
                  ))}
                </div>

                {/* Right Column */}
                <div className='space-y-3'>
                  {whoWeAreItems.slice(3).map((item, index) => (
                    <MenuCard
                      key={item.label}
                      {...item}
                      index={index + 3}
                      onClick={e => handleItemClick(e, item.href)}
                    />
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
