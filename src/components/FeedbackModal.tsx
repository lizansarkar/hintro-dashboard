"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from "lucide-react";
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Feedback</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                <Star size={24} fill="currentColor" />
              </div>
              <p className="text-base font-semibold text-text mb-1">
                Thank you!
              </p>
              <p className="text-sm text-text-muted">
                Your feedback has been saved.
              </p>
            </div>
          ) : (
            <>
              {/* Stars */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
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
                              : "text-border"
                          }`}
                        />
                      </button>
                    );
                  })}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-text-muted">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Additional comments{" "}
                  <span className="text-text-muted font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Tell us what could be improved..."
                  className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-lg
                             text-text placeholder:text-text-muted
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
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
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || submitting}
            >
              {submitting && (
                <Loader2 size={14} className="animate-spin mr-2" />
              )}
              Submit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
