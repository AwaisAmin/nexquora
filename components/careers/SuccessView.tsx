import { Check } from "lucide-react";
import Button from "@/components/ui/Button";

interface SuccessViewProps {
  accent: string;
  onClose: () => void;
}

export default function SuccessView({ accent, onClose }: SuccessViewProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: `${accent}18` }}
      >
        <Check size={26} style={{ color: accent }} />
      </span>
      <h2 className="font-syne text-xl font-bold text-white">
        Application sent!
      </h2>
      <p className="max-w-xs text-sm text-muted">
        We&apos;ll review your application and get back to you soon.
      </p>
      <Button variant="outline" size="sm" onClick={onClose} className="mt-2">
        Close
      </Button>
    </div>
  );
}
