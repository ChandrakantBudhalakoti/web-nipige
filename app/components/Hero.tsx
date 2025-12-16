'use client';

import { useState, useEffect } from 'react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Revolutionize the Way Freshness Reaches Your Doorstep',
    subtitle: 'Empowering Farmers, Simplifying Deliveries, and Elevating Customer Experiences with Cutting-Edge Farm-to-Home App Solutions.',
    image: 'https://images.unsplash.com/photo-1488459716781-6818ecdf27d5?w=1200&h=600&fit=crop',
    cta: 'Farm to Home',
  },
  {
    id: 2,
    title: 'Transform Your Grocery Business Today',
    subtitle: 'Build a complete grocery marketplace with order management, inventory tracking, and real-time analytics.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&h=600&fit=crop',
    cta: 'Grocery Solutions',
  },
  {
    id: 3,
    title: 'Elevate Your Service Business',
    subtitle: 'Launch your own on-demand home service platform with real-time tracking and seamless payments.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    cta: 'Service Platforms',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlay(false);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section
      className="relative w-full h-96 sm:h-[500px] md:h-[600px] overflow-hidden bg-primary"
      aria-label="Hero carousel"
    >
      {/* Slide Image Background */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container-max w-full">
          <div className="max-w-2xl">
            <h1 className="text-white mb-4 leading-tight">{slide.title}</h1>
            <p className="text-white/90 text-lg sm:text-xl mb-6 leading-relaxed">{slide.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button className="btn btn-accent btn-md rounded-full">
                Get Started
              </button>
              <span className="text-white/70 text-sm font-medium">{slide.cta}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white hover:bg-white/20"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white hover:bg-white/20"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
}
