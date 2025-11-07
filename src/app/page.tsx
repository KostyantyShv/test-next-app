'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase_utils/client';

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [router, supabase]);

  if (isChecking) {
    return null;
  }

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
