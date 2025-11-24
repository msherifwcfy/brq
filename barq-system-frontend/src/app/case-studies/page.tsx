import Footer from '@/components/footer';
import React from 'react';
import CaseStudiesContent from './CaseStudiesContent';
import { caseStudiesService } from '@/services/case-studies.service';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    country?: string;
    industry?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  // Fetch all data without pagination for client-side pagination
  const {
    hero: heroData,
    caseStudies: cmsData,
    countries: countriesData,
    industries: industriesData,
  } = await caseStudiesService.getAllCaseStudiesData({
    pagination: { caseStudiesPagination: { take: 1000, skip: 0 } },
  });

  return (
    <>
      <CaseStudiesContent
        heroData={heroData}
        cmsData={cmsData}
        countriesData={countriesData}
        industriesData={industriesData}
        initialCountry={params.country || ''}
        initialIndustry={params.industry || ''}
      />
      <Footer />
    </>
  );
};

export default Page;
