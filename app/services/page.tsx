import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Services | Nipige - Digital Commerce Solutions',
  description: 'Explore Nipige services including marketplace solutions, integration, customization, analytics, support, and more.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: '🛒',
      title: 'Marketplace Solutions',
      description: 'Build and manage multi-vendor marketplaces with complete control over commissions, vendor management, and customer experience.',
      features: [
        'Multi-vendor management',
        'Commission management',
        'Vendor analytics',
        'Customer ratings & reviews',
      ],
    },
    {
      icon: '🔗',
      title: 'Integration & APIs',
      description: 'Seamlessly integrate with existing systems and third-party services using our comprehensive API and pre-built integrations.',
      features: [
        'RESTful APIs',
        'Webhooks',
        'Pre-built integrations',
        'Custom middleware',
      ],
    },
    {
      icon: '⚙️',
      title: 'Customization',
      description: 'Tailor the platform to match your unique business processes with our flexible customization options and development support.',
      features: [
        'Custom workflows',
        'White-label solutions',
        'Custom features',
        'Dedicated development',
      ],
    },
    {
      icon: '📊',
      title: 'Analytics & Reporting',
      description: 'Gain deep insights into your business performance with comprehensive analytics, reporting, and business intelligence tools.',
      features: [
        'Real-time dashboards',
        'Custom reports',
        'Data export',
        'Predictive analytics',
      ],
    },
    {
      icon: '🌍',
      title: 'Global Expansion',
      description: 'Expand your business globally with multi-currency, multi-language, and multi-region support built into the platform.',
      features: [
        'Multi-currency support',
        'Multi-language interface',
        'Regional compliance',
        'Local payment methods',
      ],
    },
    {
      icon: '👥',
      title: '24/7 Support',
      description: 'Get round-the-clock support from our expert team with multiple support channels and guaranteed response times.',
      features: [
        'Email support',
        'Live chat',
        'Phone support',
        'Dedicated account manager',
      ],
    },
  ];

  const implementationSteps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We understand your business requirements and create a detailed implementation plan.',
    },
    {
      number: '02',
      title: 'Configuration',
      description: 'Our team configures the platform to match your specific business processes and workflows.',
    },
    {
      number: '03',
      title: 'Integration',
      description: 'We integrate with your existing systems and third-party services as needed.',
    },
    {
      number: '04',
      title: 'Testing & QA',
      description: 'Comprehensive testing ensures everything works perfectly before going live.',
    },
    {
      number: '05',
      title: 'Training & Deployment',
      description: 'We train your team and handle the smooth deployment to production.',
    },
    {
      number: '06',
      title: 'Ongoing Support',
      description: 'Continuous support and optimization to ensure your success.',
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-primary/10 to-white">
          <div className="container-max">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6">Our Services</h1>
              <p className="text-lg text-base-content/80 leading-relaxed">
                Comprehensive solutions designed to help your business thrive in the digital commerce landscape.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <article
                  key={index}
                  className="p-8 rounded-lg border border-base-300 hover:border-primary hover:shadow-xl transition-all duration-300 bg-white focus-within:ring-2 focus-within:ring-primary hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="font-bold text-neutral text-lg mb-3">{service.title}</h3>
                  <p className="text-base-content/70 text-sm leading-relaxed mb-6">{service.description}</p>
                  <div className="pt-6 border-t border-base-300">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-base-content/70">
                          <span className="text-primary font-bold mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="section-padding bg-base-100">
          <div className="container-max">
            <h2 className="text-center mb-12">Implementation Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {implementationSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-6 rounded-lg border border-base-300 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{step.number}</div>
                    <h3 className="font-bold text-neutral text-lg mb-2">{step.title}</h3>
                    <p className="text-base-content/70 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < implementationSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-2xl text-primary/20">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
          <div className="container-max text-center">
            <h2 className="text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how Nipige can help you achieve your business goals with our comprehensive services and expert support.
            </p>
            <button className="btn btn-accent bg-white text-primary hover:bg-white/90 rounded-full">
              Schedule a Demo
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
