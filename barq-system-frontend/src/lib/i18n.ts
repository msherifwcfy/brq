import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    components: {
      documentUploader: {
        "fileTypeNotSupported": "File type not supported",
      }
    },
    translation: {
      components: {
        documentUploader: {
          "fileTypeNotSupported": "File type not supported",
        }
      },
      navbar: {
        whoWeAre: {
          title: 'Who We Are',
          aboutBarq: {
            label: 'About BARQ Systems',
            description:
              "Discover our journey, mission, and vision as the region's technology backbone.",
          },
          awards: {
            label: 'Awards & Accolades',
            description:
              'Recognitions that highlight our excellence and industry leadership.',
          },
          alliances: {
            label: 'Alliances',
            description:
              'Trusted partnerships with leading vendors and clients worldwide.',
          },
          leadership: {
            label: 'Leadership',
            description:
              'Meet the executive team driving innovation and trust at BARQ Systems.',
          },
          sustainability: {
            label: 'Sustainability',
            description:
              'Our commitment to creating positive environmental, social, and economic impact.',
          },
        },
        whatWeDo: {
          title: 'What We Do',
          servicesSolutions: {
            label: 'Services & Solutions',
            description:
              'Comprehensive IT services driving business transformation.',
          },
          barqAcademy: {
            label: 'BARQ Academy',
            description:
              'Empowering talents through training, internships, and learning programs.',
          },
          submenu: {
            automation: 'Automation, Data & AI',
            cybersecurity: 'Cybersecurity',
            infrastructure: 'Infrastructure',
            managedServices: 'Managed Services',
          },
        },
        insightsResources: {
          title: 'Insights & Resources',
          caseStudies: {
            label: 'Case Studies / Success Stories',
            description: 'Real-world examples of client success.',
          },
          events: {
            label: 'Events',
            description: 'Upcoming and past industry events.',
          },
          newsroom: {
            label: 'Newsroom',
            description: 'Latest updates and press releases.',
          },
          resources: {
            label: 'Resources',
            description: 'Downloadable guides, reports, and campaigns.',
          },
        },
        careers: 'Careers',
        contactUs: 'Contact Us',
      },
      common: {
        time: {
          minutes: 'Minutes',
          minutes_short: 'min',
          hours: 'Hours',
          hours_short: 'hrs',
        },
        viewAll: 'View All',
        whatWeDoBest: 'What We Do Best',
        viewDetails: 'View Details',
        outCoreServices: 'Out of Core Services &',
        solutions: 'Solutions',
        realResultsRealClients: 'Real Results, Real Clients',
        ourSuccessStories: 'Our Success Stories',
        viewFullCaseStudy: 'View Full Case Study',
        empoweringTheFutureOfTechTalent: 'Empowering the Future of Tech Talent',
        barqAcademy: 'BARQ Academy',
        barqAcademyDescription:
          'BARQ Academy is our talent development hub — training future leaders in IT, cybersecurity, and enterprise solutions.',
        exploreBarqAcademy: 'Explore BARQ Academy',
        recognizedForExcellence: 'Recognized for Excellence',
        awardsAndRecognition: 'Awards & Recognition',
        industryAwardsEarnedIncludingModonExcellence:
          '50+ Industry Awards Earned Including Modon Excellence',
        awardForANineYearNationalPartnership:
          'Award for a 9-year national partnership.',
        stayAheadOfTheCurve: 'Stay Ahead of the Curve',
        insightsAndNews: 'Insights & News',
        readReport: 'Read Report',
        leadershipInsight: 'Leadership Insight',
        fromOurLeadership: 'From Our Leadership',
      },
      home: {
        pioneerInEnterpriseSecurity: 'Pioneer in Enterprise Security',
      },
      footer: {
        services: 'Services',
        company: 'Company',
        locations: 'Locations',
        contactUs: 'Contact Us',
        managedServices: 'Managed Services',
        cybersecurity: 'Cybersecurity',
        aiAutomation: 'AI & Automation',
        itInfrastructure: 'IT Infrastructure',
        aboutUs: 'About Us',
        careers: 'Careers',
        insights: 'Insights',
        contactForm: 'Contact Form',
        allRightsReserved: '© 2024 BARQ Systems. All rights reserved.',
        privacyPolicy: 'Privacy Policy',
        hsePolicy: 'HSE Policy',
        codeOfConduct: 'Code of Conduct',
        termsOfService: 'Terms of Service',
      },
      leadership: {
        leadershipTitle: 'Meet Our Leadership Team',
        description:
          'Our leadership team brings together diverse experience and a shared commitment to delivering world-class solutions, building strong partnerships, and empowering our people',
      },
      executive: {
        executiveTitle: 'Meet Our Executive Team',
        description:
          ' Guiding BARQ Systems with vision, expertise, and innovation—our executive leaders drive growth, inspire excellence, and shape the future of technology in the region.',
      },
      sustainability: {
        ecosystemSustainability: 'Ecosystem Sustainability',
        globalCommitment: 'Global Commitment',
        social: 'Social',
        economic: 'Economic',
        environmental: 'Environmental',
        emissionsAndWasteManagement: 'Emissions & Waste Management',
        emissionsAndWasteDescription: 'We address the environmental impact of e-waste and emissions by:',
      },
      alliances: {
        vendors: 'Vendors',
        clients: 'Clients',
        trustedByLeadingOrganizations: 'Trusted by Leading Organizations',
        trustedByLeadingGlobalVendors: 'Trusted by Leading Global Vendors',
        filterBy: 'Filter by',
        allCountries: 'All Countries',
        country: 'Country',
        all: 'All',
        industry: 'Industry',
        allIndustries: 'All Industries',
        solution: 'Solution',
        allSolutions: 'All Solutions',
        prev: 'Prev',
        next: 'Next',
        ourTechnologyPartners: 'Our Technology Partners',
        ourClients: 'Our Clients',
      },
      solutionsandservices: {
        whatWeDo: 'What We Do',
        servicesAndSolutionsDesc:
          'Services & Solutions that Transform Complexity into Clarity',
        servicesAndSolutionsDesc2:
          'BARQ Systems intelligent solutions accelerate digital transformation and  empower businesses to innovate, scale, and stay ahead in a rapidly evolving  landscape',
        coreSolutions: 'Core Solutions',
        ourCoreSolutionsServices: 'Our Core Solutions & Services',
        coreSolutionDesc1:
          'Empowering businesses with innovative technology solutions and managed services',
        coreSolutionDesc2:
          'designed to enhance operations, drive growth, and secure digital transformation',
        automationDataAi: 'Automation, Data & AI',
        cybersecurity: 'Cybersecurity',
        infrastructure: 'Infrastructure',
        itInfrastructure: 'IT Infrastructure',
        managedServices: 'Managed Services',
        automationDesc:
          'Transform operations with intelligent automation and advanced data-driven inights.',
        cybersecurityDesc:
          'Protect your business with next-gen security solutions and proactive threat management',
        infrastructureDesc:
          'Empower business growth with scalable, secure, and future-ready infrastructure.',
        managedServicesDesc:
          'Simplify IT management and enhance efficiency with our tailored managed services.',
        exploreSolution: 'Explore Solutions',
        learnMore: 'Learn more',
        checkOurBundles: 'Check our bundles',
        downloadTheBundles: 'Download The Bundles',
      },
      contactUs: {
        title: 'Contact Us',
        formTitle: 'Fill the form below',
        formSubTitle:
          'We&apos;re here to help you connect with the right team at BARQ Systems.',
        requestType: 'Request Type',
        fullName: 'Full Name',
        email: 'Email',
        mobileNumber: 'Mobile Number',
        knowAboutBarq: 'How did you know about BARQ Systems?',
        requestDescription: 'Request Description',
        submit: 'Submit',
        submitting: 'submitting',
        ourOffices: 'Our Offices',
      },
      newsroom: {
        title: 'Newsroom',
        heroTitle: 'Stay Updated with BARQ',
        heroDescription: 'Explore our latest news, press releases, and insights to stay informed about BARQ Systems\' innovations and impact.',
        all: 'All',
        news: 'News',
        pressReleases: 'Press Releases',
        interviews: 'Interviews',
        readMore: 'Read More',
      },
      resources: {
        title: 'Resources',
        learnMore: 'Learn More',
        prev: 'Prev',
        next: 'Next',
        applyNow: 'Apply Now',
        formDescription:
          "Fill out the form below to gain access to BARQ Systems' latest campaigns, resources, and exclusive content tailored to your business needs.",
        getTheFullBrochure: 'Get the Full Brochure',
        brochureDescription:
          "Discover how BARQ Systems' Managed Services can reduce costs, improve resilience, and free up your IT team to focus on growth.",
        position: 'Position',
        organizationName: 'Organization Name',
        submit: 'Submit',
        downloadNow: 'Download Now',
        submitting: 'Submitting...',
        errorSubmittingForm: 'Error submitting form. Please try again.',
      },
      events: {
        joinUsAtTheEvent: 'Join Us at the Event',
        fillOutThisForm: 'Fill out this form',
        companyOrganizationName: 'Company / Organization Name',
        submitRegistration: 'Submit Registration',
      },
      academyApplication: {
        applyNow: 'Apply Now',
        formDescription:
          'Fill out the form below to apply for your chosen track. Our team will review your application and get back to you.',
        gainPracticalSkillsIn: 'Gain practical skills in',
        personalInformation: 'Personal Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        mobileNumber: 'Mobile Number',
        email: 'Email',
        linkedInProfile: 'LinkedIn Profile',
        educationDetails: 'Education Details',
        universityName: 'University Name',
        currentAcademicYear: 'Current Academic Year',
        firstYear: 'First Year',
        secondYear: 'Second Year',
        thirdYear: 'Third Year',
        fourthYear: 'Fourth Year',
        graduate: 'Graduate',
        documentUpload: 'Document Upload',
        chooseFile: 'Choose file',
        pleaseSelectYourCV: 'Please select your CV',
        submitApplication: 'Submit Application',
      },
      careers: {
        joinOurTeam: 'Join Our Team',
        careerOpportunity: 'Career Opportunity',
        openingDate: 'Opening Date',
        closingDate: 'Closing Date',
        location: 'Location',
        category: 'Category',
        keyResponsibilities: 'Key Responsibilities',
        requiredQualifications: 'Required Qualifications',
        certificationsPreferred: 'Certifications (Preferred)',
        applyForThisRole: 'Apply for this Role',
        formDescription:
          'Fill out the form and upload your CV to submit your application.',
        country: 'Country',
        uploadYourCV: 'Upload Your CV',
        openPositions: 'Open Positions',
        exploreOpportunities: 'Explore Opportunities',
        filterBy: 'Filter by',
        searchPlaceholder: 'Search by role or keyword..',
        search: 'Search',
        city: 'City',
        opportunities: 'Opportunities',
        all: 'All',
        vacancies: 'Vacancies',
        internships: 'Internships',
        apply: 'Apply',
        notSpecified: 'Not specified',
        general: 'General',
      },
      academy: {
        learnMore: 'Learn More',
        hero: {
          title: 'Empowering the Next Generation of ICT Professionals',
          subTitle:
            "BARQ Academy delivers tech-focused education aimed at forging young ICT professionals. BARQ Academy's offering is completed through strategic partnerships with leading universities in Egypt to provide condensed one-week programs addressing the rapidly-evolving global tech industry.",
        },
        highlights: {
          label: 'BARQ Academy Highlights',
          title: 'BARQ Academy Highlights',
          subTitle:
            'Empowering the next generation of tech leaders through internships, trainings, and seminars.',
          programs: 'Programs',
          graduates2023: 'Graduates (2023)',
          hiringRate: 'Hiring Rate',
          hrsAvgStaff: 'Hrs Avg/Staff',
          hoursIn2023: 'Hours in 2023',
          graduatesSinceInception: 'Graduates Since Inception',
        },
        foundationTracks: {
          label: 'Programs & Opportunities',
          title: 'Our Foundation Tracks',
        },
        internshipPrograms: {
          label: 'Programs & Opportunities',
          title: 'Our Internship Programs',
        },
        applyNow: 'Apply Now',
      },
      caseStudies: {
        insights: 'Insights',
        title: 'Case Studies & Success Stories',
        description:
          'Discover how BARQ Systems empowers businesses with innovative solutions, driving transformation, resilience, and measurable results across industries.',
        filterBy: 'Filter by',
        country: 'Country',
        industry: 'Industry',
        exploreCaseStudy: 'Explore Case Study',
        prev: 'Prev',
        next: 'Next',
        clear: 'Clear',
      },
      managedServices: {
        title: 'Managed Services',
        description:
          "BARQ Systems' Managed Services make IT simple, efficient, and scalable. Our specialized bundles provide you with expert teams in cybersecurity, network operations, security assessments, and more — ensuring your business stays ahead.",
        learnMore: 'تعلم المزيد',
      },
      aboutBarq: {
        hero: {
          whoWeAre: 'Who We Are',
          title: 'We Strive to Be the Technology Backbone of the Region',
          description:
            'More than a service provider, we aim to be the trusted backbone that powers businesses across the region keeping them connected, secure, and future-ready. Our solutions are built to scale, adapt, and protect from mission-critical IT projects to fully managed security services.',
        },
        group: {
          ourGroup: 'Our Group',
          title: 'Part of Aldabbagh Group',
          description:
            'Since 2013, BARQ SYSTEMS has proudly served as the IT services backbone of the Aldabbagh Group, a diverse conglomerate dedicated to creating sustainable value.',
          countries: 'Countries',
          employees: 'Employees',
          companies: 'Companies',
          strategicBusinessPortfolios: 'Strategic Business Portfolios',
        },
        missionVision: {
          missionAndVision: 'Mission & Vision',
          ourMissionAndVision: 'Our Mission & Vision',
          mission: 'Mission',
          missionDescription:
            "We deliver innovative, reliable, and secure technology solutions through deep expertise and customer commitment. By transforming vendors and customers into 'partners in captivity,' we provide quality-driven services that exceed expectations and establish long-term success for all stakeholders.",
          vision: 'Vision',
          visionDescription:
            "Be the Middle East & North Africa's technology partner that transforms mission-critical IT projects into lasting achievements that drive business excellence.",
        },
        journey: {
          milestones: 'Milestones',
          ourJourneyThroughInnovation: 'Our Journey Through Innovation',
        },
        coreValues: {
          guidedByWhatWeStandFor: 'Guided by What We Stand For',
          ourCoreValues: 'Our Core Values',
          description:
            'Our actions and decisions are shaped by our philosophy of Omnipreneurship. At the core of our business lies a philosophy firmly rooted in three principles: Giving, Earning & Sustaining.',
        },
      },
    },
  },
  ar: {
    translation: {
      navbar: {
        whoWeAre: {
          title: 'من نحن',
          aboutBarq: {
            label: 'عن أنظمة برق',
            description:
              'اكتشف رحلتنا ورسالتنا ورؤيتنا كعمود فقري تقني للمنطقة.',
          },
          awards: {
            label: 'الجوائز والتقديرات',
            description: 'اعترافات تسلط الضوء على تميزنا وقيادتنا في الصناعة.',
          },
          alliances: {
            label: 'التحالفات',
            description:
              'شراكات موثوقة مع موردين وعملاء رائدين في جميع أنحاء العالم.',
          },
          leadership: {
            label: 'القيادة',
            description:
              'تعرف على الفريق التنفيذي الذي يقود الابتكار والثقة في أنظمة برق.',
          },
          sustainability: {
            label: 'الاستدامة',
            description: 'التزامنا بخلق تأثير إيجابي بيئي واجتماعي واقتصادي.',
          },
        },
        whatWeDo: {
          title: 'ما نفعله',
          servicesSolutions: {
            label: 'الخدمات والحلول',
            description:
              'خدمات تكنولوجيا المعلومات الشاملة التي تقود تحول الأعمال.',
          },
          barqAcademy: {
            label: 'أكاديمية برق',
            description:
              'تمكين المواهب من خلال التدريب والتدريب الداخلي وبرامج التعلم.',
            learnMore: 'تعلم المزيد',
          },
          submenu: {
            automation: 'الأتمتة والبيانات والذكاء الاصطناعي',
            cybersecurity: 'الأمن السيبراني',
            infrastructure: 'البنية التحتية',
            managedServices: 'الخدمات المدارة',
          },
        },
        insightsResources: {
          title: 'الرؤى والموارد',
          caseStudies: {
            label: 'دراسات الحالة / قصص النجاح',
            description: 'أمثلة حقيقية على نجاح العملاء.',
          },
          events: {
            label: 'الفعاليات',
            description: 'فعاليات الصناعة القادمة والسابقة.',
          },
          newsroom: {
            label: 'غرفة الأخبار',
            description: 'أحدث التحديثات والبيانات الصحفية.',
          },
          resources: {
            label: 'الموارد',
            description: 'أدلة وتقارير وحملات قابلة للتنزيل.',
          },
        },
        careers: 'الوظائف',
        contactUs: 'اتصل بنا',
      },
      common: {
        time: {
          minutes: 'دقائق',
          minutes_short: 'دقيقة',
          hours: 'ساعات',
          hours_short: 'ساعة',
          minutes_short_plural: 'دقائق',
          hours_short_plural: 'ساعات',
        },
        viewAll: 'عرض الكل',
        whatWeDoBest: 'ما نفعله بشكل أفضل',
        viewDetails: 'عرض التفاصيل',
        outCoreServices: 'خدمات وحلولنا الأساسية',
        solutions: '',
        realResultsRealClients: 'نتائج حقيقية وعملاء حقيقيين',
        ourSuccessStories: 'قصص النجاح الخاصة بنا',
        viewFullCaseStudy: 'عرض دراسة الحالة الكاملة',
        empoweringTheFutureOfTechTalent: 'تمكين المستقبل للمواهب التقنية',
        barqAcademy: 'أكاديمية برق',
        barqAcademyDescription:
          'أكاديمية برق هي مركز تطوير المواهب الخاص بنا — تدريب المواهب المستقبلية في تكنولوجيا المعلومات والأمن السيبراني وحلول المؤسسات.',
        exploreBarqAcademy: 'استكشف أكاديمية برق',
        recognizedForExcellence: 'معترف بالأداء المتميز',
        awardsAndRecognition: 'جوائز وتقديرات',
        industryAwardsEarnedIncludingModonExcellence:
          '50+ جوائز صناعية مكتسبة تشمل جوائز مودون الاستدامة',
        awardForANineYearNationalPartnership:
          'جائزة لعلاقة 9 سنوات مستقرة بالمملكة العربية السعودية.',
        stayAheadOfTheCurve: 'ابق أمام الاخرين',
        insightsAndNews: 'الرؤى والأخبار',
        readReport: 'قراءة التقرير',
        leadershipInsight: 'الرؤى القيادية',
        fromOurLeadership: 'من قيادتنا',
      },
      home: {
        pioneerInEnterpriseSecurity: 'رائد في أمن المؤسسات',
      },
      footer: {
        services: 'الخدمات',
        company: 'الشركة',
        locations: 'المواقع',
        contactUs: 'اتصل بنا',
        managedServices: 'الخدمات المدارة',
        cybersecurity: 'الأمن السيبراني',
        aiAutomation: 'الذكاء الاصطناعي والأتمتة',
        itInfrastructure: 'البنية التحتية لتكنولوجيا المعلومات',
        aboutUs: 'من نحن',
        careers: 'الوظائف',
        insights: 'الرؤى',
        contactForm: 'نموذج الاتصال',
        allRightsReserved: '© 2024 أنظمة برق. جميع الحقوق محفوظة.',
        privacyPolicy: 'سياسة الخصوصية',
        hsePolicy: 'سياسة الصحة والسلامة والبيئة',
        codeOfConduct: 'مدونة قواعد السلوك',
        termsOfService: 'شروط الخدمة',
      },
      leadership: {
        leadershipTitle: 'تعرف على فريقنا القيادي',
        description:
          ' يجمع فريقنا القيادي معاً تجربة واحدة واحدة والتزام مشترك بتقديم حلول عالمية المستوى، بناء شراكات قوية وتمكين أفرادنا.',
      },
      executive: {
        executiveTitle: 'تعرف على فريقنا التنفيذي',
        description:
          ' إرشاد أنظمة برق بالرؤية والخبرة والابتكار—رواد الأعمال الذين يقودون النمو ويشجعون الأداء المتميز ويشكلون المستقبل لتكنولوجيا المعلومات في المنطقة.',
      },
      sustainability: {
        ecosystemSustainability: 'الاستدامة في النظام البيئي',
        globalCommitment: 'التزامنا بالعالم المتكامل',
        social: 'الاجتماعي',
        economic: 'الاقتصادي',
        environmental: 'الاستدامة في البيئة',
        emissionsAndWasteManagement: 'إدارة الانبعاثات والنفايات',
        emissionsAndWasteDescription: 'نتعامل مع التأثير البيئي للنفايات الإلكترونية والانبعاثات من خلال:',
      },
      alliances: {
        vendors: 'الشركات',
        clients: 'العملاء',
        trustedByLeadingOrganizations: 'موثوق بالمؤسسات الرائدة',
        trustedByLeadingGlobalVendors: 'موثوق بالموردين العالميين الرائدين',
        filterBy: 'تصفية حسب',
        allCountries: 'جميع الدول',
        country: 'الدولة',
        all: 'جميع',
        industry: 'الصناعة',
        allIndustries: 'جميع الصناعات',
        solution: 'الحل',
        allSolutions: 'جميع الحلول',
        prev: 'السابق',
        next: 'التالي',
        ourTechnologyPartners: 'شركات التكنولوجيا الرائدة',
        ourClients: 'العملاء الخاصة بنا',
      },
      solutionsandservices: {
        whatWeDo: 'ماذا نفعل',
        servicesAndSolutionsDesc: 'الخدمات والحلول التي تحول التعقيد إلى وضوح',
        servicesAndSolutionsDesc2:
          'أنظمة برق الذكية تسرع تحول الرقمي وتمكن الشركات من الابتكار والتحديث والبقاء أمام الاخرين في ساحة التطور السريع',
        coreSolutions: 'الحلول الأساسية',
        ourCoreSolutionsServices: 'الحلول الأساسية والخدمات الخاصة بنا',
        coreSolutionDesc1:
          'تمكين الشركات من الابتكار والتحديث والبقاء أمام الاخرين في ساحة التطور السريع',
        coreSolutionDesc2: 'تم تصميمها لتعزيز العمليات والنمو والتحول الرقمي',
        automationDataAi: 'الأتمتة والبيانات والذكاء الاصطناعي',
        cybersecurity: 'الأمن السيبراني',
        infrastructure: 'البنية التحتية',
        itInfrastructure: 'البنية التحتية لتكنولوجيا المعلومات',
        managedServices: 'الخدمات المدارة',
        automationDesc:
          'تحول العمليات باستخدام الأتمتة الذكية والبيانات المتقدمة المدعومة بالبيانات.',
        cybersecurityDesc:
          'حماية الشركات بالحلول الأمنية الجديدة والتعامل مع التهديدات المبكرة',
        infrastructureDesc:
          'تمكين نمو الشركات من خلال البنية التحتية القابلة للتحديث والمستقبلية.',
        managedServicesDesc:
          'تبسيط إدارة التكنولوجيا المعلوماتية وتعزيز الكفاءة باستخدام الخدمات المدارة المخصصة.',
        exploreSolution: 'استكشف الحلول',
        learnMore: 'تعلم المزيد',
        checkOurBundles: 'تحقق من حزمنا',
        downloadTheBundles: 'تحميل الحزم',
      },
      contactUs: {
        title: 'اتصل بنا',
        formTitle: 'أملأ النموذج أدناه',
        formSubTitle:
          'نحن هنا لمساعدتك على الاتصال بالفريق الصحيح في أنظمة برق.',
        requestType: 'نوع الطلب',
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        mobileNumber: 'رقم الهاتف',
        knowAboutBarq: 'كيف سمعت عن أنظمة برق؟',
        requestDescription: 'وصف الطلب',
        submit: 'إرسال',
        submitting: 'جاري الإرسال',
        ourOffices: 'المواقع الخاصة بنا',
      },
      newsroom: {
        title: 'غرفة الأخبار',
        heroTitle: 'ابق على اطلاع بأحدث أخبار برق',
        heroDescription: 'استكشف أحدث أخبارنا والبيانات الصحفية والرؤى للبقاء على اطلاع بابتكارات وتأثير أنظمة برق.',
        all: 'جميع',
        news: 'الأخبار',
        pressReleases: 'البيانات الصحفية',
        interviews: 'المقابلات',
        readMore: 'اقرأ المزيد',
      },
      resources: {
        title: 'الموارد',
        learnMore: 'تعلم المزيد',
        prev: 'السابق',
        next: 'التالي',
        applyNow: 'قدم الآن',
        formDescription:
          'املأ النموذج أدناه للوصول إلى أحدث الحملات والموارد والمحتوى الحصري من أنظمة برق المصمم خصيصاً لاحتياجات عملك.',
        getTheFullBrochure: 'احصل على الكتيب الكامل',
        brochureDescription:
          'اكتشف كيف يمكن لخدمات أنظمة برق المدارة تقليل التكاليف وتحسين المرونة وتحرير فريق تكنولوجيا المعلومات الخاص بك للتركيز على النمو.',
        position: 'المنصب',
        organizationName: 'اسم المؤسسة',
        submit: 'إرسال',
        downloadNow: 'تحميل الآن',
        submitting: 'جاري الإرسال...',
        errorSubmittingForm: 'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.',
      },
      events: {
        joinUsAtTheEvent: 'انضم إلينا في الحدث',
        fillOutThisForm: 'املأ هذا النموذج',
        companyOrganizationName: 'اسم الشركة / المؤسسة',
        submitRegistration: 'إرسال التسجيل',
      },
      academyApplication: {
        applyNow: 'قدم الآن',
        formDescription:
          'املأ النموذج أدناه للتقديم على المسار الذي اخترته. سيقوم فريقنا بمراجعة طلبك والرد عليك.',
        gainPracticalSkillsIn: 'اكتسب مهارات عملية في',
        personalInformation: 'المعلومات الشخصية',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        mobileNumber: 'رقم الهاتف',
        email: 'البريد الإلكتروني',
        linkedInProfile: 'ملف LinkedIn الشخصي',
        educationDetails: 'تفاصيل التعليم',
        universityName: 'اسم الجامعة',
        currentAcademicYear: 'السنة الأكاديمية الحالية',
        firstYear: 'السنة الأولى',
        secondYear: 'السنة الثانية',
        thirdYear: 'السنة الثالثة',
        fourthYear: 'السنة الرابعة',
        graduate: 'خريج',
        documentUpload: 'رفع المستندات',
        chooseFile: 'اختر ملف',
        pleaseSelectYourCV: 'يرجى اختيار سيرتك الذاتية',
        submitApplication: 'إرسال الطلب',
      },
      careers: {
        joinOurTeam: 'انضم إلى فريقنا',
        careerOpportunity: 'فرصة وظيفية',
        openingDate: 'تاريخ الافتتاح',
        closingDate: 'تاريخ الإغلاق',
        location: 'الموقع',
        category: 'الفئة',
        keyResponsibilities: 'المسؤوليات الرئيسية',
        requiredQualifications: 'المؤهلات المطلوبة',
        certificationsPreferred: 'الشهادات (مفضلة)',
        applyForThisRole: 'التقديم على هذه الوظيفة',
        formDescription: 'املأ النموذج وقم برفع سيرتك الذاتية لإرسال طلبك.',
        country: 'الدولة',
        uploadYourCV: 'قم برفع سيرتك الذاتية',
        openPositions: 'الوظائف الشاغرة',
        exploreOpportunities: 'استكشف الفرص',
        filterBy: 'تصفية حسب',
        searchPlaceholder: 'ابحث حسب المسمى الوظيفي أو الكلمة المفتاحية..',
        search: 'بحث',
        city: 'المدينة',
        opportunities: 'الفرص',
        all: 'الكل',
        vacancies: 'الوظائف الشاغرة',
        internships: 'التدريب الداخلي',
        apply: 'تقديم',
        notSpecified: 'غير محدد',
        general: 'عام',
      },
      academy: {
        learnMore: 'تعلم المزيد',
        hero: {
          title: 'تمكين الجيل القادم من محترفي تكنولوجيا المعلومات والاتصالات',
          subTitle:
            'تقدم أكاديمية برق تعليمًا مركزًا على التكنولوجيا يهدف إلى إعداد محترفين شباب في تكنولوجيا المعلومات والاتصالات. يتم استكمال عروض أكاديمية برق من خلال شراكات استراتيجية مع الجامعات الرائدة في مصر لتقديم برامج مكثفة لمدة أسبوع واحد لمعالجة صناعة التكنولوجيا العالمية سريعة التطور.',
        },
        highlights: {
          label: 'أبرز ما في أكاديمية برق',
          title: 'أبرز ما في أكاديمية برق',
          subTitle:
            'تمكين الجيل القادم من قادة التكنولوجيا من خلال التدريب الداخلي والتدريبات والندوات.',
          programs: 'البرامج',
          graduates2023: 'الخريجون (2023)',
          hiringRate: 'معدل التوظيف',
          hrsAvgStaff: 'ساعات متوسط/الموظف',
          hoursIn2023: 'الساعات في 2023',
          graduatesSinceInception: 'الخريجون منذ التأسيس',
        },
        foundationTracks: {
          label: 'البرامج والفرص',
          title: 'مساراتنا التأسيسية',
        },
        internshipPrograms: {
          label: 'البرامج والفرص',
          title: 'برامج التدريب الداخلي الخاصة بنا',
        },
        applyNow: 'قدم الآن',
      },
      caseStudies: {
        insights: 'رؤى',
        title: 'دراسات الحالة وقصص النجاح',
        description:
          'اكتشف كيف تمكّن أنظمة برق الشركات بحلول مبتكرة، تدفع التحول والمرونة والنتائج القابلة للقياس عبر الصناعات.',
        filterBy: 'تصفية حسب',
        country: 'الدولة',
        industry: 'الصناعة',
        exploreCaseStudy: 'استكشاف دراسة الحالة',
        prev: 'السابق',
        next: 'التالي',
        clear: 'مسح',
      },
      managedServices: {
        title: 'الخدمات المدارة',
        description:
          'تبسيط إدارة التكنولوجيا المعلوماتية وتعزيز الكفاءة باستخدام الخدمات المدارة المخصصة.',
        learnMore: 'تعلم المزيد',
      },
      aboutBarq: {
        hero: {
          whoWeAre: 'من نحن',
          title: 'نسعى لأن نكون العمود الفقري التكنولوجي للمنطقة',
          description:
            'أكثر من مزود خدمة، نهدف لأن نكون العمود الفقري الموثوق الذي يمد الشركات في جميع أنحاء المنطقة بالطاقة، مما يبقيها متصلة وآمنة وجاهزة للمستقبل. تم بناء حلولنا لتتوسع وتتكيف وتحمي من مشاريع تكنولوجيا المعلومات الحرجة إلى خدمات الأمان المدارة بالكامل.',
        },
        group: {
          ourGroup: 'مجموعتنا',
          title: 'جزء من مجموعة الدباغ',
          description:
            'منذ عام 2013، خدمت أنظمة برق بفخر كعمود فقري لخدمات تكنولوجيا المعلومات لمجموعة الدباغ، وهي مجموعة متنوعة مكرسة لخلق قيمة مستدامة.',
          countries: 'الدول',
          employees: 'الموظفين',
          companies: 'الشركات',
          strategicBusinessPortfolios: 'محافظ الأعمال الاستراتيجية',
        },
        missionVision: {
          missionAndVision: 'المهمة والرؤية',
          ourMissionAndVision: 'مهمتنا ورؤيتنا',
          mission: 'المهمة',
          missionDescription:
            'نقدم حلولاً تكنولوجية مبتكرة وموثوقة وآمنة من خلال الخبرة العميقة والالتزام بالعملاء. من خلال تحويل الموردين والعملاء إلى "شركاء في الأسر"، نقدم خدمات مدفوعة بالجودة تتجاوز التوقعات وتؤسس للنجاح طويل الأمد لجميع أصحاب المصلحة.',
          vision: 'الرؤية',
          visionDescription:
            'أن نكون الشريك التكنولوجي في الشرق الأوسط وشمال أفريقيا الذي يحول مشاريع تكنولوجيا المعلومات الحرجة إلى إنجازات دائمة تدفع التميز التجاري.',
        },
        journey: {
          milestones: 'المعالم',
          ourJourneyThroughInnovation: 'رحلتنا من خلال الابتكار',
        },
        coreValues: {
          guidedByWhatWeStandFor: 'نسترشد بما نؤمن به',
          ourCoreValues: 'قيمنا الأساسية',
          description:
            'تتشكل أفعالنا وقراراتنا من خلال فلسفة ريادة الأعمال الشاملة. في جوهر أعمالنا تكمن فلسفة متجذرة بقوة في ثلاثة مبادئ: العطاء، الكسب والاستدامة.',
        },
      },
    },
  },
};

// Get initial language from localStorage if available (client-side only)
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  }
  return 'en';
};

// Initialize i18n only if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      lng: getInitialLanguage(), // Use saved language or default
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'language',
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
