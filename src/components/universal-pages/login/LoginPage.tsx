// app/components/LoginPage.tsx
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

const LoginPage: React.FC = () => {
  return (
    <div className="absolute inset-0 flex z-[100] items-center justify-center bg-[#F2F2F2] font-inter">
      <AppLink
        href={ROUTES.HOME}
        className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2 text-[#666] hover:text-[#333] transition-colors duration-200"
      >
        <CloseIcon />
      </AppLink>

      <div className="bg-white p-8 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-full max-w-[360px]">
        <div className="mb-6">
          <Logo />
        </div>

        <h1 className="text-xl font-semibold text-[#333] mb-2">
          Sign in to your account
        </h1>
        <p className="text-[#666] text-xs mb-4">
          No account?{" "}
          <AppLink href={ROUTES.REGISTER} variant="underline">
            Create one now for free
          </AppLink>
        </p>

        <form>
          <div className="mb-4">
            <Input type="email" placeholder="Email address" required />
          </div>

          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              showPasswordToggle
              required
            />
          </div>

          <div className="mb-4">
            <Checkbox id="remember" label="Remember me" />
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Sign in
          </Button>

          <div className="my-3">
            <AppLink
              href={ROUTES.FORGOT_PASSWORD}
              variant="primary"
              className="block text-xs my-1"
            >
              Forgot your password?
            </AppLink>
            <AppLink href="#" variant="primary" className="block text-xs my-1">
              Didn`t receive confirmation instructions?
            </AppLink>
          </div>

          <Divider text="or" />

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
  );
};

export default LoginPage;
