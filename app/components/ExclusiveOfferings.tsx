import React from 'react';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: '⚙️',
    title: 'Customizable Workflow',
    description: 'Tailor workflows to match your unique business processes and requirements.',
  },
  {
    id: 2,
    icon: '🌍',
    title: 'True Global SaaS Platform',
    description: 'Support multiple countries, currencies, languages, and regional regulations.',
  },
  {
    id: 3,
    icon: '🔗',
    title: 'Multi-Channel Integration',
    description: 'Seamlessly integrate across web, mobile, marketplace, and POS systems.',
  },
  {
    id: 4,
    icon: '🛒',
    title: 'Exclusive POS System',
    description: 'Integrated point-of-sale with inventory, billing, and real-time reporting.',
  },
  {
    id: 5,
    icon: '💱',
    title: 'Localization of Currency',
    description: 'Support multiple currencies with real-time conversion and local payment methods.',
  },
  {
    id: 6,
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Comprehensive dashboards with real-time insights into your business performance.',
  },
];

export default function ExclusiveOfferings() {
  return (
    <section className="section-padding bg-base-100" id="offerings" aria-label="Exclusive Nipige offerings">
      <div className="container-max">
        <h2 className="text-center mb-2">Exclusive Nipige Offerings</h2>
        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          You can trust us to simplify every step of your business journey better than anyone else.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: Feature;
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <article className="p-6 sm:p-8 rounded-lg border border-base-300 hover:border-primary hover:shadow-xl transition-all duration-300 bg-white focus-within:ring-2 focus-within:ring-primary hover:-translate-y-1" role="listitem">
      <div className="text-6xl mb-6" aria-hidden="true">{feature.icon}</div>
      <h3 className="font-bold text-neutral text-lg mb-3 leading-snug">{feature.title}</h3>
      <p className="text-base-content/70 text-sm leading-relaxed">{feature.description}</p>
    </article>
  );
}
