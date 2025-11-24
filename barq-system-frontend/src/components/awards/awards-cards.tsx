'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import type {
  AwardsCardsControllerReadResponse,
  AwardsCardsEntity,
} from '@/sdk/types.gen';

interface AwardsCardsProps {
  data: AwardsCardsControllerReadResponse | null;
}

const paginateAwards = (
  awards: AwardsCardsEntity[],
  currentPage: number,
  itemsPerPage: number
): AwardsCardsEntity[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return awards.slice(startIndex, endIndex);
};

const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export default function AwardsCards({ data }: AwardsCardsProps) {
  const contentRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, {
    once: true,
    margin: '-100px',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const awards = data?.data || [];
  const paginatedData = paginateAwards(awards, currentPage, itemsPerPage);
  const totalPages = getTotalPages(awards.length, itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const getMediaUrl = (url?: string) => {
    if (!url) return '/assets/awards-page/1.svg';
    return url;
  };

  return (
    <div
      ref={contentRef as React.RefObject<HTMLDivElement>}
      className='relative'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div ref={gridRef} className='mb-20'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 justify-items-center'>
            {paginatedData.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group cursor-pointer'
              >
                <div
                  className='flex flex-col items-center p-6 transition-all duration-300 border-[1px] border-transparent hover:bg-[rgba(255,255,255,0.04)] hover:backdrop-blur-[10px] hover:border hover:border-[rgba(255,255,255,0.1)]'
                  style={{
                    width: '400px',
                    minHeight: '339px',
                    height: '437px',
                    borderRadius: '24px',
                    padding: '32px 24px',
                  }}
                >
                  <div className='flex items-center justify-center w-[221px] h-[180px]'>
                    <Image
                      src={getMediaUrl(award.media?.url + award.media?.key)}
                      alt={award.name}
                      width={221}
                      height={180}
                      className='object-contain max-w-full'
                    />
                  </div>

                  <h3
                    className='text-white text-center frutiger-lt-std-bold max-w-[352px] mt-4'
                    style={{
                      fontSize: '24px',
                      fontStyle: 'normal',
                      fontWeight: '700',
                      lineHeight: '140%',
                    }}
                  >
                    {award.name}
                  </h3>
                  <div className='max-w-[352px]'>
                    <p className='text-[#D9DDDD] mt-2 text-[18px] font-normal leading-[27px] text-center max-w-[352px]'>
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className='flex justify-center items-center gap-2 mb-[93px]'>
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
              pageNum = totalPages - 4 + i;
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
      </motion.div>
    </div>
  );
}
