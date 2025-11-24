import { useState, useRef, useEffect } from 'react';

export const useNavbarState = () => {
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isServicesSubmenuOpen, setIsServicesSubmenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileWhoWeAreOpen, setMobileWhoWeAreOpen] = useState(false);
  const [mobileWhatWeDoOpen, setMobileWhatWeDoOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = () => {
    setIsWhoWeAreOpen(false);
    setIsWhatWeDoOpen(false);
    setIsInsightsOpen(false);
    setIsServicesSubmenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        isWhoWeAreOpen &&
        whoWeAreRef.current &&
        !whoWeAreRef.current.contains(target)
      ) {
        setIsWhoWeAreOpen(false);
      }

      if (
        isWhatWeDoOpen &&
        whatWeDoRef.current &&
        !whatWeDoRef.current.contains(target)
      ) {
        setIsWhatWeDoOpen(false);
      }

      if (
        isInsightsOpen &&
        insightsRef.current &&
        !insightsRef.current.contains(target)
      ) {
        setIsInsightsOpen(false);
      }

      if (
        isLanguageOpen &&
        languageRef.current &&
        !languageRef.current.contains(target)
      ) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWhoWeAreOpen, isWhatWeDoOpen, isInsightsOpen, isLanguageOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return {
    // Desktop state
    isWhoWeAreOpen,
    setIsWhoWeAreOpen,
    isWhatWeDoOpen,
    setIsWhatWeDoOpen,
    isInsightsOpen,
    setIsInsightsOpen,
    isLanguageOpen,
    setIsLanguageOpen,
    isServicesSubmenuOpen,
    setIsServicesSubmenuOpen,

    // Mobile state
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    mobileWhoWeAreOpen,
    setMobileWhoWeAreOpen,
    mobileWhatWeDoOpen,
    setMobileWhatWeDoOpen,
    mobileInsightsOpen,
    setMobileInsightsOpen,
    mobileServicesOpen,
    setMobileServicesOpen,

    // Refs
    whoWeAreRef,
    whatWeDoRef,
    insightsRef,
    languageRef,

    // Helper
    closeAllDropdowns,
  };
};
