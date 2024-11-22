import React, { useState } from 'react';
import Login from './Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import AdminCreateOrder from './components/AdminCreateOrder';
import DriverOrders from './components/DriverOrders';
import { OrderProvider } from './context/OrderContext';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [driverStatus, setDriverStatus] = useState('offline');
  const [showEarnings, setShowEarnings] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <OrderProvider>
      <div className="min-h-screen bg-neutral-50">
        <Navigation onViewChange={setCurrentView} isAdmin={user.role === 'admin'} />
        <main className="md:ml-64 pt-4 pb-20 md:pb-4">
          {user.role === 'admin' ? (
            // Admin Interface
            (() => {
              switch (currentView) {
                case 'dashboard':
                  return <AdminDashboard handleLogout={handleLogout} />;
                case 'orders':
                  return <AdminCreateOrder />;
                default:
                  return <AdminDashboard handleLogout={handleLogout} />;
              }
            })()
          ) : (
            // Driver Interface
            (() => {
              switch (currentView) {
                case 'dashboard':
                  return (
                    <Dashboard 
                      driverStatus={driverStatus}
                      setDriverStatus={setDriverStatus}
                      showEarnings={showEarnings}
                      setShowEarnings={setShowEarnings}
                      notifications={notifications}
                      handleLogout={handleLogout}
                    />
                  );
                case 'orders':
                  return <DriverOrders driverId={user.id} />;
                case 'profile':
                  return <Profile />;
                default:
                  return (
                    <Dashboard 
                      driverStatus={driverStatus}
                      setDriverStatus={setDriverStatus}
                      showEarnings={showEarnings}
                      setShowEarnings={setShowEarnings}
                      notifications={notifications}
                      handleLogout={handleLogout}
                    />
                  );
              }
            })()
          )}
        </main>
      </div>
    </OrderProvider>
  );
}

export default App;
