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
    <section className="section-padding bg-base-100" id="offerings">
      <div className="container-max">
        <h2 className="text-center mb-2">Exclusive Nipige Offerings</h2>
        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          You can trust us to simplify every step of your business journey better than anyone else.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="p-6 rounded-lg border border-base-300 hover:border-primary hover:shadow-lg transition-all duration-300 bg-white">
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h4 className="font-bold text-neutral mb-3">{feature.title}</h4>
      <p className="text-base-content/70 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}
