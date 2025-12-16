import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'About Us | Nipige - Digital Commerce Platform',
  description: 'Learn about Nipige, our mission, vision, and the team behind the leading SaaS platform for digital commerce and e-enablement.',
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Co-Founder & CEO',
      bio: 'Visionary leader with 15+ years in digital commerce and SaaS',
    },
    {
      name: 'Sarah Johnson',
      role: 'Co-Founder & CTO',
      bio: 'Technology expert specializing in scalable platform architecture',
    },
    {
      name: 'Michael Chen',
      role: 'VP of Product',
      bio: 'Product innovator focused on customer success and market fit',
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Business Development',
      bio: 'Strategic partnerships and enterprise growth specialist',
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Customer First',
      description: 'We prioritize our customers\' success and continuously innovate to meet their evolving needs.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We embrace new technologies and creative solutions to solve complex business challenges.',
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and work together to achieve greater outcomes.',
    },
    {
      icon: '🌱',
      title: 'Growth',
      description: 'We invest in our people and empower them to grow professionally and personally.',
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
              <h1 className="mb-6">About Nipige</h1>
              <p className="text-lg text-base-content/80 leading-relaxed">
                We're building the most powerful, flexible, and user-friendly digital commerce platform that empowers businesses of all sizes to scale globally.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="mb-6">Our Mission</h2>
                <p className="text-base-content/80 leading-relaxed mb-4">
                  To democratize access to world-class digital commerce technology, enabling entrepreneurs and businesses to compete globally regardless of their size or technical expertise.
                </p>
                <p className="text-base-content/80 leading-relaxed">
                  We believe that technology should be simple, accessible, and powerful enough to transform any business into a thriving digital enterprise.
                </p>
              </div>
              <div>
                <h2 className="mb-6">Our Vision</h2>
                <p className="text-base-content/80 leading-relaxed mb-4">
                  To become the leading global platform that reimagines how businesses build, manage, and scale their digital commerce operations across all channels.
                </p>
                <p className="text-base-content/80 leading-relaxed">
                  We envision a world where every business, from local shops to multinational enterprises, has access to enterprise-grade tools and infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-base-100">
          <div className="container-max">
            <h2 className="text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="p-6 rounded-lg border border-base-300 hover:border-primary hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="font-bold text-neutral mb-3">{value.title}</h3>
                  <p className="text-base-content/70 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding">
          <div className="container-max">
            <h2 className="text-center mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <article key={index} className="p-6 rounded-lg border border-base-300 hover:shadow-lg transition-all duration-300 bg-white text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-neutral text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-base-content/70 text-sm leading-relaxed">{member.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-base-100">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-center mb-12">Our Story</h2>
              <div className="space-y-6 text-base-content/80 leading-relaxed">
                <p>
                  Nipige was founded in 2020 with a simple yet ambitious goal: to make enterprise-grade digital commerce tools accessible to businesses of all sizes. Our founders, passionate about technology and entrepreneurship, recognized the gap in the market for a truly flexible and scalable platform.
                </p>
                <p>
                  What started as a small team of technologists has grown into a global company serving hundreds of businesses across multiple industries. From farm-to-home enterprises to property management platforms, Nipige powers the digital transformation of diverse business models.
                </p>
                <p>
                  Today, we continue to push the boundaries of what's possible in digital commerce. We invest heavily in research and development, listen closely to our customers, and remain committed to delivering solutions that make a real difference in their business success.
                </p>
                <p>
                  Our commitment to innovation, reliability, and customer success remains the core of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
