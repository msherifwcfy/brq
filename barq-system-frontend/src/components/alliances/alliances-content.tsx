'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { getLanguageHeaders } from '@/lib/language-utils';

interface AlliancesContentProps {
  headData: AlliancesHeadEntity | null;
  clientsData: Array<AlliancesClientsEntity>;
  vendorsData: Array<AlliancesVendorsEntity>;
  countries: CountryEntity[];
  industries: IndustriesEntity[];
  solutions: SolutionsEntity[];
  initialTab: 'clients' | 'vendors';
  selectedCountry: string;
  selectedIndustry: string;
  selectedSolution: string;
}

const ITEMS_PER_PAGE = 24;

export default function AlliancesContent({
  headData,
  clientsData,
  vendorsData,
  countries,
  industries,
  solutions,
  initialTab,
  selectedCountry,
  selectedIndustry,
  selectedSolution,
}: AlliancesContentProps) {
  const [activeTab, setActiveTab] = useState<'clients' | 'vendors'>(initialTab);
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(getLanguageHeaders());
  
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Client-side filtering
  const filteredData = useMemo(() => {
    const data = activeTab === 'clients' ? clientsData : vendorsData;
    
    return data.filter((item) => {
      // Filter by country
      if (selectedCountry && selectedCountry !== '') {
        const countryId = parseInt(selectedCountry, 10);
        const hasCountry = item.countries?.some(
          (country) => country.id === countryId
        );
        if (!hasCountry) return false;
      }

      // Filter by industry (for clients)
      if (activeTab === 'clients' && selectedIndustry && selectedIndustry !== '') {
        const industryId = parseInt(selectedIndustry, 10);
        const clientItem = item as AlliancesClientsEntity;
        const hasIndustry = clientItem.industries?.some(
          (industry) => industry.id === industryId
        );
        if (!hasIndustry) return false;
      }

      // Filter by solution (for vendors)
      if (activeTab === 'vendors' && selectedSolution && selectedSolution !== '') {
        const solutionId = parseInt(selectedSolution, 10);
        const vendorItem = item as AlliancesVendorsEntity;
        const hasSolution = vendorItem.solutions?.some(
          (solution) => solution.id === solutionId
        );
        if (!hasSolution) return false;
      }

      return true;
    });
  }, [activeTab, clientsData, vendorsData, selectedCountry, selectedIndustry, selectedSolution]);

  // Client-side pagination
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

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

  return (
    <>
      <AlliancesHero
        headData={headData}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <AlliancesGrid
        data={paginatedData}
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
