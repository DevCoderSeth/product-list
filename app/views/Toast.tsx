import { toast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export function showSuccess(message: string) {
  toast.custom(() => (
    <div className="flex items-center gap-3 rounded-lg border p-3 shadow-md bg-emerald-50 border-emerald-300 text-emerald-800">
      <CheckCircle className="w-5 h-5 text-emerald-600" />
      <span>{message}</span>
    </div>
  ));
}

export function showError(message: string) {
  toast.custom(() => (
    <div className="flex items-center gap-3 rounded-lg border p-3 shadow-md bg-red-50 border-red-300 text-red-800">
      <XCircle className="w-5 h-5 text-red-600" />
      <span>{message}</span>
    </div>
  ));
}

export function showWarning(message: string) {
  toast.custom(() => (
    <div className="flex items-center gap-3 rounded-lg border p-3 shadow-md bg-yellow-50 border-yellow-300 text-yellow-800">
      <AlertTriangle className="w-5 h-5 text-yellow-600" />
      <span>{message}</span>
    </div>
  ));
}
