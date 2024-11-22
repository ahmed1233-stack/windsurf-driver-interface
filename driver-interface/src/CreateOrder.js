import React, { useState } from 'react';
import { MapPinIcon, FlagIcon, CurrencyDollarIcon, ArrowLeftIcon, BellIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

function CreateOrder({ onCreate }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [price, setPrice] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [isUrgent] = useState(Math.random() > 0.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickup && dropoff && price) {
      onCreate({
        pickup,
        dropoff,
        price,
      });
      setPickup('');
      setDropoff('');
      setPrice('');
      setShowSummary(false);
    }
  };

  const handleLocationInput = (value, type) => {
    if (type === 'pickup') setPickup(value);
    else setDropoff(value);
    
    if ((type === 'pickup' ? value : pickup) && (type === 'dropoff' ? value : dropoff)) {
      setShowSummary(true);
    }
  };

  const commonLocations = [
    "Airport",
    "Train Station",
    "City Center",
    "Shopping Mall",
    "Business District"
  ];

  return (
    <div className="bg-neutral-50/50 rounded-xl shadow-sm hover:shadow-md 
                    transition-all duration-300 p-6 animate-fade-in">
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-6 animate-slide-down">
        <div className="flex items-center">
          <button className="p-2 hover:bg-neutral-100 rounded-full mr-2 
                         transition-all duration-200 active:scale-95">
            <ArrowLeftIcon className="w-5 h-5 text-neutral-600" />
          </button>
          <h2 className="text-xl font-semibold text-neutral-900">Create New Order</h2>
        </div>
        {isUrgent && (
          <div className="flex items-center">
            <BellIcon className="w-5 h-5 text-primary-500 animate-bounce-subtle mr-2" />
            <span className="text-sm font-medium text-primary-500">Urgent Order</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pickup Location */}
        <div className="space-y-2">
          <div className={`relative transition-all duration-200 ${
            activeInput === 'pickup' ? 'scale-[1.02]' : ''
          }`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className={`h-5 w-5 ${
                activeInput === 'pickup' ? 'text-primary-500' : 'text-neutral-400'
              } transition-colors duration-200`} />
            </div>
            <input
              type="text"
              value={pickup}
              onChange={(e) => handleLocationInput(e.target.value, 'pickup')}
              onFocus={() => setActiveInput('pickup')}
              onBlur={() => setActiveInput(null)}
              placeholder="Pickup Location"
              className="block w-full pl-10 pr-3 py-3 border border-neutral-200 
                       rounded-lg bg-white text-neutral-900 
                       placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                       transition-all duration-200 hover:border-primary-300
                       text-base shadow-sm"
              required
              list="pickup-suggestions"
            />
            <datalist id="pickup-suggestions">
              {commonLocations.map((location, index) => (
                <option key={index} value={`${location} - Pickup`} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="space-y-2">
          <div className={`relative transition-all duration-200 ${
            activeInput === 'dropoff' ? 'scale-[1.02]' : ''
          }`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FlagIcon className={`h-5 w-5 ${
                activeInput === 'dropoff' ? 'text-primary-500' : 'text-neutral-400'
              } transition-colors duration-200`} />
            </div>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => handleLocationInput(e.target.value, 'dropoff')}
              onFocus={() => setActiveInput('dropoff')}
              onBlur={() => setActiveInput(null)}
              placeholder="Dropoff Location"
              className="block w-full pl-10 pr-3 py-3 border border-neutral-200 
                       rounded-lg bg-white text-neutral-900 
                       placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                       transition-all duration-200 hover:border-primary-300
                       text-base shadow-sm"
              required
              list="dropoff-suggestions"
            />
            <datalist id="dropoff-suggestions">
              {commonLocations.map((location, index) => (
                <option key={index} value={`${location} - Dropoff`} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Price Input with Suggested Prices */}
        <div className="space-y-2">
          <div className={`relative transition-all duration-200 ${
            activeInput === 'price' ? 'scale-[1.02]' : ''
          }`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className={`h-5 w-5 ${
                activeInput === 'price' ? 'text-primary-500' : 'text-neutral-400'
              } transition-colors duration-200`} />
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onFocus={() => setActiveInput('price')}
              onBlur={() => setActiveInput(null)}
              placeholder="Price"
              className="block w-full pl-10 pr-3 py-3 border border-neutral-200 
                       rounded-lg bg-white text-neutral-900 
                       placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                       transition-all duration-200 hover:border-primary-300
                       text-base shadow-sm"
              required
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-2 animate-fade-in">
            {[10, 15, 20, 25, 30].map((suggestedPrice) => (
              <button
                key={suggestedPrice}
                type="button"
                onClick={() => setPrice(suggestedPrice.toString())}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm 
                         hover:bg-neutral-50 transition-all duration-200
                         hover:scale-105 active:scale-95 font-medium flex items-center gap-1
                         shadow-sm"
              >
                ${suggestedPrice}
                {suggestedPrice >= 20 && (
                  <StarIcon className="w-4 h-4 text-primary-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        {showSummary && (
          <div className="mt-6 p-4 bg-white border border-neutral-200
                       rounded-lg shadow-sm animate-slide-up">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <div className="text-sm text-neutral-500">Pickup</div>
                  <div className="text-base font-medium text-neutral-900">{pickup}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FlagIcon className="w-5 h-5 text-secondary-500 mt-0.5" />
                <div>
                  <div className="text-sm text-neutral-500">Dropoff</div>
                  <div className="text-base font-medium text-neutral-900">{dropoff}</div>
                </div>
              </div>
              {price && (
                <div className="flex items-start space-x-3">
                  <CurrencyDollarIcon className="w-5 h-5 text-primary-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-neutral-500">Estimated Price</div>
                    <div className="text-base font-medium text-neutral-900">${price}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-primary-400 to-primary-500 
                   hover:from-primary-500 hover:to-primary-600 text-black font-bold rounded-lg
                   shadow-sm hover:shadow-md transform transition-all duration-200 
                   focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:scale-[1.02] active:scale-[0.98] text-base"
          disabled={!pickup || !dropoff || !price}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;
