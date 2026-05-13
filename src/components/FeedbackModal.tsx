"use client";

import { useState } from "react";
import { X, Star, Loader2 } from "lucide-react";
import { useFeedback } from "@/hooks/useFeedback";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const { submitting, submitted, error, submit, reset } = useFeedback();

  if (!isOpen) return null;

  const handleClose = () => {
    if (!submitting) {
      reset();
      setRating(0);
      setHovered(0);
      setComment("");
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    const ok = await submit({ rating, comment });
    if (ok) {
      setTimeout(handleClose, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-surface-0 rounded-2xl shadow-elevated
                    animate-slide-up overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200">
          <h2 className="text-lg font-semibold text-ink-900">
            Share Feedback
          </h2>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="p-1.5 rounded-lg text-ink-300 hover:text-ink-900 hover:bg-surface-100 transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {submitted ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                <Star size={24} fill="currentColor" />
              </div>
              <p className="text-base font-semibold text-ink-900 mb-1">
                Thank you!
              </p>
              <p className="text-sm text-ink-500">
                Your feedback has been saved.
              </p>
            </div>
          ) : (
            <>
              {/* Stars */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  How would you rate your experience?
                </label>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    const filled = starValue <= (hovered || rating);
                    return (
                      <button
                        key={i}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHovered(starValue)}
                        onMouseLeave={() => setHovered(0)}
                        className="p-1 transition-transform hover:scale-110"
                        aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                      >
                        <Star
                          size={28}
                          className={`transition-colors ${
                            filled
                              ? "text-amber-400 fill-amber-400"
                              : "text-surface-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-ink-500">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  Additional comments{" "}
                  <span className="text-ink-300 font-normal">(optional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Tell us what could be improved..."
                  className="w-full px-3 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-lg
                             text-ink-900 placeholder:text-ink-300
                             focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400
                             transition-all resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-danger animate-fade-in">{error}</p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-200 bg-surface-50">
            <button
              onClick={handleClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-ink-500 hover:text-ink-700
                         rounded-lg hover:bg-surface-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || submitting}
              className="px-5 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg
                         hover:bg-brand-700 active:bg-brand-800 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed
                         flex items-center gap-2"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}