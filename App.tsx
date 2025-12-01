import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Pipeline } from './pages/Pipeline';
import { Billing } from './pages/Billing';
import { CalendarView } from './pages/Calendar';

// Simple placeholder components for unused tabs
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400">
    <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 animate-pulse"></div>
    <h3 className="text-lg font-medium text-gray-500">{title} Module</h3>
    <p className="text-sm">This feature is coming soon.</p>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'pipeline': return <Pipeline />;
      case 'billing': return <Billing />;
      case 'calendar': return <CalendarView />;
      case 'lists': return <Placeholder title="Lists & Clients" />;
      case 'settings': return <Placeholder title="Settings" />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
