import React from 'react';
import {
  HomeIcon,
  UserIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

function Navigation({ onViewChange, isAdmin }) {
  const navigationItems = isAdmin
    ? [
        { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
        { name: 'Create Order', icon: ClipboardDocumentListIcon, view: 'orders' },
      ]
    : [
        { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
        { name: 'My Orders', icon: TruckIcon, view: 'orders' },
        { name: 'Profile', icon: UserIcon, view: 'profile' },
      ];

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg hidden md:block">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isAdmin ? 'Admin Panel' : 'Driver App'}
        </h1>
      </div>
      <div className="px-2">
        {navigationItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onViewChange(item.view)}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
          >
            <item.icon className="h-6 w-6 mr-3" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
