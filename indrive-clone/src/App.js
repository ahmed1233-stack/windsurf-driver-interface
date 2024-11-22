import React, { useState } from 'react';
import { MapIcon, ClockIcon, TruckIcon, UserIcon, BanknotesIcon, StarIcon, BellIcon, ChartBarIcon } from '@heroicons/react/24/outline';

function App() {
  const [activeTab, setActiveTab] = useState('orders');
  const [driverStatus, setDriverStatus] = useState('offline');
  const [showEarnings, setShowEarnings] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "New bonus available! Complete 10 deliveries today", type: "promo" },
    { id: 2, message: "Your rating has increased to 4.9!", type: "achievement" }
  ]);

  const orders = [
    { 
      id: 1, 
      pickup: "Main St 123", 
      dropoff: "Oak Ave 456", 
      price: "25.00", 
      distance: "3.2", 
      status: "new",
      paymentMethod: "Cash",
      customerRating: 4.8
    },
    { 
      id: 2, 
      pickup: "Pine St 789", 
      dropoff: "Elm St 012", 
      price: "18.50", 
      distance: "2.1", 
      status: "new",
      paymentMethod: "Card",
      customerRating: 4.5
    },
  ];

  const earnings = {
    today: 125.50,
    week: 850.75,
    month: 3250.00,
    stats: [
      { label: "Completed Rides", value: 45 },
      { label: "Total Distance", value: "320 km" },
      { label: "Average Rating", value: 4.9 }
    ]
  };

  const renderEarningsModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showEarnings ? '' : 'hidden'}`}>
      <div className="bg-card shadow-xl rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Earnings Overview</h3>
          <button onClick={() => setShowEarnings(false)} className="text-gray-400 hover:text-gray-500">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card shadow-card border border-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Today</div>
              <div className="text-lg font-semibold text-primary-500">${earnings.today}</div>
            </div>
            <div className="bg-card shadow-card border border-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600">This Week</div>
              <div className="text-lg font-semibold text-primary-500">${earnings.week}</div>
            </div>
            <div className="bg-card shadow-card border border-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600">This Month</div>
              <div className="text-lg font-semibold text-primary-500">${earnings.month}</div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Statistics</h4>
            <div className="space-y-3">
              {earnings.stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <span className="text-sm font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-app">
      {/* Status Bar */}
      <div className="bg-card shadow-bottom border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className={`status-dot ${driverStatus === 'online' ? 'status-dot-available' : 'status-dot-offline'}`} />
            <span className="text-sm font-medium text-gray-700">
              {driverStatus === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setShowEarnings(true)} className="p-2">
              <BanknotesIcon className="w-6 h-6 text-gray-500" />
            </button>
            <div className="relative">
              <BellIcon className="w-6 h-6 text-gray-500" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDriverStatus(driverStatus === 'online' ? 'offline' : 'online')}
          className={`btn w-full ${driverStatus === 'online' ? 'btn-secondary' : 'btn-primary'}`}
        >
          {driverStatus === 'online' ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card shadow-card rounded-xl p-3 border border-gray-100">
            <div className="text-xs text-gray-500">Today</div>
            <div className="text-lg font-semibold text-primary-500">${earnings.today}</div>
          </div>
          <div className="bg-card shadow-card rounded-xl p-3 border border-gray-100">
            <div className="text-xs text-gray-500">Rating</div>
            <div className="text-lg font-semibold text-primary-500 flex items-center">
              4.9 <StarIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="bg-card shadow-card rounded-xl p-3 border border-gray-100">
            <div className="text-xs text-gray-500">Rides</div>
            <div className="text-lg font-semibold text-primary-500">45</div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-card shadow-card rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-yellow">New Order</span>
                <span className="text-lg font-semibold text-primary-500">${order.price}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Pickup</div>
                    <div className="text-sm font-medium">{order.pickup}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Dropoff</div>
                    <div className="text-sm font-medium">{order.dropoff}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3 mt-2">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <TruckIcon className="w-4 h-4 mr-1" />
                      {order.distance} km
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      15 min
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 mr-1" />
                      {order.customerRating}
                    </div>
                  </div>
                  <button className="btn btn-primary">
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card shadow-top border-t border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-around">
          <button
            onClick={() => setActiveTab('orders')}
            className={`p-2 flex flex-col items-center ${activeTab === 'orders' ? 'text-primary-500' : 'text-gray-400'}`}
          >
            <TruckIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`p-2 flex flex-col items-center ${activeTab === 'earnings' ? 'text-primary-500' : 'text-gray-400'}`}
          >
            <ChartBarIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Stats</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`p-2 flex flex-col items-center ${activeTab === 'profile' ? 'text-primary-500' : 'text-gray-400'}`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Earnings Modal */}
      {renderEarningsModal()}
    </div>
  );
}

export default App;
