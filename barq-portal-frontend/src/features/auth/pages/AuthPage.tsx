import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../components/LoginForm";
import VerifyOtpForm from "../components/VerifyOtpForm";
import ForgetPasswordForm from "../components/ForgetPasswordForm";
import CompletePasswordForm from "../components/CompletePasswordForm";
import { getYear } from "date-fns";
import { useLang } from "@/shared/hooks/use-lang";
import { Button } from "@/shared/components/ui/button";
import { Languages } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/shared/lib/utils";

type AuthView =
  | "login"
  | "verify-otp"
  | "forget-password"
  | "complete-password";

interface AuthPageProps {
  initialView?: AuthView;
  email?: string;
}

export default function AuthPage({
  initialView = "complete-password",
  email,
}: AuthPageProps) {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [currentEmail, setCurrentEmail] = useState<string>(email || "");
  const currentyear = getYear(new Date());
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  const otherLang = lang === "ar" ? "en" : "ar";
  const handleToggleLanguage = () => {
    const segments = location.pathname.split("/");
    const rest = segments.slice(2).join("/");
    const newPath = `/${otherLang}${rest ? "/" + rest : ""}`;
    navigate(newPath);
  };

  const langLabel = otherLang === "ar" ? "العربية" : "English";

  const handleViewChange = (view: AuthView, email?: string) => {
    setCurrentView(view);
    if (email) {
      setCurrentEmail(email);
    }
  };

  const renderAuthForm = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onEmailSubmit={(email) => handleViewChange("verify-otp", email)}
            onForgetPassword={() => handleViewChange("forget-password")}
          />
        );
      case "verify-otp":
        return (
          <VerifyOtpForm
            email={currentEmail}
            onBack={() => handleViewChange("login")}
            onSuccess={() =>
              handleViewChange("complete-password", currentEmail)
            }
          />
        );
      case "forget-password":
        return (
          <ForgetPasswordForm
            onBack={() => handleViewChange("login")}
            onSuccess={(email) => {
              handleViewChange("verify-otp", email);
            }}
          />
        );
      case "complete-password":
        return (
          <CompletePasswordForm
            email={currentEmail}
            onSuccess={() => handleViewChange("login")}
          />
        );
      default:
        return <LoginForm />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex bg-background"
    >
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2  relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-button/20 via-button/50 to-button"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary-foreground)) 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Logo Section */}
        <div className="relative z-10  w-full flex flex-col justify-center items-center h-full px-12 text-primary-foreground">
          <div className="text-center space-y-8">
            {/* Large Logo */}
            <div className="mb-8">
              <BarqLogo className="w-58 h-auto mx-auto" />
            </div>

            {/* Brand Text */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {t("auth.welcome.title")}
              </h1>
              <p className="text-xl text-primary-foreground/80 text-center  leading-relaxed">
                {t("auth.welcome.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-foreground/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary/20 rounded-full blur-lg"></div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4">
            <Button onClick={handleToggleLanguage}>
              <Languages className="w-6 h-6" />
              <span
                className={cn(
                  "ml-2 ",
                  lang === "ar" ? "font-frutiger" : "font-noto-kufi"
                )}
              >
                {langLabel}
              </span>
            </Button>
          </div>
          {/* Mobile Logo (visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <BarqLogo className="w-24 h-auto mx-auto" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {renderAuthForm()}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>{t("auth.footer", { year: currentyear })}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const BarqLogo = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 140 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M90.6372 44.2763L90.7453 43.1952C91.2238 43.4578 91.6868 43.5813 92.119 43.5813C92.3969 43.5813 92.6438 43.5195 92.8599 43.3651C93.076 43.2261 93.1841 43.0254 93.1841 42.7474C93.1841 42.4694 93.0915 42.2841 92.9217 42.1605C92.7364 42.037 92.4123 41.8825 91.9492 41.6818C91.4707 41.481 91.1312 41.2494 90.8842 41.0023C90.6527 40.7552 90.5292 40.4 90.5292 39.9367C90.5292 39.5506 90.6218 39.2263 90.8224 38.9638C91.0231 38.7012 91.2855 38.5159 91.6097 38.3923C91.9338 38.2688 92.2888 38.207 92.6747 38.207C93.1841 38.207 93.6626 38.2842 94.1256 38.4387L94.0176 39.4425C93.57 39.2417 93.1532 39.1336 92.7673 39.1336C92.5049 39.1336 92.2734 39.1954 92.0882 39.3035C91.9029 39.4116 91.7949 39.5969 91.7949 39.8595C91.7949 40.122 91.8721 40.261 92.011 40.3537C92.1499 40.4463 92.4895 40.6007 92.9989 40.8324C93.5082 41.064 93.8941 41.2957 94.1256 41.5582C94.3726 41.8208 94.4961 42.176 94.4961 42.6393C94.4961 42.9636 94.4344 43.257 94.3109 43.4887C94.1874 43.7357 94.0176 43.9211 93.8015 44.0755C93.5854 44.2299 93.3384 44.338 93.0606 44.4153C92.7828 44.4925 92.4895 44.5234 92.1808 44.5234C91.6868 44.5234 91.1775 44.4307 90.6372 44.2454V44.2763Z"
        fill="currentColor"
      />
      <path
        d="M100.408 44.3998H99.1885V41.9752L96.9658 38.3306H98.4013L99.6979 40.6007C99.7442 40.678 99.7905 40.7706 99.8368 40.8787C99.8677 40.8015 99.914 40.7088 99.9603 40.6007L101.288 38.3306H102.6L100.408 41.9443V44.3998Z"
        fill="currentColor"
      />
      <path
        d="M105.286 44.2763L105.394 43.1952C105.872 43.4578 106.335 43.5813 106.767 43.5813C107.045 43.5813 107.292 43.5195 107.508 43.3651C107.724 43.2261 107.832 43.0254 107.832 42.7474C107.832 42.4694 107.74 42.2841 107.57 42.1605C107.385 42.037 107.061 41.8825 106.598 41.6818C106.119 41.481 105.779 41.2494 105.533 41.0023C105.301 40.7552 105.177 40.4 105.177 39.9367C105.177 39.5506 105.27 39.2263 105.471 38.9638C105.671 38.7012 105.934 38.5159 106.258 38.3923C106.582 38.2688 106.937 38.207 107.323 38.207C107.832 38.207 108.311 38.2842 108.774 38.4387L108.666 39.4425C108.218 39.2417 107.802 39.1336 107.416 39.1336C107.153 39.1336 106.922 39.1954 106.736 39.3035C106.536 39.4271 106.443 39.5969 106.443 39.8595C106.443 40.122 106.52 40.261 106.659 40.3537C106.798 40.4463 107.138 40.6007 107.647 40.8324C108.157 41.064 108.542 41.2957 108.774 41.5582C109.005 41.8208 109.144 42.176 109.144 42.6393C109.144 42.9636 109.083 43.257 108.959 43.4887C108.836 43.7357 108.666 43.9211 108.45 44.0755C108.234 44.2299 107.987 44.338 107.709 44.4153C107.431 44.4925 107.138 44.5234 106.829 44.5234C106.335 44.5234 105.826 44.4307 105.286 44.2454V44.2763Z"
        fill="currentColor"
      />
      <path
        d="M114.562 44.3998H113.343V39.3344H111.614V38.3306H116.306V39.3344H114.562V44.3998Z"
        fill="currentColor"
      />
      <path
        d="M122.728 43.4114V44.3998H119.1V38.3306H122.697V39.3344H120.335V40.8015H122.496V41.7899H120.335V43.4114H122.728Z"
        fill="currentColor"
      />
      <path
        d="M132.822 44.3998H131.603V40.8169C131.619 40.2764 131.649 39.7205 131.68 39.1799H131.649C131.588 39.427 131.526 39.6278 131.464 39.8131L129.921 44.3998H128.794L127.482 40.6162C127.312 40.1374 127.173 39.6741 127.065 39.1799H127.034C127.096 39.7668 127.127 40.2919 127.127 40.7706V44.3998H125.969V38.3306H127.899L128.994 41.5119C129.164 42.0215 129.303 42.5157 129.38 43.0099C129.427 42.7628 129.488 42.5312 129.535 42.3458C129.581 42.1605 129.643 41.9752 129.705 41.7744L130.862 38.3306H132.822V44.3998Z"
        fill="currentColor"
      />
      <path
        d="M136.141 44.2763L136.249 43.1952C136.728 43.4578 137.191 43.5813 137.623 43.5813C137.901 43.5813 138.148 43.5195 138.364 43.3651C138.58 43.2261 138.688 43.0254 138.688 42.7474C138.688 42.4694 138.595 42.2841 138.425 42.1605C138.24 42.037 137.916 41.8825 137.453 41.6818C136.975 41.481 136.635 41.2494 136.388 41.0023C136.156 40.7552 136.033 40.4 136.033 39.9367C136.033 39.5506 136.126 39.2263 136.326 38.9638C136.527 38.7012 136.789 38.5159 137.113 38.3923C137.438 38.2688 137.793 38.207 138.178 38.207C138.688 38.207 139.166 38.2842 139.629 38.4387L139.521 39.4425C139.074 39.2417 138.657 39.1336 138.271 39.1336C138.009 39.1336 137.777 39.1954 137.592 39.3035C137.391 39.4271 137.299 39.5969 137.299 39.8595C137.299 40.122 137.376 40.261 137.515 40.3537C137.654 40.4463 137.993 40.6007 138.503 40.8324C139.012 41.064 139.398 41.2957 139.629 41.5582C139.876 41.8208 140 42.176 140 42.6393C140 42.9636 139.938 43.257 139.815 43.4887C139.691 43.7357 139.521 43.9211 139.305 44.0755C139.089 44.2299 138.842 44.338 138.564 44.4153C138.287 44.4925 137.993 44.5234 137.685 44.5234C137.191 44.5234 136.681 44.4307 136.141 44.2454V44.2763Z"
        fill="currentColor"
      />
      <path
        d="M31.3958 22.6089C31.0408 21.6051 30.5314 20.7094 29.8831 19.9527C29.2194 19.196 28.4322 18.5782 27.5215 18.084C26.6108 17.5899 25.5921 17.2655 24.4653 17.0957V16.9876C26.2249 16.4162 27.645 15.4587 28.7255 14.1305C29.806 12.8024 30.3308 11.1191 30.3308 9.11145C30.3308 7.10382 29.9603 5.59037 29.2194 4.41668C28.4785 3.24298 27.5215 2.31638 26.333 1.66776C25.1444 1.00369 23.8015 0.571279 22.3197 0.355072C20.8225 0.138865 19.3407 0.0307617 17.8743 0.0307617H0L2.14554 6.70229H5.17089V35.7976H19.1246C20.6373 35.7976 22.1499 35.6277 23.6781 35.2879C25.2062 34.9482 26.5799 34.3922 27.7993 33.6201C29.0187 32.8479 30.0066 31.8286 30.7784 30.5623C31.5502 29.2959 31.9361 27.7207 31.9361 25.8366C31.9361 24.6938 31.7663 23.6128 31.4112 22.6089H31.3958ZM23.9559 26.9022C23.6472 27.4427 23.2613 27.8751 22.7828 28.2149C22.3043 28.5546 21.7641 28.7863 21.1775 28.9253C20.591 29.0643 20.0044 29.126 19.4179 29.126H12.6725V6.70229H17.7817C18.3528 6.70229 18.9548 6.76406 19.5568 6.87217C20.1588 6.99572 20.7144 7.18103 21.1929 7.45901C21.6714 7.72155 22.0728 8.10763 22.366 8.60182C22.6748 9.09601 22.8291 9.6983 22.8291 10.4396C22.8291 11.1809 22.6902 11.7523 22.4123 12.2619C22.1345 12.7715 21.7795 13.1731 21.3319 13.4665C20.8842 13.7753 20.3749 13.9916 19.8192 14.1305C19.2635 14.2695 18.6924 14.3313 18.1058 14.3313H17.5656H14.5248L16.6703 21.0028H17.5193H18.3374C18.9394 21.0028 19.6031 21.0492 20.3131 21.1573C21.0232 21.2654 21.6714 21.4507 22.2889 21.7132C22.8909 21.9758 23.4002 22.3773 23.8015 22.9024C24.2029 23.4274 24.4035 24.1069 24.4035 24.9409C24.4035 25.7131 24.2492 26.3771 23.9405 26.9176L23.9559 26.9022Z"
        fill="currentColor"
      />
      <path
        d="M50.011 10.4244L59.4575 35.7824H67.8853L53.0672 0.015625H46.8467L32.1212 35.7824H40.3946H40.549L50.011 10.4244Z"
        fill="currentColor"
      />
      <path
        d="M90.2514 35.7822H97.4598L88.8005 20.6786C91.2084 20.1999 93.0298 19.088 94.2955 17.312C95.5458 15.5515 96.1787 13.3894 96.1787 10.8721C96.1787 8.78727 95.8391 7.04217 95.1445 5.63682C94.4499 4.24692 93.5238 3.135 92.3507 2.30106C91.1776 1.48256 89.8192 0.880271 88.2603 0.525074C86.7013 0.169877 85.0651 0 83.3209 0H70.1235V35.7668H77.6406V6.67153H82.5491C83.2283 6.67153 83.9074 6.71786 84.6175 6.82596C85.3275 6.93406 85.9449 7.11938 86.5006 7.41281C87.0408 7.70623 87.4885 8.10776 87.8435 8.64828C88.1985 9.18879 88.3683 9.91463 88.3683 10.8258C88.3683 11.7987 88.1676 12.5554 87.7663 13.096C87.365 13.6365 86.8556 14.038 86.2536 14.2851C85.6362 14.5322 84.957 14.6866 84.2007 14.733C83.4444 14.7793 82.7343 14.8102 82.0552 14.8102H79.6472L90.2514 35.7668V35.7822Z"
        fill="currentColor"
      />
      <path
        d="M137.546 28.9255H116.569C114.964 28.9255 113.513 28.6475 112.216 28.107C110.92 27.5664 109.808 26.7943 108.867 25.8213C107.94 24.8484 107.215 23.6902 106.721 22.3466C106.227 21.0185 105.98 19.5513 105.98 17.9452C105.98 16.3391 106.227 14.9183 106.721 13.5593C107.215 12.2003 107.925 11.0421 108.867 10.0691C109.793 9.09619 110.92 8.32402 112.216 7.7835C113.513 7.24299 114.964 6.96501 116.569 6.96501C118.174 6.96501 119.625 7.24299 120.922 7.7835C122.218 8.32402 123.33 9.09619 124.271 10.0691C125.197 11.0421 125.923 12.2157 126.417 13.5593C126.911 14.9029 127.158 16.37 127.158 17.9452C127.158 19.5205 126.911 21.0185 126.417 22.3466C125.923 23.6747 125.197 24.833 124.271 25.8213C124.009 26.0993 123.716 26.3619 123.422 26.609H133.023C133.224 26.2074 133.424 25.7905 133.594 25.358C134.505 23.1496 134.968 20.6633 134.968 17.9452C134.968 15.2272 134.505 12.7408 133.594 10.5324C132.684 8.32402 131.402 6.42449 129.766 4.88016C128.13 3.32038 126.185 2.13124 123.947 1.2973C121.694 0.463358 119.239 0.0463867 116.584 0.0463867C113.929 0.0463867 111.46 0.463358 109.222 1.2973C106.968 2.13124 105.039 3.33582 103.402 4.88016C101.766 6.43993 100.485 8.32402 99.5745 10.5324C98.6638 12.7408 98.2007 15.2272 98.2007 17.9452C98.2007 20.6633 98.6638 23.1496 99.5745 25.358C100.485 27.5664 101.766 29.466 103.402 31.0103C105.039 32.5701 106.983 33.7592 109.222 34.5932C111.475 35.4271 113.929 35.8441 116.584 35.8441H139.707L137.561 28.91L137.546 28.9255Z"
        fill="currentColor"
      />
    </svg>
  );
};
