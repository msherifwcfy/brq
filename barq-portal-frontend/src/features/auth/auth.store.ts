import { create } from "zustand";
import { getProfile } from "./api/auth.api";
import type {
  PermissionsEntity,
  RolePermissionsEntity,
  UsersEntity,
} from "@/sdk/types.gen";

interface AuthState {
  isAuthenticated: boolean;
  user: UsersEntity | null;
  permissions: string[];
  isLoading: boolean;
  error: string | null;
  token: string | null;
  setUser: (user: UsersEntity | null) => void;
  setPermissions: (permissions: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setToken: (token: string | null) => void;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  permissions: [],
  isLoading: true,
  error: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  setUser: (user) => {
    const permissions =
      user?.user_role?.role_role_permissions
        ?.filter((permission) => permission.role_permission_permission?.key)
        ?.map(
          (permission) => permission.role_permission_permission?.key || ""
        ) || [];
    set({
      user,
      isAuthenticated: !!user,
      permissions,
    });
  },

  setPermissions: (permissions) => set({ permissions }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getProfile();
      const userData = response?.data?.data;

      if (userData) {
        get().setUser(userData as any);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      set({
        error: "Failed to fetch profile",
        isAuthenticated: false,
        user: null,
        permissions: [],
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      const token = get().token;
      if (token) {
        // Call logout API if needed
        // await logoutApi();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      set({
        user: null,
        isAuthenticated: false,
        permissions: [],
        isLoading: false,
        error: null,
        token: null,
      });
    }
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    const hasToken = !!token;
    set({ token, isAuthenticated: hasToken });
    return hasToken;
  },
}));
