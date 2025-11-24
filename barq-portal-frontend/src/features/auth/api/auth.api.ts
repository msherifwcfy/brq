import { usersControllerReadMe } from "@/sdk/sdk.gen";

export const getProfile = async () => {
  try {
    const response = await usersControllerReadMe({
      query: {
        query: {
          relations: {
            user_role: {
              role_role_permissions: {
                role_permission_permission: true,
              },
            },
          },
        },
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
