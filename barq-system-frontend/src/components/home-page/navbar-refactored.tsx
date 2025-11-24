'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useNavbarState } from './navbar/hooks/useNavbarState';
import { WhoWeAreDropdown } from './navbar/components/WhoWeAreDropdown';
import { WhatWeDoDropdown } from './navbar/components/WhatWeDoDropdown';
import { InsightsDropdown } from './navbar/components/InsightsDropdown';
import { LanguageSelector } from './navbar/components/LanguageSelector';
import { MobileMenu } from './navbar/components/MobileMenu';

export default function Navbar({ isHomePage }: { isHomePage?: boolean }) {
  const navbarState = useNavbarState();

  return (
    <motion.header
      className={`relative z-[99999999] h-[104.5px] w-full max-w-7xl mx-auto flex items-center justify-between py-[30px] lg:py-[30px] md:py-[20px] sm:py-[15px] px-4 ${isHomePage ? 'mb-[100px] lg:mb-[100px] md:mb-[80px] sm:mb-[60px]' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: isHomePage ? 4.2 : 0.2,
        ease: 'easeOut',
      }}
    >
      {/* Logo */}
      <motion.button
        onClick={() => (window.location.href = '/')}
        className='flex items-center cursor-pointer'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <Image
          src={'/assets/logo-blue.svg'}
          alt='logo'
          width={140}
          height={44.5}
          className='object-contain h-[44.5px] w-[140px]'
        />
      </motion.button>

      {/* Navigation Menu - Desktop (above 1080px) */}
      <motion.nav
        className='hidden min-[1080px]:flex items-center space-x-3 text-white nav-text'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <WhoWeAreDropdown
          isOpen={navbarState.isWhoWeAreOpen}
          setIsOpen={navbarState.setIsWhoWeAreOpen}
          closeAllDropdowns={() => {
            navbarState.setIsWhatWeDoOpen(false);
            navbarState.setIsInsightsOpen(false);
            navbarState.setIsServicesSubmenuOpen(false);
          }}
          dropdownRef={navbarState.whoWeAreRef}
        />

        <WhatWeDoDropdown
          isOpen={navbarState.isWhatWeDoOpen}
          setIsOpen={navbarState.setIsWhatWeDoOpen}
          isServicesSubmenuOpen={navbarState.isServicesSubmenuOpen}
          setIsServicesSubmenuOpen={navbarState.setIsServicesSubmenuOpen}
          closeAllDropdowns={() => {
            navbarState.setIsWhoWeAreOpen(false);
            navbarState.setIsInsightsOpen(false);
          }}
          dropdownRef={navbarState.whatWeDoRef}
        />

        <InsightsDropdown
          isOpen={navbarState.isInsightsOpen}
          setIsOpen={navbarState.setIsInsightsOpen}
          closeAllDropdowns={() => {
            navbarState.setIsWhoWeAreOpen(false);
            navbarState.setIsWhatWeDoOpen(false);
            navbarState.setIsServicesSubmenuOpen(false);
          }}
          dropdownRef={navbarState.insightsRef}
        />

        <Link
          href='/careers'
          className='text-[14px] leading-[19.6px] tracking-[-0.112px] text-white relative hover:bg-[#FFFFFF14] py-2 px-5 rounded-[4px] border-[1px] border-transparent hover:border-[#FFFFFF1A]'
        >
          Careers
        </Link>

        <a
          href='/contact-us'
          className='text-[14px] leading-[19.6px] tracking-[-0.112px] text-white relative hover:bg-[#FFFFFF14] py-2 px-5 rounded-[4px] border-[1px] border-transparent hover:border-[#FFFFFF1A]'
        >
          Contact Us
        </a>
      </motion.nav>

      {/* Language and Search - Desktop (above 1080px) */}
      <motion.div
        className='hidden min-[1080px]:flex items-center space-x-10'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        <LanguageSelector
          isOpen={navbarState.isLanguageOpen}
          setIsOpen={navbarState.setIsLanguageOpen}
          closeAllDropdowns={navbarState.closeAllDropdowns}
          dropdownRef={navbarState.languageRef}
        />

        <button className='text-white hover:text-blue-300 transition-colors'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
          >
            <path
              d='M19 19.2617L13 13.2617M1 8.26172C1 9.18097 1.18106 10.0912 1.53284 10.9405C1.88463 11.7898 2.40024 12.5615 3.05025 13.2115C3.70026 13.8615 4.47194 14.3771 5.32122 14.7289C6.1705 15.0807 7.08075 15.2617 8 15.2617C8.91925 15.2617 9.82951 15.0807 10.6788 14.7289C11.5281 14.3771 12.2997 13.8615 12.9497 13.2115C13.5998 12.5615 14.1154 11.7898 14.4672 10.9405C14.8189 10.0912 15 9.18097 15 8.26172C15 7.34247 14.8189 6.43221 14.4672 5.58293C14.1154 4.73366 13.5998 3.96198 12.9497 3.31197C12.2997 2.66196 11.5281 2.14634 10.6788 1.79456C9.82951 1.44278 8.91925 1.26172 8 1.26172C7.08075 1.26172 6.1705 1.44278 5.32122 1.79456C4.47194 2.14634 3.70026 2.66196 3.05025 3.31197C2.40024 3.96198 1.88463 4.73366 1.53284 5.58293C1.18106 6.43221 1 7.34247 1 8.26172Z'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </motion.div>

      {/* Mobile Hamburger Button (below 1080px) */}
      <motion.button
        className='min-[1080px]:hidden relative text-white z-[999999999] p-2'
        onClick={() =>
          navbarState.setIsMobileMenuOpen(!navbarState.isMobileMenuOpen)
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {navbarState.isMobileMenuOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M18 6L6 18M6 6L18 18'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M3 12H21M3 6H21M3 18H21'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </motion.button>

      {/* Mobile Menu (below 1080px) */}
      <MobileMenu
        isOpen={navbarState.isMobileMenuOpen}
        setIsOpen={navbarState.setIsMobileMenuOpen}
        mobileWhoWeAreOpen={navbarState.mobileWhoWeAreOpen}
        setMobileWhoWeAreOpen={navbarState.setMobileWhoWeAreOpen}
        mobileWhatWeDoOpen={navbarState.mobileWhatWeDoOpen}
        setMobileWhatWeDoOpen={navbarState.setMobileWhatWeDoOpen}
        mobileInsightsOpen={navbarState.mobileInsightsOpen}
        setMobileInsightsOpen={navbarState.setMobileInsightsOpen}
        mobileServicesOpen={navbarState.mobileServicesOpen}
        setMobileServicesOpen={navbarState.setMobileServicesOpen}
      />
    </motion.header>
  );
}