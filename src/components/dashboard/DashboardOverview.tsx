import React from 'react';
import { BarChart2, Clock, FileText, Users } from 'lucide-react';

const stats = [
  { name: 'Total Uploads', value: '245', icon: FileText, change: '+12%' },
  { name: 'Processing Time', value: '1.2m', icon: Clock, change: '-8%' },
  { name: 'Team Members', value: '12', icon: Users, change: '+2' },
  { name: 'Engagement Rate', value: '84%', icon: BarChart2, change: '+6%' },
];

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.name}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg">
              <stat.icon className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-400">{stat.change}</span>
            <span className="text-sm text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}