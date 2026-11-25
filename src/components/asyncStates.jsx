import { Loader2, AlertCircle } from "lucide-react";
function LoadingState({ label = "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644..." }) {
  return <div className="flex items-center justify-center gap-2 py-12 text-sm text-gray-500 dark:text-gray-400">
      <Loader2 className="w-4 h-4 animate-spin" />
      {label}
    </div>;
}
function ErrorState({ message, onRetry }) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <AlertCircle className="w-6 h-6 text-red-500" />
      <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-ghost border border-gray-100 dark:border-navy-400/30">
          إعادة المحاولة
        </button>}
    </div>;
}
function TableWrap({ children }) {
  return <div className="overflow-x-auto">{children}</div>;
}
export {
  ErrorState,
  LoadingState,
  TableWrap
};
