import Logo from './Logo';
import { Globe, Mail, Phone, Users } from 'lucide-react';

const founders = [
  { name: 'Praveen Kumar J', role: 'Co-Founder' },
  { name: 'Selvarajan E', role: 'Co-Founder' },
  { name: 'Pugazheshwar D', role: 'Co-Founder' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Top grid — Brand | Leadership | Contact */}
        <div className="grid sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Logo size="small" theme="dark" />
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Effortless Shopping. Excellent Speed.<br />
              Revolutionizing hyperlocal delivery across India.
            </p>
          </div>

          {/* Leadership Team */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-orange-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400">Leadership Team</h3>
            </div>
            <ul className="space-y-3">
              {founders.map((f) => (
                <li key={f.name}>
                  <p className="font-semibold text-white text-sm">{f.name}</p>
                  <p className="text-gray-400 text-xs">{f.role}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://nim-basket-job-portal.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  <Globe size={14} className="flex-shrink-0" />
                  nim-basket-job-portal.vercel.app
                </a>
              </li>
              <li>
                <a
                  href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=nimbasket.official@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  nimbasket.official@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:7200729718"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  7200729718
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Nim Basket. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
