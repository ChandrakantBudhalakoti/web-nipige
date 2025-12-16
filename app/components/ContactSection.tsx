'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
}

const contactInfoItems: ContactInfo[] = [
  {
    icon: '📍',
    title: 'Our Location',
    details: ['617 Hickory Bend Trl', 'Georgetown, Texas 78628, USA'],
  },
  {
    icon: '✉️',
    title: 'Email Address',
    details: ['contact@nipige.com', 'support@nipige.com'],
  },
  {
    icon: '📞',
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Form submitted:', formData);
      setSubmitMessage('Thank you! We will get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-primary text-white" id="contact" aria-label="Contact section">
      <div className="container-max">
        <h2 className="text-center text-white mb-2">GET IN TOUCH</h2>
        <p className="text-center text-white/90 mb-12">
          Are you Ready for a Better, more Productive Business?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <address className="space-y-8 not-italic">
            {contactInfoItems.map((info, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 text-5xl" aria-hidden="true">{info.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-white/80 text-sm leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-8 border-t border-white/20">
              <p className="font-semibold mb-6 text-lg">Connect with us</p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Visit our Facebook page"
                >
                  f
                </a>
                <a
                  href="https://twitter.com/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Visit our Twitter page"
                >
                  𝕏
                </a>
                <a
                  href="https://linkedin.com/company/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Visit our LinkedIn page"
                >
                  in
                </a>
                <a
                  href="https://instagram.com/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Visit our Instagram page"
                >
                  📷
                </a>
              </div>
            </div>
          </address>

          {/* Right Column - Contact Form */}
          <div className="bg-white/10 backdrop-blur p-6 sm:p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <fieldset>
                <legend className="sr-only">Contact form</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="input input-bordered input-sm bg-white/20 border-white/30 text-white placeholder-white/60 w-full focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
                      aria-label="First Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="input input-bordered input-sm bg-white/20 border-white/30 text-white placeholder-white/60 w-full focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
                      aria-label="Last Name"
                    />
                  </div>
                </div>

                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered input-sm w-full bg-white/20 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
                  aria-label="Email"
                />

                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input input-bordered input-sm w-full bg-white/20 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
                  aria-label="Phone"
                />

                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="textarea textarea-bordered textarea-sm w-full bg-white/20 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white rounded-lg resize-none"
                  aria-label="Message"
                />
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-accent btn-block rounded-full w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white font-semibold"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div className="alert alert-info rounded-lg" role="alert">
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
