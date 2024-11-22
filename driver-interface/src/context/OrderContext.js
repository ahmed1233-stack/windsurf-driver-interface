import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // Initialize orders from localStorage or empty array
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [orderUpdates, setOrderUpdates] = useState([]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    console.log('Saving orders to localStorage:', orders);
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    console.log('Adding new order:', orderData);
    
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      status: 'pending',
      timestamp: new Date().toISOString(),
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date().toISOString()
        }
      ]
    };

    console.log('Created new order object:', newOrder);

    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders, newOrder];
      console.log('Updated orders list:', updatedOrders);
      return updatedOrders;
    });

    setOrderUpdates(prev => [...prev, {
      type: 'NEW_ORDER',
      order: newOrder,
      timestamp: new Date().toISOString()
    }]);

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, driverId = null) => {
    console.log('Updating order status:', { orderId, newStatus, driverId });

    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = {
            ...order,
            status: newStatus,
            statusHistory: [
              ...order.statusHistory,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                driverId
              }
            ]
          };
          console.log('Updated order:', updatedOrder);
          return updatedOrder;
        }
        return order;
      });

      console.log('Updated orders after status change:', updatedOrders);
      return updatedOrders;
    });
  };

  const getOrdersByDriver = (driverId) => {
    console.log('Getting orders for driver:', driverId);
    console.log('All orders:', orders);
    const driverOrders = orders.filter(order => {
      const matches = order.assignedDriver === driverId;
      console.log('Order:', order, 'matches driver?', matches);
      return matches;
    });
    console.log('Found driver orders:', driverOrders);
    return driverOrders;
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  const getRecentUpdates = () => {
    return orderUpdates.slice(-10).reverse();
  };

  // Debug: Log orders whenever they change
  useEffect(() => {
    console.log('Current orders in context:', orders);
  }, [orders]);

  const contextValue = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrdersByDriver,
    getOrdersByStatus,
    getRecentUpdates,
    orderUpdates
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
