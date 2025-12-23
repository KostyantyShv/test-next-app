'use client';

import React, { useState } from 'react';

// Types
type BoostPageType = 'search' | 'competitor' | 'leaderboard';

interface PageRate {
  name: string;
  rate: number;
  title: string;
}

interface VolumeDiscountTier {
  minImpressions: number;
  discount: number;
}

const BoostedPricing: React.FC = () => {
  // State
  const [selectedPage, setSelectedPage] = useState<BoostPageType>('search');
  const [impressions, setImpressions] = useState(10000);

  // Page rates and settings
  const pageRates: Record<BoostPageType, PageRate> = {
    search: { 
      name: 'Search Results',
      rate: 0.05,
      title: 'Search Results Boost'
    },
    competitor: { 
      name: 'Competitor Listing',
      rate: 0.10,
      title: 'Competitor Page Boost'
    },
    leaderboard: { 
      name: 'Leaderboard',
      rate: 0.15,
      title: 'Leaderboard Boost'
    }
  };

  // Volume discount tiers
  const volumeDiscountTiers: VolumeDiscountTier[] = [
    { minImpressions: 1000, discount: 0 },
    { minImpressions: 25000, discount: 5 },
    { minImpressions: 50000, discount: 10 },
    { minImpressions: 75000, discount: 15 },
    { minImpressions: 100000, discount: 20 }
  ];

  // Helper functions
  const getVolumeDiscount = (impressions: number): number => {
    for (let i = volumeDiscountTiers.length - 1; i >= 0; i--) {
      if (impressions >= volumeDiscountTiers[i].minImpressions) {
        return volumeDiscountTiers[i].discount;
      }
    }
    return 0;
  };

  const formatNumber = (num: number): string => {
    // Deterministic formatting (avoids SSR/CSR locale differences)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Calculate boost pricing
  const calculateBoostPricing = () => {
    const selectedPageData = pageRates[selectedPage];
    const baseCost = impressions * selectedPageData.rate;
    const discountPercent = getVolumeDiscount(impressions);
    const discountAmount = baseCost * (discountPercent / 100);
    const total = baseCost - discountAmount;
    
    return {
      baseCost,
      discountAmount,
      total,
      discountPercent,
      selectedPageData
    };
  };

  const pricing = calculateBoostPricing();

  // Update slider progress visual effect
  const updateSliderProgress = (value: number) => {
    const min = 1000;
    const max = 100000;
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #1D77BD 0%, #1D77BD ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;
  };

  return (
    <div className="w-full max-w-[900px] max-md:max-w-[390px] mx-auto max-md:px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Boosted Listings Card */}
        <div className="w-full bg-white rounded-2xl shadow-md border border-[#E7E7E7] border-t-4 border-t-[#1D77BD] flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
          <div className="flex flex-col gap-5 order-1">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[#1B1B1B]">Boosted Listings</h2>
              <p className="text-sm md:text-[15px] leading-relaxed text-[#5F5F5F]">
                Promote your listing by purchasing impressions on key pages of the site such as search results, competitor listing pages, and leaderboard page.
              </p>
            </div>
            
            <div className="bg-[#F7F9FB] rounded-lg p-4 md:p-5 mb-5 md:mb-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-2">
                  Select Promotion Page
                </label>
                <select
                  className="w-full py-3.5 px-4 pr-10 border-2 border-[#E2E8F0] rounded-lg text-[15px] font-medium text-[#1B1B1B] bg-white cursor-pointer transition-all appearance-none hover:border-[#1D77BD] hover:bg-[#F7FAFC] focus:outline-none focus:border-[#1D77BD] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]"
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value as BoostPageType)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235F5F5F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px'
                  }}
                >
                  <option value="search">Search Results Page - $0.05/impression</option>
                  <option value="competitor">Competitor Listing Pages - $0.10/impression</option>
                  <option value="leaderboard">Leaderboard Page - $0.15/impression</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-2">
                  Number of Impressions
                </label>
                <div className="relative mb-4">
                  <style dangerouslySetInnerHTML={{__html: `
                    .boosted-slider::-webkit-slider-thumb {
                      appearance: none;
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #1D77BD;
                      cursor: pointer;
                      border: 2px solid white;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    }
                    .boosted-slider::-moz-range-thumb {
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #1D77BD;
                      cursor: pointer;
                      border: 2px solid white;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    }
                  `}} />
                  <input
                    type="range"
                    className="boosted-slider w-full h-2 bg-[#E2E8F0] rounded-lg outline-none appearance-none cursor-pointer"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={impressions}
                    onChange={(e) => setImpressions(parseInt(e.target.value))}
                    style={{
                      background: updateSliderProgress(impressions)
                    }}
                  />
                  <div className="flex justify-between text-xs text-[#5F5F5F] mt-2">
                    <span>1K</span>
                    <span>25K</span>
                    <span>50K</span>
                    <span>75K</span>
                    <span>100K</span>
                  </div>
                </div>
                <div className="text-center p-3 bg-white border-2 border-[#E2E8F0] rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-[#1B1B1B] mb-1">
                    {formatNumber(impressions)}
                  </div>
                  <div className="text-xs md:text-sm text-[#5F5F5F]">Impressions</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center bg-[#F8F9FA] p-5 md:p-8 rounded-xl flex flex-col justify-start order-2">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-5 text-[#1B1B1B]">
              {pricing.selectedPageData.title}
            </h3>
            <div className="flex items-baseline justify-center mb-4 md:mb-6">
              <span className="text-5xl md:text-[56px] font-bold text-[#1B1B1B]">
                ${formatNumber(Math.round(pricing.total))}
              </span>
              <span className="text-base md:text-lg font-medium text-[#5F5F5F] ml-2">total</span>
            </div>

          {/* Price Breakdown */}
          <div className="bg-transparent p-0 mb-4 md:mb-6 max-md:overflow-x-auto">
            <div className="max-md:min-w-[420px]">
              <div className="flex justify-between mb-2 text-[13px] md:text-sm">
                <span className="text-left">Base Cost ({formatNumber(impressions)} × ${pricing.selectedPageData.rate.toFixed(2)})</span>
                <span className="flex-shrink-0 ml-2">${formatNumber(Math.round(pricing.baseCost))}</span>
              </div>
              <div className="flex justify-between mb-2 text-[13px] md:text-sm">
                <span className="flex items-center flex-wrap">
                  <span>Volume Discount</span>
                  {pricing.discountPercent > 0 && (
                    <span className="inline-block bg-[#089E68] text-white px-1.5 md:px-2 py-0.5 rounded text-[11px] md:text-xs font-semibold ml-1.5 md:ml-2">
                      {pricing.discountPercent}%
                    </span>
                  )}
                </span>
                <span className="flex-shrink-0 ml-2">-${formatNumber(Math.round(pricing.discountAmount))}</span>
              </div>
              <div className="flex justify-between font-bold text-base md:text-lg text-[#1B1B1B] pt-2 border-t border-[#CBD5E0]">
                <span>Total Cost</span>
                <span className="flex-shrink-0">${formatNumber(Math.round(pricing.total))}</span>
              </div>
            </div>
          </div>

            <div className="w-full h-px bg-[#E2E8F0] my-4 md:my-5" />

            {/* Features */}
            <div className="flex flex-col gap-2.5 text-left flex-grow">
              <BoostFeatureItem icon={<CheckIcon />} text="Boost includes:" bold />
              <BoostFeatureItem icon={<LightningIcon />} text="Priority placement in results" />
              <BoostFeatureItem icon={<EyeIcon />} text="Increased visibility & exposure" />
              <BoostFeatureItem icon={<ChartIcon />} text="Detailed performance analytics" />
              <BoostFeatureItem icon={<UsersIcon />} text="Target competitor audiences" />
              <BoostFeatureItem icon={<ClockIcon />} text="Campaign runs for 30 days" />
            </div>

            <button className="w-full py-3.5 px-6 rounded-lg font-semibold text-base mt-auto bg-[#1D77BD] text-white hover:bg-[#1565A0] transition-all hover:-translate-y-0.5 hover:shadow-md">
              Launch Boost Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
interface BoostFeatureItemProps {
  icon: React.ReactNode;
  text: string;
  bold?: boolean;
}

const BoostFeatureItem: React.FC<BoostFeatureItemProps> = ({ icon, text, bold }) => (
  <p className="relative pl-6 md:pl-7 text-xs md:text-[13px] leading-relaxed text-[#4A4A4A] flex items-center min-h-[20px] md:min-h-[24px]">
    <span className="absolute left-0 top-0.5 w-4 h-4 md:w-[18px] md:h-[18px] flex-shrink-0">{icon}</span>
    {bold ? <strong className="font-semibold text-[#1B1B1B]">{text}</strong> : text}
  </p>
);

// SVG Icons
const CheckIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const LightningIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const EyeIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke="#0B6333" strokeWidth="2" fill="none"/>
  </svg>
);

const ChartIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const UsersIcon = () => (
    <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="9" cy="7" r="4" stroke="#0B6333" strokeWidth="2" fill="none"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M16 3.13a4 4 0 010 7.75" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ClockIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default BoostedPricing;
