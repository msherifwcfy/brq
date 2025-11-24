'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import type { FooterTermsEntity } from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';

interface FooterContentProps {
  contactData?: {
    phone_number?: string;
    phone_number_key?: string;
    email?: string;
  } | null;
  locationsData?: Array<{
    id: number;
    name: string;
  }>;
  termsData?: Array<FooterTermsEntity>;
}

const FooterContent = ({
  contactData,
  locationsData = [],
  termsData = [],
}: FooterContentProps) => {
  const { t } = useTranslation();

  const handleFileDownload = (url: string, label: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = label;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer
      className='text-white py-12 sm:py-14 md:py-16 lg:py-[54px] relative z-50 w-full overflow-visible'
      style={{
        background: 'linear-gradient(175deg, #03080E 13%, #1C3E74 96.02%)',
        paddingBottom: 'max(3rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className='max-w-[1280px] mx-auto px-[5%] md:px-8 lg:px-4'>
        <div className='pb-8 sm:pb-10 lg:pb-6'>
          <div className='w-full'>
            <div className='flex items-start justify-between w-full lg:gap-16 gap-y-10 gap-x-6 sm:gap-y-12 sm:gap-x-10 flex-wrap lg:flex-nowrap'>
              {/* Logo and Social Media Section */}
              <div className='flex flex-col justify-between gap-8 sm:gap-10 lg:gap-22 w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-2rem)] lg:w-[205px]'>
                <div>
                  <Image
                    src='/assets/logo.svg'
                    alt='logo'
                    width={150}
                    height={100}
                    className='w-[120px] sm:w-[130px] lg:w-[140px] h-fit object-contain'
                  />
                </div>
                <div className='flex gap-4 sm:gap-5 lg:gap-6 items-center w-full'>
                  <a href='#' className='opacity-60 hover:opacity-100 transition-opacity'>
                    <Image
                      src={'/assets/icons/Facebook.svg'}
                      alt='facebook'
                      width={20}
                      height={20}
                      className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]'
                    />
                  </a>
                  <a href='#' className='opacity-60 hover:opacity-100 transition-opacity'>
                    <Image
                      src={'/assets/icons/Linkedin.svg'}
                      alt='linkedin'
                      width={20}
                      height={20}
                      className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]'
                    />
                  </a>
                  <a href='#' className='opacity-60 hover:opacity-100 transition-opacity'>
                    <Image
                      src={'/assets/icons/Instagram.svg'}
                      alt='instagram'
                      width={20}
                      height={20}
                      className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]'
                    />
                  </a>
                </div>
              </div>

              {/* Services Section */}
              <div className='w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-2rem)] lg:w-[205px]'>
                <h3 className='frutiger-lt-std-bold leading-[24px] sm:leading-[27px] text-[16px] sm:text-[17px] lg:text-[18px] mb-3 sm:mb-3 lg:mb-2'>
                  {t('footer.services')}
                </h3>
                <ul className='space-y-2 sm:space-y-2 text-[#fff] text-[14px] sm:text-[15px] lg:text-[16px] font-normal'>
                  <li>
                    <Link
                      href='/solutionsandservices/managed-services'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.managedServices')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/solutionsandservices/cybersecurity'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.cybersecurity')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/solutionsandservices/automation'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.aiAutomation')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/solutionsandservices/infrastructure'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.itInfrastructure')}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Section */}
              <div className='w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-2rem)] lg:w-[205px]'>
                <h3 className='frutiger-lt-std-bold leading-[24px] sm:leading-[27px] text-[16px] sm:text-[17px] lg:text-[18px] mb-3 sm:mb-3 lg:mb-2'>
                  {t('footer.company')}
                </h3>
                <ul className='space-y-2 sm:space-y-2 text-[#fff] text-[14px] sm:text-[15px] lg:text-[16px] font-normal'>
                  <li>
                    <Link
                      href='/about-barq'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.aboutUs')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/careers'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.careers')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/case-studies'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.insights')}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Locations Section */}
              <div className='w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-2rem)] lg:w-[205px]'>
                <h3 className='frutiger-lt-std-bold leading-[24px] sm:leading-[27px] text-[16px] sm:text-[17px] lg:text-[18px] mb-3 sm:mb-3 lg:mb-2'>
                  {t('footer.locations')}
                </h3>
                <ul className='space-y-2 sm:space-y-2 text-[#fff] text-[14px] sm:text-[15px] lg:text-[16px] font-normal'>
                  {locationsData.map(location => (
                    <li
                      key={location.id}
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {location.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Us Section */}
              <div className='w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-2rem)] lg:w-[205px]'>
                <h3 className='frutiger-lt-std-bold leading-[24px] sm:leading-[27px] text-[16px] sm:text-[17px] lg:text-[18px] mb-3 sm:mb-3 lg:mb-2'>
                  {t('footer.contactUs')}
                </h3>
                <div className='space-y-2 sm:space-y-2 text-[#fff] text-[14px] sm:text-[15px] lg:text-[16px] font-normal'>
                  {contactData?.phone_number && (
                    <div className='hover:text-white transition-colors opacity-60'>
                      {contactData.phone_number_key &&
                        `${contactData.phone_number_key} `}
                      {contactData.phone_number}
                    </div>
                  )}
                  {contactData?.email && (
                    <div className='hover:text-white transition-colors opacity-60 break-words'>
                      {contactData.email}
                    </div>
                  )}
                  <div>
                    <Link
                      href='/contact-us'
                      className='hover:text-white transition-colors opacity-60'
                    >
                      {t('footer.contactForm')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-[#333] mt-4  lg:mt-6' />
        <div className='pt-8 pb-[40px] sm:pt-10 sm:pb-10 lg:pt-6 lg:pb-0'>
          <div className='flex w-full flex-col gap-4 sm:gap-2 lg:flex-row justify-between items-center lg:items-center'>
            <div className='text-[#fff] text-sm sm:text-sm text-center lg:text-left'>
              <p className='opacity-60'>
                {t('footer.allRightsReserved')}
              </p>
            </div>
            <div className='flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-5 md:gap-5 lg:gap-6 text-sm sm:text-sm leading-relaxed'>
              {termsData.map(term => (
                <button
                  key={term.id}
                  onClick={() => {
                    if (term.file?.url) {
                      handleFileDownload(getImageUrl(term.file), term.terms);
                    }
                  }}
                  className='text-[#fff] hover:text-white transition-colors opacity-60 whitespace-nowrap cursor-pointer bg-transparent border-none p-0'
                  disabled={!term.file?.url}
                >
                  {term.terms}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterContent;

