"use client";

import AppLink from "@/components/ui/AppLink/AppLink";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/form/button/Button";
import Input from "@/components/ui/form/input/Input";
import { CloseIcon } from "@/components/ui/SocialIcons/SocialIcons";
import VerificationCodeInput from "@/components/ui/VerificationCodeInput/VerificationCodeInput";
import { ROUTES } from "@/enums/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<"email" | "verification" | "reset" | "none">(
    "email"
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeInputs, setCodeInputs] = useState(["2", "4", "3", "7", "5", "6"]);
  const [resendText, setResendText] = useState("Resend Code");

  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("verification");
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("reset");
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    setStep("none");
    alert("Password has been reset successfully!");
    router.replace(ROUTES.LOGIN);
  };

  const handleCodeInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCodeInputs = [...codeInputs];
    newCodeInputs[index] = value.slice(0, 1);
    setCodeInputs(newCodeInputs);
  };

  const handleCodeInputKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      // Logic handled by ref in original, simplified here
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pasteData)) {
      const digits = pasteData.split("").slice(0, 6);
      setCodeInputs(digits.concat(new Array(6 - digits.length).fill("")));
    }
  };

  const handleResendCode = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setResendText("Code resent!");
    setTimeout(() => setResendText("Resend Code"), 3000);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStep("none");
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const getPasswordBorderColor = () =>
    !confirmPassword
      ? ""
      : newPassword === confirmPassword
      ? "border-[#4CAF50]"
      : "border-[#F44336]";

  const EmailIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
        fill="#666666"
      />
    </svg>
  );

  const LockIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM18 8H17V6C17 3.2 14.8 1 12 1C9.2 1 7 3.2 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM8.9 6C8.9 4.3 10.3 2.9 12 2.9C13.7 2.9 15.1 4.3 15.1 6V8H8.9V6ZM18 20H6V10H18V20Z"
        fill="#666666"
      />
    </svg>
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#F2F2F2] font-inter">
      {/* Step 1: Email Entry */}
      <Card
        className={
          step === "email" ? "opacity-100 visible" : "opacity-0 invisible"
        }
        onClickOutside={() => router.replace(ROUTES.LOGIN)}
      >
        <AppLink
          href={ROUTES.LOGIN}
          className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2 text-[#666] hover:text-[#333] transition-colors duration-200 z-[1000]"
        >
          <CloseIcon />
        </AppLink>
        <div className="w-[70px] h-[70px] bg-[rgba(0,102,178,0.1)] rounded-full flex items-center justify-center mb-6">
          <svg fill="#0066b2" viewBox="0 0 15 16" height="32" width="30">
            <path d="M9.54947 0H4.63158C2.08842 0 0 2.07158 0 4.63158V8.67368C0 9.04421 0.303158 9.34737 0.673684 9.34737C1.04421 9.34737 1.34737 9.04421 1.34737 8.67368V4.63158C1.34737 2.82947 2.81263 1.36421 4.61474 1.36421H9.51579C11.3516 1.36421 12.8168 2.82947 12.8168 4.63158V8.16842C12.8168 9.97053 11.3516 11.4358 9.54947 11.4358H3.46947L5.50737 9.39789C5.77684 9.12842 5.77684 8.70737 5.50737 8.43789C5.23789 8.16842 4.81684 8.16842 4.54737 8.43789L1.34737 11.6379C1.07789 11.9074 1.07789 12.3284 1.34737 12.5979L4.54737 15.7979C4.68211 15.9326 4.85053 16 5.03579 16C5.20421 16 5.38947 15.9326 5.52421 15.7979C5.79368 15.5284 5.79368 15.1074 5.52421 14.8379L3.46947 12.8H9.54947C12.1095 12.8 14.1811 10.7284 14.1811 8.16842V4.63158C14.1811 2.07158 12.0926 0 9.54947 0Z"></path>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#333] mb-2 text-center">
          Reset Your Password
        </h1>
        <p className="text-[#666] text-xs mb-4 leading-relaxed text-center max-w-[360px]">
          Enter your email address and we`ll send you a verification code to
          reset your password.
        </p>
        <form onSubmit={handleEmailSubmit} className="w-full">
          <Input
            type="email"
            placeholder="Enter your email"
            icon={EmailIcon}
            required
            className="mb-4 pl-10"
          />
          <Button type="submit" fullWidth className="mb-4">
            Reset Password
          </Button>
          <Link
            href={ROUTES.LOGIN}
            className="flex items-center text-[#666] text-xs font-medium hover:text-[#333] transition-colors duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            back to login
          </Link>
        </form>
      </Card>

      {/* Step 2: Verification Code */}
      <Card
        className={
          step === "verification"
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }
        onClickOutside={() => router.replace(ROUTES.LOGIN)}
      >
        <AppLink
          href={ROUTES.LOGIN}
          className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2 text-[#666] hover:text-[#333] transition-colors duration-200 z-[1000]"
        >
          <CloseIcon />
        </AppLink>
        <div className="w-[70px] h-[70px] bg-[rgba(0,102,178,0.1)] rounded-full flex items-center justify-center mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
              fill="#0066b2"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#333] mb-2 text-center">
          Verify Your Email
        </h1>
        <p className="text-[#666] text-xs mb-4 leading-relaxed text-center">
          Enter the 6-digit verification code
        </p>
        <form onSubmit={handleVerificationSubmit} className="w-full">
          <VerificationCodeInput
            codeInputs={codeInputs}
            onChange={handleCodeInputChange}
            onKeyDown={handleCodeInputKeyDown}
            onPaste={handleCodePaste}
          />
          <Button type="submit" fullWidth className="mb-4">
            Continue
          </Button>
          <div className="text-[#666] text-xs mt-4 text-center">
            Didn`t you receive any code?{" "}
            <a
              href="#"
              onClick={handleResendCode}
              className="text-[#0066b2] no-underline font-medium hover:underline"
            >
              {resendText}
            </a>
          </div>
        </form>
      </Card>

      {/* Step 3: Reset Password */}
      <Card
        className={
          step === "reset" ? "opacity-100 visible" : "opacity-0 invisible"
        }
        onClickOutside={() => router.replace(ROUTES.LOGIN)}
      >
        <AppLink
          href={ROUTES.LOGIN}
          className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2 text-[#666] hover:text-[#333] transition-colors duration-200 z-[1000]"
        >
          <CloseIcon />
        </AppLink>
        <div className="w-[70px] h-[70px] bg-[rgba(0,102,178,0.1)] rounded-full flex items-center justify-center mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10V7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7V10"
              stroke="#0066b2"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14.5C13.1046 14.5 14 13.6046 14 12.5C14 11.3954 13.1046 10.5 12 10.5C10.8954 10.5 10 11.3954 10 12.5C10 13.6046 10.8954 14.5 12 14.5Z"
              stroke="#0066b2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 10H5C3.9 10 3 10.9 3 12V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V12C21 10.9 20.1 10 19 10Z"
              stroke="#0066b2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#333] mb-2 text-center">
          Reset Password
        </h1>
        <p className="text-[#666] text-xs mb-4 leading-relaxed text-center">
          Create a new password for your account
        </p>
        <form onSubmit={handleResetPasswordSubmit} className="w-full">
          <Input
            type="password"
            placeholder="Enter your new password"
            icon={LockIcon}
            showPasswordToggle
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mb-4 pl-10"
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            icon={LockIcon}
            showPasswordToggle
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`mb-4 pl-10 ${getPasswordBorderColor()}`}
          />
          <Button type="submit" fullWidth className="mb-4">
            Continue
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setStep("email")}
          >
            Cancel
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
