import { Briefcase, Home, Code, Palette, Server } from 'lucide-react';

interface Position {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const positions: Position[] = [
  {
    id: 'uiux',
    title: 'UI/UX Designer',
    icon: <Palette size={28} className="text-orange-600" />,
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping'],
  },
  {
    id: 'frontend',
    title: 'Mobile App Frontend Developer',
    icon: <Code size={28} className="text-orange-600" />,
    skills: ['React Native', 'Flutter', 'TypeScript', 'Redux', 'API Integration'],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: <Server size={28} className="text-orange-600" />,
    skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'AWS/Cloud'],
  },
];

interface OpenPositionsProps {
  onApply: (role: string) => void;
}

export default function OpenPositions({ onApply }: OpenPositionsProps) {
  return (
    <section id="positions" className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          Open Positions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <div
              key={position.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                {position.icon}
                <h3 className="text-xl font-bold text-gray-900">
                  {position.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Briefcase size={16} />
                <span className="font-medium">Full Time</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Home size={16} />
                <span className="font-medium">Work From Home</span>
                <span className="text-xs text-gray-500">(Interview in Office)</span>
              </div>

              <div className="mb-6 flex-grow">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {position.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-orange-50 text-orange-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {position.skills.length > 3 && (
                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{position.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onApply(position.title)}
                className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
