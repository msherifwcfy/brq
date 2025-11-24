'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Navbar from '@/components/home-page/navbar';
import MemberBioModal from '@/components/leadership/member-bio-modal';
import Footer from '@/components/footer';
import {
  leadershipTeam,
  executiveTeam,
  allTeamMembers,
  TeamMember,
} from '@/data/leadership';

export default function LeadershipPageContent() {
  const containerRef = useRef<HTMLElement>(null);
  const leadershipRef = useRef<HTMLElement>(null);
  const executiveRef = useRef<HTMLElement>(null);

  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const isLeadershipInView = useInView(leadershipRef, {
    once: true,
    margin: '-100px',
  });
  const isExecutiveInView = useInView(executiveRef, {
    once: true,
    margin: '-100px',
  });

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [currentTeamType, setCurrentTeamType] = useState<
    'leadership' | 'executive'
  >('leadership');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const openModal = (member: TeamMember) => {
    // Determine which team this member belongs to
    const isLeadershipMember = leadershipTeam.some(m => m.id === member.id);
    const currentTeam = isLeadershipMember ? leadershipTeam : executiveTeam;
    const teamType = isLeadershipMember ? 'leadership' : 'executive';

    const memberIndex = currentTeam.findIndex(m => m.id === member.id);
    setCurrentMemberIndex(memberIndex);
    setSelectedMember(member);
    setCurrentTeamType(teamType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const navigateToNext = () => {
    const currentTeam =
      currentTeamType === 'leadership' ? leadershipTeam : executiveTeam;
    const nextIndex = (currentMemberIndex + 1) % currentTeam.length;
    setCurrentMemberIndex(nextIndex);
    setSelectedMember(currentTeam[nextIndex]);
  };

  const navigateToPrevious = () => {
    const currentTeam =
      currentTeamType === 'leadership' ? leadershipTeam : executiveTeam;
    const prevIndex =
      currentMemberIndex === 0
        ? currentTeam.length - 1
        : currentMemberIndex - 1;
    setCurrentMemberIndex(prevIndex);
    setSelectedMember(currentTeam[prevIndex]);
  };

  const selectMember = (index: number) => {
    const currentTeam =
      currentTeamType === 'leadership' ? leadershipTeam : executiveTeam;
    setCurrentMemberIndex(index);
    setSelectedMember(currentTeam[index]);
  };

  return (
    <>
      {/* Hero Section */}
      <section
        ref={containerRef}
        className='relative bg-black 2xl:px-[8%]  overflow-hidden pb-[236px] md:h-auto sm:h-auto'
      >
        {/* Navbar */}
        <div className=' relative z-30 max-w-7xl mx-auto '>
          <Navbar isHomePage={false} />
        </div>

        {/* Background Images - Same as Sustainability */}
        <div className='  absolute   inset-0 top-[-1%] left-0  h-[1605px]  sz-10'>
          <Image
            src='/assets/leadership/Mask group.png'
            alt='Background pattern'
            fill
            className=' object-cover '
          />
        </div>
        {/* Content Layer */}
        <div className='relative z-20 mt-[135px] max-w-7xl mx-auto px-[5%] xl:px-0'>
          {/* Leadership Team Section */}
          <div
            ref={leadershipRef as React.RefObject<HTMLDivElement>}
            className='relative '
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isLeadershipInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className=''
            >
              <h2 className='text-white text-[38px] leading-[47.6px] lg:text-[48px] md:text-[40px] sm:text-[32px] frutiger-lt-std-bold mb-6 max-w-[450px] lg:max-w-[450px] md:max-w-[400px] sm:max-w-full'>
                Meet Our Leadership Team
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isLeadershipInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className='text-[#D9DDDD] text-[16px] lg:text-[16px] md:text-[14px] sm:text-[12px] font-normal max-w-[520px] lg:max-w-[520px] md:max-w-[450px] sm:max-w-full mb-8'
            >
              Our leadership team brings together diverse experience and a
              shared commitment to delivering world-class solutions, building
              strong partnerships, and empowering our people
            </motion.p>

            <div className='flex justify-center gap-6 lg:gap-6 md:gap-4 sm:gap-2  flex-wrap lg:flex-nowrap md:flex-wrap sm:flex-wrap'>
              {leadershipTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isLeadershipInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className='cursor-pointer group w-full '
                  onClick={() => openModal(member)}
                  onMouseEnter={() => setHoveredCard(member.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className=' w-full lg:w-[410.666px]  h-[468px] lg:h-[492px]  py-8 px-4 flex flex-col relative overflow-hidden transition-all duration-300'
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.10)',
                      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 60%, #000 100%), url("${encodeURI(member.image)}")`,
                      backgroundPosition: `${member.id === 'ahmed-alyamani'
                        ? '60% 25%'
                        : member.id === 'mohamed-jazeel'
                          ? 'center 15%'
                          : member.id === 'ghadah-aldabbagh'
                            ? '150% 20%'
                            : 'center center'
                        }`,
                      backgroundSize: `100% 100%, ${member.id === 'ahmed-alyamani'
                        ? '80%'
                        : member.id === 'mohamed-jazeel'
                          ? '60%'
                          : member.id === 'ghadah-aldabbagh'
                            ? '108%'
                            : 'cover'
                        }`,
                      backgroundRepeat: 'no-repeat, no-repeat',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(10px)',
                      // ...(hoveredCard === member.id && {boxShadow: "4px 8px 16px 0 rgba(189, 189, 189, 0.16)" })
                    }}
                  >
                    {/* Image Container - Now handled by CSS background */}
                    <div className='flex-1 flex items-end justify-center w-full h-[300px] relative'>
                      {/* Background image is now handled by the parent div's CSS */}
                    </div>
                    {/* Text Container - Fixed at bottom */}
                    <div
                      className='h-[126px] py-8 px-4 flex flex-col justify-center'
                      style={{
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.10)',
                        background:
                          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.24) 100%)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <h3
                        style={{
                          textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                          fontStyle: 'normal',
                          lineHeight: '140%',
                        }}
                        className='text-white frutiger-lt-std-bold text-[24px] mb-1'
                      >
                        {member.name}
                      </h3>
                      <p
                        className='text-[16px] font-medium leading-tight'
                        style={{
                          color: '#ECEEEE',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '150%',
                        }}
                      >
                        {member.position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Executive Team Section */}
          <div
            ref={executiveRef as React.RefObject<HTMLDivElement>}
            className='relative mt-[88px]'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isExecutiveInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className=' '
            >
              <h2 className='text-white text-[38px] leading-[47.6px]  lg:text-[48px] md:text-[40px] sm:text-[32px] frutiger-lt-std-bold mb-6 max-w-[420px] lg:max-w-[420px] md:max-w-[380px] sm:max-w-full lg:leading-[57.6px]'>
                Meet Our Executive Team
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isLeadershipInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6 }}
                className='text-[#D9DDDD] text-[16px] font-normal max-w-[520px] mb-8'
              >
                Guiding BARQ Systems with vision, expertise, and innovation—our
                executive leaders drive growth, inspire excellence, and shape
                the <br /> future of technology in the region.
              </motion.p>
            </motion.div>

            <div className='grid grid-cols-2  lg:grid-cols-4 xl:grid-cols-6 lg:gap-6 gap-4   w-full '>
              {executiveTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isExecutiveInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className='cursor-pointer group'
                  onClick={() => openModal(member)}
                  onMouseEnter={() => setHoveredCard(member.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className='lg:min-w-[193.333px] lg:w-[193.33333px] md:w-[180px] sm:w-[160px] min-h-[492px] lg:h-[492px] md:h-[420px] sm:h-[380px] py-8 relative flex flex-col transition-all duration-300'
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.20)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(10px)',
                      overflow: 'hidden',
                      ...(hoveredCard === member.id && {
                        boxShadow: '4px 8px 16px 0 rgba(189, 189, 189, 0.16)',
                      }),
                    }}
                  >
                    {/* Background Image Container */}
                    <div
                      className='absolute inset-0'
                      style={{
                        borderRadius: '12px',
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 60%, #000 100%), url("${encodeURI(member.image)}")`,
                        backgroundPosition:
                          index === 5
                            ? 'center center, 60% 47%'
                            : index === 4
                              ? 'center center, 38% 62%'
                              : 'center center, center 48%',
                        backgroundSize:
                          index === 5
                            ? '100% 100%, 140%'
                            : index === 4
                              ? '100% 100%, 182%'
                              : '100% 100%, 190%',
                        backgroundRepeat: 'no-repeat, no-repeat',
                        overflow: 'hidden',
                      }}
                    />
                    <div className='relative flex-1'>
                      {/* Background image is now handled by the parent div's CSS */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
                    </div>

                    <div
                      style={{
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.10)',
                        background:
                          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.24) 100%)',
                        backdropFilter: 'blur(15px)',
                        // width: '161.33333px',
                      }}
                      className='absolute lg:w-[161.33333px]  p-3 lg:p-4 bottom-6 left-4 right-4  h-[173px] z-20 '
                    >
                      <h3 className='text-white text-[24px] frutiger-lt-std-bold mb-1 leading-[33.6px] min-h-[68px]'>
                        {member.name}
                      </h3>
                      <p
                        className={`text-[14px] font-normal ${index === 2 || index === 4 || index === 5 ? 'w-[129.33333px]' : index === 1 ? 'w-[121.33333px]' : 'w-[110.33333px]'}  text-[#ECEEEE] leading-[21px] opacity-90`}
                      >
                        {member.position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Bio Modal */}
      < MemberBioModal
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
        onNext={navigateToNext}
        onPrevious={navigateToPrevious}
        onSelectMember={selectMember}
        currentIndex={currentMemberIndex}
        totalMembers={
          currentTeamType === 'leadership'
            ? leadershipTeam.length
            : executiveTeam.length
        }
        teamMembers={
          currentTeamType === 'leadership' ? leadershipTeam : executiveTeam
        }
      />
    </>
  );
}
