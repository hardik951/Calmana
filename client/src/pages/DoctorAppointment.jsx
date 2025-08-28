import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample mental health doctors (with random avatar images)
const doctors = [
  {
    id: 1,
    name: "Dr. Aisha Kapoor",
    specialty: "🧠 Psychiatrist",
    experience: 14,
    rating: 4.9,
    distance: 2.3,
    fee: 1200,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Dr. Rajesh Sharma",
    specialty: "🧑‍⚕️ Clinical Psychologist",
    experience: 10,
    rating: 4.7,
    distance: 3.1,
    fee: 900,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 3,
    name: "Dr. Meera Nair",
    specialty: "💬 Therapist",
    experience: 8,
    rating: 4.6,
    distance: 1.8,
    fee: 700,
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    id: 4,
    name: "Dr. Arjun Patel",
    specialty: "👨‍⚕️ Psychiatrist",
    experience: 12,
    rating: 4.5,
    distance: 4.5,
    fee: 1000,
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 5,
    name: "Dr. Kavya Iyer",
    specialty: "🧑‍⚕️ Child Psychologist",
    experience: 7,
    rating: 4.8,
    distance: 2.9,
    fee: 950,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 6,
    name: "Dr. Neha Gupta",
    specialty: "💭 Counseling Psychologist",
    experience: 11,
    rating: 4.4,
    distance: 3.7,
    fee: 800,
    image: "https://randomuser.me/api/portraits/women/69.jpg",
  },
  {
    id: 7,
    name: "Dr. Ankit Verma",
    specialty: "🧠 Psychiatrist",
    experience: 9,
    rating: 4.3,
    distance: 5.2,
    fee: 1100,
    image: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    id: 8,
    name: "Dr. Priya Menon",
    specialty: "💬 Therapist",
    experience: 6,
    rating: 4.6,
    distance: 2.0,
    fee: 750,
    image: "https://randomuser.me/api/portraits/women/71.jpg",
  },
];

const DoctorAppointment = () => {
  const [filter, setFilter] = useState("rating");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Shuffle doctors
  const shuffledDoctors = [...doctors].sort(() => Math.random() - 0.5);

  // Sort based on filter
  const sortedDoctors = [...shuffledDoctors].sort((a, b) => {
    if (filter === "rating") return b.rating - a.rating;
    if (filter === "distance") return a.distance - b.distance;
    if (filter === "fee") return a.fee - b.fee;
    return 0;
  });

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDoctor && date && time) {
      const newAppointment = {
        doctor: selectedDoctor,
        date,
        time,
      };
      setAppointments([...appointments, newAppointment]);

      // Reset
      setSelectedDoctor(null);
      setDate("");
      setTime("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-10 px-4 font-inter">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-emerald-700 mb-6 text-center"
        >
          🏥 Available Mental Health Specialists
        </motion.h2>

        {/* Filter Section */}
        <div className="flex justify-center gap-3 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-emerald-600"
          >
            <option value="rating">⭐ Sort by Rating</option>
            <option value="distance">📍 Sort by Distance</option>
            <option value="fee">💰 Sort by Fee</option>
          </select>
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDoctors.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-emerald-200"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {doc.name}
              </h3>
              <p className="text-gray-600 text-center">{doc.specialty}</p>
              <p className="text-sm text-gray-500 text-center">
                🏆 {doc.experience} yrs experience
              </p>
              <p className="mt-2 text-center">
                ⭐ {doc.rating} | 📍 {doc.distance} km | 💰 ₹{doc.fee}
              </p>
              <button
                onClick={() => handleBook(doc)}
                className="mt-4 w-full bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition"
              >
                Book Appointment
              </button>
            </motion.div>
          ))}
        </div>

        {/* Booking Popup Modal */}
        <AnimatePresence>
          {selectedDoctor && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full"
              >
                <h3 className="text-xl font-bold text-emerald-700 mb-4">
                  Booking with {selectedDoctor.name}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDoctor(null)}
                      className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* My Appointments */}
        <AnimatePresence>
          {appointments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto mt-10"
            >
              <h3 className="text-xl font-bold text-emerald-700 mb-4">
                📅 My Appointments
              </h3>
              <div className="space-y-3">
                {appointments.map((appt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-4 bg-white shadow-md rounded-lg border"
                  >
                    <p className="font-semibold text-gray-800">
                      {appt.doctor.name} ({appt.doctor.specialty})
                    </p>
                    <p className="text-gray-600">
                      {appt.date} at {appt.time}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorAppointment;
