'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase_utils/client';

export default function Home() {
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

  return (
    <main className="main-content">
      <div className="content-header">
        <h1 className="content-title">Task X Dashboard</h1>
        <p className="content-subtitle">
          <span className="subtitle-mint">
            Welcome back! Here's what's happening with your tasks today.
          </span>
          <span className="subtitle-teal">
            Welcome back! Here's your activity overview for today.
          </span>
        </p>
      </div>
    </main>
  );
}
