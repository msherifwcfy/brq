'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { cn, getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useManagedSocServicesDetailsControllerReadQuery } from '@/sdk/modules/managedsocservicesdetail.gen';
import { useManagedCybersecurityServicesDetailsControllerReadQuery } from '@/sdk/modules/managedcybersecurityservicesdetail.gen';
import { useManagedGrcServicesDetailsControllerFindAllQuery } from '@/sdk/modules/managedgrcservicesdetail.gen';
import { useEffect, useState } from 'react';
import DownloadBundlesForm from '@/components/solutionsandservices/managed-services/DownloadBundlesForm';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string | null;
}

export default function ServiceModal({
  isOpen,
  onClose,
  serviceType,
}: ServiceModalProps) {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldFetchSoc = isOpen && serviceType === 'soc';
  const shouldFetchCybersecurity = isOpen && serviceType === 'cybersecurity';
  const shouldFetchGrc = isOpen && serviceType === 'grc';

  const { data: socData, isLoading: socLoading } =
    useManagedSocServicesDetailsControllerReadQuery(
      shouldFetchSoc
        ? {
          query: {
            query: {
              relations: {
                logo: true,
                file: true,
                managed_soc_services_details_id_managed_soc_services_details_translations: true,
              },
            },
          },
          headers: {
            'Accept-Language': i18n.language === 'en' ? 'en' : 'ar',
          },
        }
        : undefined,
      {
        enabled: shouldFetchSoc,
      } as any
    );

  const { data: cybersecurityData, isLoading: cybersecurityLoading } =
    useManagedCybersecurityServicesDetailsControllerReadQuery(
      shouldFetchCybersecurity
        ? {
          query: {
            query: {
              relations: {
                logo: true,
                managed_cybersecurity_services_details_id_managed_cybersecurity_services_details_translations: true,
              },
            },
          },
          headers: {
            'Accept-Language': i18n.language === 'en' ? 'en' : 'ar',
          },
        }
        : undefined,
      {
        enabled: shouldFetchCybersecurity,
      } as any
    );

  const { data: grcData, isLoading: grcLoading } =
    useManagedGrcServicesDetailsControllerFindAllQuery(
      shouldFetchGrc
        ? {
          query: {
            query: {
              relations: {
                logo: true,
                managed_grc_services_details_id_managed_grc_services_details_translations: true,
              },
            },
          },
          headers: {
            'Accept-Language': i18n.language === 'en' ? 'en' : 'ar',
          },
        }
        : undefined,
      {
        enabled: shouldFetchGrc,
      } as any
    );

  const handleOpenFormModal = (file?: string, sectionId?: number) => {
    setSelectedFile(file || null);
    setSelectedSectionId(sectionId || null);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedFile(null);
    setSelectedSectionId(null);
  };

  if (!serviceType) return null;

  const isLoading =
    (serviceType === 'soc' && socLoading) ||
    (serviceType === 'cybersecurity' && cybersecurityLoading) ||
    (serviceType === 'grc' && grcLoading);

  type Section = {
    id: number;
    icon?: string;
    desc?: string;
    title?: string;
    items: string[];
    file?: string;
    countries?: {
      name: string;
      regulator: string[];
    }[];
  };

  const getServiceData = (): { id: string; sections: Section[] } | null => {
    if (serviceType === 'soc' && socData?.data) {
      const items = socData.data;
      return {
        id: 'soc',
        sections: items.map(item => ({
          id: item.id,
          icon: getImageUrl(item.logo),
          desc:
            item
              .managed_soc_services_details_id_managed_soc_services_details_translations?.[0]
              ?.description || item.description,
          title: '',
          items: [],
          file: item.file ? getImageUrl(item.file) : undefined,
        })),
      };
    }

    if (serviceType === 'cybersecurity' && cybersecurityData?.data) {
      const items = cybersecurityData.data;
      return {
        id: 'cybersecurity',
        sections: items.map(item => ({
          id: item.id,
          icon: getImageUrl(item.logo),
          title: '',
          items: item
            .managed_cybersecurity_services_details_id_managed_cybersecurity_services_details_translations?.[0]
            ?.description
            ? [
              item
                .managed_cybersecurity_services_details_id_managed_cybersecurity_services_details_translations[0]
                .description,
            ]
            : item.description
              ? [item.description]
              : [],
        })),
      };
    }

    if (serviceType === 'grc' && grcData?.data) {
      const items = grcData.data;
      return {
        id: 'grc',
        sections: items.map(item => ({
          id: item.id,
          title:
            item
              .managed_grc_services_details_id_managed_grc_services_details_translations?.[0]
              ?.title || item.title,
          items: item
            .managed_grc_services_details_id_managed_grc_services_details_translations?.[0]
            ?.description
            ? [
              item
                .managed_grc_services_details_id_managed_grc_services_details_translations[0]
                .description,
            ]
            : item.description
              ? [item.description]
              : [],
          countries: [],
        })),
      };
    }

    return null;
  };

  const service = getServiceData();
  console.log(service?.id, 'service id');

  if (isLoading || !service) return null;

  console.log({ service })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className='bg-black/001' />
      <DialogContent
        className={cn(
          `w-full lg:min-w-[1280px] lg:max-w-[1280px] ${service?.id === 'cybersecurity'
            ? 'lg:h-[501px]'
            : service?.id === 'grc'
              ? 'lg:h-[523px]'
              : 'lg:h-[465px]'
          } max-h-[523px] p-0 overflow-hidden",
                    "fixed top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                `
        )}
        style={{
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          background: 'rgba(0, 0, 0, 0.64)',
          backdropFilter: 'blur(10px)',
        }}
        showCloseButton={false}
      >
        <div className='relative w-full h-full  lg:w-[1280px]'>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`   absolute border-[2px] border-[#fff] w-[30px] h-[30px] flex items-center justify-center top-6 ${i18n.language === 'ar' ? 'left-6' : 'right-6'} z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer`}
          >
            <XIcon size={30} className='text-white min-w-[20px] min-h-[20px]' />
          </button>

          {/* Content */}
          <div
            className={`relative z-10 flex gap-10 h-full ${service.id === 'grc' ? 'px-8' : 'px-6'} pt-[80px] pb-8`}
          >
            {/* Left Side - Image */}

            {/* Right Side - Content */}
            <motion.div
              className='flex flex-col justify-center min-w-0 md:min-w-[695px]'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className='w-full'>
                {/* Service Title */}
                {/* Service Sections */}
                <motion.div
                  className={`grid grid-cols-1 md:grid-cols-2 ${service.id === 'cybersecurity' || service.id === 'grc' ? 'gap-[40px]' : 'gap-10'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {service.sections.map((section, index: number) => (
                    <div
                      key={index}
                      className='flex flex-col items-start py-10 px-6 h-full'
                      style={{
                        minWidth: isMobile
                          ? '100%'
                          : service.id === 'cybersecurity' ||
                            service.id === 'grc'
                            ? '588px'
                            : '596px',
                        height:
                          service.id === 'grc'
                            ? '411px'
                            : service.id === 'cybersecurity'
                              ? '389px'
                              : '353px',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {section?.icon && section.icon.trim() !== '' && (
                        <div className='mb-4'>
                          <Image
                            src={section.icon}
                            alt={section.title || 'Service icon'}
                            width={
                              index === 0 && service.id === 'soc'
                                ? 134
                                : index === 1 && service.id === 'soc'
                                  ? 126
                                  : index === 2 &&
                                    service.id === 'cybersecurity'
                                    ? 247
                                    : index === 3 &&
                                      service.id === 'cybersecurity'
                                      ? 241
                                      : 200
                            }
                            height={48}
                            className={`lg:h-[48px] ${service.id === 'cybersecurity' && index === 0 ? 'lg:w-[247px]' : service.id === 'cybersecurity' && index === 1 ? 'lg:w-[241px]' : 'lg:w-fit'} `}
                          />
                        </div>
                      )}

                      <div className='flex-1'>
                        {service.id === 'soc' && section.desc && (
                          <div
                            className={`text-[18px] mt-8 text-[#D9DDDD] leading-[27px] lg:h-[130px] ${index === 0 ? 'tracking-[0.02em]' : 'tracking-[0.01em]'}`}
                          >
                            {section.desc}
                          </div>
                        )}

                        {service.id === 'cybersecurity' && (
                          <div className='mt-7'>
                            {section.items.map(
                              (item: string, itemIndex: number) => (
                                <div key={itemIndex} className=''>
                                  <p className='text-white text-[18px] leading-[26.5px]'>
                                    • {item}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {service.id === 'grc' && (
                          <>
                            <div className='text-white text-[36px] leading-[27px] frutiger-lt-std-bold'>
                              {section?.title}
                            </div>
                            {index === 0 ? (
                              <div className='mt-8'>
                                {section.items.map(
                                  (item: string, itemIndex: number) => (
                                    <div key={itemIndex}>
                                      <p className='text-white text-[18px] leading-[27px]'>
                                        • {item}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div className='mt-8'>
                                {section.countries?.map(
                                  (country, countryIndex: number) => (
                                    <div key={countryIndex}>
                                      <p className='text-[#25B8E4] frutiger-lt-std-bold text-[18px] leading-[27px]'>
                                        • {country.name}
                                      </p>
                                      {country.regulator?.map(
                                        (
                                          regulator: string,
                                          regulatorIndex: number
                                        ) => (
                                          <p
                                            key={regulatorIndex}
                                            className='text-white ml-4 text-[18px] leading-[27px]'
                                          >
                                            {regulator}
                                          </p>
                                        )
                                      )}
                                    </div>
                                  )
                                )}
                                {section.items?.map(
                                  (item) => (
                                    <p key={item} className='text-white text-[18px] leading-[27px]'>
                                      • {item}
                                    </p>
                                  )
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {service.id === 'soc' && (
                        <div className='flex mt-auto pt-4'>
                          <button
                            onClick={() =>
                              handleOpenFormModal(section.file, section.id)
                            }
                            className='text-[#25B8E4] flex items-center cursor-pointer gap-4 text-[16px] py-4 frutiger-lt-std-bold hover:text-[#1da3cc] transition-colors'
                          >
                            Download The Bundles
                            {i18n.language === 'en' ? (
                              <ArrowRight size={24} className='pt-[2px]' />
                            ) : (
                              <ArrowLeft size={24} className='pt-[2px]' />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
      <DownloadBundlesForm
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        file={selectedFile}
        serviceId={selectedSectionId || undefined}
      />
    </Dialog>
  );
}
