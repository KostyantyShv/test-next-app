"use client";

import { ROUTES } from "@/enums/routes";
import AppLink from "@/components/ui/AppLink/AppLink";
import {
  CloseIcon,
  FacebookIcon,
  GoogleIcon,
  XIcon,
} from "@/components/ui/SocialIcons/SocialIcons";
import { Logo } from "@/components/ui/Logo";
import Input from "@/components/ui/form/input/Input";
import Checkbox from "@/components/ui/form/checkbox/Checkbox";
import Button from "@/components/ui/form/button/Button";
import Divider from "@/components/ui/form/divider/Divider";
import { createClient } from "@/lib/supabase_utils/client";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    window.location.href = "/";
  };

  const handleOAuth = async (provider: "google" | "facebook" | "twitter") => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="login-page absolute inset-0 flex z-[100] items-center justify-center bg-[#F2F2F2] font-inter h-screen">
      {/* Desktop close button - hidden on mobile */}
      <AppLink
        href={ROUTES.HOME}
        className="login-close-button max-md:hidden absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2 text-[#666] hover:text-[#333] transition-colors duration-200"
      >
        <CloseIcon />
      </AppLink>

      {/* Main content - desktop layout by default, modified for mobile */}
      <div className="login-card w-full max-w-[360px] bg-white p-8 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-md:shadow-none max-md:rounded-none max-md:p-0 max-md:max-w-none max-md:flex max-md:flex-col max-md:h-screen">
        {/* Mobile header - only visible on small screens */}
        <div className="login-mobile-header hidden max-md:flex items-center p-5 gap-2 border-b border-gray-100">
          <Logo className="h-10" />
          <AppLink
            href={ROUTES.HOME}
            className="login-close-button ml-auto bg-transparent border-none cursor-pointer p-2 text-[#666]"
          >
            <CloseIcon />
          </AppLink>
        </div>

        {/* Logo only visible on desktop */}
        <div className="mb-6 max-md:hidden">
          <Logo />
        </div>

        <div className="max-md:flex-1 max-md:px-5 max-md:py-6">
          <h1 className="login-title text-xl font-semibold text-[#333] mb-2">
            Sign in to your account
          </h1>
          <p className="login-subtitle text-[#666] text-[13px] mb-6">
            No account?{" "}
            <AppLink
              href={ROUTES.REGISTER}
              variant="underline"
              className="login-link text-[#356EF5] font-medium"
            >
              Create one now for free
            </AppLink>
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                className="login-input w-full border border-[#ddd] rounded-md text-[14px] focus:border-[#356EF5] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                showPasswordToggle
                required
                value={password}
                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                className="login-input w-full border border-[#ddd] rounded-md text-[14px] focus:border-[#356EF5] focus:outline-none"
              />
            </div>

            <div className="mb-5">
              <Checkbox
                id="remember"
                label="Remember me"
                className="login-checkbox flex items-center gap-2 text-[13px] text-[#333]"
              />
            </div>

            {error && (
              <div className="mb-3 text-[13px] text-red-600">{error}</div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className="login-primary-button w-full p-3 bg-[#356EF5] disabled:opacity-70 text-white rounded-md text-[15px] font-medium hover:bg-[#2a5cd9] transition-colors duration-200"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="my-4">
              <AppLink
                href={ROUTES.FORGOT_PASSWORD}
                variant="primary"
                className="login-link block text-[13px] my-2 text-[#356EF5] hover:underline"
              >
                Forgot your password?
              </AppLink>
              <AppLink
                href="#"
                variant="primary"
                className="login-link block text-[13px] my-2 text-[#356EF5] hover:underline"
              >
                Didn`t receive confirmation instructions?
              </AppLink>
            </div>

            <Divider
              text="or"
              className="login-divider flex items-center my-5 text-[13px] text-[#666] before:content-[''] before:flex-1 before:h-[1px] before:bg-[#ddd] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#ddd]"
            />

            <div className="flex flex-col gap-[10px]">
              <Button
                variant="social"
                fullWidth
                icon={<GoogleIcon />}
                className="login-social-button flex items-center justify-center gap-[10px] w-full p-3 border border-[#ddd] rounded-md bg-white text-[#333] text-[14px] font-semibold hover:bg-[#f8f8f8] hover:border-[#ccc] transition-all duration-200"
                onClick={() => handleOAuth("google")}
              >
                Continue with Google
              </Button>
              <Button
                variant="social"
                fullWidth
                icon={<FacebookIcon />}
                className="login-social-button flex items-center justify-center gap-[10px] w-full p-3 border border-[#ddd] rounded-md bg-white text-[#333] text-[14px] font-semibold hover:bg-[#f8f8f8] hover:border-[#ccc] transition-all duration-200"
                onClick={() => handleOAuth("facebook")}
              >
                Continue with Facebook
              </Button>
              <Button
                variant="social"
                fullWidth
                icon={<XIcon />}
                className="login-social-button flex items-center justify-center gap-[10px] w-full p-3 border border-[#ddd] rounded-md bg-white text-[#333] text-[14px] font-semibold hover:bg-[#f8f8f8] hover:border-[#ccc] transition-all duration-200"
                onClick={() => handleOAuth("twitter")}
              >
                Continue with X
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
