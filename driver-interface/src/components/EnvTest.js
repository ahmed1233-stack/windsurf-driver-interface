import React from 'react';

function EnvTest() {
  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Environment Variables Test</h3>
      <pre className="bg-white p-2 rounded">
        {JSON.stringify({
          REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          NODE_ENV: process.env.NODE_ENV,
        }, null, 2)}
      </pre>
    </div>
  );
}

export default EnvTest;
