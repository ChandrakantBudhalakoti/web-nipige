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
    <section className="section-padding bg-primary text-white" id="contact">
      <div className="container-max">
        <h2 className="text-center text-white mb-2">GET IN TOUCH</h2>
        <p className="text-center text-white/90 mb-12">
          Are you Ready for a Better, more Productive Business?
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {contactInfoItems.map((info, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 text-4xl">{info.icon}</div>
                <div>
                  <h4 className="font-bold mb-2">{info.title}</h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-white/80 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-6 border-t border-white/20">
              <p className="font-semibold mb-4">Connect with us</p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a
                  href="https://twitter.com/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="https://linkedin.com/company/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20"
                  aria-label="LinkedIn"
                >
                  in
                </a>
                <a
                  href="https://instagram.com/nipige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost text-white hover:bg-white/20"
                  aria-label="Instagram"
                >
                  📷
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/10 backdrop-blur p-6 md:p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input input-bordered input-sm bg-white/20 border-white/30 text-white placeholder-white/60"
                  aria-label="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input input-bordered input-sm bg-white/20 border-white/30 text-white placeholder-white/60"
                  aria-label="Last Name"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered input-sm w-full bg-white/20 border-white/30 text-white placeholder-white/60"
                aria-label="Email"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input input-bordered input-sm w-full bg-white/20 border-white/30 text-white placeholder-white/60"
                aria-label="Phone"
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="textarea textarea-bordered textarea-sm w-full bg-white/20 border-white/30 text-white placeholder-white/60"
                aria-label="Message"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-accent btn-block rounded-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div className="alert alert-info">
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
