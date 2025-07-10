// import React from 'react';
import UserHeader from '../components/UserHeader';
import BalanceCard from '../components/BalanceCard';
import DashboardIcons from '../components/DashboardIcons';
import PromoBanner from '../components/PromoBanner';
import RecentTransactions from '../components/RecentTransactions';
import BottomNav from '../components/BottomNav';

const DashboardPage = () => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md">
    <UserHeader />
    <BalanceCard />
    <DashboardIcons />
    <PromoBanner />
    <RecentTransactions />
    <BottomNav />
 </div>
</div>
  );
};

export default DashboardPage;
