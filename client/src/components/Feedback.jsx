import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const stars = [1, 2, 3, 4, 5];

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email);

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !isEmailValid(email) || rating === 0) return;

    // Submit data to backend here...

    setSubmitted(true);
    setName('');
    setEmail('');
    setRating(0);
    setComments('');

    // Trigger confetti
    launchConfetti();
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-pink-50 p-8 rounded-3xl shadow-xl max-w-lg mx-auto border border-white/30 font-inter transition-transform duration-300 hover:shadow-green-200 hover:scale-[1.01] animate-fade-in">
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 mb-6 select-none">
        We Value Your Feedback
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto mb-6"></div>

      {submitted ? (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center animate-fade-in shadow-lg border border-green-200 hover:shadow-green-300 transition hover:scale-[1.02]">
          <div className="text-4xl mb-2">🌿</div>
          <p className="text-green-700 font-semibold">
            Thank you for your valuable feedback!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-emerald-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border border-green-300 rounded-xl bg-white/60 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 placeholder-green-400 shadow-sm hover:shadow-green-200 hover:scale-[1.01]"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-emerald-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-green-300 rounded-xl bg-white/60 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 placeholder-green-400 shadow-sm hover:shadow-green-200 hover:scale-[1.01]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email && !isEmailValid(email) && (
              <p className="text-red-500 mt-1 text-sm">Please enter a valid email.</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1 font-semibold text-emerald-800">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 text-2xl select-none">
              {stars.map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`transition-transform transform hover:scale-125 duration-200 ${
                    (hoverRating || rating) >= star
                      ? 'text-yellow-400 drop-shadow-md'
                      : 'text-gray-300'
                  }`}
                  aria-label={`${star} Star${star > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
            {rating === 0 && (
              <p className="text-red-500 mt-1 text-sm">Please select a rating.</p>
            )}
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block mb-1 font-semibold text-emerald-800">
              Comments (optional)
            </label>
            <textarea
              id="comments"
              rows="4"
              className="w-full p-3 border border-green-300 rounded-xl bg-white/60 resize-none focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 placeholder-green-400 shadow-sm hover:shadow-green-200 hover:scale-[1.01]"
              placeholder="Share your thoughts or suggestions..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim() || !email.trim() || !isEmailValid(email) || rating === 0}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
              name.trim() && email.trim() && isEmailValid(email) && rating !== 0
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.04] hover:shadow-emerald-400/40 animate-pulse'
                : 'bg-green-300 cursor-not-allowed'
            }`}
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}
