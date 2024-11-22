import React, { useEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import RocketLogo from './RocketLogo';
import MapComponent from './MapComponent';

function DriverOrders({ driverId }) {
  const { orders, updateOrderStatus } = useOrders();

  // Debug logging
  useEffect(() => {
    console.log('Driver ID:', driverId);
    console.log('All Orders:', orders);
  }, [driverId, orders]);

  // Filter orders assigned to this driver
  const driverOrders = orders.filter(order => {
    console.log('Checking order:', order, 'against driver:', driverId);
    return order.assignedDriver === driverId;
  });

  console.log('Filtered Driver Orders:', driverOrders);

  const handleAcceptOrder = (orderId) => {
    updateOrderStatus(orderId, 'accepted', driverId);
  };

  const handleCompleteOrder = (orderId) => {
    updateOrderStatus(orderId, 'completed', driverId);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Driver Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                <RocketLogo width="80" height="80" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5">
                <CheckCircleIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">John Driver</h2>
              <p className="text-gray-600">ID: {driverId}</p>
              <div className="mt-2">
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  Active Driver
                </span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
        
        {driverOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No orders assigned to you at the moment.
          </div>
        ) : (
          <div className="space-y-8">
            {driverOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order #{order.id}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)} mt-2`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">${order.price}</p>
                      <p className="text-sm text-gray-500">{order.priority} Priority</p>
                    </div>
                  </div>

                  {/* Map showing route */}
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <MapComponent
                      pickupLocation={order.pickupLocation}
                      deliveryLocation={order.deliveryLocation}
                      isInteractive={false}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                      <p className="text-gray-800">{order.customerName}</p>
                      <p className="text-gray-600">{order.customerPhone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Package</h4>
                      <p className="text-gray-800">{order.packageType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Pickup Address</h4>
                      <p className="text-gray-800">{order.pickupAddress}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Delivery Address</h4>
                      <p className="text-gray-800">{order.deliveryAddress}</p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="text-gray-800">{order.notes}</p>
                    </div>
                  )}

                  <div className="flex justify-end space-x-4">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleAcceptOrder(order.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Accept Order
                      </button>
                    )}
                    {order.status === 'accepted' && (
                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverOrders;
