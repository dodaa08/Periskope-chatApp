"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Pricing() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Basic features for small teams or individuals getting started',
      features: [
        'Up to 5 team members',
        '5GB storage',
        'Basic chat features',
        'Standard support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/user/month',
      description: 'Everything your team needs to collaborate effectively',
      features: [
        'Unlimited team members',
        '100GB storage',
        'Advanced chat features',
        'Priority support',
        'Custom integrations'
      ],
      cta: 'Start Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Advanced features and support for large organizations',
      features: [
        'Unlimited everything',
        'Advanced security',
        'Dedicated account manager',
        'Custom branding',
        '24/7 phone support',
        'SLA guarantees'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Simple, transparent <span className="font-medium">pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your team's communication needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`bg-white rounded-xl overflow-hidden border ${tier.popular ? 'border-black shadow-lg' : 'border-gray-200'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {tier.popular && (
                <div className="bg-black py-1 text-center">
                  <span className="text-xs font-medium text-white tracking-wide uppercase">Most Popular</span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-lg font-medium text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-medium">{tier.price}</span>
                  {tier.period && <span className="ml-1 text-gray-500">{tier.period}</span>}
                </div>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/" className={`block w-full py-3 px-4 rounded-md text-center text-sm font-medium ${tier.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors`}>
                      {tier.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 