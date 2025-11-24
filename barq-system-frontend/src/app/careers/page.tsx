import Navbar from '@/components/home-page/navbar';
import Image from 'next/image';
import WorkingAtBarqSection from '@/components/careers/WorkingAtBarqSection';
import ExploreOpportunitiesSection from '@/components/careers/ExploreOpportunitiesSection';
import Footer from '@/components/footer';
import CareersHero from '@/components/careers/CareersHero';
import WorkingAtBarqIntro from '@/components/careers/WorkingAtBarqIntro';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { careersService } from '@/services/careers.service';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [heroResponse, openPositionsResponse, workingAtBarqResponse] =
    await Promise.all([
      careersService.getHeroData(),
      careersService.getOpenPositions(),
      careersService.getWorkingAtBarqData(),
    ]);

  const hero = heroResponse?.data?.[0] || null;
  const openPositions = openPositionsResponse?.data || [];
  const workingAtBarqData = workingAtBarqResponse?.data?.[0] || null;

  return (
    <div className='bg-black relative overflow-hidden'>
      {/* Network background image positioned above hero background */}
      <div className='absolute bottom-0 right-0 top-[20%] left-[-17%] w-full h-[1894px] min-w-[1994px] z-5  brightness-110'>
        <Image
          src='/assets/careers/careersPageBg.svg'
          alt='cybersecurity background'
          width={1440}
          height={1894}
          className='object-cover absolute w-full'
        />
      </div>
      {/* Hero background */}
      <div className='relative z-10'>
        <Image
          src='/assets/careers/Rectangle 3.svg'
          alt='careers background'
          width={1440}
          height={830}
          className='object-cover absolute min-h-[830px] max-h-[830px] z-5 w-full '
        />
        <Image
          src='/assets/careers/careers.png'
          alt='careers background'
          width={1440}
          height={785}
          className=' object-cover xl:object-fill 2xl:object-cover absolute  max-h-[785px] w-full '
        />
        {/* Hero content with higher z-index */}
        <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
          <Navbar isHomePage={false} />
          <CareersHero heroData={hero} />
          <WorkingAtBarqIntro workingAtBarqData={workingAtBarqData} />
          {/* Working at BARQ Cards */}
          <RevealOnScroll>
            <WorkingAtBarqSection workingAtBarqData={workingAtBarqData} />
          </RevealOnScroll>
          {/* Explore Opportunities Section */}
          <RevealOnScroll>
            <ExploreOpportunitiesSection openPositions={openPositions} />
          </RevealOnScroll>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
