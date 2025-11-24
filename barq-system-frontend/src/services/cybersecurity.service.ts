import {
  cybersecurityHeroControllerRead,
  networkSectionControllerRead,
  cybersecurityDataCenterControllerRead,
  operationIntelligenceControllerRead,
  identityManagementControllerRead,
  applicationDataControllerRead,
} from '@/sdk/sdk.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const getCybersecurityHero = async () => {
  const response = await cybersecurityHeroControllerRead({
    query: { query: { relations: { image: true, logos: true } } },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getNetworkSection = async () => {
  const response = await networkSectionControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          network_section_cards_id_network_section_cards: {
            icon: true,
          },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getCybersecurityDataCenter = async () => {
  const response = await cybersecurityDataCenterControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          cybersecurity_data_center_cards_id_cybersecurity_data_center_cards: {
            icon: true,
          },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getOperationIntelligence = async () => {
  const response = await operationIntelligenceControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          operation_intelligence_cards_id_operation_intelligence_cards: {
            icon: true,
          },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getIdentityManagement = async () => {
  const response = await identityManagementControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          identity_management_cards_id_identity_management_cards: {
            icon: true,
          },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  return response.data?.data?.[0] || null;
};

export const getApplicationData = async () => {
  const response = await applicationDataControllerRead({
    query: {
      query: {
        relations: {
          logo: true,
          image: true,
          application_data_cards_id_application_data_cards: { icon: true },
        },
      },
    },
    headers: await getLanguageHeaders(),
  });
  console.log(response.data?.data?.[0], 'response');
  return response.data?.data?.[0] || null;
};
