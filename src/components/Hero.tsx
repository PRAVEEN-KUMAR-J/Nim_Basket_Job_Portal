import Logo from './Logo';

interface HeroProps {
  onViewPositions: () => void;
  onApplyDelivery: () => void;
}

export default function Hero({ onViewPositions, onApplyDelivery }: HeroProps) {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Logo size="large" />

        <p className="mt-4 text-lg text-gray-600 font-medium">
          Effortless Shopping. Excellent Speed.
        </p>

        <div className="mt-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            We Are Hiring
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Nim Basket is a hyperlocal delivery platform revolutionizing the way people shop.
            We're building a fast, reliable, and seamless shopping experience for customers across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={onViewPositions}
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-md"
            >
              View Open Positions
            </button>

            <button
              onClick={onApplyDelivery}
              className="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-colors"
            >
              Apply as Delivery Partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
