import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type OptionToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  trueLabel: string;
  falseLabel: string;
};

export function OptionToggle({ label, value, onChange, trueLabel, falseLabel }: OptionToggleProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="flex gap-2">
        <Button size="sm" variant={value ? "default" : "secondary"} onClick={() => onChange(true)} className="flex-1">
          {trueLabel}
        </Button>
        <Button size="sm" variant={!value ? "default" : "secondary"} onClick={() => onChange(false)} className="flex-1">
          {falseLabel}
        </Button>
      </div>
    </div>
  );
}
