import React from 'react';
import BasicPricing from './components/BasicPricing';
import ComparisonPricing from './components/ComparisonPricing';

const Pricing: React.FC = () => {
  return (
    <div>
      <BasicPricing />
      <ComparisonPricing />
    </div>
  );
};

export default Pricing;

