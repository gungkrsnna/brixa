export default {
  meta: {
    title: 'Bali Pro Dev | Website & App Development Studio',
    description:
      'Bali Pro Dev is a website & app development studio: company profile sites, online stores, web systems, and mobile apps. Custom-built, fast, and tailored to your business.',
  },

  nav: {
    home: 'Home',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About',
    contact: 'Contact',
  },

  whatsappFloating: {
    label: 'Chat on WhatsApp',
  },

  hero: {
    headlinePrefix: 'Websites & apps, built with ',
    headlineHighlight: 'precision.',
    paragraph:
      'Bali Pro Dev designs and builds digital products with a careful approach. Every detail considered, every line of code with a purpose. No templates, no shortcuts.',
    ctaPrimary: 'Start a Project',
    ctaSecondary: 'View Portfolio',
    marquee: [
      'Website Development',
      'Mobile Apps',
      'UI/UX Design',
      'Systems & Dashboards',
      'E-Commerce',
    ],
  },

  clients: {
    label: 'Trusted by some of the clients we’ve worked with',
  },

  services: {
    headingPrefix: 'Services we ',
    headingHighlight: 'take care of.',
    description:
      'Four areas where Bali Pro Dev most often helps clients, from simple company profile pages to complex custom systems.',
    items: [
      {
        slug: 'company-profile',
        title: 'Company Profile Website',
        description:
          'A corporate or personal website that builds credibility and branding in the digital space.',
        accent: 'bg-primary-600',
        detail: {
          intro:
            'A corporate website designed to build trust from the first visit: business profile, services, and portfolio laid out neatly in one place.',
          features: [
            'Custom design matched to your brand identity, not a template',
            'Fully responsive across desktop, tablet, and mobile',
            'Speed optimization & basic SEO so you’re easy to find',
            'Contact form & WhatsApp integration for leads straight to you',
          ],
        },
      },
      {
        slug: 'ecommerce',
        title: 'Online Store / E-Commerce',
        description:
          'A complete selling platform with a product catalog, cart, and integrated payments.',
        accent: 'bg-ink-900',
        detail: {
          intro:
            'A complete online selling platform, from product catalog to checkout, built so customers shop easily and you manage stock and orders just as easily.',
          features: [
            'Product catalog with categories, variants, and search',
            'Streamlined shopping cart and checkout flow',
            'Payment integration (bank transfer, e-wallet, or payment gateway)',
            'Admin dashboard to manage products, stock, and orders',
          ],
        },
      },
      {
        slug: 'web-app',
        title: 'Web Application / System',
        description:
          'Dashboards, management systems, or internal tools built to match your business workflow.',
        accent: 'bg-primary-800',
        detail: {
          intro:
            'A dashboard or internal system built custom around your business workflow, not generic software forced to fit.',
          features: [
            'Workflow analysis to design features that are actually useful',
            'Data, user, and access management tailored to your needs',
            'Reporting & data visualization to support decision-making',
            'Architecture ready for further development down the line',
          ],
        },
      },
      {
        slug: 'mobile-app',
        title: 'Mobile App',
        description:
          'Android & iOS apps, native or cross-platform, from concept through to store release.',
        accent: 'bg-primary-500',
        detail: {
          intro:
            'Android & iOS apps built from concept through to store release, with a smooth user experience on both platforms.',
          features: [
            'Cross-platform (Android & iOS) or native, depending on your needs',
            'UI/UX designed specifically for your app’s user flow',
            'API integration, notifications, and supporting backend features',
            'Guidance through release to Google Play & the App Store',
          ],
        },
      },
    ],
  },

  serviceDetail: {
    eyebrow: 'Service',
    backLabel: 'Back to home',
    featuresLabel: 'What you get',
    otherServicesLabel: 'Other services',
    ctaTitle: 'Interested in this service?',
    ctaDescription: 'Tell us about your project and we’ll help bring it to life.',
    ctaButton: 'Discuss Your Project',
    notFoundTitle: 'Service not found',
    notFoundDescription: 'The page you’re looking for may have moved.',
    notFoundCta: 'Back to home',
  },

  portfolio: {
    headingPrefix: 'The kind of projects we ',
    headingHighlight: 'usually build.',
    description:
      'Some of the project categories we work on most often, from company profile landing pages to complex custom systems.',
    items: [
      {
        slug: 'company-profile-website',
        title: 'Company Profile Website',
        category: 'Website',
        description: 'A company profile landing page with modern design and fast performance.',
        cover: 'profile',
        detail: {
          intro:
            'A company profile landing page with clear navigation, a hero that communicates the value proposition within seconds, and fast loading across every device.',
          highlights: [
            'Hero design with dual CTAs (primary & secondary) for maximum conversion',
            'Client logo strip to build trust from the first scroll',
            'A concise, scannable services/features section',
            'High performance scores thanks to optimized assets',
          ],
        },
      },
      {
        slug: 'ecommerce-platform',
        title: 'E-Commerce Platform',
        category: 'Online Store',
        description: 'A complete online selling system: product catalog, cart, and payments.',
        cover: 'commerce',
        detail: {
          intro:
            'An online selling system with an easy-to-browse product catalog, a short checkout flow, and a consistent look across desktop and mobile.',
          highlights: [
            'Product grid with prominent promo/discount indicators',
            'Search & category filters for navigating a large catalog',
            'A streamlined checkout flow to reduce cart abandonment',
            'Ready to integrate with a range of payment methods',
          ],
        },
      },
      {
        slug: 'internal-dashboard',
        title: 'Internal Dashboard & System',
        category: 'Web Application',
        description: 'Custom data-management tools for business operations.',
        cover: 'system',
        detail: {
          intro:
            'An internal dashboard for monitoring operational data in real time, with visualizations that make decisions easier.',
          highlights: [
            'Stat cards surfacing key metrics at a glance',
            'Chart visualizations to track trends over time',
            'A tidy sidebar navigation for many modules/menus',
            'A data structure ready to grow with new requirements',
          ],
        },
      },
      {
        slug: 'mobile-booking-app',
        title: 'Mobile Booking App',
        category: 'Mobile App',
        description: 'A cross-platform booking app for Android & iOS.',
        cover: 'mobile',
        detail: {
          intro:
            'A cross-platform booking app with a simple flow, from picking a schedule to confirmation.',
          highlights: [
            'A visual calendar/schedule for quickly picking a date',
            'A clear booking list showing the status of each order',
            'Bottom navigation for one-tap access to key features',
            'Designed cross-platform for Android & iOS',
          ],
        },
      },
    ],
  },

  portfolioDetail: {
    eyebrow: 'Portfolio',
    backLabel: 'Back to home',
    highlightsLabel: 'What was built',
    otherProjectsLabel: 'Other projects',
    ctaTitle: 'Want something similar?',
    ctaDescription: 'Tell us about your project and we’ll help bring it to life from scratch.',
    ctaButton: 'Discuss Your Project',
    notFoundTitle: 'Project not found',
    notFoundDescription: 'The page you’re looking for may have moved.',
    notFoundCta: 'Back to home',
  },

  about: {
    headingPrefix: 'We believe small details ',
    headingHighlight: 'make a big difference.',
    paragraph:
      'Bali Pro Dev is a digital development studio focused on quality, not quantity. Every project we take on gets the same approach: listen to your needs, design the right solution, then build it with clean code that’s ready to grow further.',
    principles: [
      {
        title: 'Custom, not templated',
        description:
          'Every line of code is written for your specific needs, not a modified template already used by hundreds of others.',
      },
      {
        title: 'Transparent communication',
        description:
          'You always know the project’s progress from start to finish. No "disappearing" mid-way through.',
      },
      {
        title: 'Flexible for any need',
        description:
          'From simple company profiles to complex systems, we adapt our approach to your business needs, not the other way around.',
      },
    ],
  },

  contact: {
    headingPrefix: 'Let’s start ',
    headingHighlight: 'your project.',
    paragraph:
      'Tell us what you need through the form, or reach us directly by email or WhatsApp.',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'name@email.com',
      messageLabel: 'Tell us about your project',
      messagePlaceholder: 'What kind of website do you need?',
      submit: 'Send Message',
    },
    mailSubjectPrefix: 'New project from',
    mailFallbackName: 'Bali Pro Dev website',
    mailBodyName: 'Name',
    mailBodyEmail: 'Email',
    mailBodyMessage: 'Message',
  },

  footer: {
    tagline: 'Website & app development studio. Built with precision, no templates.',
    navLabel: 'Navigation',
    contactLabel: 'Contact',
    backToTop: 'Back to top',
    copyright: 'All rights reserved.',
  },
}
