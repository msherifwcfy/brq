'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import type { CareerOpenPositionEntity } from '@/sdk/types.gen';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CareerSuccessModal from './CareerSuccessModal';
import { useCountryControllerReadQuery } from '@/sdk/modules/country.gen';
import { useCareerApplicationFormControllerCreate } from '@/sdk/modules/careerapplicationform.gen';
import { BASE_URL } from '@/utils/env';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface CareerDetailsClientProps {
  job: CareerOpenPositionEntity;
}

interface FormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  linkedInProfile: string;
  countryCode: string;
}

interface FormErrors {
  email?: string;
  linkedInProfile?: string;
}

const CareerDetailsClient = ({ job }: CareerDetailsClientProps) => {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    linkedInProfile: '',
    countryCode: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { data: countriesData } = useCountryControllerReadQuery({
    query: {
      query: {
        relations: {
          country_id_country_translations: true,
        },
      },
    },
  });

  const createApplicationMutation = useCareerApplicationFormControllerCreate();
  const [isUploading, setIsUploading] = useState(false);

  // Get translated content
  const getTranslation = () => {
    const translation =
      job.career_open_position_id_career_open_position_translations?.find(
        t => t.language === language
      );
    return (
      translation ||
      job.career_open_position_id_career_open_position_translations?.[0]
    );
  };

  const translation = getTranslation();
  const jobTitle = translation?.job_title || job.job_title;
  const description = translation?.job_description || job?.job_description || '';

  // Get city translation
  const cityTranslation =
    job.city?.city_id_city_translations?.find(t => t.language === language) ||
    job.city?.city_id_city_translations?.[0];
  const location =
    cityTranslation?.name || job.city?.name || t('careers.notSpecified');

  // Get category translation
  const categoryTranslation =
    job.career_category?.career_category_id_career_category_translations?.find(
      t => t.language === language
    ) ||
    job.career_category?.career_category_id_career_category_translations?.[0];
  const category =
    categoryTranslation?.name ||
    job.career_category?.name ||
    t('careers.general');

  // Get job detail cards (responsibilities, qualifications, certifications)
  const cards =
    job?.career_job_detail?.career_job_detail_cards_id_career_job_detail_cards || [];
  const getCardItems = (cardTitle: string) => {
    const card = cards.find(c => {
      const cardTranslation =
        c.career_job_detail_cards_id_career_job_detail_cards_translations?.find(
          t => t.language === language
        ) ||
        c.career_job_detail_cards_id_career_job_detail_cards_translations?.[0];
      return cardTranslation?.title
        ?.toLowerCase()
        .includes(cardTitle.toLowerCase());
    });

    if (!card) return [];

    const cardTranslation =
      card.career_job_detail_cards_id_career_job_detail_cards_translations?.find(
        t => t.language === language
      ) ||
      card.career_job_detail_cards_id_career_job_detail_cards_translations?.[0];

    // Assuming the card content is in a field that contains array or list items
    // This might need adjustment based on actual CMS structure
    return cardTranslation?.title ? [cardTranslation.title] : [];
  };

  const keyResponsibilities = getCardItems('responsibilities');
  const requiredQualifications = getCardItems('qualifications');
  const certifications = getCardItems('certifications');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url: string): boolean => {
    if (!url) return true;
    try {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return urlPattern.test(url);
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = t('careers.invalidEmail') || 'Please enter a valid email address';
    }

    if (formData.linkedInProfile && !validateURL(formData.linkedInProfile)) {
      errors.linkedInProfile = t('careers.invalidURL') || 'Please enter a valid URL';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    try {
      let resumeId: number | undefined;

      if (selectedFile) {
        setIsUploading(true);
        const formDataForUpload = new FormData();
        formDataForUpload.append('file', selectedFile);

        const uploadResponse = await fetch(`${BASE_URL}media/upload`, {
          method: 'POST',
          body: formDataForUpload,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload file');
        }

        const uploadResult = await uploadResponse.json();
        console.log(uploadResult,'uploadResult');
        resumeId = uploadResult?.data?.id;
        setIsUploading(false);
      }

      await createApplicationMutation.mutateAsync({
        body: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.mobileNumber,
          job_title: jobTitle,
          linkedin_url: formData.linkedInProfile || undefined,
          resume_id: resumeId,
          career_job_detail_id: job.career_job_detail?.id,
        },
      });

      setIsModalOpen(true);
      setFormData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        linkedInProfile: '',
        countryCode: '',
      });
      setSelectedFile(null);
      setFormErrors({});
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsUploading(false);
      setErrorMessage(
        t('careers.submissionError') ||
        'An error occurred while submitting your application. Please try again.'
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const countries = countriesData?.data || [];
  const getCountryTranslation = (country: (typeof countries)[0]) => {
    const translation =
      country.country_id_country_translations?.find(
        t => t.language === language
      ) || country.country_id_country_translations?.[0];
    return translation?.name || country.name;
  };

  return (
    <div className='relative max-w-7xl mx-auto px-[5%] xl:px-0 lg:pb-[161px]'>
      <div className='mt-[60px] lg:mt-[103.48px]'>
        <div className='w-full flex flex-col'>
          <h3
            className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-3 lg:mb-4 h-auto lg:h-[29px]'
            style={{
              background:
                'linear-gradient(90deg, #60C1CA 0.01%, #25B8E4 39.93%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('careers.careerOpportunity')}
          </h3>
          <h2 className='text-white text-[28px] lg:text-[36px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] mb-3 lg:mb-4'>
            {jobTitle}
          </h2>
          <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] tracking-[0.0205em] h-auto lg:h-[18px] mb-4 lg:mb-6'>
            {description}
          </p>
          <div className='flex flex-col gap-3 lg:gap-4'>
            <div className='flex items-center gap-3 lg:gap-4'>
              <div className='w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='lg:w-6 lg:h-6'
                >
                  <path
                    d='M16 3V7M8 3V7M4 11H20M7 14H7.013M10.01 14H10.015M13.01 14H13.015M16.015 14H16.02M13.015 17H13.02M7.01 17H7.015M10.01 17H10.015M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
              <span className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal'>
                {t('careers.openingDate')}:{' '}
                {new Date(job.opening_date).toLocaleDateString()} |{' '}
                {t('careers.closingDate')}:{' '}
                {new Date(job.closing_date).toLocaleDateString()}
              </span>
            </div>
            <div className='flex items-center gap-3 lg:gap-4'>
              <div className='w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  height='16'
                  viewBox='0 0 14 20'
                  fill='none'
                  className='lg:w-[14px] lg:h-[20px]'
                >
                  <path
                    d='M1.5 5H12.5M7 10C5.4087 10 3.88258 10.6321 2.75736 11.7574C1.63214 12.8826 1 14.4087 1 16V18C1 18.2652 1.10536 18.5196 1.29289 18.7071C1.48043 18.8946 1.73478 19 2 19H12C12.2652 19 12.5196 18.8946 12.7071 18.7071C12.8946 18.5196 13 18.2652 13 18V16C13 14.4087 12.3679 12.8826 11.2426 11.7574C10.1174 10.6321 8.5913 10 7 10ZM7 10C5.4087 10 3.88258 9.36786 2.75736 8.24264C1.63214 7.11742 1 5.5913 1 4V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H12C12.2652 1 12.5196 1.10536 12.7071 1.29289C12.8946 1.48043 13 1.73478 13 2V4C13 5.5913 12.3679 7.11742 11.2426 8.24264C10.1174 9.36786 8.5913 10 7 10Z'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
              <span className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px]'>
                {t('careers.category')}: {category}
              </span>
            </div>
            <div className='flex items-center gap-3 lg:gap-4'>
              <div className='w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='lg:w-6 lg:h-6'
                >
                  <path
                    d='M9 11.0002C9 11.7958 9.31607 12.5589 9.87868 13.1215C10.4413 13.6841 11.2044 14.0002 12 14.0002C12.7957 14.0002 13.5587 13.6841 14.1213 13.1215C14.6839 12.5589 15 11.7958 15 11.0002C15 10.2045 14.6839 9.44148 14.1213 8.87888C13.5587 8.31627 12.7957 8.0002 12 8.0002C11.2044 8.0002 10.4413 8.31627 9.87868 8.87888C9.31607 9.44148 9 10.2045 9 11.0002ZM17.657 16.6572L13.414 20.9002C13.039 21.2748 12.5306 21.4853 12.0005 21.4853C11.4704 21.4853 10.962 21.2748 10.587 20.9002L6.343 16.6572C5.22422 15.5384 4.46234 14.1129 4.15369 12.5611C3.84504 11.0092 4.00349 9.40071 4.60901 7.93893C5.21452 6.47714 6.2399 5.22774 7.55548 4.3487C8.87107 3.46967 10.4178 3.00049 12 3.00049C13.5822 3.00049 15.1289 3.46967 16.4445 4.3487C17.7601 5.22774 18.7855 6.47714 19.391 7.93893C19.9965 9.40071 20.155 11.0092 19.8463 12.5611C19.5377 14.1129 18.7758 15.5384 17.657 16.6572Z'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
              <span className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px]'>
                {t('careers.location')} : {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      {description && (
        <div className='mt-6 lg:mt-8'>
          <h3 className='text-white text-[28px] lg:text-[32px] frutiger-lt-std-bold leading-[34px] lg:leading-[38.4px] mb-4 lg:mb-6'>
            {t('careers.jobDetails') || 'Job Details'}
          </h3>
          <div className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] tracking-[0.0205em] mb-6 lg:mb-8'>
            <p>{description}</p>
          </div>
        </div>
      )}

      {/* Key Responsibilities Section */}
      {keyResponsibilities.length > 0 && (
        <div className='mt-6 lg:mt-8'>
          <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px] mb-3 lg:mb-4'>
            {t('careers.keyResponsibilities')}
          </h3>
          <ul className='space-y-2 lg:space-y-0'>
            {keyResponsibilities.map((responsibility, index) => (
              <li
                key={index}
                className='flex gap-3 lg:gap-4 text-[#ECEEEE] text-[16px]  leading-[22px] lg:leading-[24px] tracking-[0.0205em] items-start lg:items-center'
              >
                <span className='text-[#ECEEEE] text-[24px] lg:text-[30px] mt-1 lg:mt-0'>
                  •
                </span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Qualifications Section */}
      {requiredQualifications.length > 0 && (
        <div className='mt-6 lg:mt-8'>
          <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px] mb-3 lg:mb-4'>
            {t('careers.requiredQualifications')}
          </h3>
          <ul className='space-y-2 lg:space-y-0'>
            {requiredQualifications.map((qualification, index) => (
              <li
                key={index}
                className='flex gap-3 lg:gap-4 text-[#ECEEEE] text-[16px]  leading-[22px] lg:leading-[24px] tracking-[0.0205em] items-start lg:items-center'
              >
                <span className='text-[#ECEEEE] text-[24px] lg:text-[30px] mt-1 lg:mt-0'>
                  •
                </span>
                <span>{qualification}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications Section (Optional) */}
      {certifications.length > 0 && (
        <div className='mt-6 lg:mt-8'>
          <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px] mb-3 lg:mb-4'>
            {t('careers.certificationsPreferred')}
          </h3>
          <ul className='space-y-2 lg:space-y-0'>
            {certifications.map((certification, index) => (
              <li
                key={index}
                className='flex gap-3 lg:gap-4 text-[#ECEEEE] text-[16px]  leading-[22px] lg:leading-[24px] tracking-[0.0205em] items-start lg:items-center'
              >
                <span className='text-[#ECEEEE] text-[24px] lg:text-[30px] mt-1 lg:mt-0'>
                  •
                </span>
                <span>{certification}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Apply for this Role Section */}
      <div className='mt-6 lg:mt-8 pb-[100px] lg:pb-[161px] lg:w-[1200px] lg:h-[617px]'>
        <div
          className='px-6 lg:px-10 py-6 lg:py-8 rounded-[16px] max-h-auto lg:max-h-[617px]'
          style={{
            border: '1px solid rgba(255, 255, 255, 0.16)',
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 className='text-white text-[28px] lg:text-[36px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] mb-3 lg:mb-4 text-center '>
            {t('careers.applyForThisRole')}
          </h3>
          <p className='text-[#D9DDDD] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[26px] text-center mb-6 lg:mb-8 h-auto lg:h-[20px]'>
            {t('careers.formDescription')}
          </p>
          {errorMessage && (
            <div className='bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4 text-center'>
              {errorMessage}
            </div>
          )}
          <div className='flex flex-col justify-center items-center'>
            <form
              onSubmit={handleSubmit}
              className='w-full max-w-[886px] space-y-4'
            >
              <div className='text-[14px] lg:text-[16px] text-white frutiger-lt-std-bold lg:h-[20px]'>
                {t('academyApplication.personalInformation')}
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  style={{
                    borderRadius: '8px',
                  }}
                  className='py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors'
                  placeholder={t('academyApplication.firstName')}
                />
                <Input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  style={{
                    borderRadius: '8px',
                  }}
                  className='py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors'
                  placeholder={t('academyApplication.lastName')}
                />
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input
                  type='text'
                  name='mobileNumber'
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  style={{
                    borderRadius: '8px',
                  }}
                  className='py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors'
                  placeholder={t('academyApplication.mobileNumber')}
                />
                <div className='flex flex-col'>
                  <Input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      borderRadius: '8px',
                    }}
                    className={`py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border ${formErrors.email ? 'border-red-500' : 'border-[#FFF]'} placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors`}
                    placeholder={t('academyApplication.email')}
                  />
                  {formErrors.email && (
                    <span className='text-red-500 text-[12px] lg:text-[14px] mt-1'>
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                  <Input
                    type='text'
                    name='linkedInProfile'
                    value={formData.linkedInProfile}
                    onChange={handleInputChange}
                    style={{
                      borderRadius: '8px',
                    }}
                    className={`py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border ${formErrors.linkedInProfile ? 'border-red-500' : 'border-[#FFF]'} placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors`}
                    placeholder={t('academyApplication.linkedInProfile')}
                  />
                  {formErrors.linkedInProfile && (
                    <span className='text-red-500 text-[12px] lg:text-[14px] mt-1'>
                      {formErrors.linkedInProfile}
                    </span>
                  )}
                </div>
                <div className='relative'>
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => handleInputChange({ target: { name: 'countryCode', value } } as any)}
                  >
                    <SelectTrigger
                      style={{
                        borderRadius: '8px',
                        width: '100%',
                        padding: '16px 24px',
                        background: '#FFF',
                        color: formData.countryCode ? "#333" : "rgba(51, 51, 51, 0.80)",
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '150%',
                        border: '1px solid #D6D6D6',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      className="focus:outline-none transition-colors cursor-pointer"
                    >
                      <SelectValue placeholder={t('careers.country')} />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: '#FFF',
                        borderRadius: '8px',
                        border: '1px solid #D6D6D6',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr',
                      }}
                    >
                      {countries.map(country => (
                        <SelectItem
                          key={country.id}
                          value={country.id.toString()}
                          style={{
                            color: '#333',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '150%',
                            opacity: 0.8,
                            padding: '8px 24px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            textAlign: isRTL ? 'right' : 'left',
                          }}
                        >
                          {getCountryTranslation(country)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='text-[14px] lg:text-[16px] text-white frutiger-lt-std-bold lg:h-[20px]'>
                {t('academyApplication.documentUpload')}
              </div>
              <div className='relative pb-4'>
                <input
                  type='file'
                  id='cv-upload'
                  className='hidden'
                  accept='.pdf,.doc,.docx'
                  onChange={handleFileChange}
                />
                <label
                  htmlFor='cv-upload'
                  className='w-full h-[56px] lg:h-[64px] text-[14px] lg:text-[16px] cursor-pointer rounded-[8px] flex items-center'
                  style={{
                    border: '1px solid #FFF',
                    background: '#FFF',
                  }}
                >
                  <span
                    className='text-[#333] opacity-80 bg-[#ECEEEE] w-[120px] lg:w-[131px] py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] flex items-center'
                    style={{
                      borderRadius: isRTL ? '0 8px 8px 0' : '8px 0 0 8px',
                    }}
                  >
                    {t('academyApplication.chooseFile')}
                  </span>
                  <span className='text-[#333] opacity-80 py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] flex items-center'>
                    {selectedFile
                      ? selectedFile.name
                      : t('careers.uploadYourCV')}
                  </span>
                </label>
              </div>
              <Button
                type='submit'
                disabled={
                  isUploading ||
                  createApplicationMutation.isPending
                }
                className='z-[3000] h-[48px] lg:h-[56px] w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button lg:py-4 lg:px-6 disabled:opacity-50 disabled:cursor-not-allowed'
                style={{
                  background:
                    'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                  boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                  padding: '12px 20px',
                }}
              >
                {isUploading || createApplicationMutation.isPending
                  ? t('careers.submitting') || 'Submitting...'
                  : t('academyApplication.submitApplication')}
                {!(
                  isUploading ||
                  createApplicationMutation.isPending
                ) && (
                    <svg
                      style={{
                        width: '20px',
                        height: '24px',
                        paddingTop: '2px',
                        transform: isRTL ? 'scaleX(-1)' : 'none',
                      }}
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M9.5 6L15.5 12L9.5 18'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CareerSuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CareerDetailsClient;
