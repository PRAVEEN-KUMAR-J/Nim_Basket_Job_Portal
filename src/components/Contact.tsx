import { Globe, Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          Contact Us
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          <a
            href="nimbasketjobportal.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
              <Globe size={24} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
            <p className="text-sm text-gray-600 break-all">nimbasketjobportal.vercel.app</p>
          </a>

          <a
            href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=nimbasket.official@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
              <Mail size={24} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-sm text-gray-600 break-all">nimbasket.official@gmail.com</p>
          </a>

          <a
            href="tel:7200729718"
            className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
              <Phone size={24} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-sm text-gray-600">7200729718</p>
          </a>
        </div>
      </div>
    </section>
  );
}
