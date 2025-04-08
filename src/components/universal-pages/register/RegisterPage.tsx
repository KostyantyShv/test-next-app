// app/components/RegisterPage.tsx
"use client";

import AppLink from "@/components/ui/AppLink/AppLink";
import Button from "@/components/ui/form/button/Button";
import Divider from "@/components/ui/form/divider/Divider";
import Input from "@/components/ui/form/input/Input";
import { Logo } from "@/components/ui/Logo";
import {
  CloseIcon,
  FacebookIcon,
  GoogleIcon,
  XIcon,
} from "@/components/ui/SocialIcons/SocialIcons";
import { ROUTES } from "@/enums/routes";

const RegisterPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account creation submitted");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#F2F2F2] font-inter">
      {/* Registration Overlay */}
      <div className="fixed inset-0 bg-[#F2F2F2] flex items-center justify-center z-[1000] transition-all duration-300">
        {/* Close Button */}
        <AppLink
          href={ROUTES.HOME}
          className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2 text-[#666] hover:text-[#333] transition-colors duration-200 z-[1000]"
        >
          <CloseIcon />
        </AppLink>

        {/* Signup Container */}
        <div className="bg-white p-8 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-full max-w-[360px] relative">
          <div className="mb-6">
            <Logo />
          </div>

          <h1 className="text-xl font-semibold text-[#333] mb-2">
            Create your account
          </h1>
          <p className="text-[#666] text-xs mb-4">
            Already registered?{" "}
            <AppLink href={ROUTES.LOGIN} variant="underline">
              Login here!
            </AppLink>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input type="text" placeholder="Full Name" required />
            </div>

            <div className="mb-4">
              <Input type="email" placeholder="Email" required />
            </div>

            <div className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                showPasswordToggle
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="font-semibold mb-4"
            >
              Get Started
            </Button>

            <p className="text-[#666] text-[11px] mb-4 leading-relaxed">
              By proceeding you agree to our{" "}
              <AppLink
                href="#"
                variant="primary"
                className="no-underline font-medium hover:underline"
              >
                Platform Terms
              </AppLink>{" "}
              &{" "}
              <AppLink
                href="#"
                variant="primary"
                className="no-underline font-medium hover:underline"
              >
                Privacy Notice
              </AppLink>
            </p>

            <Divider text="OR" />

            <div className="flex flex-col gap-2">
              <Button variant="social" fullWidth icon={<GoogleIcon />}>
                Continue with Google
              </Button>
              <Button variant="social" fullWidth icon={<FacebookIcon />}>
                Continue with Facebook
              </Button>
              <Button variant="social" fullWidth icon={<XIcon />}>
                Continue with X
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
