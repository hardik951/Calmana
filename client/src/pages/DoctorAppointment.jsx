import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_BASE = "http://localhost:5001";

const DoctorAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState("");

  // 🔐 get patient token (stored after login)
  const token = localStorage.getItem("token");

  // ================= FETCH DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/doctors`);
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ================= SEND APPOINTMENT REQUEST =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_BASE}/api/appointments`,
        {
          doctorId: selectedDoctor._id,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("✅ Appointment request sent (Pending approval)");
      setSelectedDoctor(null);
      setDate("");
      setTime("");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to send appointment request");
    }
  };

  // ================= STATES =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-emerald-700">
        Loading doctors...
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
    <div className="min-h-screen bg-emerald-50 p-6">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        🏥 Available Mental Health Specialists
      </h2>

      {success && (
        <p className="text-center text-green-600 mb-4">{success}</p>
      )}

      {/* DOCTORS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow p-5"
          >
            <img
              src={
                doc.licenseImage
                  ? `${API_BASE}/${doc.licenseImage}`
                  : "https://via.placeholder.com/150"
              }
              alt={doc.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />

            <h3 className="text-xl font-semibold text-center">
              {doc.name}
            </h3>

            <p className="text-center text-gray-600">
              🧠 {doc.specialization}
            </p>

            <p className="text-center mt-1 text-sm text-gray-500">
              ⭐ 4.5 | 💰 ₹800
            </p>

            <button
              onClick={() => setSelectedDoctor(doc)}
              className="mt-4 w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800 transition"
            >
              Request Appointment
            </button>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-xl w-96"
            >
              <h3 className="font-bold mb-4 text-emerald-700">
                Request appointment with {selectedDoctor.name}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <div className="flex gap-2">
                  <button className="flex-1 bg-emerald-700 text-white py-2 rounded">
                    Send Request
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDoctor(null)}
                    className="flex-1 bg-gray-300 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorAppointment;
