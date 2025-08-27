import { Check, Star } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '₵0',
    period: '/month',
    description: 'Basic market data access for casual users',
    features: [
      '15-minute delayed market prices',
      'Basic commodity information',
      'Limited historical data (7 days)',
      'Email support'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    popular: false
  },
  {
    name: 'Basic',
    price: '₵99',
    period: '/month',
    description: 'Essential market data for individual traders',
    features: [
      '5-minute delayed market prices',
      'Full commodity coverage',
      'Historical data (30 days)',
      'Basic charts and analytics',
      'Priority email support',
      'Mobile app access'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'default',
    popular: false
  },
  {
    name: 'Professional',
    price: '₵299',
    period: '/month',
    description: 'Advanced features for active traders and analysts',
    features: [
      'Real-time market prices',
      'Full historical data (5 years)',
      'Advanced charts and technical analysis',
      'TradingView integration',
      'API access',
      'Priority phone support',
      'Custom alerts and notifications',
      'Data export (CSV, Excel)'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'default',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full access for institutions and large organizations',
    features: [
      'Real-time data feed',
      'Complete historical database',
      'White-label solutions',
      'Dedicated account manager',
      'Custom integrations',
      '24/7 phone support',
      'SLA guarantees',
      'On-premise deployment options'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline',
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your market data needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                plan.popular ? 'border-green-500 ring-4 ring-green-100' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.buttonVariant === 'outline' ? '/auth/register' : '/auth/register'}
                  className={`w-full block text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.buttonVariant === 'outline'
                      ? 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600 text-sm">No setup fees. You only pay for the plan you choose, starting from your free trial.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept all major credit cards, mobile money, and bank transfers for Ghana-based customers.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-600 text-sm">Yes, you can cancel anytime. No long-term contracts or cancellation fees.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <Link
            href="/contact"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
