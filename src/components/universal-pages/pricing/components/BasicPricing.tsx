'use client';

import React, { useState, useEffect, useRef } from 'react';
import BoostedPricing from './BoostedPricing';
import useWindowWidth from '@/hooks/useWindowWidth';

// Types
type PlanType = 'individual-plans' | 'owner-plans';
type BillingPeriod = 'monthly' | 'yearly' | 'one-time';
type ProfileModel = 'subscription' | 'credits';
type ProfilePlanType = 'enhanced' | 'premium' | 'premium-plus';

interface PackTier {
  count: number;
  monthlyPrice?: number;
  price?: number;
}

const BasicPricing: React.FC = () => {
  // State
  const isMobile = useWindowWidth();
  const [activePlan, setActivePlan] = useState<PlanType>('individual-plans');
  const [monitorBilling, setMonitorBilling] = useState<BillingPeriod>('monthly');
  const [reportBilling, setReportBilling] = useState<BillingPeriod>('one-time');
  const [teamBilling, setTeamBilling] = useState<BillingPeriod>('monthly');
  const [profileModel, setProfileModel] = useState<ProfileModel>('subscription');
  const [profilePlan, setProfilePlan] = useState<ProfilePlanType>('enhanced');
  const [paygProfilePlan, setPaygProfilePlan] = useState<ProfilePlanType>('enhanced');
  const [subscriptionDuration, setSubscriptionDuration] = useState(6);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  
  // Pack counts
  const [monitorCount, setMonitorCount] = useState(1);
  const [reportCount, setReportCount] = useState(5);
  const [teamCount, setTeamCount] = useState(1);
  const [analyticsCount, setAnalyticsCount] = useState(1);
  const [internalMonitorCount, setInternalMonitorCount] = useState(3);
  const [externalMonitorCount, setExternalMonitorCount] = useState(3);
  const [inviteCount, setInviteCount] = useState(5);
  const [profileCreditAmount, setProfileCreditAmount] = useState(5000);

  // Pack tiers data
  const monitorTiers: PackTier[] = [
    { count: 1, monthlyPrice: 9 },
    { count: 3, monthlyPrice: 24 },
    { count: 5, monthlyPrice: 35 },
    { count: 10, monthlyPrice: 60 },
    { count: 25, monthlyPrice: 125 },
    { count: 50, monthlyPrice: 200 },
    { count: 100, monthlyPrice: 350 }
  ];

  const reportTiers: PackTier[] = [
    { count: 1, price: 15 },
    { count: 5, price: 49 },
    { count: 10, price: 89 },
    { count: 25, price: 199 },
    { count: 50, price: 349 },
    { count: 100, price: 599 }
  ];

  const teamTiers: PackTier[] = [
    { count: 1, monthlyPrice: 15 },
    { count: 3, monthlyPrice: 45 },
    { count: 5, monthlyPrice: 70 },
    { count: 10, monthlyPrice: 130 },
    { count: 25, monthlyPrice: 300 }
  ];

  const analyticsTiers: PackTier[] = [
    { count: 1, price: 99 },
    { count: 3, price: 249 },
    { count: 5, price: 399 },
    { count: 10, price: 749 },
    { count: 25, price: 1499 }
  ];

  const internalMonitorTiers: PackTier[] = [
    { count: 3, price: 149 },
    { count: 5, price: 229 },
    { count: 10, price: 399 },
    { count: 25, price: 849 }
  ];

  const externalMonitorTiers: PackTier[] = [
    { count: 3, price: 299 },
    { count: 5, price: 449 },
    { count: 10, price: 799 },
    { count: 25, price: 1699 }
  ];

  const inviteTiers: PackTier[] = [
    { count: 5, price: 49 },
    { count: 10, price: 89 },
    { count: 25, price: 199 },
    { count: 50, price: 349 },
    { count: 100, price: 599 },
    { count: 200, price: 999 }
  ];

  const profileCreditTiers = [1000, 2500, 5000, 10000, 25000, 50000, 100000];

  const profilePlans = {
    enhanced: { name: 'Enhanced Profile', subscriptionPrice: 0.05, paygPrice: 0.10 },
    premium: { name: 'Premium Profile', subscriptionPrice: 0.10, paygPrice: 0.20 },
    'premium-plus': { name: 'Premium+ Profile', subscriptionPrice: 0.25, paygPrice: 0.50 }
  };

  const bulkDiscountTiers = [
    { minViews: 1000, discount: 0 },
    { minViews: 2500, discount: 5 },
    { minViews: 5000, discount: 10 },
    { minViews: 10000, discount: 15 },
    { minViews: 25000, discount: 20 },
    { minViews: 50000, discount: 25 },
    { minViews: 100000, discount: 30 }
  ];

  // Helper functions
  const getPrice = (tiers: PackTier[], count: number, priceKey: 'monthlyPrice' | 'price') => {
    let basePrice = tiers[0][priceKey] || 0;
    for (const tier of tiers) {
      if (count >= tier.count) {
        basePrice = tier[priceKey] || basePrice;
      }
    }
    return basePrice;
  };

  const adjustCount = (
    current: number,
    tiers: PackTier[] | number[],
    action: 'increase' | 'decrease'
  ) => {
    if (Array.isArray(tiers[0])) {
      // For credit tiers (number array)
      const tierArray = tiers as number[];
      const currentIndex = tierArray.indexOf(current);
      if (action === 'increase' && currentIndex < tierArray.length - 1) {
        return tierArray[currentIndex + 1];
      } else if (action === 'decrease' && currentIndex > 0) {
        return tierArray[currentIndex - 1];
      }
    } else {
      // For pack tiers (object array)
      const tierArray = tiers as PackTier[];
      const currentIndex = tierArray.findIndex(t => t.count === current);
      if (action === 'increase' && currentIndex < tierArray.length - 1) {
        return tierArray[currentIndex + 1].count;
      } else if (action === 'decrease' && currentIndex > 0) {
        return tierArray[currentIndex - 1].count;
      }
    }
    return current;
  };

  const getBulkDiscount = (views: number) => {
    for (let i = bulkDiscountTiers.length - 1; i >= 0; i--) {
      if (views >= bulkDiscountTiers[i].minViews) {
        return bulkDiscountTiers[i].discount;
      }
    }
    return 0;
  };

  // Calculate subscription pricing
  const calculateSubscription = () => {
    const selectedPlan = profilePlans[profilePlan];
    const views = 2000;
    const months = subscriptionDuration;
    const discount = getDurationDiscount(months) / 100;
    
    const baseCost = views * selectedPlan.subscriptionPrice * months;
    const discountAmount = baseCost * discount;
    const total = baseCost - discountAmount;
    const monthlyPrice = total / months;
    
    return {
      baseCost,
      discountAmount,
      total,
      monthlyPrice,
      discountPercent: getDurationDiscount(months)
    };
  };

  // Calculate PAYG pricing
  const calculatePAYG = () => {
    const selectedPlan = profilePlans[paygProfilePlan];
    const views = profileCreditAmount;
    
    const baseCost = views * selectedPlan.paygPrice;
    const discountPercent = getBulkDiscount(views);
    const discountAmount = baseCost * (discountPercent / 100);
    const total = baseCost - discountAmount;
    
    return {
      baseCost,
      discountAmount,
      total,
      discountPercent
    };
  };

  const getDurationDiscount = (months: number) => {
    if (months === 1) return 5;
    if (months === 3) return 10;
    if (months === 6) return 20;
    if (months === 12) return 30;
    if (months === 24) return 40;
    return 0;
  };

  // Monitor price calculation
  const getMonitorPrice = () => {
    const basePrice = getPrice(monitorTiers, monitorCount, 'monthlyPrice');
    if (monitorBilling === 'monthly') {
      return { price: basePrice, period: '/ month' };
    } else {
      return { price: basePrice * 10, period: '/ year' };
    }
  };

  // Report price calculation
  const getReportPrice = () => {
    const basePrice = getPrice(reportTiers, reportCount, 'price');
    if (reportBilling === 'one-time') {
      return { price: basePrice, period: '/pack' };
    } else {
      return { price: Math.round(basePrice * 0.80), period: '/month' };
    }
  };

  // Team price calculation
  const getTeamPrice = () => {
    const basePrice = getPrice(teamTiers, teamCount, 'monthlyPrice');
    if (teamBilling === 'monthly') {
      return { price: basePrice, period: '/month' };
    } else {
      return { price: basePrice * 10, period: '/year' };
    }
  };

  const subscription = calculateSubscription();
  const payg = calculatePAYG();
  const monitorPrice = getMonitorPrice();
  const reportPrice = getReportPrice();
  const teamPrice = getTeamPrice();

  // Refs for Plan Toggle
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const btnLeftRef = useRef<HTMLButtonElement | null>(null);
  const btnRightRef = useRef<HTMLButtonElement | null>(null);

  // Update background pill size/position based on active button
  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    const targetBtn =
      activePlan === 'individual-plans' ? btnLeftRef.current : btnRightRef.current;
    if (!container || !bg || !targetBtn) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetBtn.getBoundingClientRect();
    const width = targetRect.width;
    const translateX = targetRect.left - containerRect.left;
    bg.style.width = `${width}px`;
    bg.style.transform = `translateX(${translateX}px)`;
  }, [activePlan]);

  // Initial sync after mount for correct positioning
  useEffect(() => {
    const id = setTimeout(() => {
      const container = containerRef.current;
      const bg = bgRef.current;
      const targetBtn = btnLeftRef.current;
      if (!container || !bg || !targetBtn) return;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetBtn.getBoundingClientRect();
      bg.style.width = `${targetRect.width}px`;
      bg.style.transform = `translateX(${targetRect.left - containerRect.left}px)`;
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="py-6 px-4 md:px-5">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-[32px] md:text-5xl font-bold text-center mb-8 md:mb-6 text-[#1B1B1B]">
          Choose your plan
        </h1>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-8">
          <div ref={containerRef} className="inline-flex bg-[#E7F0F5] rounded-full p-1 md:p-1.5 relative w-full max-w-[320px] md:max-w-none md:w-auto">
            <div
              ref={bgRef}
              className="absolute top-1 md:top-1.5 left-1 md:left-1.5 h-[calc(100%-8px)] md:h-[calc(100%-12px)] bg-white rounded-full shadow-md transition-[transform,width] duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]"
            />
            <button
              ref={btnLeftRef}
              className={`flex-1 md:flex-none px-4 md:px-7 py-3 text-sm md:text-base font-semibold rounded-full border-none cursor-pointer transition-colors duration-300 relative z-10 ${
                activePlan === 'individual-plans' ? 'text-[#1D77BD]' : 'text-[#5F5F5F]'
              }`}
              onClick={() => setActivePlan('individual-plans')}
            >
              Individual User
            </button>
            <button
              ref={btnRightRef}
              className={`flex-1 md:flex-none px-4 md:px-7 py-3 text-sm md:text-base font-semibold rounded-full border-none cursor-pointer transition-colors duration-300 relative z-10 ${
                activePlan === 'owner-plans' ? 'text-[#1D77BD]' : 'text-[#5F5F5F]'
              }`}
              onClick={() => setActivePlan('owner-plans')}
            >
              Listing Owners
            </button>
          </div>
        </div>

        {/* Individual User Plans */}
        {activePlan === 'individual-plans' && (
          <div className="flex flex-col md:flex-row md:justify-center gap-6 mb-12 md:flex-wrap max-w-[1400px] mx-auto mt-4 max-md:px-4 max-md:items-center">
            {/* Explorer Plan */}
            <PricingCard
              title="Explorer"
              description="For casual browsing and basic discovery. Search public data, save listings, and make basic comparisons for free."
              price="Free"
              features={[
                { icon: <SearchIcon />, text: 'Unlimited Public Search' },
                { icon: <GridIcon />, text: 'Compare up to 3 Listings' },
                { icon: <BookmarkIcon />, text: 'Save up to 25 Bookmarks' },
                { icon: <EmailIcon />, text: 'Monthly Email Digest' }
              ]}
              buttonText="Current Plan"
              buttonPrimary={false}
            />

            {/* Researcher Plan */}
            <PricingCard
              title="Researcher"
              description="For power users and data analysts who need deeper insights, an ad-free experience, and better organizational tools."
              price="$19"
              period="/ month"
              accentColor="blue"
              features={[
                { icon: <CheckIcon />, text: 'All Explorer features, plus:', bold: true },
                { icon: <NoAdsBlueIcon />, text: 'Ad-Free Experience' },
                { icon: <GridIcon />, text: 'Compare up to 10 Listings' },
                { icon: <CollectionIcon />, text: 'Create Custom Collections' },
                { icon: <ChartBlueIcon />, text: 'View Historical Data Trends' },
                { icon: <DownloadIcon />, text: 'Export Data to CSV' }
              ]}
              buttonText="Choose Researcher"
              buttonPrimary={true}
            />

            {/* Monitor Packs */}
            <PricingCard
              title="Monitor Packs"
              description="Set up real-time alerts on specific listings. Choose monthly or annual billing for continuous monitoring."
              price={`$${monitorPrice.price}`}
              period={monitorPrice.period}
              accentColor="dark"
              customContent={
                <>
                  <PricingToggle
                    options={[
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'yearly', label: 'Annual', badge: '2 Months Free' }
                    ]}
                    active={monitorBilling}
                    onChange={(value) => setMonitorBilling(value as BillingPeriod)}
                  />
                  <PackControl
                    count={monitorCount}
                    label="Monitors"
                    onDecrease={() => setMonitorCount(adjustCount(monitorCount, monitorTiers, 'decrease'))}
                    onIncrease={() => setMonitorCount(adjustCount(monitorCount, monitorTiers, 'increase'))}
                  />
                </>
              }
              features={[
                { icon: <InfoIcon color="#464646" />, text: 'Monitor specific listing fields' },
                { icon: <BellIcon color="#464646" />, text: 'Receive on-site & email alerts' },
                { icon: <ClockIcon color="#464646" />, text: 'Daily check frequency' }
              ]}
              buttonText="Purchase Monitors"
              buttonPrimary={true}
            />

            {/* Report Packs */}
            <PricingCard
              title="Report Packs"
              description="Purchase credits to unlock specific, high-value reports. Choose one-time packs or annual subscription for recurring monthly credits."
              price={`$${reportPrice.price}`}
              period={reportPrice.period}
              accentColor="dark"
              customContent={
                <>
                  <PricingToggle
                    options={[
                      { value: 'one-time', label: 'One-Time' },
                      { value: 'yearly', label: 'Subscription', badge: '20% Off' }
                    ]}
                    active={reportBilling}
                    onChange={(value) => setReportBilling(value as BillingPeriod)}
                  />
                  <PackControl
                    count={reportCount}
                    label={reportBilling === 'yearly' ? 'Reports/Month' : 'Reports'}
                    onDecrease={() => setReportCount(adjustCount(reportCount, reportTiers, 'decrease'))}
                    onIncrease={() => setReportCount(adjustCount(reportCount, reportTiers, 'increase'))}
                  />
                </>
              }
              features={[
                { icon: <LockIcon color="#464646" />, text: 'Unlock detailed contact info' },
                { icon: <InfoIcon color="#464646" />, text: 'Credits never expire' },
                { icon: <CalendarIcon color="#464646" />, text: 'Get reports monthly with subscription' }
              ]}
              buttonText="Purchase Reports"
              buttonPrimary={true}
            />
          </div>
        )}

        {/* Listing Owner Plans */}
        {activePlan === 'owner-plans' && (
          <div className="flex flex-col items-center gap-6 mb-12 mt-4 max-md:px-4">
            {/* Basic Listing */}
            <div className="w-full max-w-[900px] max-md:max-w-[390px] mx-auto bg-white rounded-2xl shadow-md border border-[#E7E7E7] flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex flex-col gap-5 order-1">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[#1B1B1B]">Basic Listing</h2>
                  <p className="text-sm md:text-[15px] leading-relaxed text-[#5F5F5F]">
                    The essential first step. Claim your listing to ensure data accuracy and begin engaging with user reviews.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <FeatureItem icon={<ShieldIcon />} text="Claim Your Listing" />
                  <FeatureItem icon={<TagIcon />} text='"Claimed" Badge' />
                  <FeatureItem icon={<ChatIcon />} text="Respond to Reviews" />
                </div>
              </div>
              <div className="text-center bg-[#F8F9FA] p-5 md:p-6 rounded-xl flex flex-col justify-start order-2">
                <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-5 text-[#1B1B1B]">Get Started</h3>
                <div className="flex items-baseline justify-center mb-4 md:mb-6">
                  <span className="text-5xl md:text-[56px] font-bold text-[#1B1B1B]">Free</span>
                </div>
                <button className="w-full py-3.5 px-6 rounded-lg font-semibold text-base bg-[#F7F7F7] text-[#5F5F5F] border border-[#E7E7E7] hover:bg-[#EEEEEE] hover:border-[#D0D0D0] transition-all">
                  Claim for Free
                </button>
              </div>
            </div>

            {/* Profile Management */}
            <ProfileManagementCard
              profileModel={profileModel}
              setProfileModel={setProfileModel}
              profilePlan={profilePlan}
              setProfilePlan={setProfilePlan}
              paygProfilePlan={paygProfilePlan}
              setPaygProfilePlan={setPaygProfilePlan}
              subscriptionDuration={subscriptionDuration}
              setSubscriptionDuration={setSubscriptionDuration}
              profileCreditAmount={profileCreditAmount}
              setProfileCreditAmount={setProfileCreditAmount}
              profileCreditTiers={profileCreditTiers}
              adjustCount={adjustCount}
              subscription={subscription}
              payg={payg}
              profilePlans={profilePlans}
              showMoreFeatures={showMoreFeatures}
              setShowMoreFeatures={setShowMoreFeatures}
            />

            <BoostedPricing />

            {/* Add-ons Section */}
            <div className="w-full mt-8">
              <h2 className="text-2xl md:text-[32px] font-bold text-center mb-8 md:mb-10 text-[#1B1B1B]">
                Available Add-ons
              </h2>
              <div className="flex flex-col md:grid md:grid-cols-3 gap-5 md:gap-6 mx-auto justify-center max-w-[1068px]">
                {/* Verified Profile */}
                <AddonCard
                  title="Verified Profile"
                  price="$99"
                  period="/year"
                  description="Build trust with a premium verified badge for your owner profile. One-time annual fee per profile (not per listing)."
                  buttonText="Get Verified"
                />

                {/* Team Add-on */}
                <AddonCard
                  title="Team Add-on"
                  price={`$${teamPrice.price}`}
                  period={teamPrice.period}
                  description="Allow multiple users to manage account listings. Base price $15/member/month with volume discounts."
                  customContent={
                    <>
                      <PricingToggle
                        options={[
                          { value: 'monthly', label: 'Monthly' },
                          { value: 'yearly', label: 'Annual', badge: '2 Months Free' }
                        ]}
                        active={teamBilling}
                        onChange={(value) => setTeamBilling(value as BillingPeriod)}
                      />
                      <PackControl
                        count={teamCount}
                        label="Members"
                        onDecrease={() => setTeamCount(adjustCount(teamCount, teamTiers, 'decrease'))}
                        onIncrease={() => setTeamCount(adjustCount(teamCount, teamTiers, 'increase'))}
                      />
                    </>
                  }
                  buttonText="Add Team Members"
                />

                {/* Enhanced Listing Analytics */}
                <AddonCard
                  title="Enhanced Listing Analytics"
                  price={`$${getPrice(analyticsTiers, analyticsCount, 'price')}`}
                  period="/year"
                  description="Get detailed insights and performance metrics for your listings."
                  customContent={
                    <PackControl
                      count={analyticsCount}
                      label="Listings"
                      onDecrease={() => setAnalyticsCount(adjustCount(analyticsCount, analyticsTiers, 'decrease'))}
                      onIncrease={() => setAnalyticsCount(adjustCount(analyticsCount, analyticsTiers, 'increase'))}
                    />
                  }
                  buttonText="Add Analytics"
                />

                {/* Internal Competitor Monitoring */}
                <AddonCard
                  title="Internal Competitor Monitoring"
                  price={`$${getPrice(internalMonitorTiers, internalMonitorCount, 'price')}`}
                  period="/year"
                  description="Monitor competitors within the platform. Track key metrics and changes."
                  customContent={
                    <PackControl
                      count={internalMonitorCount}
                      label="Competitors"
                      onDecrease={() => setInternalMonitorCount(adjustCount(internalMonitorCount, internalMonitorTiers, 'decrease'))}
                      onIncrease={() => setInternalMonitorCount(adjustCount(internalMonitorCount, internalMonitorTiers, 'increase'))}
                    />
                  }
                  buttonText="Add Monitoring"
                />

                {/* External Competitor Monitoring */}
                <AddonCard
                  title="External Competitor Monitoring"
                  price={`$${getPrice(externalMonitorTiers, externalMonitorCount, 'price')}`}
                  period="/year"
                  description="Advanced monitoring including external data sources. Comprehensive competitor analysis."
                  customContent={
                    <PackControl
                      count={externalMonitorCount}
                      label="Competitors"
                      onDecrease={() => setExternalMonitorCount(adjustCount(externalMonitorCount, externalMonitorTiers, 'decrease'))}
                      onIncrease={() => setExternalMonitorCount(adjustCount(externalMonitorCount, externalMonitorTiers, 'increase'))}
                    />
                  }
                  buttonText="Add Monitoring"
                />

                {/* Invite to Review */}
                <AddonCard
                  title="Invite to Review"
                  price={`$${getPrice(inviteTiers, inviteCount, 'price')}`}
                  period="/pack"
                  description="Send review invitations to your customers. Build trust with authentic feedback."
                  customContent={
                    <PackControl
                      count={inviteCount}
                      label="Invites"
                      onDecrease={() => setInviteCount(adjustCount(inviteCount, inviteTiers, 'decrease'))}
                      onIncrease={() => setInviteCount(adjustCount(inviteCount, inviteTiers, 'increase'))}
                    />
                  }
                  buttonText="Purchase Invites"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-components
interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
  accentColor?: 'blue' | 'green' | 'purple' | 'dark';
  features: Array<{ icon: React.ReactNode; text: string; bold?: boolean }>;
  buttonText: string;
  buttonPrimary: boolean;
  customContent?: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  period,
  accentColor,
  features,
  buttonText,
  buttonPrimary,
  customContent
}) => {
  const accentColors = {
    blue: 'border-t-[#1D77BD]',
    green: 'border-t-[#0B6333]',
    purple: 'border-t-[#6F42C1]',
    dark: 'border-t-[#464646]'
  };

  return (
    <div
      className={`w-full max-md:max-w-[360px] md:w-[340px] bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col min-h-auto md:min-h-[520px] shadow-md transition-all hover:-translate-y-1 hover:shadow-lg border border-[#E7E7E7] ${
        accentColor ? `border-t-4 ${accentColors[accentColor]}` : ''
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[#1B1B1B]">{title}</h2>
      <p className="text-sm md:text-[15px] leading-relaxed text-[#5F5F5F] min-h-auto md:min-h-[72px] mb-5 md:mb-6">
        {description}
      </p>
      <div className="flex items-baseline mb-5 md:mb-6">
        <span className="text-4xl md:text-[42px] font-bold text-[#1B1B1B]">{price}</span>
        {period && <span className="text-sm md:text-base ml-1.5 md:ml-2 text-[#5F5F5F] font-medium">{period}</span>}
      </div>
      {customContent}
      <div className="flex flex-col gap-3 my-5 md:my-6 flex-grow">
        {features.map((feature, index) => (
          <FeatureItem key={index} icon={feature.icon} text={feature.text} bold={feature.bold} />
        ))}
      </div>
      <button
        className={`w-full py-3.5 px-6 rounded-lg font-semibold text-base mt-auto transition-all hover:-translate-y-0.5 hover:shadow-md ${
          buttonPrimary
            ? 'bg-[#1D77BD] text-white hover:bg-[#1565A0]'
            : 'bg-[#F7F7F7] text-[#5F5F5F] border border-[#E7E7E7] hover:bg-[#EEEEEE] hover:border-[#D0D0D0]'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  bold?: boolean;
  className?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, bold, className }) => (
  <p className={`relative pl-7 md:pl-8 text-sm md:text-[15px] leading-relaxed text-[#4A4A4A] flex items-center min-h-[20px] md:min-h-[24px] ${className || ''}`}>
    <span className="absolute left-0 top-0.5 w-[18px] h-[18px] md:w-5 md:h-5 flex-shrink-0">{icon}</span>
    {bold ? <strong className="font-semibold text-[#1B1B1B]">{text}</strong> : text}
  </p>
);

interface PricingToggleProps {
  options: Array<{ value: string; label: string; badge?: string }>;
  active: string;
  onChange: (value: string) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ options, active, onChange }) => {
  return (
    <ul className="list-none flex bg-[#E7F0F5] rounded-full p-1 my-4 md:my-5 w-full md:w-fit self-center">
      {options.map((option, index) => (
        <li
          key={option.value}
          className={`flex-1 md:flex-none px-3 md:px-5 py-2 text-[13px] md:text-sm font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1 md:gap-1.5 whitespace-nowrap ${
            active === option.value ? 'text-[#1D77BD]' : 'text-[#5F5F5F]'
          }`}
          onClick={() => onChange(option.value)}
        >
          <span className="truncate">{option.label}</span>
          {option.badge && (
            <span className="text-[10px] md:text-[11px] bg-[#089E68] text-white px-1 md:px-1.5 py-0.5 rounded-xl font-semibold uppercase tracking-wider flex-shrink-0">
              {option.badge}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

interface PackControlProps {
  count: number;
  label: string;
  onDecrease: () => void;
  onIncrease: () => void;
}

const PackControl: React.FC<PackControlProps> = ({ count, label, onDecrease, onIncrease }) => (
  <div className="my-4 p-4 bg-[#F7F9FB] rounded-lg text-center">
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onDecrease}
        className="w-9 h-9 border-2 border-[#CBD5E0] rounded-full flex items-center justify-center cursor-pointer text-lg md:text-xl transition-all bg-white text-[#4A4A4A] hover:bg-[#E7F0F5] hover:border-[#1D77BD]"
      >
        −
      </button>
      <div>
        <div className="text-xl md:text-2xl font-bold min-w-[60px] text-[#1B1B1B]">{count.toLocaleString()}</div>
        <div className="text-xs md:text-sm text-[#5F5F5F] mt-1">{label}</div>
      </div>
      <button
        onClick={onIncrease}
        className="w-9 h-9 border-2 border-[#CBD5E0] rounded-full flex items-center justify-center cursor-pointer text-lg md:text-xl transition-all bg-white text-[#4A4A4A] hover:bg-[#E7F0F5] hover:border-[#1D77BD]"
      >
        +
      </button>
    </div>
  </div>
);

// Profile Management Card Component
const ProfileManagementCard: React.FC<any> = ({
  profileModel,
  setProfileModel,
  profilePlan,
  setProfilePlan,
  paygProfilePlan,
  setPaygProfilePlan,
  subscriptionDuration,
  setSubscriptionDuration,
  profileCreditAmount,
  setProfileCreditAmount,
  profileCreditTiers,
  adjustCount,
  subscription,
  payg,
  profilePlans,
  showMoreFeatures,
  setShowMoreFeatures
}) => {
  return (
    <div className="w-full max-w-[900px] max-md:max-w-[390px] mx-auto bg-white rounded-2xl shadow-md border border-[#E7E7E7] border-t-4 border-t-[#0B6333] flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex flex-col gap-5 order-1">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[#1B1B1B]">Profile Management</h2>
          <p className="text-sm md:text-[15px] leading-relaxed text-[#5F5F5F]">
            Take control of your brand with verified status and advanced profile features. Choose your subscription or pay-as-you-go.
          </p>
        </div>

        {/* Payment Model Toggle */}
        <div className="flex gap-2 md:gap-3 mb-5 md:mb-6">
          <div
            className={`flex-1 p-3 border-2 rounded-lg bg-white cursor-pointer transition-all text-center ${
              profileModel === 'subscription'
                ? 'border-[#1D77BD] bg-[#F0F8FF]'
                : 'border-[#E7E7E7]'
            }`}
            onClick={() => setProfileModel('subscription')}
          >
            <h4 className="text-sm md:text-base font-semibold text-[#1B1B1B] mb-1">Subscription</h4>
            <p className="text-[11px] md:text-xs text-[#5F5F5F]">View-based pricing</p>
          </div>
          <div
            className={`flex-1 p-3 border-2 rounded-lg bg-white cursor-pointer transition-all text-center ${
              profileModel === 'credits'
                ? 'border-[#1D77BD] bg-[#F0F8FF]'
                : 'border-[#E7E7E7]'
            }`}
            onClick={() => setProfileModel('credits')}
          >
            <h4 className="text-sm md:text-base font-semibold text-[#1B1B1B] mb-1">Pay As You Go</h4>
            <p className="text-[11px] md:text-xs text-[#5F5F5F]">Purchase credits</p>
          </div>
        </div>

        {/* Subscription Model */}
        {profileModel === 'subscription' && (
          <div className="bg-[#F7F9FB] rounded-lg p-5 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#1B1B1B] mb-2">
                Average Monthly Views
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-3 px-4 pr-10 border border-[#CBD5E0] rounded-lg text-base bg-[#F7F9FB] text-[#1B1B1B] font-semibold cursor-default"
                  value="2,000"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#CBD5E0] rounded-full inline-flex items-center justify-center cursor-help text-xs text-[#5F5F5F] hover:bg-[#A0AEC0] group">
                  ?
                  <span className="hidden group-hover:block absolute bottom-full right-0 transform -translate-y-2 bg-[#1B1B1B] text-white px-3 py-2 rounded-md text-[13px] whitespace-nowrap z-10 shadow-md">
                    Your Listing&apos;s Average Monthly Views: 2,000
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-[#1B1B1B] mb-2">
                Select Profile Level
              </label>
              <select
                className="w-full py-3.5 px-4 pr-10 border-2 border-[#E2E8F0] rounded-lg text-[15px] font-medium text-[#1B1B1B] bg-white cursor-pointer transition-all appearance-none hover:border-[#1D77BD] hover:bg-[#F7FAFC] focus:outline-none focus:border-[#1D77BD] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]"
                value={profilePlan}
                onChange={(e) => setProfilePlan(e.target.value as ProfilePlanType)}
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235F5F5F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px'
                }}
              >
                <option value="enhanced">Enhanced Profile - $0.05/view</option>
                <option value="premium">Premium Profile - $0.10/view</option>
                <option value="premium-plus">Premium+ Profile - $0.25/view</option>
              </select>
            </div>

            <div className="mt-4 md:mt-5">
              <label className="text-sm font-semibold mb-2 block">Subscription Duration</label>
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
              {[
                { months: 1, discount: 5 },
                { months: 3, discount: 10 },
                { months: 6, discount: 20 },
                { months: 12, discount: 30 },
                { months: 24, discount: 40 }
              ].map(({ months, discount }) => (
                <button
                  key={months}
                  className={`flex-1 min-w-0 md:min-w-[80px] py-2 px-2 md:px-3 border rounded-md text-xs md:text-sm font-medium cursor-pointer transition-all text-center ${
                    subscriptionDuration === months
                      ? 'bg-[#1D77BD] text-white border-[#1D77BD]'
                      : 'bg-white border-[#CBD5E0] text-[#4A4A4A] hover:border-[#1D77BD] hover:bg-[#F0F8FF]'
                  }`}
                  onClick={() => setSubscriptionDuration(months)}
                >
                  {months} Month{months > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PAYG Model */}
        {profileModel === 'credits' && (
          <div className="bg-[#F7F9FB] rounded-lg p-5 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#1B1B1B] mb-2">
                Select Profile Level
              </label>
              <select
                className="w-full py-3.5 px-4 pr-10 border-2 border-[#E2E8F0] rounded-lg text-[15px] font-medium text-[#1B1B1B] bg-white cursor-pointer transition-all appearance-none hover:border-[#1D77BD] hover:bg-[#F7FAFC] focus:outline-none focus:border-[#1D77BD] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]"
                value={paygProfilePlan}
                onChange={(e) => setPaygProfilePlan(e.target.value as ProfilePlanType)}
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235F5F5F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px'
                }}
              >
                <option value="enhanced">Enhanced Profile - $0.10/view</option>
                <option value="premium">Premium Profile - $0.20/view</option>
                <option value="premium-plus">Premium+ Profile - $0.50/view</option>
              </select>
            </div>

            <div className="mt-5">
              <PackControl
                count={profileCreditAmount}
                label="Views"
                onDecrease={() => setProfileCreditAmount(adjustCount(profileCreditAmount, profileCreditTiers, 'decrease'))}
                onIncrease={() => setProfileCreditAmount(adjustCount(profileCreditAmount, profileCreditTiers, 'increase'))}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Panel */}
      <div className="text-center bg-[#F8F9FA] p-5 md:p-8 rounded-xl flex flex-col justify-start order-3 md:order-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-5 text-[#1B1B1B]">
          {profileModel === 'subscription'
            ? profilePlans[profilePlan].name.split(' ')[0] + ' Plan'
            : profilePlans[paygProfilePlan].name.split(' ')[0] + ' Plan'}
        </h3>
        <div className="flex items-baseline justify-center mb-4 md:mb-6">
          <span className="text-5xl md:text-[56px] font-bold text-[#1B1B1B]">
            {profileModel === 'subscription'
              ? `$${Math.round(subscription.monthlyPrice)}`
              : `$${Math.round(payg.total).toLocaleString()}`}
          </span>
          <span className="text-base md:text-lg font-medium text-[#5F5F5F] ml-2">
            {profileModel === 'subscription' ? '/ month' : 'total'}
          </span>
        </div>

        {/* Price Breakdown */}
        <div className="bg-transparent p-0 mb-4 md:mb-6 max-md:overflow-x-auto">
          <div className="max-md:min-w-[420px]">
          {profileModel === 'subscription' && (
            <>
              <div className="flex justify-between mb-2 text-[13px] md:text-sm">
                <span className="text-left">Base Cost (2,000 × ${profilePlans[profilePlan].subscriptionPrice} × {subscriptionDuration})</span>
                <span className="flex-shrink-0 ml-2">${subscription.baseCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-[13px] md:text-sm">
                <span className="flex items-center flex-wrap">
                  <span>Discount</span>
                  <span className="inline-block bg-[#089E68] text-white px-1.5 md:px-2 py-0.5 rounded text-[11px] md:text-xs font-semibold ml-1.5 md:ml-2">
                    {subscription.discountPercent}%
                  </span>
                </span>
                <span className="flex-shrink-0 ml-2">-${subscription.discountAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-base md:text-lg text-[#1B1B1B] pt-2 border-t border-[#CBD5E0]">
                <span>Total</span>
                <span className="flex-shrink-0">${subscription.total.toLocaleString()}</span>
              </div>
            </>
          )}
          {profileModel === 'credits' && (
            <>
              <div className="flex justify-between mb-2 text-[13px] md:text-sm">
                <span className="text-left">Base Cost ({profileCreditAmount.toLocaleString()} × ${profilePlans[paygProfilePlan].paygPrice})</span>
                <span className="flex-shrink-0 ml-2">${payg.baseCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-[13px] md:text-sm">
                <span className="flex items-center flex-wrap">
                  <span>Bulk Discount</span>
                  <span className="inline-block bg-[#089E68] text-white px-1.5 md:px-2 py-0.5 rounded text-[11px] md:text-xs font-semibold ml-1.5 md:ml-2">
                    {payg.discountPercent}%
                  </span>
                </span>
                <span className="flex-shrink-0 ml-2">-${Math.round(payg.discountAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-base md:text-lg text-[#1B1B1B] pt-2 border-t border-[#CBD5E0]">
                <span>Total</span>
                <span className="flex-shrink-0">${Math.round(payg.total).toLocaleString()}</span>
              </div>
            </>
          )}
          </div>
        </div>

        <div className="w-full h-px bg-[#E2E8F0] my-4 md:my-5" />

        {/* Features */}
        <div className="flex flex-col gap-2.5 text-left flex-grow">
          <FeatureItem icon={<CheckIcon />} text="All Basic features, plus:" bold />
          {profileModel === 'subscription' && (
            <>
              <FeatureItem icon={<GiftIcon />} text="Offers" />
              <FeatureItem icon={<NewsletterIcon />} text="Premium Newsletters" />
            </>
          )}
          <FeatureItem icon={<ShieldIcon />} text='Premium "Verified" Badge' />
          <FeatureItem icon={<EditIcon />} text="Full Profile Editing" />
          {!showMoreFeatures && (
            <>
              <FeatureItem icon={<ImageIcon />} text="Rich Media Uploads" className={showMoreFeatures ? '' : 'hidden'} />
              <FeatureItem icon={<NoAdsIcon />} text="Remove Competitor Ads" className={showMoreFeatures ? '' : 'hidden'} />
              <FeatureItem icon={<ChartIcon />} text="Advanced Analytics Dashboard" className={showMoreFeatures ? '' : 'hidden'} />
            </>
          )}
          {showMoreFeatures && (
            <>
              <FeatureItem icon={<ImageIcon />} text="Rich Media Uploads" />
              <FeatureItem icon={<NoAdsIcon />} text="Remove Competitor Ads" />
              <FeatureItem icon={<ChartIcon />} text="Advanced Analytics Dashboard" />
            </>
          )}
          <button
            className="flex items-center gap-1.5 mt-2 pl-1 text-[#0B6333] text-xs md:text-[13px] font-semibold cursor-pointer hover:text-[#016853] transition-colors"
            onClick={() => setShowMoreFeatures(!showMoreFeatures)}
          >
            <span>{showMoreFeatures ? 'Show Less' : 'Show More'}</span>
            <svg
              className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-transform ${showMoreFeatures ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 9l-7 7-7-7"
                stroke="#0B6333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <button className="w-full py-3.5 px-6 rounded-lg font-semibold text-base mt-auto bg-[#1D77BD] text-white hover:bg-[#1565A0] transition-all">
          Choose Plan
        </button>
      </div>
    </div>
  );
};

// Addon Card Component
interface AddonCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  buttonText: string;
  customContent?: React.ReactNode;
}

const AddonCard: React.FC<AddonCardProps> = ({
  title,
  price,
  period,
  description,
  buttonText,
  customContent
}) => (
  <div className="bg-white rounded-2xl p-5 md:p-8 border border-[#E7E7E7] border-t-4 border-t-[#464646] transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col min-h-[300px] md:min-h-[400px] w-full md:w-[340px]">
    <h3 className="text-xl md:text-2xl font-bold text-[#1B1B1B] mb-2 md:mb-3 text-left">{title}</h3>
    <div className="text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-3 text-left">
      {price}
      <span className="text-sm md:text-base text-[#5F5F5F] font-medium">{period}</span>
    </div>
    <p className="text-sm md:text-[15px] text-[#5F5F5F] leading-relaxed mb-4 md:mb-6 flex-grow text-left">
      {description}
    </p>
    {customContent}
    <button className="w-full py-3.5 px-6 rounded-lg font-semibold text-base mt-auto bg-[#1D77BD] text-white hover:bg-[#1565A0] transition-all hover:-translate-y-0.5 hover:shadow-md">
      {buttonText}
    </button>
  </div>
);

// SVG Icons
const SearchIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const GridIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const EmailIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CheckIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const NoAdsBlueIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const NoAdsIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CollectionIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ChartBlueIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ChartIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const DownloadIcon = () => (
  <svg fill="#1D77BD" viewBox="0 0 24 24">
    <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#1D77BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const InfoIcon = ({ color = '#1D77BD' }) => (
  <svg fill={color} viewBox="0 0 24 24">
    <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const BellIcon = ({ color = '#1D77BD' }) => (
  <svg fill={color} viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ClockIcon = ({ color = '#1D77BD' }) => (
  <svg fill={color} viewBox="0 0 24 24">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const LockIcon = ({ color = '#1D77BD' }) => (
  <svg fill={color} viewBox="0 0 24 24">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CalendarIcon = ({ color = '#1D77BD' }) => (
  <svg fill={color} viewBox="0 0 24 24">
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ShieldIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const TagIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ChatIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const GiftIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const NewsletterIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const EditIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ImageIcon = () => (
  <svg fill="#0B6333" viewBox="0 0 24 24">
    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="#0B6333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default BasicPricing;

