import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/home-page/navbar';
import Footer from '@/components/footer';
import AwardsHead from '@/components/awards/awards-head';
import AwardsCards from '@/components/awards/awards-cards';
import { awardsService } from '@/services/awards.service';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const { head, cards } = await awardsService.getAllAwardsData();

  return (
    <div className='bg-black min-h-screen'>
      <section className='relative bg-black min-h-screen overflow-hidden'>
        <div className='absolute top-[-35%] lg:right-[-20%] bottom-0 flex items-center justify-center w-full h-full'>
          <Image
            src='/assets/awards-page/award-bg.svg'
            alt='Awards background'
            width={1920}
            height={2220}
            className='object-cover min-h-screen right-[-20%] lg:right-0 '
          />
        </div>
        {/* <div className='absolute top-[15%] left-0 right-0 bottom-0 flex items-center justify-center w-full h-full'>
          <Image
            src='/assets/awards-page/award-bg-2.svg'
            alt='Awards background'
            fill
            className='object-cover'
          />
        </div> */}

        <div className='relative z-30 max-w-7xl mx-auto'>
          <Navbar isHomePage={false} />
        </div>

        <div className='max-w-7xl mx-auto relative '>
          <AwardsHead data={head} />
          <AwardsCards data={cards} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
