
import Navbar from "@/components/home-page/navbar";
import Image from "next/image";
import WorkingAtBarqSection from "@/components/careers/WorkingAtBarqSection";
import ExploreOpportunitiesSection from "@/components/careers/ExploreOpportunitiesSection";
import Footer from "@/components/footer";

const Page = () => {
    return (
        <div className='bg-black relative overflow-hidden'>
            {/* Network background image positioned above hero background */}
            <div className='absolute bottom-0 right-0 top-[20%] left-[-17%] w-full h-[1894px] min-w-[1994px] z-5  brightness-110'>
                <Image src="/assets/careers/careersPageBg.svg" alt="cybersecurity background" width={1440} height={1894} className='object-cover absolute w-full' />
            </div>
            {/* Hero background */}
            <div className='relative z-10'>
                <Image src="/assets/careers/Rectangle 3.svg" alt="careers background" width={1440} height={830} className='object-cover absolute min-h-[830px] max-h-[830px] z-5 w-full ' />
                <Image src="/assets/careers/careers.png" alt="careers background" width={1440} height={785} className=' object-cover xl:object-fill absolute max-h-[785px] w-full ' />
                {/* Hero content with higher z-index */}
                <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                    <Navbar isHomePage={false} />
                    <div className='mt-[70px] lg:mt-[190.48px] max-w-full lg:max-w-[754px]'>
                        <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-4 lg:mb-6' style={{
                            background: "linear-gradient(90deg,  #60C1CA 0%, #25B8E4 18.82%)",
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Join Our Team
                        </h3>
                        <h1 className='text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] max-w-full lg:max-w-[754px]' style={{
                            background: "linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)",
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Empowering the Future of Technology Together.
                        </h1>
                    </div>

                    <div className="flex mt-6 lg:mt-[32px] gap-0 lg:gap-[122px]">
                        <div className=''>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[22px] lg:leading-[27px] max-w-full lg:max-w-[707px]'>
                                At BARQ Systems, we believe our people are our greatest strength. Join a <br className='hidden lg:block' /> collaborative, innovative, and growth-driven environment where your ideas make <br className='hidden lg:block' />an impact.
                            </p>
                        </div>
                    </div>
                    <div className="mt-[100px] lg:mt-[203px]">
                        <h2 className="text-[32px] lg:text-[56px] text-white leading-[38px] lg:leading-[61.6px] font-normal mb-4 lg:mb-6">
                            Working at BARQ Systems
                        </h2>
                        <p className="text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[22px] lg:leading-[27px] max-w-full lg:max-w-[711px]">
                            At BARQ Systems, we empower people to learn, grow, and lead. Explore how we  <br className='hidden lg:block' /> invest in our team&apos;s growth and wellbeing.
                        </p>
                    </div>
                    {/* Working at BARQ Cards */}
                    <WorkingAtBarqSection />
                    {/* Explore Opportunities Section */}
                    <ExploreOpportunitiesSection />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Page