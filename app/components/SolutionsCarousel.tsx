'use client';

import { useState } from 'react';

interface Solution {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const solutions: Solution[] = [
  {
    id: 1,
    title: 'Grocery App',
    description: 'Revolutionize Your Grocery Business with Innovative App Solutions',
    features: ['Order Management', 'Inventory Tracking', 'Real-time Analytics', 'Multi-store Support'],
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Farm to Home',
    description: 'Revolutionize the Way Freshness Reaches Your Doorstep',
    features: ['Direct Farmer Integration', 'Supply Chain Management', 'Quality Assurance', 'Fast Delivery'],
    image: 'https://images.unsplash.com/photo-1488459716781-6818ecdf27d5?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Property Management',
    description: 'Digitalize Business with Real Estate App',
    features: ['Property Listings', 'Tenant Management', 'Maintenance Tracking', 'Payment Processing'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Restaurant App',
    description: 'Simplify Food Ordering Process with Restaurant App',
    features: ['Menu Management', 'Order Tracking', 'Kitchen Display System', 'Customer Analytics'],
    image: 'https://images.unsplash.com/photo-1504674900967-f3429a71ad0d?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Home Service App',
    description: 'Launch Your Own On-demand Home Service App',
    features: ['Service Booking', 'Real-time Tracking', 'Provider Management', 'Payment Gateway'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Sports Management',
    description: 'Elevate Your Game with Sports Management App',
    features: ['Event Management', 'Player Profiles', 'Booking System', 'Performance Analytics'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop',
  },
];

export default function SolutionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 3;
  const maxIndex = solutions.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  const visibleSolutions = solutions.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="section-padding bg-base-100" id="solutions" aria-label="Industry solutions carousel">
      <div className="container-max">
        <h2 className="text-center mb-2">Configurable Digital Commerce & E-enablement</h2>
        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Configurable Digital Commerce & E-enablement Platform that Transforms Your Business with rapidity. Build, manage and transform businesses in short spans of time with go to market ready functionalities and features on fingertips.
        </p>

        {/* Carousel Container */}
        <div className="relative" role="region" aria-label="Solutions carousel">
          <div className="hidden md:grid grid-cols-3 gap-6">
            {visibleSolutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>

          {/* Mobile Single Column */}
          <div className="md:hidden">
            {visibleSolutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="btn btn-circle btn-outline focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous solutions"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="btn btn-circle btn-outline focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next solutions"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SolutionCardProps {
  solution: Solution;
}

function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <article className="card bg-white border border-base-300 hover:shadow-xl transition-shadow duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary">
      <figure className="h-48 overflow-hidden">
        <img
          src={solution.image}
          alt={`${solution.title} solution illustration`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-neutral">{solution.title}</h3>
        <p className="text-base-content/70">{solution.description}</p>
        <div className="flex flex-wrap gap-2 mt-4" role="list">
          {solution.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="badge badge-primary badge-outline text-xs" role="listitem">
              {feature}
            </span>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Learn More</button>
        </div>
      </div>
    </article>
  );
}
