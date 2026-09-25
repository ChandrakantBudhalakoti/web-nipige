import type { CaseStudy } from "@/lib/types";

/**
 * Production case studies. Content sourced from `Case Studies-nipige.docx`.
 * Logos are local SVG assets in /public/logos (with a monogram fallback in `CaseLogo`).
 */
export const cases: CaseStudy[] = [
  {
    slug: "heartland-workforce",
    nm: "Heartland Workforce",
    cl: "Restoration Services",
    co: "USA",
    ic: "🇺🇸",
    stat: "3 Integrated Platforms",
    clr: "#0EA5E9",
    logo: "/logos/heartland-workforce-logo.png",
    industry: "Enterprise SaaS",
    year: "Live",
    highlight:
      "Digital Transformation Platform for the Restoration Services Industry",
    h1: "Heartland Workforce: Restoration Services",
    metaDesc:
      "Heartland Restoration runs three platforms on Nipige: workforce management, insurance claims, and a technician marketplace that unify its field operations.",
    challenge:
      "Heartland is a leading restoration services organization in the United States, helping homeowners recover from water damage, fire damage, mold remediation, and other property restoration emergencies. Their operations involve managing contractors, technicians, insurance claims, and customer communications across multiple restoration projects simultaneously. As the business expanded, fragmented systems and manual workflows created operational bottlenecks, making it increasingly difficult to deliver fast, transparent, and scalable services. Heartland needed a unified digital platform capable of managing the complete restoration lifecycle while improving operational efficiency for internal teams and providing a seamless experience for homeowners. The organization faced several challenges: disconnected operational systems, manual project and technician management, complex insurance claim coordination, billing and commission reconciliation delays, limited visibility into project progress, difficulty scaling operations across multiple business entities, and lack of centralized reporting and analytics.",
    solution:
      "Nipige designed and developed Heartland Restoration, an enterprise-grade digital ecosystem built on a scalable multi-tenant architecture. Rather than developing a standalone application, we engineered three tightly integrated platforms that work together as a unified restoration management ecosystem. The Workforce Management Platform is a comprehensive SaaS platform enabling restoration businesses to manage their complete operations from a single dashboard, including lead management, project creation, technician assignment, work order management, role-based access, payment processing, commission tracking, project lifecycle management, multi-company management, and executive dashboards. Claim Ready Plus (CRP) is a homeowner-focused insurance claim management platform that simplifies one of the most stressful parts of property restoration with case-based claim management, secure document repository, insurance adjuster collaboration, claim progress tracking, subscription management, real-time notifications, and a centralized communication timeline. Service Ready Network (SRN) is a marketplace connecting homeowners and restoration businesses with verified field technicians through technician discovery, location-based search, skill and certification filtering, availability management, online booking, ratings and reviews, and unified technician profiles.",
    results: [
      { v: "40%", l: "Faster Claim Processing" },
      { v: "60%", l: "Reduction in Manual Work" },
      { v: "4.8/5", l: "Customer Satisfaction" },
    ],
    story: [
      {
        h: "Client Overview",
        b: "Heartland is a leading restoration services organization in the United States, helping homeowners recover from water damage, fire damage, mold remediation, and other property restoration emergencies. Their operations involve managing contractors, technicians, insurance claims, and customer communications across multiple restoration projects simultaneously. As the business expanded, fragmented systems and manual workflows created operational bottlenecks, making it increasingly difficult to deliver fast, transparent, and scalable services.",
      },
      {
        h: "Business Challenge",
        b: "Heartland needed a unified digital platform capable of managing the complete restoration lifecycle while improving operational efficiency for internal teams and providing a seamless experience for homeowners. The organization faced several challenges: disconnected operational systems, manual project and technician management, complex insurance claim coordination, billing and commission reconciliation delays, limited visibility into project progress, difficulty scaling operations across multiple business entities, and lack of centralized reporting and analytics. Heartland partnered with Nipige to build a modern cloud-based platform capable of supporting future growth while streamlining every stage of the restoration process.",
      },
      {
        h: "01 · Workforce Management Platform",
        b: "A comprehensive SaaS platform enabling restoration businesses to manage their complete operations from a single dashboard. Key capabilities include lead management, project creation, technician assignment, work order management, role-based access, payment processing, commission tracking, project lifecycle management, multi-company management, and executive dashboards.",
      },
      {
        h: "02 · Claim Ready Plus (CRP)",
        b: "A homeowner-focused insurance claim management platform that simplifies one of the most stressful parts of property restoration. Features include case-based claim management, secure document repository, insurance adjuster collaboration, claim progress tracking, subscription management, real-time notifications, and a centralized communication timeline. The platform provides homeowners with complete transparency throughout the insurance claims journey.",
      },
      {
        h: "03 · Service Ready Network (SRN)",
        b: "A marketplace connecting homeowners and restoration businesses with verified field technicians. Core capabilities include technician discovery, location-based search, skill and certification filtering, availability management, online booking, ratings and reviews, and unified technician profiles. This creates an efficient ecosystem where qualified professionals can be quickly matched with restoration projects.",
      },
      {
        h: "Technology Highlights",
        b: "The solution was engineered using a scalable enterprise architecture designed for high performance and future expansion. Key technical capabilities include multi-tenant SaaS architecture, microservices-based platform, centralized API integration layer, role-based authentication, automated payment workflows, geolocation services, real-time notifications, cloud-native deployment, analytics and reporting engine, and scalable data architecture.",
      },
      {
        h: "Key Features Delivered",
        b: "Unified Operations Dashboard — a centralized workspace allowing project managers, contractors, finance teams, and administrators to manage projects in real time. Insurance Claim Management — structured workflows that simplify documentation, approvals, communication, and claim tracking for homeowners. Automated Financial Operations — an intelligent payment engine that automates contractor payments, commission calculations, milestone-based disbursements, and financial reporting. Smart Technician Marketplace — advanced search and booking capabilities enabling customers to locate verified restoration professionals based on specialty, availability, location, and ratings. Real-Time Communication — integrated notifications via SMS, push notifications, and in-app alerts keep all stakeholders informed throughout every stage of the restoration process. Executive Analytics — interactive dashboards provide insights into operational performance, technician utilization, claim resolution, revenue trends, and business growth.",
      },
      {
        h: "Business Impact",
        b: "The Heartland Restoration platform transformed the organization's operational efficiency while improving the customer experience across every touchpoint. Results delivered: 40% faster insurance claim processing, 60% reduction in manual administrative work, 3 integrated enterprise platforms, 3x increase in technician bookings, 4.8/5 average customer satisfaction, and zero critical billing disputes after automation. Teams that want to build a services marketplace with similar dispatch and billing automation can start from Nipige's services template.",
        link: { anchor: "build a services marketplace", href: "/solutions/services" },
      },
      {
        h: "Value Delivered by Nipige",
        b: "Through strategic product design, enterprise architecture, and full-stack development, Nipige helped Heartland modernize its restoration operations with a unified digital ecosystem. The platform now enables faster restoration project execution, improved homeowner experience, automated financial operations, better workforce utilization, scalable multi-business management, data-driven operational decisions, and future-ready digital infrastructure. Today, Heartland serves as a comprehensive restoration management platform that connects restoration companies, homeowners, insurance workflows, and field technicians through one intelligent digital ecosystem.",
      },
    ],
    features: [
      "Unified Operations Dashboard",
      "Insurance Claim Management",
      "Automated Financial Operations",
      "Smart Technician Marketplace",
      "Real-Time Communication",
      "Executive Analytics",
    ],
    feedback: [
      '"Before Heartland, managing multiple restoration projects across different contractors was a nightmare of spreadsheets and phone calls. Now everything is centralized, streamlined, and significantly faster." — Operations Director, Heartland',
    ],
    metrics: [
      { v: "40%", l: "Faster insurance claim processing" },
      { v: "60%", l: "Reduction in manual administrative work" },
      { v: "3", l: "Integrated enterprise platforms" },
      { v: "3x", l: "Increase in technician bookings" },
      { v: "4.8/5", l: "Average customer satisfaction" },
      { v: "Zero", l: "Critical billing disputes after automation" },
    ],
    tech: [
      "Multi-tenant SaaS Architecture",
      "Microservices",
      "Centralized API Integration",
      "Role-Based Authentication",
      "Automated Payment Workflows",
      "Geolocation Services",
      "Real-Time Notifications",
      "Cloud-Native Deployment",
      "Analytics & Reporting Engine",
    ],
    faqs: [
      {
        q: "What problem did Heartland need to solve?",
        a: "Heartland was managing restoration projects through disconnected systems and manual workflows, juggling contractors, technicians, insurance claims, and billing across multiple projects with no centralized visibility.",
      },
      {
        q: "What did Nipige build for Heartland?",
        a: "Nipige built three integrated platforms for Heartland: a Workforce Management Platform for residential and commercial restoration projects, Claim Ready Plus (CRP) for homeowner insurance claim management, and Service Ready Network (SRN), a marketplace connecting homeowners with trusted field technicians.",
      },
      {
        q: "How does the Service Ready Network technician marketplace work?",
        a: "Homeowners and restoration businesses find verified field technicians through location-based search, skill and certification filtering, availability management, online booking, and two-way ratings.",
      },
      {
        q: "What results did Heartland achieve?",
        a: "40% faster insurance claim processing, a 60% reduction in manual administrative work, and a 3x increase in technician bookings, with 4.8/5 average customer satisfaction.",
      },
    ],
  },
  {
    slug: "calonex",
    nm: "Calonex",
    cl: "End-to-End Property Management & Real Estate Operations Platform for United states.",
    metaTitle: "Calonex: US Property Management Platform Case Study",
    h1: "Calonex: US Property Management Platform",
    co: "USA",
    ic: "🇺🇸",
    stat: "United States",
    clr: "#4F46E5",
    logo: "/logos/calonex-logo.svg",
    industry: "PropTech · Real Estate",
    year: "Live",
    highlight:
      "End-to-End Property Management & Real Estate Operations Platform for United states.",
    metaDesc:
      "Calonex runs full US property management on Nipige: listings, tenant applications, rent collection, and maintenance, with a reported 60% faster onboarding.",
    challenge:
      `As Calonex expanded its customer base, managing the complete property lifecycle through disconnected applications and manual processes became increasingly difficult. Property managers required a modern platform capable of automating daily operations while delivering a seamless digital experience for both property owners and tenants.

The primary challenges included:
• Multiple disconnected systems for leasing, accounting, maintenance, and tenant communication
• Manual tenant onboarding and lease administration
• Time-consuming rent collection and payment reconciliation
• Limited visibility into property performance and financial reporting
• Inefficient maintenance request tracking
• Lack of centralized document management
• Difficulty scaling operations across multiple property portfolios
• Increasing customer expectations for self-service and mobile accessibility`,
    solution:
      `Nipige partnered with Calonex to design and develop a scalable cloud-based property management platform that digitizes the complete rental property lifecycle.

The solution unified property operations, tenant engagement, financial management, and maintenance workflows into a single intelligent platform accessible by property owners, managers, tenants, and service providers.

Centralized Property Management
A comprehensive dashboard enabling administrators to manage multiple properties, units, leases, tenants, maintenance requests, and financial transactions from one centralized workspace.

Digital Leasing & Tenant Management
A fully digital leasing workflow supporting online applications, tenant verification, lease generation, document management, electronic signatures, and move-in processes.

Online Payments & Financial Management
An integrated payment platform allowing tenants to securely pay rent online while automating invoicing, payment reconciliation, owner settlements, and financial reporting.

Maintenance Management Portal
A workflow-driven maintenance solution allowing tenants to submit service requests, assign vendors, track progress, upload photos, and receive real-time updates until completion.

Owner & Tenant Self-Service Portals
Dedicated portals providing secure access to leases, payment history, maintenance requests, financial statements, notifications, and communication with property managers.

Reporting & Business Intelligence
Interactive dashboards delivering insights into occupancy rates, rental income, maintenance costs, lease renewals, delinquency trends, and overall portfolio performance.`,
    results: [
      { v: "60%", l: "Reduced tenant onboarding time" },
      { v: "End-to-end", l: "Digital lease workflows" },
      { v: "Unified", l: "Property operations platform" },
    ],
    story: [
      {
        h: "What is the client about?",
        b: "Calonex is a cloud-based property management platform that simplifies the way landlords, property managers, brokers, and tenants manage residential and commercial rental properties. The platform provides an integrated digital ecosystem for property listings, tenant screening, lease management, rent collection, maintenance requests, accounting, and communication, helping property owners manage their portfolios efficiently from a single platform.",
      },
      {
        h: "What was the client's challenge?",
        b: `As Calonex expanded its customer base, managing the complete property lifecycle through disconnected applications and manual processes became increasingly difficult. Property managers required a modern platform capable of automating daily operations while delivering a seamless digital experience for both property owners and tenants.

The primary challenges included:
• Multiple disconnected systems for leasing, accounting, maintenance, and tenant communication
• Manual tenant onboarding and lease administration
• Time-consuming rent collection and payment reconciliation
• Limited visibility into property performance and financial reporting
• Inefficient maintenance request tracking
• Lack of centralized document management
• Difficulty scaling operations across multiple property portfolios
• Increasing customer expectations for self-service and mobile accessibility`,
      },
      {
        h: "What did Nipige build?",
        b: `Nipige partnered with Calonex to design and develop a scalable cloud-based property management platform that digitizes the complete rental property lifecycle.

The solution unified property operations, tenant engagement, financial management, and maintenance workflows into a single intelligent platform accessible by property owners, managers, tenants, and service providers.

Centralized Property Management
A comprehensive dashboard enabling administrators to manage multiple properties, units, leases, tenants, maintenance requests, and financial transactions from one centralized workspace.

Digital Leasing & Tenant Management
A fully digital leasing workflow supporting online applications, tenant verification, lease generation, document management, electronic signatures, and move-in processes.

Online Payments & Financial Management
An integrated payment platform allowing tenants to securely pay rent online while automating invoicing, payment reconciliation, owner settlements, and financial reporting.

Maintenance Management Portal
A workflow-driven maintenance solution allowing tenants to submit service requests, assign vendors, track progress, upload photos, and receive real-time updates until completion.

Owner & Tenant Self-Service Portals
Dedicated portals providing secure access to leases, payment history, maintenance requests, financial statements, notifications, and communication with property managers.

Reporting & Business Intelligence
Interactive dashboards delivering insights into occupancy rates, rental income, maintenance costs, lease renewals, delinquency trends, and overall portfolio performance.`,
      },
      {
        h: "How did Nipige solve it and what was the solution offered?",
        b: `Nipige approached the engagement as a complete digital transformation initiative focused on automating property management operations while enhancing user experience.

The platform was engineered using a modern cloud-native architecture that supports secure multi-property management, high availability, and future scalability.

Key solution components included:
• Enterprise-grade cloud architecture
• Multi-property management platform
• Role-based access control for owners, managers, tenants, and vendors
• Automated lease lifecycle management
• Digital document storage and management
• Secure online rent payment integration
• Automated billing and payment reconciliation
• Maintenance workflow automation
• Real-time notifications via email, SMS, and in-app messaging
• Advanced reporting and business analytics
• Mobile-responsive experience across all user roles

The implementation followed an agile development methodology, enabling continuous feedback from stakeholders and incremental feature delivery while minimizing disruption to existing business operations.`,
      },
      {
        h: "What business results were achieved?",
        b: `The Calonex platform significantly improved operational efficiency by replacing manual processes with intelligent workflow automation while providing a superior digital experience for property owners and tenants.

Measurable Business Outcomes
• Reduced tenant onboarding time by approximately 60%
• Accelerated lease processing through end-to-end digital workflows
• Improved rent collection efficiency with automated online payments
• Reduced administrative workload through workflow automation
• Faster maintenance request resolution through centralized tracking
• Increased transparency across property operations
• Improved financial reporting accuracy and operational visibility
• Enhanced tenant satisfaction through self-service capabilities
• Scalable platform supporting growing property portfolios without increasing operational complexity

Founders looking to build a real estate marketplace with similar tenant, owner, and payment workflows can start from Nipige's real estate template.`,
        link: { anchor: "build a real estate marketplace", href: "/solutions/realestate" },
      },
      {
        h: "Value Delivered by Nipige",
        b: `Through product strategy, user-centric design, cloud architecture, and full-stack development, Nipige helped Calonex modernize property management with a secure, scalable, and intelligent digital platform.

The platform now enables:
• Centralized property portfolio management
• Digital leasing and tenant lifecycle automation
• Secure online payment processing
• Automated maintenance management
• Real-time operational visibility
• Improved tenant engagement
• Better financial control and reporting
• Scalable cloud infrastructure for future business growth

Today, Calonex provides property owners, managers, tenants, and service providers with a unified property management ecosystem that simplifies operations, improves customer experience, and supports long-term growth.`,
      },
    ],
    features: [
      "Enterprise-grade cloud architecture",
      "Multi-property management platform",
      "Role-based access control for owners, managers, tenants, and vendors",
      "Automated lease lifecycle management",
      "Digital document storage and management",
      "Secure online rent payment integration",
      "Automated billing and payment reconciliation",
      "Maintenance workflow automation",
      "Real-time notifications via email, SMS, and in-app messaging",
      "Advanced reporting and business analytics",
      "Mobile-responsive experience across all user roles",
    ],
    feedback: [
      "Calonex has transformed the way we manage our rental portfolio. From tenant onboarding and lease management to rent collection and maintenance tracking, every process is now streamlined within a single platform. The automation has significantly reduced manual work and improved operational efficiency. — Senior Property Manager",
      "Our tenants appreciate the convenience of paying rent online, accessing lease documents, and submitting maintenance requests through one portal. The overall experience has improved tremendously, resulting in faster response times and higher customer satisfaction. — Director of Property Operations",
    ],
    faqs: [
      {
        q: "What problem did Calonex need to solve?",
        a: "Calonex was managing the full property lifecycle through disconnected applications and manual processes, with tenant onboarding, rent collection, and maintenance tracking all living in separate systems with no unified visibility.",
      },
      {
        q: "What did Nipige build for Calonex?",
        a: "A cloud-based property management platform unifying centralized property management, digital leasing and tenant management, online payments, a maintenance management portal, and owner and tenant self-service portals.",
      },
      {
        q: "How does rent collection and payment reconciliation work?",
        a: "Tenants pay rent securely online while the platform automates invoicing, payment reconciliation, and owner settlements, with real-time financial reporting.",
      },
      {
        q: "What results did Calonex achieve?",
        a: "Tenant onboarding time dropped by about 60%, with end-to-end digital lease workflows and a unified property operations platform replacing the previous disconnected tools.",
      },
    ],
  },
  {
    slug: "fastforge",
    nm: "FastForge",
    cl: "AI-Powered Multi-Vendor Commerce Platform for Modern Retail Businesses",
    metaTitle: "FastForge: AI Multi-Vendor Commerce",
    h1: "FastForge: AI Multi-Vendor Commerce",
    co: "USA",
    ic: "🇺🇸",
    stat: "2,000+ Orders/day",
    clr: "#7C3AED",
    logo: "/logos/fastforge-logo.png",
    industry: "AI · Marketplace",
    year: "Live",
    highlight:
      "FastForge: AI-Powered Multi-Vendor Commerce Platform for Modern Retail Businesses",
    metaDesc:
      "FastForge runs 2,000+ orders a day on Nipige's multi-vendor commerce platform, with a reported 98% on-time delivery and 74% year-over-year revenue growth.",
    challenge:
      "As FastForge expanded its marketplace ecosystem, managing multiple vendors, stores, inventory, and order fulfilment became increasingly complex. Existing systems relied on disconnected tools and manual processes, resulting in operational inefficiencies, delayed deliveries, limited inventory visibility, and increasing operational costs.",
    solution:
      "Nipige enabled FastForge to design and develop an enterprise-grade, AI-powered multi-vendor commerce platform that unifies marketplace operations through a single intelligent dashboard. The solution combines automation, artificial intelligence, predictive analytics, and real-time integrations to simplify marketplace management while delivering seamless experiences for administrators, vendors, delivery partners, and customers.",
    results: [
      { v: "2,000+", l: "Orders / Day" },
      { v: "98%", l: "On-Time Delivery" },
      { v: "+74%", l: "Revenue YoY" },
    ],
    story: [
      {
        h: "What is the client about?",
        b: `FastForge is an AI-powered commerce platform that enables businesses to launch and manage branded digital storefronts without complex development. Designed for retailers, franchise networks, and multi-vendor marketplaces, the platform helps businesses rapidly create scalable online commerce experiences while centralizing operations across multiple stores, vendors, and locations.`,
      },
      {
        h: "What was the client's challenge?",
        b: `As FastForge expanded its marketplace ecosystem, managing multiple vendors, stores, inventory, and order fulfilment became increasingly complex. Existing systems relied on disconnected tools and manual processes, resulting in operational inefficiencies, delayed deliveries, limited inventory visibility, and increasing operational costs.

The key challenges included:

- Managing 50+ vendor stores across multiple cities from disconnected systems
- Manual order assignment causing delivery delays
- Lack of real-time inventory synchronization across vendors
- Limited visibility into vendor performance and operational KPIs
- Inefficient commission management and settlement processes
- Difficulty forecasting demand and planning inventory
- Need for a scalable platform capable of supporting rapid business growth`,
      },
      {
        h: "What did Nipige build?",
        b: `Nipige enabled FastForge to design and develop an enterprise-grade, AI-powered multi-vendor commerce platform that unifies marketplace operations through a single intelligent dashboard.

The solution combines automation, artificial intelligence, predictive analytics, and real-time integrations to simplify marketplace management while delivering seamless experiences for administrators, vendors, delivery partners, and customers.`,
      },
      {
        h: "The platform includes:",
        b: `Centralized Marketplace Management

A unified administration portal for managing vendors, products, orders, inventory, commissions, and business performance across multiple locations.

AI-Powered Order Dispatch

An intelligent dispatch engine that automatically assigns incoming orders to the most suitable vendor based on location, capacity, inventory availability, SLA commitments, and historical performance.

Real-Time Inventory Management

A synchronized inventory system that continuously updates stock levels across all connected vendors, preventing overselling and improving product availability.

Vendor Self-Service Portal

A dedicated workspace where vendors can independently manage products, inventory, orders, commissions, settlements, and business performance.

Customer Order Tracking

Real-time order tracking with accurate delivery estimates, automated notifications, and continuous order status updates throughout the fulfilment journey.

Business Intelligence & Analytics

Interactive dashboards providing operational insights into sales performance, vendor productivity, order trends, inventory health, and customer demand patterns.`,
      },
      {
        h: "How did Nipige solve it?",
        b: `Nipige enlisted the engagement for a complete digital transformation initiative rather than a traditional software implementation.

We developed a cloud-native, API-first architecture built on containerized microservices, enabling every business function to operate independently while remaining fully integrated.

Key elements of the solution included:

- Enterprise-grade multi-vendor marketplace architecture
- AI-powered automated order dispatch engine
- Real-time inventory synchronization across all stores
- Predictive demand forecasting using machine learning
- GPS-enabled delivery tracking with intelligent ETA prediction
- Seamless integrations with WhatsApp Business API, Google Maps, and vendor POS systems
- Automated commission calculation and settlement workflows
- Centralized monitoring dashboard for business administrators
- Mobile applications for delivery personnel and vendors
- Scalable cloud infrastructure designed to support future expansion

The implementation followed a phased rollout strategy, beginning with pilot vendors before scaling to full production, ensuring minimal disruption while validating platform performance at every stage.`,
      },
      {
        h: "Business Outcomes with Nipige.",
        b: `The FastForge platform significantly improved operational efficiency while enabling rapid business growth through intelligent automation.

Measurable Business Outcomes

- Successfully centralized operations for 50+ vendor stores
- Enabled management of 2,000+ orders every day across five cities
- Improved on-time delivery performance from 92% to 98%
- Reduced average delivery costs by 28%
- Lowered inventory holding costs by 29%
- Reduced manual order processing time from 45 minutes to just 120 seconds
- Achieved 99.2% automated order assignment accuracy
- Increased vendor commission accuracy to 99.8%
- Generated approximately ₹3.3 Crore in annual operational savings
- Improved vendor adoption to 98% within two months of launch
- Supported 74% year-over-year revenue growth through scalable marketplace operations

Teams that want to build a multi-vendor services marketplace with the same automation and vendor management can start from Nipige's services template.`,
        link: { anchor: "build a multi-vendor services marketplace", href: "/solutions/services" },
      },
      {
        h: "Nipige as a Value partner",
        b: `Through AI, cloud-native architecture, and intelligent workflow automation, Nipige transformed FastForge into a scalable, enterprise-ready commerce platform capable of supporting rapid marketplace growth.

The platform now enables:

- AI-driven marketplace automation
- Centralized multi-vendor operations
- Intelligent order orchestration
- Real-time inventory visibility
- Predictive demand planning
- Faster order fulfilment
- Reduced operational costs
- Data-driven business decisions
- Scalable expansion across new cities and vendor networks

Today, FastForge serves as a modern AI-powered commerce ecosystem that empowers businesses to efficiently manage multi-vendor operations, automate critical workflows, and deliver exceptional customer experiences from a single unified platform.`,
      },
    ],
    features: [],
    metrics: [],
    tech: [],
    faqs: [
      {
        q: "What problem did FastForge need to solve?",
        a: "FastForge was managing 50+ vendor stores across multiple cities through disconnected systems and manual processes - causing delivery delays, poor inventory visibility, and rising operational costs as the marketplace grew.",
      },
      {
        q: "What did Nipige build for FastForge?",
        a: "An enterprise-grade, AI-powered multi-vendor commerce platform that unifies marketplace operations in a single dashboard - combining automation, predictive analytics, and real-time integrations for admins, vendors, delivery partners, and customers.",
      },
      {
        q: "How does the AI-powered order dispatch work?",
        a: "An intelligent dispatch engine automatically assigns each incoming order to the most suitable vendor based on location, capacity, inventory availability, SLA commitments, and historical performance.",
      },
      {
        q: "What results did FastForge achieve?",
        a: "2,000+ orders managed daily across five cities, on-time delivery improved from 92% to 98%, delivery costs down 28%, and 74% year-over-year revenue growth.",
      },
    ],
  },
  {
    slug: "lions-cricket",
    nm: "Lions Cricket",
    cl: "Digital Cricket Management & Fan Engagement Platform",
    metaTitle: "Lions Cricket: Fan Engagement Platform Case Study",
    h1: "Lions Cricket: Fan Engagement Platform",
    co: "South Africa",
    ic: "🇿🇦",
    stat: "South Africa",
    clr: "#EC4899",
    logo: "/logos/lionsapp-logo.svg",
    industry: "Sports · Cricket",
    year: "Live",
    highlight:
      "Digital Cricket Management & Fan Engagement Platform",
    metaDesc:
      "Lions Cricket runs a unified fan-engagement platform on Nipige, connecting players, fans, clubs, sponsors, and administrators across South African cricket.",
    challenge:
      `As Lions Cricket expanded its digital presence and community engagement initiatives, managing cricket operations through multiple disconnected systems became increasingly complex. The organization required a modern digital platform capable of serving players, fans, clubs, sponsors, administrators, and partners through a unified online experience.

The key challenges included:
• Managing professional and grassroots cricket information across multiple platforms
• Delivering real-time fixtures, results, and league updates
• Limited fan engagement and digital interaction
• Manual content publishing and news management
• Difficulty promoting tournaments, events, and community initiatives
• Multiple stakeholders requiring different levels of platform access
• Lack of centralized administration for website content and media assets
• Need for a scalable platform supporting future digital initiatives`,
    solution:
      `Nipige partnered with Lions Cricket to design and develop a modern digital platform that centralizes cricket operations, enhances fan engagement, and simplifies content management.

The solution provides a unified digital experience for supporters, players, clubs, sponsors, media, and administrators while strengthening Lions Cricket's online presence.

Official Cricket Portal
A modern website showcasing fixtures, match results, league standings, player information, club updates, tournaments, and organizational news through an intuitive user experience.

Content Management Platform
A centralized administration system enabling staff to publish news articles, match reports, videos, image galleries, announcements, and sponsorship content without technical expertise.

Fixtures & Results Management
An integrated module providing live fixtures, match schedules, results, league tables, and tournament information across multiple competitions.

Fan Engagement Platform
A digital experience that enables supporters to access the latest news, videos, player information, ticketing information, and community initiatives from any device.

Sponsor & Partnership Showcase
A dedicated platform highlighting commercial partners, sponsorship programs, community initiatives, and corporate collaborations.

Media & Digital Communications
An integrated media center supporting multimedia content, newsletters, announcements, and ongoing communication with the cricket community.`,
    results: [
      { v: "Unified", l: "Digital cricket platform" },
      { v: "Real-time", l: "Fixtures & results" },
      { v: "Modern", l: "Fan engagement" },
    ],
    story: [
      {
        h: "What is the client about?",
        b: "Lions Cricket is one of South Africa's leading domestic cricket organizations, responsible for managing professional and amateur cricket across the Central Gauteng region. The organization oversees competitive leagues, club cricket, youth development, women's cricket, blind and deaf cricket programs, while operating the iconic DP World Wanderers Stadium in Johannesburg. Through its professional teams and grassroots initiatives, Lions Cricket is committed to developing cricket talent and growing the sport across South Africa.",
      },
      {
        h: "What was the client's challenge?",
        b: `As Lions Cricket expanded its digital presence and community engagement initiatives, managing cricket operations through multiple disconnected systems became increasingly complex. The organization required a modern digital platform capable of serving players, fans, clubs, sponsors, administrators, and partners through a unified online experience.

The key challenges included:
• Managing professional and grassroots cricket information across multiple platforms
• Delivering real-time fixtures, results, and league updates
• Limited fan engagement and digital interaction
• Manual content publishing and news management
• Difficulty promoting tournaments, events, and community initiatives
• Multiple stakeholders requiring different levels of platform access
• Lack of centralized administration for website content and media assets
• Need for a scalable platform supporting future digital initiatives`,
      },
      {
        h: "What did Nipige build?",
        b: `Nipige partnered with Lions Cricket to design and develop a modern digital platform that centralizes cricket operations, enhances fan engagement, and simplifies content management.

The solution provides a unified digital experience for supporters, players, clubs, sponsors, media, and administrators while strengthening Lions Cricket's online presence.

Official Cricket Portal
A modern website showcasing fixtures, match results, league standings, player information, club updates, tournaments, and organizational news through an intuitive user experience.

Content Management Platform
A centralized administration system enabling staff to publish news articles, match reports, videos, image galleries, announcements, and sponsorship content without technical expertise.

Fixtures & Results Management
An integrated module providing live fixtures, match schedules, results, league tables, and tournament information across multiple competitions.

Fan Engagement Platform
A digital experience that enables supporters to access the latest news, videos, player information, ticketing information, and community initiatives from any device.

Sponsor & Partnership Showcase
A dedicated platform highlighting commercial partners, sponsorship programs, community initiatives, and corporate collaborations.

Media & Digital Communications
An integrated media center supporting multimedia content, newsletters, announcements, and ongoing communication with the cricket community.`,
      },
      {
        h: "How did Nipige solve it and what solution was given?",
        b: `Nipige approached the engagement as a comprehensive digital modernization initiative designed to improve operational efficiency while delivering an engaging online experience for the cricket community.

The platform was developed using a scalable content-driven architecture capable of supporting continuous updates throughout the cricket season.

Key solution components included:
• Responsive website optimized for desktop, tablet, and mobile devices
• Enterprise Content Management System (CMS)
• Dynamic fixtures and results management
• Player and team profile management
• News, blogs, and multimedia publishing
• Sponsor and partner management
• Search engine optimized architecture
• Secure role-based administration portal
• Performance-optimized cloud hosting
• Scalable infrastructure supporting future digital services

The solution enables Lions Cricket's communications team to publish updates quickly while ensuring supporters always have access to accurate and up-to-date information.`,
      },
      {
        h: "What business results were achieved?",
        b: `The new digital platform significantly improved Lions Cricket's ability to communicate with its community while streamlining website administration and enhancing the overall user experience.

Measurable Business Outcomes
• Centralized digital management for cricket operations and communications
• Faster publishing of fixtures, match reports, and news updates
• Improved fan engagement through a modern user experience
• Enhanced visibility for sponsors and commercial partners
• Streamlined website administration through an intuitive CMS
• Increased accessibility across desktop and mobile devices
• Stronger digital presence supporting community and grassroots initiatives
• Scalable platform supporting future tournaments and organizational growth`,
      },
      {
        h: "Value Delivered by Nipige",
        b: `Through digital strategy, user experience design, and enterprise web development, Nipige helped Lions Cricket modernize its online presence with a scalable platform that supports professional cricket operations, community engagement, and long-term organizational growth.

The platform now enables:
• Centralized cricket content management
• Real-time fixtures and results publishing
• Enhanced supporter engagement
• Simplified website administration
• Improved sponsor visibility
• Mobile-first digital experiences
• Scalable architecture for future digital initiatives
• Stronger brand presence across the cricket ecosystem

Today, Lions Cricket's digital platform serves as the organization's primary communication hub, connecting players, clubs, supporters, sponsors, and the wider cricket community through a modern, engaging, and future-ready online experience.`,
      },
    ],
    features: [
      "Responsive website optimized for desktop, tablet, and mobile devices",
      "Enterprise Content Management System (CMS)",
      "Dynamic fixtures and results management",
      "Player and team profile management",
      "News, blogs, and multimedia publishing",
      "Sponsor and partner management",
      "Search engine optimized architecture",
      "Secure role-based administration portal",
      "Performance-optimized cloud hosting",
      "Scalable infrastructure supporting future digital services",
    ],
    feedback: [
      "Nipige delivered a digital platform that truly represents our vision for modern cricket administration. The new website makes it easier for supporters, players, clubs, and partners to access the information they need while giving our internal team complete control over content management. — Executive Management, Lions Cricket",
      "The new platform has significantly improved how we communicate with our cricket community. Publishing match updates, fixtures, news, and media content is now faster, more efficient, and provides a much better experience for our supporters. — Communications & Digital Media Team",
    ],
    faqs: [
      {
        q: "What problem did Lions Cricket need to solve?",
        a: "Lions Cricket was managing professional and grassroots cricket operations across multiple disconnected systems, with no unified way to serve players, fans, clubs, sponsors, and administrators online.",
      },
      {
        q: "What did Nipige build for Lions Cricket?",
        a: "A digital platform combining an official cricket portal, a content management system, fixtures and results management, a fan engagement platform, and a sponsor and partnership showcase.",
      },
      {
        q: "Who uses the Lions Cricket platform?",
        a: "Supporters, players, clubs, sponsors, media, and administrators. The organization runs competitive leagues, club cricket, youth development, and women's cricket across the Central Gauteng region, including the DP World Wanderers Stadium.",
      },
      {
        q: "What did the platform deliver for Lions Cricket?",
        a: "A unified digital cricket platform with real-time fixtures and results, plus a modern fan engagement experience replacing multiple disconnected systems.",
      },
    ],
  },
  {
    slug: "lirs-tax-system",
    nm: "LIRS eTax",
    cl: "Enterprise Digital Tax Administration Platform for Government Revenue Services",
    metaTitle: "LIRS eTax: Government Tax Platform, Lagos State",
    h1: "LIRS eTax: Government Tax Platform, Lagos State",
    co: "Nigeria",
    ic: "🇳🇬",
    stat: "Nigeria",
    clr: "#D97706",
    logo: "/logos/lirs-logo.svg",
    industry: "GovTech · Taxation",
    year: "Live",
    highlight:
      "Enterprise Digital Tax Administration Platform for Government Revenue Services",
    metaDesc:
      "LIRS eTax digitizes tax administration for Lagos State on Nipige: taxpayer registration, filing, payments, and compliance at government scale.",
    challenge:
      `As one of Africa's largest state tax authorities, LIRS needed to replace traditional, paper-based tax administration processes with a secure, scalable, and citizen-friendly digital platform capable of handling millions of transactions while improving operational efficiency and taxpayer compliance.

The primary challenges included:
• Manual taxpayer registration and verification processes
• Time-consuming tax return filing and payment procedures
• Fragmented systems for tax assessments, payments, and reporting
• Limited visibility into taxpayer records and compliance status
• High administrative workload for tax officers
• Difficulty managing growing taxpayer volumes
• Need for secure online document submission and payment processing
• Requirement for a scalable platform supporting future tax reforms and digital government initiatives`,
    solution:
      `Nipige partnered with LIRS to design and develop a secure enterprise-grade digital tax administration platform that digitizes the complete taxpayer lifecycle.

The platform provides a unified experience for taxpayers, employers, tax consultants, financial institutions, and government administrators through a centralized online portal.

Digital Taxpayer Registration
A secure onboarding system enabling individuals and organizations to register online, obtain unique taxpayer identification, and manage their tax profiles.

Online Tax Filing & Returns
A comprehensive self-service portal allowing taxpayers to prepare, submit, and track annual tax returns while reducing manual paperwork and processing time.

Digital Payments & Bill Generation
An integrated payment platform supporting electronic bill generation, secure tax payments, digital receipts, and payment history management.

Compliance & Assessment Management
A centralized module enabling taxpayers to review assessments, receive notifications, submit supporting documents, monitor outstanding liabilities, and manage compliance activities.

Government Administration Portal
A role-based administration platform allowing tax officers to manage taxpayer records, assessments, audits, approvals, reporting, and operational workflows.

Analytics & Revenue Intelligence
Executive dashboards providing real-time insights into tax collections, taxpayer registrations, filing trends, payment performance, compliance rates, and operational KPIs.`,
    results: [
      { v: "End-to-end", l: "Digital taxpayer services" },
      { v: "Automated", l: "Tax filing & payment workflows" },
      { v: "Real-time", l: "Compliance & reporting" },
    ],
    story: [
      {
        h: "What is the client about?",
        b: "Lagos State Internal Revenue Service (LIRS) is the government agency responsible for administering and collecting taxes within Lagos State, Nigeria. To modernize tax administration and improve taxpayer services, LIRS introduced the eTax platform, a comprehensive digital solution that enables individuals, businesses, employers, and tax consultants to manage tax-related activities online, including taxpayer registration, tax return filing, bill generation, payments, assessments, and compliance reporting.",
      },
      {
        h: "What was the client's challenge?",
        b: `As one of Africa's largest state tax authorities, LIRS needed to replace traditional, paper-based tax administration processes with a secure, scalable, and citizen-friendly digital platform capable of handling millions of transactions while improving operational efficiency and taxpayer compliance.

The primary challenges included:
• Manual taxpayer registration and verification processes
• Time-consuming tax return filing and payment procedures
• Fragmented systems for tax assessments, payments, and reporting
• Limited visibility into taxpayer records and compliance status
• High administrative workload for tax officers
• Difficulty managing growing taxpayer volumes
• Need for secure online document submission and payment processing
• Requirement for a scalable platform supporting future tax reforms and digital government initiatives`,
      },
      {
        h: "What did Nipige build?",
        b: `Nipige partnered with LIRS to design and develop a secure enterprise-grade digital tax administration platform that digitizes the complete taxpayer lifecycle.

The platform provides a unified experience for taxpayers, employers, tax consultants, financial institutions, and government administrators through a centralized online portal.

Digital Taxpayer Registration
A secure onboarding system enabling individuals and organizations to register online, obtain unique taxpayer identification, and manage their tax profiles.

Online Tax Filing & Returns
A comprehensive self-service portal allowing taxpayers to prepare, submit, and track annual tax returns while reducing manual paperwork and processing time.

Digital Payments & Bill Generation
An integrated payment platform supporting electronic bill generation, secure tax payments, digital receipts, and payment history management.

Compliance & Assessment Management
A centralized module enabling taxpayers to review assessments, receive notifications, submit supporting documents, monitor outstanding liabilities, and manage compliance activities.

Government Administration Portal
A role-based administration platform allowing tax officers to manage taxpayer records, assessments, audits, approvals, reporting, and operational workflows.

Analytics & Revenue Intelligence
Executive dashboards providing real-time insights into tax collections, taxpayer registrations, filing trends, payment performance, compliance rates, and operational KPIs.`,
      },
      {
        h: "How did Nipige solve it and what was the solution delivered?",
        b: `Nipige approached the engagement as a large-scale digital government transformation initiative focused on improving taxpayer experience while modernizing tax administration.

The platform was engineered using a secure, cloud-ready enterprise architecture designed to support high transaction volumes, regulatory compliance, and long-term scalability.

Key solution components included:
• Enterprise tax administration platform
• Secure taxpayer identity and authentication
• End-to-end digital tax filing workflows
• Automated bill generation and payment processing
• Electronic document management
• Real-time notifications through email and SMS
• Role-based access control for government administrators
• API integrations with payment gateways and external government systems
• Centralized reporting and compliance monitoring
• Scalable architecture supporting continuous platform enhancements

The implementation followed an incremental rollout strategy, allowing critical tax services to be digitized while ensuring uninterrupted operations and smooth adoption across taxpayers and internal government teams.`,
      },
      {
        h: "What business results were achieved?",
        b: `The eTax platform transformed tax administration by replacing manual processes with secure digital services, improving operational efficiency for LIRS while making tax compliance faster and more convenient for taxpayers.

Measurable Business Outcomes:
• Successfully digitized end-to-end taxpayer services through a single online platform
• Significantly reduced manual paperwork and administrative processing
• Accelerated taxpayer registration and digital onboarding
• Streamlined online tax return filing and payment workflows
• Improved transparency through real-time taxpayer account access
• Enhanced operational efficiency for tax administration teams
• Reduced processing times through workflow automation
• Increased accessibility through secure web and mobile-friendly services
• Established a scalable digital foundation for future government tax initiatives`,
      },
      {
        h: "Value Delivered by Nipige",
        b: `Through enterprise architecture, secure application development, workflow automation, and digital government expertise, Nipige helped modernize tax administration with a scalable, citizen-centric platform.

The platform now enables:
• End-to-end digital tax administration
• Secure taxpayer self-service
• Automated tax filing and payment workflows
• Centralized compliance management
• Real-time operational reporting
• Improved government service delivery
• Enhanced transparency and accountability
• Scalable infrastructure supporting future digital transformation

Today, the LIRS eTax platform serves as a modern digital tax administration ecosystem, enabling efficient revenue management while delivering faster, more accessible, and transparent tax services for individuals, businesses, and government stakeholders across Lagos State.`,
      },
    ],
    features: [
      "Enterprise tax administration platform",
      "Secure taxpayer identity and authentication",
      "End-to-end digital tax filing workflows",
      "Automated bill generation and payment processing",
      "Electronic document management",
      "Real-time email and SMS notifications",
      "Role-based access control",
      "API integrations with payment gateways and government systems",
      "Centralized reporting and compliance monitoring",
      "Scalable cloud-ready enterprise architecture",
    ],
    feedback: [
      "Nipige delivered a secure and scalable digital platform that has transformed the way we manage tax administration. The solution has simplified taxpayer services, improved operational efficiency, and provided the flexibility needed to support our ongoing digital transformation initiatives. — Senior Revenue Administration Executive",
      "The platform provides taxpayers with a seamless digital experience, from registration and tax filing to payments and compliance management. Automation has significantly reduced manual effort while improving service delivery across the organization. — Digital Transformation Program Manager",
    ],
    faqs: [
      {
        q: "What problem did LIRS need to solve?",
        a: "LIRS needed to replace paper-based tax administration with a secure, scalable, citizen-friendly digital platform capable of handling millions of transactions, since manual registration, filing, and assessment processes were creating operational bottlenecks.",
      },
      {
        q: "What did Nipige build for LIRS?",
        a: "An enterprise-grade digital tax administration platform covering digital taxpayer registration, online tax filing and returns, digital payments and bill generation, compliance and assessment management, and a government administration portal.",
      },
      {
        q: "Who uses the LIRS eTax platform?",
        a: "Taxpayers, employers, tax consultants, financial institutions, and government administrators, all through one centralized online portal.",
      },
      {
        q: "What did the platform deliver for LIRS?",
        a: "End-to-end digital taxpayer services, automated tax filing and payment workflows, and real-time compliance and reporting for one of Africa's largest state tax authorities.",
      },
    ],
  },
  {
    slug: "teka",
    nm: "Teka",
    cl: "Multi-Market Hyperlocal",
    co: "India",
    ic: "🇮🇳",
    stat: "10L+ Shoppers",
    clr: "#059669",
    logo: "/logos/teka-logo.svg",
    industry: "Hyperlocal Commerce",
    year: "Live",
    highlight:
      "Offline-to-online hyperlocal commerce with a one-of-a-kind cashback engine - serving 10 lakh+ shoppers and 15,000+ business partners.",
    h1: "Teka: Multi-Market Hyperlocal Commerce",
    metaDesc:
      "Teka runs an offline-to-online hyperlocal marketplace on Nipige, reaching a reported 1M+ shoppers and 15,000+ partners across India with 0% platform fees.",
    challenge:
      "Local merchants across India lacked a way to take their offline business online and keep customers coming back. Teka wanted a single platform - e-commerce, sales, service, and channel partners - with a cashback model that drives loyalty for both shoppers and merchants.",
    solution:
      "As technical partner, Trigital built and operates Teka's entire cloud platform - e-commerce, sales, service, and channel-partner systems - on a multi-cloud (AWS + GCP) Kubernetes cluster running 120+ containers, engineered to scale from India to a billion-customer global market.",
    results: [
      { v: "10L+", l: "Shoppers" },
      { v: "15,000+", l: "Business Partners" },
      { v: "120+", l: "Containers" },
    ],
    story: [
      {
        h: "Project Overview",
        b: "Teka is a unique social-engineering business with an offline-to-online-to-offline (B2B2C) hybrid model that brings offline merchants online and grows their sales. Merchants, traders, manufacturers, and distributors can all sell their products and services to Teka's customers.",
      },
      {
        h: "The Cashback Difference",
        b: "Teka runs a cashback system that is one of its kind in the world: every customer purchase earns a scratch-card discount and an assured cashback. The result is unique benefits for 10 lakh+ shoppers nationwide and innovative retention programs tied to 15,000+ business partners - shoppers earn cashback and shopping points, while merchants attract more customers.",
      },
      {
        h: "The Trigital Solution",
        b: "As technical partner, Trigital developed and manages the entire IT application - e-commerce, sales, service, and channel partner - and built a complete cloud-based system planned to scale from India to the global market with a billion-customer target. A multi-cloud platform (AWS & GCP) provides a highly scalable, trustworthy foundation, with a Kubernetes-based cluster running 120+ Docker containers. Founders who want to launch a hyperlocal delivery marketplace of their own can start from Nipige's Restaurant template.",
        link: { anchor: "launch a hyperlocal delivery marketplace", href: "/solutions/restaurant" },
      },
    ],
    feedback: [
      "Teka launches new capabilities 3× faster with innovative business ideas.",
      "One-stop IT partner for everything - development and management of the application and cloud services.",
      "Reduced management cost with a highly scalable solution.",
      "Zero IT headache.",
    ],
    tech: ["AWS", "Google Cloud", "Kubernetes", "Docker", "Microservices"],
    faqs: [
      {
        q: "What is Teka's business model?",
        a: "Teka runs an offline-to-online-to-offline (B2B2C) hybrid model that brings local merchants, traders, manufacturers, and distributors online, letting them sell to Teka's customer base through a single platform.",
      },
      {
        q: "How does Teka's cashback system work?",
        a: "Every customer purchase earns a scratch-card discount plus an assured cashback - a retention mechanic that's one of its kind. Shoppers earn cashback and shopping points, while merchants get repeat customers.",
      },
      {
        q: "What technology powers the Teka platform?",
        a: "Trigital built and operates Teka's entire cloud platform - e-commerce, sales, service, and channel-partner systems - on a multi-cloud (AWS + GCP) Kubernetes cluster running 120+ containers, engineered to scale from India to a global market.",
      },
      {
        q: "How many shoppers and merchants does Teka serve?",
        a: "10 lakh+ (1 million+) shoppers and 15,000+ business partners nationwide across India.",
      },
    ],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
