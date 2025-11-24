'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type {
  AlliancesClientsEntity,
  AlliancesVendorsEntity,
  CountryEntity,
  IndustriesEntity,
  SolutionsEntity,
} from '@/sdk/types.gen';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AlliancesGridProps {
  data: Array<AlliancesClientsEntity | AlliancesVendorsEntity>;
  countries: CountryEntity[];
  industries: IndustriesEntity[];
  solutions: SolutionsEntity[];
  activeTab: 'clients' | 'vendors';
  currentPage: number;
  totalPages: number;
  selectedCountry: string;
  selectedIndustry: string;
  selectedSolution: string;
}

export default function AlliancesGrid({
  data,
  countries,
  industries,
  solutions,
  activeTab,
  currentPage,
  totalPages,
  selectedCountry,
  selectedIndustry,
  selectedSolution,
}: AlliancesGridProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, {
    once: true,
    margin: '-100px',
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCountryChange = (countryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (countryId === 'All') {
      params.delete('country');
    } else {
      params.set('country', countryId);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleIndustryChange = (industryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (industryId === 'All') {
      params.delete('industry');
    } else {
      params.set('industry', industryId);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleSolutionChange = (solutionId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (solutionId === 'All') {
      params.delete('solution');
    } else {
      params.set('solution', solutionId);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);

    if (gridRef.current) {
      gridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const getMediaUrl = (
    entity: AlliancesClientsEntity | AlliancesVendorsEntity
  ) => {
    if (!entity.media) return '';
    return entity.media.url + entity.media.key;
  };

  return (
    <div ref={contentRef} className='relative pt-10 max-w-7xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <div className='mb-10' ref={gridRef}>
          <h2
            className='text-[18px] sm:text-[20px] lg:text-[24px] font-bold mb-2 frutiger-lt-std-bold'
            style={{
              background:
                'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '28.8px',
            }}
          >
            {activeTab === 'clients'
              ? 'Trusted by Leading Organizations'
              : 'Trusted by Leading Global Vendors'}
          </h2>
          <div className='flex flex-col sm:flex-row items-center gap-4 justify-between mt-4'>
            <p className='text-white text-[36px] lg:text-[48px] frutiger-lt-std-bold leading-[57.6px] '>
              {activeTab === 'clients'
                ? 'Our Clients'
                : 'Our Technology Partners'}
            </p>
            <div className='flex items-center flex-wrap  gap-4'>
              <label className='text-white text-[18px] '>
                <div className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M4 4H20V6.172C19.9999 6.70239 19.7891 7.21101 19.414 7.586L15 12V19L9 21V12.5L4.52 7.572C4.18545 7.20393 4.00005 6.7244 4 6.227V4Z'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  Filter by
                </div>
              </label>
              <div className='flex items-center gap-4'>
                <Select
                  value={selectedCountry}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger
                    className='text-white text-[18px] w-[172px] p-4 min-h-[56px]'
                    style={{
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <SelectValue placeholder='Country' />
                  </SelectTrigger>
                  <SelectContent className='bg-white max-h-[200px] overflow-y-auto rounded-lg shadow-lg'>
                    <SelectItem value='All' className='cursor-pointer'>
                      All Countries
                    </SelectItem>
                    {countries.map(country => (
                      <SelectItem
                        key={country.id}
                        value={country.id.toString()}
                        className='cursor-pointer'
                      >
                        {country?.name || `Country ${country?.id}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {activeTab === 'clients' ? (
                  <Select
                    value={selectedIndustry}
                    onValueChange={handleIndustryChange}
                  >
                    <SelectTrigger
                      className='text-white text-[18px] w-[172px] p-4 min-h-[56px]'
                      style={{
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <SelectValue placeholder='Industry' />
                    </SelectTrigger>
                    <SelectContent className='bg-white max-h-[200px] overflow-y-auto rounded-lg shadow-lg'>
                      <SelectItem value='All' className='cursor-pointer'>
                        All Industries
                      </SelectItem>
                      {industries.map(industry => (
                        <SelectItem
                          key={industry.id}
                          value={industry.id.toString()}
                          className='cursor-pointer'
                        >
                          {industry.industries_id_industries_translations?.[0]
                            ?.name || industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Select
                    value={selectedSolution}
                    onValueChange={handleSolutionChange}
                  >
                    <SelectTrigger
                      className='text-white text-[18px] w-[172px] p-4 min-h-[56px]'
                      style={{
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <SelectValue placeholder='Solution' />
                    </SelectTrigger>
                    <SelectContent className='bg-white max-h-[200px] overflow-y-auto rounded-lg shadow-lg'>
                      <SelectItem value='All' className='cursor-pointer'>
                        All Solutions
                      </SelectItem>
                      {solutions.map(solution => (
                        <SelectItem
                          key={solution.id}
                          value={solution.id.toString()}
                          className='cursor-pointer'
                        >
                          {solution.solutions_id_solutions_translations?.[0]
                            ?.name || solution.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 '>
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.1, delay: index * 0.2 }}
              className='group cursor-pointer'
            >
              <div
                className=' lg:h-[178px] lg:w-[180px] md:h-[110px]  p-4 flex items-center justify-center transition-transform duration-300'
                style={{
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className='relative w-full h-full flex items-center justify-center'>
                  <Image
                    src={getMediaUrl(item)}
                    alt={
                      item.country?.country_id_country_translations?.[0]
                        ?.name || 'Alliance'
                    }
                    width={180}
                    height={178}
                    className='object-contain max-w-full max-h-full rounded-[16px]'
                    style={{
                      filter: 'brightness(1.1)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-2 mt-[96px]'>
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='p-4 h-[45px] w-[68px] text-[18px] leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px) text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:cursor-pointer hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A] transition-colors'
            >
              Prev
            </button>
            {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 6) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 5 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`p-4 h-[45px] w-[43px] text-[18px] leading-[27px] flex items-center justify-center rounded-[8px] font-medium transition-all backdrop:blur(10px) duration-200 ${currentPage === pageNum
                    ? 'bg-[#25B8E4] text-white'
                    : 'bg-[#FFFFFF0A] text-white border border-[#FFFFFF29] hover:bg-[#25B8E4] hover:text-white'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className='p-4 h-[45px] w-[68px] text-[18px] leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px) text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:cursor-pointer hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A] transition-colors'
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
