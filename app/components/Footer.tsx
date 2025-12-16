import Link from 'next/link';

interface FooterSection {
  title: string;
  links: Array<{ label: string; href: string }>;
}

const footerSections: FooterSection[] = [
  {
    title: 'Who We Are',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Vision', href: '#vision' },
      { label: 'Team', href: '#team' },
      { label: 'Careers', href: '#careers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '#blog' },
      { label: 'Contact', href: '#contact' },
      { label: 'Partners', href: '#partners' },
      { label: 'Press', href: '#press' },
    ],
  },
  {
    title: 'Important Links',
    links: [
      { label: 'Solutions', href: '#solutions' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Documentation', href: '#docs' },
    ],
  },
  {
    title: 'Get In Touch',
    links: [
      { label: 'Email: contact@nipige.com', href: 'mailto:contact@nipige.com' },
      { label: 'Phone: +1 (555) 123-4567', href: 'tel:+15551234567' },
      { label: 'Address: Georgetown, Texas', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-white">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex gap-4">
              <a
                href="https://facebook.com/nipige"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/10"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://linkedin.com/company/nipige"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/10"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://twitter.com/nipige"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/10"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://instagram.com/nipige"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/10"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
            <p className="text-white/70 text-sm">
              © 2024 Nipige. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="bg-black/50 py-4">
        <div className="container-max flex flex-col sm:flex-row justify-center gap-6 text-sm text-white/60">
          <Link href="#privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="#cookies" className="hover:text-white transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
