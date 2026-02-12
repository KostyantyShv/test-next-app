"use client";

import { useEffect, useRef, useState } from "react";

interface BulletItem {
  id: string;
  text: string;
  error: boolean;
}

const createEmptyBullet = (seed: number): BulletItem => ({
  id: `bullet-${Date.now()}-${seed}`,
  text: "",
  error: false,
});

export default function BulletPoints() {
  const [bullets, setBullets] = useState<BulletItem[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isToastError, setIsToastError] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setBullets(Array.from({ length: 4 }, (_, index) => createEmptyBullet(index)));
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showFeedbackToast = (message: string, isError = false) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    setIsToastError(isError);
    setShowToast(true);

    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const addBullet = () => {
    if (bullets.length >= 8) {
      showFeedbackToast("Maximum of 8 bullet points allowed", true);
      return;
    }

    setBullets((prev) => [...prev, createEmptyBullet(prev.length)]);
  };

  const deleteBullet = (id: string) => {
    if (bullets.length <= 1) {
      showFeedbackToast("At least one bullet point is required", true);
      return;
    }

    setBullets((prev) => prev.filter((bullet) => bullet.id !== id));
  };

  const validateBullet = (id: string, value: string) => {
    setBullets((prev) =>
      prev.map((bullet) =>
        bullet.id === id
          ? { ...bullet, text: value, error: value.trim().length === 0 }
          : bullet
      )
    );
  };

  return (
    <>
      <div className="my-5 hidden text-default md:block">
        <div className="mx-auto flex w-full gap-6">
          <div className="max-w-[350px] pr-6">
            <h1
              className="mb-3 text-2xl font-semibold text-dark"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              }}
            >
              Bullet Points
            </h1>
            <p className="text-base leading-relaxed text-subtle">
              Highlight key features and achievements of your school to help
              parents and students understand what makes your institution unique.
            </p>
          </div>

          <div className="w-full rounded-lg bg-surface p-6 shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)]">
            <h2 className="mb-5 text-lg font-medium text-dark">
              What makes your school stand out?
            </h2>

            <div className="mb-5 flex flex-col gap-3">
              {bullets.map((bullet, index) => (
                <div key={bullet.id} className="relative">
                  <input
                    type="text"
                    className={`w-full rounded-lg border bg-surface p-3 pr-10 text-sm text-default transition-all duration-200 focus:outline-none ${
                      bullet.error ? "border-[#EF4444]" : "border-theme"
                    }`}
                    placeholder={`Bullet Point ${index + 1}`}
                    value={bullet.text}
                    onChange={(e) => validateBullet(bullet.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center bg-transparent p-1 opacity-60 transition-opacity duration-200 hover:opacity-100"
                    style={{ color: "#EF4444" }}
                    onClick={() => deleteBullet(bullet.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        fill="currentColor"
                        d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {bullet.error && (
                    <div className="mt-1 text-sm text-[#EF4444]">This field is required</div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border-none px-5 py-3 text-base font-medium text-white transition-all duration-200"
              style={{ backgroundColor: "var(--btn-dark-bg)" }}
              onClick={addBullet}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Add more to your response
            </button>
          </div>
        </div>
      </div>

      <div
        className="md:hidden"
        style={{
          backgroundColor: "var(--background-color)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div className="flex flex-col p-4">
          <div className="mb-4">
            <h1 className="mb-2 text-2xl font-semibold text-[var(--dark-text)]">Bullet Points</h1>
            <p className="text-sm leading-[1.5] text-[var(--subtle-text)]">
              Highlight key features and achievements of your school to help
              parents and students understand what makes your institution unique.
            </p>
          </div>

          <div
            className="flex flex-1 flex-col rounded-lg bg-white p-4"
            style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
          >
            <h2 className="mb-4 text-base font-medium text-[var(--dark-text)]">
              What makes your school stand out?
            </h2>

            <div className="mb-4 flex flex-1 flex-col gap-3">
              {bullets.map((bullet, index) => (
                <div key={bullet.id} className={`relative ${bullet.error ? "error" : ""}`}>
                  <input
                    type="text"
                    className={`w-full rounded-lg border bg-white px-3 py-3 pr-10 text-sm text-[var(--text-color)] transition-all duration-200 placeholder:text-[var(--placeholder-color)] focus:outline-none ${
                      bullet.error ? "border-[var(--error-color)]" : "border-[var(--border-color)]"
                    }`}
                    placeholder={`Bullet Point ${index + 1}`}
                    value={bullet.text}
                    onChange={(e) => validateBullet(bullet.id, e.target.value)}
                    onBlur={(e) => validateBullet(bullet.id, e.target.value)}
                    onFocus={(e) => {
                      if (bullet.error) return;
                      e.currentTarget.style.borderColor = "var(--verification-blue)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(29, 119, 189, 0.1)";
                    }}
                    onBlurCapture={(e) => {
                      if (bullet.error) {
                        e.currentTarget.style.boxShadow = "none";
                        return;
                      }
                      e.currentTarget.style.borderColor = "var(--border-color)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center border-none bg-transparent p-1 text-[var(--error-color)] opacity-60 transition-opacity duration-200 hover:opacity-100"
                    onClick={() => deleteBullet(bullet.id)}
                    aria-label="Delete bullet"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        fill="currentColor"
                        d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {bullet.error && (
                    <div className="mt-1 text-xs text-[var(--error-color)]">This field is required</div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addBullet}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border-none px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#2D2D2D]"
              style={{ backgroundColor: "#1B1B1B" }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Add more to your response
            </button>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-[2000] w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg px-4 py-3 text-center text-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
        }`}
        style={{
          backgroundColor: isToastError ? "#FEF2F2" : "var(--success-bg)",
          color: isToastError ? "var(--error-color)" : "var(--active-green)",
        }}
      >
        {toastMessage}
      </div>
    </>
  );
}
