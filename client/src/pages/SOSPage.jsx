import React from 'react';

const helplines = [
  {
    category: ' Mental Health Support',
    numbers: [
      { name: 'iCall – TISS', number: '9152987821' },
      { name: 'AASRA', number: '9820466726' },
      { name: 'Vandrevala Foundation', number: '1860 266 2345' },
    ],
  },
  {
    category: ' Women Safety',
    numbers: [
      { name: 'Women Helpline – National', number: '1091' },
      { name: 'Nirbhaya Helpline', number: '181' },
    ],
  },
  {
    category: 'Children Helpline',
    numbers: [
      { name: 'Childline – National', number: '1098' },
    ],
  },
  {
    category: 'Emergency Services',
    numbers: [
      { name: 'Police', number: '100' },
      { name: 'Ambulance', number: '102' },
      { name: 'Disaster Management', number: '108' },
    ],
  },
  {
    category: 'Elderly Care',
    numbers: [
      { name: 'HelpAge India', number: '1800 180 1253' },
    ],
  },
];

const SOSPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          🚨 Emergency & SOS Helplines (India)
        </h1>
        {helplines.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-2">{section.category}</h2>
            <ul className="space-y-2">
              {section.numbers.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow">
                  <span className="text-blue-900 font-medium">{item.name}</span>
                  <a
                    href={`tel:${item.number.replace(/\s+/g, '')}`}
                    className="text-green-700 font-semibold hover:underline"
                  >
                    📞 {item.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-center text-sm text-gray-500 mt-8">
          If you or someone you know is in immediate danger, please call the nearest emergency number.
        </p>
      </div>
    </div>
  );
};

export default SOSPage;
