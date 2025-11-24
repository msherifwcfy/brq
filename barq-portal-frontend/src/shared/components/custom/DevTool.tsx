import {
  Copy,
  Eye,
  EyeOff,
  History,
  RefreshCw,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authControllerSignin } from "@/sdk/sdk.gen";
import { type UsersEntity } from "@/sdk/types.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { useAuthStore } from "@/features/auth/auth.store";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAuthControllerSignin } from "@/sdk/modules/auth.gen";

interface SavedSession {
  user: UsersEntity;
  token: string;
  email: string;
  timestamp: number;
}

const SAVED_SESSIONS_KEY = "dev_tool_saved_sessions";

const getRoleBadgeVariant = (_role: string) => "secondary" as const;

const DevTool = () => {
  if (import.meta.env.VITE_TOOL !== "true") {
    return null;
  }
  return <DevToolContent />;
};

const DevToolContent = () => {
  const toolEnabled = import.meta.env.VITE_TOOL === "true";
  const navigate = useNavigate();
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [showUserData, setShowUserData] = useState<string | null>(null);
  const [showCurrentUserData, setShowCurrentUserData] = useState(false);
  const {
    setUser,
    user: currentUser,
    token,
    setToken,
    fetchProfile,
  } = useAuthStore();

  // Get current user data from store
  const getCurrentUserData = () => {
    // Get fresh state from store to ensure we have the latest data
    const storeState = useAuthStore.getState();

    // Use fresh store state instead of React state which might be stale
    if (!storeState.user || !storeState.token) {
      return null;
    }

    return {
      user: storeState.user,
      token: storeState.token,
    };
  };

  const currentUserData = getCurrentUserData();

  useEffect(() => {
    const sessions = localStorage.getItem(SAVED_SESSIONS_KEY);
    if (sessions) {
      try {
        const parsedSessions = JSON.parse(sessions);
        setSavedSessions(parsedSessions);
        console.log("Loaded saved sessions:", parsedSessions.length);
      } catch (error) {
        console.error("Error parsing saved sessions:", error);
        localStorage.removeItem(SAVED_SESSIONS_KEY);
      }
    } else {
      console.log("No saved sessions found");
    }
  }, []);

  const saveCurrentSession = (sessionEmail: string, currentDataAlt?: any) => {
    const currentData = currentDataAlt || getCurrentUserData();
    if (!currentData) {
      console.log("No current user data available to save");
      return;
    }

    const { user, token } = currentData;
    const newSession: SavedSession = {
      user,
      token,
      email: sessionEmail,
      timestamp: Date.now(),
    };

    // Check if session already exists
    const existingSessionIndex = savedSessions.findIndex(
      (session) => session.email === sessionEmail
    );

    let updatedSessions: SavedSession[];
    if (existingSessionIndex !== -1) {
      // Update existing session
      updatedSessions = [...savedSessions];
      updatedSessions[existingSessionIndex] = newSession;
      console.log("Updated existing session for:", sessionEmail);
    } else {
      // Add new session
      updatedSessions = [...savedSessions, newSession];
      console.log("Added new session for:", sessionEmail);
    }

    setSavedSessions(updatedSessions);
    localStorage.setItem(SAVED_SESSIONS_KEY, JSON.stringify(updatedSessions));
    console.log("Saved sessions updated:", updatedSessions.length);
  };

  const removeSession = (email: string) => {
    const updatedSessions = savedSessions.filter(
      (session) => session.email !== email
    );
    setSavedSessions(updatedSessions);
    localStorage.setItem(SAVED_SESSIONS_KEY, JSON.stringify(updatedSessions));
  };

  const switchToSession = async (session: SavedSession) => {
    try {
      console.log("Switching to session:", session.email);
      console.log("Session token:", session.token);

      // Update user store with the session data
      setUser(session.user);

      // Set access token in store and localStorage
      setToken(session.token);
      localStorage.setItem("access_token", session.token);

      // Attempt to refresh user profile
      await fetchProfile().catch(() => {});

      // Reload to ensure SDK picks updated token
      window.location.href = `/${lang}/`;

      // Reset states
      setShowCurrentUserData(false);
      setShowUserData(null);

      toast.success("Switched to session successfully");

      // Verify the switch worked
      setTimeout(() => {
        const currentData = getCurrentUserData();
        console.log("After session switch - current data:", currentData);
      }, 100);
    } catch (error) {
      toast.error("Failed to switch session");
      console.error("Session switch error:", error);
    }
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    window.location.href = `/${lang}/auth/login`;
  };

  const handleLogin = () => {
    navigate(`/${lang}/auth/login`);
  };

  const { mutateAsync: signinMutation } = useAuthControllerSignin(
    {},
    {
      onSuccess: async (data) => {
        const tokensData = data?.data as any;
        if (tokensData?.access_token) {
          localStorage.setItem("access_token", tokensData.access_token);
          if (tokensData.refresh_token) {
            localStorage.setItem("refresh_token", tokensData.refresh_token);
          }
          setToken(tokensData.access_token);

          await fetchProfile().catch(() => {});

          saveCurrentSession(email, {
            user: data?.data as any,
            token: tokensData.access_token,
          });
          toast.success("Login successful");
          window.location.href = `/${lang}/`;
        } else {
          console.error("Login failed", data);
          toast.error("Login failed ");
        }
      },
      onError: (error) => {
        console.error("Quick login failed:", error);
        toast.error("Quick login failed", {
          description: error.message,
        });
      },
    }
  );

  const handleQuickLogin = async () => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    signinMutation({
      body: { email, password },
    });
  };

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleRefreshToken = async (_sessionEmail: string) => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
      toast.error("No refresh token found");
      return;
    }
    toast.info("Please re-login using Quick Login to refresh tokens");
  };

  if (!toolEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all">
            <Settings className="w-6 h-6" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="p-4 bg-popover text-popover-foreground rounded-lg shadow-lg max-w-[400px] w-fit max-h-[80vh] overflow-y-auto border border-border"
          side="top"
          align="end"
          sideOffset={16}
        >
          {/* Current User Section */}
          {currentUserData && (
            <div className="mb-4">
              <div className="flex items-center justify-between p-2">
                {" "}
                <div className="flex items-center space-x-3">
                  {currentUserData?.user?.name ? (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      {currentUserData?.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      {currentUserData?.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-foreground">
                      {currentUserData?.user?.name || "Unknown User"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentUserData?.user?.email}
                    </div>
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      <Badge
                        variant={getRoleBadgeVariant(
                          currentUserData?.user?.user_role?.name || "user"
                        )}
                      >
                        {currentUserData?.user?.user_role?.name || "user"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCurrentUserData(!showCurrentUserData)}
                    className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
                    title="View Current User Data"
                  >
                    {showCurrentUserData ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (currentUserData) {
                        copyToClipboard(
                          currentUserData.token,
                          "Current token copied to clipboard"
                        );
                      }
                    }}
                    className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
                    title="Copy Current Token"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      handleRefreshToken(currentUserData?.user?.email || "")
                    }
                    className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
                    title="Refresh Token"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {showCurrentUserData && (
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => {
                        if (currentUserData) {
                          copyToClipboard(
                            JSON.stringify(currentUserData.user, null, 2),
                            "Current user data copied to clipboard"
                          );
                        }
                      }}
                      className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/90 rounded-md text-secondary-foreground"
                    >
                      Copy User Data
                    </button>
                  </div>
                  <pre className="text-xs overflow-x-auto whitespace-pre-wrap text-foreground/80">
                    {JSON.stringify(currentUserData?.user, null, 2)}
                  </pre>
                </div>
              )}
              <div className="mt-2 border-b" />
            </div>
          )}

          {/* Quick Login Section */}
          <div className="space-y-4 mb-4">
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <button
              onClick={handleQuickLogin}
              className="w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Quick Login
            </button>
            {currentUserData && (
              <button
                onClick={() =>
                  saveCurrentSession(
                    email || currentUserData?.user?.email || "current-user"
                  )
                }
                className="w-full text-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
              >
                Save Current Session
              </button>
            )}
            <div className="text-xs text-muted-foreground text-center">
              OTP will be auto-filled as 1234
            </div>
          </div>

          {/* Saved Sessions Button with Popover */}
          {savedSessions.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
                  <History className="w-4 h-4" />
                  View Saved Sessions ({savedSessions.length})
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 bg-popover text-popover-foreground border border-border mr-4 mb-14 min-w-[320px] shadow-lg animate-in fade-in-0 zoom-in-95 w-fit rounded-xl"
                side="right"
                align="start"
                sideOffset={8}
              >
                <div className="py-2 max-h-[90vh] overflow-y-auto">
                  {savedSessions.map((session, index) => {
                    return (
                      <div key={session.email + index} className="px-2">
                        <div
                          className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer group"
                          onClick={() => switchToSession(session)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                              {session.user.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-foreground">
                                {session.user?.name || session.email}
                              </div>
                              <div className="text-sm text-muted-foreground group-hover:text-foreground/80">
                                {session.user?.email || session.email}
                              </div>
                              <div className="flex items-center gap-1 mt-1 flex-wrap">
                                <Badge
                                  variant={getRoleBadgeVariant(
                                    session.user.user_role?.name || "user"
                                  )}
                                >
                                  {session.user.user_role?.name || "user"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(
                                  session.token,
                                  "Token copied to clipboard"
                                );
                              }}
                              className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
                              title="Copy Token"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRefreshToken(session.email);
                              }}
                              className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
                              title="Refresh Token"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUserData(
                                  showUserData === session.email
                                    ? null
                                    : session.email
                                );
                              }}
                              className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
                              title="View User Data"
                            >
                              {showUserData === session.email ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSession(session.email);
                              }}
                              className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {showUserData === session.email && (
                          <div className="mt-2 mx-2 p-2 bg-muted rounded-md">
                            <div className="flex justify-end mb-2">
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(session.user, null, 2),
                                    "User data copied to clipboard"
                                  )
                                }
                                className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/90 rounded-md text-secondary-foreground"
                              >
                                Copy User Data
                              </button>
                            </div>
                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap text-foreground/80">
                              {JSON.stringify(session.user, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Navigation Buttons */}
          <div className="border-t pt-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-accent rounded-md"
            >
              Logout
            </button>
            <button
              onClick={handleLogin}
              className="w-full text-left px-4 py-2 hover:bg-accent rounded-md"
            >
              Go to Login
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DevTool;
