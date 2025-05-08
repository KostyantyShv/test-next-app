"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

interface BulletItem {
  id: string;
  text: string;
  error: boolean;
}

export default function BulletPoints() {
  const [bullets, setBullets] = useState<BulletItem[]>([]);

  // Initialize with 4 empty bullet points
  useEffect(() => {
    initBullets();
  }, []);

  const initBullets = () => {
    const initialBullets = Array.from({ length: 4 }, (_, i) => ({
      id: `bullet-${Date.now()}-${i}`,
      text: "",
      error: false,
    }));
    setBullets(initialBullets);
  };

  const addBullet = () => {
    // Limit to maximum 8 bullet points
    if (bullets.length >= 8) {
      alert("Maximum of 8 bullet points allowed");
      return;
    }

    setBullets([
      ...bullets,
      {
        id: `bullet-${Date.now()}`,
        text: "",
        error: false,
      },
    ]);
  };

  const deleteBullet = (id: string) => {
    // Prevent deleting if it's the last bullet point
    if (bullets.length <= 1) {
      alert("At least one bullet point is required");
      return;
    }

    setBullets(bullets.filter((bullet) => bullet.id !== id));
  };

  const validateBullet = (id: string, value: string) => {
    setBullets(
      bullets.map((bullet) =>
        bullet.id === id
          ? { ...bullet, text: value, error: !value.trim() }
          : bullet
      )
    );
  };

  return (
    <div className="text-[#4A4A4A] my-5">
      <div className="mx-auto w-full flex max-md:flex-col gap-6">
        <div className="max-w-[350px] px-6">
          <h1 className="text-[#1B1B1B] text-2xl font-semibold mb-3">
            Bullet Points
          </h1>
          <p className="text-[#5F5F5F] text-base leading-relaxed">
            Highlight key features and achievements of your school to help
            parents and students understand what makes your institution unique.
          </p>
        </div>

        <div className="w-full bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)]">
          <h2 className="text-[#1B1B1B] text-lg font-medium mb-5">
            What makes your school stand out?
          </h2>

          <div className="flex flex-col gap-3 mb-5">
            {bullets.map((bullet, index) => (
              <div
                key={bullet.id}
                className={`relative ${
                  bullet.error ? "bullet-item error" : "bullet-item"
                }`}
              >
                <input
                  type="text"
                  className={`w-full p-3 pr-10 border ${
                    bullet.error ? "border-[#EF4444]" : "border-[#E5E5E5]"
                  } rounded-lg text-sm text-[#4A4A4A] bg-white transition-all duration-200 focus:outline-none focus:border-[#1D77BD] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]`}
                  placeholder={`Bullet Point ${index + 1}`}
                  value={bullet.text}
                  onChange={(e) => validateBullet(bullet.id, e.target.value)}
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none p-1 cursor-pointer text-[#EF4444] opacity-60 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                  onClick={() => deleteBullet(bullet.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {bullet.error && (
                  <div className="text-[#EF4444] text-sm mt-1">
                    This field is required
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="inline-flex max-md:w-full max-md:justify-center items-center gap-2 py-3 px-5 bg-[#1B1B1B] text-white border-none rounded-md text-base font-medium cursor-pointer transition-all duration-200 hover:bg-[#2D2D2D]"
            onClick={addBullet}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="w-5 h-5"
            >
              <path
                d="M10 4V16M4 10H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add more to your response
          </button>
        </div>
      </div>
    </div>
  );
}
