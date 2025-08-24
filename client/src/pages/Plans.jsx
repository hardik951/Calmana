import React, { useState } from "react";

const Plans = () => {
  const [plusBilling, setPlusBilling] = useState("1M");
  const [premiumBilling, setPremiumBilling] = useState("1M");

  const plusPrices = {
    "1M": "₹199 / month",
    "3M": "₹499 / 3 months (Save 15%)",
    "6M": "₹899 / 6 months (Save 25%)",
    "1Y": "₹1399 / year (Save 40%)",
  };

  const premiumPrices = {
    "1M": "₹399 / month",
    "3M": "₹1099 / 3 months (Save 15%)",
    "6M": "₹1999 / 6 months (Save 25%)",
    "1Y": "₹2899 / year (Save 40%)",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-12 text-center">
          💎 Choose Your Plan
        </h1>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Free Plan */}
          <div className="border border-emerald-300 rounded-2xl p-8 flex flex-col items-center shadow-md hover:shadow-lg transition">
            <h2 className="text-3xl font-bold text-emerald-700 mb-4">
              Free Plan
            </h2>
            <p className="text-gray-700 mb-6 text-center leading-relaxed">
              ✓ Mood tracking <br />
              ✓ Personal diary <br />
              ✓ Limited AI chats <br />
              ✓ 3 AI Diagnoses / month <br />
              ✓ Access to community <br />
              ❌ Camera Emotion Tracker <br />
              ❌ Voice-to-Voice Avatar
            </p>
            <button
              disabled
              className="bg-emerald-400 text-white px-8 py-3 rounded-full cursor-not-allowed opacity-70 text-lg font-semibold"
            >
              Current Plan
            </button>
          </div>

          {/* Plus Plan */}
          <div className="relative border-2 border-blue-400 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-xl transition bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <span className="absolute -top-4 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full shadow-md">
              🔹 Best Value
            </span>

            <h2 className="text-3xl font-bold text-blue-700 mb-4">Plus Plan</h2>

            <p className="text-gray-700 mb-6 text-center leading-relaxed">
              🌟 Unlimited diary & mood entries <br />
              🌟 Unlimited AI text chats <br />
              🌟 Limited Voice Mode AI chats <br />
              🌟 Camera-guided Emotion Tracker <br />
              🌟 Priority support <br />
              ❌ Unlimited Voice-to-Voice Avatar
            </p>

            <select
              value={plusBilling}
              onChange={(e) => setPlusBilling(e.target.value)}
              className="mb-4 p-2 rounded-lg border border-gray-300"
            >
              <option value="1M">1 Month – ₹199</option>
              <option value="3M">3 Months – ₹499 (Save 15%)</option>
              <option value="6M">6 Months – ₹899 (Save 25%)</option>
              <option value="1Y">1 Year – ₹1399 (Save 40%)</option>
            </select>

            <button
              className="bg-blue-500 text-white px-10 py-3 rounded-full hover:bg-blue-600 transition text-lg font-semibold shadow-md"
              onClick={() =>
                alert(`Selected Plus Plan: ${plusPrices[plusBilling]}`)
              }
            >
              Upgrade {plusPrices[plusBilling]}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative border-2 border-yellow-500 rounded-2xl p-8 flex flex-col items-center shadow-xl hover:shadow-2xl transition bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
            <span className="absolute -top-4 px-4 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full shadow-md">
              ⭐ Most Popular
            </span>

            <h2 className="text-3xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
              <span>💎</span> Premium Plan
            </h2>

            <p className="text-gray-700 mb-6 text-center leading-relaxed">
              🌟 Everything in Plus <br />
              🌟 Unlimited AI Diagnosis <br />
              🌟 Unlimited Voice-to-Voice Avatar <br />
              🌟 Exclusive meditation sessions <br />
              🌟 Premium support
            </p>

            <select
              value={premiumBilling}
              onChange={(e) => setPremiumBilling(e.target.value)}
              className="mb-4 p-2 rounded-lg border border-gray-300"
            >
              <option value="1M">1 Month – ₹399</option>
              <option value="3M">3 Months – ₹1099 (Save 15%)</option>
              <option value="6M">6 Months – ₹1999 (Save 25%)</option>
              <option value="1Y">1 Year – ₹2899 (Save 40%)</option>
            </select>

            <button
              className="bg-yellow-500 text-white px-10 py-3 rounded-full hover:bg-yellow-600 transition text-lg font-semibold shadow-md"
              onClick={() =>
                alert(`Selected Premium Plan: ${premiumPrices[premiumBilling]}`)
              }
            >
              Upgrade {premiumPrices[premiumBilling]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
