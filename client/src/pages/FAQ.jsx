import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: 'What is Calmana?',
    answer:
      'Calmana is a supportive mental wellness platform that helps you navigate your emotional journey through mood tracking, AI-guided conversations, and a compassionate community.',
  },
  {
    question: 'Is my information safe and private?',
    answer:
      'Absolutely. Your privacy and emotional safety are at the heart of Calmana. All your data is handled with utmost confidentiality and care.',
  },
  {
    question: 'Can I speak with a real therapist through Calmana?',
    answer:
      'Yes, Calmana allows you to connect with licensed mental health professionals who are here to listen and guide you with empathy.',
  },
  {
    question: 'How does the AI therapy chat support me?',
    answer:
      'The AI companion offers a non-judgmental space to express your thoughts. It uses evidence-based techniques to gently guide you through your emotions and promote self-awareness.',
  },
  {
    question: 'How can Calmana support my mental well-being?',
    answer:
      'Whether you’re experiencing stress, anxiety, or just seeking balance, Calmana offers reflective tools, uplifting prompts, and community encouragement to support your healing journey.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto py-16 px-6 font-inter">
      <h2 className="text-3xl font-bold text-emerald-700 text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-xl shadow-md">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-gray-800 hover:text-emerald-600"
            >
              <span>{item.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 transition-all duration-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
