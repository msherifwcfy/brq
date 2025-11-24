'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AlliancesHero from './alliances-hero';
import AlliancesGrid from './alliances-grid';
import type {
  AlliancesHeadEntity,
  AlliancesClientsEntity,
  AlliancesVendorsEntity,
  CountryEntity,
  IndustriesEntity,
  SolutionsEntity,
} from '@/sdk/types.gen';

interface AlliancesContentProps {
  headData: AlliancesHeadEntity | null;
  clientsData: Array<AlliancesClientsEntity>;
  vendorsData: Array<AlliancesVendorsEntity>;
  countries: CountryEntity[];
  industries: IndustriesEntity[];
  solutions: SolutionsEntity[];
  initialTab: 'clients' | 'vendors';
  currentPage: number;
  totalPages: number;
  selectedCountry: string;
  selectedIndustry: string;
  selectedSolution: string;
}

export default function AlliancesContent({
  headData,
  clientsData,
  vendorsData,
  countries,
  industries,
  solutions,
  initialTab,
  currentPage,
  totalPages,
  selectedCountry,
  selectedIndustry,
  selectedSolution,
}: AlliancesContentProps) {
  const [activeTab, setActiveTab] = useState<'clients' | 'vendors'>(initialTab);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: 'clients' | 'vendors') => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1');
    params.delete('country');
    params.delete('industry');
    params.delete('solution');
    router.push(`?${params.toString()}`);
  };

  const currentData = activeTab === 'clients' ? clientsData : vendorsData;

  return (
    <>
      <AlliancesHero
        headData={headData}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <AlliancesGrid
        data={currentData}
        countries={countries}
        industries={industries}
        solutions={solutions}
        activeTab={activeTab}
        currentPage={currentPage}
        totalPages={totalPages}
        selectedCountry={selectedCountry}
        selectedIndustry={selectedIndustry}
        selectedSolution={selectedSolution}
      />
    </>
  );
}
