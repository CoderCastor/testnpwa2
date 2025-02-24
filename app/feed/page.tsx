"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Star, X } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  membershipId: string;
  rating: number;
  feedback: string;
  suggestions: string;
}

export default function FeedbackForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    membershipId: "",
    rating: 0,
    feedback: "",
    suggestions: "",
  });

  const [hover, setHover] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Feedback:", formData);
    onClose(); // Close modal after submission
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-blue-600 text-center text-2xl font-bold mb-4">Feedback Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <input
            type="text"
            name="membershipId"
            placeholder="Membership ID (Optional)"
            value={formData.membershipId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <textarea
            name="feedback"
            placeholder="Your Feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="border p-2 rounded w-full resize-none h-32"
            rows={5}
            required
          ></textarea>
          <textarea
            name="suggestions"
            placeholder="Suggestions for Improvement (Optional)"
            value={formData.suggestions}
            onChange={handleChange}
            className="border p-2 rounded w-full resize-none h-32"
            rows={5}
          ></textarea>

          <div className="flex flex-col items-center gap-2">
            <label className="text-gray-700">Rate our service</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hover || formData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } cursor-pointer transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
