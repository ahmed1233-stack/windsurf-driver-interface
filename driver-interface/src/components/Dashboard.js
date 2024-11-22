import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  MapIcon,
  StarIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const [earnings] = useState({
    today: 145.50,
    week: 850.75,
    month: 3250.20
  });

  const [recentOrders] = useState([
    { id: 1, from: "Airport", to: "City Center", amount: 35, status: "completed", rating: 5 },
    { id: 2, from: "Shopping Mall", to: "Business District", amount: 25, status: "completed", rating: 4 },
    { id: 3, from: "Train Station", to: "Airport", amount: 40, status: "in-progress" }
  ]);

  const [notifications] = useState([
    { id: 1, type: "surge", message: "Surge pricing in downtown area!", time: "5m ago" },
    { id: 2, type: "promo", message: "Complete 5 rides to earn $50 bonus", time: "1h ago" },
    { id: 3, type: "system", message: "System maintenance scheduled", time: "2h ago" }
  ]);

  const [stats] = useState({
    totalRides: 142,
    avgRating: 4.8,
    completionRate: 98,
    onlineHours: 38
  });

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header with Profile */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back, Driver!</h1>
          <p className="text-neutral-500">Here's your dashboard overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors">
            <BellIcon className="w-6 h-6 text-neutral-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <UserCircleIcon className="w-8 h-8 text-neutral-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-neutral-900">John Doe</div>
              <div className="text-xs text-neutral-500">4.8 ★</div>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Today's Earnings</p>
              <p className="text-2xl font-bold text-neutral-900">${earnings.today}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Total Rides</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.totalRides}</p>
            </div>
            <div className="p-3 bg-secondary-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Average Rating</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.avgRating}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <StarIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Online Hours</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.onlineHours}h</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <MapIcon className="w-8 h-8 text-neutral-500" />
                  <div>
                    <p className="font-medium text-neutral-900">{order.from} → {order.to}</p>
                    <p className="text-sm text-neutral-500">${order.amount}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {order.rating && (
                    <div className="flex items-center text-sm text-yellow-600">
                      <StarIcon className="w-4 h-4 mr-1" />
                      {order.rating}
                    </div>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'surge' 
                    ? 'bg-primary-100' 
                    : notification.type === 'promo' 
                    ? 'bg-green-100' 
                    : 'bg-blue-100'
                }`}>
                  <BellIcon className={`w-5 h-5 ${
                    notification.type === 'surge' 
                      ? 'text-primary-600' 
                      : notification.type === 'promo' 
                      ? 'text-green-600' 
                      : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{notification.message}</p>
                  <p className="text-xs text-neutral-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Earnings Overview</h2>
          <select className="text-sm border border-neutral-200 rounded-lg px-3 py-2">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
          <p className="text-neutral-500">Earnings chart will be implemented here</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
