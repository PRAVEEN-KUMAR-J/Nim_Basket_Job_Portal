import { Bike, Clock, DollarSign } from 'lucide-react';

interface DeliveryPartnerProps {
  onApply: () => void;
}

export default function DeliveryPartner({ onApply }: DeliveryPartnerProps) {
  return (
    <section id="delivery" className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
              <Bike size={48} className="text-orange-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join as Delivery Partner
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be your own boss and earn on your schedule. Deliver smiles while earning great income.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="inline-block p-3 bg-orange-50 rounded-lg mb-3">
                <Clock size={24} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Flexible Hours</h3>
              <p className="text-sm text-gray-600">Work when you want</p>
            </div>

            <div className="text-center p-4">
              <div className="inline-block p-3 bg-orange-50 rounded-lg mb-3">
                <DollarSign size={24} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Good Earnings</h3>
              <p className="text-sm text-gray-600">Competitive payouts</p>
            </div>

            <div className="text-center p-4">
              <div className="inline-block p-3 bg-orange-50 rounded-lg mb-3">
                <Bike size={24} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Easy Signup</h3>
              <p className="text-sm text-gray-600">Quick onboarding</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onApply}
              className="px-10 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-md text-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
