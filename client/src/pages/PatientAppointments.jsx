import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE = "http://localhost:5001";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH PATIENT APPOINTMENTS =================
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/patient/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  // ================= STATES =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-emerald-700">
        Loading your appointments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        📅 My Appointments
      </h2>

      {appointments.length === 0 && (
        <p className="text-center text-gray-600">
          You haven’t booked any appointments yet.
        </p>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        {appointments.map((appt, i) => (
          <motion.div
            key={appt._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
          >
            {/* LEFT */}
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {appt.doctor.name}
              </p>
              <p className="text-sm text-gray-500">
                🧠 {appt.doctor.specialization}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {appt.date} at {appt.time}
              </p>
            </div>

            {/* RIGHT */}
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                appt.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : appt.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {appt.status.toUpperCase()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
