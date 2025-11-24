'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

export default function Navbar({ isHomePage }: { isHomePage?: boolean }) {
    const { language } = useLanguage();
    const { t } = useTranslation();
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

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            // Check if click is outside who we are dropdown
            if (isWhoWeAreOpen && whoWeAreRef.current && !whoWeAreRef.current.contains(target)) {
                setIsWhoWeAreOpen(false);
            }

            // Check if click is outside what we do dropdown
            if (isWhatWeDoOpen && whatWeDoRef.current && !whatWeDoRef.current.contains(target)) {
                setIsWhatWeDoOpen(false);
            }

            // Check if click is outside insights dropdown
            if (isInsightsOpen && insightsRef.current && !insightsRef.current.contains(target)) {
                setIsInsightsOpen(false);
            }

            // Check if click is outside language dropdown
            if (isLanguageOpen && languageRef.current && !languageRef.current.contains(target)) {
                setIsLanguageOpen(false);
            }
        }

        // Use mousedown instead of click for better responsiveness
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

    const whoWeAreItems = [
        {
            label: t('navbar.whoWeAre.aboutBarq.label'),
            description: t('navbar.whoWeAre.aboutBarq.description'),
            href: '/about-barq',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21H21M7 21V3M7 4C12.675 4.908 17 9.613 17 15.28C16.9998 17.2978 16.4445 19.2766 15.395 21M5 9H17M7 13H11M7 17H11" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            label: t('navbar.whoWeAre.awards.label'),
            description: t('navbar.whoWeAre.awards.description'),
            href: '/awards',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 3H15L18 10L12 12M9 3L6 10L12 12M9 3L12 12M12 12L10.5 15L7.5 15.5L9.5 17.5L9 21L12 19.5L15 21L14.5 17.5L16.5 15.5L13.5 15L12 12ZM15 11L12 3" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            label: t('navbar.whoWeAre.alliances.label'),
            description: t('navbar.whoWeAre.alliances.description'),
            href: '/alliances',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19.4998 12.5721L11.9998 20.0001L4.49981 12.5721C4.00512 12.0907 3.61546 11.5121 3.35536 10.8727C3.09527 10.2333 2.97037 9.54701 2.98855 8.85699C3.00673 8.16697 3.16758 7.48819 3.46097 6.86339C3.75436 6.23859 4.17395 5.68131 4.6933 5.22663C5.21265 4.77196 5.82052 4.42974 6.47862 4.22154C7.13673 4.01333 7.83082 3.94364 8.51718 4.01686C9.20354 4.09007 9.86731 4.30461 10.4667 4.64696C11.0661 4.98931 11.5881 5.45205 11.9998 6.00605C12.4133 5.45608 12.9359 4.99738 13.5349 4.65866C14.1339 4.31994 14.7963 4.1085 15.4807 4.03757C16.1652 3.96665 16.8569 4.03775 17.5126 4.24645C18.1683 4.45514 18.7738 4.79693 19.2914 5.25042C19.8089 5.70391 20.2272 6.25934 20.5202 6.88195C20.8132 7.50456 20.9746 8.18094 20.9941 8.86876C21.0137 9.55659 20.8911 10.241 20.6339 10.8793C20.3768 11.5176 19.9907 12.0959 19.4998 12.5781M11.9998 6.00005L8.70681 9.29305C8.51934 9.48058 8.41403 9.73489 8.41403 10.0001C8.41403 10.2652 8.51934 10.5195 8.70681 10.7071L9.24981 11.2501C9.93981 11.9401 11.0598 11.9401 11.7498 11.2501L12.7498 10.2501C13.3466 9.65332 14.1559 9.31808 14.9998 9.31808C15.8437 9.31808 16.6531 9.65332 17.2498 10.2501L19.4998 12.5001M12.4998 15.5001L14.4998 17.5001M14.9998 13.0001L16.9998 15.0001" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            label: t('navbar.whoWeAre.leadership.label'),
            description: t('navbar.whoWeAre.leadership.description'),
            href: '/leadership',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 19V18C6 17.4696 6.21071 16.9609 6.58579 16.5858C6.96086 16.2107 7.46957 16 8 16H12C12.5304 16 13.0391 16.2107 13.4142 16.5858C13.7893 16.9609 14 17.4696 14 18V19M15 8H17C17.5304 8 18.0391 8.21071 18.4142 8.58579C18.7893 8.96086 19 9.46957 19 10V11M1 11V10C1 9.46957 1.21071 8.96086 1.58579 8.58579C1.96086 8.21071 2.46957 8 3 8H5M8 11C8 11.5304 8.21071 12.0391 8.58579 12.4142C8.96086 12.7893 9.46957 13 10 13C10.5304 13 11.0391 12.7893 11.4142 12.4142C11.7893 12.0391 12 11.5304 12 11C12 10.4696 11.7893 9.96086 11.4142 9.58579C11.0391 9.21071 10.5304 9 10 9C9.46957 9 8.96086 9.21071 8.58579 9.58579C8.21071 9.96086 8 10.4696 8 11ZM13 3C13 3.53043 13.2107 4.03914 13.5858 4.41421C13.9609 4.78929 14.4696 5 15 5C15.5304 5 16.0391 4.78929 16.4142 4.41421C16.7893 4.03914 17 3.53043 17 3C17 2.46957 16.7893 1.96086 16.4142 1.58579C16.0391 1.21071 15.5304 1 15 1C14.4696 1 13.9609 1.21071 13.5858 1.58579C13.2107 1.96086 13 2.46957 13 3ZM3 3C3 3.53043 3.21071 4.03914 3.58579 4.41421C3.96086 4.78929 4.46957 5 5 5C5.53043 5 6.03914 4.78929 6.41421 4.41421C6.78929 4.03914 7 3.53043 7 3C7 2.46957 6.78929 1.96086 6.41421 1.58579C6.03914 1.21071 5.53043 1 5 1C4.46957 1 3.96086 1.21071 3.58579 1.58579C3.21071 1.96086 3 2.46957 3 3Z" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            label: t('navbar.whoWeAre.sustainability.label'),
            description: t('navbar.whoWeAre.sustainability.description'),
            href: '/sustainability',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.6 9H20.4M3.6 15H20.4M11.5 3C9.81534 5.69961 8.9222 8.81787 8.9222 12C8.9222 15.1821 9.81534 18.3004 11.5 21M12.5 3C14.1847 5.69961 15.0778 8.81787 15.0778 12C15.0778 15.1821 14.1847 18.3004 12.5 21M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
    ];

    const whatWeDoItems = [
        {
            label: t('navbar.whatWeDo.servicesSolutions.label'),
            description: t('navbar.whatWeDo.servicesSolutions.description'),
            href: '/solutionsandservices',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M4.5 8.99878L4.16699 8.88062C3.6795 8.70826 3.25747 8.38877 2.95898 7.96655C2.66054 7.54436 2.4999 7.04022 2.5 6.52319L2.50488 6.36108C2.53402 5.91542 2.68198 5.4852 2.93359 5.11597C3.18804 4.74264 3.53925 4.44547 3.94922 4.25562C4.35943 4.06575 4.81417 3.99018 5.26367 4.03784C5.71298 4.08553 6.1408 4.2546 6.50195 4.52612C6.86322 4.7978 7.14488 5.1622 7.31543 5.58081C7.48593 5.99933 7.5392 6.45638 7.4707 6.90308C7.40216 7.34977 7.21388 7.76975 6.92578 8.11792C6.63757 8.46614 6.26009 8.72976 5.83398 8.88062L5.50098 8.99878V9.35229L5.5 11.5232V12.0232H11.5V8.99976L11.167 8.88159C10.6794 8.70919 10.2565 8.38991 9.95801 7.96753C9.6969 7.59797 9.54234 7.16534 9.50781 6.71655L9.5 6.52319L9.50488 6.36108C9.53402 5.91542 9.68198 5.4852 9.93359 5.11597C10.188 4.74264 10.5393 4.44547 10.9492 4.25562C11.3594 4.06575 11.8142 3.99018 12.2637 4.03784C12.713 4.08553 13.1408 4.2546 13.502 4.52612C13.8632 4.7978 14.1449 5.1622 14.3154 5.58081C14.4859 5.99933 14.5392 6.45638 14.4707 6.90308C14.4022 7.34977 14.2139 7.76975 13.9258 8.11792C13.6376 8.46614 13.2601 8.72976 12.834 8.88062L12.501 8.99878V9.35229L12.5 11.5232V12.0232H17C17.3978 12.0232 17.7792 11.865 18.0605 11.5837C18.3419 11.3024 18.5 10.921 18.5 10.5232V8.99976L18.167 8.88159C17.6794 8.70919 17.2565 8.38991 16.958 7.96753C16.6969 7.59797 16.5423 7.16534 16.5078 6.71655L16.5 6.52319L16.5039 6.3689C16.5431 5.73516 16.823 5.13958 17.2852 4.70386C17.6912 4.32121 18.2117 4.0874 18.7627 4.03491L19 4.02319C19.5899 4.02287 20.1612 4.23107 20.6123 4.61108C21.0635 4.99122 21.366 5.5189 21.4658 6.10034C21.5656 6.68182 21.4559 7.28002 21.1572 7.78882C20.8586 8.29741 20.3901 8.68426 19.834 8.88062L19.5 8.99878V10.5232C19.5 11.1862 19.2364 11.8219 18.7676 12.2908C18.2987 12.7596 17.663 13.0232 17 13.0232H12.5V16.0476L12.834 16.1658C13.2663 16.3185 13.6485 16.587 13.9385 16.9421C14.2284 17.2973 14.4154 17.7254 14.4785 18.1794C14.5416 18.6336 14.478 19.0965 14.2959 19.5173C14.1137 19.9382 13.8197 20.3014 13.4453 20.5662C13.0709 20.831 12.6304 20.9877 12.1729 21.0193C11.7156 21.0508 11.2586 20.9556 10.8516 20.7449C10.4444 20.5341 10.1025 20.2156 9.86426 19.824C9.65581 19.4812 9.53318 19.0936 9.50586 18.6951L9.5 18.5232L9.50391 18.3679C9.53398 17.8795 9.70787 17.4105 10.002 17.0193C10.2977 16.626 10.7031 16.3288 11.167 16.1648L11.5 16.0466V13.0232H5.5V16.0476L5.83398 16.1658C6.26625 16.3185 6.64851 16.587 6.93848 16.9421C7.22843 17.2973 7.41536 17.7254 7.47852 18.1794C7.54164 18.6336 7.47803 19.0965 7.2959 19.5173C7.11371 19.9382 6.81972 20.3014 6.44531 20.5662C6.0709 20.831 5.63036 20.9877 5.17285 21.0193C4.71559 21.0508 4.25862 20.9556 3.85156 20.7449C3.44444 20.5341 3.10253 20.2156 2.86426 19.824C2.62597 19.4321 2.49987 18.9818 2.5 18.5232L2.50391 18.3679C2.53398 17.8795 2.70787 17.4105 3.00195 17.0193C3.29768 16.626 3.70306 16.3288 4.16699 16.1648L4.5 16.0466V8.99878Z" stroke="#D9DDDD" />
                </svg>
            ),
            hasSubmenu: true
        },
        {
            label: t('navbar.whatWeDo.barqAcademy.label'),
            description: t('navbar.whatWeDo.barqAcademy.description'),
            href: '/academy',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M5 18.5232C5 19.0536 5.21071 19.5623 5.58579 19.9374C5.96086 20.3125 6.46957 20.5232 7 20.5232H19V4.52319H7C6.46957 4.52319 5.96086 4.73391 5.58579 5.10898C5.21071 5.48405 5 5.99276 5 6.52319V18.5232ZM5 18.5232C5 17.9928 5.21071 17.4841 5.58579 17.109C5.96086 16.7339 6.46957 16.5232 7 16.5232H19M9 8.52319H15" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
    ];

    const servicesSubmenuItems = [
        { label: t('navbar.whatWeDo.submenu.automation'), href: '/solutionsandservices/automation' },
        { label: t('navbar.whatWeDo.submenu.cybersecurity'), href: '/solutionsandservices/cybersecurity' },
        { label: t('navbar.whatWeDo.submenu.infrastructure'), href: '/solutionsandservices/infrastructure' },
        { label: t('navbar.whatWeDo.submenu.managedServices'), href: '/solutionsandservices/managed-services' },
    ];

    const newsroomItems = [
        {
            label: t('navbar.insightsResources.caseStudies.label'),
            description: t('navbar.insightsResources.caseStudies.description'),
            href: "/case-studies",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M14 3.47681V7.47681C14 7.74202 14.1054 7.99638 14.2929 8.18391C14.4804 8.37145 14.7348 8.47681 15 8.47681H19M14 3.47681H7C6.46957 3.47681 5.96086 3.68752 5.58579 4.06259C5.21071 4.43767 5 4.94637 5 5.47681V19.4768C5 20.0072 5.21071 20.5159 5.58579 20.891C5.96086 21.2661 6.46957 21.4768 7 21.4768H17C17.5304 21.4768 18.0391 21.2661 18.4142 20.891C18.7893 20.5159 19 20.0072 19 19.4768V8.47681M14 3.47681L19 8.47681M9 15.4768L11 17.4768L15 13.4768" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        // {
        //     label: t('navbar.insightsResources.events.label'),
        //     description: t('navbar.insightsResources.events.description'),
        //     href: '/events',
        //     icon: (
        //         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        //             <path d="M16 3.47681V7.47681M8 3.47681V7.47681M4 11.4768H20M7 14.4768H7.013M10.01 14.4768H10.015M13.01 14.4768H13.015M16.015 14.4768H16.02M13.015 17.4768H13.02M7.01 17.4768H7.015M10.01 17.4768H10.015M4 7.47681C4 6.94637 4.21071 6.43767 4.58579 6.06259C4.96086 5.68752 5.46957 5.47681 6 5.47681H18C18.5304 5.47681 19.0391 5.68752 19.4142 6.06259C19.7893 6.43767 20 6.94637 20 7.47681V19.4768C20 20.0072 19.7893 20.5159 19.4142 20.891C19.0391 21.2661 18.5304 21.4768 18 21.4768H6C5.46957 21.4768 4.96086 21.2661 4.58579 20.891C4.21071 20.5159 4 20.0072 4 19.4768V7.47681Z" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
        //         </svg>
        //     )
        // },
        {
            label: t('navbar.insightsResources.newsroom.label'),
            description: t('navbar.insightsResources.newsroom.description'),
            href: '/newsroom',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M16 6.47681H19C19.2652 6.47681 19.5196 6.58216 19.7071 6.7697C19.8946 6.95724 20 7.21159 20 7.47681V18.4768C20 19.0072 19.7893 19.5159 19.4142 19.891C19.0391 20.2661 18.5304 20.4768 18 20.4768M18 20.4768C17.4696 20.4768 16.9609 20.2661 16.5858 19.891C16.2107 19.5159 16 19.0072 16 18.4768V5.47681C16 5.21159 15.8946 4.95724 15.7071 4.7697C15.5196 4.58216 15.2652 4.47681 15 4.47681H5C4.73478 4.47681 4.48043 4.58216 4.29289 4.7697C4.10536 4.95724 4 5.21159 4 5.47681V17.4768C4 18.2725 4.31607 19.0355 4.87868 19.5981C5.44129 20.1607 6.20435 20.4768 7 20.4768H18ZM8 8.47681H12M8 12.4768H12M8 16.4768H12" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            label: t('navbar.insightsResources.resources.label'),
            description: t('navbar.insightsResources.resources.description'),
            href: '/resources',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M12 19.4768H5C4.46957 19.4768 3.96086 19.2661 3.58579 18.891C3.21071 18.5159 3 18.0072 3 17.4768V6.47681C3 5.94637 3.21071 5.43767 3.58579 5.06259C3.96086 4.68752 4.46957 4.47681 5 4.47681H9L12 7.47681H19C19.5304 7.47681 20.0391 7.68752 20.4142 8.06259C20.7893 8.43767 21 8.94637 21 9.47681V12.9768M19 16.4768V22.4768M19 22.4768L22 19.4768M19 22.4768L16 19.4768" stroke="#D9DDDD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
    ];

    const languageOptions = [
        { label: 'English', code: 'en', flag: '🇺🇸' },
        { label: 'العربية', code: 'ar', flag: '🇸🇦' },
    ];
    const { i18n } = useTranslation()

    return (
        <motion.header
            className={`relative z-[99999999] h-[104.5px] w-full max-w-7xl mx-auto flex items-center justify-between py-[30px] lg:py-[30px] md:py-[20px] sm:py-[15px] ${isHomePage ? 'mb-[100px] lg:mb-[100px] md:mb-[80px] sm:mb-[60px]' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: isHomePage ? 0.8 : 0.1,
                ease: 'easeOut',
            }}
        >
            {/* Logo */}
            <motion.button
                onClick={() => window.location.href = '/'}
                className='flex items-center cursor-pointer'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9, ease: 'easeOut' }}
            >
                <Image src={'/assets/logo-blue.svg'} alt='logo' width={140} height={44.5} className='object-contain h-[44.5px] w-[100px] lg:w-[140px]' />
            </motion.button>

            {/* Navigation Menu - Desktop (above 1080px) */}
            <motion.nav
                className='hidden min-[1080px]:flex items-center space-x-3 text-white nav-text'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0, ease: 'easeOut' }}
            >
                {/* Who We Are Dropdown */}
                <div className={`
                    ${isWhoWeAreOpen ? 'bg-[#FFFFFF14] border-[#FFFFFF1A]' : ''}
                    ${i18n.language === "ar" ? "min-w-fit" : "min-w-[145px]"}
                    relative hover:bg-[#FFFFFF14] group/who-we-are py-2 rounded-[4px] min-w-[145px] border-[1px] border-transparent hover:border-[#FFFFFF1A]`} ref={whoWeAreRef}>
                    <div
                        className='flex items-center space-x-[2px] cursor-pointer transition-colors px-5 text-[14px] leading-[19.6px] tracking-[-0.112px]  '
                        onClick={() => {
                            setIsWhoWeAreOpen(!isWhoWeAreOpen);
                            setIsWhatWeDoOpen(false);
                            setIsInsightsOpen(false);
                            setIsServicesSubmenuOpen(false);
                        }}
                    >
                        <span>{t('navbar.whoWeAre.title')}</span>
                        <div className='flex items-center justify-center w-[20px] h-[20px]'>
                            {
                                isWhoWeAreOpen ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                                    </svg> :
                                    <svg className='group-hover/who-we-are:hidden' xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M9.07747 0.528931L5.49997 4.10643L1.92247 0.528931L0.744141 1.70726L5.49997 6.4631L10.2558 1.70726L9.07747 0.528931Z" fill="white" />
                                    </svg>
                            }
                            {
                                !isWhoWeAreOpen && (
                                    <svg className='hidden group-hover/who-we-are:block' xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                                    </svg>
                                )
                            }
                        </div>
                    </div>

                    <AnimatePresence>
                        {isWhoWeAreOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className={`absolute top-full 
                                    ${i18n.language === "ar" ? "right-[-100%]" : "left-[-82%]"}
                                     mt-[12.22px] w-[832px] max-h-[358px] bg-[#000000A3] border  border-[#FFFFFF1A] rounded-[8px] backdrop-[blur(10px)]  overflow-hidden z-[9999]`}
                                style={{
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    background: 'rgba(0, 0, 0, 0.64)',
                                    backdropFilter: 'blur(10px)',
                                }}
                                onMouseDown={e => e.stopPropagation()}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className='p-8 w-[832px] h-[358px]'>
                                    <div className='flex  gap-3'>
                                        {/* Left Column */}
                                        <div className='space-y-3 '>
                                            {whoWeAreItems.slice(0, 3).map((item, index) => {
                                                const handleItemClick = (e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsWhoWeAreOpen(false);
                                                    // Handle navigation
                                                    if (item.href.startsWith('/')) {
                                                        window.location.href = item.href;
                                                    } else {
                                                        window.location.href = item.href;
                                                    }
                                                };
                                                return (
                                                    <motion.div
                                                        key={item.label}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                                        className='relative w-[370px] h-[90px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
                                                    >
                                                        <div
                                                            className='flex items-start space-x-[6px] p-3 rounded-  transition-all duration-200 cursor-pointer w-[370px] h-[90px] '
                                                            onClick={handleItemClick}
                                                            onMouseDown={e => e.stopPropagation()}
                                                        >
                                                            <div className='w-[24px] h-[24px] mt-[2px]   transition-colors'>
                                                                {item.icon}
                                                            </div>
                                                            <div className='flex-1'>
                                                                <h3 className='text-white text-[16px] leading-[22.4px]  tracking-[-0.128px] font-normal mb-1 flex items-center justify-between'>
                                                                    <span>{item.label}</span>
                                                                    <svg className={`${i18n.language === "ar" ? "rotate-270" : "rotate-0"} opacity-0 group-hover/card:opacity-100 transition-opacity duration-200`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                        <path d="M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z" fill="#25B8E4" />
                                                                    </svg>
                                                                </h3>
                                                                <p className='text-[#C5CBCC] text-[14px] leading-[140%]  font-normal transition-colors'>
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Right Column */}
                                        <div className='space-y-3'>
                                            {whoWeAreItems.slice(3).map((item, index) => {
                                                const handleItemClick = (e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsWhoWeAreOpen(false);
                                                    // Handle navigation
                                                    if (item.href.startsWith('/')) {
                                                        window.location.href = item.href;
                                                    } else {
                                                        window.location.href = item.href;
                                                    }
                                                };
                                                return (
                                                    <motion.div
                                                        key={item.label}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2, delay: (index + 3) * 0.05 }}
                                                        className='relative w-[370px] max-h-[90px] h-[90px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
                                                    >
                                                        <div
                                                            className='flex items-start space-x-[6px] p-3 rounded-  transition-all duration-200 cursor-pointer w-[370px] h-[90px] '
                                                            onClick={handleItemClick}
                                                            onMouseDown={e => e.stopPropagation()}
                                                        >
                                                            <div className='w-[24px] h-[24px] mt-[2px]   transition-colors'>
                                                                {item.icon}
                                                            </div>
                                                            <div className='flex-1'>
                                                                <h3 className='text-white text-[16px] leading-[22.4px]  tracking-[-0.128px] font-normal mb-1 flex items-center justify-between'>
                                                                    <span>{item.label}</span>
                                                                    <svg className={`${i18n.language === "ar" ? "rotate-270" : "rotate-0"} opacity-0 group-hover/card:opacity-100 transition-opacity duration-200`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                        <path d="M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z" fill="#25B8E4" />
                                                                    </svg>
                                                                </h3>
                                                                <p className='text-[#C5CBCC] text-[14px] leading-[140%]  font-normal transition-colors'>
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* What We Do Dropdown */}
                <div className={`
                      ${isWhatWeDoOpen ? 'bg-[#FFFFFF14] border-[#FFFFFF1A]' : ''}
                      ${i18n.language === "ar" ? "min-w-fit" : "min-w-[145px]"}
                    relative hover:bg-[#FFFFFF14] py-2 group/what-we-do rounded-[4px]  border-[1px]  border-transparent hover:border-[1px] hover:border-[#FFFFFF1A]`}
                    ref={whatWeDoRef}>
                    <div
                        className='flex items-center space-x-[2px] cursor-pointer transition-colors px-5 text-[14px] leading-[19.6px] tracking-[-0.112px]  '
                        onClick={() => {
                            setIsWhatWeDoOpen(!isWhatWeDoOpen);
                            setIsWhoWeAreOpen(false);
                            setIsInsightsOpen(false);
                            setIsServicesSubmenuOpen(false);
                        }}
                    >
                        <span>{t('navbar.whatWeDo.title')}</span>
                        <div className='flex items-center justify-center w-[20px] h-[20px]'>
                            {
                                isWhatWeDoOpen ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                                    </svg> :
                                    <svg className='group-hover/what-we-do:hidden' xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M9.07747 0.528931L5.49997 4.10643L1.92247 0.528931L0.744141 1.70726L5.49997 6.4631L10.2558 1.70726L9.07747 0.528931Z" fill="white" />
                                    </svg>
                            }
                            {
                                !isWhatWeDoOpen && (
                                    <svg className='hidden group-hover/what-we-do:block' xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                                    </svg>
                                )
                            }
                        </div>
                    </div>

                    <AnimatePresence>
                        {isWhatWeDoOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                style={{
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    background: 'rgba(0, 0, 0, 0.64)',
                                    backdropFilter: 'blur(10px)',
                                }}
                                className={`absolute top-full ${i18n.language === "ar" ? "right-[-100%]" : "left-[-70%]"} mt-[13.22px]  ${isServicesSubmenuOpen ? 'min-w-[816px]  max-h-[356px]' : 'min-w-[434px] max-h-[256px]'}  border  border-[#FFFFFF1A] rounded-[8px] backdrop-[blur(10px)]  overflow-hidden z-[9999]`}
                                onMouseDown={e => e.stopPropagation()}
                                onClick={e => e.stopPropagation()}
                                onMouseLeave={() => setIsServicesSubmenuOpen(false)}
                            >
                                <div className='p-8'>
                                    <div className={`${isServicesSubmenuOpen ? 'grid grid-cols-2 gap-6' : 'space-y-3'}`}>
                                        {/* Left Column - Main Items */}
                                        <div className='space-y-3'>
                                            {whatWeDoItems.map((item, index) => {
                                                const handleItemClick = (e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsWhatWeDoOpen(false);
                                                    setIsServicesSubmenuOpen(false);
                                                    // Always navigate when clicking the card
                                                    if (item.href.startsWith('/')) {
                                                        window.location.href = item.href;
                                                    } else {
                                                        window.location.href = item.href;
                                                    }
                                                };

                                                const handleMouseEnter = () => {
                                                    if (item.hasSubmenu) {
                                                        setIsServicesSubmenuOpen(true);
                                                    } else {
                                                        // Close submenu when hovering over other cards
                                                        setIsServicesSubmenuOpen(false);
                                                    }
                                                };

                                                return (
                                                    <motion.div
                                                        key={item.label}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                                        className='relative w-[370px] min-h-[90px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
                                                        onMouseEnter={handleMouseEnter}
                                                    >
                                                        <div
                                                            className='flex items-start space-x-[6px] p-3 rounded-  transition-all duration-200 cursor-pointer'
                                                            onClick={handleItemClick}
                                                            onMouseDown={e => e.stopPropagation()}
                                                        >
                                                            <div className='w-[24px] h-[24px] mt-[2px]   transition-colors'>
                                                                {item.icon}
                                                            </div>
                                                            <div className='flex-1'>
                                                                <div className='flex items-center justify-between'>
                                                                    <h3 className='text-white text-[16px] leading-[22.4px]  tracking-[-0.128px] font-normal mb-1'>
                                                                        {item.label}

                                                                    </h3>
                                                                    {
                                                                        !item.hasSubmenu && (
                                                                            <svg
                                                                                style={{
                                                                                    transform: i18n.language === "ar" ? "rotate(270deg)" : "none",
                                                                                }}
                                                                                className='opacity-0 group-hover/card:opacity-100 transition-opacity duration-200' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                                <path d="M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z" fill="#25B8E4" />
                                                                            </svg>

                                                                        )
                                                                    }

                                                                    {item.hasSubmenu && (
                                                                        <div className='w-[24px] h-[24px] transition-transform duration-200'>
                                                                            {
                                                                                isServicesSubmenuOpen ?
                                                                                    <svg className={`${i18n.language === "ar" ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                        <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                                                                    </svg>
                                                                                    :
                                                                                    <svg className={`${i18n.language === "ar" ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                        <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                                                                    </svg>
                                                                            }

                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <p className='text-[#C5CBCC] text-[14px] leading-[140%]  font-normal transition-colors'>
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Right Column - Submenu Items */}
                                        {isServicesSubmenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                                className='space-y-3'
                                            >
                                                {servicesSubmenuItems.map((subItem) => {
                                                    const handleSubItemClick = (e: React.MouseEvent) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setIsWhatWeDoOpen(false);
                                                        setIsServicesSubmenuOpen(false);
                                                        // Handle navigation
                                                        if (subItem.href.startsWith('/')) {
                                                            window.location.href = subItem.href;
                                                        } else {
                                                            window.location.href = subItem.href;
                                                        }
                                                    };

                                                    return (
                                                        <motion.div
                                                            key={subItem.label}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className='relative w-[370px] min-h-[60px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14]'
                                                        >
                                                            <div
                                                                className='flex items-center p-4 transition-all duration-200 cursor-pointer group'
                                                                onClick={handleSubItemClick}
                                                                onMouseDown={e => e.stopPropagation()}
                                                            >
                                                                <h4 className='text-white text-[16px] leading-[22.4px] tracking-[-0.128px] font-normal  transition-colors'>
                                                                    {subItem.label}
                                                                </h4>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* insights & resources */}
                <div className={`
                    ${isInsightsOpen ? 'bg-[#FFFFFF14] border-[#FFFFFF1A]' : ''}
                    ${i18n.language === "ar" ? "min-w-fit" : "min-w-[187px]"}
                    relative hover:bg-[#FFFFFF14] py-2 group/insights rounded-[4px] border-[1px] border-transparent hover:border-[#FFFFFF1A]`} ref={insightsRef}>
                    <div
                        className='flex items-center space-x-[2px] cursor-pointer transition-colors px-5 text-[14px] leading-[19.6px] tracking-[-0.112px]  '
                        onClick={() => {
                            setIsInsightsOpen(!isInsightsOpen);
                            setIsWhoWeAreOpen(false);
                            setIsWhatWeDoOpen(false);
                            setIsServicesSubmenuOpen(false);
                        }}
                    >
                        <span>{t('navbar.insightsResources.title')}</span>
                        <div className='flex items-center justify-center w-[20px] h-[20px]'>
                            {
                                isInsightsOpen ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                                    </svg> :
                                    <svg className='group-hover/insights:hidden' xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M9.07747 0.528931L5.49997 4.10643L1.92247 0.528931L0.744141 1.70726L5.49997 6.4631L10.2558 1.70726L9.07747 0.528931Z" fill="white" />
                                    </svg>
                            }
                            {
                                !isInsightsOpen && (
                                    <svg className='hidden group-hover/insights:block' xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                                    </svg>
                                )
                            }
                        </div>
                    </div>

                    <AnimatePresence>
                        {isInsightsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className={`absolute top-full
                                    
                                    ${i18n.language === "ar" ? "right-[-160%]" : "left-[-160%]"} mt-[13.22px] h-[216px] w-[832px] border  border-[#FFFFFF1A] rounded-[8px] backdrop-[blur(10px)]  overflow-hidden z-[9999]`}
                                style={{
                                    width: '832px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    background: 'rgba(0, 0, 0, 0.64)',
                                    backdropFilter: 'blur(10px)',
                                }}
                                onMouseDown={e => e.stopPropagation()}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className='p-8 w-[832px] h-[216px]'>
                                    <div className='grid grid-cols-2 '>
                                        {/* Left Column */}
                                        <div className='space-y-4'>
                                            {newsroomItems.slice(0, 2).map((item, index) => {
                                                const handleItemClick = (e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsInsightsOpen(false);

                                                    // Handle navigation
                                                    if (item.href.startsWith('/')) {
                                                        window.location.href = item.href;
                                                    } else {
                                                        window.location.href = item.href;
                                                    }
                                                };

                                                return (
                                                    <motion.div
                                                        key={item.label}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                                        className='relative w-[370px] h-[70px]  border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
                                                    >
                                                        <div
                                                            className='flex items-start space-x-[6px] p-3   transition-all duration-200 cursor-pointer group'
                                                            onClick={handleItemClick}
                                                            onMouseDown={e => e.stopPropagation()}
                                                        >
                                                            <div className='w-[24px] h-[24px] mt-[2px]   transition-colors'>
                                                                {item.icon}
                                                            </div>
                                                            <div className=''>
                                                                <h3 className='text-white text-[16px] leading-[22.4px]  tracking-[-0.128px] font-normal mb-[3px] h-[20px]'>
                                                                    {item.label}
                                                                </h3>
                                                                <p className='text-[#C5CBCC] text-[14px] leading-[19.6px]  font-normal transition-colors h-[20px]' >
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <svg className={`${i18n.language === "ar" ? "rotate-270 left-3" : "rotate-0 right-3"} opacity-0 absolute top-3  group-hover/card:opacity-100 transition-opacity duration-200`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z" fill="#25B8E4" />
                                                        </svg>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Right Column */}
                                        <div className='space-y-4'>
                                            {newsroomItems.slice(2).map((item, index) => {
                                                const handleItemClick = (e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsInsightsOpen(false);

                                                    // Handle navigation
                                                    if (item.href.startsWith('/')) {
                                                        window.location.href = item.href;
                                                    } else {
                                                        window.location.href = item.href;
                                                    }
                                                };
                                                return (
                                                    <motion.div
                                                        key={item.label}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2, delay: (index + 2) * 0.05 }}
                                                        className='relative w-[370px] h-[70px] border-[#FFFFFF1A] border-[1px] rounded-[4px] bg-[#0000003D] hover:bg-[#FFFFFF14] group/card'
                                                    >
                                                        <div
                                                            className='flex items-start space-x-[6px] p-3 rounded-  transition-all duration-200 cursor-pointer group'
                                                            onClick={handleItemClick}
                                                            onMouseDown={e => e.stopPropagation()}
                                                        >
                                                            <div className='w-[24px] h-[24px] mt-[2px]   transition-colors'>
                                                                {item.icon}
                                                            </div>
                                                            <div className='flex-1'>
                                                                <h3 className='text-white text-[16px] leading-[22.4px]  tracking-[-0.128px] font-normal mb-[3px]'>
                                                                    {item.label}
                                                                </h3>
                                                                <p className='text-[#C5CBCC] text-[14px] leading-[140%]  font-normal transition-colors'>
                                                                    {item.description}
                                                                </p>
                                                            </div>

                                                        </div>
                                                        <svg className={`${i18n.language === "ar" ? "rotate-270 left-3" : "rotate-0 right-3"} opacity-0 absolute top-3  group-hover/card:opacity-100 transition-opacity duration-200`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M11.625 1V9.125C11.625 9.29076 11.5591 9.44973 11.4419 9.56694C11.3247 9.68415 11.1657 9.75 11 9.75C10.8342 9.75 10.6753 9.68415 10.558 9.56694C10.4408 9.44973 10.375 9.29076 10.375 9.125V2.50859L1.44217 11.4422C1.32489 11.5595 1.16583 11.6253 0.999981 11.6253C0.834129 11.6253 0.675069 11.5595 0.557794 11.4422C0.440518 11.3249 0.374634 11.1659 0.374634 11C0.374634 10.8341 0.440518 10.6751 0.557794 10.5578L9.49139 1.625H2.87498C2.70922 1.625 2.55025 1.55915 2.43304 1.44194C2.31583 1.32473 2.24998 1.16576 2.24998 1C2.24998 0.83424 2.31583 0.675269 2.43304 0.558058C2.55025 0.440848 2.70922 0.375 2.87498 0.375H11C11.1657 0.375 11.3247 0.440848 11.4419 0.558058C11.5591 0.675269 11.625 0.83424 11.625 1Z" fill="#25B8E4" />
                                                        </svg>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <Link href='/careers' className='text-[14px] leading-[19.6px] tracking-[-0.112px] text-white  relative hover:bg-[#FFFFFF14] py-2 px-5 rounded-[4px]  border-[1px] border-transparent hover:border-[#FFFFFF1A]'>
                    {t('navbar.careers')}
                </Link>
                <a href='/contact-us' className='text-[14px] leading-[19.6px] tracking-[-0.112px] text-white  relative hover:bg-[#FFFFFF14] py-2 px-5 rounded-[4px]  border-[1px] border-transparent hover:border-[#FFFFFF1A]'>
                    {t('navbar.contactUs')}
                </a>
            </motion.nav>

            {/* Language and Search - Desktop (above 1080px) */}
            <motion.div
                className='hidden min-[1080px]:flex items-center space-x-10'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}
            >
                {/* Language Selector */}
                <div className='relative' ref={languageRef}>
                    <div
                        className='flex items-center space-x-2 text-white cursor-pointer transition-colors'
                        onClick={() => {
                            setIsLanguageOpen(!isLanguageOpen);
                            setIsWhoWeAreOpen(false);
                            setIsWhatWeDoOpen(false);
                            setIsInsightsOpen(false);
                            setIsServicesSubmenuOpen(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M3.6 9.26147H20.4M3.6 15.2615H20.4M11.5 3.26147C9.81534 5.96109 8.9222 9.07934 8.9222 12.2615C8.9222 15.4436 9.81534 18.5619 11.5 21.2615M12.5 3.26147C14.1847 5.96109 15.0778 9.07934 15.0778 12.2615C15.0778 15.4436 14.1847 18.5619 12.5 21.2615M3 12.2615C3 13.4434 3.23279 14.6137 3.68508 15.7056C4.13738 16.7976 4.80031 17.7897 5.63604 18.6254C6.47177 19.4612 7.46392 20.1241 8.55585 20.5764C9.64778 21.0287 10.8181 21.2615 12 21.2615C13.1819 21.2615 14.3522 21.0287 15.4442 20.5764C16.5361 20.1241 17.5282 19.4612 18.364 18.6254C19.1997 17.7897 19.8626 16.7976 20.3149 15.7056C20.7672 14.6137 21 13.4434 21 12.2615C21 9.87453 20.0518 7.58534 18.364 5.89751C16.6761 4.20969 14.3869 3.26147 12 3.26147C9.61305 3.26147 7.32387 4.20969 5.63604 5.89751C3.94821 7.58534 3 9.87453 3 12.2615Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='text-[18px]'>{language === 'en' ? 'EN' : 'AR'}</span>
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <path d="M6 9.26147L12 15.2615L18 9.26147" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                    </div>

                    <AnimatePresence>
                        {isLanguageOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className={`absolute  
                                    
                                    ${i18n.language === "ar" ? "right-0" : "left-0"}
                                    min-w-[163px]  top-full left-0 mt-2  rounded-[4px] backdrop-[blur(10px)]  z-[9999]`}
                                onMouseDown={e => e.stopPropagation()}
                                onClick={e => e.stopPropagation()}
                                style={{
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    background: "rgba(255, 255, 255, 0.08)",
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div className='py-3 px-4 space-y-[6px] min-w-[163px] '>
                                    {languageOptions.map((option, index) => {
                                        const handleLanguageClick = (e: React.MouseEvent) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsLanguageOpen(false);
                                            const langCode = option.code.toLowerCase() as 'en' | 'ar';

                                            // Save language to localStorage and cookie without changing DOM
                                            // This prevents layout glitch before reload
                                            localStorage.setItem('language', langCode);
                                            document.cookie = `language=${langCode}; path=/; max-age=31536000; SameSite=Lax`;

                                            // Reload immediately - LanguageContext will handle direction change on next load
                                            window.location.reload();
                                        };

                                        return (
                                            <motion.div
                                                key={option.code}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                                className='relative '
                                            >
                                                <div
                                                    className={`flex  hover:bg-[#FFFFFF14] px-5 py-2   items-center space-x-3   text-white   
                                                        rounded-[4px] border-[1px] border-transparent   transition-all duration-200 cursor-pointer
                                                    ${language === option.code ? 'bg-[#FFFFFF14]' : ''}`}
                                                    onClick={handleLanguageClick}
                                                    onMouseDown={e => e.stopPropagation()}
                                                >
                                                    <span className='text-[16px]  leading-[22.4px]  tracking-[-0.128px] font-normal text-white'>{option.label}</span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <button className='text-white hover:text-blue-300 transition-colors'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M19 19.2617L13 13.2617M1 8.26172C1 9.18097 1.18106 10.0912 1.53284 10.9405C1.88463 11.7898 2.40024 12.5615 3.05025 13.2115C3.70026 13.8615 4.47194 14.3771 5.32122 14.7289C6.1705 15.0807 7.08075 15.2617 8 15.2617C8.91925 15.2617 9.82951 15.0807 10.6788 14.7289C11.5281 14.3771 12.2997 13.8615 12.9497 13.2115C13.5998 12.5615 14.1154 11.7898 14.4672 10.9405C14.8189 10.0912 15 9.18097 15 8.26172C15 7.34247 14.8189 6.43221 14.4672 5.58293C14.1154 4.73366 13.5998 3.96198 12.9497 3.31197C12.2997 2.66196 11.5281 2.14634 10.6788 1.79456C9.82951 1.44278 8.91925 1.26172 8 1.26172C7.08075 1.26172 6.1705 1.44278 5.32122 1.79456C4.47194 2.14634 3.70026 2.66196 3.05025 3.31197C2.40024 3.96198 1.88463 4.73366 1.53284 5.58293C1.18106 6.43221 1 7.34247 1 8.26172Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </motion.div>

            {/* Mobile Hamburger Button (below 1080px) */}
            <motion.button
                className='min-[1080px]:hidden relative text-white z-[999999999] p-2'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                {isMobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </motion.button>

            {/* Mobile Menu (below 1080px) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className='min-[1080px]:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-lg z-[99999999] overflow-y-auto'
                    >
                        <div className='flex flex-col p-6 pt-[120px] space-y-6'>
                            {/* Mobile Who We Are */}
                            <div className='border-b border-[#FFFFFF1A] pb-4'>
                                <button
                                    className='flex items-center justify-between w-full text-white text-[16px] font-medium'
                                    onClick={() => setMobileWhoWeAreOpen(!mobileWhoWeAreOpen)}
                                >
                                    <span>{t('navbar.whoWeAre.title')}</span>
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        animate={{ rotate: mobileWhoWeAreOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                </button>
                                <AnimatePresence>
                                    {mobileWhoWeAreOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className='overflow-hidden'
                                        >
                                            <div className='flex flex-col space-y-3 mt-4'>
                                                {whoWeAreItems.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className='flex items-start space-x-3 p-3 rounded-lg bg-[#FFFFFF0A] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <div className='w-[24px] h-[24px] flex-shrink-0 mt-1'>
                                                            {item.icon}
                                                        </div>
                                                        <div className='flex-1'>
                                                            <h3 className='text-white text-[14px] font-medium mb-1'>{item.label}</h3>
                                                            <p className='text-[#C5CBCC] text-[12px] leading-[140%]'>{item.description}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile What We Do */}
                            <div className='border-b border-[#FFFFFF1A] pb-4'>
                                <button
                                    className='flex items-center justify-between w-full text-white text-[16px] font-medium'
                                    onClick={() => setMobileWhatWeDoOpen(!mobileWhatWeDoOpen)}
                                >
                                    <span>{t('navbar.whatWeDo.title')}</span>
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        animate={{ rotate: mobileWhatWeDoOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                </button>
                                <AnimatePresence>
                                    {mobileWhatWeDoOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className='overflow-hidden'
                                        >
                                            <div className='flex flex-col space-y-3 mt-4'>
                                                {whatWeDoItems.map((item) => (
                                                    <div key={item.label}>
                                                        <Link
                                                            href={item.href}
                                                            className='flex items-start space-x-3 p-3 rounded-lg bg-[#FFFFFF0A] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                            onClick={(e) => {
                                                                if (item.hasSubmenu) {
                                                                    e.preventDefault();
                                                                    setMobileServicesOpen(!mobileServicesOpen);
                                                                } else {
                                                                    setIsMobileMenuOpen(false);
                                                                }
                                                            }}
                                                        >
                                                            <div className='w-[24px] h-[24px] flex-shrink-0 mt-1'>
                                                                {item.icon}
                                                            </div>
                                                            <div className='flex-1'>
                                                                <div className='flex items-center justify-between'>
                                                                    <h3 className='text-white text-[14px] font-medium mb-1'>{item.label}</h3>
                                                                    {item.hasSubmenu && (
                                                                        <motion.svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                                                                            transition={{ duration: 0.2 }}
                                                                        >
                                                                            <path d="M4 6L8 10L12 6" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </motion.svg>
                                                                    )}
                                                                </div>
                                                                <p className='text-[#C5CBCC] text-[12px] leading-[140%]'>{item.description}</p>
                                                            </div>
                                                        </Link>
                                                        {item.hasSubmenu && mobileServicesOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className='ml-4 mt-2 space-y-2'
                                                            >
                                                                {servicesSubmenuItems.map((subItem) => (
                                                                    <Link
                                                                        key={subItem.label}
                                                                        href={subItem.href}
                                                                        className='block p-3 rounded-lg bg-[#FFFFFF05] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                    >
                                                                        <h4 className='text-white text-[13px]'>{subItem.label}</h4>
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Insights & Resources */}
                            <div className='border-b border-[#FFFFFF1A] pb-4'>
                                <button
                                    className='flex items-center justify-between w-full text-white text-[16px] font-medium'
                                    onClick={() => setMobileInsightsOpen(!mobileInsightsOpen)}
                                >
                                    <span>{t('navbar.insightsResources.title')}</span>
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        animate={{ rotate: mobileInsightsOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                </button>
                                <AnimatePresence>
                                    {mobileInsightsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className='overflow-hidden'
                                        >
                                            <div className='flex flex-col space-y-3 mt-4'>
                                                {newsroomItems.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className='flex items-start space-x-3 p-3 rounded-lg bg-[#FFFFFF0A] hover:bg-[#FFFFFF14] border border-[#FFFFFF1A] transition-colors'
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <div className='w-[24px] h-[24px] flex-shrink-0 mt-1'>
                                                            {item.icon}
                                                        </div>
                                                        <div className='flex-1'>
                                                            <h3 className='text-white text-[14px] font-medium mb-1'>{item.label}</h3>
                                                            <p className='text-[#C5CBCC] text-[12px] leading-[140%]'>{item.description}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Careers */}
                            <Link
                                href='/careers'
                                className='text-white text-[16px] font-medium border-b border-[#FFFFFF1A] pb-4'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('navbar.careers')}
                            </Link>

                            {/* Mobile Contact Us */}
                            <Link
                                href='/contact-us'
                                className='text-white text-[16px] font-medium border-b border-[#FFFFFF1A] pb-4'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('navbar.contactUs')}
                            </Link>

                            {/* Mobile Language Selector */}
                            {/* <div className='pt-4'>
                                <div className='flex items-center space-x-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M3.6 9H20.4M3.6 15H20.4M11.5 3C9.81534 5.69961 8.9222 8.81787 8.9222 12C8.9222 15.1821 9.81534 18.3004 11.5 21M12.5 3C14.1847 5.69961 15.0778 8.81787 15.0778 12C15.0778 15.1821 14.1847 18.3004 12.5 21M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className='text-white text-[16px]'>EN - English</span>
                                </div>
                            </div> */}

                            {/* Mobile Search */}
                            {/* <button className='flex items-center space-x-3 pt-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M19 19L13 13M1 8C1 9.18097 1.18106 10.0912 1.53284 10.9405C1.88463 11.7898 2.40024 12.5615 3.05025 13.2115C3.70026 13.8615 4.47194 14.3771 5.32122 14.7289C6.1705 15.0807 7.08075 15.2617 8 15.2617C8.91925 15.2617 9.82951 15.0807 10.6788 14.7289C11.5281 14.3771 12.2997 13.8615 12.9497 13.2115C13.5998 12.5615 14.1154 11.7898 14.4672 10.9405C14.8189 10.0912 15 9.18097 15 8C15 7.34247 14.8189 6.43221 14.4672 5.58293C14.1154 4.73366 13.5998 3.96198 12.9497 3.31197C12.2997 2.66196 11.5281 2.14634 10.6788 1.79456C9.82951 1.44278 8.91925 1.26172 8 1.26172C7.08075 1.26172 6.1705 1.44278 5.32122 1.79456C4.47194 2.14634 3.70026 2.66196 3.05025 3.31197C2.40024 3.96198 1.88463 4.73366 1.53284 5.58293C1.18106 6.43221 1 7.34247 1 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className='text-white text-[16px]'>Search</span>
                            </button> */}
                        </div>
                        {/* language selector */}
                        <div className='pl-5 flex items-center space-x-2 text-white cursor-pointer transition-colors'>
                            <select onChange={(e) => {
                                localStorage.setItem('language', e.target.value);
                                document.cookie = `language=${e.target.value}; path=/; max-age=31536000; SameSite=Lax`;
                                window.location.reload();
                            }}>
                                <option value="en">English</option>
                                <option value="ar">العربية</option>
                            </select>
                            {/* <span>{language === 'en' ? 'EN' : 'العربية'}</span> */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header >
    );
}
