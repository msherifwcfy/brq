import Image from 'next/image';
import Navbar from '@/components/home-page/navbar';
import Footer from '@/components/footer';
import AlliancesContent from '@/components/alliances/alliances-content';
import { alliancesService } from '@/services/alliances.service';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    tab?: string;
    page?: string;
    country?: string;
    industry?: string;
    solution?: string;
  }>;
}

export default async function AlliancesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeTab = (params.tab as 'clients' | 'vendors') || 'vendors';
  const currentPage = parseInt(params.page || '1', 10);
  const selectedCountry = params.country || 'All';
  const selectedIndustry = params.industry || 'All';
  const selectedSolution = params.solution || 'All';
  const itemsPerPage = 24;

  const countryId =
    selectedCountry !== 'All' ? parseInt(selectedCountry, 10) : undefined;
  const industryId =
    selectedIndustry !== 'All' ? parseInt(selectedIndustry, 10) : undefined;
  const solutionId =
    selectedSolution !== 'All' ? parseInt(selectedSolution, 10) : undefined;

  const [
    headData,
    clientsResponse,
    vendorsResponse,
    countriesResponse,
    industriesResponse,
    solutionsResponse,
  ] = await Promise.all([
    alliancesService.getHeadData(),
    alliancesService.getClientsData(
      activeTab === 'clients' ? currentPage : 1,
      itemsPerPage,
      activeTab === 'clients' ? countryId : undefined,
      activeTab === 'clients' ? industryId : undefined
    ),
    alliancesService.getVendorsData(
      activeTab === 'vendors' ? currentPage : 1,
      itemsPerPage,
      activeTab === 'vendors' ? countryId : undefined,
      activeTab === 'vendors' ? solutionId : undefined
    ),
    alliancesService.getCountries(),
    alliancesService.getIndustries(),
    alliancesService.getSolutions(),
  ]);

  const head = headData?.data?.[0] || null;
  const clients = clientsResponse?.data || [];
  const vendors = vendorsResponse?.data || [];
  const countries = countriesResponse?.data || [];
  const industries = industriesResponse?.data || [];
  const solutions = solutionsResponse?.data || [];

  const totalItems =
    activeTab === 'clients'
      ? clientsResponse?.meta?.total || 0
      : vendorsResponse?.meta?.total || 0;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='bg-black min-h-screen'>
      <section className='relative bg-black 2lx:px-[5%] min-h-[1820px]'>
        <div className='absolute top-0 left-0 right-0 bottom-0 z-5'>
          <Image
            src='/assets/alliances/alliance-background.svg'
            alt='Alliances background'
            width={1440}
            height={1819}
            className='object-cover z-5 w-full h-full min-h-[1819]'
          />
        </div>

        <div className='relative z-30 max-w-7xl mx-auto'>
          <Navbar isHomePage={false} />
        </div>

        <div className='relative z-20 px-[5%] xl:px-0'>
          <AlliancesContent
            headData={head}
            clientsData={clients}
            vendorsData={vendors}
            countries={countries}
            industries={industries}
            solutions={solutions}
            initialTab={activeTab}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedCountry={selectedCountry}
            selectedIndustry={selectedIndustry}
            selectedSolution={selectedSolution}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
