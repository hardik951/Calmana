import React, { useState } from 'react';

const stars = [1, 2, 3, 4, 5];

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !isEmailValid(email) || rating === 0) return;

    // Submit feedback to backend here...

    setSubmitted(true);
    setName('');
    setEmail('');
    setRating(0);
    setComments('');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto border border-green-200 font-inter">
      <h2 className="text-3xl font-extrabold text-green-900 mb-6 select-none text-center">
        We Value Your Feedback
      </h2>

      {submitted ? (
        <p className="text-green-700 font-semibold text-center animate-fade-in">
          Thank you for your valuable feedback! 🌿
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-green-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border-2 border-green-300 rounded-xl
                         focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-600
                         transition duration-300 placeholder-green-400"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-green-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border-2 border-green-300 rounded-xl
                         focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-600
                         transition duration-300 placeholder-green-400"
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
            <label className="block mb-1 font-semibold text-green-800">
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
                  className={`transition-colors duration-200 ${
                    (hoverRating || rating) >= star
                      ? 'text-emerald-500'
                      : 'text-green-300'
                  } hover:text-emerald-600`}
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
            <label htmlFor="comments" className="block mb-1 font-semibold text-green-800">
              Comments (optional)
            </label>
            <textarea
              id="comments"
              rows="4"
              className="w-full p-3 border-2 border-green-300 rounded-xl resize-none
                         focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-600
                         transition duration-300 placeholder-green-400"
              placeholder="Share your thoughts or suggestions..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim() || !email.trim() || !isEmailValid(email) || rating === 0}
            className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300
                        ${
                          name.trim() && email.trim() && isEmailValid(email) && rating !== 0
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-400/50 cursor-pointer'
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
