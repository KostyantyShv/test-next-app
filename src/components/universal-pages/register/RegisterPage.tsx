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
import Button from "@/components/ui/form/button/Button";
import Divider from "@/components/ui/form/divider/Divider";

const RegisterPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account creation submitted");
  };

  return (
    <div className="absolute inset-0 flex z-[100] items-center justify-center bg-[#F2F2F2] font-inter">
      {/* Desktop close button - hidden on mobile */}
      <AppLink
        href={ROUTES.HOME}
        className="max-md:hidden absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2 text-[#666] hover:text-[#333] transition-colors duration-200"
      >
        <CloseIcon />
      </AppLink>

      {/* Main content - desktop layout by default, modified for mobile */}
      <div className="w-full max-w-[360px] bg-white p-8 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-md:shadow-none max-md:rounded-none max-md:p-0 max-md:max-w-none max-md:flex max-md:flex-col max-md:h-full">
        {/* Mobile header - only visible on small screens */}
        <div className="hidden max-md:flex items-center p-5 gap-2 border-b border-gray-100">
          <Logo className="h-10" />
          <AppLink
            href={ROUTES.HOME}
            className="ml-auto bg-transparent border-none cursor-pointer p-2 text-[#666]"
          >
            <CloseIcon />
          </AppLink>
        </div>

        {/* Logo only visible on desktop */}
        <div className="mb-6 max-md:hidden">
          <Logo />
        </div>

        <div className="max-md:flex-1 max-md:px-5 max-md:py-6">
          <h1 className="text-xl font-semibold text-[#333] mb-2">
            Create your account
          </h1>
          <p className="text-[#666] text-[13px] mb-6">
            Already registered?{" "}
            <AppLink
              href={ROUTES.LOGIN}
              variant="underline"
              className="text-[#356EF5] font-medium"
            >
              Login here!
            </AppLink>
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3 border border-[#ddd] rounded-md text-[14px] focus:border-[#356EF5] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email address"
                required
                className="w-full p-3 border border-[#ddd] rounded-md text-[14px] focus:border-[#356EF5] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                showPasswordToggle
                required
                className="w-full p-3 border border-[#ddd] rounded-md text-[14px] focus:border-[#356EF5] focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="w-full p-3 bg-[#356EF5] text-white rounded-md text-[15px] font-medium hover:bg-[#2a5cd9] transition-colors duration-200"
            >
              Get Started
            </Button>

            <p className="text-[#666] text-[11px] my-4 leading-relaxed">
              By proceeding you agree to our{" "}
              <AppLink
                href="#"
                variant="primary"
                className="text-[#356EF5] no-underline font-medium hover:underline"
              >
                Platform Terms
              </AppLink>{" "}
              &{" "}
              <AppLink
                href="#"
                variant="primary"
                className="text-[#356EF5] no-underline font-medium hover:underline"
              >
                Privacy Notice
              </AppLink>
            </p>

            <Divider
              text="or"
              className="flex items-center my-5 text-[13px] text-[#666] before:content-[''] before:flex-1 before:h-[1px] before:bg-[#ddd] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#ddd]"
            />

            <div className="flex flex-col gap-[10px]">
              <Button
                variant="social"
                fullWidth
                icon={<GoogleIcon />}
                className="flex items-center justify-center gap-[10px] w-full p-3 border border-[#ddd] rounded-md bg-white text-[#333] text-[14px] font-semibold hover:bg-[#f8f8f8] hover:border-[#ccc] transition-all duration-200"
              >
                Continue with Google
              </Button>
              <Button
                variant="social"
                fullWidth
                icon={<FacebookIcon />}
                className="flex items-center justify-center gap-[10px] w-full p-3 border border-[#ddd] rounded-md bg-white text-[#333] text-[14px] font-semibold hover:bg-[#f8f8f8] hover:border-[#ccc] transition-all duration-200"
              >
                Continue with Facebook
              </Button>
              <Button
                variant="social"
                fullWidth
                icon={<XIcon />}
                className="flex items-center justify-center gap-[10px] w-full p-3 border border-[#ddd] rounded-md bg-white text-[#333] text-[14px] font-semibold hover:bg-[#f8f8f8] hover:border-[#ccc] transition-all duration-200"
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

export default RegisterPage;
