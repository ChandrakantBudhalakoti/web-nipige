export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Solution',
      description: 'Select from our pre-built solutions tailored to your industry or customize one from scratch.',
    },
    {
      number: '02',
      title: 'Configure & Customize',
      description: 'Use our intuitive platform to configure workflows, features, and settings specific to your business needs.',
    },
    {
      number: '03',
      title: 'Deploy & Launch',
      description: 'Go live in days, not months, with our rapid deployment process and comprehensive support.',
    },
    {
      number: '04',
      title: 'Scale & Grow',
      description: 'Monitor performance, analyze data, and scale your business with our advanced analytics and tools.',
    },
  ];

  return (
    <section className="section-padding bg-base-200">
      <div className="container-max">
        <h2 className="mb-2">How Does It Work?</h2>
        <p className="text-base-content/70 mb-12">Build Your Online Business from Scratch</p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image */}
          <div className="order-2 md:order-1">
            <figure className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
                alt="How it works - SaaS platform overview"
                className="w-full h-auto"
              />
            </figure>
          </div>

          {/* Right Column - Steps */}
          <div className="order-1 md:order-2 space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-bold text-neutral mb-2">{step.title}</h4>
                  <p className="text-base-content/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}

            <button className="btn btn-primary btn-lg rounded-full mt-8">
              View More Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
