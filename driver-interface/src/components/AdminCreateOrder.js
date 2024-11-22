import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import RocketLogo from './RocketLogo';
import SimpleMap from './SimpleMap';
import EnvTest from './EnvTest';

// Mock drivers data - in a real app, this would come from an API
const MOCK_DRIVERS = [
  { id: 'driver1', name: 'John Driver', status: 'available' }
];

function AdminCreateOrder() {
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageType: 'small',
    priority: 'normal',
    price: '',
    assignedDriver: MOCK_DRIVERS[0].id,
    notes: ''
  });

  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating order with data:', formData);

    // Create new order with location data
    const newOrder = addOrder({
      ...formData,
      pickupLocation,
      deliveryLocation,
      timestamp: new Date().toISOString()
    });

    console.log('Created new order:', newOrder);

    // Reset form
    setFormData({
      customerName: '',
      customerPhone: '',
      pickupAddress: '',
      deliveryAddress: '',
      packageType: 'small',
      priority: 'normal',
      price: '',
      assignedDriver: MOCK_DRIVERS[0].id,
      notes: ''
    });
    setPickupLocation(null);
    setDeliveryLocation(null);

    setShowSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePickupSelect = (location) => {
    setPickupLocation(location);
    // Here you would typically use a geocoding service to get the address
    setFormData(prev => ({
      ...prev,
      pickupAddress: `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
    }));
  };

  const handleDeliverySelect = (location) => {
    setDeliveryLocation(location);
    // Here you would typically use a geocoding service to get the address
    setFormData(prev => ({
      ...prev,
      deliveryAddress: `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-6">
          <RocketLogo width="150" height="100" />
          <h2 className="text-2xl font-bold text-gray-800 ml-4">Create New Order</h2>
        </div>
        
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            Order created successfully and assigned to driver!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Map Section */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <EnvTest />
            <SimpleMap
              pickupLocation={pickupLocation}
              deliveryLocation={deliveryLocation}
              onPickupSelect={handlePickupSelect}
              onDeliverySelect={handleDeliverySelect}
            />
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Delivery Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
              <input
                type="text"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Package Details */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Package Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Type</label>
                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="small">Small Package</option>
                  <option value="medium">Medium Package</option>
                  <option value="large">Large Package</option>
                  <option value="extra_large">Extra Large Package</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assign Driver</label>
                <select
                  name="assignedDriver"
                  value={formData.assignedDriver}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {MOCK_DRIVERS.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Additional Notes</h3>
            <div>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Add any special instructions or notes here..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateOrder;
