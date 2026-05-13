"use client";

import { useCallback, useState } from "react";
import { FeedbackPayload } from "@/types";
import { submitFeedback } from "@/services/api";

interface UseFeedbackReturn {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  submit: (payload: Omit<FeedbackPayload, "submittedAt">) => Promise<boolean>;
  reset: () => void;
}

export function useFeedback(): UseFeedbackReturn {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: Omit<FeedbackPayload, "submittedAt">) => {
      setSubmitting(true);
      setError(null);

      try {
        const fullPayload: FeedbackPayload = {
          ...payload,
          submittedAt: new Date().toISOString(),
        };

        const response = await submitFeedback(fullPayload);

        if (response.success) {
          setSubmitted(true);
          return true;
        } else {
          setError(response.message || "Submission failed");
          return false;
        }
      } catch {
        setError("An unexpected error occurred");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setSubmitted(false);
    setError(null);
  }, []);

  return { submitting, submitted, error, submit, reset };
}