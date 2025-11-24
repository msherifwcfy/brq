import { itInfrastructureHeroControllerRead, dataCenterControllerRead, mobilityControllerRead, softwareDefinedNetworkControllerRead, networkSectionControllerRead, controlSectionControllerRead } from '@/sdk/sdk.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const getItInfrastructureHero = async () => {
  const response = await itInfrastructureHeroControllerRead({
    query: { query: { relations: { image: true, icons: true } } },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getDataCenterSection = async () => {
  const response = await dataCenterControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          image: true,
          data_center_bullets_id_data_center_bullets: { icon: true,data_center_bullets_id_data_center_bullets_translations:true },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getMobilitySection = async () => {
  const response = await mobilityControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          mobility_cards_id_mobility_cards: { icon: true,mobility_cards_id_mobility_cards_translations:true },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getSoftwareDefinedNetworkSection = async () => {
  const response = await softwareDefinedNetworkControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          image: true,
          software_defined_network_cards_id_software_defined_network_cards: {
            icon: true,
            software_defined_network_cards_id_software_defined_network_cards_translations:true
          },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getNetworkSectionInfra = async () => {
  const response = await networkSectionControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          network_section_cards_id_network_section_cards: { icon: true,network_section_cards_id_network_section_cards_translations:true },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getControlSection = async () => {
  const response = await controlSectionControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          control_section_cards_id_control_section_cards: { icon: true,control_section_cards_id_control_section_cards_translations:true },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};


