import { useState, useEffect } from "react";

export function useRateLimitTimer(initialSeconds: number = 0) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(initialSeconds > 0);

  useEffect(() => {
    if (!isActive || secondsRemaining <= 0) {
      setIsActive(false);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const startTimer = (seconds: number) => {
    setSecondsRemaining(seconds);
    setIsActive(true);
  };

  const resetTimer = () => {
    setSecondsRemaining(0);
    setIsActive(false);
  };

  return {
    secondsRemaining,
    isActive,
    startTimer,
    resetTimer,
    progress: initialSeconds > 0 ? (secondsRemaining / initialSeconds) * 100 : 0,
  };
}
