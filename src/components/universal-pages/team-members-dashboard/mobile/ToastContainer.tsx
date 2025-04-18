import { useToast } from "./hooks/useToast";

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`fixed bottom-5 left-1/2 max-w-[90%] min-w-[280px] -translate-x-1/2 rounded-lg px-4 py-3 shadow-xl transition-all duration-300 ${
            toast.type === "success"
              ? "bg-toast-success-bg text-toast-success-text"
              : toast.type === "error"
              ? "bg-toast-error-bg text-toast-error-text"
              : "bg-toast-info-bg text-toast-info-text"
          } ${
            toasts.includes(toast)
              ? "translate-y-0 opacity-100"
              : "translate-y-[120%] opacity-0"
          }`}
        >
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {toast.type === "success" ? (
                  <>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </>
                ) : toast.type === "error" ? (
                  <>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12" y2="16"></line>
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </>
                )}
              </svg>
              <div className="text-sm font-medium">{toast.message}</div>
            </div>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
              onClick={() => dismissToast(toast.id)}
              aria-label="Close notification"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
