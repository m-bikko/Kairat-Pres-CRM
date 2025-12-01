import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, DollarSign, Users, Briefcase } from 'lucide-react';

const data = [
  { name: 'Mon', leads: 400, sales: 240 },
  { name: 'Tue', leads: 300, sales: 139 },
  { name: 'Wed', leads: 200, sales: 980 },
  { name: 'Thu', leads: 278, sales: 390 },
  { name: 'Fri', leads: 189, sales: 480 },
  { name: 'Sat', leads: 239, sales: 380 },
  { name: 'Sun', leads: 349, sales: 430 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: any; color: string }> = ({ title, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${color} opacity-10 group-hover:scale-110 transition-transform`} />
    <div className="flex justify-between items-start z-10">
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-gray-700`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="flex items-center gap-1 text-green-600 text-xs font-medium z-10">
       <ArrowUpRight size={12} />
       {trend} <span className="text-gray-400 font-normal ml-1">vs last month</span>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="$124,500" trend="+12.5%" icon={DollarSign} color="bg-green-500" />
        <StatCard title="Active Leads" value="1,294" trend="+4.1%" icon={Users} color="bg-blue-500" />
        <StatCard title="Pipeline Value" value="$482k" trend="+8.2%" icon={Briefcase} color="bg-purple-500" />
        <StatCard title="Conversion Rate" value="2.4%" trend="+0.8%" icon={ArrowUpRight} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue Analytics</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  itemStyle={{ color: '#475569', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="text-lg font-medium text-gray-900 mb-6">Lead Sources</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                 <Bar dataKey="leads" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};
