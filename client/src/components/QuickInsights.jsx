import React from "react";
import { TrendingUp } from "lucide-react";

export function QuickInsights({
  patientEngagement = { value: "92%", change: "+5%" },
  avgSessionTime = { value: "45min", note: "Within target range" },
  satisfactionRate = { value: "4.8/5", note: "Based on 500 reviews" }
}) {
  return (
    <div className="bg-white/80 border border-green-100 rounded-xl shadow-sm p-6 mt-4 max-w-full">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-2xl font-bold text-green-800">Quick Insights</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1 rounded-lg bg-green-50 p-4 text-center">
          <p className="text-md font-medium text-green-600 mb-1">Patient Engagement</p>
          <p className="text-3xl font-bold text-green-700">{patientEngagement.value}</p>
          <p className="text-sm text-green-500">{patientEngagement.change} from last week</p>
        </div>
        <div className="flex-1 rounded-lg bg-orange-50 p-4 text-center">
          <p className="text-md font-medium text-orange-500 mb-1">Avg Session Time</p>
          <p className="text-3xl font-bold text-orange-500">{avgSessionTime.value}</p>
          <p className="text-sm text-orange-400">{avgSessionTime.note}</p>
        </div>
        <div className="flex-1 rounded-lg bg-green-50 p-4 text-center">
          <p className="text-md font-medium text-green-600 mb-1">Satisfaction Rate</p>
          <p className="text-3xl font-bold text-green-700">{satisfactionRate.value}</p>
          <p className="text-sm text-green-500">{satisfactionRate.note}</p>
        </div>
      </div>
    </div>
  );
}

