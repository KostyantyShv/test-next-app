'use client';

import { useState } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <main className="main-content">
      <div className="welcome-widget" id="welcome-widget">
        <h2>Welcome to TaskX</h2>
        <p>
          This is the TaskX interface with navigation sidebar and organized
          sections. Click the menu icon to access the navigation.
        </p>
        <button
          className="dismiss-btn"
          id="dismiss-btn"
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
      </div>
    </main>
  );
}
