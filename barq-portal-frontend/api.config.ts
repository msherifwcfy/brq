import { BASE_URL } from "@/shared/utils/env";
import type { Config } from "@ts-sdk-gen/client-fetch";

const accessToken = localStorage.getItem("access_token");

export default {
  baseUrl: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
} satisfies Config;
