import React from 'react';
import { Home, Library, Settings, BarChart, Users, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', icon: Home, current: true },
  { name: 'Library', icon: Library, current: false },
  { name: 'Analytics', icon: BarChart, current: false },
  { name: 'Team', icon: Users, current: false },
  { name: 'Settings', icon: Settings, current: false },
];

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800 w-64">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white">SermonShare</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href="#"
            className={cn(
              'flex items-center px-4 py-3 text-sm font-medium rounded-lg',
              item.current
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}