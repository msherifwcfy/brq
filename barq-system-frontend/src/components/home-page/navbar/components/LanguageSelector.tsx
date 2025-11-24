import { motion, AnimatePresence } from 'framer-motion';
import { languageOptions } from '../constants/menuItems';

interface LanguageSelectorProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeAllDropdowns: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const LanguageSelector = ({
  isOpen,
  setIsOpen,
  closeAllDropdowns,
  dropdownRef,
}: LanguageSelectorProps) => {
  const handleLanguageClick = (e: React.MouseEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    // Handle language change logic here
    console.log('Selected language:', code);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className='flex items-center space-x-2 text-white cursor-pointer transition-colors'
        onClick={() => {
          setIsOpen(!isOpen);
          closeAllDropdowns();
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='25'
          viewBox='0 0 24 25'
          fill='none'
        >
          <path
            d='M3.6 9.26147H20.4M3.6 15.2615H20.4M11.5 3.26147C9.81534 5.96109 8.9222 9.07934 8.9222 12.2615C8.9222 15.4436 9.81534 18.5619 11.5 21.2615M12.5 3.26147C14.1847 5.96109 15.0778 9.07934 15.0778 12.2615C15.0778 15.4436 14.1847 18.5619 12.5 21.2615M3 12.2615C3 13.4434 3.23279 14.6137 3.68508 15.7056C4.13738 16.7976 4.80031 17.7897 5.63604 18.6254C6.47177 19.4612 7.46392 20.1241 8.55585 20.5764C9.64778 21.0287 10.8181 21.2615 12 21.2615C13.1819 21.2615 14.3522 21.0287 15.4442 20.5764C16.5361 20.1241 17.5282 19.4612 18.364 18.6254C19.1997 17.7897 19.8626 16.7976 20.3149 15.7056C20.7672 14.6137 21 13.4434 21 12.2615C21 9.87453 20.0518 7.58534 18.364 5.89751C16.6761 4.20969 14.3869 3.26147 12 3.26147C9.61305 3.26147 7.32387 4.20969 5.63604 5.89751C3.94821 7.58534 3 9.87453 3 12.2615Z'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span>EN</span>
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='25'
          viewBox='0 0 24 25'
          fill='none'
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d='M6 9.26147L12 15.2615L18 9.26147'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </motion.svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='absolute top-full left-0 mt-2 w-48 bg-black border border-[#FFFFFF1A] rounded-[8px] backdrop-[blur(10px)] overflow-hidden z-[9999]'
            onMouseDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            <div className='py-2'>
              {languageOptions.map((option, index) => (
                <motion.div
                  key={option.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className='relative'
                >
                  <div
                    className='flex items-center space-x-3 px-4 py-3 text-white hover:bg-[#FFFFFF14] hover:mx-2 rounded-[4px] border-[1px] border-transparent hover:border-[#FFFFFF1A] hover:text-white transition-all duration-200 cursor-pointer'
                    onClick={e => handleLanguageClick(e, option.code)}
                    onMouseDown={e => e.stopPropagation()}
                  >
                    <span className='text-[16px] leading-[22.4px] tracking-[-0.128px] font-normal text-white'>
                      {option.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
