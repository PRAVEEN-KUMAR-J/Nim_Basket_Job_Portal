import { Users } from 'lucide-react';

const founders = [
  { name: 'PRAVEEN KUMAR J' },
  { name: 'SELVARAJAN E' },
  { name: 'PUGAZHESHWAR D' },
];

export default function LeadershipTeam() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          Leadership Team
        </h2>

        <div className="grid sm:grid-cols-3 gap-8">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                <Users size={32} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {founder.name}
              </h3>
              <p className="text-sm text-gray-600 font-medium">Co-Founder</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
